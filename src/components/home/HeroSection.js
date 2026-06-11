import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from '../Container';
import PillarStrip from '../company/PillarStrip';
import { getGradeFromScore } from '../../utils/colorMapping';

// Grade ink on the dark navy panel (lighter than the light-bg inks)
const gradeInkDark = (grade) => {
  if (grade.startsWith('A')) return 'text-emerald-300';
  if (grade.startsWith('B')) return 'text-blue-300';
  if (grade.startsWith('C')) return 'text-amber-300';
  return 'text-red-300';
};

function IndexBoard({ companies }) {
  const { top, dist, avg } = useMemo(() => {
    if (!companies || companies.length === 0) {
      return { top: [], dist: null, avg: null };
    }
    const sorted = [...companies].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
    const top = sorted.slice(0, 5);

    const dist = { A: 0, B: 0, C: 0, D: 0 };
    let sum = 0;
    companies.forEach((c) => {
      const score = c.score ?? 0;
      sum += score;
      const g = getGradeFromScore(score, c.max_score ?? 14);
      dist[g[0]] += 1;
    });
    const avg = sum / companies.length;
    return { top, dist, avg };
  }, [companies]);

  const total = companies?.length || 0;

  return (
    <div className="bg-navy-950/60 border border-white/10 rounded-lg shadow-2xl shadow-black/30">
      {/* Board header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-white/50">
          The RAI Index
        </span>
        <span className="font-mono text-[10px] text-white/40">
          {total > 0 ? `${total} companies` : ''}
        </span>
      </div>

      {/* Top-5 rows */}
      <div className="px-2 py-1.5">
        {top.map((company, i) => {
          const grade = getGradeFromScore(company.score ?? 0, company.max_score ?? 14);
          return (
            <Link
              key={company.slug}
              to={`/company/${company.slug}`}
              className="flex items-center gap-3 px-2 py-2 rounded-md no-underline hover:bg-white/5 transition-colors duration-150"
            >
              <span className="font-mono text-xs text-white/40 w-4 text-right shrink-0">
                {i + 1}
              </span>
              <span className="text-sm font-medium text-white truncate flex-1 min-w-0">
                {company.name}
              </span>
              <PillarStrip pillarScores={company.pillar_scores} size="sm" onDark />
              <span className="hidden sm:block font-mono text-xs text-white/70 w-10 text-right shrink-0 tabular-nums">
                {company.score}/{company.max_score ?? 14}
              </span>
              <span className={`font-mono text-xs font-semibold w-6 text-right shrink-0 ${gradeInkDark(grade)}`}>
                {grade}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Grade distribution */}
      {dist && (
        <div className="px-4 pt-2 pb-3 border-t border-white/10">
          <div className="font-mono text-[10px] uppercase tracking-wider text-white/40 mb-2 mt-1">
            Grade distribution
          </div>
          <div className="flex h-1.5 rounded-full overflow-hidden bg-white/10 mb-2">
            {dist.A > 0 && <div className="bg-emerald-400" style={{ width: `${(dist.A / total) * 100}%` }} />}
            {dist.B > 0 && <div className="bg-blue-400" style={{ width: `${(dist.B / total) * 100}%` }} />}
            {dist.C > 0 && <div className="bg-amber-400" style={{ width: `${(dist.C / total) * 100}%` }} />}
            {dist.D > 0 && <div className="bg-red-400/80" style={{ width: `${(dist.D / total) * 100}%` }} />}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-white/60">
            <span><span className="text-emerald-300">A</span> {dist.A}</span>
            <span><span className="text-blue-300">B</span> {dist.B}</span>
            <span><span className="text-amber-300">C</span> {dist.C}</span>
            <span><span className="text-red-300">D</span> {dist.D}</span>
          </div>
        </div>
      )}

      {/* Board footer */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-white/10">
        <span className="font-mono text-xs text-white/70">
          {avg != null && (
            <>Index average: {avg.toFixed(1)}/14 <span className={gradeInkDark(getGradeFromScore(avg, 14))}>({getGradeFromScore(avg, 14)})</span></>
          )}
        </span>
        <Link
          to="/companies"
          className="font-mono text-xs text-white/60 hover:text-white no-underline transition-colors duration-150"
        >
          Full index &rarr;
        </Link>
      </div>
    </div>
  );
}

function HeroSection({ companies, companyCount }) {
  return (
    <section className="hero-section bg-band-hero relative">
      {/* Dot-grid atmosphere */}
      <div className="bg-dot-grid absolute inset-0 pointer-events-none" aria-hidden="true" />

      <Container size="wide">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center py-16 md:py-20 lg:py-24">
          {/* Left: positioning + CTAs */}
          <div className="lg:col-span-7">
            <div
              className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-white/50 mb-5 animate-slideInUp"
            >
              Independent AI Governance Ratings
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-[3.4rem] font-extrabold text-white leading-[1.08] tracking-tight mb-5 animate-slideInUp">
              The Fortune 500, graded on AI accountability.
            </h1>

            <p
              className="text-lg md:text-xl text-white/75 max-w-[540px] leading-relaxed mb-8 animate-slideInUp"
              style={{ animationDelay: '0.08s' }}
            >
              Independent ratings of how America's largest companies govern AI
              &mdash; built exclusively on public, verifiable evidence.
            </p>

            <div
              className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-8 animate-slideInUp"
              style={{ animationDelay: '0.16s' }}
            >
              <Link
                to="/companies"
                className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold no-underline rounded-lg transition-colors duration-150 text-sm sm:text-base py-3 px-6 sm:py-3.5 sm:px-7"
              >
                Explore the index
                <ArrowRight className="ml-2" size={18} />
              </Link>
              <Link
                to="/methodology"
                className="text-sm sm:text-base font-medium text-white/80 hover:text-white no-underline transition-colors duration-150"
              >
                Our methodology &rarr;
              </Link>
            </div>

            <div
              className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/55 animate-slideInUp"
              style={{ animationDelay: '0.24s' }}
            >
              <span><span className="font-mono text-white/80">{companyCount}</span> companies</span>
              <span className="hidden sm:inline text-white/30">·</span>
              <span><span className="font-mono text-white/80">7</span> pillars</span>
              <span className="hidden sm:inline text-white/30">·</span>
              <span><span className="font-mono text-white/80">14</span>-point scale</span>
              <span className="hidden sm:inline text-white/30">·</span>
              <span>Public evidence only</span>
            </div>
          </div>

          {/* Right: the index board */}
          <div
            className="lg:col-span-5 animate-slideInUp"
            style={{ animationDelay: '0.2s' }}
          >
            <IndexBoard companies={companies} />
          </div>
        </div>
      </Container>

      {/* Sharp bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-50" />
    </section>
  );
}

export default HeroSection;
