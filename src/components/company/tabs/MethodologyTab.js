// /src/components/company/tabs/MethodologyTab.js
import React from 'react';
import {
  Scale,
  Eye,
  Brain,
  Users,
  Shield,
  Building,
  Award,
  CheckCircle,
  AlertCircle,
  XCircle,
  Globe,
  Target,
  TrendingUp,
  Calendar,
  FileText
} from 'lucide-react';

/**
 * MethodologyTab component displays the detailed assessment methodology
 *
 * This is a mostly static component that explains how RAI Scores evaluates companies.
 * It includes the assessment framework, scoring system, source tiers, seven pillars details,
 * limitations, and methodology transparency information.
 */
const MethodologyTab = () => {
  return (
    <div className="space-y-8">
      {/* Methodology Hero */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 border border-indigo-100">
        <div className="max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Scale className="w-8 h-8 text-indigo-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Responsible AI Assessment Methodology
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Our evidence-type scoring framework evaluates companies across seven critical pillars of responsible AI,
            classifying public evidence as Operational, Policy, or Narrative to produce deterministic, reproducible assessments.
          </p>
          <div className="flex items-center justify-center gap-6 text-sm text-indigo-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Evidence-Based</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <span>Publicly Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              <span>Deterministic Scoring</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Principle */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
        <p className="text-blue-900 font-medium">
          AI extracts verbatim evidence from public sources. All scoring is deterministic — no AI judgment, no subjectivity. If evidence is not publicly documented and verifiable, it does not exist for scoring purposes.
        </p>
      </div>

      {/* Assessment Framework */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Assessment Framework</h3>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Source Tiers</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900">Company-Owned</div>
                  <div className="text-sm text-gray-600">Company's own websites and documentation — full credit up to Operational (2/2)</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900">Authority</div>
                  <div className="text-sm text-gray-600">Government, regulatory, and enforcement bodies — full credit up to Operational (2/2)</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900">Third-Party</div>
                  <div className="text-sm text-gray-600">News, research, and third-party publications — capped at Policy (1/2), cannot achieve Operational score</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Evaluation Process</h4>
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">1</div>
                  <div className="font-medium text-gray-900">Source Collection & Validation</div>
                </div>
                <div className="text-sm text-gray-600">Public documentation gathered and validated across company-owned, regulatory, and third-party sources</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">2</div>
                  <div className="font-medium text-gray-900">Evidence Extraction & Classification</div>
                </div>
                <div className="text-sm text-gray-600">Evidence identified and classified by type (Operational, Policy, Narrative) against pillar criteria</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">3</div>
                  <div className="font-medium text-gray-900">Scoring & Assessment</div>
                </div>
                <div className="text-sm text-gray-600">Scores computed from evidence classifications, with source tier weighting applied</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scoring System */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Scoring System</h3>

        <div className="mb-8">
          <p className="text-gray-700 mb-6">
            Each pillar is scored 0–2 based on the strongest type of public evidence found,
            distinguishing between operational implementation and stated policy.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Operational Evidence */}
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-xl font-bold text-green-700">2/2</div>
                  <div className="text-sm text-green-600">Operational Evidence</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-green-800">Observable Implementation</div>
                <div className="text-sm text-green-700">
                  Concrete accountability mechanisms — processes that run, controls executed, named bodies with authority and cadence.
                </div>
              </div>
            </div>

            {/* Policy Evidence */}
            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <div className="text-xl font-bold text-yellow-700">1/2</div>
                  <div className="text-sm text-yellow-600">Policy Evidence</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-yellow-800">Formal Documentation</div>
                <div className="text-sm text-yellow-700">
                  Documentation describing intent, structure, or expectations — policies, principles, governance frameworks without operational execution.
                </div>
              </div>
            </div>

            {/* No Evidence */}
            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <div className="text-xl font-bold text-red-700">0/2</div>
                  <div className="text-sm text-red-600">No Evidence</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-red-800">No Public Evidence</div>
                <div className="text-sm text-red-700">
                  No public evidence found, or only narrative and aspirational content such as values statements or marketing language.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Score Calculation */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Overall Score Calculation</h4>
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-700">
              <div className="font-medium">Total Score = Sum of all pillar scores</div>
              <div className="text-sm text-gray-600">Maximum possible score: 14 points (7 pillars × 2 points)</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">14</div>
              <div className="text-sm text-gray-600">Max Score</div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white rounded p-3 text-center">
              <div className="font-semibold text-emerald-700">A-range</div>
              <div className="text-gray-600">12–14 points</div>
            </div>
            <div className="bg-white rounded p-3 text-center">
              <div className="font-semibold text-blue-700">B-range</div>
              <div className="text-gray-600">9–11 points</div>
            </div>
            <div className="bg-white rounded p-3 text-center">
              <div className="font-semibold text-amber-700">C-range</div>
              <div className="text-gray-600">7–8 points</div>
            </div>
            <div className="bg-white rounded p-3 text-center">
              <div className="font-semibold text-red-700">D</div>
              <div className="text-gray-600">0–6 points</div>
            </div>
          </div>
        </div>

        {/* Star Ratings */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Star Ratings</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 text-sm">
            <div className="bg-white rounded p-3 text-center">
              <div className="text-amber-600 font-medium">★★★★★</div>
              <div className="text-gray-600">13–14 pts</div>
            </div>
            <div className="bg-white rounded p-3 text-center">
              <div className="text-amber-600 font-medium">★★★★</div>
              <div className="text-gray-600">10–12 pts</div>
            </div>
            <div className="bg-white rounded p-3 text-center">
              <div className="text-amber-600 font-medium">★★★</div>
              <div className="text-gray-600">7–9 pts</div>
            </div>
            <div className="bg-white rounded p-3 text-center">
              <div className="text-amber-600 font-medium">★★</div>
              <div className="text-gray-600">4–6 pts</div>
            </div>
            <div className="bg-white rounded p-3 text-center">
              <div className="text-amber-600 font-medium">★</div>
              <div className="text-gray-600">0–3 pts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Seven Pillars */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Seven Pillars of Responsible AI</h3>

        <div className="space-y-6">
          {[
            {
              name: "Transparency",
              icon: Eye,
              description: "Public disclosure of AI systems, capabilities, limitations, and decision-making processes",
              criteria: ["Transparency reports", "Model cards", "Algorithmic impact disclosures", "System documentation"]
            },
            {
              name: "Fairness & Bias Mitigation",
              icon: Scale,
              description: "Systematic approaches to identify, measure, and mitigate bias in AI systems across all stages",
              criteria: ["Bias audits", "Fairness metrics", "Diverse testing data", "Remediation processes"]
            },
            {
              name: "Explainability",
              icon: Brain,
              description: "Ability to provide clear, understandable explanations for AI decisions and recommendations",
              criteria: ["Interpretability tools", "User-facing explanations", "Decision rationale", "Model documentation"]
            },
            {
              name: "Human Oversight & Accountability",
              icon: Users,
              description: "Meaningful human control over AI systems with clear accountability structures",
              criteria: ["Named oversight bodies", "Human-in-the-loop processes", "Review cadence", "Escalation procedures"]
            },
            {
              name: "Privacy & Data Protection",
              icon: Shield,
              description: "Data protection practices, user privacy controls, and privacy-by-design principles throughout the AI lifecycle",
              criteria: ["Privacy impact assessments", "Data minimization", "Consent mechanisms", "Data protection controls"]
            },
            {
              name: "Governance & Internal Controls",
              icon: Building,
              description: "Internal governance structures, ethics committees, risk management, and compliance frameworks for AI",
              criteria: ["AI ethics committees", "Risk assessment frameworks", "Compliance programs", "Internal audit processes"]
            },
            {
              name: "Public Commitments & External Audits",
              icon: Award,
              description: "Public commitments to responsible AI principles and engagement with external validation",
              criteria: ["Third-party audits", "Public commitments", "Industry coalitions", "External review boards"]
            }
          ].map((pillar, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                  <pillar.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{pillar.name}</h4>
                  <p className="text-gray-700 mb-4">{pillar.description}</p>
                  <div className="space-y-2">
                    <div className="font-medium text-gray-900 text-sm">Key Evaluation Criteria:</div>
                    <div className="flex flex-wrap gap-2">
                      {pillar.criteria.map((criterion, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                          {criterion}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Limitations & Future Enhancements */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Methodology Limitations & Future Enhancements</h3>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              Current Limitations
            </h4>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                <div>Relies solely on publicly available information</div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                <div>Cannot assess actual implementation versus stated policies</div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                <div>Limited to documentation quality and availability</div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                <div>Three-tier evidence classification may not capture nuanced gradations within each level</div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Planned Enhancements
            </h4>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <div>Sub-pillar scoring for more granular assessment within each pillar</div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <div>Continuous monitoring and real-time updates</div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <div>Industry-specific evaluation criteria and benchmarks</div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <div>Integration with third-party audit reports</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Methodology Update Schedule */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold mb-4">Methodology Transparency & Updates</h3>
          <p className="text-blue-100 mb-6">
            We believe in transparent, evidence-based evaluation. Our methodology is continuously refined
            based on industry best practices, regulatory developments, and stakeholder feedback.
          </p>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <Calendar className="w-6 h-6 mx-auto mb-2" />
              <div className="font-semibold">Quarterly Reviews</div>
              <div className="text-blue-100">Score updates</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <FileText className="w-6 h-6 mx-auto mb-2" />
              <div className="font-semibold">Version 1.0</div>
              <div className="text-blue-100">February 2026</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <Target className="w-6 h-6 mx-auto mb-2" />
              <div className="font-semibold">Deterministic</div>
              <div className="text-blue-100">Reproducible scoring</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MethodologyTab;
