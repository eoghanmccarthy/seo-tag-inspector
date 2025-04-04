import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { SeoAnalysisResult } from "@shared/schema";
import { Menu } from "lucide-react";

import UrlForm from "@/components/UrlForm";
import SeoScoreOverview from "@/components/SeoScoreOverview";
import TabNavigation from "@/components/TabNavigation";
import Footer from "@/components/Footer";
import { queryClient } from "@/lib/queryClient";

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<SeoAnalysisResult | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  // Query for recent analyses
  const { data: recentAnalyses = [] } = useQuery<{url: string, domain: string}[]>({
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
      // Scroll to results on mobile
      if (window.innerWidth < 768) {
        setTimeout(() => {
          document.getElementById('results-container')?.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
          });
        }, 100);
      }
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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <span className="text-primary font-bold text-lg md:text-xl">SEO Meta Analyzer</span>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">Docs</a>
                <a href="#" className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">About</a>
              </div>
            </div>
            <div className="md:hidden">
              <button
                type="button"
                className="bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
                aria-expanded="false"
                onClick={toggleMobileMenu}
              >
                <span className="sr-only">Open main menu</span>
                <Menu className="block h-6 w-6" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="text-gray-500 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">Docs</a>
              <a href="#" className="text-gray-500 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">About</a>
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
          {/* URL Input Section */}
          <section className="mb-6 md:mb-8">
            <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
              <h1 className="text-xl md:text-2xl font-semibold mb-2 md:mb-4">Analyze Your Website's SEO Meta Tags</h1>
              <p className="text-gray-600 text-sm md:text-base mb-4 md:mb-6">Enter any URL to check its SEO meta tags and get visual previews for search engines and social media.</p>
              
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
            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 flex flex-col items-center">
              <div className="animate-spin rounded-full h-10 w-10 md:h-12 md:w-12 border-b-2 border-primary mb-3 md:mb-4"></div>
              <p className="text-gray-600 text-sm md:text-base">Analyzing website SEO tags...</p>
            </div>
          )}

          {/* Results Container */}
          {analysisResult && !analyzeMutation.isPending && (
            <div id="results-container" className="space-y-6 md:space-y-8">
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
