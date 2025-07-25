// CompanyPage.js - Main company profile page displaying RAI scores and assessments
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// Import existing shared components
import StarRating from '../components/StarRating';
import ShareButton from '../components/ShareButton';

// Import custom hooks for data management
import { useCompanyData } from '../hooks/useCompanyData';
import { 
  useIndustryComparisons, 
  getIndustryDataForCompany, 
  getCompanyDetailsFromRankings 
} from '../hooks/useIndustryComparisons';

// Import extracted tab components
import OverviewTab from '../components/company/tabs/OverviewTab';
import MethodologyTab from '../components/company/tabs/MethodologyTab';
import SourcesTab from '../components/company/tabs/SourcesTab';

// Import utility functions for consistent color/status mapping
import { 
  getColorClassesFromStatus, 
  getStatusFromPercentile, 
  getPillarImplementationStatus 
} from '../utils/colorMapping';



// Import Lucide React icons (reduced set - other icons moved to extracted components)
import { 
  Star,	
  TrendingUp, 
  Shield, 
  Eye, 
  Scale, 
  Building, 
  Users, 
  Clock,
  Brain,
  AlertCircle,
  ExternalLink,
  Share2,
  ArrowLeft,
  Calendar,
  Award,
  Target,
  FileText,
  DollarSign,
  Globe,
  MapPin,
  Info,
  BarChart3
} from 'lucide-react';

function CompanyPage() {
  // Local UI state - manages which tab is currently active
  const [activeTab, setActiveTab] = useState('overview');

  // Extract company slug from URL parameters (e.g., /company/microsoft)
  const { slug } = useParams();

  // Fetch company data using custom hooks (replaces previous useEffect blocks)
  const { companyData, loading, error, animateScores } = useCompanyData(slug);
  const { industryComparisons } = useIndustryComparisons();

  // Process raw data into useful formats using helper functions
  const industryData = getIndustryDataForCompany(companyData, industryComparisons);
  const companyDetails = getCompanyDetailsFromRankings(companyData, industryComparisons);

  // Handle loading state with spinner and descriptive text
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900">Loading company data...</h2>
          <p className="text-gray-600 mt-2">Analyzing responsible AI practices</p>
        </div>
      </div>
    );
  }

  // Handle error state or missing company data
  if (error || !companyData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Company data not found</h2>
          <p className="text-gray-600 mt-2">Please try again or select a different company</p>
          <Link 
            to="/companies" 
            className="mt-4 inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Companies
          </Link>
        </div>
      </div>
    );
  }

  // Calculate pillar scores and convert from 0-1 scale to 0-10 scale for display
  const pillarEntries = companyData.pillarDetails
    ? Object.entries(companyData.pillarDetails)
    : [];

  // Calculate total and maximum possible scores across all pillars
  const totalScore = pillarEntries
    .reduce((sum, [_, details]) => sum + ((details.score ?? 0) * 10), 0);

  const maxScore = pillarEntries.length * 10;

  // Map pillar names to their corresponding Lucide React icons
  const PILLAR_ICONS = {
    "Transparency": Eye,
    "Fairness & Bias Mitigation": Scale,
    "Explainability": Brain,
    "Human Oversight & Accountability": Users,
    "Privacy & Security": Shield,
    "Governance & Accountability": Building,
    "Public Commitments & External Audits": Award,
  };

  // Determine implementation status by counting fully implemented pillars (score = 10)
  const fullPillars = pillarEntries.filter(
    ([_, details]) => ((details.score ?? 0) * 10) === 10
  ).length;
  const totalPillars = pillarEntries.length;
  const pillarStatus = getPillarImplementationStatus(fullPillars, totalPillars);

  // Generate color classes for UI elements using imported utility functions
  const performancePercentile = companyDetails?.overall_percentile;
  const performanceStatus = getStatusFromPercentile(performancePercentile);
  const performanceColor = getColorClassesFromStatus(performanceStatus);

  // Local utility functions for formatting and grade calculation
  const getGradeFromScore = (score, max) => {
    const percentage = (score / max) * 100;
    if (percentage >= 90) return 'A+';
    if (percentage >= 85) return 'A';
    if (percentage >= 80) return 'A-';
    if (percentage >= 75) return 'B+';
    if (percentage >= 70) return 'B';
    if (percentage >= 65) return 'B-';
    if (percentage >= 60) return 'C+';
    if (percentage >= 55) return 'C';
    if (percentage >= 50) return 'C-';
    return 'D';
  };

  // Format large numbers for display (e.g., 1000000000 -> $1.0B)
  const formatMarketCap = (value) => {
    if (value >= 1e12) return `${(value / 1e12).toFixed(1)}T`;
    if (value >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
    return `${value}`;
  };

  // Format employee counts for display (e.g., 50000 -> 50K)
  const formatEmployeeCount = (count) => {
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
    return count.toString();
  };

  // Helper function to ensure URL has proper protocol
  const formatWebsiteUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

  // Calculate derived values for display
  const overallGrade = getGradeFromScore(totalScore, maxScore);
  const overallPercentage = maxScore === 0 ? 0 : (totalScore / maxScore) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO and social media meta tags using React Helmet */}
     
		<Helmet>
		  {/* Basic Meta Tags */}
		  <title>
			{companyData ? `${companyData.name} RAI Score: ${overallGrade} Grade | RAI Scores` : "RAI Scores: Company"}
		  </title>
		  <meta
			name="description"
			content={
			  companyData?.overallFindings
				? `${companyData.name} earned a ${overallGrade} grade for Responsible AI practices. ${companyData.overallFindings.substring(0, 120)}...`
				: companyData?.summary
				? `${companyData.name} RAI Assessment: ${companyData.summary.substring(0, 120)}...`
				: `${companyData.name}: Independent Responsible AI evaluation and scoring.`
			}
		  />
		  
		  {/* Open Graph tags for Facebook, LinkedIn, WhatsApp */}
		  <meta property="og:type" content="article" />
		  <meta property="og:site_name" content="RAI Scores" />
		  <meta property="og:title" content={`${companyData?.name || "Company"} RAI Score: ${overallGrade} Grade`} />
		  <meta
			property="og:description"
			content={
			  companyData?.overallFindings
				? `${companyData.name} demonstrates ${overallGrade === 'A+' ? 'exceptional' : overallGrade.startsWith('A') ? 'strong' : 'developing'} Responsible AI practices across our 7-pillar framework. ${companyData.overallFindings.substring(0, 100)}...`
				: `Independent assessment of ${companyData?.name || "this company"}'s Responsible AI practices. Grade: ${overallGrade}`
			}
		  />
		  <meta property="og:url" content={`https://raiscores.com/company/${companyData?.slug || ""}`} />
		  <meta property="og:image" content="https://raiscores.com/og-image.png" />
		  <meta property="og:image:width" content="1200" />
		  <meta property="og:image:height" content="630" />
		  <meta property="og:image:alt" content={`${companyData?.name || "Company"} RAI Score: ${overallGrade} Grade`} />
		  
		  {/* Twitter Card tags */}
		  <meta name="twitter:card" content="summary_large_image" />
		  <meta name="twitter:site" content="@raiscores" />
		  <meta name="twitter:creator" content="@raiscores" />
		  <meta name="twitter:title" content={`${companyData?.name || "Company"} RAI Score: ${overallGrade}`} />
		  <meta
			name="twitter:description"
			content={
			  companyData?.name 
				? `${companyData.name} earned a ${overallGrade} grade for Responsible AI practices. Independent evaluation across 7 key pillars.`
				: "Independent Responsible AI evaluation and scoring"
			}
		  />
		  <meta name="twitter:image" content="https://raiscores.com/og-image.png" />
		  
		  {/* WhatsApp/iMessage specific - these help with rich previews */}
		  <meta property="og:locale" content="en_US" />
		  <meta name="robots" content="index, follow" />
		  <link rel="canonical" href={`https://raiscores.com/company/${companyData?.slug || ""}`} />
		  
		  {/* Enhanced Structured Data */}
		  <script type="application/ld+json">
			{JSON.stringify({
			  "@context": "https://schema.org",
			  "@type": ["Organization", "Article"],
			  "name": companyData?.name || "",
			  "url": companyData?.website || "",
			  "sameAs": companyData?.website || "",
			  "description": companyData?.summary || "",
			  "foundingDate": companyData?.founded_year || "",
			  "numberOfEmployees": companyData?.employee_count || "",
			  "industry": companyData?.industry || "",
			  "marketCapitalization": companyData?.market_cap_usd || "",
			  "headline": `${companyData?.name || ""} RAI Score: ${overallGrade} Grade`,
			  "about": {
				"@type": "Thing",
				"name": "Responsible AI Assessment",
				"description": "Independent evaluation of AI ethics and governance practices"
			  },
			  "publisher": {
				"@type": "Organization",
				"name": "RAI Scores",
				"url": "https://raiscores.com",
				"logo": {
				  "@type": "ImageObject",
				  "url": "https://raiscores.com/logo.png"
				}
			  },
			  "mainEntityOfPage": {
				"@type": "WebPage",
				"@id": `https://raiscores.com/company/${companyData?.slug || ""}`
			  },
			  "image": "https://raiscores.com/og-image.png",
			  "datePublished": "2025-01-01",
			  "dateModified": "2025-01-25",
			  "aggregateRating": companyData?.starRating
				? {
					"@type": "AggregateRating",
					"ratingValue": companyData.starRating,
					"bestRating": "5",
					"worstRating": "1",
					"ratingCount": companyData?.source_count > 0 ? companyData.source_count : 1,
					"description": `${companyData.name} Responsible AI Score: ${overallGrade} grade based on ${totalPillars} assessment pillars`
				  }
				: undefined
			})}
		  </script>
		</Helmet>
      
      {/* Sticky navigation bar with breadcrumbs and actions */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Back navigation link */}
            <Link
              to="/companies"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Companies</span>
            </Link>
            <div className="text-gray-400 hidden sm:block">|</div>
            {/* Breadcrumb showing current location */}
            <div className="text-sm text-gray-600 hidden sm:block">
              {companyData.industry} &gt; {companyData.name}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Share button - Imports ShareButton Modal */}
            <ShareButton 
			  url={`https://raiscores.com/company/${companyData?.slug || ""}`}
			  title={`RAI Scores: ${companyData?.name || ""}`}
			  description={companyData?.overallFindings || companyData?.summary || `${companyData?.name}: Responsible AI assessment`}
			  companyName={companyData?.name}
			  companyGrade={overallGrade} // This should be the calculated grade
			/>
          </div>
        </div>
      </nav>

      {/* Company profile hero section with key information and score */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {/* Left side: Company information and details */}
            <div className="lg:col-span-2">
              <div className="flex items-start gap-4 mb-4">
                {/* Company logo placeholder using first letter */}
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  {companyData.name.charAt(0)}
                </div>
                <div className="flex-1">
                  {/* Company name and basic info */}
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {companyData.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      {companyData.industry}
                    </span>
                    {companyData.ticker && (
                      <>
                        <span>•</span>
                        <span className="font-medium">{companyData.ticker}</span>
                      </>
                    )}
                    {companyData.fortune_rank && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          Fortune #{companyData.fortune_rank}
                        </span>
                      </>
                    )}
                  </div>
                  {/* Location and website */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {companyData.headquarters}
                    </span>
                    <a 
                      href={formatWebsiteUrl(companyData.website)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                    >
                      <Globe className="w-4 h-4" />
                      {companyData.website}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Company description */}
              <p className="text-gray-700 leading-relaxed mb-6">
                {companyData.summary}
              </p>
              
              {/* Key statistics in grid format */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{companyData.founded_year}</div>
                  <div className="text-sm text-gray-600">Founded</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{formatMarketCap(companyData.market_cap_usd)}</div>
                  <div className="text-sm text-gray-600">Market Cap</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{formatEmployeeCount(companyData.employee_count)}</div>
                  <div className="text-sm text-gray-600">Employees</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{companyData.source_count}</div>
                  <div className="text-sm text-gray-600">Sources</div>
                </div>
              </div>
            </div>
            
            {/* Right side: Score dashboard with overall grade and metrics */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 text-center border border-blue-100">
                <div className="mb-4">
                  {/* Letter grade and star rating */}
                  <div className="text-6xl font-bold text-blue-600 mb-2">{overallGrade}</div>
                  <div className="text-sm text-gray-600 mb-2">Overall Grade</div>
                  <StarRating rating={companyData.starRating} />
                </div>
                
                {/* Animated progress bar showing score percentage */}
                <div className="w-full bg-white rounded-full h-3 mb-4">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: animateScores ? `${overallPercentage}%` : '0%' }}
                  />
                </div>
                
                {/* Numerical score display */}
                <div className="text-sm text-gray-600 mb-4">
                  {totalScore}/{maxScore} total score
                </div>
                
                {/* Industry ranking information */}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-white bg-opacity-70 rounded-lg p-2">
                    <div className="font-semibold text-green-600">#{companyDetails?.industry_rank || 'N/A'}</div>
                    <div className="text-gray-600">Industry Rank</div>
                  </div>
                  <div className="bg-white bg-opacity-70 rounded-lg p-2">
                    <div className="font-semibold text-blue-600">{performancePercentile ? `${performancePercentile}%` : 'N/A'}</div>
                    <div className="text-gray-600">Percentile</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main content area with tab navigation and content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Tab navigation bar */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-1 border-b border-gray-200">
              {['overview', 'sources', 'methodology','detailed-analysis', 'compare'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 font-medium capitalize transition-all duration-200 border-b-2 ${
                    activeTab === tab
                      ? 'text-blue-600 border-blue-600'
                      : 'text-gray-600 border-transparent hover:text-gray-900 hover:border-gray-300'
                  }`}
                >
                  {tab.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Main content grid with tab content and sidebar */}
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main content area (3/4 width) */}
            <div className="lg:col-span-3">
              {/* OVERVIEW TAB - Now using extracted component */}
              {activeTab === 'overview' && (
                <OverviewTab
                  companyData={companyData}
                  fullPillars={fullPillars}
                  totalPillars={totalPillars}
                  pillarStatus={pillarStatus}
                  performanceColor={performanceColor}
                  performancePercentile={performancePercentile}
                  PILLAR_ICONS={PILLAR_ICONS}
                  animateScores={animateScores}
                  onViewSources={() => setActiveTab('sources')}
                />
              )}

              {/* DETAILED ANALYSIS TAB - Coming soon preview */}
              {activeTab === 'detailed-analysis' && (
                <div className="space-y-8">
                  {/* Hero section explaining upcoming features */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 text-center border border-blue-100">
                    <div className="max-w-2xl mx-auto">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Brain className="w-8 h-8 text-blue-600 animate-pulse" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Advanced AI Analysis
                      </h2>
                      <p className="text-lg text-gray-600 mb-6">
                        Deep-dive assessments, risk modeling, and predictive insights are coming soon. 
                        Get ready for the most comprehensive responsible AI evaluation platform.
                      </p>
                      <div className="flex items-center justify-center gap-2 text-sm text-blue-600 bg-blue-100 rounded-full px-4 py-2 inline-flex">
                        <Clock className="w-4 h-4" />
                        <span>In Development</span>
                      </div>
                    </div>
                  </div>

                  {/* Preview of upcoming features */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Coming</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Risk assessment preview card */}
                      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-gradient-to-l from-orange-500 to-red-500 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg">
                          HIGH IMPACT
                        </div>
                        <div className="flex items-start gap-4 mb-4">
                          <div className="p-3 bg-red-50 rounded-lg">
                            <AlertCircle className="w-6 h-6 text-red-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">AI Risk Assessment</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              Comprehensive risk modeling across deployment scenarios, potential failure modes, and societal impact vectors.
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Risk Scoring</span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Failure Analysis</span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Impact Modeling</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Benchmarking preview card */}
                      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="p-3 bg-blue-50 rounded-lg">
                            <BarChart3 className="w-6 h-6 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Advanced Benchmarking</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              Compare against industry leaders, regulatory standards, and best practices with detailed breakdowns.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SOURCES TAB - Rendered using imported component with full source analysis */} 
              {activeTab === 'sources' && <SourcesTab companyData={companyData} />}

              {/* METHODOLOGY TAB - Rendered using imported component */} 
              {activeTab === 'methodology' && <MethodologyTab />}

              {/* COMPARE TAB - Industry comparison table */}
              {activeTab === 'compare' && (
                <div className="space-y-8">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Compare Companies</h2>
                    <p className="text-gray-700 mb-6">
                      See how {companyData.name} stacks up against industry leaders and the broader market.
                    </p>
                    {/* Industry comparison table */}
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead>
                          <tr className="bg-gray-100 text-gray-700">
                            <th className="px-4 py-2 text-left font-semibold">Company</th>
                            <th className="px-4 py-2 text-left font-semibold">Industry Rank</th>
                            <th className="px-4 py-2 text-left font-semibold">Overall Score</th>
                            <th className="px-4 py-2 text-left font-semibold">Grade</th>
                          </tr>
                        </thead>
                        <tbody>
                          {/* Render industry leaders if available */}
                          {industryData && industryData.industry_leaders && industryData.industry_leaders.map((leader, idx) => (
                            <tr key={leader.name} className={leader.name === companyData.name ? "bg-blue-50" : ""}>
                              <td className="px-4 py-2 font-semibold">{leader.name}</td>
                              <td className="px-4 py-2">{leader.rank}</td>
                              <td className="px-4 py-2">{leader.score}</td>
                              <td className="px-4 py-2">
                                <span className={
                                  leader.rating === "A+"
                                    ? "text-green-600"
                                    : leader.rating === "A"
                                    ? "text-green-600 font-medium"
                                    : "text-blue-600"
                                }>
                                  {leader.rating}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar (1/4 width) with additional information and actions */}
            <div className="space-y-6">
              {/* Data quality metrics */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Data Quality</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last Updated:</span>
                    <span className="text-sm font-medium">Jun 2025</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Sources:</span>
                    <span className="text-sm font-medium">{companyData.source_count}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Confidence:</span>
                    <span className="text-sm font-medium text-green-600">{companyData.data_confidence}</span>
                  </div>
                </div>
              </div>

                {/* Industry comparison visualization */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Industry Comparison</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Your Rank</span>
                      <span className="font-medium">#{companyDetails?.industry_rank || 'N/A'}</span>
                    </div>
                    {/* Progress bar showing industry percentile */}
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${companyDetails?.industry_percentile || 0}%` }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Top {companyDetails?.industry_percentile || 'N/A'}% of {industryData?.total_companies || 'N/A'} {companyData.industry} companies
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <div className="text-sm text-gray-600 mb-2">Industry Leaders:</div>
                    <div className="space-y-1 text-sm">
                      {industryData?.industry_leaders?.map((leader, index) => (
                        <div key={leader.name} className="flex justify-between">
                          <span
                            className={leader.name === companyData.name ? "font-bold" : ""}
                          >
                            {index + 1}. {leader.name}
                          </span>
                          <span
                            className={
                              leader.rating === "A+"
                                ? "text-green-600"
                                : leader.rating === "A"
                                ? "text-green-600 font-medium"
                                : "text-blue-600"
                            }
                          >
                            {leader.rating}
                          </span>
                        </div>
                      ))}

                      {/* Show current company if not in top 3 */}
                      {!industryData?.industry_leaders?.some(l => l.name === companyData.name) && companyDetails && (
                        <div className="flex justify-between font-bold mt-2 border-t pt-2">
                          <span>{companyDetails.industry_rank}. {companyDetails.name}</span>
                          <span
                            className={
                              companyDetails.rating === "A+"
                                ? "text-green-600"
                                : companyDetails.rating === "A"
                                ? "text-green-600 font-medium"
                                : "text-blue-600"
                            }
                          >
                            {companyDetails.rating}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons for user engagement */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Link to="/coming-soon" className="block">
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                      Compare Companies
                    </button>
                  </Link>
                  <Link to="/coming-soon" className="block">
                    <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                      Download Report
                    </button>
                  </Link>
                </div>
              </div>

              {/* Premium upgrade call-to-action */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Get Full Access</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Unlock detailed analysis, source documentation, and comparison tools
                  </p>
                  <Link to="/coming-soon" className="block">
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                      Start Free Trial
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CompanyPage;