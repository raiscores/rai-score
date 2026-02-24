import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import StarRating from '../components/StarRating';
import ShareButton from '../components/ShareButton';
import StrengthsGapsChips from '../components/company/StrengthsGapsChips';

import { useCompanyData } from '../hooks/useCompanyData';
import {
  useIndustryComparisons,
  getIndustryDataForCompany,
  getCompanyDetailsFromRankings,
} from '../hooks/useIndustryComparisons';

import OverviewTab from '../components/company/tabs/OverviewTab';
import MethodologyTab from '../components/company/tabs/MethodologyTab';
import SourcesTab from '../components/company/tabs/SourcesTab';

import {
  getGradeColor,
  getGradeBg,
} from '../utils/colorMapping';

import {
  Shield,
  Eye,
  Scale,
  Building,
  Users,
  Brain,
  ArrowLeft,
  Award,
  MapPin,
  BookOpen,
  Clock,
  AlertCircle,
  BarChart3,
} from 'lucide-react';

function CompanyPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const { slug } = useParams();

  const { companyData, loading, error } = useCompanyData(slug);
  const { industryComparisons } = useIndustryComparisons();

  const industryData = getIndustryDataForCompany(companyData, industryComparisons);
  const companyDetails = getCompanyDetailsFromRankings(companyData, industryComparisons);

  // Loading state
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

  // Error state
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

  // --- Derived values ---
  const totalScore = companyData.total_score ?? 0;
  const maxScore = companyData.max_possible_score ?? 14;

  const PILLAR_ICONS = {
    transparency: Eye,
    fairness: Scale,
    explainability: Brain,
    oversight: Users,
    privacy: Shield,
    governance: Building,
    external_accountability: Award,
  };

  const getGradeFromScore = (score, max) => {
    const pct = (score / max) * 100;
    if (pct >= 90) return 'A+';
    if (pct >= 85) return 'A';
    if (pct >= 80) return 'A-';
    if (pct >= 75) return 'B+';
    if (pct >= 70) return 'B';
    if (pct >= 65) return 'B-';
    if (pct >= 60) return 'C+';
    if (pct >= 55) return 'C';
    if (pct >= 50) return 'C-';
    return 'D';
  };

  const formatMarketCap = (value) => {
    if (!value) return 'N/A';
    if (value >= 1e12) return `$${(value / 1e12).toFixed(1)}T`;
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
    return `$${value}`;
  };

  const formatEmployeeCount = (count) => {
    if (!count) return 'N/A';
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
    return count.toString();
  };

  const formatWebsiteUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return `https://${url}`;
  };

  const overallGrade = getGradeFromScore(totalScore, maxScore);
  const gradeColor = getGradeColor(overallGrade);
  const gradeBg = getGradeBg(overallGrade);

  const overallFindings = companyData.overall_findings || '';

  // Trust metadata — year only for now
  const publishedYear = companyData.published_at
    ? new Date(companyData.published_at).getFullYear()
    : null;
  const sourcesUsed = companyData.total_sources_used;
  const evidenceItems = companyData.total_evidence_items;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SEO Meta Tags */}
      <Helmet>
        <title>
          {companyData
            ? `${companyData.name} RAI Score: ${overallGrade} Grade | RAI Scores`
            : 'RAI Scores: Company'}
        </title>
        <meta
          name="description"
          content={
            overallFindings
              ? `${companyData.name} earned a ${overallGrade} grade for Responsible AI practices. ${overallFindings.substring(0, 120)}...`
              : companyData?.summary
              ? `${companyData.name} RAI Assessment: ${companyData.summary.substring(0, 120)}...`
              : `${companyData.name}: Independent Responsible AI evaluation and scoring.`
          }
        />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="RAI Scores" />
        <meta
          property="og:title"
          content={`${companyData?.name || 'Company'} RAI Score: ${overallGrade} Grade`}
        />
        <meta
          property="og:description"
          content={
            overallFindings
              ? `${companyData.name} demonstrates ${
                  overallGrade === 'A+'
                    ? 'exceptional'
                    : overallGrade.startsWith('A')
                    ? 'strong'
                    : 'developing'
                } Responsible AI practices across our 7-pillar framework. ${overallFindings.substring(0, 100)}...`
              : `Independent assessment of ${companyData?.name || "this company"}'s Responsible AI practices. Grade: ${overallGrade}`
          }
        />
        <meta
          property="og:url"
          content={`https://raiscores.com/company/${companyData?.slug || ''}`}
        />
        <meta property="og:image" content="https://raiscores.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content={`${companyData?.name || 'Company'} RAI Score: ${overallGrade} Grade`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@raiscores" />
        <meta name="twitter:creator" content="@raiscores" />
        <meta
          name="twitter:title"
          content={`${companyData?.name || 'Company'} RAI Score: ${overallGrade}`}
        />
        <meta
          name="twitter:description"
          content={
            companyData?.name
              ? `${companyData.name} earned a ${overallGrade} grade for Responsible AI practices. Independent evaluation across 7 key pillars.`
              : 'Independent Responsible AI evaluation and scoring'
          }
        />
        <meta name="twitter:image" content="https://raiscores.com/og-image.png" />
        <meta property="og:locale" content="en_US" />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href={`https://raiscores.com/company/${companyData?.slug || ''}`}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': ['Organization', 'Article'],
            name: companyData?.name || '',
            url: companyData?.website || '',
            sameAs: companyData?.website || '',
            description: companyData?.summary || '',
            foundingDate: companyData?.founded_year || '',
            numberOfEmployees: companyData?.employee_count || '',
            industry: companyData?.industry || '',
            marketCapitalization: companyData?.market_cap_usd || '',
            headline: `${companyData?.name || ''} RAI Score: ${overallGrade} Grade`,
            about: {
              '@type': 'Thing',
              name: 'Responsible AI Assessment',
              description:
                'Independent evaluation of AI ethics and governance practices',
            },
            publisher: {
              '@type': 'Organization',
              name: 'RAI Scores',
              url: 'https://raiscores.com',
              logo: {
                '@type': 'ImageObject',
                url: 'https://raiscores.com/logo.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://raiscores.com/company/${companyData?.slug || ''}`,
            },
            image: 'https://raiscores.com/og-image.png',
            datePublished: companyData?.published_at || '',
            dateModified: companyData?.published_at || '',
            aggregateRating: companyData?.star_rating
              ? {
                  '@type': 'AggregateRating',
                  ratingValue: companyData.star_rating,
                  bestRating: '5',
                  worstRating: '1',
                  ratingCount:
                    companyData?.total_sources_used > 0
                      ? companyData.total_sources_used
                      : 1,
                  description: `${companyData.name} Responsible AI Score: ${overallGrade} grade based on 7 assessment pillars`,
                }
              : undefined,
          })}
        </script>
      </Helmet>

      {/* Sticky nav breadcrumb */}
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
            <ShareButton
              url={`https://www.raiscores.com/company/${companyData?.slug || ''}`}
              title={`RAI Scores: ${companyData?.name || ''}`}
              description={
                overallFindings ||
                companyData?.summary ||
                `${companyData?.name}: Responsible AI assessment`
              }
              companyName={companyData?.name}
              companyGrade={overallGrade}
            />
          </div>
        </div>
      </nav>

      {/* ========== HERO SECTION ========== */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Company identity + narrative */}
            <div className="flex-1 min-w-0 order-2 lg:order-1">
              {/* Company name & meta line */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {companyData.name}
              </h1>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-6">
                <span className="flex items-center gap-1">
                  <Building className="w-4 h-4" />
                  {companyData.industry}
                </span>
                {companyData.ticker && (
                  <>
                    <span className="text-gray-300">|</span>
                    <span className="font-medium text-gray-600">{companyData.ticker}</span>
                  </>
                )}
                {companyData.fortune_rank && (
                  <>
                    <span className="text-gray-300">|</span>
                    <span>Fortune #{companyData.fortune_rank}</span>
                  </>
                )}
                {companyData.website && (
                  <>
                    <span className="text-gray-300">|</span>
                    <a
                      href={formatWebsiteUrl(companyData.website)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {companyData.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </a>
                  </>
                )}
              </div>

              {/* Strengths & Gaps chips */}
              <StrengthsGapsChips
                strengths={companyData.key_strengths}
                gaps={companyData.key_gaps}
              />

              {/* Overall findings narrative */}
              {overallFindings && (
                <div className="mt-5">
                  <p className="text-gray-700 leading-relaxed text-sm">
                    {overallFindings}
                  </p>
                </div>
              )}

            </div>

            {/* Right: Grade card — shows first on mobile */}
            <div className="lg:w-56 flex-shrink-0 order-1 lg:order-2">
              <div
                className={`rounded-2xl p-6 text-center border ${gradeBg.gradient} ${gradeBg.border}`}
              >
                <div className={`text-6xl font-bold mb-2 ${gradeColor}`}>
                  {overallGrade}
                </div>
                <div className="flex justify-center mb-4">
                  <StarRating rating={companyData.star_rating ?? 0} />
                </div>
                <div className="text-sm text-gray-600 mb-3">
                  {totalScore}/{maxScore} total score
                </div>
                <div className="w-full bg-white/40 rounded-full h-1.5 mb-4">
                  <div
                    className={`h-1.5 rounded-full ${gradeBg.barColor}`}
                    style={{ width: `${(totalScore / maxScore) * 100}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className={`${gradeBg.pillBg} rounded-lg p-2`}>
                    <div className={`font-semibold ${gradeColor}`}>
                      #{companyDetails?.industry_rank || 'N/A'}
                    </div>
                    <div className="text-xs text-gray-600">Industry Rank</div>
                  </div>
                  <div className={`${gradeBg.pillBg} rounded-lg p-2`}>
                    <div className={`font-semibold ${gradeColor}`}>
                      {companyDetails?.industry_percentile
                        ? `${companyDetails.industry_percentile}%`
                        : 'N/A'}
                    </div>
                    <div className="text-xs text-gray-600">Percentile</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== MAIN CONTENT ========== */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Tab navigation bar */}
          <div className="mb-8">
            <div className="flex overflow-x-auto border-b border-gray-200 scrollbar-hide">
              {['overview', 'sources', 'methodology', 'detailed-analysis', 'compare'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 font-medium capitalize transition-all duration-200 border-b-2 whitespace-nowrap ${
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

          {/* Content grid: main + sidebar */}
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main content (3/4) */}
            <div className="lg:col-span-3">
              {activeTab === 'overview' && (
                <OverviewTab
                  companyData={companyData}
                  PILLAR_ICONS={PILLAR_ICONS}
                  onViewSources={() => setActiveTab('sources')}
                />
              )}

              {activeTab === 'sources' && <SourcesTab companyData={companyData} />}

              {activeTab === 'methodology' && <MethodologyTab />}

              {/* DETAILED ANALYSIS TAB — Coming soon */}
              {activeTab === 'detailed-analysis' && (
                <div className="space-y-8">
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

                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Coming</h3>
                    <div className="grid md:grid-cols-2 gap-6">
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

              {/* COMPARE TAB — Industry comparison table */}
              {activeTab === 'compare' && (
                <div className="space-y-8">
                  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Compare Companies</h2>
                    <p className="text-gray-700 mb-6">
                      See how {companyData.name} stacks up against industry leaders and the broader market.
                    </p>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead>
                          <tr className="bg-gray-100 text-gray-700">
                            <th className="px-4 py-2 text-left font-semibold">Rank</th>
                            <th className="px-4 py-2 text-left font-semibold">Company</th>
                            <th className="px-4 py-2 text-left font-semibold">Grade</th>
                          </tr>
                        </thead>
                        <tbody>
                          {industryData?.industry_leaders?.map((leader, idx) => (
                            <tr key={leader.name} className={leader.name === companyData.name ? 'bg-blue-50' : ''}>
                              <td className="px-4 py-2">{idx + 1}</td>
                              <td className="px-4 py-2 font-semibold">{leader.name}</td>
                              <td className="px-4 py-2">
                                <span className={
                                  leader.rating?.startsWith('A')
                                    ? 'text-green-600 font-medium'
                                    : 'text-blue-600'
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

            {/* Sidebar (1/4) */}
            <div className="space-y-6">
              {/* Assessment Details */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4">Assessment Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Published</span>
                    <span className="text-sm font-medium">{publishedYear || 'N/A'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Sources</span>
                    <span className="text-sm font-medium">{sourcesUsed ?? 'N/A'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Evidence Items</span>
                    <span className="text-sm font-medium text-green-600">
                      {evidenceItems ?? 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Pillars w/ Evidence</span>
                    <span className="text-sm font-medium">
                      {companyData.pillars_with_evidence ?? 'N/A'}/7
                    </span>
                  </div>
                </div>
              </div>

              {/* Industry Rank */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-4">Industry Rank</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Rank</span>
                      <span className="font-medium">
                        #{companyDetails?.industry_rank || 'N/A'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{
                          width: `${companyDetails?.industry_percentile || 0}%`,
                        }}
                      />
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {companyDetails?.industry_percentile
                        ? `Top ${companyDetails.industry_percentile}% of ${industryData?.total_companies || 'N/A'} ${companyData.industry} companies`
                        : `${industryData?.total_companies || 'N/A'} ${companyData.industry} companies evaluated`}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <div className="text-sm text-gray-600 mb-2">Industry Leaders</div>
                    <div className="space-y-1 text-sm">
                      {industryData?.industry_leaders?.map((leader, index) => (
                        <div key={leader.name} className="flex justify-between">
                          <span
                            className={
                              leader.name === companyData.name ? 'font-bold' : ''
                            }
                          >
                            {index + 1}. {leader.name}
                          </span>
                          <span
                            className={
                              leader.rating?.startsWith('A')
                                ? 'text-green-600'
                                : 'text-blue-600'
                            }
                          >
                            {leader.rating}
                          </span>
                        </div>
                      ))}

                      {/* Show current company if not in top 3 */}
                      {!industryData?.industry_leaders?.some(
                        (l) => l.name === companyData.name
                      ) &&
                        companyDetails && (
                          <div className="flex justify-between font-bold mt-2 border-t pt-2">
                            <span>
                              {companyDetails.industry_rank}. {companyDetails.name}
                            </span>
                            <span
                              className={
                                companyDetails.rating?.startsWith('A')
                                  ? 'text-green-600'
                                  : 'text-blue-600'
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

              {/* How We Score */}
              <div className="bg-white rounded-xl p-5 border border-gray-100">
                <h3 className="font-semibold text-gray-900 mb-3">How We Score</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Companies are assessed across 7 pillars of responsible AI using publicly
                  available evidence. Scoring is deterministic — LLMs extract evidence, but all
                  scoring is rule-based.
                </p>
                <Link
                  to="/methodology"
                  className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  <BookOpen className="w-4 h-4" />
                  Full methodology
                </Link>
              </div>

              {/* About Company — collapsible sidebar card */}
              <details className="group bg-white rounded-xl border border-gray-100 overflow-hidden">
                <summary className="font-semibold text-gray-900 p-5 cursor-pointer hover:bg-gray-50 transition-colors list-none flex items-center justify-between">
                  <span>About {companyData.name}</span>
                  <span className="text-gray-400 text-xs transition-transform group-open:rotate-90">▸</span>
                </summary>
                <div className="px-5 pb-5 space-y-4">
                  {companyData.summary && (
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {companyData.summary}
                    </p>
                  )}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {companyData.founded_year && (
                      <div>
                        <div className="text-gray-500 text-xs">Founded</div>
                        <div className="font-medium text-gray-900">{companyData.founded_year}</div>
                      </div>
                    )}
                    {companyData.employee_count && (
                      <div>
                        <div className="text-gray-500 text-xs">Employees</div>
                        <div className="font-medium text-gray-900">{formatEmployeeCount(companyData.employee_count)}</div>
                      </div>
                    )}
                    {companyData.market_cap_usd && (
                      <div>
                        <div className="text-gray-500 text-xs">Market Cap</div>
                        <div className="font-medium text-gray-900">{formatMarketCap(companyData.market_cap_usd)}</div>
                      </div>
                    )}
                    {companyData.headquarters && (
                      <div>
                        <div className="text-gray-500 text-xs">Headquarters</div>
                        <div className="font-medium text-gray-900">{companyData.headquarters.replace(/, United States$/, '')}</div>
                      </div>
                    )}
                  </div>
                  {companyData.website && (
                    <a
                      href={formatWebsiteUrl(companyData.website)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      {companyData.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                    </a>
                  )}
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default CompanyPage;
