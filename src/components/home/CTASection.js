import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from '../Container';

function CTASection({ isVisible }) {
  return (
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
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
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

            <div className="final-cta-row" style={{
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
                Company Directory
                <ArrowRight style={{ marginLeft: '12px' }} size={18} />
              </Link>

              <Link
                to="/methodology"
                className="methodology-link"
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
                Methodology
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CTASection;
