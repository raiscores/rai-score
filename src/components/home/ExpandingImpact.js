import Container from '../Container';
import { expandingImpactFeatures } from '../../data/homeContent';

function ExpandingImpact({ isVisible }) {
  return (
    <section
      id="expanding-impact"
      data-reveal
      style={{
        padding: 'clamp(80px, 10vw, 120px) 0',
        backgroundColor: '#ffffff',
        position: 'relative',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
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
            Expanding Our Impact: The Future of AI Accountability
          </h3>
          <p style={{
            fontSize: '20px',
            color: '#64748b',
            maxWidth: '900px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            We're continuously expanding our coverage and analysis. Check back often to see what's new.
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
          {expandingImpactFeatures.map((feature, index) => (
            <div
              key={feature.title}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                padding: '20px 30px 20px 30px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                border: '1px solid rgba(229, 231, 235, 0.8)',
                position: 'relative',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: `${index * 0.1}s`,
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
              }}
              className="expanding-impact-card"
            >
              {/* Icon and Title Row */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                marginTop: '4px',
                marginBottom: '10px'
              }}>
                <div style={{
                  fontSize: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {feature.icon}
                </div>
                <h4 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  margin: 0,
                  color: '#1e293b'
                }}>
                  {feature.title}
                </h4>
              </div>
              {/* Description left-aligned vertically */}
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}>
                <p style={{
                  fontSize: '16px',
                  color: '#64748b',
                  lineHeight: '1.6',
                  margin: 0,
                  textAlign: 'left'
                }}>
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ExpandingImpact;
