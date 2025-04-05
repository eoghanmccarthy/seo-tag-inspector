import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertAnalysisSchema } from "@shared/schema";
import { z } from "zod";
import * as cheerio from 'cheerio';
import axios from 'axios';

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Analyze a URL for SEO tags
  app.post('/api/analyze', async (req, res) => {
    try {
      const { url } = req.body;
      
      if (!url) {
        return res.status(400).json({ message: 'URL is required' });
      }
      
      let formattedUrl = url;
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        formattedUrl = `https://${url}`;
      }
      
      // Fetch the HTML content
      const response = await axios.get(formattedUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; SEOMetaAnalyzer/1.0;)'
        },
        timeout: 15000,
        maxRedirects: 5
      });
      
      const html = response.data;
      const $ = cheerio.load(html);
      
      // Extract meta tags
      const metaTags: { name: string; content: string; status: string }[] = [];
      const openGraphTags: { name: string; content: string; status: string }[] = [];
      const twitterCardTags: { name: string; content: string; status: string }[] = [];
      
      // Extract title
      const title = $('title').text() || '';
      metaTags.push({
        name: 'title',
        content: title,
        status: title ? 'present' : 'missing'
      });
      
      // Extract meta description
      const description = $('meta[name="description"]').attr('content') || '';
      metaTags.push({
        name: 'description',
        content: description,
        status: description ? 'present' : 'missing'
      });
      
      // Extract viewport
      const viewport = $('meta[name="viewport"]').attr('content') || '';
      metaTags.push({
        name: 'viewport',
        content: viewport,
        status: viewport ? 'present' : 'missing'
      });
      
      // Extract charset
      const charset = $('meta[charset]').attr('charset') || '';
      metaTags.push({
        name: 'charset',
        content: charset,
        status: charset ? 'present' : 'missing'
      });
      
      // Extract canonical
      const canonical = $('link[rel="canonical"]').attr('href') || '';
      metaTags.push({
        name: 'canonical',
        content: canonical,
        status: canonical ? 'present' : 'missing'
      });
      
      // Extract Open Graph tags
      $('meta[property^="og:"]').each((i, el) => {
        const property = $(el).attr('property') || '';
        const content = $(el).attr('content') || '';
        openGraphTags.push({
          name: property,
          content: content,
          status: content ? 'present' : 'missing'
        });
      });
      
      // If no OG tags found, add missing ones
      if (openGraphTags.length === 0) {
        openGraphTags.push({
          name: 'og:title',
          content: '',
          status: 'missing'
        });
        openGraphTags.push({
          name: 'og:description',
          content: '',
          status: 'missing'
        });
        openGraphTags.push({
          name: 'og:image',
          content: '',
          status: 'missing'
        });
        openGraphTags.push({
          name: 'og:url',
          content: '',
          status: 'missing'
        });
      } else {
        // Check for missing important OG tags
        const ogTags = ['og:title', 'og:description', 'og:image', 'og:url'];
        ogTags.forEach(tag => {
          if (!openGraphTags.some(t => t.name === tag)) {
            openGraphTags.push({
              name: tag,
              content: '',
              status: 'missing'
            });
          }
        });
      }
      
      // Extract Twitter Card tags
      $('meta[name^="twitter:"]').each((i, el) => {
        const name = $(el).attr('name') || '';
        const content = $(el).attr('content') || '';
        twitterCardTags.push({
          name: name,
          content: content,
          status: content ? 'present' : 'missing'
        });
      });
      
      // If no Twitter Card tags found, add missing ones
      if (twitterCardTags.length === 0) {
        twitterCardTags.push({
          name: 'twitter:card',
          content: '',
          status: 'missing'
        });
        twitterCardTags.push({
          name: 'twitter:title',
          content: '',
          status: 'missing'
        });
        twitterCardTags.push({
          name: 'twitter:description',
          content: '',
          status: 'missing'
        });
      } else {
        // Check for missing important Twitter Card tags
        const twitterTags = ['twitter:card', 'twitter:title', 'twitter:description'];
        twitterTags.forEach(tag => {
          if (!twitterCardTags.some(t => t.name === tag)) {
            twitterCardTags.push({
              name: tag,
              content: '',
              status: 'missing'
            });
          }
        });
      }
      
      // Calculate SEO score
      let score = 0;
      const total = metaTags.length + openGraphTags.length + twitterCardTags.length;
      const present = [
        ...metaTags.filter(tag => tag.status === 'present'),
        ...openGraphTags.filter(tag => tag.status === 'present'),
        ...twitterCardTags.filter(tag => tag.status === 'present')
      ].length;
      
      score = Math.round((present / total) * 100);
      
      // Generate score categories
      const goodCount = present;
      const missingCount = total - present;
      const improvementCount = Math.floor(missingCount * 0.7);
      const issuesCount = missingCount - improvementCount;
      
      // Generate recommendations
      const recommendations = [];
      
      // Critical issues
      if (!twitterCardTags.some(tag => tag.name === 'twitter:title' && tag.status === 'present')) {
        recommendations.push({
          title: 'Missing Twitter Card Title',
          description: 'Add twitter:title meta tag to improve sharing appearance on Twitter.',
          impact: 'high',
          category: 'critical',
          solution: 'Add a twitter:title meta tag with your page title',
          code: `<meta name="twitter:title" content="${title}">`
        });
      }
      
      if (!canonical) {
        recommendations.push({
          title: 'Canonical URL Not Defined',
          description: 'Add a canonical link element to specify the preferred URL to prevent duplicate content issues.',
          impact: 'high',
          category: 'critical',
          solution: 'Add a canonical link to your page',
          code: `<link rel="canonical" href="${formattedUrl}">`
        });
      }
      
      // Improvements
      if (!openGraphTags.some(tag => tag.name === 'og:url' && tag.status === 'present')) {
        recommendations.push({
          title: 'Missing Open Graph URL',
          description: 'Add the og:url property to ensure correct linking when shared on social media.',
          impact: 'medium',
          category: 'improvement',
          solution: 'Add an og:url meta tag with your page URL',
          code: `<meta property="og:url" content="${formattedUrl}">`
        });
      }
      
      if (title && (title.length < 30 || title.length > 60)) {
        recommendations.push({
          title: 'Title Tag Length',
          description: `Your title tag is ${title.length} characters, which is ${title.length < 30 ? 'too short' : 'too long'}. Aim for 50-60 characters.`,
          impact: 'medium',
          category: 'improvement'
        });
      }
      
      // Good practices
      if (viewport) {
        recommendations.push({
          title: 'Mobile Viewport Set',
          description: 'Good job! Your page has the viewport meta tag properly configured for mobile devices.',
          impact: 'medium',
          category: 'good'
        });
      }
      
      if (description && description.length >= 150 && description.length <= 160) {
        recommendations.push({
          title: 'Meta Description Length',
          description: `Your meta description is ${description.length} characters, which is within the ideal range (150-160 characters).`,
          impact: 'high',
          category: 'good'
        });
      }
      
      if (charset) {
        recommendations.push({
          title: 'Character Encoding Specified',
          description: 'UTF-8 character encoding is properly specified.',
          impact: 'low',
          category: 'good'
        });
      }
      
      // Extract domain for display
      const domain = new URL(formattedUrl).hostname.replace(/^www\./, '');
      
      // Extract image URL
      let imageUrl = '';
      const ogImage = openGraphTags.find(tag => tag.name === 'og:image')?.content;
      const twitterImage = twitterCardTags.find(tag => tag.name === 'twitter:image')?.content;
      
      if (ogImage) {
        imageUrl = ogImage;
      } else if (twitterImage) {
        imageUrl = twitterImage;
      }
      
      // Create analysis result object
      const analysisResult = {
        url: formattedUrl,
        title: title,
        description: description,
        domain: domain,
        score: score,
        scoreCategory: {
          good: goodCount,
          improvements: improvementCount,
          issues: issuesCount
        },
        metaTags: metaTags,
        openGraphTags: openGraphTags,
        twitterCardTags: twitterCardTags,
        recommendations: recommendations,
        imageUrl: imageUrl
      };
      
      // Store the analysis in the database
      const now = new Date().toISOString();
      await storage.createAnalysis({
        url: formattedUrl,
        title: title,
        description: description,
        score: score,
        metaTags: metaTags,
        openGraphTags: openGraphTags,
        twitterCardTags: twitterCardTags,
        recommendations: recommendations,
        createdAt: now
      });
      
      return res.json(analysisResult);
    } catch (error) {
      console.error('Error analyzing URL:', error);
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
          return res.status(400).json({ message: 'Unable to connect to the website. Please check the URL and try again.' });
        }
        if (error.response) {
          return res.status(400).json({ message: `Error fetching website: ${error.response.statusText}` });
        }
      }
      return res.status(500).json({ message: 'An error occurred while analyzing the website.' });
    }
  });
  
  // Get recent analyses
  app.get('/api/recent-analyses', async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 5;
      const analyses = await storage.getRecentAnalyses(limit);
      
      const recentUrls = analyses.map(analysis => ({
        url: analysis.url,
        domain: new URL(analysis.url).hostname.replace(/^www\./, '')
      }));
      
      return res.json(recentUrls);
    } catch (error) {
      console.error('Error fetching recent analyses:', error);
      return res.status(500).json({ message: 'An error occurred while fetching recent analyses.' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
