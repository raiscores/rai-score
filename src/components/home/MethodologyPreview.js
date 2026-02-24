import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from '../Container';
import { evaluationThemes } from '../../data/homeContent';

function MethodologyPreview({ isVisible }) {
  return (
    <section
      id="methodology-preview"
      data-reveal
      className="py-12 md:py-16 bg-white"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <Container size="wide">
        <div className="relative z-10">
          {/* Section header */}
          <div className="text-center mb-8 max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-slate-900 tracking-tight">
              Core Themes of AI Accountability
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              We evaluate companies across seven pillars grouped into four themes, using a 14-point evidence-based framework. Only publicly disclosed information counts.
            </p>
          </div>

          {/* Themes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 max-w-[1000px] mx-auto">
            {evaluationThemes.map((theme, index) => (
              <div
                key={index}
                className="theme-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  height: '100%',
                  padding: '16px 20px 20px 20px',
                  borderRadius: '12px',
                  background: '#ffffff',
                  border: '1px solid #d1d5db'
                }}
              >
                {/* Icon and title */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                    {theme.icon}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 m-0">
                    {theme.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed m-0">
                  {theme.description}
                </p>
              </div>
            ))}
          </div>

          {/* Methodology CTA */}
          <div className="text-center mt-8">
            <Link
              to="/methodology"
              className="inline-flex items-center text-blue-600 font-semibold text-base hover:text-blue-700 transition-colors"
            >
              View Complete Methodology
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default MethodologyPreview;
