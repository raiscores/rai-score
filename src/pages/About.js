import React, { useState, useEffect } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Container from '../components/Container';
import { howItWorksCards, principles } from '../data/aboutContent';

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState({});

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

  const revealStyle = (id) => ({
    opacity: isVisible[id] ? 1 : 0,
    transform: isVisible[id] ? 'translateY(0)' : 'translateY(40px)',
    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
  });

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>About - RAI Scores</title>
        <meta name="description" content="RAI Scores is an independent evaluation system assessing how Fortune 500 companies govern AI — based on observable evidence, not self-reported claims." />
      </Helmet>

      {/* Hero */}
      <section
        className="relative py-16 md:py-24"
        style={{
          background: 'linear-gradient(135deg, #0a0f1c 0%, #1a202c 25%, #2d3748 100%)'
        }}
      >
        <Container size="wide">
          <div className="max-w-[800px] mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight animate-slideInUp">
              Making AI Accountability Visible
            </h1>
            <p
              className="text-lg md:text-xl text-white/80 max-w-[640px] mx-auto mb-8 leading-relaxed animate-slideInUp"
              style={{ animationDelay: '0.1s' }}
            >
              RAI Scores is an independent evaluation system assessing how Fortune 500
              companies govern AI &mdash; based on observable evidence, not self-reported claims.
            </p>
            <div
              className="flex flex-wrap gap-x-4 gap-y-2 text-sm md:text-base text-white/60 justify-center animate-slideInUp"
              style={{ animationDelay: '0.2s' }}
            >
              <span>482 companies</span>
              <span className="hidden sm:inline">&middot;</span>
              <span>15 industries</span>
              <span className="hidden sm:inline">&middot;</span>
              <span>7 pillars</span>
              <span className="hidden sm:inline">&middot;</span>
              <span>14-point scale</span>
            </div>
          </div>
        </Container>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-50" />
      </section>

      {/* Why This Exists */}
      <section
        id="why"
        data-reveal
        className="py-12 md:py-16 bg-white"
        style={revealStyle('why')}
      >
        <Container size="wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
              Why RAI Scores Exists
            </h2>
            <div className="space-y-5 text-base md:text-lg text-slate-700 leading-relaxed">
              <p>
                AI systems already influence who gets approved for a loan, which resumes
                a recruiter sees, and how medical risk is assessed. These decisions affect
                millions of people, yet there is no standard way to evaluate whether the
                companies deploying these systems have adequate governance in place.
              </p>
              <p>
                Many organizations publish AI principles. Far fewer document how those
                principles translate into operational controls, oversight processes, or
                external accountability mechanisms.
              </p>
              <p>
                RAI Scores exists to close that gap. We evaluate what companies publicly
                disclose about their AI governance practices &mdash; not what they claim to
                believe, but what they demonstrably do &mdash; and make the results freely
                available.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        data-reveal
        className="py-12 md:py-16 bg-slate-50"
        style={revealStyle('how-it-works')}
      >
        <Container size="wide">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                How It Works
              </h2>
              <p className="text-slate-600">
                A brief overview &mdash; for full technical details, see our{' '}
                <Link to="/methodology" className="text-blue-600 hover:text-blue-800 font-medium">methodology</Link>.
              </p>
            </div>

            {/* Row 1: first 3 cards */}
            <div className="grid md:grid-cols-3 gap-5 mb-5">
              {howItWorksCards.slice(0, 3).map((card, index) => {
                const Icon = card.icon;
                return (
                  <div key={index} className="bg-white rounded-xl p-5 border border-gray-200">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-slate-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">{card.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{card.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Row 2: last 2 cards centered */}
            <div className="grid md:grid-cols-2 gap-5 md:max-w-[66%] md:mx-auto mb-8">
              {howItWorksCards.slice(3).map((card, index) => {
                const Icon = card.icon;
                return (
                  <div key={index} className="bg-white rounded-xl p-5 border border-gray-200">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-slate-600" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">{card.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{card.description}</p>
                  </div>
                );
              })}
            </div>

            <div className="text-center">
              <Link
                to="/methodology"
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm"
              >
                View Complete Methodology
                <ArrowRight className="ml-1.5 w-4 h-4" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Principles */}
      <section
        id="principles"
        data-reveal
        className="py-12 md:py-16 bg-white"
        style={revealStyle('principles')}
      >
        <Container size="wide">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 text-center">
              What Guides Our Evaluations
            </h2>

            <div className="space-y-6">
              {principles.map((principle, index) => (
                <div key={index} className="flex items-start gap-4">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{principle.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{principle.description}</p>
                  </div>
                </div>
              ))}
            </div>
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
            Evaluating 482 Fortune 500 companies across 15 industries.
          </p>
          <Link
            to="/companies"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
          >
            Explore All Evaluations
            <ArrowRight className="ml-2" size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
