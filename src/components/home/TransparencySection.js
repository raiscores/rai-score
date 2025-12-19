import { Info } from 'lucide-react';
import Container from '../Container';
import { methodologyPoints } from '../../data/homeContent';

function TransparencySection({ isVisible }) {
  return (
    <section
      id="transparency"
      data-reveal
      style={{
        padding: 'clamp(60px, 8vw, 100px) 0',
        background: 'linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
        position: 'relative',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
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
  );
}

export default TransparencySection;
