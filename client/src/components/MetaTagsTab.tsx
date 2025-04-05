import { useState } from "react";
import { MetaTag } from "@shared/schema";
import { 
  Check, 
  Copy, 
  AlertTriangle, 
  X, 
  Info, 
  Globe, 
  Share2, 
  Twitter, 
  FileCode, 
  Download,
  BookOpenCheck,
  Tag
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MetaTagsTabProps {
  metaTags: MetaTag[];
  openGraphTags: MetaTag[];
  twitterCardTags: MetaTag[];
}

export default function MetaTagsTab({ metaTags, openGraphTags, twitterCardTags }: MetaTagsTabProps) {
  const { toast } = useToast();
  const [copiedTags, setCopiedTags] = useState<Set<string>>(new Set());
  const [expandedSection, setExpandedSection] = useState<'essential' | 'og' | 'twitter' | null>(null);

  // Count stats for header icons
  const essentialStatus = metaTags.every(tag => tag.status === 'present') ? 'success' : 
                          metaTags.some(tag => tag.status === 'missing') ? 'error' : 'warning';
  
  const ogStatus = openGraphTags.every(tag => tag.status === 'present') ? 'success' : 
                   openGraphTags.some(tag => tag.status === 'missing') ? 'error' : 'warning';
  
  const twitterStatus = twitterCardTags.every(tag => tag.status === 'present') ? 'success' : 
                         twitterCardTags.some(tag => tag.status === 'missing') ? 'error' : 'warning';

  // Get stats counts
  const essentialPresent = metaTags.filter(tag => tag.status === 'present').length;
  const essentialTotal = metaTags.length;
  
  const ogPresent = openGraphTags.filter(tag => tag.status === 'present').length;
  const ogTotal = openGraphTags.length;
  
  const twitterPresent = twitterCardTags.filter(tag => tag.status === 'present').length;
  const twitterTotal = twitterCardTags.length;

  const handleCopyTag = (tagName: string, content: string) => {
    const tagHtml = tagName === 'title' 
      ? `<title>${content}</title>`
      : tagName.startsWith('og:')
        ? `<meta property="${tagName}" content="${content}">`
        : `<meta name="${tagName}" content="${content}">`;
    
    navigator.clipboard.writeText(tagHtml).then(() => {
      setCopiedTags(prev => new Set(prev).add(tagName));
      
      toast({
        title: "Copied to clipboard",
        description: `Tag has been copied to your clipboard.`,
      });
      
      setTimeout(() => {
        setCopiedTags(prev => {
          const newSet = new Set(prev);
          newSet.delete(tagName);
          return newSet;
        });
      }, 2000);
    });
  };

  const handleCopyAllTags = () => {
    const allTags = [
      ...metaTags.map(tag => tag.name === 'title' 
        ? `<title>${tag.content}</title>` 
        : `<meta name="${tag.name}" content="${tag.content}">`),
      ...openGraphTags.map(tag => `<meta property="${tag.name}" content="${tag.content}">`),
      ...twitterCardTags.map(tag => `<meta name="${tag.name}" content="${tag.content}">`)
    ].filter(tag => !tag.includes('content=""')).join('\n');
    
    navigator.clipboard.writeText(allTags).then(() => {
      toast({
        title: "All tags copied",
        description: `All meta tags have been copied to your clipboard.`,
      });
    });
  };

  const toggleSection = (section: 'essential' | 'og' | 'twitter') => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const getTagIcon = (tagName: string) => {
    switch(tagName) {
      case 'title': 
        return <BookOpenCheck className="h-3.5 w-3.5 text-blue-500 mr-1.5" />;
      case 'description': 
        return <Info className="h-3.5 w-3.5 text-green-500 mr-1.5" />;
      case 'viewport': 
        return <Globe className="h-3.5 w-3.5 text-amber-500 mr-1.5" />;
      case 'charset': 
        return <FileCode className="h-3.5 w-3.5 text-purple-500 mr-1.5" />;
      case 'canonical': 
        return <Tag className="h-3.5 w-3.5 text-indigo-500 mr-1.5" />;
      default:
        return null;
    }
  };

  const renderTag = (tag: MetaTag, type: 'meta' | 'og' | 'twitter') => {
    const isPresent = tag.content && tag.status === 'present';
    const tagHtml = type === 'meta' && tag.name === 'title'
      ? `<title>${tag.content}</title>`
      : type === 'og'
        ? `<meta property="${tag.name}" content="${tag.content}">`
        : `<meta name="${tag.name}" content="${tag.content}">`;

    return (
      <div 
        key={tag.name} 
        className={`p-3 sm:p-4 transition duration-150 ${isPresent ? 'hover:bg-gray-50' : 'hover:bg-red-50/30'}`}
      >
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center flex-wrap pr-2">
            {type === 'meta' && getTagIcon(tag.name)}
            <span className="font-medium text-gray-700 text-sm sm:text-base mr-2 flex items-center">
              {tag.name}
            </span>
            <span className={`mt-1 sm:mt-0 text-xs py-0.5 px-2 rounded-full ${
              isPresent 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : tag.status === 'warning'
                  ? 'bg-amber-100 text-amber-800 border border-amber-200'
                  : 'bg-red-100 text-red-800 border border-red-200'
            }`}>
              {isPresent ? 'Present' : 'Missing'}
            </span>
          </div>
          {isPresent && (
            <button 
              className={`ml-2 p-1.5 rounded-full hover:bg-gray-100 transition-colors ${
                copiedTags.has(tag.name) ? 'text-green-500 bg-green-50' : 'text-gray-400'
              }`} 
              title="Copy tag"
              onClick={() => handleCopyTag(tag.name, tag.content)}
            >
              {copiedTags.has(tag.name) ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          )}
        </div>
        
        <div className={`font-mono text-xs sm:text-sm bg-gray-900 text-gray-100 p-3 rounded-md overflow-x-auto ${
          !isPresent ? 'opacity-50' : ''
        }`}>
          <code>{tagHtml}</code>
        </div>
        
        {!isPresent && (
          <div className={`mt-3 p-2 rounded-md text-xs sm:text-sm ${
            tag.status === 'warning' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-red-50 text-red-800 border border-red-200'
          }`}>
            <div className="flex items-start">
              {tag.status === 'warning' 
                ? <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 mt-0.5 flex-shrink-0" /> 
                : <AlertTriangle className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-2 mt-0.5 flex-shrink-0" />}
              <span>
                {tag.name === 'title' && 'Missing title tag may severely impact SEO.'}
                {tag.name === 'description' && 'Missing meta description reduces click-through rates.'}
                {tag.name === 'viewport' && 'Missing viewport meta tag creates poor mobile experience.'}
                {tag.name === 'charset' && 'Missing charset meta tag may cause character encoding issues.'}
                {tag.name === 'canonical' && 'Missing canonical tag may lead to duplicate content issues.'}
                {tag.name === 'og:title' && 'Missing og:title may impact social sharing.'}
                {tag.name === 'og:description' && 'Missing og:description creates poor social sharing preview.'}
                {tag.name === 'og:image' && 'Missing og:image means no image will appear in social shares.'}
                {tag.name === 'og:url' && 'Missing og:url tag may cause incorrect sharing URLs.'}
                {tag.name === 'twitter:card' && 'Missing twitter:card will prevent Twitter card display.'}
                {tag.name === 'twitter:title' && 'Missing twitter:title will cause Twitter to use generic fallbacks.'}
                {tag.name === 'twitter:description' && 'Missing twitter:description may lead to poor social sharing appearance.'}
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Info banner for educational purposes
  const InfoBanner = () => (
    <div className="bg-blue-50 rounded-lg p-3 md:p-4 mb-4 border border-blue-100 flex items-start gap-3">
      <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
      <div>
        <h3 className="text-blue-800 font-medium mb-1">About Meta Tags</h3>
        <p className="text-xs md:text-sm text-blue-700">
          Meta tags are snippets of code that provide information about your webpage to search engines and website visitors.
          These tags are crucial for SEO and how your content appears when shared on social platforms.
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-4 sm:space-y-6">
      <InfoBanner />
      
      <div className="flex justify-between items-center">
        <h3 className="text-base sm:text-lg font-medium text-gray-900 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <FileCode className="h-4 w-4 text-primary" />
          </span>
          Meta Tags Overview
        </h3>
        <button 
          className="text-xs sm:text-sm text-primary border border-primary/20 bg-primary/5 rounded-full flex items-center gap-1 py-1.5 px-3 hover:bg-primary/10 transition-colors"
          onClick={handleCopyAllTags}
        >
          <Download className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span>Copy All Tags</span>
        </button>
      </div>

      {/* Meta Tag Categories */}
      <div className="space-y-5 sm:space-y-6">
        {/* Essential Meta Tags */}
        <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div 
            className={`p-3 sm:p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors ${
              essentialStatus === 'success' ? 'bg-green-50' : 
              essentialStatus === 'warning' ? 'bg-amber-50' : 'bg-red-50'
            }`}
            onClick={() => toggleSection('essential')}
          >
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                essentialStatus === 'success' ? 'bg-green-100 text-green-700' : 
                essentialStatus === 'warning' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
              }`}>
                <Globe className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Essential Meta Tags</h4>
                <div className="text-xs text-gray-500 flex items-center mt-0.5">
                  {essentialPresent} of {essentialTotal} tags present
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`text-xs py-1 px-2 rounded-full ${
                essentialStatus === 'success' ? 'bg-green-100 text-green-800' : 
                essentialStatus === 'warning' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
              }`}>
                {essentialStatus === 'success' ? 'All Present' : 
                 essentialStatus === 'warning' ? 'Needs Review' : 'Missing Tags'}
              </div>
              <div className="w-5 h-5">
                {expandedSection === 'essential' ? 
                  <X className="h-5 w-5 text-gray-400" /> : 
                  <span className="text-lg font-medium text-gray-400">+</span>
                }
              </div>
            </div>
          </div>
          
          {expandedSection === 'essential' && (
            <div className="border-t border-gray-100">
              <div className="divide-y divide-gray-100">
                {metaTags.map(tag => renderTag(tag, 'meta'))}
              </div>
            </div>
          )}
        </div>

        {/* Open Graph Tags */}
        <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div 
            className={`p-3 sm:p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors ${
              ogStatus === 'success' ? 'bg-green-50' : 
              ogStatus === 'warning' ? 'bg-amber-50' : 'bg-red-50'
            }`}
            onClick={() => toggleSection('og')}
          >
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                ogStatus === 'success' ? 'bg-green-100 text-green-700' : 
                ogStatus === 'warning' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
              }`}>
                <Share2 className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Open Graph Tags</h4>
                <div className="text-xs text-gray-500 flex items-center mt-0.5">
                  {ogPresent} of {ogTotal} tags present
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`text-xs py-1 px-2 rounded-full ${
                ogStatus === 'success' ? 'bg-green-100 text-green-800' : 
                ogStatus === 'warning' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
              }`}>
                {ogStatus === 'success' ? 'All Present' : 
                 ogStatus === 'warning' ? 'Needs Review' : 'Missing Tags'}
              </div>
              <div className="w-5 h-5">
                {expandedSection === 'og' ? 
                  <X className="h-5 w-5 text-gray-400" /> : 
                  <span className="text-lg font-medium text-gray-400">+</span>
                }
              </div>
            </div>
          </div>
          
          {expandedSection === 'og' && (
            <div className="border-t border-gray-100">
              <div className="divide-y divide-gray-100">
                {openGraphTags.map(tag => renderTag(tag, 'og'))}
              </div>
            </div>
          )}
        </div>

        {/* Twitter Card Tags */}
        <div className="rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div 
            className={`p-3 sm:p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors ${
              twitterStatus === 'success' ? 'bg-green-50' : 
              twitterStatus === 'warning' ? 'bg-amber-50' : 'bg-red-50'
            }`}
            onClick={() => toggleSection('twitter')}
          >
            <div className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                twitterStatus === 'success' ? 'bg-green-100 text-green-700' : 
                twitterStatus === 'warning' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
              }`}>
                <Twitter className="h-4 w-4" />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Twitter Card Tags</h4>
                <div className="text-xs text-gray-500 flex items-center mt-0.5">
                  {twitterPresent} of {twitterTotal} tags present
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`text-xs py-1 px-2 rounded-full ${
                twitterStatus === 'success' ? 'bg-green-100 text-green-800' : 
                twitterStatus === 'warning' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'
              }`}>
                {twitterStatus === 'success' ? 'All Present' : 
                 twitterStatus === 'warning' ? 'Needs Review' : 'Missing Tags'}
              </div>
              <div className="w-5 h-5">
                {expandedSection === 'twitter' ? 
                  <X className="h-5 w-5 text-gray-400" /> : 
                  <span className="text-lg font-medium text-gray-400">+</span>
                }
              </div>
            </div>
          </div>
          
          {expandedSection === 'twitter' && (
            <div className="border-t border-gray-100">
              <div className="divide-y divide-gray-100">
                {twitterCardTags.map(tag => renderTag(tag, 'twitter'))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tip at the bottom */}
      <div className="mt-6 border-t border-gray-100 pt-4 text-xs text-gray-500 flex gap-2 items-center">
        <Info className="h-4 w-4 text-gray-400" />
        <span>Click on each category to expand details. Use the copy button to copy individual meta tags.</span>
      </div>
    </div>
  );
}
