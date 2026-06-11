import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from '../Container';

// The evidence ladder — the scoring framework's core idea
const LADDER = [
  {
    label: 'Operational',
    points: '2 pts',
    cells: ['bg-emerald-500', 'bg-emerald-500'],
    ink: 'text-emerald-700',
    description: 'Documented practices running in production — the highest standard of proof.',
  },
  {
    label: 'Policy',
    points: '1 pt',
    cells: ['bg-amber-400', 'bg-gray-200'],
    ink: 'text-amber-700',
    description: 'Published policies, governance frameworks, and formal commitments.',
  },
  {
    label: 'Narrative',
    points: '0 pts',
    cells: ['bg-gray-200', 'bg-gray-200'],
    ink: 'text-slate-500',
    description: 'Blog posts, marketing claims, and aspirations. Counts for nothing.',
  },
];

const PILLARS_LINE =
  'Transparency · Fairness · Explainability · Oversight · Privacy · Governance · External Accountability';

const REFLECTS = [
  'Public disclosures and transparency practices',
  'Published governance policies and frameworks',
  'Documented accountability mechanisms and external commitments',
];

const DOES_NOT_REFLECT = [
  'Internal model performance or accuracy metrics',
  'Private implementations not publicly documented',
  'Ethical intent or corporate culture',
];

function HowScoringWorks() {
  return (
    <section id="how-scoring-works" className="py-12 md:py-16 bg-white">
      <Container size="wide">
        <div className="max-w-5xl mx-auto">
          {/* Section header */}
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400 mb-2">
                Methodology
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-1.5">
                How scoring works
              </h2>
              <p className="text-base text-slate-600 m-0 max-w-[560px]">
                Each of seven pillars scores the strongest evidence found — and
                only evidence that is public and verifiable counts.
              </p>
            </div>
            <Link
              to="/methodology"
              className="inline-flex items-center text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors no-underline shrink-0"
            >
              Full methodology
              <ArrowRight className="ml-1.5" size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
            {/* Evidence ladder */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-lg border border-gray-300 divide-y divide-gray-100">
                {LADDER.map((tier) => (
                  <div key={tier.label} className="flex items-start gap-4 p-5">
                    <span className="inline-flex gap-0.5 mt-1.5 shrink-0" aria-hidden="true">
                      <span className={`w-3.5 h-2 rounded-[2px] ${tier.cells[0]}`} />
                      <span className={`w-3.5 h-2 rounded-[2px] ${tier.cells[1]}`} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-3 mb-0.5">
                        <span className={`font-mono text-xs font-semibold uppercase tracking-wider ${tier.ink}`}>
                          {tier.label}
                        </span>
                        <span className="font-mono text-xs text-slate-400">{tier.points}</span>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed m-0">
                        {tier.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="font-mono text-[11px] text-slate-400 leading-relaxed mt-3 m-0">
                Scored across 7 pillars: {PILLARS_LINE}
              </p>
            </div>

            {/* What scores do / don't reflect */}
            <div className="lg:col-span-2">
              <h3 className="font-mono text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-3">
                What scores reflect
              </h3>
              <ul className="text-sm text-slate-700 leading-relaxed space-y-2.5 list-none p-0 m-0 mb-7">
                {REFLECTS.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-emerald-500 mt-0.5 leading-none">&#8226;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <h3 className="font-mono text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                What they don't
              </h3>
              <ul className="text-sm text-slate-600 leading-relaxed space-y-2.5 list-none p-0 m-0">
                {DOES_NOT_REFLECT.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="text-slate-400 mt-0.5 leading-none">&#8226;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HowScoringWorks;
