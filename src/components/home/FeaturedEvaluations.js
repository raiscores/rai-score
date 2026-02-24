import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from '../Container';

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

function getBarColor(score) {
  if (score >= 12) return 'bg-emerald-500';
  if (score >= 9) return 'bg-blue-500';
  if (score >= 5) return 'bg-amber-500';
  return 'bg-red-500';
}

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

function FeaturedEvaluations({ companies, totalCount, isVisible }) {
  const featured = useMemo(() => {
    if (!companies || companies.length === 0) return [];
    return FEATURED_SLUGS
      .map(slug => companies.find(c => c.slug === slug))
      .filter(Boolean);
  }, [companies]);

  if (featured.length === 0) return null;

  return (
    <section
      id="featured-evaluations"
      data-reveal
      className="py-10 md:py-12 bg-slate-50"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <Container size="wide">
        {/* Section header */}
        <div className="text-center mb-8 max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            Featured Evaluations
          </h2>
          <span className="inline-block text-xs bg-blue-50 text-blue-600 border border-blue-200 rounded-full px-2.5 py-0.5 mb-3">
            Updated 2026
          </span>
          <p className="text-lg text-slate-600">
            How leading companies score on responsible AI governance, based on publicly available evidence.
          </p>
        </div>

        {/* Company cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 max-w-5xl mx-auto">
          {featured.map((company) => {
            const score = company.score || 0;
            const maxScore = company.max_score || 14;
            const percent = Math.round((score / maxScore) * 100);
            const pillarCount = company.pillar_scores
              ? Object.values(company.pillar_scores).filter(s => s > 0).length
              : null;

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
                  {/* Name + Score */}
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-base font-bold text-slate-900 leading-tight truncate">
                      {company.display_name || company.name}
                    </h3>
                    <span className="text-xl font-extrabold text-slate-800 ml-3 whitespace-nowrap">
                      {score}/{maxScore}
                    </span>
                  </div>

                  {/* Industry pill */}
                  <div className="mb-3">
                    <span className="inline-block text-xs font-medium text-slate-500 bg-slate-100 rounded-full px-2.5 py-0.5">
                      {company.industry}
                    </span>
                  </div>

                  {/* Progress bar with label */}
                  <div className="mb-2">
                    <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-1">
                      RAI Score
                    </div>
                    <div className="h-2.5 rounded-full bg-gray-100">
                      <div
                        className={`h-full rounded-full ${getBarColor(score)}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  {/* Metadata + view link */}
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-500 m-0">
                      {pillarCount !== null ? `${pillarCount}/7 pillars` : '7 pillars'} · 2026
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

        {/* Bottom CTA */}
        <div className="text-center mt-6">
          <Link
            to="/companies"
            className="inline-flex items-center text-blue-600 font-semibold text-base hover:text-blue-700 transition-colors"
          >
            View all {totalCount} company evaluations
            <ArrowRight className="ml-2" size={18} />
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default FeaturedEvaluations;
