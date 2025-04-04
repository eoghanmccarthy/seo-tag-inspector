import { SeoRecommendation } from "@shared/schema";
import { CheckCircle, AlertTriangle, AlertCircle } from "lucide-react";

interface RecommendationsTabProps {
  recommendations: SeoRecommendation[];
}

export default function RecommendationsTab({ recommendations }: RecommendationsTabProps) {
  // Filter recommendations by category
  const criticalIssues = recommendations.filter(rec => rec.category === 'critical');
  const improvements = recommendations.filter(rec => rec.category === 'improvement');
  const goodPractices = recommendations.filter(rec => rec.category === 'good');

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h3 className="text-base md:text-lg font-medium text-gray-900 mb-3 md:mb-4">SEO Improvement Recommendations</h3>
        
        <div className="space-y-3 md:space-y-4">
          {criticalIssues.length > 0 && (
            <div className="p-3 md:p-4 bg-red-50 rounded-lg border border-red-200">
              <h4 className="font-medium text-error flex items-center text-sm md:text-base mb-2">
                <AlertCircle className="mr-1.5 md:mr-2 h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                Critical Issues
              </h4>
              <ul className="list-disc pl-4 md:pl-5 space-y-2 text-gray-700">
                {criticalIssues.map((issue, index) => (
                  <li key={index}>
                    <div className="font-medium text-sm md:text-base">{issue.title}</div>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">{issue.description}</p>
                    {issue.code && (
                      <div className="font-mono text-xs bg-white p-2 border border-gray-200 rounded mt-2 overflow-x-auto">
                        <code>{issue.code}</code>
                      </div>
                    )}
                    {issue.solution && (
                      <button className="text-xs text-primary mt-1 underline hover:no-underline tap-target px-1 py-2">
                        Learn how to fix
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {improvements.length > 0 && (
            <div className="p-3 md:p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h4 className="font-medium text-warning flex items-center text-sm md:text-base mb-2">
                <AlertTriangle className="mr-1.5 md:mr-2 h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                Improvements Needed
              </h4>
              <ul className="list-disc pl-4 md:pl-5 space-y-2 text-gray-700">
                {improvements.map((improvement, index) => (
                  <li key={index}>
                    <div className="font-medium text-sm md:text-base">{improvement.title}</div>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">{improvement.description}</p>
                    {improvement.code && (
                      <div className="font-mono text-xs bg-white p-2 border border-gray-200 rounded mt-2 overflow-x-auto">
                        <code>{improvement.code}</code>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {goodPractices.length > 0 && (
            <div className="p-3 md:p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-success flex items-center text-sm md:text-base mb-2">
                <CheckCircle className="mr-1.5 md:mr-2 h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />
                Good Practices Implemented
              </h4>
              <ul className="list-disc pl-4 md:pl-5 space-y-2 text-gray-700">
                {goodPractices.map((practice, index) => (
                  <li key={index}>
                    <div className="font-medium text-sm md:text-base">{practice.title}</div>
                    <p className="text-xs md:text-sm text-gray-600 mt-1">{practice.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-base md:text-lg font-medium text-gray-900 mb-3 md:mb-4">Best Practices Reference</h3>
        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="overflow-x-auto scrollbar-hide">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Meta Tag</th>
                  <th scope="col" className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Recommendation</th>
                  <th scope="col" className="px-3 md:px-6 py-2 md:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impact</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">Title</td>
                  <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-500">50-60 characters, include main keyword</td>
                  <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">High</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">Meta Description</td>
                  <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-500">150-160 characters, compelling with call-to-action</td>
                  <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">High</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">Open Graph Tags</td>
                  <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-500">Include title, description, image (1200x630px), url</td>
                  <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Medium</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">Twitter Cards</td>
                  <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-500">Include card, title, description, image tags</td>
                  <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Medium</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">Canonical URL</td>
                  <td className="px-3 md:px-6 py-2 md:py-4 text-xs md:text-sm text-gray-500">Include to prevent duplicate content issues</td>
                  <td className="px-3 md:px-6 py-2 md:py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">High</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
