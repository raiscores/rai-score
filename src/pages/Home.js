import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from '../components/home/HeroSection';
import FeaturedEvaluations from '../components/home/FeaturedEvaluations';
import MethodologyPreview from '../components/home/MethodologyPreview';
import AudienceStrip from '../components/home/AudienceStrip';
import TransparencySection from '../components/home/TransparencySection';
import CTASection from '../components/home/CTASection';

function Home() {
  const [companies, setCompanies] = useState([]);
  const [isVisible, setIsVisible] = useState({});

  // Fetch company list for FeaturedEvaluations and counts
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await fetch('/data/company_list.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        setCompanies(await response.json());
      } catch (err) {
        console.error('Error fetching companies:', err);
      }
    };
    fetchCompanies();
  }, []);

  // Scroll-reveal observer — re-run when companies load so dynamically
  // rendered sections (FeaturedEvaluations) get observed
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
  }, [companies]);

  const companyCount = companies.length || 240;

  return (
    <div className="font-sans text-slate-900 leading-relaxed overflow-hidden">
      <Helmet>
        <title>RAI Scores - Independent AI Accountability Evaluations</title>
        <meta name="description" content="Independent evaluations of how leading companies approach responsible AI governance and transparency. Making AI accountability visible through evidence-based assessment. Explore our Responsible AI Scorecard for company rankings, transparency benchmarks, and responsible AI scores." />
      </Helmet>

      <HeroSection companyCount={companyCount} />
      <FeaturedEvaluations
        companies={companies}
        totalCount={companyCount}
        isVisible={!!isVisible['featured-evaluations']}
      />
      <MethodologyPreview isVisible={!!isVisible['methodology-preview']} />
      <AudienceStrip isVisible={!!isVisible['audience']} />
      <TransparencySection isVisible={!!isVisible['transparency']} />
      <CTASection isVisible={!!isVisible['cta']} companyCount={companyCount} />
    </div>
  );
}

export default Home;
