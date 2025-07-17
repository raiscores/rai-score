import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, TrendingUp, Building2 } from 'lucide-react';
import { Helmet } from 'react-helmet';


function CompanyName({ name }) {
  // dynamically change size for overflow on cards
  const nameRef = useRef(null);
  const [fontSize, setFontSize] = useState(20); // start font size px

  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;

    const MIN_FONT_SIZE = 12;
    let currentSize = 20;

    function adjustFontSize() {
      if (!el) return;
      el.style.fontSize = currentSize + 'px';
      while (el.scrollWidth > el.clientWidth && currentSize > MIN_FONT_SIZE) {
        currentSize -= 1;
        el.style.fontSize = currentSize + 'px';
      }
      setFontSize(currentSize);
    }

    adjustFontSize();

    window.addEventListener('resize', adjustFontSize);
    return () => window.removeEventListener('resize', adjustFontSize);
  }, [name]);

  return (
    <h3
      ref={nameRef}
      style={{
        color: '#1e293b',
        fontWeight: '600',
        margin: '0 0 0.25rem 0',
        lineHeight: '1.2',
        fontSize: fontSize + 'px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
      title={name}
    >
      {name}
    </h3>
  );
}

function displayScore(score) {
  // Handles undefined/null/NaN
  return typeof score === "number" && !isNaN(score) ? score.toFixed(1) : "N/A";
}

// Extended company data with 100 companies across various industries
const companies = [
  {"slug": "abbott-laboratories","name": "Abbott Laboratories","industry": "Healthcare & Pharmaceuticals","score": 7,"max_score": 7},
  {"slug": "abbvie","name": "AbbVie Inc.","industry": "Healthcare & Pharmaceuticals","score": 6,"max_score": 7},
  {"slug": "albertsons","name": "Albertsons Companies, Inc.","industry": "Consumer Goods & Staples","score": 3,"max_score": 7},
  {"slug": "alphabet","name": "Alphabet Inc.","industry": "Technology","score": 7,"max_score": 7},
  {"slug": "amazon","name": "Amazon.com, Inc.","industry": "Technology","score": 7,"max_score": 7},
  {"slug": "american-airlines","name": "American Airlines Group Inc.","industry": "Airlines","score": 5.5,"max_score": 7},
  {"slug": "american-express","name": "American Express Company","industry": "Financial Services","score": 6,"max_score": 7},
  {"slug": "apple","name": "Apple Inc.","industry": "Technology","score": 7,"max_score": 7},
  {"slug": "archer-daniels-midland","name": "Archer-Daniels-Midland Company","industry": "Food & Beverage","score": 4.5,"max_score": 7},
  {"slug": "att","name": "AT&T Inc.","industry": "Telecommunications","score": 7,"max_score": 7},
  {"slug": "bank-of-america","name": "Bank of America Corporation","industry": "Financial Services","score": 7,"max_score": 7},
  {"slug": "berkshire-hathaway","name": "Berkshire Hathaway Inc.","industry": "Conglomerate","score": 3.0,"max_score": 7},
  {"slug": "best-buy","name": "Best Buy Co., Inc.","industry": "Retail","score": 7,"max_score": 7},
  {"slug": "bristol-myers-squibb","name": "Bristol-Myers Squibb Company","industry": "Healthcare & Pharmaceuticals","score": 6,"max_score": 7},
  {"slug": "broadcom","name": "Broadcom Inc.","industry": "Semiconductors","score": 7,"max_score": 7},
  {"slug": "capital-one","name": "Capital One Financial Corporation","industry": "Financial Services","score": 7,"max_score": 7},
  {"slug": "cardinal-health","name": "Cardinal Health, Inc.","industry": "Healthcare & Pharmaceuticals","score": 7,"max_score": 7},
  {"slug": "caterpillar","name": "Caterpillar Inc.","industry": "Construction & Machinery","score": 6,"max_score": 7},
  {"slug": "cbre-group","name": "CBRE Group, Inc.","industry": "Real Estate","score": 7,"max_score": 7},
  {"slug": "cencora","name": "Cencora, Inc.","industry": "Healthcare & Pharmaceuticals","score": 7,"max_score": 7},
  {"slug": "centene","name": "Centene Corporation","industry": "Healthcare & Pharmaceuticals","score": 6,"max_score": 7},
  {"slug": "charter-communications","name": "Charter Communications, Inc.","industry": "Telecommunications","score": 1.5,"max_score": 7},
  {"slug": "chevron","name": "Chevron Corporation","industry": "Energy & Oil & Gas","score": 7,"max_score": 7},
  {"slug": "chs","name": "CHS Inc.","industry": "Agriculture","score": 4,"max_score": 7},
  {"slug": "cisco-systems","name": "Cisco Systems, Inc.","industry": "Telecommunications","score": 7,"max_score": 7},
  {"slug": "citigroup","name": "Citigroup Inc.","industry": "Financial Services","score": 7,"max_score": 7},
  {"slug": "comcast","name": "Comcast Corporation","industry": "Media & Entertainment","score": 3.5,"max_score": 7},
  {"slug": "conocophillips","name": "ConocoPhillips Company","industry": "Energy & Oil & Gas","score": 2.5,"max_score": 7},
  {"slug": "costco-wholesale","name": "Costco Wholesale Corporation","industry": "Retail","score": 6.5,"max_score": 7},
  {"slug": "cvs-health","name": "CVS Health Corporation","industry": "Healthcare & Pharmaceuticals","score": 7,"max_score": 7},
  {"slug": "dr-horton","name": "D.R. Horton, Inc.","industry": "Construction & Machinery","score": 0,"max_score": 7},
  {"slug": "deere","name": "Deere & Company","industry": "Construction & Machinery","score": 7,"max_score": 7},
  {"slug": "dell-technologies","name": "Dell Technologies Inc.","industry": "Technology","score": 7,"max_score": 7},
  {"slug": "delta-air-lines","name": "Delta Air Lines, Inc.","industry": "Airlines","score": 4,"max_score": 7},
  {"slug": "dollar-general","name": "Dollar General Corporation","industry": "Retail","score": 2.5,"max_score": 7},
  {"slug": "dow","name": "Dow Inc.","industry": "Chemicals","score": 4.0,"max_score": 7},
  {"slug": "elevance-health","name": "Elevance Health, Inc.","industry": "Healthcare & Pharmaceuticals","score": 7,"max_score": 7},
  {"slug": "eli-lilly","name": "Eli Lilly and Company","industry": "Healthcare & Pharmaceuticals","score": 7,"max_score": 7},
  {"slug": "energy-transfer","name": "Energy Transfer LP","industry": "Energy & Oil & Gas","score": 0,"max_score": 7},
  {"slug": "enterprise-products-partners","name": "Enterprise Products Partners L.P.","industry": "Energy & Oil & Gas","score": 0,"max_score": 7},
  {"slug": "exxon-mobile","name": "Exxon Mobil Corporation","industry": "Energy & Oil & Gas","score": 3.0,"max_score": 7},
  {"slug": "freddie-mac","name": "Federal Home Loan Mortgage Corporation","industry": "Financial Services","score": 7,"max_score": 7},
  {"slug": "fannie-mae","name": "Federal National Mortgage Association","industry": "Financial Services","score": 7,"max_score": 7},
  {"slug": "fedex","name": "FedEx Corporation","industry": "Logistics & Transportation","score": 7,"max_score": 7},
  {"slug": "ford-motor","name": "Ford Motor Company","industry": "Automotive","score": 7,"max_score": 7},
  {"slug": "ge-vernova","name": "GE Vernova Inc.","industry": "Energy & Oil & Gas","score": 6,"max_score": 7},
  {"slug": "general-dynamics","name": "General Dynamics Corporation","industry": "Aerospace & Defense","score": 5,"max_score": 7},
  {"slug": "general-electric","name": "General Electric Company","industry": "Industrials","score": 7,"max_score": 7},
  {"slug": "general-motors","name": "General Motors Company","industry": "Automotive","score": 7,"max_score": 7},
  {"slug": "hca-healthcare","name": "HCA Healthcare, Inc.","industry": "Healthcare & Pharmaceuticals","score": 6,"max_score": 7},
  {"slug": "honeywell","name": "Honeywell International Inc.","industry": "Conglomerate","score": 7,"max_score": 7},
  {"slug": "hp","name": "HP Inc.","industry": "Technology","score": 7,"max_score": 7},
  {"slug": "humana","name": "Humana Inc.","industry": "Insurance","score": 6.5,"max_score": 7},
  {"slug": "ingram-micro","name": "Ingram Micro Holding Corporation","industry": "Information Technology","score": 7,"max_score": 7},
  {"slug": "intel","name": "Intel Corporation","industry": "Semiconductors","score": 7,"max_score": 7},
  {"slug": "ibm","name": "International Business Machines Corporation","industry": "Technology","score": 7,"max_score": 7},
  {"slug": "johnson-johnson","name": "Johnson & Johnson","industry": "Healthcare & Pharmaceuticals","score": 7,"max_score": 7},
  {"slug": "jpmorgan-chase","name": "JPMorgan Chase & Co.","industry": "Financial Services","score": 7,"max_score": 7},
  {"slug": "lennar","name": "Lennar Corporation","industry": "Construction & Machinery","score": 5,"max_score": 7},
  {"slug": "liberty-mutual-insurance","name": "Liberty Mutual Insurance Company","industry": "Insurance","score": 7,"max_score": 7},
  {"slug": "lithia-motors","name": "Lithia Motors, Inc.","industry": "Automotive","score": 1,"max_score": 7},
  {"slug": "live-nation-entertainment","name": "Live Nation Entertainment, Inc.","industry": "Media & Entertainment","score": 4,"max_score": 7},
  {"slug": "lockheed-martin","name": "Lockheed Martin Corporation","industry": "Aerospace & Defense","score": 7,"max_score": 7},
  {"slug": "lowes","name": "Lowe's Companies, Inc.","industry": "Retail","score": 6,"max_score": 7},
  {"slug": "marathon-petroleum","name": "Marathon Petroleum Corporation","industry": "Energy & Oil & Gas","score": 5,"max_score": 7},
  {"slug": "massmutual","name": "Massachusetts Mutual Life Insurance Company","industry": "Insurance","score": 5,"max_score": 7},
  {"slug": "mckesson","name": "McKesson Corporation","industry": "Healthcare & Pharmaceuticals","score": 7,"max_score": 7},
  {"slug": "merck-co","name": "Merck & Co., Inc.","industry": "Healthcare & Pharmaceuticals","score": 7,"max_score": 7},
  {"slug": "meta-platforms","name": "Meta Platforms, Inc.","industry": "Technology","score": 7,"max_score": 7},
  {"slug": "metlife","name": "MetLife, Inc.","industry": "Insurance","score": 4,"max_score": 7},
  {"slug": "microsoft","name": "Microsoft Corporation","industry": "Technology","score": 7,"max_score": 7},
  {"slug": "molina-healthcare","name": "Molina Healthcare, Inc.","industry": "Healthcare & Pharmaceuticals","score": 7,"max_score": 7},
  {"slug": "mondelez-international","name": "Mondelez International, Inc.","industry": "Food & Beverage","score": 3,"max_score": 7},
  {"slug": "morgan-stanley","name": "Morgan Stanley","industry": "Financial Services","score": 7,"max_score": 7},
  {"slug": "nationwide","name": "Nationwide Mutual Insurance Company","industry": "Financial Services","score": 6,"max_score": 7},
  {"slug": "netflix","name": "Netflix, Inc.","industry": "Media & Entertainment","score": 5,"max_score": 7},
  {"slug": "new-york-life-insurance","name": "New York Life Insurance Company","industry": "Insurance","score": 7,"max_score": 7},
  {"slug": "nike","name": "Nike, Inc.","industry": "Apparel & Footwear","score": 6,"max_score": 7},
  {"slug": "northrop-grumman","name": "Northrop Grumman Corporation","industry": "Aerospace & Defense","score": 7,"max_score": 7},
  {"slug": "northwestern-mutual","name": "Northwestern Mutual Life Insurance Company","industry": "Financial Services","score": 7,"max_score": 7},
  {"slug": "nvidia","name": "NVIDIA Corporation","industry": "Semiconductors","score": 7,"max_score": 7},
  {"slug": "oracle","name": "Oracle Corporation","industry": "Technology","score": 7,"max_score": 7},
  {"slug": "pepsico","name": "PepsiCo, Inc.","industry": "Food & Beverage","score": 7,"max_score": 7},
  {"slug": "performance-food-group","name": "Performance Food Group Company","industry": "Food & Beverage","score": 3.0,"max_score": 7},
  {"slug": "pfizer","name": "Pfizer Inc.","industry": "Healthcare & Pharmaceuticals","score": 7,"max_score": 7},
  {"slug": "philip-morris-international","name": "Philip Morris International Inc.","industry": "Tobacco","score": 5,"max_score": 7},
  {"slug": "phillips-66","name": "Phillips 66 Company","industry": "Energy & Oil & Gas","score": 7,"max_score": 7},
  {"slug": "plains-gp","name": "Plains GP Holdings, L.P.","industry": "Energy & Oil & Gas","score": 0,"max_score": 7},
  {"slug": "prudential-financial","name": "Prudential Financial, Inc.","industry": "Financial Services","score": 6,"max_score": 7},
  {"slug": "publix-super-markets","name": "Publix Super Markets, Inc.","industry": "Retail","score": 6,"max_score": 7},
  {"slug": "qualcomm","name": "Qualcomm Incorporated","industry": "Telecommunications","score": 6,"max_score": 7},
  {"slug": "rtx","name": "RTX Corporation","industry": "Aerospace & Defense","score": 5.5,"max_score": 7},
  {"slug": "salesforce","name": "Salesforce, Inc.","industry": "Technology","score": 7,"max_score": 7},
  {"slug": "starbucks","name": "Starbucks Corporation","industry": "Retail","score": 7,"max_score": 7},
  {"slug": "state-farm","name": "State Farm Mutual Automobile Insurance Company","industry": "Insurance","score": 5.5,"max_score": 7},
  {"slug": "stonex-group","name": "StoneX Group Inc.","industry": "Financial Services","score": 7,"max_score": 7},
  {"slug": "sysco","name": "Sysco Corporation","industry": "Food & Beverage","score": 5,"max_score": 7},
  {"slug": "target","name": "Target Corporation","industry": "Retail","score": 0.5,"max_score": 7},
  {"slug": "td-synnex","name": "TD SYNNEX Corporation","industry": "Electronics & Distribution","score": 7,"max_score": 7},
  {"slug": "tiaa","name": "Teachers Insurance and Annuity Association of America","industry": "Financial Services","score": 6,"max_score": 7},
  {"slug": "tesla","name": "Tesla, Inc.","industry": "Automotive","score": 6.5,"max_score": 7},
  {"slug": "allstate","name": "The Allstate Corporation","industry": "Insurance","score": 6.5,"max_score": 7},
  {"slug": "bank-of-new-york-mellon","name": "The Bank of New York Mellon Corporation","industry": "Financial Services","score": 7,"max_score": 7},
  {"slug": "boeing","name": "The Boeing Company","industry": "Aerospace & Defense","score": 6.5,"max_score": 7},
  {"slug": "cigna","name": "The Cigna Group","industry": "Insurance","score": 7,"max_score": 7},
  {"slug": "coca-cola-company","name": "The Coca-Cola Company","industry": "Beverages","score": 3,"max_score": 7},
  {"slug": "goldman-sachs","name": "The Goldman Sachs Group, Inc.","industry": "Financial Services","score": 7,"max_score": 7},
  {"slug": "home-depot","name": "The Home Depot, Inc.","industry": "Retail","score": 5.5,"max_score": 7},
  {"slug": "kroger","name": "The Kroger Co.","industry": "Retail","score": 7,"max_score": 7},
  {"slug": "procter-gamble","name": "The Procter & Gamble Company","industry": "Consumer Goods & Staples","score": 4,"max_score": 7},
  {"slug": "progressive","name": "The Progressive Corporation","industry": "Insurance","score": 5,"max_score": 7},
  {"slug": "tjx","name": "The TJX Companies, Inc.","industry": "Retail","score": 2.5,"max_score": 7},
  {"slug": "travelers","name": "The Travelers Companies, Inc.","industry": "Insurance","score": 6.5,"max_score": 7},
  {"slug": "walt-disney","name": "The Walt Disney Company","industry": "Media & Entertainment","score": 7,"max_score": 7},
  {"slug": "thermo-fisher-scientific","name": "Thermo Fisher Scientific Inc.","industry": "Biotechnology","score": 7,"max_score": 7},
  {"slug": "tyson-foods","name": "Tyson Foods, Inc.","industry": "Food & Beverage","score": 7,"max_score": 7},
  {"slug": "us-bancorp","name": "U.S. Bancorp","industry": "Financial Services","score": 7,"max_score": 7},
  {"slug": "uber","name": "Uber Technologies, Inc.","industry": "Logistics & Transportation","score": 7,"max_score": 7},
  {"slug": "united-airlines","name": "United Airlines Holdings, Inc.","industry": "Airlines","score": 3,"max_score": 7},
  {"slug": "ups","name": "United Parcel Service, Inc.","industry": "Logistics & Transportation","score": 5.5,"max_score": 7},
  {"slug": "usaa","name": "United Services Automobile Association","industry": "Financial Services","score": 6,"max_score": 7},
  {"slug": "unitedhealth-group","name": "UnitedHealth Group Incorporated","industry": "Healthcare & Pharmaceuticals","score": 7,"max_score": 7},
  {"slug": "us-foods","name": "US Foods Holding Corp.","industry": "Food & Beverage","score": 5,"max_score": 7},
  {"slug": "valero-energy","name": "Valero Energy Corporation","industry": "Energy & Oil & Gas","score": 1,"max_score": 7},
  {"slug": "verizon","name": "Verizon Communications Inc.","industry": "Telecommunications","score": 7,"max_score": 7},
  {"slug": "visa","name": "Visa Inc.","industry": "Financial Services","score": 7,"max_score": 7},
  {"slug": "walgreens-boots-alliance","name": "Walgreens Boots Alliance, Inc.","industry": "Healthcare & Pharmaceuticals","score": 6,"max_score": 7},
  {"slug": "walmart","name": "Walmart Inc.","industry": "Retail","score": 7,"max_score": 7},
  {"slug": "warner-bros-discovery","name": "Warner Bros. Discovery, Inc.","industry": "Media & Entertainment","score": 3.5,"max_score": 7},
  {"slug": "wells-fargo","name": "Wells Fargo & Company","industry": "Financial Services","score": 7,"max_score": 7},
  {"slug": "world-kinect","name": "World Kinect Corporation","industry": "Energy & Oil & Gas","score": 1.5,"max_score": 7}
].sort((a, b) => a.name.localeCompare(b.name));

// Helper function to get score color
const getScoreColor = (score, maxScore) => {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 80) return '#22c55e'; // Green for excellent
  if (percentage >= 70) return '#3b82f6'; // Blue for good
  if (percentage >= 60) return '#facc15'; // Yellow for fair
  return '#ef4444'; // Red for poor
};

// Helper function to get score background color
const getScoreBackgroundColor = (score, maxScore) => {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 80) return 'rgba(34, 197, 94, 0.15)';   // soft green
  if (percentage >= 70) return 'rgba(59, 130, 246, 0.15)';  // soft blue
  if (percentage >= 60) return 'rgba(250, 204, 21, 0.15)';  // soft yellow
  return 'rgba(239, 68, 68, 0.15)';                         // soft red
};

// Helper function to generate company initials
const getCompanyInitials = (name) => {
  return name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
};

function CompanyDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const averageScore = companies.reduce((sum, company) => sum + company.score, 0) / companies.length;

  // CSS for responsive grid
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '4rem',
    marginBottom: '2rem'
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc',
      padding: '2rem 1rem'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto'
      }}>
	   {/* Page Title */}
		<Helmet>
		  <title>RAI Score: Company Directory</title>
		</Helmet>
		
        {/* Header Section */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '3rem'
        }}>
          <h1 style={{ 
            color: '#1e293b',
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '1rem',
            letterSpacing: '-0.025em'
          }}>
            Company Directory
          </h1>
          <p style={{ 
            color: '#64748b',
            fontSize: '1.125rem',
            maxWidth: '600px',
            margin: '0 auto 2rem auto',
            lineHeight: '1.6'
          }}>
            Browse and compare companies based on their Responsible AI practices. 
            Our methodology evaluates organizations across key pillars of AI governance.
          </p>
          
          {/* Stats Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }}>
            <div style={{
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              border: '1px solid rgba(59, 130, 246, 0.2)'
            }}>
              <div style={{ color: '#3b82f6', fontSize: '1.5rem', fontWeight: '600' }}>
                {companies.length}
              </div>
              <div style={{ color: '#64748b', fontSize: '0.875rem' }}>
                Companies Evaluated
              </div>
            </div>
            <div style={{
              backgroundColor: 'rgba(250, 204, 21, 0.1)',
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              border: '1px solid rgba(250, 204, 21, 0.2)'
            }}>
              <div style={{ color: '#eab308', fontSize: '1.5rem', fontWeight: '600' }}>
                {averageScore.toFixed(1)}
              </div>
              <div style={{ color: '#64748b', fontSize: '0.875rem' }}>
                Average Score
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div style={{ 
            position: 'relative',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            <Search 
              size={20} 
              style={{ 
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#64748b'
              }} 
            />
            <input
              type="text"
              placeholder="Search companies or industries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.875rem 1rem 0.875rem 3rem',
                border: '1px solid #cbd5e1',
                borderRadius: '12px',
                fontSize: '1rem',
                backgroundColor: '#ffffff',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#cbd5e1';
                e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              }}
            />
          </div>
        </div>

        {/* Results Info */}
        <div style={{
          marginBottom: '1.5rem',
          color: '#64748b',
          fontSize: '0.875rem'
        }}>
          Showing {filteredCompanies.length} of {companies.length} companies
          {searchTerm && ` matching "${searchTerm}"`}
        </div>

        {/* Company Grid */}
        <div style={gridStyle}>
          {filteredCompanies.map((company) => (
            <Link 
              key={company.slug}
              to={`/company/${company.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(203, 213, 225, 0.5)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(203, 213, 225, 0.5)';
                }}
              >
                {/* Company Header */}
                <div style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '1rem'
                }}>
                  {/* Company Avatar */}
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '1rem',
                    border: '1px solid rgba(59, 130, 246, 0.2)'
                  }}>
                    <span style={{
                      color: '#3b82f6',
                      fontWeight: '600',
                      fontSize: '1rem'
                    }}>
                      {getCompanyInitials(company.name)}
                    </span>
                  </div>
                  
                  {/* Company Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <CompanyName name={company.name} />
                    <div style={{
                      display: 'inline-block',
                      backgroundColor: 'rgba(100, 116, 139, 0.1)',
                      color: '#64748b',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      fontWeight: '500'
                    }}>
                      {company.industry}
                    </div>
                  </div>
                </div>

                {/* Score Section */}
                <div style={{ 
                  marginTop: 'auto',
                  padding: '1rem',
                  backgroundColor: getScoreBackgroundColor(company.score, company.max_score),
                  borderRadius: '12px',
                  border: `1px solid ${getScoreColor(company.score, company.max_score)}20`
                }}>
                  <div style={{ 
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{ 
                      color: '#64748b',
                      fontSize: '0.875rem',
                      fontWeight: '500'
                    }}>
                      Responsible AI Score
                    </span>
                    <span style={{ 
                      color: getScoreColor(company.score, company.max_score),
                      fontSize: '1.5rem',
                      fontWeight: '700'
                    }}>
                      {displayScore(company.score)}
                      <span style={{ 
                        fontSize: '1.05rem',
                        color: '#64748b',
                        fontWeight: '400',
                        marginLeft: '0.4rem' 
                      }}>
                         {company.max_score ? `/${company.max_score}` : ""}
                      </span>
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div style={{
                    width: '100%',
                    height: '6px',
                    backgroundColor: 'rgba(100, 116, 139, 0.2)',
                    borderRadius: '3px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      height: '100%',
                      width:
                      typeof company.score === "number" && typeof company.max_score === "number"
                        ? `${(company.score / company.max_score) * 100}%`
                        : "0%",
                      backgroundColor: getScoreColor(company.score, company.max_score),
                      borderRadius: '3px',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* No Results Message */}
        {filteredCompanies.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#64748b'
          }}>
            <Building2 size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
              No companies found
            </p>
            <p style={{ fontSize: '0.875rem' }}>
              Try adjusting your search terms or browse all companies
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CompanyDirectory;