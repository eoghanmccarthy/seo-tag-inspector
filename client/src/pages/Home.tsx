import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { SeoAnalysisResult } from "@shared/schema";

import UrlForm from "@/components/UrlForm";
import SeoScoreOverview from "@/components/SeoScoreOverview";
import TabNavigation from "@/components/TabNavigation";
import Footer from "@/components/Footer";

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<SeoAnalysisResult | null>(null);
  const { toast } = useToast();

  // Query for recent analyses
  const { data: recentAnalyses = [] } = useQuery({
    queryKey: ['/api/recent-analyses'],
  });

  // Mutation for analyzing a URL
  const analyzeMutation = useMutation({
    mutationFn: async (url: string) => {
      const res = await apiRequest('POST', '/api/analyze', { url });
      return res.json();
    },
    onSuccess: (data) => {
      setAnalysisResult(data);
      queryClient.invalidateQueries({ queryKey: ['/api/recent-analyses'] });
    },
    onError: (error: Error) => {
      toast({
        title: "Error analyzing URL",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleAnalyzeUrl = (url: string) => {
    analyzeMutation.mutate(url);
  };

  const handleRecentUrlClick = (url: string) => {
    analyzeMutation.mutate(url);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-primary font-bold text-xl">SEO Meta Analyzer</span>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">Docs</a>
                <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">About</a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* URL Input Section */}
          <section className="mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h1 className="text-2xl font-semibold mb-4">Analyze Your Website's SEO Meta Tags</h1>
              <p className="text-gray-600 mb-6">Enter any URL to check its SEO meta tags and get visual previews for search engines and social media.</p>
              
              <UrlForm 
                onAnalyze={handleAnalyzeUrl} 
                recentUrls={recentAnalyses}
                onRecentUrlClick={handleRecentUrlClick}
                isLoading={analyzeMutation.isPending}
              />
            </div>
          </section>

          {/* Loading State */}
          {analyzeMutation.isPending && (
            <div className="bg-white rounded-lg shadow-sm p-8 flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4"></div>
              <p className="text-gray-600">Analyzing website SEO tags...</p>
            </div>
          )}

          {/* Results Container */}
          {analysisResult && !analyzeMutation.isPending && (
            <div className="space-y-8">
              <SeoScoreOverview 
                score={analysisResult.score} 
                scoreCategory={analysisResult.scoreCategory} 
              />
              <TabNavigation analysisResult={analysisResult} />
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
