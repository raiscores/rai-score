import React, { useEffect, useState } from 'react';
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
  FileText
} from 'lucide-react';

function CompanyPage() {
  const [companyData, setCompanyData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Using Microsoft data from the JSON files
    const mockCompanyData = {
      name: "Microsoft Corporation",
      slug: "microsoft",
      industry: "Technology",
      ticker: "MSFT",
      founded_year: 1975,
      employee_count: 228000,
      market_cap_usd: 3480000000000,
      is_public: true,
      fortune_rank: 15,
      last_updated: "2025-06-10",
      overall_score: 7,
      max_score: 7,
      star_rating: 5,
      percentile_rank: 95,
      industry_rank: 2,
      total_companies_in_industry: 45
    };
    
    setTimeout(() => {
      setCompanyData(mockCompanyData);
      setLoading(false);
    }, 1000);
  }, []);

  const pillarData = [
    { 
      name: 'Transparency', 
      score: 1, 
      max: 1, 
      icon: Eye,
      status: 'excellent',
      description: 'Detailed transparency reports and public documentation'
    },
    { 
      name: 'Fairness & Bias', 
      score: 1, 
      max: 1, 
      icon: Scale,
      status: 'excellent',
      description: 'Comprehensive bias prevention and diverse hiring practices'
    },
    { 
      name: 'Explainability', 
      score: 1, 
      max: 1, 
      icon: Brain,
      status: 'excellent',
      description: 'Open-source tools and interpretability frameworks'
    },
    { 
      name: 'Human Oversight', 
      score: 1, 
      max: 1, 
      icon: Users,
      status: 'excellent',
      description: 'Clear human validation requirements for AI decisions'
    },
    { 
      name: 'Privacy & Security', 
      score: 1, 
      max: 1, 
      icon: Shield,
      status: 'excellent',
      description: 'Strong encryption and access controls'
    },
    { 
      name: 'Governance', 
      score: 1, 
      max: 1, 
      icon: Building,
      status: 'excellent',
      description: 'NIST-aligned risk management practices'
    },
    { 
      name: 'Public Commitments', 
      score: 1, 
      max: 1, 
      icon: Award,
      status: 'excellent',
      description: 'Strong public partnerships and voluntary standards'
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent': return CheckCircle;
      case 'good': return CheckCircle;
      case 'fair': return AlertCircle;
      case 'poor': return XCircle;
      default: return AlertCircle;
    }
  };

  const getGradeFromScore = (score, max) => {
    const percentage = (score / max) * 100;
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C+';
    if (percentage >= 40) return 'C';
    return 'D';
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

  const PillarCard = ({ name, score, max, icon: Icon, status, description }) => {
    const StatusIcon = getStatusIcon(status);
    const percentage = (score / max) * 100;
    
    return (
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Icon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <StatusIcon className={`w-4 h-4 ${getStatusColor(status)}`} />
                <span className={`text-sm font-medium capitalize ${getStatusColor(status)}`}>
                  {status}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-900">{score}</div>
            <div className="text-sm text-gray-500">/{max}</div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900">Loading company data...</h2>
          <p className="text-gray-600 mt-2">Fetching the latest responsible AI scores</p>
        </div>
      </div>
    );
  }

  const overallGrade = getGradeFromScore(companyData.overall_score, companyData.max_score);
  const overallPercentage = (companyData.overall_score / companyData.max_score) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Companies</span>
            </button>
            <div className="text-gray-400">|</div>
            <div className="text-sm text-gray-600">
              Technology > {companyData.name}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Company Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {companyData.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <span className="flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  {companyData.industry}
                </span>
                <span>•</span>
                <span>{companyData.ticker}</span>
                <span>•</span>
                <span>{companyData.is_public ? 'Public' : 'Private'} Company</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {(companyData.employee_count / 1000).toFixed(0)}K employees
                </span>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Compare Companies
              </button>
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                View Sources
              </button>
            </div>
          </div>

          {/* Score Dashboard */}
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Main Score */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 text-center border border-blue-100">
                <div className="mb-4">
                  <div className="text-5xl font-bold text-blue-600 mb-2">{overallGrade}</div>
                  <div className="text-sm text-gray-600">Overall Grade</div>
                </div>
                <div className="mb-4">
                  <StarRating rating={companyData.star_rating} />
                </div>
                <div className="text-sm text-gray-600">
                  {companyData.overall_score}/{companyData.max_score} criteria met
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600">Industry Rank</div>
                    <div className="text-2xl font-bold text-gray-900">
                      #{companyData.industry_rank}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  out of {companyData.total_companies_in_industry} companies
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Target className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600">Percentile</div>
                    <div className="text-2xl font-bold text-gray-900">
                      {companyData.percentile_rank}%
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Better than {companyData.percentile_rank}% of all companies
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-600">Last Updated</div>
                    <div className="text-2xl font-bold text-gray-900">
                      Jun 2025
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  Data confidence: High
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
              {['overview', 'detailed-analysis', 'methodology', 'timeline'].map((tab) => (
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
                    <div className="prose max-w-none">
                      <p className="text-gray-700 leading-relaxed">
                        Microsoft Corporation demonstrates <strong>exceptional responsible AI practices</strong> across all evaluated criteria, 
                        earning a perfect score of 7/7. The company provides comprehensive documentation, open-source tools, 
                        and policy disclosures that align with industry best practices and regulatory expectations.
                      </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6 mt-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          Key Strengths
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>• Comprehensive transparency reporting</li>
                          <li>• Strong bias prevention measures</li>
                          <li>• Open-source interpretability tools</li>
                          <li>• Clear human oversight requirements</li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <Award className="w-5 h-5 text-blue-600" />
                          Industry Position
                        </h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>• #2 in Technology sector</li>
                          <li>• Leader in AI governance</li>
                          <li>• Strong public commitments</li>
                          <li>• NIST framework alignment</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Pillar Breakdown */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Responsible AI Pillars</h2>
                    <div className="grid gap-6">
                      {pillarData.map((pillar, index) => (
                        <PillarCard key={index} {...pillar} />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'detailed-analysis' && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-3 mb-6">
                    <Lock className="w-5 h-5 text-gray-400" />
                    <h2 className="text-2xl font-bold text-gray-900">Detailed Analysis</h2>
                  </div>
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FileText className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Feature</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Get access to detailed source analysis, methodology breakdowns, and expert commentary.
                    </p>
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      Upgrade to Pro
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'methodology' && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Scoring Methodology</h2>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 mb-6">
                      Our evaluation framework assesses companies across seven key pillars of responsible AI, 
                      each scored on a scale of 0-2 based on evidence quality and implementation depth.
                    </p>
                    
                    <div className="grid gap-4">
                      {pillarData.map((pillar, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-2">
                            <pillar.icon className="w-5 h-5 text-blue-600" />
                            <h3 className="font-semibold text-gray-900">{pillar.name}</h3>
                          </div>
                          <p className="text-sm text-gray-600">
                            Evaluates public evidence of policies, implementation, and outcomes in this area.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Company Quick Facts */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Company Details</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Founded:</span>
                    <span className="font-medium">{companyData.founded_year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fortune Rank:</span>
                    <span className="font-medium">#{companyData.fortune_rank}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Market Cap:</span>
                    <span className="font-medium">${(companyData.market_cap_usd / 1e12).toFixed(1)}T</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Employees:</span>
                    <span className="font-medium">{(companyData.employee_count / 1000).toFixed(0)}K</span>
                  </div>
                </div>
              </div>

              {/* Industry Comparison */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4">Industry Comparison</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Industry Average</span>
                    <span className="font-medium">B-</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '95%' }} />
                  </div>
                  <div className="text-xs text-gray-500 text-center">
                    You're in the top 5% of Technology companies
                  </div>
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