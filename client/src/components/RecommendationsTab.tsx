import { SeoRecommendation } from "@shared/schema";
import { 
  CheckCircle, 
  AlertTriangle, 
  AlertCircle, 
  Code, 
  ExternalLink, 
  ThumbsUp, 
  Share2, 
  Search,
  Info
} from "lucide-react";

interface RecommendationsTabProps {
  recommendations: SeoRecommendation[];
}

// Impact badge component
const ImpactBadge = ({ impact }: { impact: string }) => {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'low':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };
  
  return (
    <div className={`text-xs py-1 px-2 rounded-full inline-flex items-center border ${getImpactColor(impact)}`}>
      <span className="font-medium">{impact.charAt(0).toUpperCase() + impact.slice(1)} Impact</span>
    </div>
  );
};

// Code snippet component
const CodeSnippet = ({ code }: { code: string }) => {
  return (
    <div className="mt-3 bg-gray-800 rounded-md overflow-hidden text-white">
      <div className="bg-gray-700 px-3 py-1 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code className="h-3 w-3 text-gray-400" />
          <span className="text-xs text-gray-300">Code Example</span>
        </div>
      </div>
      <div className="p-3 overflow-x-auto font-mono text-xs whitespace-pre">
        {code}
      </div>
    </div>
  );
};

export default function RecommendationsTab({ recommendations }: RecommendationsTabProps) {
  // Filter recommendations by category
  const criticalIssues = recommendations.filter(rec => rec.category === 'critical');
  const improvements = recommendations.filter(rec => rec.category === 'improvement');
  const goodPractices = recommendations.filter(rec => rec.category === 'good');

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Summary Info Box */}
      <div className="bg-blue-50 rounded-lg p-3 md:p-4 mb-2 md:mb-4 border border-blue-100 flex items-start gap-3">
        <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="text-blue-800 font-medium mb-1">About SEO Recommendations</h3>
          <p className="text-xs md:text-sm text-blue-700">
            These recommendations are based on SEO best practices. Address critical issues first, 
            then focus on improvements to enhance your page's search visibility.
          </p>
        </div>
      </div>
      
      {/* Recommendation Categories Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <h4 className="font-medium text-gray-900">Critical Issues</h4>
            <div className="bg-red-100 text-red-800 text-xs font-semibold rounded-full h-5 min-w-5 flex items-center justify-center px-1 ml-auto">
              {criticalIssues.length}
            </div>
          </div>
          <p className="text-xs text-gray-600 mb-1">High-priority items that require immediate attention.</p>
          {criticalIssues.length === 0 ? (
            <div className="mt-2 text-xs text-green-600 flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              <span>No critical issues found!</span>
            </div>
          ) : null}
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            <h4 className="font-medium text-gray-900">Improvements</h4>
            <div className="bg-amber-100 text-amber-800 text-xs font-semibold rounded-full h-5 min-w-5 flex items-center justify-center px-1 ml-auto">
              {improvements.length}
            </div>
          </div>
          <p className="text-xs text-gray-600 mb-1">Suggestions to enhance SEO performance.</p>
        </div>
        
        <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <h4 className="font-medium text-gray-900">Good Practices</h4>
            <div className="bg-green-100 text-green-800 text-xs font-semibold rounded-full h-5 min-w-5 flex items-center justify-center px-1 ml-auto">
              {goodPractices.length}
            </div>
          </div>
          <p className="text-xs text-gray-600 mb-1">Well-implemented SEO elements on your page.</p>
        </div>
      </div>

      {/* Detailed Recommendations */}
      <div className="space-y-5">
        <h3 className="text-base md:text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Search className="h-4 w-4 text-primary" />
          </span>
          Detailed SEO Recommendations
        </h3>
        
        <div className="space-y-4">
          {/* Critical Issues */}
          {criticalIssues.length > 0 && (
            <div className="rounded-lg border border-red-200 overflow-hidden shadow-sm">
              <div className="bg-red-50 p-3 flex items-center gap-2 border-b border-red-200">
                <AlertCircle className="h-5 w-5 text-red-500" />
                <h4 className="font-medium text-gray-900">Critical Issues</h4>
              </div>
              <div className="divide-y divide-gray-100">
                {criticalIssues.map((issue, index) => (
                  <div key={index} className="p-4 bg-white">
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-medium text-gray-900">{issue.title}</div>
                      <ImpactBadge impact={issue.impact} />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{issue.description}</p>
                    {issue.code && <CodeSnippet code={issue.code} />}
                    {issue.solution && (
                      <div className="mt-3 pt-2 border-t border-gray-100">
                        <details className="text-sm">
                          <summary className="text-primary font-medium cursor-pointer">How to fix this issue</summary>
                          <div className="mt-2 p-3 bg-gray-50 rounded-md text-gray-700">
                            {issue.solution}
                          </div>
                        </details>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Improvements */}
          {improvements.length > 0 && (
            <div className="rounded-lg border border-amber-200 overflow-hidden shadow-sm">
              <div className="bg-amber-50 p-3 flex items-center gap-2 border-b border-amber-200">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                <h4 className="font-medium text-gray-900">Improvements Needed</h4>
              </div>
              <div className="divide-y divide-gray-100">
                {improvements.map((item, index) => (
                  <div key={index} className="p-4 bg-white">
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-medium text-gray-900">{item.title}</div>
                      <ImpactBadge impact={item.impact} />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    {item.code && <CodeSnippet code={item.code} />}
                    {item.solution && (
                      <div className="mt-3 pt-2 border-t border-gray-100">
                        <details className="text-sm">
                          <summary className="text-primary font-medium cursor-pointer">Implementation tips</summary>
                          <div className="mt-2 p-3 bg-gray-50 rounded-md text-gray-700">
                            {item.solution}
                          </div>
                        </details>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Good Practices */}
          {goodPractices.length > 0 && (
            <div className="rounded-lg border border-green-200 overflow-hidden shadow-sm">
              <div className="bg-green-50 p-3 flex items-center gap-2 border-b border-green-200">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <h4 className="font-medium text-gray-900">Good Practices Implemented</h4>
              </div>
              <div className="divide-y divide-gray-100">
                {goodPractices.map((item, index) => (
                  <div key={index} className="p-4 bg-white">
                    <div className="flex items-start justify-between mb-2">
                      <div className="font-medium text-gray-900">{item.title}</div>
                      <div className="flex items-center text-green-600 text-xs">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        <span>Well done</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SEO Best Practices Reference */}
      <div>
        <h3 className="text-base md:text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
            <Share2 className="h-4 w-4 text-primary" />
          </span>
          SEO Best Practices
        </h3>
        
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meta Tag</th>
                  <th scope="col" className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommendation</th>
                  <th scope="col" className="px-4 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impact</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-2">
                    <Code className="h-4 w-4 text-gray-400" />
                    Title
                  </td>
                  <td className="px-4 md:px-6 py-4 text-sm text-gray-600">50-60 characters, include main keyword</td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">High</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-2">
                    <Code className="h-4 w-4 text-gray-400" />
                    Meta Description
                  </td>
                  <td className="px-4 md:px-6 py-4 text-sm text-gray-600">150-160 characters, compelling with call-to-action</td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">High</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-2">
                    <Code className="h-4 w-4 text-gray-400" />
                    Open Graph Tags
                  </td>
                  <td className="px-4 md:px-6 py-4 text-sm text-gray-600">Include title, description, image (1200x630px), url</td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">Medium</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-2">
                    <Code className="h-4 w-4 text-gray-400" />
                    Twitter Cards
                  </td>
                  <td className="px-4 md:px-6 py-4 text-sm text-gray-600">Include card, title, description, image tags</td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">Medium</span>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-2">
                    <Code className="h-4 w-4 text-gray-400" />
                    Canonical URL
                  </td>
                  <td className="px-4 md:px-6 py-4 text-sm text-gray-600">Include to prevent duplicate content issues</td>
                  <td className="px-4 md:px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">High</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-4 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg flex items-start gap-2 border border-gray-200">
          <ExternalLink className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
          <p>For more detailed SEO best practices, check resources like Google's SEO Starter Guide, Moz, or SEMrush.</p>
        </div>
      </div>
    </div>
  );
}
