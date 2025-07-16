import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [animateScores, setAnimateScores] = useState(false);

  useEffect(() => {
    // Enhanced Microsoft data with more company profile information
    const mockCompanyData = {
      name: "Microsoft Corporation",
      slug: "microsoft",
      industry: "Technology",
      ticker: "MSFT",
      website: "https://www.microsoft.com",
      founded_year: 1975,
      employee_count: 228000,
      market_cap_usd: 3480000000000,
      headquarters: "Redmond, Washington, United States",
      is_public: true,
      fortune_rank: 15,
      summary: "Microsoft Corporation is a leading global technology company headquartered in Redmond, Washington, known for its Windows operating systems, Office productivity suite, Azure cloud platform, and Xbox gaming. Founded in 1975, Microsoft is one of the world's largest companies by market capitalization and a dominant force in software, cloud computing, and consumer electronics.",
      last_updated: "2025-06-10",
      overall_score: 70,
      max_score: 70,
      star_rating: 5,
      percentile_rank: 95,
      industry_rank: 2,
      total_companies_in_industry: 45,
      data_confidence: "High",
      source_count: 14
    };
    
    setTimeout(() => {
      setCompanyData(mockCompanyData);
      setLoading(false);
      setTimeout(() => setAnimateScores(true), 500);
    }, 1000);
  }, []);

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
    { 
      name: 'Fairness & Bias Mitigation', 
      score: 10, 
      max: 10, 
      icon: Scale,
      status: 'excellent',
      description: 'Comprehensive bias prevention measures and diverse hiring practices with validation protocols',
      sources: 2,
      confidence: 'High'
    },
    { 
      name: 'Explainability', 
      score: 10, 
      max: 10, 
      icon: Brain,
      status: 'excellent',
      description: 'Open-source tools and interpretability frameworks like InterpretML for model understanding',
      sources: 2,
      confidence: 'High'
    },
    { 
      name: 'Human Oversight & Accountability', 
      score: 10, 
      max: 10, 
      icon: Users,
      status: 'excellent',
      description: 'Clear human validation requirements for AI decisions with documented oversight protocols',
      sources: 2,
      confidence: 'High'
    },
    { 
      name: 'Privacy & Security', 
      score: 10, 
      max: 10, 
      icon: Shield,
      status: 'excellent',
      description: 'Strong encryption, access controls, and privacy-by-design implementation in AI systems',
      sources: 2,
      confidence: 'High'
    },
    { 
      name: 'Governance & Accountability', 
      score: 10, 
      max: 10, 
      icon: Building,
      status: 'excellent',
      description: 'NIST-aligned risk management practices with comprehensive enterprise AI governance',
      sources: 2,
      confidence: 'High'
    },
    { 
      name: 'Public Commitments & External Audits', 
      score: 10, 
      max: 10, 
      icon: Award,
      status: 'excellent',
      description: 'Strong public partnerships and voluntary adherence to government-led safety standards',
      sources: 2,
      confidence: 'High'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'excellent': return 'bg-green-50';
      case 'good': return 'bg-blue-50';
      case 'fair': return 'bg-yellow-50';
      case 'poor': return 'bg-red-50';
      default: return 'bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent': return CheckCircle;
      case 'good': return CheckCircle;
      case 'fair': return AlertCircle;
      case 'poor': return XCircle;
      default: return AlertCircle;
    }
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

  const PillarCard = ({ name, score, max, icon: Icon, status, description, sources, confidence }) => {
    const StatusIcon = getStatusIcon(status);
    const percentage = (score / max) * 100;
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 group">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3 flex-1">
            <div className={`p-3 rounded-lg ${getStatusBgColor(status)} group-hover:scale-105 transition-transform duration-200`}>
              <Icon className={`w-5 h-5 ${getStatusColor(status)}`} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
              <div className="flex items-center gap-2 mb-2">
                <StatusIcon className={`w-4 h-4 ${getStatusColor(status)}`} />
                <span className={`text-sm font-medium capitalize ${getStatusColor(status)}`}>
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

  const overallGrade = getGradeFromScore(companyData.overall_score, companyData.max_score);
  const overallPercentage = (companyData.overall_score / companyData.max_score) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
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
              {companyData.industry} > {companyData.name}
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
                  <StarRating rating={companyData.star_rating} />
                </div>
                
                <div className="w-full bg-white rounded-full h-3 mb-4">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: animateScores ? `${overallPercentage}%` : '0%' }}
                  />
                </div>
                
                <div className="text-sm text-gray-600 mb-4">
                  {companyData.overall_score}/{companyData.max_score} total score
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
              {['overview', 'detailed-analysis', 'sources', 'methodology', 'compare'].map((tab) => (
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
              {activeTab === 'overview' && (
                <div className="space-y-8">
                  {/* Executive Summary */}
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Executive Summary</h2>
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-semibold text-green-800">Excellent</span>
                        </div>
                        <div className="text-2xl font-bold text-green-600">7/7</div>
                        <div className="text-sm text-green-700">Pillars with full implementation</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <BarChart3 className="w-5 h-5 text-blue-600" />
                          <span className="font-semibold text-blue-800">Performance</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-600">95th</div>
                        <div className="text-sm text-blue-700">Percentile ranking</div>
                      </div>
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
                        Microsoft Corporation demonstrates <strong>exceptional responsible AI practices</strong> across all evaluated criteria, 
                        earning a perfect score of 70/70. The company provides comprehensive documentation, open-source tools, 
                        and policy disclosures that align with industry best practices and regulatory expectations.
                      </p>
                    </div>
                  </div>

                  {/* Pillar Breakdown */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Responsible AI Assessment</h2>
                    <div className="grid gap-6">
                      {pillarData.map((pillar, index) => (
                        <PillarCard key={index} {...pillar} />
                      ))}
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
                      <span className="font-medium">#{companyData.industry_rank}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '95%' }} />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Top 5% of {companyData.total_companies_in_industry} {companyData.industry} companies
                    </div>
                  </div>
                  
                  <div className="pt-3 border-t border-gray-200">
                    <div className="text-sm text-gray-600 mb-2">Industry Leaders:</div>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>1. OpenAI</span>
                        <span className="text-green-600">A+</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium">2. Microsoft</span>
                        <span className="text-green-600 font-medium">A</span>
                      </div>
                      <div className="flex justify-between">
                        <span>3. Google</span>
                        <span className="text-blue-600">A-</span>
                      </div>
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
          </div>
        </div>
      </section>
    </div>
  );
}

export default CompanyPage;