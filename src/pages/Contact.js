import React from 'react';
import { Mail, ArrowLeft, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// Mock Container component
const Container = ({ children, size = 'default' }) => {
  const maxWidths = {
    default: '1400px',
    wide: '1400px',
    narrow: '700px'
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

function Contact() {
  return (
    <div style={{ 
      fontFamily: 'Inter, SF Pro Display, system-ui, -apple-system, sans-serif',
      color: '#0f172a',
      lineHeight: '1.6',
      backgroundColor: '#ffffff'
    }}>
      {/* Page Title */}
      <Helmet>
        <title>Contact - RAI Score</title>
        <meta name="description" content="Contact RAI Score for inquiries about our AI accountability evaluations." />
      </Helmet>
      
      {/* HERO SECTION */}
      <section style={{
        background: `
          linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%),
          radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%)
        `,
        padding: 'clamp(80px, 10vw, 120px) 0 clamp(60px, 8vw, 80px)',
        position: 'relative'
      }}>
        {/* Enhanced background elements */}
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '100px',
          height: '100px',
          background: 'rgba(37, 99, 235, 0.08)',
          borderRadius: '20px',
          opacity: 0.8,
          boxShadow: '0 8px 32px rgba(37, 99, 235, 0.1)'
        }} />
        
        <div style={{
          position: 'absolute',
          bottom: '15%',
          left: '8%',
          width: '60px',
          height: '60px',
          background: 'rgba(168, 85, 247, 0.06)',
          borderRadius: '50%',
          opacity: 0.6
        }} />
        
        <Container size="narrow">
          <div style={{
            textAlign: 'center',
            position: 'relative',
            zIndex: 1
          }}>
            {/* Icon indicator with micro-animation */}
            <div style={{
              width: '64px',
              height: '64px',
              backgroundColor: '#2563eb',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
              color: '#ffffff',
              boxShadow: '0 8px 24px rgba(37, 99, 235, 0.2)',
              animation: 'iconPulse 2s ease-out'
            }}>
              <MessageSquare size={28} />
            </div>
            
            <h1 style={{
              fontSize: 'clamp(36px, 6vw, 48px)',
              fontWeight: '800',
              marginBottom: '20px',
              color: '#0f172a',
              letterSpacing: '-0.03em'
            }}>
              Get in Touch
            </h1>
            
            <p style={{
              fontSize: '20px',
              color: '#64748b',
              maxWidth: '500px',
              margin: '0 auto',
              lineHeight: '1.6'
            }}>
              Questions or suggestions about our AI accountability evaluations? We'd like to hear from you.
            </p>
          </div>
        </Container>
      </section>

      {/* CONTACT SECTION */}
      <section style={{
        padding: 'clamp(80px, 10vw, 100px) 0',
        backgroundColor: '#ffffff'
      }}>
        <Container size="wide">
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            alignItems: 'start',
            maxWidth: '900px',
            margin: '0 auto'
          }}>
            
            {/* Main Email Section */}
            <div style={{
              textAlign: 'center'
            }}>
              <div style={{
                width: '56px',
                height: '56px',
                backgroundColor: '#2563eb',
                borderRadius: '14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                color: '#ffffff'
              }}>
                <Mail size={26} />
              </div>
              
              <h2 style={{
                fontSize: '28px',
                fontWeight: '700',
                marginBottom: '16px',
                color: '#0f172a'
              }}>
                Send Us an Email
              </h2>
              
              <p style={{
                fontSize: '18px',
                color: '#64748b',
                marginBottom: '32px',
                lineHeight: '1.5'
              }}>
                For inquiries, company suggestions, or partnership opportunities.
              </p>
              
              <a 
                href="mailto:info@raiscores.com"
                aria-label="Email RAI Score"
                style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                  color: 'white',
                  padding: '16px 32px',
                  borderRadius: '24px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '16px',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 16px rgba(37, 99, 235, 0.2)'
                }}
                className="email-button"
              >
                info@raiscores.com
              </a>
            </div>

            {/* Context Section */}
            <div style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
              borderRadius: '16px',
              padding: '40px 32px',
              border: '1px solid #e2e8f0',
              textAlign: 'center',
              height: 'fit-content',
              transition: 'all 0.3s ease'
            }}
            className="partnership-card">
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                marginBottom: '20px'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#059669',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff'
                }}>
                  🤝
                </div>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  margin: 0,
                  color: '#0f172a'
                }}>
                  Partnership Opportunities
                </h3>
              </div>
              
              <p style={{
                fontSize: '15px',
                color: '#64748b',
                lineHeight: '1.6',
                margin: '0 0 16px 0'
              }}>
                We're systematically evaluating Fortune 500 companies for AI governance practices.
              </p>
              
              <p style={{
                fontSize: '16px',
                fontWeight: '600',
                color: '#2563eb',
                lineHeight: '1.5',
                margin: 0
              }}>
                Have a partnership idea or want to collaborate? Reach out—we love new ideas.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* FOOTER */}
      <section style={{
        padding: '40px 0 60px',
        backgroundColor: '#f8fafc',
        textAlign: 'center'
      }}>
        <Container>
          <Link 
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              color: '#2563eb',
              fontSize: '16px',
              fontWeight: '500',
              textDecoration: 'none',
              transition: 'all 0.2s ease'
            }}
            className="back-link"
          >
            <ArrowLeft style={{ marginRight: '8px' }} size={18} />
            Back to Homepage
          </Link>
        </Container>
      </section>

      {/* Styles */}
      <style>{`
        * {
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
        }

        .email-button:hover {
          transform: translateY(-1px);
          background: linear-gradient(135deg, #1d4ed8, #1e40af);
          box-shadow: 0 8px 24px rgba(37, 99, 235, 0.3);
        }

        .email-button:focus {
          outline: 3px solid #60a5fa;
          outline-offset: 2px;
        }

        .contact-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
        }
        
        .back-link:hover {
          color: #1d4ed8;
        }

        .back-link:focus {
          outline: 2px solid #2563eb;
          outline-offset: 2px;
          border-radius: 4px;
        }

        @keyframes iconPulse {
          0% { 
            transform: scale(1);
            box-shadow: 0 8px 24px rgba(37, 99, 235, 0.2);
          }
          50% { 
            transform: scale(1.05);
            box-shadow: 0 12px 32px rgba(37, 99, 235, 0.3);
          }
          100% { 
            transform: scale(1);
            box-shadow: 0 8px 24px rgba(37, 99, 235, 0.2);
          }
        }

        @media (max-width: 640px) {
          section:first-of-type {
            padding: 60px 0 40px !important;
          }
          
          section:nth-of-type(2) {
            padding: 60px 0 !important;
          }
          
          section:nth-of-type(2) > div > div {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
            max-width: 500px !important;
            margin: 0 auto !important;
          }
        }
      `}</style>
    </div>
  );
}

export default Contact;