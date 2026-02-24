import React from 'react';
import { Info } from 'lucide-react';

const PILLAR_SHORT_NAMES = {
  transparency: 'Transparency',
  fairness: 'Fairness',
  explainability: 'Explainability',
  oversight: 'Oversight',
  privacy: 'Privacy',
  governance: 'Governance',
  external_accountability: 'Accountability',
};

const getScoreBg = (score) => {
  if (score >= 2) return 'bg-green-500';
  if (score >= 1) return 'bg-yellow-400';
  return 'bg-gray-300';
};

const getScoreTextColor = (score) => {
  if (score >= 2) return 'text-white';
  if (score >= 1) return 'text-yellow-900';
  return 'text-gray-600';
};

const PillarHeatmap = ({ pillarScores, PILLAR_ICONS, onPillarClick }) => {
  if (!pillarScores) return null;

  const pillars = Object.entries(pillarScores);

  return (
    <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
      {pillars.map(([key, details]) => {
        const Icon = PILLAR_ICONS?.[key] || Info;
        const score = details.score ?? 0;
        const max = details.max_score ?? 2;
        return (
          <div
            key={key}
            className={`rounded-lg p-2 text-center cursor-pointer hover:opacity-80 transition-opacity ${getScoreBg(score)}`}
            title={`${details.display_name}: ${score}/${max}`}
            onClick={() => onPillarClick?.(key)}
          >
            <div className="flex justify-center mb-1">
              <Icon className={`w-4 h-4 ${getScoreTextColor(score)}`} />
            </div>
            <div className={`text-sm font-bold ${getScoreTextColor(score)}`}>
              {score}/{max}
            </div>
            <div className={`text-[10px] leading-tight mt-0.5 ${getScoreTextColor(score)} opacity-80`}>
              {PILLAR_SHORT_NAMES[key] || details.display_name}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PillarHeatmap;
