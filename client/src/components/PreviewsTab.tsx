import { SeoAnalysisResult } from "@shared/schema";

interface PreviewsTabProps {
  analysisResult: SeoAnalysisResult;
}

export default function PreviewsTab({ analysisResult }: PreviewsTabProps) {
  const { title, description, domain, url, imageUrl } = analysisResult;

  // Default image if none provided
  const defaultImage = "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=315&q=80";
  const displayImage = imageUrl || defaultImage;

  return (
    <div className="space-y-8">
      {/* Google SERP Preview */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="inline-block mr-2 h-5 w-5 text-blue-500" viewBox="0 0 488 512">
            <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
          </svg>
          Google SERP Preview
        </h3>
        <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-2xl">
          <div className="text-xl text-blue-600 font-medium hover:underline mb-1">
            {title || "No title available"}
          </div>
          <div className="text-green-700 text-sm mb-1">{url}</div>
          <div className="text-sm text-gray-600">
            {description || "No description available"}
          </div>
        </div>
      </div>

      {/* Twitter Card Preview */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="inline-block mr-2 h-5 w-5 text-blue-400" viewBox="0 0 512 512">
            <path fill="currentColor" d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"/>
          </svg>
          Twitter Card Preview
        </h3>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden max-w-lg">
          <div className="h-52 bg-gray-100 relative overflow-hidden">
            <img 
              src={displayImage}
              alt="Twitter card preview image" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-500 mb-1">{domain}</p>
            <h4 className="font-bold text-gray-900 mb-2">{title || "No title available"}</h4>
            <p className="text-gray-600 text-sm">
              {description || "No description available"}
            </p>
          </div>
        </div>
      </div>

      {/* Facebook Preview */}
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="inline-block mr-2 h-5 w-5 text-blue-600" viewBox="0 0 512 512">
            <path fill="currentColor" d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"/>
          </svg>
          Facebook Preview
        </h3>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden max-w-lg">
          <div className="h-52 bg-gray-100 relative overflow-hidden">
            <img 
              src={displayImage}
              alt="Facebook preview image" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <p className="text-xs text-gray-500 uppercase mb-1">{domain}</p>
            <h4 className="font-medium text-gray-900 mb-2">{title || "No title available"}</h4>
            <p className="text-gray-600 text-sm">
              {description || "No description available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
