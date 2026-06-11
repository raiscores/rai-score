import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Container from '../Container';

function HeroSection({ companyCount }) {
  return (
    <section className="hero-section bg-band-hero min-h-[75vh] flex items-center justify-center relative">
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
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white font-semibold no-underline rounded-lg transition-colors duration-150 text-sm sm:text-base py-3 px-6 sm:py-3.5 sm:px-7"
            >
              View Company Evaluations
              <ArrowRight className="ml-2" size={18} />
            </Link>

            <Link
              to="/methodology"
              className="inline-flex items-center justify-center bg-white/10 hover:bg-white/15 border border-white/25 hover:border-white/40 text-white font-medium no-underline rounded-lg transition-colors duration-150 text-sm sm:text-base py-3 px-6 sm:py-3.5 sm:px-6"
            >
              Our Methodology
            </Link>
          </div>

          {/* Proof strip */}
          <div
            className="flex flex-wrap gap-x-4 gap-y-2 text-sm md:text-base text-white/70 justify-center animate-slideInUp"
            style={{ animationDelay: '0.3s' }}
          >
            <span><span className="font-mono font-medium text-white/90">{companyCount}</span> companies evaluated</span>
            <span className="hidden sm:inline">·</span>
            <span><span className="font-mono font-medium text-white/90">7</span> pillars</span>
            <span className="hidden sm:inline">·</span>
            <span><span className="font-mono font-medium text-white/90">14</span>-point scale</span>
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
