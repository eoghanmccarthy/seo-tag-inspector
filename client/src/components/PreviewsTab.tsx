import { SeoAnalysisResult } from "@shared/schema";
import { SearchCheck, Twitter, Facebook } from 'lucide-react';

interface PreviewsTabProps {
  analysisResult: SeoAnalysisResult;
}

export default function PreviewsTab({ analysisResult }: PreviewsTabProps) {
  const { title, description, domain, url, imageUrl } = analysisResult;

  // Default image if none provided
  const defaultImage = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=315&q=80";
  const displayImage = imageUrl || defaultImage;

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="bg-blue-50 rounded-lg p-3 md:p-4 mb-2 md:mb-4 border border-blue-100">
        <h3 className="text-blue-800 font-medium mb-1">About Previews</h3>
        <p className="text-xs md:text-sm text-blue-700">
          These previews show how your page appears in search results and social media shares. 
          The content comes from your meta tags, title, and description.
        </p>
      </div>
      
      {/* Google SERP Preview */}
      <div className="transition-all duration-200 hover:shadow-md">
        <div className="flex items-center gap-2 mb-3 md:mb-4">
          <div className="bg-blue-50 p-2 rounded-full">
            <SearchCheck className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
          </div>
          <h3 className="text-base md:text-lg font-medium text-gray-900">
            Google Search Results Preview
          </h3>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-4 md:p-5 max-w-2xl shadow-sm">
          <div className="flex items-center gap-2 mb-3 border-b border-gray-100 pb-2">
            <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">G</div>
            <div className="text-xs text-gray-500">Google</div>
          </div>
          
          <div className="text-base md:text-xl text-blue-600 font-medium hover:underline mb-1 line-clamp-1">
            {title || "No title available"}
          </div>
          <div className="text-green-700 text-xs md:text-sm mb-2 break-all flex items-center gap-1">
            <span className="bg-green-100 text-green-800 text-xs px-1 py-0.5 rounded">https://</span>
            {url.replace(/^https?:\/\//, '')}
          </div>
          <div className="text-xs md:text-sm text-gray-600 line-clamp-3 font-light">
            {description || "No description available"}
          </div>
        </div>
        <div className="text-xs text-gray-500 mt-2 ml-2">
          <span className="font-semibold">Pro Tip:</span> Google typically displays the first 50-60 characters of a title tag.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Twitter Card Preview */}
        <div className="transition-all duration-200 hover:shadow-md">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <div className="bg-blue-50 p-2 rounded-full">
              <Twitter className="h-5 w-5 md:h-6 md:w-6 text-[#1DA1F2]" />
            </div>
            <h3 className="text-base md:text-lg font-medium text-gray-900">
              Twitter Card Preview
            </h3>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden max-w-lg shadow-sm">
            <div className="h-40 sm:h-52 bg-gray-100 relative overflow-hidden">
              <img 
                src={displayImage}
                alt="Twitter card preview image" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = defaultImage;
                }}
              />
              {!imageUrl && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xs md:text-sm">
                  No Open Graph image found
                </div>
              )}
            </div>
            <div className="p-3 md:p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500 text-xs font-bold">{domain.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <p className="text-xs md:text-sm font-bold text-gray-900">{domain}</p>
                  <p className="text-xs text-gray-500">@{domain.split('.')[0]}</p>
                </div>
              </div>
              <h4 className="font-bold text-gray-900 text-sm md:text-base mb-1 md:mb-2 line-clamp-1">
                {title || "No title available"}
              </h4>
              <p className="text-gray-600 text-xs md:text-sm line-clamp-2 mb-3">
                {description || "No description available"}
              </p>
              <div className="border-t border-gray-100 pt-2 flex justify-between">
                <div className="text-xs text-gray-400">10:30 AM · Apr 5, 2025</div>
                <div className="text-xs text-gray-400">twitter.com</div>
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-2 ml-2">
            <span className="font-semibold">Pro Tip:</span> Twitter cards require specific meta tags like twitter:card and twitter:title.
          </div>
        </div>

        {/* Facebook Preview */}
        <div className="transition-all duration-200 hover:shadow-md">
          <div className="flex items-center gap-2 mb-3 md:mb-4">
            <div className="bg-blue-50 p-2 rounded-full">
              <Facebook className="h-5 w-5 md:h-6 md:w-6 text-[#1877F2]" />
            </div>
            <h3 className="text-base md:text-lg font-medium text-gray-900">
              Facebook Preview
            </h3>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden max-w-lg shadow-sm">
            <div className="flex items-center gap-2 p-3 border-b border-gray-100">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-500 text-xs font-bold">{domain.charAt(0).toUpperCase()}</span>
              </div>
              <div>
                <p className="text-xs md:text-sm font-bold text-gray-900">{domain}</p>
                <p className="text-xs text-gray-500">Sponsored · <span className="text-blue-500">Follow</span></p>
              </div>
            </div>
            <div className="h-40 sm:h-52 bg-gray-100 relative overflow-hidden">
              <img 
                src={displayImage}
                alt="Facebook preview image" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = defaultImage;
                }}
              />
              {!imageUrl && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xs md:text-sm">
                  No Open Graph image found
                </div>
              )}
            </div>
            <div className="p-3 md:p-4">
              <p className="text-xs text-gray-500 uppercase mb-1">{domain}</p>
              <h4 className="font-medium text-gray-900 text-sm md:text-base mb-1 md:mb-2 line-clamp-1">
                {title || "No title available"}
              </h4>
              <p className="text-gray-600 text-xs md:text-sm line-clamp-2 mb-3">
                {description || "No description available"}
              </p>
              <div className="border-t border-gray-100 pt-2 text-center">
                <div className="inline-block text-xs text-blue-600 bg-blue-50 px-3 py-1 rounded-full">Learn More</div>
              </div>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-2 ml-2">
            <span className="font-semibold">Pro Tip:</span> Facebook uses Open Graph meta tags (og:title, og:description, og:image).
          </div>
        </div>
      </div>
    </div>
  );
}
