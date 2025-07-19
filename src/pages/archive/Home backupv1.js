import React, { useState, useEffect } from 'react';

// Mock Container component for this example
const Container = ({ children }) => (
  <div style={{ 
    maxWidth: '1200px', 
    margin: '0 auto', 
    padding: '0 2rem' 
  }}>
    {children}
  </div>
);

// Mock Link component for this example
const Link = ({ to, children, style, ...props }) => (
  <a 
    href={to} 
    style={style}
    {...props}
  >
    {children}
  </a>
);

// 🎨 Modern Homepage with Enhanced Design System
function Home() {
  // ✨ State for scroll-triggered animations
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  // 🔄 Scroll handler for parallax and reveal effects
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🎯 Intersection Observer for reveal animations
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

    // Observe all sections
    const sections = document.querySelectorAll('[data-reveal]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ 
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      color: '#0f172a',
      lineHeight: '1.6',
      overflow: 'hidden'
    }}>
      
      {/* 🌟 HERO SECTION - Modern gradient background with floating elements */}
      <section style={{
        background: 'linear-gradient(135deg, #1e3a8a 0%, #0f172a 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* 🎨 Animated background elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%)
          `,
          animation: 'float 20s ease-in-out infinite'
        }} />
        
        {/* 🎭 Floating geometric shapes */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '120px',
          height: '120px',
          background: 'rgba(203, 213, 225, 0.12)',  // Soft blue-gray tint
          borderRadius: '50%',
          transform: `translateY(${scrollY * 0.2}px)`,
          backdropFilter: 'blur(10px)',
          animation: 'pulse 4s ease-in-out infinite'
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '30%',
          left: '5%',
          width: '80px',
          height: '80px',
          background: 'rgba(148, 163, 184, 0.10)',
          borderRadius: '20px',
          transform: `translateY(${scrollY * -0.1}px) rotate(45deg)`,
          backdropFilter: 'blur(5px)'
        }} />

        <Container>
          <div style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '800px'
          }}>
            
            {/* 🎯 Main headline with modern typography */}
            <h1 style={{
              fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
              fontWeight: '800',
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
              color: '#ffffff',
              textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: '1.1'
            }}>
              Responsible AI
              <br />
				<span style={{
				  background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 100%)',
				  WebkitBackgroundClip: 'text',
				  WebkitTextFillColor: 'transparent',
				  backgroundClip: 'text',
				  textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
				}}>
			Scorecard
			</span>
            </h1>
            
            {/* 📝 Hero description with enhanced styling */}
            <p style={{
              fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
              color: 'rgba(255, 255, 255, 0.9)',
              maxWidth: '600px',
              marginBottom: '2.5rem',
              lineHeight: '1.7',
              textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
            }}>
              Tracking how companies build and govern AI — with transparency, 
              fairness, and accountability. Simple, public, and focused on impact.
            </p>
            
            {/* 🎬 CTA buttons with modern design */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap',
              marginTop: '2rem'
            }}>
              <Link 
                to="#/companies" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.1)';
                }}
              >
                Explore Scores
                <span style={{ marginLeft: '0.5rem' }}>→</span>
              </Link>
              
              <button style={{
                backgroundColor: 'transparent',
                color: 'rgba(255, 255, 255, 0.9)',
                padding: '1rem 2rem',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '50px',
                fontWeight: '600',
                fontSize: '1.1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              }}>
                Learn More
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* 🏛️ PILLARS SECTION - Modern card design with staggered layout */}
      <section 
        id="pillars"
        data-reveal
        style={{
          padding: '6rem 0',
          backgroundColor: '#f8fafc',
          position: 'relative',
          opacity: isVisible.pillars ? 1 : 0,
          transform: isVisible.pillars ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        
        {/* 🎨 Section background decoration */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 10% 20%, rgba(156, 163, 175, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, rgba(79, 70, 229, 0.05) 0%, transparent 50%)
          `,
          pointerEvents: 'none'
        }} />
        
        <Container>
          <div style={{ position: 'relative', zIndex: 1 }}>
            
            {/* 📑 Section header with modern typography */}
            <div style={{
              textAlign: 'center',
              marginBottom: '4rem',
              maxWidth: '700px',
              margin: '0 auto 4rem'
            }}>
              <h2 style={{
                fontSize: 'clamp(2rem, 5vw, 3rem)',
                fontWeight: '700',
                marginBottom: '1.5rem',
                color: '#1e293b',
                letterSpacing: '-0.02em'
              }}>
                What We Score
              </h2>
              <p style={{
                fontSize: '1.25rem',
                color: '#64748b',
                lineHeight: '1.8',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                We evaluate organizations on real-world Responsible AI practices using 
                publicly available data across key pillars
              </p>
            </div>

            {/* 🎯 Pillar cards with modern design and staggered animation */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '2rem',
              maxWidth: '1200px',
              margin: '0 auto'
            }}>
              {pillars.map((pillar, index) => (
                <div
                  key={pillar.label}
                  style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '20px',
                    padding: '2rem',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    border: '1px solid rgba(229, 231, 235, 0.8)',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    transform: isVisible.pillars ? 'translateY(0)' : 'translateY(40px)',
                    transitionDelay: `${index * 0.1}s`
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                  }}
                >
                  
                  {/* 🎨 Card background gradient */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: pillar.gradient,
                    opacity: 0.8
                  }} />
                  
                  {/* 🎭 Icon with modern styling */}
                  <div style={{
                    fontSize: '2.5rem',
                    marginBottom: '1.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '70px',
                    height: '70px',
                    background: pillar.gradient,
                    borderRadius: '16px',
                    color: 'white',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
                  }}>
                    {pillar.icon}
                  </div>
                  
                  {/* 📝 Card content */}
                  <h3 style={{
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    marginBottom: '1rem',
                    color: '#1e293b'
                  }}>
                    {pillar.label}
                  </h3>
                  
                  <p style={{
                    fontSize: '1rem',
                    color: '#64748b',
                    lineHeight: '1.7',
                    marginBottom: '1.5rem'
                  }}>
                    {pillar.description}
                  </p>
                  
                  {/* 🔗 Learn more link */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    color: '#3b82f6',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    textDecoration: 'none'
                  }}>
                    Learn more
                    <span style={{ 
                      marginLeft: '0.5rem',
                      transition: 'transform 0.3s ease'
                    }}>→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 🌟 FEATURED SECTION - Modern glassmorphism design */}
      <section 
        id="featured"
        data-reveal
        style={{
          padding: '6rem 0',
          background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)',
          position: 'relative',
          overflow: 'hidden',
          opacity: isVisible.featured ? 1 : 0,
          transform: isVisible.featured ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        
        {/* 🎨 Animated background elements */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          left: '-20%',
          width: '140%',
          height: '200%',
          background: `
            radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)
          `,
          animation: 'rotate 30s linear infinite'
        }} />
        
        <Container>
          <div style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center'
          }}>
            
            {/* 🎯 Featured content with glassmorphism card */}
            <div style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              borderRadius: '24px',
              padding: '3rem',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              maxWidth: '600px',
              margin: '0 auto',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}>
              
              <div style={{
                fontSize: '3rem',
                marginBottom: '1.5rem'
              }}>
                🔥
              </div>
              
              <h2 style={{
                fontSize: '2.5rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                color: '#ffffff',
                letterSpacing: '-0.02em'
              }}>
                Featured Score
              </h2>
              
              <p style={{
                fontSize: '1.25rem',
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '2.5rem',
                lineHeight: '1.7'
              }}>
                Take a look at how OpenAI ranks on our comprehensive 
                responsible AI scorecard
              </p>
              
              <Link 
                to="/company/openai" 
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  padding: '1rem 2rem',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
                  e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  e.target.style.transform = 'translateY(0)';
                }}
              >
                View OpenAI Score
                <span style={{ marginLeft: '0.5rem' }}>→</span>
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
              maxWidth: '600px',
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
            maxWidth: '1000px',
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

      {/* 🎨 Global styles and animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        
        @keyframes rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
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

// 📚 Static content for pillars with modern color schemes
const pillars = [
  {
    icon: '🔍',
    label: 'Transparency',
    description: 'Discloses clear information on how AI systems are designed and used, including model cards and documentation.',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
  },
  {
    icon: '⚖️',
    label: 'Fairness',
    description: 'Shows commitment to reducing bias and ensuring equitable treatment across all user groups.',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)'
  },
  {
    icon: '🛡️',
    label: 'Safety & Security',
    description: 'Implements robust safeguards to prevent misuse, harm, and unauthorized access.',
    gradient: 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)'
  },
  {
    icon: '🏛️',
    label: 'Governance',
    description: 'Demonstrates clear AI governance policies, oversight mechanisms, and accountability structures.',
    gradient: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)' 
  },
  {
    icon: '🚨',
    label: 'Redress',
    description: 'Provides accessible mechanisms to report harm, appeal decisions, and seek remediation.',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%)'   
  }
];

// 🔮 Coming soon features with detailed descriptions
const comingSoonFeatures = [
  {
    icon: '🔍',
    title: 'Company Directory',
    description: 'Full searchable database of AI companies with filtering and comparison tools'
  },
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
  }
];

export default Home;