import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

function CTASection({ companyCount }) {
  return (
    <section id="cta" className="bg-band-dark py-8 border-t border-white/10">
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
