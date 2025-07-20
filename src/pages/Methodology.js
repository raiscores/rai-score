import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Eye, Scale, Lightbulb, Users, Shield, Building, CheckCircle,
         Target, Globe, AlertCircle, XCircle, TrendingUp, Calendar,
         FileText, Brain, ArrowRight, Search, BarChart3 } from 'lucide-react';
		 

function Methodology() {
  const pillars = [
    {
      id: 'transparency',
      title: 'Transparency',
      icon: Eye,
      color: '#2563eb',
      description: 'Public disclosure of AI systems, decision-making processes, and algorithmic approaches. Includes model cards, system documentation, and operational transparency.'
    },
    {
      id: 'fairness',
      title: 'Fairness & Bias Mitigation',
      icon: Scale,
      color: '#0ea5e9',
      description: 'Systematic approaches to identify, measure, and mitigate bias in AI systems. Includes bias testing, fairness metrics, and corrective measures.'
    },
    {
      id: 'explainability',
      title: 'Explainability',
      icon: Lightbulb,
      color: '#f59e0b',
      description: 'Ability to explain AI decision-making processes in understandable terms. Includes interpretability tools, explanation interfaces, and decision rationale.'
    },
    {
      id: 'oversight',
      title: 'Human Oversight & Accountability',
      icon: Users,
      color: '#10b981',
      description: 'Human-in-the-loop systems, accountability structures, and oversight mechanisms. Includes governance frameworks and responsible deployment practices.'
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: Shield,
      color: '#8b5cf6',
      description: 'Data protection, user privacy, and security measures. Includes privacy-by-design principles, data minimization, and security protocols.'
    },
    {
      id: 'governance',
      title: 'Governance & Internal Accountability',
      icon: Building,
      color: '#6b7280',
      description: 'Internal governance structures, ethics committees, and accountability mechanisms. Includes policies, training, and compliance frameworks.'
    },
    {
      id: 'commitments',
      title: 'Public Commitments & External Audits',
      icon: CheckCircle,
      color: '#ef4444',
      description: 'Public commitments to responsible AI and third-party validation. Includes certifications, audits, and external accountability measures.'
    }
  ];

  const scoringTiers = [
    {
      score: '10/10',
      title: 'Full Implementation',
      color: '#10b981',
      bgColor: '#f0fdf4',
      description: 'Comprehensive evidence with detailed policies, specific examples, measurable outcomes, and regular reporting.'
    },
    {
      score: '5/10',
      title: 'Partial Implementation',
      color: '#f59e0b',
      bgColor: '#fffbeb',
      description: 'General statements and commitments with limited evidence or implementation details.'
    },
    {
      score: '0/10',
      title: 'No Evidence',
      color: '#ef4444',
      bgColor: '#fef2f2',
      description: 'No public information, documentation, or evidence of practices in this area.'
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans">
	
	 {/* Page Title */}
		<Helmet>
		  <title>RAI Scores: Methodology</title>
		</Helmet>
		
      {/* Hero Section */}
      <div id="hero" className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-32 w-24 h-24 bg-purple-500 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-32 left-1/3 w-40 h-40 bg-amber-500 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-28">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Responsible AI <span className="text-blue-400">Methodology</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto mb-8 leading-relaxed">
              Our evidence-based framework evaluates AI companies across seven critical pillars of responsible AI practices, using publicly available information to create transparent, standardized assessments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/companies" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
                View Company Scores <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="px-8 py-4 border border-slate-400 hover:bg-slate-800 rounded-lg font-semibold transition-colors">
                Download Methodology
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Framework Overview */}
      <div id="framework" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              7-Pillar Evaluation Framework
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Our comprehensive assessment framework evaluates AI companies across seven interconnected pillars of responsible AI, providing a holistic view of their practices and commitments.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Evidence-Based</h3>
              <p className="text-slate-600">Grounded in publicly available documentation and verifiable information</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Transparent</h3>
              <p className="text-slate-600">Open methodology with clear criteria and scoring rationale</p>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-sm">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Standardized</h3>
              <p className="text-slate-600">Consistent evaluation criteria applied across all companies</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scoring System */}
      <div id="scoring" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Three-Tier Scoring System
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Each pillar is evaluated on a 10-point scale based on the depth and quality of evidence found in public documentation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {scoringTiers.map((tier, index) => (
              <div key={index} className="relative">
                <div className="p-8 rounded-xl border-2 border-slate-200 bg-white hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold" style={{ color: tier.color }}>
                      {tier.score}
                    </span>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: tier.bgColor }}>
                      {index === 0 && <CheckCircle className="w-6 h-6" style={{ color: tier.color }} />}
                      {index === 1 && <AlertCircle className="w-6 h-6" style={{ color: tier.color }} />}
                      {index === 2 && <XCircle className="w-6 h-6" style={{ color: tier.color }} />}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{tier.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{tier.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 rounded-xl p-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <BarChart3 className="w-8 h-8 text-blue-600 mr-3" />
              <span className="text-2xl font-bold text-slate-900">Overall Score Calculation</span>
            </div>
            <p className="text-lg text-slate-600 mb-4">
              Total score is the sum of all seven pillar scores
            </p>
            <div className="inline-block bg-blue-100 text-blue-800 px-6 py-3 rounded-lg font-semibold">
              Maximum Score: 70 points (10 points × 7 pillars)
            </div>
          </div>
        </div>
      </div>

      {/* Seven Pillars of Responsible AI */}
      <div id="pillars" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Seven Pillars of Responsible AI
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Our framework evaluates companies across these critical areas, each representing a fundamental aspect of responsible AI development and deployment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.id}
                  className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center mb-6">
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center mr-4"
                      style={{ backgroundColor: `${pillar.color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: pillar.color }} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{pillar.title}</h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Research Methodology */}
      <div id="research" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Research Methodology
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Our evaluation process combines systematic data collection with AI-powered analysis and human oversight to ensure accuracy and consistency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Information Sources</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Globe className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Company Websites</h4>
                    <p className="text-slate-600">Official documentation, policies, and public statements</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">ESG Reports</h4>
                    <p className="text-slate-600">Environmental, social, and governance disclosures</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Building className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Regulatory Filings</h4>
                    <p className="text-slate-600">SEC filings, compliance documents, and regulatory submissions</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Brain className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Technical Publications</h4>
                    <p className="text-slate-600">Research papers, technical reports, and academic publications</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Evaluation Process</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Source Collection</h4>
                    <p className="text-slate-600">Systematic gathering of publicly available documentation</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">AI-Powered Analysis</h4>
                    <p className="text-slate-600">AI-powered analysis against standardized pillar criteria</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Scoring & Validation</h4>
                    <p className="text-slate-600">Standardized scoring with human oversight and validation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Limitations */}
      <div id="limitations" className="py-20 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Limitations & Transparency
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              We believe in full transparency about our methodology's current limitations and our plans for continuous improvement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <AlertCircle className="w-6 h-6 text-amber-500 mr-3" />
                Current Limitations
              </h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Based solely on publicly available information</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Binary scoring system (0, 5, or 10 points)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>May not capture internal practices or real-world implementation</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Point-in-time assessment based on available documentation</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <TrendingUp className="w-6 h-6 text-green-500 mr-3" />
                Planned Enhancements
              </h3>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Integration of third-party audit results</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>More granular scoring system</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Real-time updates and continuous monitoring</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Industry-specific evaluation criteria</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-xl p-8 shadow-sm text-center">
            <div className="flex items-center justify-center mb-4">
              <Calendar className="w-8 h-8 text-blue-600 mr-3" />
              <span className="text-2xl font-bold text-slate-900">Update Schedule</span>
            </div>
            <p className="text-lg text-slate-600 mb-4">
              Scores are updated quarterly, with methodology revisions published annually
            </p>
            <p className="text-slate-500">
              Current methodology version: 1.0 | Last updated: January 2025
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div id="cta" className="py-20 bg-gradient-to-r from-blue-900 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Explore Company Assessments
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            See how leading AI companies measure up against our responsible AI framework. Compare scores, track progress, and make informed decisions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
                to="/companies" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2">
              <Search className="w-5 h-5" />
              Browse Company Scores
            </Link>
            <Link to="/contact" className="px-8 py-4 border border-blue-400 hover:bg-blue-800 rounded-lg font-semibold transition-colors">
              Request Company Assessment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Methodology;
