import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, BarChart3 } from 'lucide-react';
import Container from '../Container';
import { trustIndicators } from '../../data/homeContent';

function HeroSection({ scrollY }) {
  return (
    <section className="hero-section" style={{
      background: `
        linear-gradient(135deg, #0a0f1c 0%, #1a202c 25%, #2d3748 100%),
        radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(124, 58, 237, 0.1) 0%, transparent 50%)
      `,
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
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
        pointerEvents: 'none',
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
        backdropFilter: 'blur(20px)',
        pointerEvents: 'none'
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
        animation: 'pulse 8s ease-in-out infinite',
        pointerEvents: 'none'
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
        animation: 'float 15s ease-in-out infinite reverse',
        pointerEvents: 'none'
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
              Independent evaluations of AI governance practices based on publicly available evidence.
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
          <div className="hero-buttons" style={{
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
  );
}

export default HeroSection;
