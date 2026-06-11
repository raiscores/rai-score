import React from 'react';

/**
 * PillarStrip — the site's signature score mark.
 *
 * Seven segments (one per pillar), each made of two cells that fill by
 * score: 2/2 = both emerald, 1/2 = one amber, 0/2 = both gray. The
 * aggregate visualization IS the pillar breakdown — honest about the
 * 0/1/2 granularity, legible at a glance.
 *
 * Colors match the directory pillar-dot language (emerald/amber/gray).
 */

// Canonical pillar order (matches assessment schema)
const PILLAR_ORDER = [
  'transparency',
  'fairness',
  'explainability',
  'oversight',
  'privacy',
  'governance',
  'external_accountability',
];

const SIZES = {
  sm: { cell: 'w-1.5 h-2', cellGap: 'gap-px', groupGap: 'gap-1' },
  md: { cell: 'w-2.5 h-3.5', cellGap: 'gap-0.5', groupGap: 'gap-1.5' },
};

function cellColors(score) {
  if (score >= 2) return ['bg-emerald-500', 'bg-emerald-500'];
  if (score >= 1) return ['bg-amber-400', 'bg-gray-200'];
  return ['bg-gray-200', 'bg-gray-200'];
}

const PillarStrip = ({ pillarScores, size = 'md', onPillarClick, className = '' }) => {
  if (!pillarScores) return null;

  const s = SIZES[size] || SIZES.md;

  // Canonical order first, then any unexpected extra keys
  const orderedKeys = [
    ...PILLAR_ORDER.filter((k) => pillarScores[k]),
    ...Object.keys(pillarScores).filter((k) => !PILLAR_ORDER.includes(k)),
  ];

  return (
    <div
      className={`inline-flex items-center ${s.groupGap} ${className}`}
      role="img"
      aria-label="Pillar scores"
    >
      {orderedKeys.map((key) => {
        const details = pillarScores[key];
        const score = details.score ?? 0;
        const max = details.max_score ?? 2;
        const [c1, c2] = cellColors(score);
        const label = `${details.display_name || key}: ${score}/${max}`;

        const cells = (
          <span className={`inline-flex ${s.cellGap}`}>
            <span className={`${s.cell} rounded-[2px] ${c1}`} />
            <span className={`${s.cell} rounded-[2px] ${c2}`} />
          </span>
        );

        if (onPillarClick) {
          return (
            <button
              key={key}
              type="button"
              onClick={() => onPillarClick(key)}
              title={label}
              aria-label={label}
              className="inline-flex p-0 border-0 bg-transparent cursor-pointer hover:opacity-75 transition-opacity duration-150"
            >
              {cells}
            </button>
          );
        }

        return (
          <span key={key} title={label} aria-label={label} className="inline-flex">
            {cells}
          </span>
        );
      })}
    </div>
  );
};

export default PillarStrip;
