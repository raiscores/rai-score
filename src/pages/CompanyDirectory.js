import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, TrendingUp, Building2, ChevronDown, X, SlidersHorizontal } from 'lucide-react';
import { Helmet } from 'react-helmet';

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

// Dropdown Component
function Dropdown({ label, value, onChange, options, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: 'relative', minWidth: '200px' }}>
      <label style={{ 
        display: 'block', 
        fontSize: '0.875rem', 
        fontWeight: '500', 
        color: '#374151', 
        marginBottom: '0.5rem' 
      }}>
        {label}
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '0.75rem 1rem',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          backgroundColor: '#ffffff',
          fontSize: '0.875rem',
          textAlign: 'left',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => e.target.style.borderColor = '#3b82f6'}
        onMouseLeave={(e) => e.target.style.borderColor = '#d1d5db'}
      >
        <span style={{ color: value ? '#1f2937' : '#9ca3af' }}>
          {value || placeholder}
        </span>
        <ChevronDown 
          size={16} 
          style={{ 
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }} 
        />
      </button>
      
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          backgroundColor: '#ffffff',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
          maxHeight: '200px',
          overflowY: 'auto',
          marginTop: '4px'
        }}>
          {value && (
            <button
              onClick={() => {
                onChange('');
                setIsOpen(false);
              }}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: 'none',
                backgroundColor: 'transparent',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '0.875rem',
                color: '#6b7280',
                borderBottom: '1px solid #f3f4f6'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Clear selection
            </button>
          )}
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                border: 'none',
                backgroundColor: value === option ? '#f3f4f6' : 'transparent',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '0.875rem',
                color: '#1f2937'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
              onMouseLeave={(e) => e.target.style.backgroundColor = value === option ? '#f3f4f6' : 'transparent'}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// Range Slider Component
function RangeSlider({ label, min, max, value, onChange, step = 0.1 }) {
  return (
    <div>
      <label style={{ 
        display: 'block', 
        fontSize: '0.875rem', 
        fontWeight: '500', 
        color: '#374151', 
        marginBottom: '0.5rem' 
      }}>
        {label}
      </label>
      <div style={{ padding: '0 0.5rem' }}>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={(e) => onChange([parseFloat(e.target.value), value[1]])}
          style={{
            width: '100%',
            marginBottom: '0.5rem',
            accentColor: '#3b82f6'
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[1]}
          onChange={(e) => onChange([value[0], parseFloat(e.target.value)])}
          style={{
            width: '100%',
            marginBottom: '0.5rem',
            accentColor: '#3b82f6'
          }}
        />
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          fontSize: '0.75rem', 
          color: '#6b7280' 
        }}>
          <span>{value[0].toFixed(1)}</span>
          <span>{value[1].toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}

function CompanyDirectory() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [scoreRange, setScoreRange] = useState([0, 7]);
  const [sortBy, setSortBy] = useState('name');
  const [showTopPerformers, setShowTopPerformers] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);

  // Fetch companies data on component mount
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/company_list.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Sort companies by name as in original
        const sortedData = data.sort((a, b) => a.name.localeCompare(b.name));
        setCompanies(sortedData);
      } catch (err) {
        setError(`Failed to load companies data: ${err.message}`);
        console.error('Error fetching companies:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Get unique industries for filter dropdown
  const industries = useMemo(() => {
    const uniqueIndustries = [...new Set(companies.map(company => company.industry))];
    return uniqueIndustries.sort();
  }, [companies]);

  // Apply all filters and sorting
  const filteredAndSortedCompanies = useMemo(() => {
    let filtered = companies.filter(company => {
      // Search filter
      const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           company.industry.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Industry filter
      const matchesIndustry = !selectedIndustry || company.industry === selectedIndustry;
      
      // Score range filter
      const matchesScoreRange = company.score >= scoreRange[0] && company.score <= scoreRange[1];
      
      // Top performers filter (score >= 6.5)
      const matchesTopPerformers = !showTopPerformers || company.score >= 6.5;
      
      return matchesSearch && matchesIndustry && matchesScoreRange && matchesTopPerformers;
    });

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'score-desc':
          return b.score - a.score;
        case 'score-asc':
          return a.score - b.score;
        case 'industry':
          return a.industry.localeCompare(b.industry);
        default:
          return 0;
      }
    });

    return filtered;
  }, [companies, searchTerm, selectedIndustry, scoreRange, sortBy, showTopPerformers]);

  const averageScore = companies.length > 0 
    ? companies.reduce((sum, company) => sum + company.score, 0) / companies.length 
    : 0;

  // Clear all filters
  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedIndustry('');
    setScoreRange([0, 7]);
    setSortBy('name');
    setShowTopPerformers(false);
  };

  // Check if any filters are active
  const hasActiveFilters = searchTerm || selectedIndustry || scoreRange[0] > 0 || scoreRange[1] < 7 || sortBy !== 'name' || showTopPerformers;

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  };

  // Loading state
  if (loading) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f8fafc',
        padding: '2rem 1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #e5e7eb',
            borderTop: '4px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }} />
          <p style={{ color: '#64748b', fontSize: '1rem' }}>Loading companies...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f8fafc',
        padding: '2rem 1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{ 
          textAlign: 'center',
          backgroundColor: '#ffffff',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #fecaca',
          backgroundColor: '#fef2f2'
        }}>
          <p style={{ color: '#dc2626', fontSize: '1rem', marginBottom: '1rem' }}>{error}</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc',
      padding: '2rem 1rem'
    }}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto'
      }}>
        <Helmet>
          <title>RAI Scores: Company Directory</title>
        </Helmet>
        
        {/* Header Section */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '3rem'
        }}>
          <h1 style={{ 
            color: '#1e293b',
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '1rem',
            letterSpacing: '-0.025em'
          }}>
            Company Directory
          </h1>
          <p style={{ 
            color: '#64748b',
            fontSize: '1.125rem',
            maxWidth: '600px',
            margin: '0 auto 2rem auto',
            lineHeight: '1.6'
          }}>
            Browse and compare companies based on their Responsible AI practices. 
            Our methodology evaluates organizations across key pillars of AI governance.
          </p>
          
          {/* Stats Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }}>
            <div style={{
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              border: '1px solid rgba(59, 130, 246, 0.2)'
            }}>
              <div style={{ color: '#3b82f6', fontSize: '1.5rem', fontWeight: '600' }}>
                {companies.length}
              </div>
              <div style={{ color: '#64748b', fontSize: '0.875rem' }}>
                Companies Evaluated
              </div>
            </div>
            <div style={{
              backgroundColor: 'rgba(250, 204, 21, 0.1)',
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              border: '1px solid rgba(250, 204, 21, 0.2)'
            }}>
              <div style={{ color: '#eab308', fontSize: '1.5rem', fontWeight: '600' }}>
                {averageScore.toFixed(1)}
              </div>
              <div style={{ color: '#64748b', fontSize: '0.875rem' }}>
                Average Score
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div style={{ marginBottom: '2rem' }}>
          {/* Search Bar */}
          <div style={{ 
            position: 'relative',
            maxWidth: '500px',
            margin: '0 auto 1.5rem auto'
          }}>
            <Search 
              size={20} 
              style={{ 
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#64748b'
              }} 
            />
            <input
              type="text"
              placeholder="Search companies or industries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.875rem 1rem 0.875rem 3rem',
                border: '1px solid #cbd5e1',
                borderRadius: '12px',
                fontSize: '1rem',
                backgroundColor: '#ffffff',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#3b82f6';
                e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = '#cbd5e1';
                e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              }}
            />
          </div>

          {/* Filter Toggle Button */}
          <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <button
              onClick={() => setFiltersVisible(!filtersVisible)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: filtersVisible ? '#3b82f6' : '#ffffff',
                color: filtersVisible ? '#ffffff' : '#374151',
                border: `1px solid ${filtersVisible ? '#3b82f6' : '#d1d5db'}`,
                borderRadius: '8px',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (!filtersVisible) {
                  e.target.style.backgroundColor = '#f9fafb';
                  e.target.style.borderColor = '#3b82f6';
                }
              }}
              onMouseLeave={(e) => {
                if (!filtersVisible) {
                  e.target.style.backgroundColor = '#ffffff';
                  e.target.style.borderColor = '#d1d5db';
                }
              }}
            >
              <SlidersHorizontal size={16} />
              Advanced Filters
              {hasActiveFilters && (
                <span style={{
                  backgroundColor: filtersVisible ? 'rgba(255, 255, 255, 0.2)' : '#ef4444',
                  color: filtersVisible ? '#ffffff' : '#ffffff',
                  borderRadius: '10px',
                  padding: '0.125rem 0.5rem',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  Active
                </span>
              )}
            </button>
          </div>

          {/* Filter Panel */}
          {filtersVisible && (
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              padding: '1.5rem',
              marginBottom: '1rem',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                alignItems: 'start'
              }}>
                {/* Industry Filter */}
                <Dropdown
                  label="Industry"
                  value={selectedIndustry}
                  onChange={setSelectedIndustry}
                  options={industries}
                  placeholder="All Industries"
                />

                {/* Sort By */}
                <Dropdown
                  label="Sort By"
                  value={sortBy}
                  onChange={setSortBy}
                  options={[
                    { value: 'name', label: 'Company Name' },
                    { value: 'score-desc', label: 'Highest Score' },
                    { value: 'score-asc', label: 'Lowest Score' },
                    { value: 'industry', label: 'Industry' }
                  ].map(opt => opt.value)}
                  placeholder="Sort by..."
                />

                {/* Score Range */}
                <RangeSlider
                  label="Score Range"
                  min={0}
                  max={7}
                  value={scoreRange}
                  onChange={setScoreRange}
                  step={0.1}
                />

                {/* Top Performers Toggle */}
                <div>
                  <label style={{ 
                    display: 'block', 
                    fontSize: '0.875rem', 
                    fontWeight: '500', 
                    color: '#374151', 
                    marginBottom: '0.5rem' 
                  }}>
                    Quick Filters
                  </label>
                  <label style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.5rem',
                    cursor: 'pointer',
                    padding: '0.5rem 0'
                  }}>
                    <input
                      type="checkbox"
                      checked={showTopPerformers}
                      onChange={(e) => setShowTopPerformers(e.target.checked)}
                      style={{
                        accentColor: '#3b82f6',
                        transform: 'scale(1.1)'
                      }}
                    />
                    <span style={{ fontSize: '0.875rem', color: '#374151' }}>
                      Top Performers Only (6.5+)
                    </span>
                  </label>
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <div style={{ 
                  marginTop: '1.5rem', 
                  paddingTop: '1.5rem', 
                  borderTop: '1px solid #e5e7eb',
                  textAlign: 'center'
                }}>
                  <button
                    onClick={clearAllFilters}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      backgroundColor: 'transparent',
                      color: '#6b7280',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '0.875rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = '#f9fafb';
                      e.target.style.color = '#374151';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#6b7280';
                    }}
                  >
                    <X size={14} />
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results Info */}
        <div style={{
          marginBottom: '1.5rem',
          color: '#64748b',
          fontSize: '0.875rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem'
        }}>
          <span>
            Showing {filteredAndSortedCompanies.length} of {companies.length} companies
            {searchTerm && ` matching "${searchTerm}"`}
          </span>
          {hasActiveFilters && (
            <span style={{
              backgroundColor: '#fef3c7',
              color: '#d97706',
              padding: '0.25rem 0.75rem',
              borderRadius: '12px',
              fontSize: '0.75rem',
              fontWeight: '500'
            }}>
              Filters Applied
            </span>
          )}
        </div>

        {/* Company Grid */}
        <div style={gridStyle}>
          {filteredAndSortedCompanies.map((company) => (
            <Link 
              key={company.slug}
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
          ))}
        </div>

        {/* No Results Message */}
        {filteredAndSortedCompanies.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#64748b'
          }}>
            <Building2 size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p style={{ fontSize: '1.125rem', marginBottom: '0.5rem' }}>
              No companies found
            </p>
            <p style={{ fontSize: '0.875rem', marginBottom: '1rem' }}>
              Try adjusting your search terms or filters
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#3b82f6',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CompanyDirectory;