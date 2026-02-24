import React from 'react';

const SEGMENTS = [
  { key: 'OPERATIONAL', label: 'Operational', color: 'bg-green-500', dot: 'bg-green-500' },
  { key: 'POLICY', label: 'Policy', color: 'bg-yellow-400', dot: 'bg-yellow-400' },
  { key: 'NARRATIVE', label: 'Narrative', color: 'bg-orange-400', dot: 'bg-orange-400' },
];

const EvidenceBreakdownBar = ({ evidenceBreakdown }) => {
  if (!evidenceBreakdown?.by_type) return null;

  const byType = evidenceBreakdown.by_type;
  const total = (byType.OPERATIONAL || 0) + (byType.POLICY || 0) + (byType.NARRATIVE || 0);

  if (total === 0) return null;

  return (
    <div>
      {/* Segmented bar */}
      <div className="flex h-3 rounded-full overflow-hidden bg-gray-100">
        {SEGMENTS.map(({ key, color }) => {
          const count = byType[key] || 0;
          if (count === 0) return null;
          const pct = (count / total) * 100;
          return (
            <div
              key={key}
              className={`${color} transition-all duration-500`}
              style={{ width: `${pct}%` }}
            />
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-600">
        {SEGMENTS.map(({ key, label, dot }) => {
          const count = byType[key] || 0;
          if (count === 0) return null;
          const pct = Math.round((count / total) * 100);
          return (
            <span key={key} className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${dot}`} />
              {label}: {count} ({pct}%)
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default EvidenceBreakdownBar;
