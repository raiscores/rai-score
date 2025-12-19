import { Link } from 'react-router-dom';
import { Zap, ArrowRight } from 'lucide-react';
import Container from '../Container';
import { evaluationThemes } from '../../data/homeContent';

function MethodologyPreview({ isVisible }) {
  return (
    <section
      id="methodology-preview"
      data-reveal
      style={{
        padding: 'clamp(80px, 10vw, 120px) 0',
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
        position: 'relative',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
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
          <div
            className="themes-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(275px, 1fr))',
              gap: '40px',
              maxWidth: '1440px',
              margin: '0 auto'
            }}
          >
            {evaluationThemes.map((theme, index) => (
              <div
                key={index}
                className="theme-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  height: '100%',
                  position: 'relative',
                  padding: '20px 30px 40px 30px',
                  borderRadius: '24px',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                  border: '2px solid #e2e8f0',
                  overflow: 'hidden'
                }}
              >
                {/* Card header bar */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '6px',
                    background: `linear-gradient(135deg, ${theme.color}, ${theme.colorSecondary})`,
                    borderRadius: '20px 20px 0 0'
                  }}
                />

                {/* Top: icon and title */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    marginTop: '18px',
                    marginBottom: '15px',
                    zIndex: 1
                  }}
                >
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      background: `linear-gradient(135deg, ${theme.color}15, ${theme.colorSecondary}10)`,
                      borderRadius: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: theme.color,
                      boxShadow: `0 4px 16px ${theme.color}20`
                    }}
                  >
                    {theme.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: '20px',
                      fontWeight: '700',
                      margin: 0,
                      color: '#0f172a'
                    }}
                  >
                    {theme.title}
                  </h3>
                </div>

                {/* Bottom: description & button, left-aligned */}
                <div
                  style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    zIndex: 1
                  }}
                >
                  <p style={{
                    fontSize: '16px',
                    color: '#64748b',
                    marginBottom: '20px',
                    maxWidth: '350px',
                    marginLeft: 0
                  }}>
                    {theme.description}
                  </p>
                  <div style={{
                    fontSize: '14px',
                    color: theme.color,
                    fontWeight: '600',
                    padding: '10px 20px',
                    backgroundColor: `${theme.color}08`,
                    borderRadius: '8px',
                    border: `1px solid ${theme.color}20`,
                    textAlign: 'center',
                    width: 'fit-content'
                  }}>
                    {theme.subtitle}
                  </div>
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
  );
}

export default MethodologyPreview;
