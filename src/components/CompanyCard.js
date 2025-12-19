import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function CompanyName({ name }) {
  const nameRef = useRef(null);
  const [fontSize, setFontSize] = useState(20);
  const [shouldTruncate, setShouldTruncate] = useState(false);

  const CHARACTER_LIMIT = 28;

  useEffect(() => {
    const el = nameRef.current;
    if (!el) return;

    const MIN_FONT_SIZE = 16;
    let currentSize = 20;

    function adjustFontSize() {
      if (!el) return;

      el.textContent = name;
      el.style.fontSize = currentSize + 'px';

      while (el.scrollWidth > el.clientWidth && currentSize > MIN_FONT_SIZE) {
        currentSize -= 1;
        el.style.fontSize = currentSize + 'px';
      }

      if (el.scrollWidth > el.clientWidth || name.length > CHARACTER_LIMIT) {
        setShouldTruncate(true);
        const truncatedName = name.substring(0, CHARACTER_LIMIT) + '...';
        el.textContent = truncatedName;
      } else {
        setShouldTruncate(false);
      }

      setFontSize(currentSize);
    }

    adjustFontSize();
    window.addEventListener('resize', adjustFontSize);
    return () => window.removeEventListener('resize', adjustFontSize);
  }, [name]);

  return (
    <h3
      ref={nameRef}
      className={`text-slate-800 font-semibold m-0 mb-1 leading-tight whitespace-nowrap overflow-hidden text-ellipsis ${
        shouldTruncate ? 'cursor-help' : 'cursor-default'
      }`}
      style={{ fontSize: fontSize + 'px' }}
      title={name}
    />
  );
}

function displayScore(score) {
  return typeof score === "number" && !isNaN(score) ? score.toFixed(1) : "N/A";
}

const getScoreColorClass = (score, maxScore) => {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 80) return 'text-green-500';
  if (percentage >= 70) return 'text-blue-500';
  if (percentage >= 60) return 'text-yellow-400';
  return 'text-red-500';
};

const getScoreBgClass = (score, maxScore) => {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 80) return 'bg-green-500/15';
  if (percentage >= 70) return 'bg-blue-500/15';
  if (percentage >= 60) return 'bg-yellow-400/15';
  return 'bg-red-500/15';
};

const getScoreBarColor = (score, maxScore) => {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 80) return 'bg-green-500';
  if (percentage >= 70) return 'bg-blue-500';
  if (percentage >= 60) return 'bg-yellow-400';
  return 'bg-red-500';
};

const getCompanyInitials = (name) => {
  return name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
};

function CompanyCard({ company }) {
  return (
    <Link
      to={`/company/${company.slug}`}
      className="no-underline"
    >
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50 transition-all duration-200 cursor-pointer h-full flex flex-col hover:-translate-y-0.5 hover:shadow-xl hover:border-blue-300">
        {/* Company Header */}
        <div className="flex items-center mb-4">
          {/* Company Avatar */}
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mr-4 border border-blue-500/20">
            <span className="text-blue-500 font-semibold text-base">
              {getCompanyInitials(company.name)}
            </span>
          </div>

          {/* Company Info */}
          <div className="flex-1 min-w-0">
            <CompanyName name={company.name} />
            <div className="inline-block bg-slate-500/10 text-slate-500 py-1 px-3 rounded-md text-xs font-medium">
              {company.industry}
            </div>
          </div>
        </div>

        {/* Score Section */}
        <div className={`mt-auto p-4 rounded-xl border ${getScoreBgClass(company.score, company.max_score)} border-current/20`}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-slate-500 text-sm font-medium">
              Responsible AI Score
            </span>
            <span className={`text-2xl font-bold ${getScoreColorClass(company.score, company.max_score)}`}>
              {displayScore(company.score)}
              <span className="text-base text-slate-500 font-normal ml-1">
                {company.max_score ? `/${company.max_score}` : ""}
              </span>
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-500/20 rounded-sm overflow-hidden">
            <div
              className={`h-full rounded-sm transition-all duration-300 ${getScoreBarColor(company.score, company.max_score)}`}
              style={{
                width: typeof company.score === "number" && typeof company.max_score === "number"
                  ? `${(company.score / company.max_score) * 100}%`
                  : "0%"
              }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CompanyCard;
