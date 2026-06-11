import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Container from '../components/Container';

const LAST_UPDATED = 'June 11, 2026';

function Section({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold text-slate-900 mb-3">{title}</h2>
      <div className="space-y-4 text-base text-slate-700 leading-relaxed">
        {children}
      </div>
    </section>
  );
}

function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Privacy Policy | RAI Scores</title>
        <meta
          name="description"
          content="How RAI Scores handles analytics, cookies, and data. We collect no personal information and require no accounts."
        />
      </Helmet>

      {/* Hero */}
      <section className="bg-band-hero relative py-12 md:py-16">
        <Container size="wide">
          <div className="max-w-[800px] mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
              Privacy Policy
            </h1>
            <p className="text-sm text-white/60 font-mono m-0">
              Last updated: {LAST_UPDATED}
            </p>
          </div>
        </Container>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-50" />
      </section>

      {/* Body */}
      <div className="py-12 md:py-16">
        <Container size="wide">
          <div className="max-w-3xl mx-auto">
            <p className="text-base text-slate-700 leading-relaxed mb-10">
              RAI Scores is a free, public resource. You don't need an account to
              use it, we never ask for personal information, and we don't sell
              data to anyone. This page explains the little that does happen when
              you visit.
            </p>

            <Section title="What we collect">
              <p>
                We do not collect names, email addresses, or any other personal
                information from visitors. There are no accounts, sign-up forms,
                or tracking pixels beyond the analytics described below.
              </p>
            </Section>

            <Section title="Analytics">
              <p>
                We use Google Analytics (GA4) to understand site usage in
                aggregate — which pages are visited, roughly where traffic comes
                from, and what devices are used. Google Analytics sets cookies in
                your browser to distinguish repeat visits. We use this data only
                to understand how the site is used and to improve it.
              </p>
              <p>
                You can opt out of Google Analytics across all websites with the{' '}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Google Analytics opt-out browser add-on
                </a>
                , or by blocking analytics cookies in your browser settings. The
                site works fully without them.
              </p>
            </Section>

            <Section title="Hosting">
              <p>
                The site is hosted on Vercel. Like most hosting providers, Vercel
                maintains standard server logs (IP addresses, request times) for
                security and operations. See the{' '}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Vercel privacy policy
                </a>{' '}
                for details.
              </p>
            </Section>

            <Section title="Data about companies">
              <p>
                The evaluations published on this site concern companies, not
                people. All evidence used in scoring comes from publicly
                available sources — company websites, published policies,
                regulatory filings, and similar public documents. We do not
                collect or publish personal data about individuals.
              </p>
            </Section>

            <Section title="Email">
              <p>
                If you email us (for example to request an evaluation or report a
                correction), we use your message and address only to respond. We
                don't add you to mailing lists or share your address.
              </p>
            </Section>

            <Section title="External links">
              <p>
                Company pages link to external sources used as evidence. Those
                sites have their own privacy practices, which we don't control.
              </p>
            </Section>

            <Section title="Changes">
              <p>
                If our practices change, we'll update this page and the date at
                the top. Material changes (for example, adding any new analytics
                or data collection) will be reflected here before they take
                effect.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                Questions about this policy:{' '}
                <a
                  href="mailto:info@raiscores.com"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  info@raiscores.com
                </a>
                . See also our <Link to="/terms" className="text-blue-600 hover:text-blue-700 font-medium">Terms of Service</Link>.
              </p>
            </Section>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Privacy;
