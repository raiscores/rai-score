import React, { useState, useEffect } from 'react';
import { Shield, Target, CheckCircle, ArrowRight, Info, TrendingUp, Globe, FileText, MessageCircle, Eye, Scale, ChevronRight, ExternalLink } from 'lucide-react';

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    
    const handleScroll = () => {
      const sections = document.querySelectorAll('[data-section]');
      const scrollPos = window.scrollY + 100;
      
      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const principles = [
    { title: "Evidence over claims", description: "We focus on actual disclosures, not marketing copy" },
    { title: "One framework for all", description: "Companies are scored using the same criteria" },
    { title: "Regular iteration", description: "Our framework evolves alongside emerging standards" },
    { title: "Public methodology", description: "Our evaluation process is transparent and open" }
  ];

  const evaluationThemes = [
    "Governance & Oversight",
    "Transparency & Accountability",
    "Fairness & Risk Management",
    "Privacy & Public Responsibility"
  ];

  const futureVision = [
    { icon: TrendingUp, title: "Investment Due Diligence", description: "We envision investors considering Responsible AI as part of their evaluation process" },
    { icon: Scale, title: "Regulatory Oversight", description: "We envision regulators using independent data to help guide policy and enforcement" },
    { icon: Eye, title: "Public Benchmarks", description: "Companies improve transparency through public accountability" },
    { icon: MessageCircle, title: "Informed Journalism", description: "Journalists and advocates use our data to ask better questions" }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section data-section="0" className="relative bg-slate-900 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight max-w-6xl mx-auto">
                AI is already deciding who gets a loan, a job, or a hospital bed—yet there's 
                <span className="text-blue-400"> no clear way</span> to know if those systems are fair, safe, or explainable.
              </h1>
              
              <div className="max-w-5xl mx-auto space-y-6 text-lg md:text-xl text-gray-300">
                <p>
                  RAI Score is an independent project working to evaluate how large companies approach Responsible AI—using public data, not self-reported claims.
                </p>
                <p className="text-blue-300 font-medium">
                  We aim to make AI accountability visible—so the public, regulators, and researchers can better understand how seriously companies take ethical AI.
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-8 animate-bounce">
                <ArrowRight className="w-6 h-6 rotate-90" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section data-section="1" className="py-20 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8">The Stakes Are Rising</h2>
          <div className="text-base md:text-lg lg:text-xl text-slate-700 space-y-6 leading-relaxed max-w-6xl mx-auto">
            <p>
              Every day, AI systems make decisions that shape human lives—from approving loans to recommending medical care. Yet most operate in black boxes, with little public understanding of how they work or how risks are managed.
            </p>
            <p>
              While many companies talk about "ethical AI," there's no standard way to verify those claims or compare them across industries.
            </p>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-slate-900">
              Without transparency, there's no accountability.
            </p>
            <p className="text-base md:text-lg lg:text-xl">
              That's why we created RAI Score—to bring clarity, consistency, and independent evaluation to the conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section data-section="2" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8">Our Approach</h2>
            <div className="max-w-6xl mx-auto space-y-6 text-base md:text-lg lg:text-xl text-slate-700">
              <p>
                RAI Score applies a consistent, public methodology to evaluate large companies based on what they publicly disclose about Responsible AI.
              </p>
              <p>
                We assess companies using only information available in the public domain: governance documents, published principles, transparency reports, regulatory filings, and official statements.
              </p>
              <p className="font-semibold text-slate-900 text-lg md:text-xl lg:text-2xl">
                Our goal is not to judge intent—but to track disclosure, governance, and accountability in a consistent, comparable way.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-8">What guides our approach:</h3>
              
              <div className="space-y-6">
                {principles.map((principle, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2 text-lg">{principle.title}</h4>
                      <p className="text-slate-700">{principle.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl p-8 border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
                  Evaluation Themes 
                  <span className="text-blue-600 text-sm font-normal ml-2 cursor-pointer hover:text-blue-800 block mt-1">
                    (see full methodology →)
                  </span>
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {evaluationThemes.map((theme, index) => (
                    <div key={index} className="bg-white rounded-lg px-4 py-3 shadow-sm border border-slate-100 hover:shadow-md transition-shadow text-center">
                      <div className="font-medium text-slate-900 text-sm">{theme}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <a href="#methodology" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm">
                    View detailed methodology
                    <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Our Scores Mean */}
      <section data-section="3" className="py-20 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-blue-100 rounded-full p-4">
              <Info className="w-12 h-12 text-blue-600" />
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 mb-6 max-w-5xl mx-auto">
            What Our Scores Mean (And What They Don't)
          </h2>
          <p className="text-base md:text-lg lg:text-xl text-slate-700 mb-12 max-w-4xl mx-auto">
            We believe in radical transparency about our limitations:
          </p>

          <div className="space-y-6 text-left max-w-5xl mx-auto">
            {/* Box 1 */}
            <div className="bg-white rounded-xl p-6 md:p-8 border border-slate-200 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-3 text-base md:text-lg lg:text-xl">
                We evaluate companies based on what they publicly disclose
              </h3>
              <p className="text-sm md:text-base lg:text-lg text-slate-700">
                Our scores reflect transparency and governance practices, not internal implementations we cannot see.
              </p>
            </div>

            {/* Box 2 - Subtly Highlighted */}
            <div className="bg-blue-50 rounded-xl p-6 md:p-8 border border-blue-200 shadow-sm">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 mt-1 text-blue-500 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-slate-900 mb-2 text-base md:text-lg lg:text-xl">
                    A low score doesn't mean unethical behavior—it often means limited transparency
                  </h3>
                  <p className="text-sm md:text-base lg:text-lg text-slate-700">
                    Some companies may have excellent internal practices but choose not to share them publicly.
                  </p>
                </div>
              </div>
            </div>

            {/* Box 3 */}
            <div className="bg-white rounded-xl p-6 md:p-8 border border-slate-200 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-3 text-base md:text-lg lg:text-xl">
                We focus on governance and policies, not technical performance
              </h3>
              <p className="text-sm md:text-base lg:text-lg text-slate-700">
                Our methodology evaluates responsible AI frameworks, not the accuracy or efficiency of individual models.
              </p>
            </div>

            {/* Box 4 */}
            <div className="bg-white rounded-xl p-6 md:p-8 border border-slate-200 shadow-sm">
              <h3 className="font-semibold text-slate-900 mb-3 text-base md:text-lg lg:text-xl">
                Our methodology evolves
              </h3>
              <p className="text-sm md:text-base lg:text-lg text-slate-700">
                As AI governance standards mature, we update our evaluation criteria to reflect best practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Where We're Headed */}
      <section data-section="4" className="py-20 px-4 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8">Where We're Headed</h2>
            <div className="max-w-6xl mx-auto space-y-6 text-base md:text-lg lg:text-xl text-gray-300">
              <p>
                RAI Score is just getting started—but we believe it can become a critical tool for accountability as AI continues to shape the world.
              </p>
              <p className="text-lg md:text-xl lg:text-2xl font-medium text-white">
                We envision a future where:
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {futureVision.map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <item.icon className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="font-semibold mb-3 text-base md:text-lg lg:text-xl">{item.title}</h3>
                <p className="text-gray-300 text-sm md:text-base lg:text-lg">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-lg md:text-xl lg:text-2xl text-blue-300 font-medium max-w-4xl mx-auto">
              This is a long-term project—and we're building it in the open.
            </p>
          </div>
        </div>
      </section>

      {/* Who's Behind RAI Score */}
      <section data-section="5" className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-8">Who's Behind RAI Score?</h2>
          
          <div className="max-w-5xl mx-auto space-y-6 text-base md:text-lg lg:text-xl text-slate-700 mb-12">
            <p>
              RAI Score is an independent project with a straightforward mission:
            </p>
            <p className="text-lg md:text-xl lg:text-2xl font-semibold text-slate-900">
              Make it easier for the public to understand which companies take AI accountability seriously—and which don't say much at all.
            </p>
            <p>
              RAI Score was born out of a simple belief: the public deserves more clarity around how companies use AI. We're building this with independence, transparency, and care. This is a commitment to building this platform transparently and independently—and we welcome feedback, corrections, and collaboration.
            </p>
          </div>
          
          <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 max-w-5xl mx-auto">
            <div className="max-w-4xl mx-auto">
              <p className="text-base md:text-lg lg:text-xl text-slate-700 italic mb-6">
                "We're building something meaningful—but we know early-stage projects need to earn trust through clarity and consistent execution, not premature claims. We're here to do the work and let the results speak for themselves."
              </p>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <p className="text-slate-600 font-medium text-sm md:text-base lg:text-lg">
                  Independent • Transparent • Evolving
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;