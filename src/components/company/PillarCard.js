// /src/components/common/PillarCard.js
import React from 'react';
import { Info, ChevronRight } from 'lucide-react';
import { getColorClassesFromStatus, getScoreColor, getScoreGradient } from '../../utils/colorMapping';

/**
 * PillarCard component displays individual responsible AI pillar assessments
 * 
 * Shows pillar name, score, status, description, sources count, and confidence level
 * with color-coded styling based on the pillar's implementation status.
 * 
 * @param {Object} props - Component props
 * @param {string} props.name - Name of the pillar (e.g., "Transparency")
 * @param {number} props.score - Numerical score (typically 0-10)
 * @param {number} props.max - Maximum possible score (typically 10)
 * @param {React.Component} props.icon - Lucide React icon component
 * @param {string} props.status - Implementation status ('excellent', 'good', 'fair', 'poor')
 * @param {string} props.description - Detailed description of pillar findings
 * @param {number} props.sources - Number of sources used for this pillar
 * @param {string} props.confidence - Confidence level ('High', 'Medium', 'Low')
 * @param {boolean} props.animateScores - Whether to animate the progress bar
 * @param {function} props.onViewSources - Callback function when "View Sources" is clicked
 */
const PillarCard = ({ 
  name, 
  score, 
  max, 
  icon: Icon, 
  status, 
  description, 
  sources, 
  confidence, 
  animateScores = false,
  onViewSources 
}) => {
  // Get color classes based on status using our utility function
  const color = getColorClassesFromStatus(status);
  const percentage = (score / max) * 100;
  const StatusIcon = color.icon;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-1">
          <div className={`p-3 rounded-lg ${color.bg} group-hover:scale-105 transition-transform duration-200`}>
            <Icon className={`w-5 h-5 ${color.text}`} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
            <div className="flex items-center gap-2 mb-2">
              <StatusIcon className={`w-4 h-4 ${color.text}`} />
              <span className={`text-sm font-medium capitalize ${color.text}`}>
                {status}
              </span>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-500">{sources} sources</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}</div>
          <div className="text-sm text-gray-500">/{max}</div>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
        <div 
          className={`bg-gradient-to-r ${getScoreGradient(score)} h-3 rounded-full transition-all duration-1000 ease-out`}
          style={{ width: animateScores ? `${percentage}%` : '0%' }}
        />
      </div>
      
      <p className="text-sm text-gray-600 mb-3">{description}</p>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Info className="w-3 h-3" />
          Confidence: {confidence}
        </span>
        {onViewSources && (
          <button 
            onClick={onViewSources}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
          >
            View Sources
            <ChevronRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PillarCard;