import Container from '../Container';
import { audienceItems } from '../../data/homeContent';

function AudienceStrip({ isVisible }) {
  return (
    <section
      id="audience"
      data-reveal
      className="bg-slate-50 py-10 md:py-12"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <Container>
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-8">
          Who Uses RAI Scores
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {audienceItems.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3 rounded-lg border border-gray-200 bg-slate-50/50 p-4"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-slate-900 leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default AudienceStrip;
