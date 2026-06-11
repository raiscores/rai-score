import Container from '../Container';
import { audienceItems } from '../../data/homeContent';

/**
 * Single quiet line naming the audiences — sits at the foot of the
 * featured section (same slate-50 background, hairline above).
 */
function AudienceStrip() {
  return (
    <section id="audience" className="bg-slate-50 pb-10">
      <Container size="wide">
        <div className="max-w-5xl mx-auto border-t border-gray-200 pt-6 flex flex-wrap items-center gap-x-8 gap-y-3">
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">
            Built for
          </span>
          {audienceItems.map((item) => (
            <span key={item.title} className="flex items-center gap-2 text-sm text-slate-600">
              <span className="text-slate-400 [&>svg]:w-4 [&>svg]:h-4">{item.icon}</span>
              {item.title}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}

export default AudienceStrip;
