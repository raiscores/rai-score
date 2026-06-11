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

// Canonical pillar order (matches assessment schema and the
// company_list.json pillar_scores array order)
const PILLAR_ORDER = [
  'transparency',
  'fairness',
  'explainability',
  'oversight',
  'privacy',
  'governance',
  'external_accountability',
];

const SHORT_NAMES = {
  transparency: 'Transparency',
  fairness: 'Fairness',
  explainability: 'Explainability',
  oversight: 'Oversight',
  privacy: 'Privacy',
  governance: 'Governance',
  external_accountability: 'Accountability',
};

const SIZES = {
  sm: { cell: 'w-2 h-2', cellGap: 'gap-px', groupGap: 'gap-1' },
  md: { cell: 'w-2.5 h-3.5', cellGap: 'gap-0.5', groupGap: 'gap-1.5' },
};

function cellColors(score, onDark) {
  const empty = onDark ? 'bg-white/20' : 'bg-gray-200';
  if (score >= 2) return ['bg-emerald-500', 'bg-emerald-500'];
  if (score >= 1) return ['bg-amber-400', empty];
  return [empty, empty];
}

/**
 * Accepts either shape:
 *  - assessment object: { transparency: { score, max_score, display_name }, ... }
 *  - company_list array: [2, 2, 0, 2, 2, 2, 2] (canonical pillar order)
 */
function normalize(pillarScores) {
  if (Array.isArray(pillarScores)) {
    return pillarScores.map((score, i) => ({
      key: PILLAR_ORDER[i] || `pillar-${i}`,
      name: SHORT_NAMES[PILLAR_ORDER[i]] || `Pillar ${i + 1}`,
      score: score ?? 0,
      max: 2,
    }));
  }
  const orderedKeys = [
    ...PILLAR_ORDER.filter((k) => pillarScores[k]),
    ...Object.keys(pillarScores).filter((k) => !PILLAR_ORDER.includes(k)),
  ];
  return orderedKeys.map((key) => {
    const details = pillarScores[key];
    return {
      key,
      name: details.display_name || SHORT_NAMES[key] || key,
      score: details.score ?? 0,
      max: details.max_score ?? 2,
    };
  });
}

const PillarStrip = ({ pillarScores, size = 'md', onDark = false, onPillarClick, className = '' }) => {
  if (!pillarScores) return null;

  const s = SIZES[size] || SIZES.md;
  const pillars = normalize(pillarScores);

  return (
    <div
      className={`inline-flex items-center ${s.groupGap} ${className}`}
      role="img"
      aria-label="Pillar scores"
    >
      {pillars.map(({ key, name, score, max }) => {
        const [c1, c2] = cellColors(score, onDark);
        const label = `${name}: ${score}/${max}`;

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
