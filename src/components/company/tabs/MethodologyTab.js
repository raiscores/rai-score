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
 * It includes the assessment framework, scoring system, seven pillars details,
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
            Our comprehensive framework evaluates companies across seven critical pillars of responsible AI, 
            using publicly available information and standardized scoring criteria.
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
              <span>Standardized Scoring</span>
            </div>
          </div>
        </div>
      </div>

      {/* Assessment Framework */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Assessment Framework</h3>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Research Approach</h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900">Public Documentation Review</div>
                  <div className="text-sm text-gray-600">Analysis of company websites, policies, and public statements</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900">ESG & Sustainability Reports</div>
                  <div className="text-sm text-gray-600">Review of annual reports and sustainability disclosures</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900">Regulatory Filings</div>
                  <div className="text-sm text-gray-600">Analysis of SEC filings and regulatory submissions</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                <div>
                  <div className="font-medium text-gray-900">Technical Publications</div>
                  <div className="text-sm text-gray-600">Research papers, whitepapers, and technical blogs</div>
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
                  <div className="font-medium text-gray-900">Source Collection</div>
                </div>
                <div className="text-sm text-gray-600">Systematic gathering of publicly available documentation</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">2</div>
                  <div className="font-medium text-gray-900">Content Analysis</div>
                </div>
                <div className="text-sm text-gray-600">AI-powered analysis of documents against pillar criteria</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">3</div>
                  <div className="font-medium text-gray-900">Scoring & Validation</div>
                </div>
                <div className="text-sm text-gray-600">Standardized scoring with human oversight and verification</div>
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
            Each pillar is evaluated using a three-tier scoring system based on the depth and quality of 
            publicly available evidence for responsible AI practices.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Full Implementation */}
            <div className="bg-green-50 rounded-xl p-6 border border-green-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <div className="text-xl font-bold text-green-700">10/10</div>
                  <div className="text-sm text-green-600">Full Implementation</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-green-800">Comprehensive Evidence</div>
                <div className="text-sm text-green-700">
                  • Detailed policies and procedures<br/>
                  • Specific implementation examples<br/>
                  • Measurable outcomes and metrics<br/>
                  • Regular public reporting
                </div>
              </div>
            </div>

            {/* Partial Implementation */}
            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <div className="text-xl font-bold text-yellow-700">5/10</div>
                  <div className="text-sm text-yellow-600">Partial Implementation</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-yellow-800">Limited Evidence</div>
                <div className="text-sm text-yellow-700">
                  • General statements or commitments<br/>
                  • High-level policies without detail<br/>
                  • Mentions without implementation<br/>
                  • Inconsistent documentation
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
                  <div className="text-xl font-bold text-red-700">0/10</div>
                  <div className="text-sm text-red-600">No Evidence</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-red-800">No Public Information</div>
                <div className="text-sm text-red-700">
                  • No mention of the pillar<br/>
                  • No relevant documentation<br/>
                  • No public commitments<br/>
                  • No evidence of practices
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Score Calculation */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Overall Score Calculation</h4>
          <div className="flex items-center justify-between mb-4">
            <div className="text-gray-700">
              <div className="font-medium">Total Score = Sum of all pillar scores</div>
              <div className="text-sm text-gray-600">Maximum possible score: 70 points (7 pillars × 10 points)</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">70</div>
              <div className="text-sm text-gray-600">Max Score</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="bg-white rounded p-3 text-center">
              <div className="font-semibold text-green-600">A+ Grade</div>
              <div className="text-gray-600">63-70 points</div>
            </div>
            <div className="bg-white rounded p-3 text-center">
              <div className="font-semibold text-blue-600">A Grade</div>
              <div className="text-gray-600">56-62 points</div>
            </div>
            <div className="bg-white rounded p-3 text-center">
              <div className="font-semibold text-yellow-600">B Grade</div>
              <div className="text-gray-600">42-55 points</div>
            </div>
            <div className="bg-white rounded p-3 text-center">
              <div className="font-semibold text-red-600">C Grade</div>
              <div className="text-gray-600">Below 42 points</div>
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
              description: "Clear communication about AI systems, their capabilities, limitations, and decision-making processes",
              criteria: ["Public AI policies", "System documentation", "Algorithmic transparency", "Impact assessments"]
            },
            {
              name: "Fairness & Bias Mitigation",
              icon: Scale,
              description: "Proactive measures to identify, assess, and mitigate bias in AI systems across all stages",
              criteria: ["Bias testing procedures", "Diverse training data", "Fairness metrics", "Remediation processes"]
            },
            {
              name: "Explainability",
              icon: Brain,
              description: "Ability to provide clear, understandable explanations for AI decisions and recommendations",
              criteria: ["Interpretability frameworks", "Explanation interfaces", "Model documentation", "User education"]
            },
            {
              name: "Human Oversight & Accountability",
              icon: Users,
              description: "Meaningful human control over AI systems with clear accountability structures",
              criteria: ["Human-in-the-loop processes", "Oversight mechanisms", "Accountability frameworks", "Escalation procedures"]
            },
            {
              name: "Privacy & Security",
              icon: Shield,
              description: "Protection of personal data and robust security measures throughout the AI lifecycle",
              criteria: ["Data protection policies", "Privacy-preserving techniques", "Security protocols", "Compliance measures"]
            },
            {
              name: "Governance & Accountability",
              icon: Building,
              description: "Structured governance frameworks and clear accountability for AI development and deployment",
              criteria: ["AI governance boards", "Risk management", "Compliance programs", "Audit processes"]
            },
            {
              name: "Public Commitments & External Audits",
              icon: Award,
              description: "Public commitments to responsible AI practices and engagement with external validation",
              criteria: ["Public commitments", "Third-party audits", "Industry partnerships", "Regulatory compliance"]
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
                <div>Cannot assess actual implementation vs. stated policies</div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                <div>Limited to documentation quality and availability</div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                <div>Binary scoring system may not capture nuanced implementations</div>
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
                <div>Integration with third-party audit reports</div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <div>Continuous monitoring and real-time updates</div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <div>More granular scoring with sub-criteria weighting</div>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                <div>Industry-specific benchmarking and standards</div>
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
              <div className="text-blue-100">Methodology updates</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <Users className="w-6 h-6 mx-auto mb-2" />
              <div className="font-semibold">Expert Panel</div>
              <div className="text-blue-100">Industry validation</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <FileText className="w-6 h-6 mx-auto mb-2" />
              <div className="font-semibold">Version Control</div>
              <div className="text-blue-100">Change documentation</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MethodologyTab;