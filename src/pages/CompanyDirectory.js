import React, { useState, useEffect, useMemo } from 'react';
import { Building2 } from 'lucide-react';
import { Helmet } from 'react-helmet';
import CompanyCard from '../components/CompanyCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';
import SearchAndFilters from '../components/SearchAndFilters';

function CompanyDirectory() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [scoreRange, setScoreRange] = useState([0, 7]);
  const [sortBy, setSortBy] = useState('name');
  const [showTopPerformers, setShowTopPerformers] = useState(false);

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

  // Loading state
  if (loading) {
    return <LoadingSpinner message="Loading companies..." />;
  }

  // Error state
  if (error) {
    return (
      <ErrorMessage 
        error={error}
        onRetry={() => window.location.reload()}
        title="Failed to load companies"
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-[1200px] mx-auto">
        <Helmet>
          <title>RAI Scores: Company Directory</title>
        </Helmet>

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-slate-800 text-4xl font-bold mb-4 tracking-tight">
            Company Directory
          </h1>
          <p className="text-slate-500 text-lg max-w-[600px] mx-auto mb-8 leading-relaxed">
            Browse and compare companies based on their Responsible AI practices.
            Our methodology evaluates organizations across key pillars of AI governance.
          </p>

          {/* Stats Bar */}
          <div className="flex justify-center gap-8 flex-wrap mb-8">
            <div className="bg-blue-500/10 py-4 px-6 rounded-xl border border-blue-500/20">
              <div className="text-blue-500 text-2xl font-semibold">
                {companies.length}
              </div>
              <div className="text-slate-500 text-sm">
                Companies Evaluated
              </div>
            </div>
            <div className="bg-yellow-400/10 py-4 px-6 rounded-xl border border-yellow-400/20">
              <div className="text-yellow-500 text-2xl font-semibold">
                {averageScore.toFixed(1)}
              </div>
              <div className="text-slate-500 text-sm">
                Average Score
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <SearchAndFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedIndustry={selectedIndustry}
          onIndustryChange={setSelectedIndustry}
          scoreRange={scoreRange}
          onScoreRangeChange={setScoreRange}
          sortBy={sortBy}
          onSortChange={setSortBy}
          showTopPerformers={showTopPerformers}
          onTopPerformersChange={setShowTopPerformers}
          industries={industries}
          hasActiveFilters={hasActiveFilters}
          onClearAll={clearAllFilters}
        />

        {/* Results Info */}
        <div className="mb-6 text-slate-500 text-sm flex justify-between items-center flex-wrap gap-2">
          <span>
            Showing {filteredAndSortedCompanies.length} of {companies.length} companies
            {searchTerm && ` matching "${searchTerm}"`}
          </span>
          {hasActiveFilters && (
            <span className="bg-amber-100 text-amber-600 py-1 px-3 rounded-xl text-xs font-medium">
              Filters Applied
            </span>
          )}
        </div>

        {/* Company Grid */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6 mb-8">
          {filteredAndSortedCompanies.map((company) => (
            <CompanyCard key={company.slug} company={company} />
          ))}
        </div>

        {/* No Results Message */}
        {filteredAndSortedCompanies.length === 0 && (
          <div className="text-center p-12 text-slate-500">
            <Building2 size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg mb-2">
              No companies found
            </p>
            <p className="text-sm mb-4">
              Try adjusting your search terms or filters
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="py-2 px-4 bg-blue-500 text-white border-none rounded-md text-sm cursor-pointer transition-all duration-200 hover:bg-blue-600"
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