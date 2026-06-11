import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from '../components/home/HeroSection';
import FeaturedEvaluations from '../components/home/FeaturedEvaluations';
import AudienceStrip from '../components/home/AudienceStrip';
import HowScoringWorks from '../components/home/HowScoringWorks';
import CTASection from '../components/home/CTASection';

function Home() {
  const [companies, setCompanies] = useState([]);

  // Fetch company list for the hero index board, featured cards, and counts
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

  const companyCount = companies.length || 482;

  return (
    <div className="font-sans text-slate-900 leading-relaxed overflow-hidden">
      <Helmet>
        <title>RAI Scores - Independent AI Accountability Evaluations</title>
        <meta name="description" content="Independent evaluations of how leading companies approach responsible AI governance and transparency. Making AI accountability visible through evidence-based assessment. Explore our Responsible AI Scorecard for company rankings, transparency benchmarks, and responsible AI scores." />
      </Helmet>

      <HeroSection companies={companies} companyCount={companyCount} />
      <FeaturedEvaluations companies={companies} totalCount={companyCount} />
      <AudienceStrip />
      <HowScoringWorks />
      <CTASection companyCount={companyCount} />
    </div>
  );
}

export default Home;
