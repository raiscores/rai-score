import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

const StrengthsGapsChips = ({ strengths, gaps }) => {
  const hasStrengths = strengths && strengths.length > 0;
  const hasGaps = gaps && gaps.length > 0;

  if (!hasStrengths && !hasGaps) return null;

  return (
    <div className="space-y-3">
      {hasStrengths && (
        <div>
          {strengths.length >= 5 ? (
            // Text summary for companies with many strengths
            <div className="flex items-center gap-1.5 text-sm text-green-700 font-medium">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              Strong across {strengths.length === 7 ? 'all 7' : `${strengths.length} of 7`} evaluated pillars
            </div>
          ) : (
            // Individual chips for moderate strength count
            <>
              <div className="text-sm font-medium text-gray-600 mb-1.5">
                Strengths ({strengths.length})
              </div>
              <div className="flex flex-wrap gap-2">
                {strengths.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200"
                  >
                    <CheckCircle className="w-3 h-3" />
                    {s}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      )}
      {hasGaps && (
        <div>
          {gaps.length >= 5 ? (
            // Text summary for companies with many gaps
            <div className="flex items-center gap-1.5 text-sm text-red-700 font-medium">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              No qualifying evidence across {gaps.length === 7 ? 'any' : `${gaps.length} of 7`} evaluated pillars
            </div>
          ) : (
            // Individual chips for moderate gap count
            <>
              <div className="text-sm font-medium text-gray-600 mb-1.5">
                {gaps.length === 1 ? 'Gap' : 'Gaps'} ({gaps.length})
              </div>
              <div className="flex flex-wrap gap-2">
                {gaps.map((g) => (
                  <span
                    key={g}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {g}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default StrengthsGapsChips;
