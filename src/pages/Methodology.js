import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowRight, BarChart3, Info } from 'lucide-react';
import Container from '../components/Container';
import {
  frameworkCards, scoringTiers, starRatings, gradeRanges,
  pillars, sourceTiers, processSteps, limitations, anchorLinks
} from '../data/methodologyContent';

function Methodology() {
  const [isVisible, setIsVisible] = useState({});
  const [activeAnchor, setActiveAnchor] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-reveal]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  // Update active anchor on scroll
  useEffect(() => {
    const handleScroll = () => {
      const ids = anchorLinks.map(a => a.id);
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top <= 140) {
          setActiveAnchor(ids[i]);
          return;
        }
      }
      setActiveAnchor('');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const revealStyle = (id) => ({
    opacity: isVisible[id] ? 1 : 0,
    transform: isVisible[id] ? 'translateY(0)' : 'translateY(40px)',
    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
  });

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Methodology - RAI Scores</title>
        <meta name="description" content="How RAI Scores evaluates Fortune 500 companies using a 7-pillar, 14-point evidence-based framework." />
      </Helmet>

      {/* Hero */}
      <section
        className="relative py-16 md:py-20"
        style={{
          background: 'linear-gradient(135deg, #0a0f1c 0%, #1a202c 25%, #2d3748 100%)'
        }}
      >
        <Container size="wide">
          <div className="max-w-[800px] mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight animate-slideInUp">
              Evaluation Methodology
            </h1>
            <p
              className="text-lg md:text-xl text-white/80 max-w-[640px] mx-auto mb-6 leading-relaxed animate-slideInUp"
              style={{ animationDelay: '0.1s' }}
            >
              How RAI Scores evaluates Fortune 500 companies using a 7-pillar,
              14-point evidence-based framework.
            </p>
            <p
              className="text-sm text-white/50 animate-slideInUp"
              style={{ animationDelay: '0.2s' }}
            >
              v1.0 &middot; Last updated February 2026
            </p>
          </div>
        </Container>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-50" />
      </section>

      {/* Anchor Navigation */}
      <nav className="sticky top-[64px] z-30 bg-white/80 backdrop-blur border-b border-gray-200">
        <Container size="wide">
          <div className="max-w-5xl mx-auto flex gap-6 overflow-x-auto scrollbar-hide py-3">
            {anchorLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`text-sm font-medium whitespace-nowrap transition-colors ${
                  activeAnchor === link.id
                    ? 'text-blue-600'
                    : 'text-slate-500 hover:text-blue-600'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </Container>
      </nav>

      {/* Framework Overview */}
      <section
        id="framework"
        data-reveal
        className="py-12 md:py-16 bg-white scroll-mt-[120px]"
        style={revealStyle('framework')}
      >
        <Container size="wide">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Framework Overview
              </h2>
              <p className="text-slate-600 max-w-3xl mx-auto">
                RAI Scores evaluates Fortune 500 companies across 15 industries using a
                consistent, evidence-based framework. Every assessment follows the same
                process and criteria.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 mb-8">
              {frameworkCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <div key={index} className="text-center bg-white rounded-xl p-5 border border-gray-200">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-5 h-5 text-slate-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">{card.title}</h3>
                    <p className="text-sm text-slate-600">{card.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-blue-900 text-sm leading-relaxed">
                  If evidence is not publicly documented and verifiable, it does not exist
                  for scoring purposes. AI reads and classifies evidence. Humans do not
                  assign scores.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Scoring System */}
      <section
        id="scoring"
        data-reveal
        className="py-12 md:py-16 bg-slate-50 scroll-mt-[120px]"
        style={revealStyle('scoring')}
      >
        <Container size="wide">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Evidence-Type Scoring
              </h2>
              <p className="text-slate-600 max-w-3xl mx-auto">
                Each of the seven pillars is scored 0&ndash;2 based on the strongest type of
                public evidence found. The distinction is between what a company says
                and what a company demonstrably does.
              </p>
            </div>

            {/* Evidence Tier Cards */}
            <div className="grid md:grid-cols-3 gap-5 mb-8">
              {scoringTiers.map((tier, index) => (
                <div key={index} className={`rounded-xl p-5 border ${tier.borderClass} ${tier.bgClass}`}>
                  <div className={`text-xl font-bold mb-2 ${tier.colorClass}`}>
                    {tier.score}
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-2">{tier.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">{tier.description}</p>
                  {tier.example && (
                    <p className="text-xs text-slate-500 italic">{tier.example}</p>
                  )}
                  {tier.note && (
                    <p className="text-xs text-slate-500">{tier.note}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Best evidence wins */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 mb-8">
              <h3 className="font-semibold text-slate-900 mb-2">Best evidence wins</h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-3">
                Each pillar's score is determined by the strongest evidence type found
                across all sources. If a company has both Policy and Operational evidence
                for a pillar, the Operational evidence sets the score at 2/2.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Evidence from different source tiers is weighted differently &mdash; see
                Source Tiers below. Notably, third-party sources (news, research) can
                only contribute up to Policy level (1/2), even if they describe
                operational practices. Only company-owned and authority sources can
                achieve the full Operational score (2/2).
              </p>
            </div>

            {/* Score Calculation */}
            <div className="bg-slate-100 rounded-xl p-6 text-center mb-8">
              <div className="flex items-center justify-center mb-3">
                <BarChart3 className="w-6 h-6 text-blue-600 mr-2" />
                <span className="text-lg font-bold text-slate-900">Overall Score Calculation</span>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                Total score = sum of all seven pillar scores
              </p>
              <div className="inline-block bg-blue-100 text-blue-800 px-5 py-2 rounded-lg font-semibold text-sm">
                Maximum: 14 points (2 &times; 7 pillars)
              </div>
            </div>

            {/* Star Ratings & Letter Grades */}
            <div className="grid md:grid-cols-2 gap-5">
              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <h4 className="font-semibold text-slate-900 mb-4">Star Ratings</h4>
                <div className="space-y-2">
                  {starRatings.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-2">
                      <span className="text-amber-600 font-medium">{item.stars}</span>
                      <span className="text-slate-600 text-sm">{item.range}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <h4 className="font-semibold text-slate-900 mb-4">Letter Grades</h4>
                <div className="space-y-2">
                  {gradeRanges.map((item, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-2">
                      <div>
                        <span className={`font-semibold ${item.colorClass}`}>{item.grade}</span>
                        <span className="text-slate-400 text-xs ml-2">({item.variants})</span>
                      </div>
                      <span className="text-slate-600 text-sm">{item.threshold}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Seven Pillars */}
      <section
        id="pillars"
        data-reveal
        className="py-12 md:py-16 bg-white scroll-mt-[120px]"
        style={revealStyle('pillars')}
      >
        <Container size="wide">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Seven Pillars of Responsible AI
              </h2>
              <p className="text-slate-600 max-w-3xl mx-auto">
                Each pillar represents a fundamental aspect of responsible AI development
                and deployment. Companies are assessed across all seven.
              </p>
            </div>

            {/* Row 1: 4 pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-5">
              {pillars.slice(0, 4).map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.id} className="bg-white rounded-xl p-5 border border-gray-200">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mr-3">
                        <Icon className="w-5 h-5 text-slate-600" />
                      </div>
                      <h3 className="font-semibold text-slate-900 text-sm leading-tight">{pillar.title}</h3>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{pillar.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Row 2: 3 pillars centered */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:max-w-[75%] lg:mx-auto">
              {pillars.slice(4).map((pillar) => {
                const Icon = pillar.icon;
                return (
                  <div key={pillar.id} className="bg-white rounded-xl p-5 border border-gray-200">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mr-3">
                        <Icon className="w-5 h-5 text-slate-600" />
                      </div>
                      <h3 className="font-semibold text-slate-900 text-sm leading-tight">{pillar.title}</h3>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{pillar.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Source Tiers & Process */}
      <section
        id="sources"
        data-reveal
        className="py-12 md:py-16 bg-slate-50 scroll-mt-[120px]"
        style={revealStyle('sources')}
      >
        <Container size="wide">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Source Tiers & Evaluation Process
              </h2>
              <p className="text-slate-600 max-w-3xl mx-auto">
                Not all sources carry equal weight. Evidence is gathered from public
                sources, classified by tier, and scored deterministically against each
                pillar's criteria.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Source Tiers */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-5">Source Tiers</h3>
                <div className="space-y-5">
                  {sourceTiers.map((tier, index) => {
                    const Icon = tier.icon;
                    return (
                      <div key={index} className="flex items-start gap-3">
                        <div className={`w-8 h-8 ${tier.iconBgClass} rounded-full flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-4 h-4 ${tier.iconColorClass}`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{tier.title}</h4>
                          <p className="text-xs text-blue-600 font-medium mb-1">{tier.credit}</p>
                          <p className="text-sm text-slate-600 leading-relaxed">{tier.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Evaluation Process */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-5">Evaluation Process</h3>
                <div className="space-y-5">
                  {processSteps.map((step, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900">{step.title}</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Limitations */}
      <section
        id="limitations"
        data-reveal
        className="py-12 md:py-16 bg-white scroll-mt-[120px]"
        style={revealStyle('limitations')}
      >
        <Container size="wide">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Limitations
              </h2>
              <p className="text-slate-600">
                We publish our limitations because transparency about what scores cannot
                tell you is as important as the scores themselves.
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {limitations.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-semibold text-slate-500">{index + 1}</span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-slate-400">
              Methodology v1.0 &middot; Assessments published February 2026
            </p>
          </div>
        </Container>
      </section>

      {/* CTA Bar */}
      <section
        id="cta"
        data-reveal
        className="py-8 border-t border-white/10"
        style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          opacity: isVisible['cta'] ? 1 : 0,
          transform: isVisible['cta'] ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 px-6 text-center">
          <p className="text-white/80 text-base m-0">
            See how Fortune 500 companies score on responsible AI governance.
          </p>
          <Link
            to="/companies"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
          >
            Browse All Evaluations
            <ArrowRight className="ml-2" size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Methodology;
