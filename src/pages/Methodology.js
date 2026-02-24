import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Eye, Scale, Users, Shield, Building, CheckCircle,
         Target, Globe, AlertCircle, XCircle, TrendingUp, Calendar,
         FileText, Brain, Award, ArrowRight, Search, BarChart3 } from 'lucide-react';


function Methodology() {
  const pillars = [
    {
      id: 'transparency',
      title: 'Transparency',
      icon: Eye,
      color: '#2563eb',
      description: 'Public disclosure of AI systems, capabilities, limitations, and decision-making processes. Includes model cards, system documentation, and algorithmic transparency reports.'
    },
    {
      id: 'fairness',
      title: 'Fairness & Bias Mitigation',
      icon: Scale,
      color: '#0ea5e9',
      description: 'Systematic approaches to identify, measure, and mitigate bias in AI systems. Includes bias audits, fairness metrics, diverse testing practices, and corrective measures.'
    },
    {
      id: 'explainability',
      title: 'Explainability',
      icon: Brain,
      color: '#f59e0b',
      description: 'Ability to explain AI decision-making processes in understandable terms. Includes interpretability tools, explanation interfaces, and decision rationale documentation.'
    },
    {
      id: 'oversight',
      title: 'Human Oversight & Accountability',
      icon: Users,
      color: '#10b981',
      description: 'Human-in-the-loop systems, accountability structures, and oversight mechanisms for AI deployment. Includes governance bodies, escalation procedures, and responsible deployment practices.'
    },
    {
      id: 'privacy',
      title: 'Privacy & Data Protection',
      icon: Shield,
      color: '#8b5cf6',
      description: 'Data protection practices, user privacy controls, and privacy-by-design principles. Includes data minimization, consent mechanisms, and privacy impact assessments.'
    },
    {
      id: 'governance',
      title: 'Governance & Internal Controls',
      icon: Building,
      color: '#6b7280',
      description: 'Internal governance structures, ethics committees, risk management, and compliance frameworks for AI. Includes policies, training, audit processes, and accountability mechanisms.'
    },
    {
      id: 'external_accountability',
      title: 'Public Commitments & External Audits',
      icon: Award,
      color: '#ef4444',
      description: 'Public commitments to responsible AI principles and third-party validation. Includes certifications, external audits, industry partnerships, and regulatory engagement.'
    }
  ];

  const scoringTiers = [
    {
      score: '2/2',
      title: 'Operational Evidence',
      color: '#10b981',
      bgColor: '#f0fdf4',
      description: 'Concrete, observable accountability mechanisms. Processes that run, controls executed, named bodies with authority and cadence.'
    },
    {
      score: '1/2',
      title: 'Policy Evidence',
      color: '#f59e0b',
      bgColor: '#fffbeb',
      description: 'Formal documentation describing intent, structure, or expectations. Policies, principles, governance frameworks without operational execution described.'
    },
    {
      score: '0/2',
      title: 'No Evidence',
      color: '#ef4444',
      bgColor: '#fef2f2',
      description: 'No public evidence found, or only narrative and aspirational content such as values statements or marketing language.'
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
              Our evidence-type scoring framework evaluates AI companies across seven critical pillars of responsible AI, classifying public evidence as Operational, Policy, or Narrative to produce deterministic, reproducible assessments.
            </p>
            <Link
              to="/companies" className="inline-flex px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors items-center justify-center gap-2">
              View Company Scores <ArrowRight className="w-5 h-5" />
            </Link>
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
              Our framework evaluates AI companies across seven interconnected pillars of responsible AI, providing a holistic view of their practices and commitments.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
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
              <h3 className="text-xl font-bold text-slate-900 mb-2">Deterministic</h3>
              <p className="text-slate-600">Reproducible scores computed from evidence classifications, not subjective judgment</p>
            </div>
          </div>

          {/* Key Principle */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
            <p className="text-blue-900 font-medium text-lg">
              AI extracts verbatim evidence from public sources. All scoring is deterministic — no AI judgment, no subjectivity. If evidence is not publicly documented and verifiable, it does not exist for scoring purposes.
            </p>
          </div>
        </div>
      </div>

      {/* Scoring System */}
      <div id="scoring" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Evidence-Type Scoring System
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Each pillar is scored 0–2 based on the strongest type of public evidence found, distinguishing between operational implementation and stated policy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {scoringTiers.map((tier, index) => (
              <div key={index} className="relative">
                <div className="h-full p-8 rounded-xl border-2 border-slate-200 bg-white hover:shadow-lg transition-shadow">
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

          {/* Overall Score Calculation */}
          <div className="bg-slate-50 rounded-xl p-8 text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <BarChart3 className="w-8 h-8 text-blue-600 mr-3" />
              <span className="text-2xl font-bold text-slate-900">Overall Score Calculation</span>
            </div>
            <p className="text-lg text-slate-600 mb-4">
              Total score is the sum of all seven pillar scores
            </p>
            <div className="inline-block bg-blue-100 text-blue-800 px-6 py-3 rounded-lg font-semibold">
              Maximum Score: 14 points (2 points × 7 pillars)
            </div>
          </div>

          {/* Star Ratings & Letter Grades */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-slate-900 mb-4">Star Ratings</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-white rounded-lg px-4 py-2">
                  <span className="text-amber-600 font-medium">★★★★★</span>
                  <span className="text-slate-600 text-sm">13–14 points</span>
                </div>
                <div className="flex items-center justify-between bg-white rounded-lg px-4 py-2">
                  <span className="text-amber-600 font-medium">★★★★</span>
                  <span className="text-slate-600 text-sm">10–12 points</span>
                </div>
                <div className="flex items-center justify-between bg-white rounded-lg px-4 py-2">
                  <span className="text-amber-600 font-medium">★★★</span>
                  <span className="text-slate-600 text-sm">7–9 points</span>
                </div>
                <div className="flex items-center justify-between bg-white rounded-lg px-4 py-2">
                  <span className="text-amber-600 font-medium">★★</span>
                  <span className="text-slate-600 text-sm">4–6 points</span>
                </div>
                <div className="flex items-center justify-between bg-white rounded-lg px-4 py-2">
                  <span className="text-amber-600 font-medium">★</span>
                  <span className="text-slate-600 text-sm">0–3 points</span>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-slate-900 mb-4">Letter Grades</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between bg-white rounded-lg px-4 py-2">
                  <span className="text-emerald-700 font-semibold">A-range</span>
                  <span className="text-slate-600 text-sm">12–14 points (≥85%)</span>
                </div>
                <div className="flex items-center justify-between bg-white rounded-lg px-4 py-2">
                  <span className="text-blue-700 font-semibold">B-range</span>
                  <span className="text-slate-600 text-sm">9–11 points (64–79%)</span>
                </div>
                <div className="flex items-center justify-between bg-white rounded-lg px-4 py-2">
                  <span className="text-amber-700 font-semibold">C-range</span>
                  <span className="text-slate-600 text-sm">7–8 points (50–57%)</span>
                </div>
                <div className="flex items-center justify-between bg-white rounded-lg px-4 py-2">
                  <span className="text-red-700 font-semibold">D</span>
                  <span className="text-slate-600 text-sm">0–6 points (&lt;50%)</span>
                </div>
              </div>
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

      {/* Source Tiers & Evaluation Process */}
      <div id="research" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Source Tiers & Evaluation Process
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Evidence is gathered from public sources, validated by tier, and scored deterministically against each pillar's criteria.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Source Tiers</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Globe className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Company-Owned</h4>
                    <p className="text-slate-600">Company's own websites, documentation, and publications — full credit up to Operational (2/2)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Authority</h4>
                    <p className="text-slate-600">Government, regulatory, and enforcement bodies — full credit up to Operational (2/2)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Third-Party</h4>
                    <p className="text-slate-600">News, research, and third-party publications — capped at Policy (1/2), cannot achieve Operational score</p>
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
                    <h4 className="font-semibold text-slate-900">Source Collection & Validation</h4>
                    <p className="text-slate-600">Public documentation gathered and validated across company-owned, regulatory, and third-party sources</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Evidence Extraction & Classification</h4>
                    <p className="text-slate-600">Evidence identified and classified by type (Operational, Policy, Narrative) against pillar criteria</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Scoring & Assessment</h4>
                    <p className="text-slate-600">Scores computed from evidence classifications, with source tier weighting applied</p>
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
                  <span>Three-tier evidence classification may not capture nuanced gradations within each level</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Cannot assess actual implementation versus stated policies</span>
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
                  <span>Sub-pillar scoring for more granular assessment within each pillar</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Continuous monitoring and real-time updates</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Industry-specific evaluation criteria and benchmarks</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Integration with third-party audit reports</span>
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
              Current methodology version: 1.0 | Last updated: February 2026
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
