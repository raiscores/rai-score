import React from 'react';
import { Mail, Building, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Container from '../components/Container';

function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Request - RAI Scores</title>
        <meta name="description" content="Contact RAI Scores for inquiries about evaluations, partnership opportunities, or methodology questions." />
      </Helmet>

      {/* Hero */}
      <section
        className="relative py-16 md:py-24"
        style={{
          background: 'linear-gradient(135deg, #0a0f1c 0%, #1a202c 25%, #2d3748 100%)'
        }}
      >
        <Container size="wide">
          <div className="max-w-[800px] mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 leading-tight animate-slideInUp">
              Get in Touch
            </h1>
            <p
              className="text-lg md:text-xl text-white/80 max-w-[640px] mx-auto leading-relaxed animate-slideInUp"
              style={{ animationDelay: '0.1s' }}
            >
              Questions about our evaluations, methodology, or partnership
              opportunities? We'd like to hear from you.
            </p>
          </div>
        </Container>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-slate-50" />
      </section>

      {/* Contact Options */}
      <section className="py-12 md:py-16 bg-white">
        <Container size="wide">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-5">

              {/* General Inquiries */}
              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="w-5 h-5 text-slate-600" />
                </div>
                <h2 className="font-semibold text-slate-900 mb-2">General Inquiries</h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Questions about scores, methodology, or how to interpret our assessments.
                </p>
                <a
                  href="mailto:info@raiscores.com"
                  className="text-sm text-blue-600 hover:text-blue-800 font-semibold"
                >
                  info@raiscores.com
                </a>
              </div>

              {/* Company Evaluation Requests */}
              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <Building className="w-5 h-5 text-slate-600" />
                </div>
                <h2 className="font-semibold text-slate-900 mb-2">Evaluation Requests</h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Suggest a company for evaluation or inquire about prioritizing
                  a specific assessment.
                </p>
                <a
                  href="mailto:info@raiscores.com?subject=Evaluation%20Request"
                  className="text-sm text-blue-600 hover:text-blue-800 font-semibold"
                >
                  info@raiscores.com
                </a>
              </div>

              {/* Partnerships */}
              <div className="bg-white rounded-xl p-5 border border-gray-200">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-5 h-5 text-slate-600" />
                </div>
                <h2 className="font-semibold text-slate-900 mb-2">Partnerships & Press</h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Research collaborations, data licensing, or press inquiries
                  about our evaluations.
                </p>
                <a
                  href="mailto:info@raiscores.com?subject=Partnership%20Inquiry"
                  className="text-sm text-blue-600 hover:text-blue-800 font-semibold"
                >
                  info@raiscores.com
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Bar */}
      <section
        className="py-8 border-t border-white/10"
        style={{
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
        }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 px-6 text-center">
          <p className="text-white/80 text-base m-0">
            Evaluating 482 Fortune 500 companies across 15 industries.
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
    </div>
  );
}

export default Contact;
