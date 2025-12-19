import React from 'react';
import { Mail, ArrowLeft, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Container from '../components/Container';

function Contact() {
  return (
    <div className="font-sans text-slate-900 leading-relaxed bg-white">
      {/* Page Title */}
      <Helmet>
        <title>Contact - RAI Score</title>
        <meta name="description" content="Contact RAI Score for inquiries about our AI accountability evaluations." />
      </Helmet>

      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-slate-50 to-slate-200 py-20 md:py-28 relative">
        {/* Enhanced background elements */}
        <div className="absolute top-[20%] right-[10%] w-24 h-24 bg-blue-600/10 rounded-2xl opacity-80 shadow-lg" />
        <div className="absolute bottom-[15%] left-[8%] w-16 h-16 bg-purple-500/5 rounded-full opacity-60" />

        <Container size="narrow">
          <div className="text-center relative z-10">
            {/* Icon indicator with micro-animation */}
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg animate-[iconPulse_2s_ease-out]">
              <MessageSquare size={28} />
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold mb-5 text-slate-900 tracking-tight">
              Get in Touch
            </h1>

            <p className="text-xl text-slate-500 max-w-[500px] mx-auto leading-relaxed">
              Questions or suggestions about our AI accountability evaluations? We'd like to hear from you.
            </p>
          </div>
        </Container>
      </section>

      {/* CONTACT SECTION */}
      <section className="py-20 md:py-24 bg-white">
        <Container size="wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start max-w-[900px] mx-auto">

            {/* Main Email Section */}
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-6 text-white">
                <Mail size={26} />
              </div>

              <h2 className="text-3xl font-bold mb-4 text-slate-900">
                Send Us an Email
              </h2>

              <p className="text-lg text-slate-500 mb-8 leading-relaxed">
                For inquiries, company suggestions, or partnership opportunities.
              </p>

              <a
                href="mailto:info@raiscores.com"
                aria-label="Email RAI Score"
                className="inline-block bg-gradient-to-br from-blue-600 to-blue-700 text-white py-4 px-8 rounded-3xl no-underline font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 hover:-translate-y-0.5 focus:outline-2 focus:outline-blue-400 focus:outline-offset-2"
              >
                info@raiscores.com
              </a>
            </div>

            {/* Context Section */}
            <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl py-10 px-8 border border-slate-200 text-center h-fit transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
                  🤝
                </div>
                <h3 className="text-xl font-bold m-0 text-slate-900">
                  Partnership Opportunities
                </h3>
              </div>

              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                We're systematically evaluating Fortune 500 companies for AI governance practices.
              </p>

              <p className="text-base font-semibold text-blue-600 leading-relaxed m-0">
                Have a partnership idea or want to collaborate? Reach out—we love new ideas.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* FOOTER */}
      <section className="py-10 pb-16 bg-slate-50 text-center">
        <Container>
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 text-base font-medium no-underline transition-all duration-200 hover:text-blue-700 focus:outline-2 focus:outline-blue-600 focus:outline-offset-2 focus:rounded"
          >
            <ArrowLeft className="mr-2" size={18} />
            Back to Homepage
          </Link>
        </Container>
      </section>
    </div>
  );
}

export default Contact;