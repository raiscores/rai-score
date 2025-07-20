import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const ComingSoon = () => {

  return (
    <>
      <Helmet>
        <title>Coming Soon – Responsible AI Scorecard</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="description" content="This section is under construction as we continue building out Responsible AI Scorecard. Check back soon!" />
      </Helmet>
      
      <div className="min-h-screen bg-white flex items-start justify-center pt-28 pb-20 md:pt-36 md:pb-28 p-5">
        <div className="w-full max-w-2xl mx-auto text-center">
          {/* Header Section */}
          <div className="mb-10">
            {/* Construction Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-500 rounded-2xl shadow-md mb-8">
              <span className="text-4xl">🚧</span>
            </div>
            
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3 tracking-tight">
              Coming <span className="text-blue-600">Soon</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-lg text-slate-600 font-normal mb-2">
              This page isn't quite ready yet, but we're working on it!
            </p>
          </div>

          {/* Content Section - Single Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-10 mb-8 max-w-2xl mx-auto">
            <p className="text-slate-600 leading-relaxed text-base max-w-lg mx-auto">
              In the meantime, feel free to browse the rest of RAI Score or contact us if you have questions.
            </p>
            <p className="text-slate-500 text-sm mt-4 max-w-lg mx-auto">
              Thanks for your patience!
            </p>
          </div>

          {/* Optional Secondary Navigation */}
          <div className="text-center mb-6">
            <p className="text-slate-500 text-sm">
              Or{' '}
              <Link to="/companies" className="text-blue-600 hover:text-blue-700 underline">
                browse companies
              </Link>
              {' '}•{' '}
              <Link to="/contact" className="text-blue-600 hover:text-blue-700 underline">
                contact us
              </Link>
            </p>
          </div>

          {/* Subtle Divider */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex space-x-1">
              <div className="w-1 h-1 bg-slate-300 rounded-full animate-pulse"></div>
              <div className="w-1 h-1 bg-slate-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-1 h-1 bg-slate-300 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>

          {/* Back Link - Floating */}
          <div className="mt-8">
            <Link
              to="/"
              aria-label="Navigate back to homepage"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-10 py-5 rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 hover:scale-105 focus:outline-none focus:ring-3 focus:ring-blue-400 focus:ring-offset-2 transition-all duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ComingSoon;