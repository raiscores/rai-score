import React, { useState, useEffect } from 'react';
import { Eye, Scale, Lightbulb, Users, Shield, Building, CheckCircle, AlertTriangle, Zap, Target, TrendingUp, Info, ArrowRight, BarChart3, FileText, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// Mock Container component with enhanced responsiveness
const Container = ({ children, size = 'default' }) => {
  const maxWidths = {
    default: '1400px',
    wide: '1400px',
    narrow: '900px'
  };
  
  return (
    <div style={{ 
      maxWidth: maxWidths[size], 
      margin: '0 auto', 
      padding: '0 clamp(20px, 4vw, 36px)',
      width: '100%'
    }}>
      {children}
    </div>
  );
};

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
        <title>RAI Score: Independent AI Accountability Evaluations</title>
        <meta name="description" content="Independent evaluations of how leading companies approach responsible AI governance and transparency. Making AI accountability visible through evidence-based assessment." />
      </Helmet>
      
      {/* HERO SECTION */}
      <section style={{
        background: `
          linear-gradient(135deg, #0a0f1c 0%, #1a202c 25%, #2d3748 100%),
          radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
          radial-gradient(circle at 75% 75%, rgba(124, 58, 237, 0.1) 0%, transparent 50%)
        `,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* Enhanced floating background elements */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(168, 85, 247, 0.06) 0%, transparent 50%)
          `
        }} />
        
        {/* Dynamic floating elements with enhanced parallax */}
        <div style={{
          position: 'absolute',
          top: '15%',
          right: '8%',
          width: '160px',
          height: '160px',
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.12), rgba(147, 51, 234, 0.08))',
          borderRadius: '32px',
          transform: `translateY(${scrollY * 0.5}px) rotate(${scrollY * 0.1}deg)`,
          border: '2px solid rgba(96, 165, 250, 0.2)',
          animation: 'float 12s ease-in-out infinite',
          backdropFilter: 'blur(20px)'
        }} />
        
        <div style={{
          position: 'absolute',
          top: '60%',
          left: '5%',
          width: '120px',
          height: '120px',
          background: 'linear-gradient(45deg, rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.08))',
          borderRadius: '24px',
          transform: `translateY(${scrollY * -0.4}px) rotate(45deg)`,
          border: '2px solid rgba(168, 85, 247, 0.15)',
          animation: 'pulse 8s ease-in-out infinite'
        }} />

        <div style={{
          position: 'absolute',
          top: '25%',
          left: '15%',
          width: '80px',
          height: '80px',
          background: 'rgba(34, 197, 94, 0.1)',
          borderRadius: '50%',
          transform: `translateY(${scrollY * 0.3}px)`,
          border: '1px solid rgba(34, 197, 94, 0.2)',
          animation: 'float 15s ease-in-out infinite reverse'
        }} />

        <Container size="wide">
          <div style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: '1100px'
          }}>
            
            {/* Credibility indicator */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '32px',
              color: '#60a5fa',
              animation: 'slideInUp 0.8s ease-out'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px',
                boxShadow: '0 8px 24px rgba(37, 99, 235, 0.3)'
              }}>
                <BarChart3 size={24} color="#ffffff" />
              </div>
              <div>
                <span style={{ 
                  fontSize: '18px', 
                  fontWeight: '700', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em',
                  display: 'block'
                }}>
                  Independent AI Accountability
                </span>
                <span style={{ 
                  fontSize: '14px', 
                  fontWeight: '500',
                  color: 'rgba(96, 165, 250, 0.8)',
                  letterSpacing: '0.05em'
                }}>
                  Evidence-based evaluations, not corporate claims
                </span>
              </div>
            </div>
            
            <h1 style={{
              fontSize: 'clamp(42px, 7vw, 72px)',
              fontWeight: '900',
              marginBottom: '32px',
              letterSpacing: '-0.04em',
              color: '#ffffff',
              lineHeight: '1.1',
              textShadow: '0 4px 24px rgba(0, 0, 0, 0.3)',
              animation: 'slideInUp 0.8s ease-out 0.1s both'
            }}>
              See Which Companies Take 
              <span style={{
                color: '#60a5fa',
                display: 'block',
                marginTop: '16px',
                background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                AI Responsibility Seriously
              </span>
            </h1>
            
            {/* Clear value proposition */}
            <div style={{
              animation: 'slideInUp 0.8s ease-out 0.2s both'
            }}>
              <p style={{
                fontSize: 'clamp(20px, 3.5vw, 26px)',
                color: 'rgba(255, 255, 255, 0.95)',
                maxWidth: '900px',
                marginBottom: '24px',
                lineHeight: '1.5',
                fontWeight: '400'
              }}>
                Independent evaluations of AI governance practices based on publicly available evidence, not corporate marketing.
              </p>
              
              <p style={{
                fontSize: 'clamp(18px, 3vw, 22px)',
                color: 'rgba(255, 255, 255, 0.85)',
                maxWidth: '800px',
                marginBottom: '40px',
                lineHeight: '1.5',
                fontWeight: '400'
              }}>
                Compare how leading companies approach transparency, fairness, and accountability in their AI systems.
              </p>
            </div>
            
            {/* Primary CTA with clear hierarchy */}
            <div style={{
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap',
              marginBottom: '32px',
              animation: 'slideInUp 0.8s ease-out 0.3s both'
            }}>
              <Link 
                to="/companies" 
                className="primary-cta"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  color: 'white',
                  padding: '20px 40px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '18px',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 32px rgba(37, 99, 235, 0.4)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <span style={{ position: 'relative', zIndex: 1 }}>
                  View Company Evaluations
                </span>
                <ArrowRight style={{ 
                  marginLeft: '12px', 
                  fontSize: '18px', 
                  transition: 'transform 0.3s ease',
                  position: 'relative',
                  zIndex: 1
                }} size={20} />
              </Link>
              
              <Link 
                to="/methodology" 
                className="secondary-cta"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  padding: '20px 32px',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(20px)'
                }}
              >
                Our Methodology
              </Link>
            </div>

            {/* Trust indicators */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '32px',
              marginTop: '48px',
              animation: 'slideInUp 0.8s ease-out 0.35s both'
            }}>
              {trustIndicators.map((indicator, index) => (
                <div key={index} style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'rgba(255, 255, 255, 0.8)',
                  fontSize: '14px',
                  fontWeight: '500'
                }}>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(34, 197, 94, 0.2)',
                    border: '2px solid #22c55e',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '12px'
                  }}>
                    <CheckCircle size={12} color="#22c55e" />
                  </div>
                  {indicator}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* METHODOLOGY PREVIEW SECTION */}
		<section 
		  id="methodology-preview"
		  data-reveal
		  style={{
			padding: 'clamp(80px, 10vw, 120px) 0',
			background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
			position: 'relative',
			opacity: isVisible['methodology-preview'] ? 1 : 0,
			transform: isVisible['methodology-preview'] ? 'translateY(0)' : 'translateY(40px)',
			transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
		  }}
		>
		  <Container size="wide">
			<div style={{ position: 'relative', zIndex: 1 }}>
			  {/* Section header */}
			  <div style={{
				textAlign: 'center',
				marginBottom: '80px',
				maxWidth: '800px',
				margin: '0 auto 80px'
			  }}>
				<div style={{
				  display: 'inline-flex',
				  alignItems: 'center',
				  backgroundColor: '#f0f9ff',
				  color: '#0369a1',
				  padding: '12px 24px',
				  borderRadius: '50px',
				  marginBottom: '24px',
				  fontSize: '16px',
				  fontWeight: '600'
				}}>
				  <Zap size={20} style={{ marginRight: '8px' }} />
				  Our Framework
				</div>
				
				<h2 style={{
				  fontSize: 'clamp(36px, 6vw, 56px)',
				  fontWeight: '800',
				  marginBottom: '24px',
				  color: '#0f172a',
				  letterSpacing: '-0.03em'
				}}>
				  Core Themes of AI Accountability
				</h2>

				<p style={{
				  fontSize: '20px',
				  color: '#475569',
				  lineHeight: '1.7',
				  maxWidth: '700px',
				  margin: '0 auto'
				}}>
				  We evaluate companies across these dimensions using only publicly disclosed information—creating transparency where none existed before.
				</p>

				<p style={{
				  fontSize: '16px',
				  color: '#64748b',
				  fontStyle: 'italic',
				  maxWidth: '600px',
				  margin: '16px auto 0'
				}}>
				  <strong>Note:</strong> While we highlight these core themes, our detailed methodology evaluates seven specific areas that provide a comprehensive and nuanced assessment.
				</p>
			  </div>

			  {/* Enhanced Themes Grid */}
			  <div className="themes-grid">
				{evaluationThemes.map((theme, index) => (
				  <div 
					key={theme.title} 
					className="theme-card"
					style={{
					  animation: `slideInUp 0.6s ease-out ${0.1 * index}s both`
					}}
					title={`Learn more about ${theme.title}`}
				  >
					<div style={{
					  position: 'absolute',
					  top: 0,
					  left: 0,
					  right: 0,
					  height: '6px',
					  background: `linear-gradient(135deg, ${theme.color}, ${theme.colorSecondary})`,
					  borderRadius: '20px 20px 0 0'
					}} />

					<div style={{
					  display: 'flex',
					  alignItems: 'center',
					  justifyContent: 'center',
					  width: '80px',
					  height: '80px',
					  background: `linear-gradient(135deg, ${theme.color}15, ${theme.colorSecondary}10)`,
					  borderRadius: '20px',
					  marginBottom: '32px',
					  color: theme.color,
					  boxShadow: `0 8px 24px ${theme.color}20`,
					  transition: 'transform 0.3s ease'
					}}>
					  {theme.icon}
					</div>

					<h3 style={{
					  fontSize: '24px',
					  fontWeight: '700',
					  marginBottom: '16px',
					  color: '#0f172a',
					  lineHeight: '1.3'
					}}>
					  {theme.title}
					</h3>

					<p style={{
					  fontSize: '16px',
					  color: '#64748b',
					  lineHeight: '1.7',
					  marginBottom: '24px'
					}}>
					  {theme.description}
					</p>

					<div style={{
					  fontSize: '14px',
					  color: theme.color,
					  fontWeight: '600',
					  marginTop: 'auto',
					  padding: '12px 16px',
					  backgroundColor: `${theme.color}08`,
					  borderRadius: '8px',
					  border: `1px solid ${theme.color}20`
					}}>
					  {theme.subtitle}
					</div>
				  </div>
				))}
			  </div>

			  {/* Enhanced Methodology CTA */}
			  <div style={{
				textAlign: 'center',
				marginTop: '64px'
			  }}>
				<Link 
				  to="/methodology"
				  className="methodology-link"
				  style={{
					display: 'inline-flex',
					alignItems: 'center',
					color: '#2563eb',
					fontSize: '18px',
					fontWeight: '700',
					textDecoration: 'none',
					transition: 'all 0.3s ease',
					padding: '16px 24px',
					borderRadius: '12px',
					backgroundColor: '#f8fafc',
					border: '2px solid #e2e8f0'
				  }}
				>
				  View Complete Methodology
				  <ArrowRight style={{ marginLeft: '8px' }} size={18} />
				</Link>
			  </div>
			</div>
		  </Container>
		</section>


      {/* WHO THIS IS FOR SECTION */}
      <section 
        id="audiences"
        data-reveal
        style={{
          padding: 'clamp(80px, 10vw, 120px) 0',
          backgroundColor: '#ffffff',
          position: 'relative',
          opacity: isVisible.audiences ? 1 : 0,
          transform: isVisible.audiences ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <Container>
          <div style={{
            textAlign: 'center',
            marginBottom: '64px'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              backgroundColor: '#f0f4ff',
              color: '#4338ca',
              padding: '12px 24px',
              borderRadius: '50px',
              marginBottom: '24px',
              fontSize: '16px',
              fontWeight: '600'
            }}>
              <Users size={20} style={{ marginRight: '8px' }} />
              Who This Helps
            </div>
            
            <h2 style={{
              fontSize: 'clamp(36px, 6vw, 48px)',
              fontWeight: '800',
              marginBottom: '24px',
              color: '#0f172a',
              letterSpacing: '-0.03em'
            }}>
              Built for Decision-Makers Who Need Transparency
            </h2>
            <p style={{
              fontSize: '20px',
              color: '#475569',
              lineHeight: '1.7',
              maxWidth: '700px',
              margin: '0 auto'
            }}>
              Whether you're evaluating investment opportunities, choosing technology partners, or shaping policy, RAI Score provides the evidence you need.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '30px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {audiences.map((audience, index) => (
              <div 
                key={index} 
                style={{
                  padding: '40px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '20px',
                  border: '2px solid #e2e8f0',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                className="audience-card"
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  backgroundColor: audience.color,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '24px',
                  color: '#ffffff'
                }}>
                  {audience.icon}
                </div>
                
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  marginBottom: '12px',
                  color: '#0f172a'
                }}>
                  {audience.title}
                </h3>
                
                <p style={{
                  fontSize: '16px',
                  color: '#64748b',
                  lineHeight: '1.6',
                  marginBottom: '20px'
                }}>
                  {audience.description}
                </p>
                
                <div style={{
                  fontSize: '14px',
                  color: audience.color,
                  fontWeight: '600'
                }}>
                  {audience.useCase}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* METHODOLOGICAL TRANSPARENCY SECTION */}
      <section 
        id="transparency"
        data-reveal
        style={{
          padding: 'clamp(60px, 8vw, 100px) 0',
          background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
          position: 'relative',
          opacity: isVisible.transparency ? 1 : 0,
          transform: isVisible.transparency ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        <Container>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, #fef3c7, #fde68a)',
              border: '2px solid #f59e0b',
              borderRadius: '20px',
              padding: '32px',
              marginBottom: '40px',
              position: 'relative'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                color: '#92400e'
              }}>
                <Info size={24} style={{ marginRight: '12px' }} />
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  margin: 0
                }}>
                  What Our Scores Represent
                </h3>
              </div>
              <p style={{
                fontSize: '16px',
                color: '#92400e',
                margin: 0,
                lineHeight: '1.6',
                fontWeight: '500'
              }}>
                Our evaluations reflect transparency and public accountability practices, not internal AI performance or private implementations we cannot observe.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
              marginBottom: '40px'
            }}>
              {methodologyPoints.map((point, index) => (
                <div 
                  key={index} 
                  style={{
                    padding: '24px',
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    textAlign: 'left'
                  }}
                >
                  <h4 style={{
                    fontSize: '16px',
                    fontWeight: '600',
                    marginBottom: '8px',
                    color: '#0f172a'
                  }}>
                    {point.title}
                  </h4>
                  <p style={{
                    fontSize: '14px',
                    color: '#64748b',
                    margin: 0,
                    lineHeight: '1.5'
                  }}>
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
	  
      {/* ENHANCED CALL TO ACTION SECTION */}
      <section 
        id="cta"
        data-reveal
        style={{
          padding: 'clamp(80px, 10vw, 140px) 0',
          background: `
            linear-gradient(135deg, #0a0f1c 0%, #1a202c 50%, #2d3748 100%),
            radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, rgba(168, 85, 247, 0.08) 0%, transparent 50%)
          `,
          position: 'relative',
          overflow: 'hidden',
          opacity: isVisible.cta ? 1 : 0,
          transform: isVisible.cta ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Floating background elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '120px',
          height: '120px',
          background: 'rgba(59, 130, 246, 0.1)',
          borderRadius: '50%',
          animation: 'float 20s ease-in-out infinite'
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '15%',
          right: '8%',
          width: '80px',
          height: '80px',
          background: 'rgba(168, 85, 247, 0.08)',
          borderRadius: '16px',
          animation: 'float 15s ease-in-out infinite reverse'
        }} />

       <Container>
          <div style={{
            position: 'relative',
            zIndex: 1,
            textAlign: 'center'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '32px',
              padding: 'clamp(48px, 8vw, 80px) clamp(40px, 6vw, 64px)',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              maxWidth: '800px',
              margin: '0 auto',
              boxShadow: '0 16px 64px rgba(0, 0, 0, 0.2)',
              backdropFilter: 'blur(20px)'
            }}>
              <h2 style={{
                fontSize: 'clamp(32px, 5vw, 48px)',
                fontWeight: '800',
                marginBottom: '24px',
                color: '#ffffff',
                letterSpacing: '-0.03em'
              }}>
                Start Exploring AI Accountability
              </h2>
              
              <p style={{
                fontSize: '20px',
                color: 'rgba(255, 255, 255, 0.9)',
                marginBottom: '48px',
                lineHeight: '1.6',
                maxWidth: '560px',
                margin: '0 auto 48px'
              }}>
                See how leading companies measure up on responsible AI practices, and discover which organizations are setting the standard.
              </p>
              
              <div style={{
                display: 'flex',
                gap: '20px',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                <Link 
                  to="/companies" 
                  className="final-cta"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                    color: 'white',
                    padding: '20px 40px',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: '700',
                    fontSize: '18px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 12px 48px rgba(37, 99, 235, 0.4)'
                  }}
                >
                  View Company Evaluations
                  <ArrowRight style={{ marginLeft: '12px' }} size={18} />
                </Link>
                
                <Link 
                  to="/methodology" 
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#ffffff',
                    padding: '20px 32px',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    fontWeight: '600',
                    fontSize: '16px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    backdropFilter: 'blur(20px)'
                  }}
                >
                  Learn Our Approach
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* COMING SOON SECTION */}
      <section 
        id="coming-soon"
        data-reveal
        style={{
          padding: 'clamp(80px, 10vw, 120px) 0',
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
            marginBottom: '64px'
          }}>
            <h3 style={{
              fontSize: 'clamp(32px, 5vw, 40px)',
              fontWeight: '700',
              marginBottom: '24px',
              color: '#1e293b',
              letterSpacing: '-0.02em'
            }}>
              🧭 Coming Soon
            </h3>
            <p style={{
              fontSize: '20px',
              color: '#64748b',
              maxWidth: '650px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              We're building the future of AI accountability. Here's what's coming next.
            </p>
          </div>

          {/* Feature roadmap with modern cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px',
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            {comingSoonFeatures.map((feature, index) => (
              <div
                key={feature.title}
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '32px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  border: '1px solid rgba(229, 231, 235, 0.8)',
                  position: 'relative',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  transform: isVisible['coming-soon'] ? 'translateY(0)' : 'translateY(40px)',
                  transitionDelay: `${index * 0.1}s`
                }}
                className="coming-soon-card"
              >
                <div style={{
                  fontSize: '32px',
                  marginBottom: '16px'
                }}>
                  {feature.icon}
                </div>
                
                <h4 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  marginBottom: '8px',
                  color: '#1e293b'
                }}>
                  {feature.title}
                </h4>
                
                <p style={{
                  fontSize: '16px',
                  color: '#64748b',
                  lineHeight: '1.6',
                  margin: 0
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>


      {/* Enhanced Global Styles with Accessibility Features */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-15px) rotate(1deg); }
          66% { transform: translateY(-10px) rotate(-1deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.05); }
        }
        
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
        }

        /* Accessible focus styles */
        .primary-cta:focus,
        .secondary-cta:focus,
        .methodology-link:focus,
        .final-cta:focus {
          outline: 3px solid #60a5fa;
          outline-offset: 2px;
        }

        .theme-card:focus,
        .audience-card:focus,
        .coming-soon-card:focus {
          outline: 3px solid #2563eb;
          outline-offset: 2px;
        }
        
        .primary-cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        
        .primary-cta:hover::before {
          left: 100%;
        }
        
        .primary-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 48px rgba(37, 99, 235, 0.6);
        }
        
        .secondary-cta:hover {
          background-color: rgba(255, 255, 255, 0.2);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-2px);
        }
        
        .themes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
          gap: 40px;
          max-width: 1440px;
          margin: 0 auto;
        }

        .theme-card {
          background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
          border-radius: 24px;
          padding: 40px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
          border: 2px solid #e2e8f0;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          min-height: 320px;
          tabindex: 0;
        }

        .theme-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 24px 64px rgba(0, 0, 0, 0.15);
          border-color: rgba(37, 99, 235, 0.3);
        }

        .theme-card:hover > div:first-of-type {
          transform: scale(1.1);
        }

        .theme-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent);
          transition: left 0.6s;
          z-index: 1;
        }

        .theme-card:hover::before {
          left: 100%;
        }

        .audience-card:hover {
          transform: translateY(-4px);
          border-color: #2563eb;
          box-shadow: 0 16px 48px rgba(0, 0, 0, 0.1);
        }

        .coming-soon-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
        }

        .methodology-link:hover {
          background-color: #2563eb;
          color: #ffffff;
          border-color: #2563eb;
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(37, 99, 235, 0.3);
        }

        .final-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 64px rgba(37, 99, 235, 0.6);
        }

        @media (max-width: 768px) {
          .themes-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          
          .theme-card {
            padding: 32px;
            min-height: 280px;
          }
        }

        @media (max-width: 480px) {
          .theme-card {
            padding: 24px;
          }
        }
      `}</style>
    </div>
  );
}

// Trust indicators for hero section
const trustIndicators = [
  "Evidence-based methodology",
  "Publicly available data only",
  "Independent evaluation"
];

// Enhanced evaluation themes
const evaluationThemes = [
  {
    icon: <Shield size={32} />,
    title: 'Governance & Oversight',
    description: 'Board oversight, ethics committees, clear policies, and leadership accountability for AI decisions and outcomes.',
    subtitle: 'Leadership commitment and institutional frameworks',
    color: '#2563eb',
    colorSecondary: '#1d4ed8'
  },
  {
    icon: <Eye size={32} />,
    title: 'Transparency & Disclosure',
    description: 'Public documentation of AI systems, model cards, impact assessments, and clear explanations of automated decision-making.',
    subtitle: 'Public reporting and system documentation',
    color: '#0ea5e9',
    colorSecondary: '#0284c7'
  },
  {
    icon: <Scale size={32} />,
    title: 'Fairness & Risk Management',
    description: 'Systematic bias testing, fairness audits, risk assessment processes, and documented mitigation strategies.',
    subtitle: 'Testing, measurement, and risk mitigation',
    color: '#10b981',
    colorSecondary: '#059669'
  },
  {
    icon: <Users size={32} />,
    title: 'Privacy & Social Impact',
    description: 'Data protection practices, user consent mechanisms, privacy-by-design principles, and consideration of societal implications.',
    subtitle: 'User protection and societal responsibility',
    color: '#8b5cf6',
    colorSecondary: '#7c3aed'
  }
];

// Target audiences
const audiences = [
  {
    icon: <Building size={24} />,
    title: 'Investors & Analysts',
    description: 'Evaluate AI governance risks and opportunities in potential investments or portfolio companies.',
    useCase: 'Due diligence and risk assessment',
    color: '#2563eb'
  },
  {
    icon: <FileText size={24} />,
    title: 'Policy Makers',
    description: 'Access independent data to inform AI regulation, oversight policies, and public sector decisions.',
    useCase: 'Evidence-based policy development',
    color: '#059669'
  },
  {
    icon: <Lightbulb size={24} />,
    title: 'AI Practitioners',
    description: 'Benchmark your organization against industry practices and identify areas for improvement.',
    useCase: 'Internal benchmarking and best practices',
    color: '#7c3aed'
  },
  {
    icon: <Star size={24} />,
    title: 'Researchers & Advocates',
    description: 'Leverage standardized evaluations for academic research, advocacy work, and public accountability efforts.',
    useCase: 'Research and public advocacy',
    color: '#dc2626'
  }
];

// Methodology transparency points
const methodologyPoints = [
  {
    title: 'Public Data Only',
    description: 'We evaluate what companies publicly disclose, creating incentives for transparency.'
  },
  {
    title: 'Evolving Framework',
    description: 'Our methodology updates as AI governance standards and best practices mature.'
  },
  {
    title: 'Governance Focus',
    description: 'We assess frameworks and policies, not technical performance or model accuracy.'
  }
];

// Coming soon features with detailed descriptions
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