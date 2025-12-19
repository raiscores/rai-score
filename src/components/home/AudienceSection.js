import { Users } from 'lucide-react';
import Container from '../Container';
import { audiences } from '../../data/homeContent';

function AudienceSection({ isVisible }) {
  return (
    <section
      id="audiences"
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
                padding: '20px 30px 30px 30px',
                backgroundColor: '#f8fafc',
                borderRadius: '20px',
                border: '2px solid #e2e8f0',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                position: 'relative'
              }}
              className="audience-card"
            >
              {/* Top: icon and title */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                marginTop: '8px',
                marginBottom: '10px',
                zIndex: 1
              }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  backgroundColor: audience.color,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff'
                }}>
                  {audience.icon}
                </div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  margin: 0,
                  color: '#0f172a'
                }}>
                  {audience.title}
                </h3>
              </div>

              {/* Bottom: description & use case, left-aligned */}
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-start',
                textAlign: 'left',
                zIndex: 1
              }}>
                <p style={{
                  fontSize: '15px',
                  color: '#64748b',
                  lineHeight: '1.6',
                  marginBottom: '18px',
                  maxWidth: '300px'
                }}>
                  {audience.description}
                </p>
                <div style={{
                  fontSize: '13px',
                  color: audience.color,
                  textAlign: 'left',
                  fontWeight: '600'
                }}>
                  {audience.useCase}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default AudienceSection;
