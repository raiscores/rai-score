import React, { useState, useEffect, useRef } from 'react';
import { Search, SlidersHorizontal, X, ChevronDown } from 'lucide-react';

// Dropdown Component (internal to SearchAndFilters)
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

// Range Slider Component (internal to SearchAndFilters)
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

function SearchAndFilters({
  searchTerm,
  onSearchChange,
  selectedIndustry,
  onIndustryChange,
  scoreRange,
  onScoreRangeChange,
  sortBy,
  onSortChange,
  showTopPerformers,
  onTopPerformersChange,
  industries,
  hasActiveFilters,
  onClearAll
}) {
  const [filtersVisible, setFiltersVisible] = useState(false);

  return (
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
          onChange={(e) => onSearchChange(e.target.value)}
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
              onChange={onIndustryChange}
              options={industries}
              placeholder="All Industries"
            />

            {/* Sort By */}
            <Dropdown
              label="Sort By"
              value={sortBy}
              onChange={onSortChange}
              options={['name', 'score-desc', 'score-asc', 'industry']}
              placeholder="Sort by..."
            />

            {/* Score Range */}
            <RangeSlider
              label="Score Range"
              min={0}
              max={7}
              value={scoreRange}
              onChange={onScoreRangeChange}
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
                  onChange={(e) => onTopPerformersChange(e.target.checked)}
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
                onClick={onClearAll}
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
  );
}

export default SearchAndFilters;