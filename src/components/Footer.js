import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Flag } from 'lucide-react';

const siteLinks = [
  { to: '/companies', label: 'Browse Companies' },
  { to: '/methodology', label: 'Methodology' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Request an Evaluation' }
];

function FooterHeading({ children }) {
  return (
    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4">
      {children}
    </h4>
  );
}

function Footer() {
  return (
    <footer className="bg-band-dark text-slate-50">
      <div className="container-wide px-6 sm:px-8 lg:px-10 pt-14 pb-8">
        {/* Main row */}
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1.2fr] gap-10 md:gap-8">
          {/* Brand */}
          <div className="max-w-sm">
            <p className="text-lg font-bold text-white m-0 mb-3">RAI Scores</p>
            <p className="text-sm text-slate-300 leading-relaxed m-0">
              Independent ratings of how Fortune 500 companies govern AI —
              built exclusively on public, verifiable evidence.
            </p>
          </div>

          {/* Site links */}
          <div>
            <FooterHeading>Site</FooterHeading>
            <ul className="list-none p-0 m-0 space-y-2.5">
              {siteLinks.map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-slate-300 no-underline transition-colors duration-150 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & integrity */}
          <div>
            <FooterHeading>Contact &amp; Integrity</FooterHeading>
            <ul className="list-none p-0 m-0 space-y-2.5">
              <li>
                <a
                  href="mailto:info@raiscores.com"
                  className="inline-flex items-center gap-2 text-sm text-slate-300 no-underline transition-colors duration-150 hover:text-white"
                >
                  <Mail className="w-4 h-4 text-slate-500" />
                  info@raiscores.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@raiscores.com?subject=Correction%20report"
                  className="inline-flex items-center gap-2 text-sm text-slate-300 no-underline transition-colors duration-150 hover:text-white"
                >
                  <Flag className="w-4 h-4 text-slate-500" />
                  Report a correction
                </a>
              </li>
            </ul>
            <p className="text-xs text-slate-500 leading-relaxed mt-4 m-0">
              Spotted an error in a rating? Corrections are reviewed against the
              public evidence and applied when warranted.
            </p>
          </div>
        </div>

        {/* Legal bar */}
        <div className="border-t border-white/10 mt-10 pt-5 flex flex-col sm:flex-row gap-3 sm:gap-6 justify-between items-start sm:items-center">
          <span className="font-mono text-xs text-slate-500">
            © {new Date().getFullYear()} RAI Scores · Responsible AI Scorecard
          </span>
          <div className="flex gap-5">
            <Link
              to="/privacy"
              className="font-mono text-xs text-slate-400 no-underline transition-colors duration-150 hover:text-white"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="font-mono text-xs text-slate-400 no-underline transition-colors duration-150 hover:text-white"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
