import React, { useState, useEffect } from 'react';
import { Eye, Scale, Lightbulb, Users, Shield, Building, CheckCircle, BadgeCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// Mock Container component
const Container = ({ children }) => (
  <div style={{ 
    maxWidth: '1440px', 
    margin: '0 auto', 
    padding: '0 24px' 
  }}>
    {children}
  </div>
);



function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-reveal]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ 
      fontFamily: 'Inter, SF Pro Display, system-ui, -apple-system, sans-serif',
      color: '#0f172a',
      lineHeight: '1.6',
      overflow: 'hidden'
    }}>
       {/* Page Title */}
		<Helmet>
		  <title>RAI Score: Responsible AI Scorecard</title>
		</Helmet>
		
      {/* HERO SECTION */}
      <section style={{
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* Subtle background elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(37, 99, 235, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(96, 165, 250, 0.08) 0%, transparent 50%)
          `,
          animation: 'float 20s ease-in-out infinite'
        }} />
        
        {/* Professional floating elements */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '120px',
          height: '120px',
          background: 'rgba(37, 99, 235, 0.05)',
          borderRadius: '24px',
          transform: `translateY(${scrollY * 0.2}px)`,
          border: '1px solid rgba(96, 165, 250, 0.1)',
          animation: 'pulse 8s ease-in-out infinite'
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '25%',
          left: '8%',
          width: '80px',
          height: '80px',
          background: 'rgba(96, 165, 250, 0.08)',
          borderRadius: '16px',
          transform: `translateY(${scrollY * -0.15}px) rotate(45deg)`,
          border: '1px solid rgba(37, 99, 235, 0.1)'
        }} />

        <Container>
          <div style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '800px'
          }}>
            
            {/* Professional headline */}
            <h1 style={{
              fontSize: 'clamp(48px, 8vw, 72px)',
              fontWeight: '900',
              marginBottom: '24px',
              letterSpacing: '-0.03em',
              color: '#ffffff',
              lineHeight: '1.1'
            }}>
              Responsible AI
              <br />
              <span style={{
                color: '#60a5fa',
                fontSize: '0.85em'
              }}>
                Scorecard
              </span>
            </h1>
            
            {/* Clear, authoritative subtext */}
            <p style={{
              fontSize: 'clamp(18px, 3vw, 20px)',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '600px',
              marginBottom: '48px',
              lineHeight: '1.7',
              fontWeight: '400'
            }}>
              Comprehensive evaluation of AI companies across transparency, fairness, 
              safety, and governance. Data-driven insights for informed decisions.
            </p>
            
            {/* Professional CTA buttons */}
            <div style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              marginTop: '32px'
            }}>
              <Link 
                to="/companies" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '16px',
                  transition: 'all 0.2s ease',
                  border: 'none',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1d4ed8';
                  e.target.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#2563eb';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                View Company Scores
                <span style={{ marginLeft: '8px', fontSize: '16px' }}>→</span>
              </Link>
              
			 <Link 
                to="/about" style={{
                backgroundColor: 'transparent',
                color: '#ffffff',
                padding: '12px 24px',
                border: '2px solid #475569',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#60a5fa';
                e.target.style.color = '#60a5fa';
                e.target.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = '#475569';
                e.target.style.color = '#ffffff';
                e.target.style.transform = 'scale(1)';
              }}>
                About Us
              </Link>
            </div>
          </div>
        </Container>
      </section>

{/* PILLARS SECTION */}
<section 
  id="pillars"
  data-reveal
  style={{
    padding: '80px 0',
    backgroundColor: '#f8fafc',
    position: 'relative',
    opacity: isVisible.pillars ? 1 : 0,
    transform: isVisible.pillars ? 'translateY(0)' : 'translateY(40px)',
    transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
  }}
>
  <Container>
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Section header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '64px',
        maxWidth: '700px',
        margin: '0 auto 64px'
      }}>
        <h2 style={{
          fontSize: 'clamp(32px, 5vw, 48px)',
          fontWeight: '800',
          marginBottom: '24px',
          color: '#0f172a',
          letterSpacing: '-0.02em'
        }}>
          Evaluation Framework
        </h2>
        <p style={{
          fontSize: '18px',
          color: '#475569',
          lineHeight: '1.7',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          We assess organizations across seven critical dimensions of responsible AI using transparent methodologies and publicly available data.
        </p>
      </div>

      {/* Pillar Grid */}
      <div className="pillars-grid">
        {pillars.map((pillar) => (
          <div key={pillar.label} className="pillar-card">
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: pillar.color
            }} />

            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              backgroundColor: `${pillar.color}15`,
              borderRadius: '16px',
              marginBottom: '24px',
              color: pillar.color
            }}>
              {pillar.icon}
            </div>

            <h3 style={{
              fontSize: '20px',
              fontWeight: '700',
              marginBottom: '16px',
              color: '#0f172a',
              lineHeight: '1.3'
            }}>
              {pillar.label}
            </h3>

            <p style={{
              fontSize: '16px',
              color: '#64748b',
              lineHeight: '1.6',
              marginBottom: '24px'
            }}>
              {pillar.description}
            </p>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              color: '#2563eb',
              fontSize: '14px',
              fontWeight: '600',
              textDecoration: 'none',
              marginTop: 'auto'
            }}>
              Learn more
              <span style={{ marginLeft: '8px', transition: 'transform 0.2s ease', fontSize: '14px' }}>→</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Container>

  {/* CSS for Responsive Grid */}
 <style>{`
  .pillars-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    max-width: 1440px;
    margin: 0 auto;
  }

  .pillar-card {
    background-color: #ffffff;
    border-radius: 16px;
    padding: 32px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
    border: 1px solid #e2e8f0;
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.3s, box-shadow 0.3s;
    display: flex;
    flex-direction: column;
  }

  .pillar-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 16px 48px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 1200px) {
    .pillars-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .pillars-grid {
      grid-template-columns: 1fr;
    }
  }

  
`}</style>
</section>

      {/* FEATURED SECTION */}
      <section 
        id="featured"
        data-reveal
        style={{
          padding: '80px 0',
          backgroundColor: '#0f172a',
          position: 'relative',
          overflow: 'hidden',
          opacity: isVisible.featured ? 1 : 0,
          transform: isVisible.featured ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        
        <Container>
          <div style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center'
          }}>
            
            {/* Featured content */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '24px',
              padding: '48px 32px',
              border: '1px solid rgba(226, 232, 240, 0.1)',
              maxWidth: '600px',
              margin: '0 auto',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
            }}>
              
              <div style={{
                width: '80px',
                height: '80px',
                backgroundColor: 'rgba(37, 99, 235, 0.2)',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 32px',
                color: '#60a5fa'
              }}>
                <CheckCircle size={32} />
              </div>
              
              <h2 style={{
                fontSize: '32px',
                fontWeight: '800',
                marginBottom: '16px',
                color: '#ffffff',
                letterSpacing: '-0.02em'
              }}>
                Featured Analysis
              </h2>
              
              <p style={{
                fontSize: '18px',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '32px',
                lineHeight: '1.6',
                maxWidth: '450px',
                margin: '0 auto 32px'
              }}>
                Explore how leading AI companies perform across our 
                comprehensive responsible AI evaluation framework.
              </p>
              
              <Link 
                to="/companies" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '16px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#1d4ed8';
                  e.target.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#2563eb';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                View All Companies
                <span style={{ marginLeft: '8px', fontSize: '16px' }}>→</span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* 🚀 COMING SOON SECTION - Modern timeline design */}
      <section 
        id="coming-soon"
        data-reveal
        style={{
          padding: '6rem 0',
          backgroundColor: '#ffffff',
          position: 'relative',
          opacity: isVisible['coming-soon'] ? 1 : 0,
          transform: isVisible['coming-soon'] ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <Container>
          <div style={{
            textAlign: 'center',
            marginBottom: '4rem'
          }}>
            <h3 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: '1.5rem',
              color: '#1e293b',
              letterSpacing: '-0.02em'
            }}>
              🧭 Coming Soon
            </h3>
            <p style={{
              fontSize: '1.25rem',
              color: '#64748b',
              maxWidth: '650px',
              margin: '0 auto'
            }}>
              We're building the future of AI accountability. Here's what's coming next.
            </p>
          </div>

          {/* 📋 Feature roadmap with modern cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem',
            maxWidth: '1440px',
            margin: '0 auto'
          }}>
            {comingSoonFeatures.map((feature, index) => (
              <div
                key={feature.title}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '2rem',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(229, 231, 235, 0.8)',
                  position: 'relative',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: isVisible['coming-soon'] ? 'translateY(0)' : 'translateY(40px)',
                  transitionDelay: `${index * 0.1}s`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 30px rgba(0, 0, 0, 0.12)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                }}
              >
                <div style={{
                  fontSize: '2rem',
                  marginBottom: '1rem'
                }}>
                  {feature.icon}
                </div>
                
                <h4 style={{
                  fontSize: '1.25rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  color: '#1e293b'
                }}>
                  {feature.title}
                </h4>
                
                <p style={{
                  fontSize: '1rem',
                  color: '#64748b',
                  lineHeight: '1.6'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      {/* Global styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
        }
        
        
      `}</style>
    </div>
  );
}

// Updated pillars with professional icons and style guide colors
const pillars = [
  {
    icon: <Eye size={24} />,
    label: 'Transparency',
    description: 'Clear, accessible disclosures about AI system functionality, including model documentation, transparency reports, and public explanations of AI behavior.',
    color: '#2563eb'
  },
  {
    icon: <Scale size={24} />,
    label: 'Fairness & Bias Mitigation',
    description: 'Demonstrated efforts to reduce algorithmic bias through diverse data practices, fairness audits, and inclusive design throughout the AI lifecycle.',
    color: '#0ea5e9'
  },
  {
    icon: <Lightbulb size={24} />,
    label: 'Explainability',
    description: 'Capability to provide human-understandable explanations of AI outputs through interpretable models and educational resources.',
    color: '#f59e0b'
  },
  {
    icon: <Users size={24} />,
    label: 'Human Oversight & Accountability',
    description: 'Systems ensuring human involvement in AI decisions, including review policies, escalation procedures, and designated accountability teams.',
    color: '#10b981'
  },
  {
    icon: <Shield size={24} />,
    label: 'Privacy & Security',
    description: 'Comprehensive data protection and risk management with privacy-by-design principles, encryption, and secure deployment practices.',
    color: '#8b5cf6'
  },
  {
    icon: <Building size={24} />,
    label: 'Governance & Internal Accountability',
    description: 'Formal oversight structures including responsible AI teams, review boards, and adherence to established standards and frameworks.',
    color: '#6b7280'
  },
  {
    icon: <CheckCircle size={24} />,
    label: 'Public Commitments & External Audits',
    description: 'Public-facing ethical AI pledges, partnerships with external organizations, and voluntary compliance with regulatory frameworks.',
    color: '#ef4444'
  }
];

// 🔮 Coming soon features with detailed descriptions
const comingSoonFeatures = [
  {
    icon: '📊',
    title: 'Score Breakdowns',
    description: 'Detailed pillar-by-pillar analysis with interactive charts and trend data'
  },
  {
    icon: '📚',
    title: 'Methodology Insights',
    description: 'Source citations, scoring rationale, and transparent evaluation criteria'
  },
  {
    icon: '⭐',
    title: 'Premium Access',
    description: 'Comprehensive audits, alerts, and advanced analytics for stakeholders'
  },
   {
    icon: '🛡️',
    title: 'Responsible AI Certification',
    description: 'Certify your company\'s AI systems and governance programs to demonstrate leadership in trustworthy and ethical AI practices'
  }
];

export default Home;