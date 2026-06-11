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

function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Terms of Service | RAI Scores</title>
        <meta
          name="description"
          content="Terms of use for RAI Scores: what our evaluations are, how you may use them, and the limits of what they represent."
        />
      </Helmet>

      {/* Hero */}
      <section className="bg-band-hero relative py-12 md:py-16">
        <Container size="wide">
          <div className="max-w-[800px] mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 leading-tight">
              Terms of Service
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
              By using RAI Scores, you agree to these terms. They're short and in
              plain language — the summary is: our ratings are independent,
              evidence-based opinions offered for information, you're welcome to
              cite them with attribution, and you shouldn't treat them as
              professional advice.
            </p>

            <Section title="What RAI Scores is">
              <p>
                RAI Scores publishes independent evaluations of how companies
                approach responsible AI governance, based exclusively on publicly
                available evidence. Scores are produced by a documented,
                deterministic methodology described on our{' '}
                <Link to="/methodology" className="text-blue-600 hover:text-blue-700 font-medium">
                  Methodology
                </Link>{' '}
                page.
              </p>
              <p>
                A score reflects what a company has publicly disclosed at the
                time of evaluation — not its internal capabilities, intentions,
                or future behavior. A low score can mean weak governance or
                simply weak disclosure; the methodology page explains how to
                interpret results.
              </p>
            </Section>

            <Section title="Not professional advice">
              <p>
                Nothing on this site is investment, legal, procurement, or other
                professional advice. Scores and findings are informational
                opinions derived from public evidence. Don't make investment or
                business decisions based solely on this site; do your own
                diligence.
              </p>
            </Section>

            <Section title="Accuracy and corrections">
              <p>
                We work to keep evaluations accurate and current, but public
                evidence changes and automated pipelines have limits. The site is
                provided on an "as is" basis without warranties of any kind,
                express or implied, including accuracy, completeness, or fitness
                for a particular purpose.
              </p>
              <p>
                If you believe a rating or finding contains an error, email{' '}
                <a
                  href="mailto:info@raiscores.com?subject=Correction%20report"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  info@raiscores.com
                </a>{' '}
                with the company name and the issue. We review correction reports
                and update evaluations when the evidence supports it.
              </p>
            </Section>

            <Section title="Use and attribution">
              <p>
                You may reference, quote, and share our scores and findings —
                including in articles, research, and reports — with attribution
                to "RAI Scores" and, where practical, a link to the relevant
                page. You may not republish the site wholesale, misrepresent
                scores, or present our content as your own.
              </p>
            </Section>

            <Section title="Intellectual property">
              <p>
                The RAI Scores name, site design, methodology text, and published
                evaluations are our intellectual property. The underlying public
                documents we cite belong to their respective owners; links to
                them are provided as evidence.
              </p>
            </Section>

            <Section title="Limitation of liability">
              <p>
                To the maximum extent permitted by law, RAI Scores and its
                operators are not liable for any damages arising from use of this
                site or reliance on its content.
              </p>
            </Section>

            <Section title="Changes">
              <p>
                We may update these terms; changes appear on this page with a new
                date at the top. Continued use of the site after a change means
                you accept the updated terms.
              </p>
            </Section>

            <Section title="Contact">
              <p>
                Questions about these terms:{' '}
                <a
                  href="mailto:info@raiscores.com"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  info@raiscores.com
                </a>
                . See also our <Link to="/privacy" className="text-blue-600 hover:text-blue-700 font-medium">Privacy Policy</Link>.
              </p>
            </Section>
          </div>
        </Container>
      </div>
    </div>
  );
}

export default Terms;
