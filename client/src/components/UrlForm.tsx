import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface RecentUrl {
  url: string;
  domain: string;
}

interface UrlFormProps {
  onAnalyze: (url: string) => void;
  recentUrls: RecentUrl[];
  onRecentUrlClick: (url: string) => void;
  isLoading: boolean;
}

export default function UrlForm({ onAnalyze, recentUrls, onRecentUrlClick, isLoading }: UrlFormProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const validateUrl = (value: string) => {
    const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    
    if (!value.trim()) {
      setError("URL is required");
      return false;
    }
    
    if (!urlRegex.test(value)) {
      setError("Please enter a valid URL including http:// or https://");
      return false;
    }
    
    setError("");
    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validateUrl(url)) {
      onAnalyze(url);
    }
  };

  return (
    <>
      <form id="url-form" onSubmit={handleSubmit} className="mb-4">
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 md:h-5 md:w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
                <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
              </svg>
            </div>
            <Input
              type="url"
              id="url-input"
              placeholder="https://example.com"
              className="pl-10 text-sm md:text-base h-10 md:h-11 tap-target"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) validateUrl(e.target.value);
              }}
              required
            />
          </div>
          <Button 
            type="submit" 
            className="gap-2 h-10 md:h-11 tap-target"
            disabled={isLoading}
          >
            <span className="text-sm md:text-base">Analyze</span>
            <Search className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </Button>
        </div>
        {error && <p className="mt-2 text-destructive text-xs md:text-sm">{error}</p>}
      </form>
      
      {recentUrls.length > 0 && (
        <div className="mt-4 md:mt-6">
          <h3 className="text-xs md:text-sm font-medium text-gray-500 mb-2">Recent Analyses</h3>
          <div className="flex flex-wrap gap-1.5 md:gap-2">
            {recentUrls.map((item, index) => (
              <button 
                key={index}
                className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-full px-2.5 py-1 transition tap-target"
                onClick={() => onRecentUrlClick(item.url)}
              >
                {item.domain}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
