import React from 'react';
import { getEvidenceTypeLabel, getScoreColor } from '../../utils/colorMapping';

const PillarCard = ({
  name,
  score,
  max,
  icon: Icon,
  bestEvidenceType,
  findings,
  sourceCount,
  onViewSources,
}) => {
  const evidence = getEvidenceTypeLabel(bestEvidenceType);
  const isZero = score === 0;
  const barWidth = max > 0 ? (score / max) * 100 : 0;

  const getBarColor = (s) => {
    if (s >= 2) return 'bg-green-500';
    if (s >= 1) return 'bg-yellow-500';
    return 'bg-gray-300';
  };

  const renderFindings = () => {
    if (!findings) {
      return (
        <p className="text-sm text-gray-500 italic">
          No qualifying public evidence found for this pillar.
        </p>
      );
    }
    if (Array.isArray(findings)) {
      return (
        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
          {findings.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      );
    }
    return <p className="text-sm text-gray-700 leading-relaxed">{findings}</p>;
  };

  return (
    <div
      className={`bg-white rounded-xl p-4 md:p-6 shadow-md border ${
        isZero ? 'border-red-200' : 'border-gray-200'
      }`}
    >
      {/* Header: icon + name + evidence badge on left, score on right */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`p-2 rounded-lg flex-shrink-0 ${evidence.bg}`}>
            <Icon className={`w-5 h-5 ${isZero ? 'text-gray-400' : evidence.color}`} />
          </div>
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <span
            className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border flex-shrink-0 ${evidence.bg} ${evidence.color} ${evidence.border}`}
          >
            {evidence.label}
          </span>
        </div>
        <div className="text-right flex-shrink-0 ml-4">
          <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
            {score}
          </span>
          <span className="text-sm text-gray-400">/{max}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${getBarColor(score)}`}
          style={{ width: `${barWidth}%` }}
        />
      </div>

      {/* Findings — always visible */}
      <div className="mb-4">
        {renderFindings()}
      </div>

      {/* Footer: source count + view sources link */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-sm">
        <span className="text-gray-500">{sourceCount} sources</span>
        {onViewSources && sourceCount > 0 && (
          <button
            onClick={onViewSources}
            className="text-gray-400 hover:text-blue-600 font-medium transition-colors"
          >
            View Sources &rarr;
          </button>
        )}
      </div>
    </div>
  );
};

export default PillarCard;
