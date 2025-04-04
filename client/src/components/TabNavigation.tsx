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
        <nav className="flex -mb-px overflow-x-auto" aria-label="Tabs">
          <button 
            className={`px-4 py-4 text-center border-b-2 font-medium text-sm sm:text-base whitespace-nowrap flex-1 sm:flex-none ${
              activeTab === 'previews' 
                ? 'text-primary border-primary' 
                : 'text-gray-500 hover:text-gray-700 border-transparent'
            }`}
            onClick={() => setActiveTab('previews')}
          >
            <Eye className="inline-block mr-2 h-4 w-4" />
            Previews
          </button>
          <button 
            className={`px-4 py-4 text-center border-b-2 font-medium text-sm sm:text-base whitespace-nowrap flex-1 sm:flex-none ${
              activeTab === 'meta-tags' 
                ? 'text-primary border-primary' 
                : 'text-gray-500 hover:text-gray-700 border-transparent'
            }`}
            onClick={() => setActiveTab('meta-tags')}
          >
            <Code className="inline-block mr-2 h-4 w-4" />
            Meta Tags
          </button>
          <button 
            className={`px-4 py-4 text-center border-b-2 font-medium text-sm sm:text-base whitespace-nowrap flex-1 sm:flex-none ${
              activeTab === 'recommendations' 
                ? 'text-primary border-primary' 
                : 'text-gray-500 hover:text-gray-700 border-transparent'
            }`}
            onClick={() => setActiveTab('recommendations')}
          >
            <Lightbulb className="inline-block mr-2 h-4 w-4" />
            Recommendations
          </button>
        </nav>
      </div>
      
      <div className="p-6">
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
