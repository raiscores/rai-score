import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from '../Container';
import PillarStrip from '../company/PillarStrip';
import { getGradeFromScore, getGradeColor } from '../../utils/colorMapping';

// Curated: household names, 6 industries, score range 9-14
const FEATURED_SLUGS = [
  'alphabet',         // 14/14, Communication Services
  'ford-motor',       // 13/14, Consumer Discretionary
  'apple',            // 12/14, Information Technology
  'jpmorgan-chase',   // 11/14, Financial Services
  'walmart',          // 11/14, Consumer Staples
  'johnson-johnson',  // 9/14, Health Care
];

// Local logo paths (served from /public/logos/)
const LOGO_FILES = {
  'alphabet': '/logos/alphabet.svg',
  'ford-motor': '/logos/ford-motor.svg',
  'apple': '/logos/apple.svg',
  'jpmorgan-chase': '/logos/jpmorgan-chase.svg',
  'walmart': '/logos/walmart.svg',
  'johnson-johnson': '/logos/johnson-johnson.svg',
};

function getInitialColor(slug) {
  const colors = {
    'alphabet': 'bg-blue-100 text-blue-700',
    'ford-motor': 'bg-indigo-100 text-indigo-700',
    'apple': 'bg-slate-100 text-slate-700',
    'jpmorgan-chase': 'bg-sky-100 text-sky-700',
    'walmart': 'bg-amber-100 text-amber-700',
    'johnson-johnson': 'bg-red-100 text-red-700',
  };
  return colors[slug] || 'bg-slate-100 text-slate-700';
}

function CompanyLogo({ slug, name }) {
  const logoPath = LOGO_FILES[slug];
  const initial = (name || slug)[0].toUpperCase();

  return (
    <div className="w-9 h-9 rounded-md border border-gray-200 overflow-hidden shrink-0 flex items-center justify-center bg-white">
      {logoPath ? (
        <img
          src={logoPath}
          alt={`${name} logo`}
          className="w-full h-full object-contain p-1"
          onError={(e) => {
            const parent = e.target.parentNode;
            e.target.remove();
            const fallback = document.createElement('span');
            fallback.className = `w-full h-full flex items-center justify-center text-sm font-bold ${getInitialColor(slug)}`;
            fallback.textContent = initial;
            parent.appendChild(fallback);
          }}
        />
      ) : (
        <span className={`w-full h-full flex items-center justify-center text-sm font-bold ${getInitialColor(slug)}`}>
          {initial}
        </span>
      )}
    </div>
  );
}

function FeaturedEvaluations({ companies, totalCount }) {
  const featured = useMemo(() => {
    if (!companies || companies.length === 0) return [];
    return FEATURED_SLUGS
      .map(slug => companies.find(c => c.slug === slug))
      .filter(Boolean);
  }, [companies]);

  if (featured.length === 0) return null;

  return (
    <section id="featured-evaluations" className="py-12 md:py-16 bg-slate-50">
      <Container size="wide">
        {/* Section header — left-aligned with view-all on the right */}
        <div className="max-w-5xl mx-auto mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400 mb-2">
              From the index
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1.5">
              Featured evaluations
            </h2>
            <p className="text-base text-slate-600 m-0">
              How household names score on responsible AI governance.
            </p>
          </div>
          <Link
            to="/companies"
            className="inline-flex items-center text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors no-underline shrink-0"
          >
            View all {totalCount} evaluations
            <ArrowRight className="ml-1.5" size={16} />
          </Link>
        </div>

        {/* Company cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 max-w-5xl mx-auto">
          {featured.map((company) => {
            const score = company.score || 0;
            const maxScore = company.max_score || 14;
            const grade = getGradeFromScore(score, maxScore);

            return (
              <Link
                key={company.slug}
                to={`/company/${company.slug}`}
                className="group bg-white rounded-lg border border-gray-300 p-5 hover:border-blue-400 hover:-translate-y-0.5 transition-all duration-200 no-underline flex gap-4"
              >
                {/* Logo column */}
                <CompanyLogo slug={company.slug} name={company.display_name || company.name} />

                {/* Content column */}
                <div className="flex-1 min-w-0">
                  {/* Name + grade */}
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-base font-bold text-slate-900 leading-tight truncate">
                      {company.display_name || company.name}
                    </h3>
                    <span className={`font-mono text-lg font-bold ml-3 whitespace-nowrap ${getGradeColor(grade)}`}>
                      {grade}
                    </span>
                  </div>

                  {/* Industry pill */}
                  <div className="mb-3.5">
                    <span className="inline-block text-xs font-medium text-slate-500 bg-slate-100 rounded-full px-2.5 py-0.5">
                      {company.industry}
                    </span>
                  </div>

                  {/* Pillar strip + score */}
                  <div className="flex items-center justify-between mb-3">
                    <PillarStrip pillarScores={company.pillar_scores} size="sm" />
                    <span className="font-mono text-sm font-semibold text-slate-700 tabular-nums">
                      {score}<span className="font-normal text-slate-400">/{maxScore}</span>
                    </span>
                  </div>

                  {/* Metadata + view link */}
                  <div className="flex items-center justify-between">
                    <p className="font-mono text-[11px] text-slate-400 m-0">
                      7 pillars · 2026
                    </p>
                    <span className="text-xs text-blue-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 sm:opacity-0 max-sm:opacity-100">
                      View evaluation →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default FeaturedEvaluations;
