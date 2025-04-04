import { useState } from "react";
import { MetaTag } from "@shared/schema";
import { Check, Copy, AlertTriangle, X, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MetaTagsTabProps {
  metaTags: MetaTag[];
  openGraphTags: MetaTag[];
  twitterCardTags: MetaTag[];
}

export default function MetaTagsTab({ metaTags, openGraphTags, twitterCardTags }: MetaTagsTabProps) {
  const { toast } = useToast();
  const [copiedTags, setCopiedTags] = useState<Set<string>>(new Set());

  // Count stats for header icons
  const essentialStatus = metaTags.every(tag => tag.status === 'present') ? 'success' : 
                          metaTags.some(tag => tag.status === 'missing') ? 'error' : 'warning';
  
  const ogStatus = openGraphTags.every(tag => tag.status === 'present') ? 'success' : 
                   openGraphTags.some(tag => tag.status === 'missing') ? 'error' : 'warning';
  
  const twitterStatus = twitterCardTags.every(tag => tag.status === 'present') ? 'success' : 
                         twitterCardTags.some(tag => tag.status === 'missing') ? 'error' : 'warning';

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

  const renderTag = (tag: MetaTag, type: 'meta' | 'og' | 'twitter') => {
    const isPresent = tag.content && tag.status === 'present';
    const tagHtml = type === 'meta' && tag.name === 'title'
      ? `<title>${tag.content}</title>`
      : type === 'og'
        ? `<meta property="${tag.name}" content="${tag.content}">`
        : `<meta name="${tag.name}" content="${tag.content}">`;

    return (
      <div key={tag.name} className="p-3 sm:p-4 hover:bg-gray-100 transition">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center flex-wrap pr-2">
            <span className="font-medium text-gray-700 text-sm sm:text-base mr-2">{tag.name}</span>
            <span className={`mt-1 sm:mt-0 text-xs py-0.5 px-2 rounded-full ${
              isPresent 
                ? 'bg-success/10 text-success' 
                : tag.status === 'warning'
                  ? 'bg-warning/10 text-warning'
                  : 'bg-error/10 text-error'
            }`}>
              {isPresent ? 'Present' : 'Missing'}
            </span>
          </div>
          {isPresent && (
            <button 
              className={`ml-2 text-gray-400 hover:text-gray-600 tap-target p-1 ${copiedTags.has(tag.name) ? 'text-success' : ''}`} 
              title="Copy" 
              onClick={() => handleCopyTag(tag.name, tag.content)}
            >
              {copiedTags.has(tag.name) ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          )}
        </div>
        <div className={`font-mono text-xs sm:text-sm bg-white p-2 border rounded overflow-x-auto ${
          isPresent 
            ? 'border-gray-200' 
            : tag.status === 'warning'
              ? 'border-warning/50'
              : 'border-red-300'
        }`}>
          <code className={isPresent ? '' : 'text-gray-400'}>{tagHtml}</code>
        </div>
        {!isPresent && (
          <div className={`mt-2 text-xs sm:text-sm ${
            tag.status === 'warning' ? 'text-warning' : 'text-error'
          }`}>
            <div className="flex items-start">
              {tag.status === 'warning' 
                ? <Info className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 mt-0.5 flex-shrink-0" /> 
                : <AlertTriangle className="h-3.5 w-3.5 sm:h-4 sm:w-4 mr-1 mt-0.5 flex-shrink-0" />}
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

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-base sm:text-lg font-medium text-gray-900">Meta Tags Overview</h3>
        <button 
          className="text-xs sm:text-sm text-primary flex items-center gap-1 tap-target p-1"
          onClick={handleCopyAllTags}
        >
          <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          <span>Copy All</span>
        </button>
      </div>

      {/* Meta Tag Categories */}
      <div className="space-y-4 sm:space-y-6">
        {/* Essential Meta Tags */}
        <div>
          <h4 className="text-sm sm:text-md font-medium mb-2 sm:mb-3 flex items-center">
            <span className={`text-white p-0.5 sm:p-1 rounded mr-1.5 sm:mr-2 text-xs ${
              essentialStatus === 'success' ? 'bg-success' : 
              essentialStatus === 'warning' ? 'bg-warning' : 'bg-error'
            }`}>
              {essentialStatus === 'success' ? <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : 
               essentialStatus === 'warning' ? <AlertTriangle className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            </span>
            Essential Meta Tags
          </h4>
          <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
            <div className="grid divide-y divide-gray-200">
              {metaTags.map(tag => renderTag(tag, 'meta'))}
            </div>
          </div>
        </div>

        {/* Open Graph Tags */}
        <div>
          <h4 className="text-sm sm:text-md font-medium mb-2 sm:mb-3 flex items-center">
            <span className={`text-white p-0.5 sm:p-1 rounded mr-1.5 sm:mr-2 text-xs ${
              ogStatus === 'success' ? 'bg-success' : 
              ogStatus === 'warning' ? 'bg-warning' : 'bg-error'
            }`}>
              {ogStatus === 'success' ? <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : 
               ogStatus === 'warning' ? <AlertTriangle className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            </span>
            Open Graph Tags
          </h4>
          <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
            <div className="grid divide-y divide-gray-200">
              {openGraphTags.map(tag => renderTag(tag, 'og'))}
            </div>
          </div>
        </div>

        {/* Twitter Card Tags */}
        <div>
          <h4 className="text-sm sm:text-md font-medium mb-2 sm:mb-3 flex items-center">
            <span className={`text-white p-0.5 sm:p-1 rounded mr-1.5 sm:mr-2 text-xs ${
              twitterStatus === 'success' ? 'bg-success' : 
              twitterStatus === 'warning' ? 'bg-warning' : 'bg-error'
            }`}>
              {twitterStatus === 'success' ? <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : 
               twitterStatus === 'warning' ? <AlertTriangle className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
            </span>
            Twitter Card Tags
          </h4>
          <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
            <div className="grid divide-y divide-gray-200">
              {twitterCardTags.map(tag => renderTag(tag, 'twitter'))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
