import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from '../Container';

function HeroSection({ companyCount }) {
  return (
    <section
      className="hero-section min-h-[75vh] flex items-center justify-center relative"
      style={{
        background: 'linear-gradient(135deg, #0a0f1c 0%, #1a202c 25%, #2d3748 100%)'
      }}
    >
      <Container size="wide">
        <div className="relative z-10 max-w-[800px] mx-auto text-center py-20 md:py-24">

          <h1
            className="text-[2rem] sm:text-4xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8 text-white leading-[1.15] sm:leading-[1.1] tracking-tight animate-slideInUp"
          >
            See Which Companies
            <span className="hidden sm:inline">{' '}Take</span>
            <span className="block mt-1 sm:mt-2 md:mt-4 text-white">
              <span className="sm:hidden">Take </span>AI Responsibility Seriously
            </span>
          </h1>

          <p
            className="text-lg sm:text-xl md:text-2xl text-white/95 max-w-[640px] mx-auto mb-8 md:mb-10 leading-relaxed animate-slideInUp"
            style={{ animationDelay: '0.1s' }}
          >
            Independent evaluations of AI governance practices based on publicly available evidence.
          </p>

          {/* CTAs */}
          <div
            className="hero-buttons flex flex-col items-stretch max-w-xs mx-auto sm:max-w-none sm:flex-row sm:items-center gap-3 sm:gap-5 mb-8 md:mb-10 justify-center animate-slideInUp"
            style={{ animationDelay: '0.2s' }}
          >
            <Link
              to="/companies"
              className="inline-flex items-center justify-center text-white font-bold no-underline rounded-xl transition-all duration-300 relative overflow-hidden text-sm sm:text-lg py-3 px-6 sm:py-5 sm:px-10"
              style={{
                background: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
                boxShadow: '0 8px 32px rgba(37, 99, 235, 0.4)'
              }}
            >
              View Company Evaluations
              <ArrowRight className="ml-2 sm:ml-3" size={18} />
            </Link>

            <Link
              to="/methodology"
              className="inline-flex items-center justify-center text-white font-semibold no-underline rounded-xl transition-all duration-300 text-sm sm:text-base py-3 px-6 sm:py-5 sm:px-8"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                border: '2px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              Our Methodology
            </Link>
          </div>

          {/* Proof strip */}
          <div
            className="flex flex-wrap gap-x-4 gap-y-2 text-sm md:text-base text-white/70 justify-center animate-slideInUp"
            style={{ animationDelay: '0.3s' }}
          >
            <span><span className="font-semibold">{companyCount}</span> companies evaluated</span>
            <span className="hidden sm:inline">·</span>
            <span><span className="font-semibold">7</span> pillars</span>
            <span className="hidden sm:inline">·</span>
            <span><span className="font-semibold">14</span>-point scale</span>
            <span className="hidden sm:inline">·</span>
            <span>Public evidence only</span>
          </div>
        </div>
      </Container>

      {/* Sharp bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-50" />
    </section>
  );
}

export default HeroSection;
