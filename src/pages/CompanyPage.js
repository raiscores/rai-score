import React, { useEffect, useState } from 'react';
import { Star, TrendingUp, Shield, Eye, Scale, Building, Users, Clock } from 'lucide-react';

function CompanyPage() {
  // Mock slug for demonstration - in real app would come from router
  const slug = 'openai';
  const [companyData, setCompanyData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // Mock company data for demonstration
    const mockCompanyData = {
      name: "OpenAI",
      industry: "Artificial Intelligence",
      public: false,
      score: 73,
      max_score: 100,
      status_label: "Good Practice",
      last_updated: "December 2024"
    };
    
    // Simulate loading delay
    setTimeout(() => {
      setCompanyData(mockCompanyData);
    }, 1000);
  }, []);

  // Mock data for demonstration - would be replaced with actual data
  const mockPillarScores = [
    { name: 'Transparency', score: 78, max: 100, icon: Eye },
    { name: 'Fairness', score: 65, max: 100, icon: Scale },
    { name: 'Safety & Security', score: 82, max: 100, icon: Shield },
    { name: 'Governance', score: 71, max: 100, icon: Building },
    { name: 'Redress', score: 58, max: 100, icon: Users }
  ];

  const CircularScore = ({ score, maxScore, size = 120 }) => {
    const percentage = (score / maxScore) * 100;
    const strokeWidth = 8;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
	
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.1)"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#facc15"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ 
              transition: 'stroke-dashoffset 1s ease-out',
              stroke: 'linear-gradient(135deg, #facc15, #eab308)'
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{score}</div>
            <div className="text-sm" style={{ color: '#cbd5e1' }}>/{maxScore}</div>
          </div>
        </div>
      </div>
    );
  };

  const PillarCard = ({ name, score, max, icon: Icon }) => {
    const percentage = (score / max) * 100;
    
    return (
      <div 
        className="rounded-lg p-4 border transition-all duration-300 hover:shadow-lg"
        style={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          borderColor: 'rgba(255, 255, 255, 0.2)'
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Icon className="w-5 h-5" style={{ color: 'rgba(255, 255, 255, 0.8)' }} />
            <span className="text-white font-medium">{name}</span>
          </div>
          <span className="font-bold" style={{ color: '#facc15' }}>{score}/{max}</span>
        </div>
        <div className="w-full rounded-full h-2" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
          <div 
            className="h-2 rounded-full transition-all duration-1000 ease-out"
            style={{ 
              width: `${percentage}%`,
              background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)'
            }}
          />
        </div>
        <div className="mt-2 text-xs" style={{ color: '#cbd5e1' }}>
          {percentage >= 80 ? 'Excellent' : percentage >= 60 ? 'Good' : 'Needs Improvement'}
        </div>
      </div>
    );
  };

  if (!companyData) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ 
          background: 'linear-gradient(135deg, #1e3a8a, #0f172a)'
        }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderColor: '#3b82f6' }}></div>
          <h2 className="text-white text-xl">Loading company data...</h2>
          <p className="mt-2" style={{ color: '#64748b' }}>Please wait while we fetch the latest scores</p>
        </div>
      </div>
    );
  }

  const overallScore = companyData.score || 73;
  const maxScore = companyData.max_score || 100;
  const percentile = Math.round((overallScore / maxScore) * 100);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f8fafc' }}>
      {/* Hero Section */}
      <section 
        className="py-12 px-4"
        style={{ 
          background: 'linear-gradient(135deg, #1e3a8a, #0f172a)'
        }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Company Header */}
          <div className="text-center mb-8">
            <h1 
              className="text-4xl md:text-5xl font-bold text-white mb-2"
              style={{ textShadow: '0 4px 20px rgba(0, 0, 0, 0.4)' }}
            >
              {companyData.name}
            </h1>
            <p className="text-lg" style={{ color: '#f8fafc' }}>
              {companyData.industry || 'Technology'} • {companyData.public ? 'Public' : 'Private'} Company
            </p>
          </div>

          {/* Score Dashboard */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Main Score Card */}
            <div className="md:col-span-1">
              <div 
                className="rounded-xl p-6 border text-center"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderColor: 'rgba(255, 255, 255, 0.2)'
                }}
              >
                <h3 className="text-white text-lg font-semibold mb-4">Overall Score</h3>
                <CircularScore score={overallScore} maxScore={maxScore} size={140} />
                <div className="mt-4">
                  <div className="font-bold text-sm" style={{ color: '#facc15' }}>
                    {companyData.status_label || 'Good Practice'}
                  </div>
                  <div className="text-sm mt-1" style={{ color: '#cbd5e1' }}>
                    Better than {percentile}% of companies
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="md:col-span-2 grid grid-cols-2 gap-4">
              <div 
                className="rounded-xl p-4 border"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderColor: 'rgba(255, 255, 255, 0.2)'
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                  <span className="text-white font-medium">Trend</span>
                </div>
                <div className="text-2xl font-bold text-green-400">+5.2%</div>
                <div className="text-sm" style={{ color: '#cbd5e1' }}>vs last quarter</div>
              </div>
              
              <div 
                className="rounded-xl p-4 border"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderColor: 'rgba(255, 255, 255, 0.2)'
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-5 h-5" style={{ color: '#facc15' }} />
                  <span className="text-white font-medium">Rank</span>
                </div>
                <div className="text-2xl font-bold" style={{ color: '#facc15' }}>#12</div>
                <div className="text-sm" style={{ color: '#cbd5e1' }}>in Technology</div>
              </div>
              
              <div 
                className="rounded-xl p-4 border"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderColor: 'rgba(255, 255, 255, 0.2)'
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-medium">Confidence</span>
                </div>
                <div className="text-2xl font-bold text-blue-400">High</div>
                <div className="text-sm" style={{ color: '#cbd5e1' }}>Data quality</div>
              </div>
              
              <div 
                className="rounded-xl p-4 border"
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  borderColor: 'rgba(255, 255, 255, 0.2)'
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5" style={{ color: '#64748b' }} />
                  <span className="text-white font-medium">Updated</span>
                </div>
                <div className="text-2xl font-bold text-white">Dec 2024</div>
                <div className="text-sm" style={{ color: '#cbd5e1' }}>Last review</div>
              </div>
            </div>
          </div>

          {/* Pillar Scores */}
          <div className="grid md:grid-cols-5 gap-4">
            {mockPillarScores.map((pillar, index) => (
              <PillarCard key={index} {...pillar} />
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 border-b" style={{ borderColor: '#cbd5e1' }}>
              {['overview', 'methodology', 'timeline', 'compare'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-medium capitalize transition-all duration-200 border-b-2 ${
                    activeTab === tab
                      ? 'text-blue-600'
                      : 'hover:text-gray-800'
                  }`}
                  style={{
                    borderBottomColor: activeTab === tab ? '#3b82f6' : 'transparent',
                    color: activeTab === tab ? '#3b82f6' : '#64748b'
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
		  

          {/* Tab Content */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div 
                    className="rounded-xl p-6 border"
                    style={{ 
                      backgroundColor: 'white',
                      borderColor: '#cbd5e1',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                    }}
                  >
                    <h3 className="text-xl font-semibold mb-4" style={{ color: '#1e293b' }}>Key Strengths</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium" style={{ color: '#1e293b' }}>Strong Transparency Practices</h4>
                          <p className="text-sm" style={{ color: '#64748b' }}>Comprehensive AI documentation and public reporting</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium" style={{ color: '#1e293b' }}>Robust Safety Measures</h4>
                          <p className="text-sm" style={{ color: '#64748b' }}>Advanced testing and monitoring systems in place</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div 
                    className="rounded-xl p-6 border"
                    style={{ 
                      backgroundColor: 'white',
                      borderColor: '#cbd5e1',
                      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                    }}
                  >
                    <h3 className="text-xl font-semibold mb-4" style={{ color: '#1e293b' }}>Areas for Improvement</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium" style={{ color: '#1e293b' }}>Redress Mechanisms</h4>
                          <p className="text-sm" style={{ color: '#64748b' }}>Limited pathways for user appeals and corrections</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium" style={{ color: '#1e293b' }}>Fairness Testing</h4>
                          <p className="text-sm" style={{ color: '#64748b' }}>Bias testing could be more comprehensive</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'methodology' && (
                <div 
                  className="rounded-xl p-6 border"
                  style={{ 
                    backgroundColor: 'white',
                    borderColor: '#cbd5e1',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                  }}
                >
                  <h3 className="text-xl font-semibold mb-4" style={{ color: '#1e293b' }}>Scoring Methodology</h3>
                  <p className="mb-4" style={{ color: '#64748b' }}>
                    Our evaluation framework assesses companies across five key pillars of responsible AI:
                  </p>
                  <div className="space-y-4">
                    {mockPillarScores.map((pillar, index) => (
                      <div key={index} className="border rounded-lg p-4" style={{ borderColor: '#cbd5e1' }}>
                        <div className="flex items-center gap-2 mb-2">
                          <pillar.icon className="w-5 h-5 text-blue-600" />
                          <h4 className="font-medium" style={{ color: '#1e293b' }}>{pillar.name}</h4>
                        </div>
                        <p className="text-sm" style={{ color: '#64748b' }}>
                          Evaluates practices, policies, and implementation across this critical area.
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <div 
                className="rounded-xl p-6 border"
                style={{ 
                  backgroundColor: 'white',
                  borderColor: '#cbd5e1',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                }}
              >
                <h3 className="text-lg font-semibold mb-4" style={{ color: '#1e293b' }}>Company Info</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span style={{ color: '#64748b' }}>Industry:</span>
                    <span style={{ color: '#1e293b' }}>{companyData.industry || 'Technology'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#64748b' }}>Type:</span>
                    <span style={{ color: '#1e293b' }}>{companyData.public ? 'Public' : 'Private'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: '#64748b' }}>Last Review:</span>
                    <span style={{ color: '#1e293b' }}>{companyData.last_updated || 'Dec 2024'}</span>
                  </div>
                </div>
              </div>

              {/* Premium Content Teaser */}
              <div 
                className="rounded-xl p-6 border"
                style={{ 
                  background: 'linear-gradient(135deg, #dbeafe, #f1f5f9)',
                  borderColor: '#cbd5e1'
                }}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">🔒</div>
                  <h3 className="font-semibold mb-2" style={{ color: '#1e293b' }}>Premium Insights</h3>
                  <p className="text-sm mb-4" style={{ color: '#64748b' }}>
                    Get detailed analysis, source documentation, and expert commentary
                  </p>
                  <button 
                    className="w-full font-medium py-2 px-4 rounded-lg transition-colors text-white hover:bg-blue-700"
                    style={{ backgroundColor: '#3b82f6' }}
                  >
                    Upgrade to Pro
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