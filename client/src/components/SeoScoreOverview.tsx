import { SeoCategoryScore } from "@shared/schema";
import { BadgeCheck, AlertTriangle, AlertCircle, ChevronUp, ChevronDown } from 'lucide-react';

interface SeoScoreOverviewProps {
  score: number;
  scoreCategory: SeoCategoryScore;
}

export default function SeoScoreOverview({ score, scoreCategory }: SeoScoreOverviewProps) {
  // Determine score label
  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Average";
    if (score >= 30) return "Poor";
    return "Critical";
  };

  // Determine score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return "#10B981"; // green
    if (score >= 70) return "#10B981"; // green
    if (score >= 50) return "#F59E0B"; // yellow
    if (score >= 30) return "#F59E0B"; // yellow
    return "#EF4444"; // red
  };

  // Determine score text
  const getScoreDescription = (score: number) => {
    if (score >= 80) return "This site has excellent SEO implementation! Most essential tags are present.";
    if (score >= 70) return "Good SEO implementation with most important tags present.";
    if (score >= 50) return "Average SEO implementation. Several improvements needed.";
    if (score >= 30) return "Poor SEO implementation with many missing tags.";
    return "Critical SEO issues found. Significant improvements needed.";
  };

  const scoreColor = getScoreColor(score);
  const scoreLabel = getScoreLabel(score);
  const scoreDescription = getScoreDescription(score);

  // Calculate total tags for percentage
  const totalTags = scoreCategory.good + scoreCategory.improvements + scoreCategory.issues;

  // Animation class for the score circle
  const strokeDashoffset = 100 - score;

  return (
    <section className="bg-white rounded-lg shadow-sm p-4 md:p-6 border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">
        <div>
          <h2 className="text-lg md:text-xl font-semibold mb-2">SEO Health Score</h2>
          <p className="text-sm text-gray-600">{scoreDescription}</p>
          
          <div className="flex gap-2 mt-4">
            {score >= 70 && (
              <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs">
                <ChevronUp className="h-3 w-3" />
                <span>Strong SEO</span>
              </div>
            )}
            {score < 70 && score >= 50 && (
              <div className="inline-flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs">
                <AlertTriangle className="h-3 w-3" />
                <span>Needs improvement</span>
              </div>
            )}
            {score < 50 && (
              <div className="inline-flex items-center gap-1 px-2 py-1 bg-red-50 text-red-700 rounded-full text-xs">
                <ChevronDown className="h-3 w-3" />
                <span>Poor SEO</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex justify-center md:justify-end">
          <div className="w-32 h-32 md:w-40 md:h-40 relative">
            {/* SVG Circle Progress with animation */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <circle
                className="text-gray-100"
                strokeWidth="3"
                stroke="currentColor"
                fill="transparent"
                r="16"
                cx="18"
                cy="18"
              />
              <circle
                className="transition-all duration-1000 ease-in-out"
                strokeWidth="3"
                strokeDasharray="100"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke={scoreColor}
                fill="transparent"
                r="16"
                cx="18"
                cy="18"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-2xl md:text-3xl font-bold" style={{ color: scoreColor }}>{score}%</span>
              <span className="text-sm text-gray-600 font-medium mt-1">{scoreLabel}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <BadgeCheck className="w-5 h-5 text-green-500" />
              <h3 className="font-medium text-gray-800">Good</h3>
            </div>
            <div className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
              {scoreCategory.good}
            </div>
          </div>
          <div className="mt-1 text-xs text-gray-600">Elements that meet SEO best practices</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3 overflow-hidden">
            <div 
              className="bg-green-500 h-2 rounded-full transition-all duration-500 ease-out" 
              style={{ 
                width: totalTags > 0 ? `${Math.round((scoreCategory.good / totalTags) * 100)}%` : '0%'
              }}
            ></div>
          </div>
        </div>
        
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3 className="font-medium text-gray-800">Improvements</h3>
            </div>
            <div className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
              {scoreCategory.improvements}
            </div>
          </div>
          <div className="mt-1 text-xs text-gray-600">Elements that could be improved</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3 overflow-hidden">
            <div 
              className="bg-amber-500 h-2 rounded-full transition-all duration-500 ease-out" 
              style={{ 
                width: totalTags > 0 ? `${Math.round((scoreCategory.improvements / totalTags) * 100)}%` : '0%'
              }}
            ></div>
          </div>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg border border-red-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <h3 className="font-medium text-gray-800">Issues</h3>
            </div>
            <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              {scoreCategory.issues}
            </div>
          </div>
          <div className="mt-1 text-xs text-gray-600">Critical elements needing attention</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-3 overflow-hidden">
            <div 
              className="bg-red-500 h-2 rounded-full transition-all duration-500 ease-out" 
              style={{ 
                width: totalTags > 0 ? `${Math.round((scoreCategory.issues / totalTags) * 100)}%` : '0%'
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
