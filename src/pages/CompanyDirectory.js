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

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  };

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
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f8fafc',
      padding: '2rem 1rem'
    }}>
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
            <CompanyCard key={company.slug} company={company} />
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