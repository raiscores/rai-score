// ShareButton.js - Content-first share functionality component
import React, { useState } from 'react';
import { Share2, Link, Mail, Check, Copy, X, ExternalLink, Star, TrendingUp } from 'lucide-react';

const ShareButton = ({ 
  url, 
  title, 
  description, 
  companyName = "Company",
  companyGrade = "N/A",
  companyScore,
  className = "",
  showText = true 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Generate share URLs
  const shareData = {
    url: url || window.location.href,
    title: title || document.title,
    description: description || "Check out this RAI Score analysis"
  };

  const shareUrls = {
    x: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(
      companyName && companyName !== "Company" && companyGrade && companyGrade !== "N/A" 
        ? `${companyName} earned a ${companyGrade} grade for Responsible AI practices.` 
        : `Check out this Responsible AI analysis:`
    )}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`,
    email: `mailto:?subject=${encodeURIComponent(
      companyName && companyName !== "Company" 
        ? `${companyName} Responsible AI Assessment` 
        : shareData.title
    )}&body=${encodeURIComponent(
      companyName && companyName !== "Company" && companyGrade && companyGrade !== "N/A"
        ? `I thought you'd find this interesting:\n\n${companyName} received a ${companyGrade} grade for Responsible AI practices.\n\n${description}\n\nView the full analysis: ${shareData.url}`
        : `I thought you'd find this interesting:\n\n${description}\n\nView the full analysis: ${shareData.url}`
    )}`
  };

  // Always show custom modal
  const handleShare = async () => {
    setIsOpen(!isOpen);
  };

  // Copy link to clipboard with enhanced message
  const copyToClipboard = async () => {
    // Just copy the clean URL
    const shareMessage = shareData.url;
    
    try {
      await navigator.clipboard.writeText(shareMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareMessage;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Close modal when clicking outside
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  // Get grade color
  const getGradeColor = (grade) => {
    if (grade?.includes('A')) return 'text-emerald-600 bg-emerald-50';
    if (grade?.includes('B')) return 'text-blue-600 bg-blue-50';
    if (grade?.includes('C')) return 'text-amber-600 bg-amber-50';
    return 'text-slate-600 bg-slate-50';
  };

  // Custom X icon
  const XIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );

  // LinkedIn icon
  const LinkedInIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );

  return (
    <div className="relative">
      {/* Share Button */}
      <button 
        onClick={handleShare}
        className={`flex items-center gap-2 px-3 py-2 text-slate-600 hover:text-slate-900 transition-colors ${className}`}
      >
        <Share2 className="w-4 h-4" />
        {showText && <span className="hidden sm:inline">Share</span>}
      </button>

      {/* Content-First Share Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={handleBackdropClick}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
            {/* Content Preview Header */}
            <div className="relative px-6 py-6 bg-gradient-to-br from-slate-50 to-slate-100 border-b border-slate-200">
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-white/70 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="pr-12">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-slate-600">RAI Scores Analysis</span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {companyName && companyName !== "Company" ? companyName : "Company Analysis"}
                </h3>
                
                <div className="flex items-center gap-3 mb-3">
                  {companyGrade && companyGrade !== "N/A" && (
                    <div className={`px-3 py-1 rounded-full font-semibold text-sm ${getGradeColor(companyGrade)}`}>
                      {companyGrade} Grade
                    </div>
                  )}
                  <div className="flex items-center gap-1 text-sm text-slate-600">
                    <Star className="w-4 h-4 text-amber-400" />
                    <span>Responsible AI Assessment</span>
                  </div>
                </div>
                
                <p className="text-sm text-slate-600 line-clamp-2">{description}</p>
              </div>
            </div>

            {/* Share Actions */}
            <div className="p-6">
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-slate-900 mb-3">Share this analysis</h4>
                
                {/* Primary Action - Copy with Context */}
                <button
                  onClick={copyToClipboard}
                  className={`w-full group relative overflow-hidden rounded-xl p-4 font-medium transition-all duration-200 mb-4 ${
                    copied 
                      ? 'bg-emerald-500 text-white shadow-lg' 
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="flex items-center justify-center gap-3">
                    <div className="flex items-center gap-2">
                      {copied ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                      <span className="text-sm">
                        {copied ? 'Link copied!' : 'Copy link'}
                      </span>
                    </div>
                  </div>
                  {copied && (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                  )}
                </button>
              </div>

              {/* Secondary Actions */}
              <div className="space-y-3">
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Or share via</div>
                
                {/* Professional Sharing */}
                <a
                  href={shareUrls.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-[#0077B5] hover:bg-blue-50 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="p-2 rounded-lg bg-blue-100 group-hover:bg-[#0077B5] transition-colors">
                    <LinkedInIcon className="w-5 h-5 text-[#0077B5] group-hover:text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">Share on LinkedIn</div>
                    <div className="text-sm text-slate-600">Perfect for professional networks</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[#0077B5]" />
                </a>

                {/* Social Sharing */}
                <a
                  href={shareUrls.x}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-slate-800 hover:bg-slate-50 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-slate-800 transition-colors">
                    <XIcon className="w-5 h-5 text-slate-600 group-hover:text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">Post on X</div>
                    <div className="text-sm text-slate-600">Share with your followers</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-slate-800" />
                </a>

                {/* Email Sharing */}
                <a
                  href={shareUrls.email}
                  className="group flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-purple-400 hover:bg-purple-50 transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="p-2 rounded-lg bg-purple-100 group-hover:bg-purple-500 transition-colors">
                    <Mail className="w-5 h-5 text-purple-600 group-hover:text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">Send via Email</div>
                    <div className="text-sm text-slate-600">Include detailed context</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-purple-500" />
                </a>
              </div>

              {/* Trust Signal */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
                  <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                  <span>Independent AI accountability research</span>
                  <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;