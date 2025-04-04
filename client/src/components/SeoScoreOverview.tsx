import { SeoCategoryScore } from "@shared/schema";

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

  const scoreColor = getScoreColor(score);
  const scoreLabel = getScoreLabel(score);

  return (
    <section className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">SEO Health Score</h2>
        <div className="flex items-center mt-4 sm:mt-0">
          <div className="w-32 h-32 relative">
            {/* SVG Circle Progress */}
            <svg className="w-full h-full" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="3"
                strokeDasharray="100, 100"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={scoreColor}
                strokeWidth="3"
                strokeDasharray={`${score}, 100`}
                id="score-circle"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-2xl font-bold text-gray-800">{score}%</span>
              <span className="text-xs text-gray-500">{scoreLabel}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Good</span>
            <span className="font-semibold text-success">{scoreCategory.good}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div 
              className="bg-success h-1.5 rounded-full" 
              style={{ 
                width: `${Math.round((scoreCategory.good / (scoreCategory.good + scoreCategory.improvements + scoreCategory.issues)) * 100)}%` 
              }}
            ></div>
          </div>
        </div>
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Improvements</span>
            <span className="font-semibold text-warning">{scoreCategory.improvements}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div 
              className="bg-warning h-1.5 rounded-full" 
              style={{ 
                width: `${Math.round((scoreCategory.improvements / (scoreCategory.good + scoreCategory.improvements + scoreCategory.issues)) * 100)}%` 
              }}
            ></div>
          </div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-100">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-600">Issues</span>
            <span className="font-semibold text-error">{scoreCategory.issues}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
            <div 
              className="bg-error h-1.5 rounded-full" 
              style={{ 
                width: `${Math.round((scoreCategory.issues / (scoreCategory.good + scoreCategory.improvements + scoreCategory.issues)) * 100)}%` 
              }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
