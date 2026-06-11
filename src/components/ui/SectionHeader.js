import React from 'react';

/**
 * Left-aligned section header with mono eyebrow — the site-wide pattern
 * (homepage, methodology, about). Centered headers are reserved for heroes.
 */
function SectionHeader({ eyebrow, title, children, narrow = false, className = '' }) {
  return (
    <div className={`mb-10 ${narrow ? '' : 'max-w-3xl'} ${className}`}>
      <div className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400 mb-2">
        {eyebrow}
      </div>
      <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">{title}</h2>
      {children && <p className="text-slate-600 m-0">{children}</p>}
    </div>
  );
}

export default SectionHeader;
