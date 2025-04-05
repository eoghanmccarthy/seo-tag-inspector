import { MetaTag } from '@shared/schema';
import { Check, AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetaTagsSummaryProps {
  metaTags: MetaTag[];
  openGraphTags: MetaTag[];
  twitterCardTags: MetaTag[];
}

export default function MetaTagsSummary({ metaTags, openGraphTags, twitterCardTags }: MetaTagsSummaryProps) {
  // Calculate stats for each category
  const essentialPresent = metaTags.filter(tag => tag.status === 'present').length;
  const essentialTotal = metaTags.length;
  const essentialPercentage = essentialTotal > 0 ? Math.round((essentialPresent / essentialTotal) * 100) : 0;
  const essentialStatus = metaTags.every(tag => tag.status === 'present') 
    ? 'success' 
    : metaTags.some(tag => tag.status === 'missing') 
      ? 'error' 
      : 'warning';

  const ogPresent = openGraphTags.filter(tag => tag.status === 'present').length;
  const ogTotal = openGraphTags.length;
  const ogPercentage = ogTotal > 0 ? Math.round((ogPresent / ogTotal) * 100) : 0;
  const ogStatus = openGraphTags.every(tag => tag.status === 'present') 
    ? 'success' 
    : openGraphTags.some(tag => tag.status === 'missing') 
      ? 'error' 
      : 'warning';

  const twitterPresent = twitterCardTags.filter(tag => tag.status === 'present').length;
  const twitterTotal = twitterCardTags.length;
  const twitterPercentage = twitterTotal > 0 ? Math.round((twitterPresent / twitterTotal) * 100) : 0;
  const twitterStatus = twitterCardTags.every(tag => tag.status === 'present') 
    ? 'success' 
    : twitterCardTags.some(tag => tag.status === 'missing') 
      ? 'error' 
      : 'warning';

  // Helper function to get color based on status
  const getStatusColor = (status: string) => {
    return status === 'success' 
      ? 'bg-green-500' 
      : status === 'warning' 
        ? 'bg-amber-500' 
        : 'bg-red-500';
  };

  const getStatusBgColor = (status: string) => {
    return status === 'success' 
      ? 'bg-green-50 border-green-100' 
      : status === 'warning' 
        ? 'bg-amber-50 border-amber-100' 
        : 'bg-red-50 border-red-100';
  };

  const getStatusIcon = (status: string) => {
    return status === 'success' 
      ? <Check className="h-4 w-4" /> 
      : status === 'warning' 
        ? <AlertTriangle className="h-4 w-4" /> 
        : <X className="h-4 w-4" />;
  };

  // Custom progress bar with dynamic colors
  const CustomProgressBar = ({ value, status }: { value: number, status: string }) => {
    return (
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div 
          className={cn("h-full rounded-full", getStatusColor(status))}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-5 md:p-6">
      <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-4">Meta Tags Summary</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Essential Meta Tags Card */}
        <div className={`rounded-lg border p-4 ${getStatusBgColor(essentialStatus)}`}>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${getStatusColor(essentialStatus)}`}>
                {getStatusIcon(essentialStatus)}
              </div>
              <h4 className="font-medium text-sm text-gray-800">Essential</h4>
            </div>
            <span className="text-sm font-semibold">{essentialPresent}/{essentialTotal}</span>
          </div>
          
          <CustomProgressBar value={essentialPercentage} status={essentialStatus} />
          
          <p className="mt-2 text-xs text-gray-600">
            {essentialStatus === 'success' 
              ? 'All essential meta tags are present!' 
              : essentialStatus === 'warning' 
                ? 'Some essential tags need attention' 
                : 'Critical tags are missing'}
          </p>
        </div>

        {/* Open Graph Tags Card */}
        <div className={`rounded-lg border p-4 ${getStatusBgColor(ogStatus)}`}>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${getStatusColor(ogStatus)}`}>
                {getStatusIcon(ogStatus)}
              </div>
              <h4 className="font-medium text-sm text-gray-800">Open Graph</h4>
            </div>
            <span className="text-sm font-semibold">{ogPresent}/{ogTotal}</span>
          </div>
          
          <CustomProgressBar value={ogPercentage} status={ogStatus} />
          
          <p className="mt-2 text-xs text-gray-600">
            {ogStatus === 'success' 
              ? 'All Open Graph tags are present!' 
              : ogStatus === 'warning' 
                ? 'Some Open Graph tags need attention' 
                : 'Critical Open Graph tags are missing'}
          </p>
        </div>

        {/* Twitter Card Tags Card */}
        <div className={`rounded-lg border p-4 ${getStatusBgColor(twitterStatus)}`}>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${getStatusColor(twitterStatus)}`}>
                {getStatusIcon(twitterStatus)}
              </div>
              <h4 className="font-medium text-sm text-gray-800">Twitter Cards</h4>
            </div>
            <span className="text-sm font-semibold">{twitterPresent}/{twitterTotal}</span>
          </div>
          
          <CustomProgressBar value={twitterPercentage} status={twitterStatus} />
          
          <p className="mt-2 text-xs text-gray-600">
            {twitterStatus === 'success' 
              ? 'All Twitter Card tags are present!' 
              : twitterStatus === 'warning' 
                ? 'Some Twitter Card tags need attention' 
                : 'Critical Twitter Card tags are missing'}
          </p>
        </div>
      </div>
    </div>
  );
}