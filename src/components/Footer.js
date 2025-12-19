import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer
      className="text-slate-50 pt-16 pb-8 px-8 text-[0.95rem]"
      style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Brand & Mission */}
        <div>
          <h2 className="text-2xl font-bold mb-4">
            RAI Scores
          </h2>
          <p className="leading-relaxed text-slate-300">
            Making AI accountability transparent, accessible, and actionable for everyone.
          </p>
          <div className="flex gap-4 mt-6">
            {/* Social Icon Buttons */}
            {[
              { icon: '𝕏', href: '#', label: 'X (Twitter)' },
              { icon: '💼', href: '#', label: 'LinkedIn' },
              { icon: '📧', href: 'mailto:info@raiscores.com', label: 'Email' }
            ].map(({ icon, href, label }) => (
              <a
                key={icon}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-11 h-11 flex items-center justify-center rounded-full bg-white/10 text-slate-100 no-underline transition-colors duration-300 hover:bg-white/20"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">
            Quick Links
          </h4>
          <ul className="list-none p-0 m-0 space-y-2">
            <li><Link to="/companies" className="text-slate-100 no-underline transition-colors duration-200 hover:text-white">Browse Companies</Link></li>
            <li><Link to="/methodology" className="text-slate-100 no-underline transition-colors duration-200 hover:text-white">Our Methodology</Link></li>
            <li><Link to="/about" className="text-slate-100 no-underline transition-colors duration-200 hover:text-white">About Us</Link></li>
            <li><Link to="/request" className="text-slate-100 no-underline transition-colors duration-200 hover:text-white">Request Evaluation</Link></li>
            <li><Link to="/blog" className="text-slate-100 no-underline transition-colors duration-200 hover:text-white">Blog</Link></li>
            <li><Link to="/faq" className="text-slate-100 no-underline transition-colors duration-200 hover:text-white">FAQ</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold mb-4">
            Get in Touch
          </h4>
          <p className="mb-2 text-slate-100">
            📧 info@raiscores.com
          </p>
          <p className="text-slate-300 leading-relaxed">
            Have questions about our methodology or want to request a company evaluation? We'd love to hear from you.
          </p>
        </div>
      </div>

      {/* Footer bottom bar */}
      <div className="border-t border-white/10 mt-12 pt-6 flex flex-wrap justify-between items-center text-sm text-slate-400">
        <span>© {new Date().getFullYear()} RAI Scores - Responsible AI Scorecard. All rights reserved.</span>
        <div className="flex gap-6">
          <Link to="/privacy" className="text-slate-100 no-underline transition-colors duration-200 hover:text-white">Privacy Policy</Link>
          <Link to="/terms" className="text-slate-100 no-underline transition-colors duration-200 hover:text-white">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
