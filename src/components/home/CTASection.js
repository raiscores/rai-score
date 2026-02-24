import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function CTASection({ isVisible, companyCount }) {
  return (
    <section
      id="cta"
      data-reveal
      className="py-8 border-t border-white/10"
      style={{
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 px-6 text-center">
        <p className="text-white/80 text-base m-0">
          Evaluating {companyCount} Fortune 500 companies across 7 pillars.
        </p>
        <Link
          to="/companies"
          className="inline-flex items-center bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
        >
          Explore All Evaluations
          <ArrowRight className="ml-2" size={16} />
        </Link>
      </div>
    </section>
  );
}

export default CTASection;
