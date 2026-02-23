// /src/components/company/PillarCard.js
import React from 'react';
import { Info, ChevronRight } from 'lucide-react';
import { getColorClassesFromStatus, getScoreColor, getScoreGradient } from '../../utils/colorMapping';

const PillarCard = ({
  name,
  score,
  max,
  icon: Icon,
  status,
  description,
  sources,
  evidenceType,
  animateScores = false,
  onViewSources
}) => {
  const color = getColorClassesFromStatus(status);
  const percentage = (score / max) * 100;
  const StatusIcon = color.icon;

  const renderDescription = () => {
    if (!description) return null;
    return <p className="text-sm text-gray-600 mb-3">{description}</p>;
  };

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
              <span className="text-gray-300">&bull;</span>
              <span className="text-sm text-gray-500">{sources} sources</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}</span>
          <span className="text-sm text-gray-500">/{max}</span>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
        <div
          className={`bg-gradient-to-r ${getScoreGradient(score)} h-3 rounded-full transition-all duration-1000 ease-out`}
          style={{ width: animateScores ? `${percentage}%` : '0%' }}
        />
      </div>

      {renderDescription()}

      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Info className="w-3 h-3" />
          Evidence: {evidenceType || 'None'}
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
