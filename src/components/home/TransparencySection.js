import { Info } from 'lucide-react';
import Container from '../Container';

function TransparencySection({ isVisible }) {
  return (
    <section
      id="transparency"
      data-reveal
      className="py-10 md:py-12 bg-white"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <Container>
        {/* Section heading */}
        <h2 className="text-2xl font-bold text-slate-900 text-center mb-6">
          How to Interpret RAI Scores
        </h2>

        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-xl border border-gray-300 p-6 md:p-8">
            {/* Intro line */}
            <div className="flex items-center gap-2.5 mb-6 pb-5 border-b border-gray-200">
              <Info size={18} className="text-slate-400 shrink-0" />
              <p className="text-sm text-slate-600 m-0 leading-relaxed">
                RAI Scores evaluate publicly disclosed governance practices — not internal capabilities or intentions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left column */}
              <div>
                <h4 className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-4">
                  What scores reflect
                </h4>
                <ul className="text-sm text-slate-700 leading-relaxed space-y-3 list-none p-0 m-0">
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-500 mt-0.5 text-base leading-none">&#8226;</span>
                    <span>Public disclosures and transparency practices</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-500 mt-0.5 text-base leading-none">&#8226;</span>
                    <span>Published governance policies and frameworks</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-500 mt-0.5 text-base leading-none">&#8226;</span>
                    <span>Documented accountability mechanisms and external commitments</span>
                  </li>
                </ul>
              </div>

              {/* Right column */}
              <div className="border-t border-gray-200 pt-6 md:border-t-0 md:pt-0 md:border-l md:border-gray-200 md:pl-8">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                  What scores do not reflect
                </h4>
                <ul className="text-sm text-slate-600 leading-relaxed space-y-3 list-none p-0 m-0">
                  <li className="flex items-start gap-2.5">
                    <span className="text-slate-400 mt-0.5 text-base leading-none">&#8226;</span>
                    <span>Internal model performance or accuracy metrics</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-slate-400 mt-0.5 text-base leading-none">&#8226;</span>
                    <span>Private implementations not publicly documented</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-slate-400 mt-0.5 text-base leading-none">&#8226;</span>
                    <span>Ethical intent or corporate culture</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default TransparencySection;
