// CompanyPage.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

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
  Lock,
  CheckCircle,
  AlertCircle,
  XCircle,
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
  Briefcase,
  Info,
  ChevronRight,
  BarChart3,
  TrendingDown,
  Minus
} from 'lucide-react';

function CompanyPage() {
  const [companyData, setCompanyData] = useState(null);
  const [industryComparisons, setIndustryComparisons] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [animateScores, setAnimateScores] = useState(false);

  const { slug } = useParams();

  useEffect(() => {
    setLoading(true);
    setAnimateScores(false);

    Promise.all([
      fetch(`${process.env.PUBLIC_URL}/data/companies/${slug}_profile.json`).then(res => res.json()),
      fetch(`${process.env.PUBLIC_URL}/data/companies/${slug}_scores.json`).then(res => res.json())
    ])
      .then(([profile, scores]) => {
        // You can merge or keep these separate!
        setCompanyData({
          ...profile,
          ...scores.aggregate, //use ... only if there is a spread of propertis in an object
          pillarDetails: scores.pillarDetails,
          overallFindings: scores.summary?.overallFindings,	// or whatever part you want
          // HARDCODED DATA
           last_updated: "2025-06-10",
          //overall_score: 70,
          //max_score: 70,
          //star_rating: 5,
          percentile_rank: 95,
          industry_rank: 2,
          total_companies_in_industry: 45,
          data_confidence: "High",
          source_count: 14
        });
        setLoading(false);
        setTimeout(() => setAnimateScores(true), 500);
      })
      .catch(() => {
        setCompanyData(null);
        setLoading(false);
      });
  }, [slug]);
  
  // Fetch industry comparisons
  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/rankings/companyRankings.json`)
      .then(res => res.json())
      .then(data => setIndustryComparisons(data))
      .catch(err => {
        console.error("Failed to load industry comparisons", err);
        setIndustryComparisons(null);
      });
  }, []);

  // Extract the summary data for the current company's industry
  // but only if both company data and the full industry comparisons
  // JSON have been loaded successfully.
  // This includes details like total companies in the industry and industry leaders.
  const industryData =
    companyData?.industry && industryComparisons
      ? industryComparisons.industrySummaries[companyData.industry]
      : null;

  // ⬇️ Check if Company Data is there ⬇️
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
  if (!companyData) {
    return <div>Company data not found.</div>;
  }

  // ⬇️ Calculates Pillar Scores and transforms to 1-10 scale ⬇️
  const pillarEntries = companyData.pillarDetails
    ? Object.entries(companyData.pillarDetails)
    : [];

  const totalScore = pillarEntries
    .reduce((sum, [_, details]) => sum + ((details.score ?? 0) * 10), 0);

  const maxScore = pillarEntries.length * 10;

  //maps industry leaders to check if company is in top 3
  const currentCompanyInLeaders = industryData?.industry_leaders?.some(
    (l) => l.name === companyData.name
  );

  //gives percentiles and rank in industry
  const companyDetails = industryComparisons?.allCompanies?.find(
    (c) => c.slug === companyData.slug
  );

  // ------------- CENTRALIZED COLOR LOGIC STARTS HERE -------------

  /**
   * Map a generic status to color classnames for bg/text/icon.
   * Used everywhere: pillar cards, performance cards, etc.
   */
  const getColorClassesFromStatus = (status) => {
    switch (status) {
      case 'excellent': return { text: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle };
      case 'good':      return { text: 'text-blue-600',  bg: 'bg-blue-50',  icon: CheckCircle };
      case 'fair':      return { text: 'text-yellow-600',bg: 'bg-yellow-50',icon: AlertCircle };
      case 'poor':      return { text: 'text-red-600',   bg: 'bg-red-50',   icon: XCircle };
      default:          return { text: 'text-gray-600',  bg: 'bg-gray-50',  icon: AlertCircle };
    }
  };

  /**
   * Map a percentile (0-100) to a status string.
   * Used for dynamic coloring of performance box.
   */
  const getStatusFromPercentile = (percentile) => {
    if (percentile === null || percentile === undefined) return 'neutral';
    if (percentile >= 90) return 'excellent';
    if (percentile >= 70) return 'good';
    if (percentile >= 40) return 'fair';
    return 'poor';
  };

  // ------------- CENTRALIZED COLOR LOGIC ENDS HERE ---------------

  //hardcoded pillar detail, can delete	
  const pillarData = [
    { 
      name: 'Transparency', 
      score: 10, 
      max: 10, 
      icon: Eye,
      status: 'excellent',
      description: 'Detailed transparency reports and public documentation with comprehensive AI practice disclosure',
      sources: 2,
      confidence: 'High'
    },
    // ... rest of pillars
  ];
  
  const PILLAR_ICONS = {
    "Transparency": Eye,
    "Fairness & Bias Mitigation": Scale,
    "Explainability": Brain,
    "Human Oversight & Accountability": Users,
    "Privacy & Security": Shield,
    "Governance & Accountability": Building,
    "Public Commitments & External Audits": Award,
  };

  // Determine the pillar implementation status
  const fullPillars = pillarEntries.filter(
    ([_, details]) => ((details.score ?? 0) * 10) === 10 // Or: details.score === 1 if not scaled yet
  ).length;
  const totalPillars = pillarEntries.length;

  const getPillarImplementationStatus = (fullPillars, totalPillars) => {
    if (fullPillars === totalPillars) return 'excellent';
    if (fullPillars >= 5) return 'good';
    if (fullPillars >= 3) return 'fair';
    return 'poor';
  };

  const pillarStatus = getPillarImplementationStatus(fullPillars, totalPillars);

  // Get classes for the pillar summary box using refactored logic
  const pillarColor = getColorClassesFromStatus(pillarStatus);

  // Get classes for the performance summary box using refactored logic
  const performancePercentile = companyDetails?.overall_percentile;
  const performanceStatus = getStatusFromPercentile(performancePercentile);
  const performanceColor = getColorClassesFromStatus(performanceStatus);

  // Utility functions for grade, formatting, etc.
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

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-blue-600';
    if (score >= 4) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreGradient = (score) => {
    if (score >= 8) return 'from-green-500 to-green-600';
    if (score >= 6) return 'from-blue-500 to-blue-600';
    if (score >= 4) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  const formatMarketCap = (value) => {
    if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
    return `$${value}`;
  };

  const formatEmployeeCount = (count) => {
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
    return count.toString();
  };

  const StarRating = ({ rating }) => (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );

  // PillarCard uses centralized color logic
  const PillarCard = ({ name, score, max, icon: Icon, status, description, sources, confidence }) => {
    const color = getColorClassesFromStatus(status);
    const percentage = (score / max) * 100;
    const StatusIcon = color.icon;

    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 flex-1">
            <div className={`p-3 rounded-lg ${color.bg} group-hover:scale-105 transition-transform duration-200`}>
              <Icon className={`w-5 h-5 ${color.text}`} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <StatusIcon className={`w-4 h-4 ${color.text}`} />
                <span className={`text-sm font-medium capitalize ${color.text}`}>
                  {status}
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-sm text-gray-500">{sources} sources</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}</div>
            <div className="text-sm text-gray-500">/{max}</div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className={`bg-gradient-to-r ${getScoreGradient(score)} h-3 rounded-full transition-all duration-1000 ease-out`}
            style={{ width: animateScores ? `${percentage}%` : '0%' }}
          />
        </div>
        
        <p className="text-sm text-gray-600 mb-3">{description}</p>
        
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Info className="w-3 h-3" />
            Confidence: {confidence}
          </span>
          <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors">
            View Sources
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  };

  // --- Main Render Start ---
  const overallGrade = getGradeFromScore(totalScore, maxScore);
  const overallPercentage = maxScore === 0 ? 0 : (totalScore / maxScore) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
	  {/* Dynamic Page Title */}
		<Helmet>
      <title>
        {companyData ? `RAI Score: ${companyData.name}` : "RAI Score: Company"}
      </title>
    </Helmet>
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/companies"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Companies</span>
            </Link>
            <div className="text-gray-400 hidden sm:block">|</div>
            <div className="text-sm text-gray-600 hidden sm:block">
              {companyData.industry} &gt; {companyData.name}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Company Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Company Header */}
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                  {companyData.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                    {companyData.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-3">
                    <span className="flex items-center gap-1">
                      <Building className="w-4 h-4" />
                      {companyData.industry}
                    </span>
                    <span>•</span>
                    <span className="font-medium">{companyData.ticker}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      Fortune #{companyData.fortune_rank}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {companyData.headquarters}
                    </span>
                    <span className="flex items-center gap-1">
                      <Globe className="w-4 h-4" />
                      {companyData.website}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed mb-6">
                {companyData.summary}
              </p>
              
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
            {/* Score Dashboard */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 text-center border border-blue-100">
                <div className="mb-4">
                  <div className="text-6xl font-bold text-blue-600 mb-2">{overallGrade}</div>
                  <div className="text-sm text-gray-600 mb-2">Overall Grade</div>
                  <StarRating rating={companyData.starRating} /> {/*Pull in Company Star Rating */}
                </div>
                
                <div className="w-full bg-white rounded-full h-3 mb-4">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: animateScores ? `${overallPercentage}%` : '0%' }}
                  />
                </div>
                
                <div className="text-sm text-gray-600 mb-4">
                  {totalScore}/{maxScore} total score  {/*Pull in calculations for total score */}
                </div>
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="bg-white bg-opacity-70 rounded-lg p-2">
                    <div className="font-semibold text-green-600">#{companyData.industry_rank}</div>
                    <div className="text-gray-600">Industry Rank</div>
                  </div>
                  <div className="bg-white bg-opacity-70 rounded-lg p-2">
                    <div className="font-semibold text-blue-600">{companyData.percentile_rank}%</div>
                    <div className="text-gray-600">Percentile</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Navigation Tabs */}
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

          {/* Tab Content */}
          <div className="grid lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              {/* OVERVIEW TAB */}
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Executive Summary */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Executive Summary</h2>
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      {/* Pillar Implementation Box with refactored dynamic colors */}
                      <div className={`rounded-lg p-4 ${pillarColor.bg}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <pillarColor.icon className={`w-5 h-5 ${pillarColor.text}`} />
                          <span className={`font-semibold capitalize ${pillarColor.text}`}>{pillarStatus}</span>
                        </div>
                        <div className={`text-2xl font-bold ${pillarColor.text}`}>{fullPillars}/{totalPillars}</div>
                        <div className={`text-sm ${pillarColor.text}`}>Pillars with full implementation</div>
                      </div>
                      {/* Performance Box with refactored dynamic colors */}
                      <div className={`rounded-lg p-4 ${performanceColor.bg}`}>
                        <div className="flex items-center gap-2 mb-2">
                          <BarChart3 className={`w-5 h-5 ${performanceColor.text}`} />
                          <span className={`font-semibold ${performanceColor.text}`}>Performance</span>
                        </div>
                        <div className={`text-2xl font-bold ${performanceColor.text}`}>
                          {performancePercentile ? `${performancePercentile}th` : 'N/A'}
                        </div>
                        <div className={`text-sm ${performanceColor.text}`}>Percentile ranking</div>
                      </div>
                      {/* Data Confidence Box (still purple for now) */}
                      <div className="bg-purple-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="w-5 h-5 text-purple-600" />
                          <span className="font-semibold text-purple-800">Confidence</span>
                        </div>
                        <div className="text-2xl font-bold text-purple-600">High</div>
                        <div className="text-sm text-purple-700">Data reliability</div>
                      </div>
                    </div>
                    
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed">
                        {companyData.overallFindings || "Responsible AI assessment not available for this company."}
                      </p>
                    </div>
                  </div>

                  {/* Pillar Breakdown */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Responsible AI Assessment</h2>
                    <div className="grid gap-6">
                      {/* Pull Pillar information from JSON */}
                      {companyData.pillarDetails &&
                        Object.entries(companyData.pillarDetails).map(([pillarName, details], index) => {
                          const Icon = PILLAR_ICONS[pillarName] || Info;
                          const scaledScore = (details.score ?? 0) * 10; //Calculation from 0-1 to a 0-10 scale
                          return (
                            <PillarCard
                              key={pillarName}
                              name={pillarName}
                              score={scaledScore}
                              max={10}
                              icon={Icon}
                              status={details.status || 'excellent'}
                              description={details.justification || details.findings}
                              sources={details.relevantSources?.length || 0}
                              confidence="High"
                            />
                          );
                        })}
                    </div>
                  </div>
                </div>
              )}

              {/* DETAILED ANALYSIS TAB */}
              {activeTab === 'detailed-analysis' && (
                <div className="space-y-8">
                  {/* Hero Section */}
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
                  {/* Feature Preview Grid */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Coming</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* AI Risk Assessment */}
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

                      {/* Benchmark Comparisons */}
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
                            <div className="flex flex-wrap gap-2">
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Peer Analysis</span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Regulatory Alignment</span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Best Practices</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Predictive Insights */}
                      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="p-3 bg-green-50 rounded-lg">
                            <TrendingUp className="w-6 h-6 text-green-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Predictive Insights</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              AI-powered forecasting of responsible AI trends, regulatory changes, and competitive positioning.
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Trend Analysis</span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Regulatory Forecast</span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Market Position</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Custom Reports */}
                      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="p-3 bg-purple-50 rounded-lg">
                            <FileText className="w-6 h-6 text-purple-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">Custom Reports</h4>
                            <p className="text-sm text-gray-600 mb-3">
                              Generate tailored reports for stakeholders, board presentations, and regulatory submissions.
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Executive Summary</span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Technical Deep-dive</span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">Compliance Report</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Development Timeline */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Development Roadmap</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-white" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">Core Assessment Engine</h4>
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Complete</span>
                          </div>
                          <p className="text-sm text-gray-600">7-pillar framework with automated scoring and analysis</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">Risk Assessment Module</h4>
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">TBD</span>
                          </div>
                          <p className="text-sm text-gray-600">Advanced risk modeling and scenario analysis</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">Predictive Analytics</h4>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">TBD</span>
                          </div>
                          <p className="text-sm text-gray-600">AI-powered insights and trend forecasting</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Early Access CTA */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-center text-white">
                    <h3 className="text-2xl font-bold mb-4">Be the First to Know</h3>
                    <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                      Join our beta program and get early access to advanced features. 
                      We'll notify you as soon as detailed analysis tools are available.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                      <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 px-4 py-2 rounded-lg text-gray-900 placeholder-gray-500 border-0 focus:ring-2 focus:ring-blue-300"
                      />
                      <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                        Join Beta
                      </button>
                    </div>
                    <p className="text-blue-200 text-sm mt-4">
                      Expected launch: Q3 2025 • No spam, unsubscribe anytime
                    </p>
                  </div>
                </div>
              )}
              {/* SOURCES TAB */}
              {activeTab === 'sources' && (
                <div className="space-y-8">
                  {/* Sources Overview Header */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Source Documentation</h2>
                    <p className="text-gray-700 mb-4">
                      Below are the public documents, statements, reports, and filings used to evaluate this company’s Responsible AI practices.
                      <br />
                      Click any source to view the original document in a new tab.
                    </p>
                    {companyData.sources && companyData.sources.length > 0 ? (
                      <ul className="divide-y divide-gray-200">
                        {companyData.sources.map((source, idx) => (
                          <li key={idx} className="py-4 flex items-start gap-3">
                            <ExternalLink className="w-5 h-5 text-blue-500 mt-1" />
                            <div className="flex-1">
                              <a
                                href={source.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-700 hover:underline font-medium"
                              >
                                {source.title}
                              </a>
                              <div className="text-xs text-gray-500">{source.date}</div>
                              <div className="text-sm text-gray-700">{source.description}</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <div className="text-gray-500 italic">No sources documented for this company yet.</div>
                    )}
                  </div>
                </div>
              )}

              {/* METHODOLOGY TAB */}
              {activeTab === 'methodology' && (
                <div className="space-y-8">
                  {/* Methodology Hero */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 text-center border border-blue-100">
                    <div className="max-w-2xl mx-auto">
                      <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Scale className="w-8 h-8 text-blue-600" />
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Responsible AI Scorecard Methodology
                      </h2>
                      <p className="text-lg text-gray-600 mb-6">
                        Transparent, explainable, and consistent. Our framework draws on global standards and industry best practices.
                      </p>
                    </div>
                  </div>
                  {/* Methodology Breakdown */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">How Companies Are Assessed</h3>
                    <ol className="space-y-4 list-decimal list-inside">
                      <li>
                        <span className="font-semibold text-blue-600">Data Collection:</span> We source all documentation from public records, official filings, press releases, and third-party assessments.
                      </li>
                      <li>
                        <span className="font-semibold text-blue-600">Pillar Evaluation:</span> Each company is scored on 7 core pillars including Transparency, Fairness & Bias, Explainability, Human Oversight, Privacy, Governance, and Public Commitments.
                      </li>
                      <li>
                        <span className="font-semibold text-blue-600">Scoring Rubric:</span> Our analysts rate implementation quality for each pillar using a standardized 0–10 scale with supporting justifications and public links.
                      </li>
                      <li>
                        <span className="font-semibold text-blue-600">Percentile Calculation:</span> Industry ranks and percentiles are computed relative to the peer group using aggregate scores.
                      </li>
                      <li>
                        <span className="font-semibold text-blue-600">Review & Audit:</span> All ratings undergo periodic review, with a focus on transparent updates and corrections as new data emerges.
                      </li>
                    </ol>
                  </div>
                  {/* Pillar Definitions */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Pillar Definitions</h3>
                    <ul className="space-y-2">
                      <li>
                        <span className="font-semibold text-gray-900">Transparency:</span> Public disclosure of AI use, capabilities, limitations, and training data.
                      </li>
                      <li>
                        <span className="font-semibold text-gray-900">Fairness & Bias Mitigation:</span> Measures to detect, prevent, and monitor bias or discrimination.
                      </li>
                      <li>
                        <span className="font-semibold text-gray-900">Explainability:</span> Ability to explain AI system decisions to stakeholders, regulators, or affected users.
                      </li>
                      <li>
                        <span className="font-semibold text-gray-900">Human Oversight & Accountability:</span> Presence of human-in-the-loop processes, clear lines of responsibility, and escalation protocols.
                      </li>
                      <li>
                        <span className="font-semibold text-gray-900">Privacy & Security:</span> Compliance with privacy laws, data minimization, and strong security controls for sensitive data.
                      </li>
                      <li>
                        <span className="font-semibold text-gray-900">Governance & Accountability:</span> Organizational structures, risk controls, and leadership responsibility for AI use.
                      </li>
                      <li>
                        <span className="font-semibold text-gray-900">Public Commitments & External Audits:</span> Published principles, participation in voluntary standards, or use of third-party audits/certifications.
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* COMPARE TAB */}
              {activeTab === 'compare' && (
                <div className="space-y-8">
                  {/* Compare Header */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Compare Companies</h2>
                    <p className="text-gray-700 mb-6">
                      See how {companyData.name} stacks up against industry leaders and the broader market.
                    </p>
                    {/* Comparison Table Example */}
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
                          {/* Show current company if not in leaders */}
                          {!industryData?.industry_leaders?.some(l => l.name === companyData.name) && companyDetails && (
                            <tr className="bg-blue-50 font-bold">
                              <td className="px-4 py-2">{companyDetails.name}</td>
                              <td className="px-4 py-2">{companyDetails.industry_rank}</td>
                              <td className="px-4 py-2">{companyDetails.score}</td>
                              <td className="px-4 py-2">
                                <span className={
                                  companyDetails.rating === "A+"
                                    ? "text-green-600"
                                    : companyDetails.rating === "A"
                                    ? "text-green-600 font-medium"
                                    : "text-blue-600"
                                }>
                                  {companyDetails.rating}
                                </span>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Data Quality */}
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

              {/* Industry Comparison */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Industry Comparison</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Your Rank</span>
                      <span className="font-medium">#{companyDetails?.industry_rank || 'N/A'}</span>
                    </div>
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

              {/* Quick Actions */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Compare Companies
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                    Download Report
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                    View All Sources
                  </button>
                </div>
              </div>

              {/* Premium Upgrade */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Star className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Get Full Access</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Unlock detailed analysis, source documentation, and comparison tools
                  </p>
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Start Free Trial
                  </button>
                </div>
              </div>
            </div>
            {/* End Sidebar */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default CompanyPage;
