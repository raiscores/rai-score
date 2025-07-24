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
      style={{
        color: '#1e293b',
        fontWeight: '600',
        margin: '0 0 0.25rem 0',
        lineHeight: '1.2',
        fontSize: fontSize + 'px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        cursor: shouldTruncate ? 'help' : 'default'
      }}
      title={name}
    >
    </h3>
  );
}

function displayScore(score) {
  return typeof score === "number" && !isNaN(score) ? score.toFixed(1) : "N/A";
}

const getScoreColor = (score, maxScore) => {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 80) return '#22c55e';
  if (percentage >= 70) return '#3b82f6';
  if (percentage >= 60) return '#facc15';
  return '#ef4444';
};

const getScoreBackgroundColor = (score, maxScore) => {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 80) return 'rgba(34, 197, 94, 0.15)';
  if (percentage >= 70) return 'rgba(59, 130, 246, 0.15)';
  if (percentage >= 60) return 'rgba(250, 204, 21, 0.15)';
  return 'rgba(239, 68, 68, 0.15)';
};

const getCompanyInitials = (name) => {
  return name.split(' ').map(word => word[0]).join('').substring(0, 2).toUpperCase();
};

function CompanyCard({ company }) {
  return (
    <Link 
      to={`/company/${company.slug}`}
      style={{ textDecoration: 'none' }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '1.5rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(203, 213, 225, 0.5)',
          transition: 'all 0.2s ease',
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.12)';
          e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.3)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
          e.currentTarget.style.borderColor = 'rgba(203, 213, 225, 0.5)';
        }}
      >
        {/* Company Header */}
        <div style={{ 
          display: 'flex',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          {/* Company Avatar */}
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: '1rem',
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }}>
            <span style={{
              color: '#3b82f6',
              fontWeight: '600',
              fontSize: '1rem'
            }}>
              {getCompanyInitials(company.name)}
            </span>
          </div>
          
          {/* Company Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <CompanyName name={company.name} />
            <div style={{
              display: 'inline-block',
              backgroundColor: 'rgba(100, 116, 139, 0.1)',
              color: '#64748b',
              padding: '0.25rem 0.75rem',
              borderRadius: '6px',
              fontSize: '0.75rem',
              fontWeight: '500'
            }}>
              {company.industry}
            </div>
          </div>
        </div>

        {/* Score Section */}
        <div style={{ 
          marginTop: 'auto',
          padding: '1rem',
          backgroundColor: getScoreBackgroundColor(company.score, company.max_score),
          borderRadius: '12px',
          border: `1px solid ${getScoreColor(company.score, company.max_score)}20`
        }}>
          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.5rem'
          }}>
            <span style={{ 
              color: '#64748b',
              fontSize: '0.875rem',
              fontWeight: '500'
            }}>
              Responsible AI Score
            </span>
            <span style={{ 
              color: getScoreColor(company.score, company.max_score),
              fontSize: '1.5rem',
              fontWeight: '700'
            }}>
              {displayScore(company.score)}
              <span style={{ 
                fontSize: '1.05rem',
                color: '#64748b',
                fontWeight: '400',
                marginLeft: '0.4rem' 
              }}>
                 {company.max_score ? `/${company.max_score}` : ""}
              </span>
            </span>
          </div>
          
          {/* Progress Bar */}
          <div style={{
            width: '100%',
            height: '6px',
            backgroundColor: 'rgba(100, 116, 139, 0.2)',
            borderRadius: '3px',
            overflow: 'hidden'
          }}>
            <div style={{
              height: '100%',
              width: typeof company.score === "number" && typeof company.max_score === "number"
                ? `${(company.score / company.max_score) * 100}%`
                : "0%",
              backgroundColor: getScoreColor(company.score, company.max_score),
              borderRadius: '3px',
              transition: 'width 0.3s ease'
            }} />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default CompanyCard;