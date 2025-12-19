import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from '../components/home/HeroSection';
import MethodologyPreview from '../components/home/MethodologyPreview';
import AudienceSection from '../components/home/AudienceSection';
import TransparencySection from '../components/home/TransparencySection';
import CTASection from '../components/home/CTASection';
import ExpandingImpact from '../components/home/ExpandingImpact';

function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return (
    <div className="font-sans text-slate-900 leading-relaxed overflow-hidden">
      <Helmet>
        <title>RAI Scores - Independent AI Accountability Evaluations</title>
        <meta name="description" content="Independent evaluations of how leading companies approach responsible AI governance and transparency. Making AI accountability visible through evidence-based assessment. Explore our Responsible AI Scorecard for company rankings, transparency benchmarks, and responsible AI scores." />
      </Helmet>

      <HeroSection scrollY={scrollY} />
      <MethodologyPreview isVisible={!!isVisible['methodology-preview']} />
      <AudienceSection isVisible={!!isVisible['audiences']} />
      <TransparencySection isVisible={!!isVisible['transparency']} />
      <CTASection isVisible={!!isVisible['cta']} />
      <ExpandingImpact isVisible={!!isVisible['expanding-impact']} />
    </div>
  );
}

export default Home;
