import { useState, FormEvent, useRef } from "react";
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
  const inputRef = useRef<HTMLInputElement>(null);

  const validateUrl = (value: string) => {
    // Simplified validation for domain part only
    const basicDomainCheck = /^(?!\.)[A-Za-z0-9.-]+\.[A-Za-z]{2,}(?!\.)$/;
    const protocolCheck = /^https?:\/\//;
    
    if (!value.trim()) {
      setError("URL is required");
      return false;
    }
    
    // Always remove protocol for domain check
    const domainPart = value.replace(protocolCheck, '');
    
    // Simple check if it has a valid TLD pattern
    if (!basicDomainCheck.test(domainPart)) {
      setError("Please enter a valid domain like example.com");
      return false;
    }
    
    setError("");
    return true;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (validateUrl(url)) {
      // Ensure clean domain part without protocol
      const cleanDomain = url.replace(/^https?:\/\//, '');
      // Always use https protocol for analysis
      const formattedUrl = `https://${cleanDomain}`;
      
      onAnalyze(formattedUrl);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove any protocol prefix from input and store just the domain
    const inputValue = e.target.value;
    const cleanValue = inputValue.replace(/^https?:\/\//, '');
    setUrl(cleanValue);
    
    if (error) {
      validateUrl(cleanValue);
    }
  };

  return (
    <>
      <form id="url-form" onSubmit={handleSubmit} className="mb-4">
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <div className="flex-grow relative">
            {/* Protocol prefix for desktop */}
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <div className="flex items-center gap-1">
                <svg className="h-4 w-4 md:h-5 md:w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M12.232 4.232a2.5 2.5 0 013.536 3.536l-1.225 1.224a.75.75 0 001.061 1.06l1.224-1.224a4 4 0 00-5.656-5.656l-3 3a4 4 0 00.225 5.865.75.75 0 00.977-1.138 2.5 2.5 0 01-.142-3.667l3-3z" />
                  <path d="M11.603 7.963a.75.75 0 00-.977 1.138 2.5 2.5 0 01.142 3.667l-3 3a2.5 2.5 0 01-3.536-3.536l1.225-1.224a.75.75 0 00-1.061-1.06l-1.224 1.224a4 4 0 105.656 5.656l3-3a4 4 0 00-.225-5.865z" />
                </svg>
                <span className="hidden sm:inline text-xs text-gray-400 font-mono">https://</span>
              </div>
            </div>
            
            {/* Protocol prefix for mobile */}
            <div className="sm:hidden absolute inset-y-0 left-8 flex items-center pointer-events-none">
              <span className="text-xs text-gray-400 font-mono">https://</span>
            </div>
            
            <Input
              ref={inputRef}
              type="text" 
              id="url-input"
              placeholder="example.com"
              className="pl-20 sm:pl-24 text-sm md:text-base h-10 md:h-11 tap-target"
              value={url}
              onChange={handleInputChange}
              required
              aria-label="Website URL"
              title="Enter a valid domain, for example: example.com"
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
