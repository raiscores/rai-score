import React from 'react';
import { getEvidenceTypeLabel } from '../../utils/colorMapping';

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

  // Discrete 2-cell score mark (matches PillarStrip color language)
  const scoreCells =
    score >= 2
      ? ['bg-emerald-500', 'bg-emerald-500']
      : score >= 1
      ? ['bg-amber-400', 'bg-gray-200']
      : ['bg-gray-200', 'bg-gray-200'];

  const scoreInk =
    score >= 2 ? 'text-emerald-700' : score >= 1 ? 'text-amber-700' : 'text-gray-500';

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
      {/* Header: icon + name + evidence badge on left, score mark on right */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="p-2 rounded-lg flex-shrink-0 bg-slate-100">
            <Icon className={`w-5 h-5 ${isZero ? 'text-gray-400' : 'text-slate-600'}`} />
          </div>
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <span
            className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border flex-shrink-0 ${evidence.bg} ${evidence.color} ${evidence.border}`}
          >
            {evidence.label}
          </span>
        </div>
        <div className="flex items-center gap-2.5 flex-shrink-0 ml-4">
          <span className="inline-flex gap-0.5" aria-hidden="true">
            <span className={`w-3.5 h-2 rounded-[2px] ${scoreCells[0]}`} />
            <span className={`w-3.5 h-2 rounded-[2px] ${scoreCells[1]}`} />
          </span>
          <span className={`font-mono text-lg font-semibold ${scoreInk}`}>
            {score}<span className="text-sm font-normal text-gray-400">/{max}</span>
          </span>
        </div>
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
