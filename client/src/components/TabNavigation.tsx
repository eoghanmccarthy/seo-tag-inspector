import { useState } from "react";
import { SeoAnalysisResult } from "@shared/schema";
import { Eye, Code, Lightbulb } from "lucide-react";
import PreviewsTab from "./PreviewsTab";
import MetaTagsTab from "./MetaTagsTab";
import RecommendationsTab from "./RecommendationsTab";

interface TabNavigationProps {
  analysisResult: SeoAnalysisResult;
}

export default function TabNavigation({ analysisResult }: TabNavigationProps) {
  const [activeTab, setActiveTab] = useState<'previews' | 'meta-tags' | 'recommendations'>('previews');

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px overflow-x-auto scrollbar-hide" aria-label="Tabs">
          <button 
            className={`min-w-[100px] px-3 md:px-4 py-3 md:py-4 text-center border-b-2 font-medium text-xs sm:text-sm md:text-base whitespace-nowrap flex-1 ${
              activeTab === 'previews' 
                ? 'text-primary border-primary' 
                : 'text-gray-500 hover:text-gray-700 border-transparent'
            }`}
            onClick={() => setActiveTab('previews')}
          >
            <Eye className="inline-block mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden xs:inline">Previews</span>
            <span className="xs:hidden">View</span>
          </button>
          <button 
            className={`min-w-[100px] px-3 md:px-4 py-3 md:py-4 text-center border-b-2 font-medium text-xs sm:text-sm md:text-base whitespace-nowrap flex-1 ${
              activeTab === 'meta-tags' 
                ? 'text-primary border-primary' 
                : 'text-gray-500 hover:text-gray-700 border-transparent'
            }`}
            onClick={() => setActiveTab('meta-tags')}
          >
            <Code className="inline-block mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden xs:inline">Meta Tags</span>
            <span className="xs:hidden">Tags</span>
          </button>
          <button 
            className={`min-w-[100px] px-3 md:px-4 py-3 md:py-4 text-center border-b-2 font-medium text-xs sm:text-sm md:text-base whitespace-nowrap flex-1 ${
              activeTab === 'recommendations' 
                ? 'text-primary border-primary' 
                : 'text-gray-500 hover:text-gray-700 border-transparent'
            }`}
            onClick={() => setActiveTab('recommendations')}
          >
            <Lightbulb className="inline-block mr-1 md:mr-2 h-3 w-3 md:h-4 md:w-4" />
            <span className="hidden xs:inline">Recommendations</span>
            <span className="xs:hidden">Tips</span>
          </button>
        </nav>
      </div>
      
      <div className="p-3 sm:p-4 md:p-6">
        {activeTab === 'previews' && <PreviewsTab analysisResult={analysisResult} />}
        {activeTab === 'meta-tags' && <MetaTagsTab 
          metaTags={analysisResult.metaTags}
          openGraphTags={analysisResult.openGraphTags}
          twitterCardTags={analysisResult.twitterCardTags} 
        />}
        {activeTab === 'recommendations' && <RecommendationsTab recommendations={analysisResult.recommendations} />}
      </div>
    </div>
  );
}
