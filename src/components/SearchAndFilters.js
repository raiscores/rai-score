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
    <div ref={dropdownRef} className="relative min-w-[200px]">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-3 px-4 border border-gray-300 rounded-lg bg-white text-sm text-left cursor-pointer flex justify-between items-center transition-all duration-200 hover:border-blue-500"
      >
        <span className={value ? 'text-gray-800' : 'text-gray-400'}>
          {value || placeholder}
        </span>
        <ChevronDown
          size={16}
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-[1000] max-h-[200px] overflow-y-auto mt-1">
          {value && (
            <button
              onClick={() => {
                onChange('');
                setIsOpen(false);
              }}
              className="w-full py-3 px-4 border-none bg-transparent text-left cursor-pointer text-sm text-gray-500 border-b border-gray-100 hover:bg-gray-50"
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
              className={`w-full py-3 px-4 border-none text-left cursor-pointer text-sm text-gray-800 hover:bg-gray-50 ${
                value === option ? 'bg-gray-100' : 'bg-transparent'
              }`}
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
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="px-2">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={(e) => onChange([parseFloat(e.target.value), value[1]])}
          className="w-full mb-2 accent-blue-500"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[1]}
          onChange={(e) => onChange([value[0], parseFloat(e.target.value)])}
          className="w-full mb-2 accent-blue-500"
        />
        <div className="flex justify-between text-xs text-gray-500">
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
    <div className="mb-8">
      {/* Search Bar */}
      <div className="relative max-w-[500px] mx-auto mb-6">
        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
        />
        <input
          type="text"
          placeholder="Search companies or industries..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full py-3.5 pr-4 pl-12 border border-slate-300 rounded-xl text-base bg-white shadow-sm outline-none transition-all duration-200 focus:border-blue-500 focus:ring-[3px] focus:ring-blue-500/10"
        />
      </div>

      {/* Filter Toggle Button */}
      <div className="text-center mb-4">
        <button
          onClick={() => setFiltersVisible(!filtersVisible)}
          className={`inline-flex items-center gap-2 py-3 px-6 rounded-lg text-sm font-medium cursor-pointer transition-all duration-200 ${
            filtersVisible
              ? 'bg-blue-500 text-white border border-blue-500'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-blue-500'
          }`}
        >
          <SlidersHorizontal size={16} />
          Advanced Filters
          {hasActiveFilters && (
            <span className={`rounded-xl py-0.5 px-2 text-xs font-semibold ${
              filtersVisible ? 'bg-white/20 text-white' : 'bg-red-500 text-white'
            }`}>
              Active
            </span>
          )}
        </button>
      </div>

      {/* Filter Panel */}
      {filtersVisible && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4 shadow-sm">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 items-start">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quick Filters
              </label>
              <label className="flex items-center gap-2 cursor-pointer py-2">
                <input
                  type="checkbox"
                  checked={showTopPerformers}
                  onChange={(e) => onTopPerformersChange(e.target.checked)}
                  className="accent-blue-500 scale-110"
                />
                <span className="text-sm text-gray-700">
                  Top Performers Only (6.5+)
                </span>
              </label>
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <button
                onClick={onClearAll}
                className="inline-flex items-center gap-2 py-2 px-4 bg-transparent text-gray-500 border border-gray-300 rounded-md text-sm cursor-pointer transition-all duration-200 hover:bg-gray-50 hover:text-gray-700"
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