import React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const ComingSoon = () => {
  return (
    <>
      <Helmet>
        <title>Coming Soon | RAI Scores</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="description" content="This section of RAI Scores is under construction." />
      </Helmet>

      <div className="min-h-screen bg-white flex items-start justify-center pt-28 pb-20 md:pt-36 md:pb-28 px-5">
        <div className="w-full max-w-xl mx-auto text-center">
          <div className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400 mb-3">
            Under construction
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            Coming soon
          </h1>
          <p className="text-lg text-slate-600 mb-10">
            This page isn't live yet. In the meantime, browse the company index
            or get in touch.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/companies"
              className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold no-underline rounded-lg transition-colors duration-150 text-sm py-3 px-6"
            >
              Browse the index
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center text-sm font-medium text-slate-700 no-underline border border-slate-300 hover:border-slate-400 hover:bg-slate-50 rounded-lg px-5 py-3 transition-colors duration-150"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComingSoon;
