import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, X, Building2, Info } from 'lucide-react';
import { Helmet } from 'react-helmet';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorMessage from '../components/ui/ErrorMessage';

// --- Constants ---

const PILLAR_NAMES = [
  'Transparency',
  'Fairness & Bias',
  'Explainability',
  'Human Oversight',
  'Privacy & Data',
  'Governance',
  'External Accountability'
];

const SORT_OPTIONS = [
  { value: 'score-desc', label: 'Score (High to Low)' },
  { value: 'score-asc', label: 'Score (Low to High)' },
  { value: 'name-asc', label: 'Company (A–Z)' },
  { value: 'name-desc', label: 'Company (Z–A)' },
  { value: 'industry', label: 'Industry' },
];

const GRADE_OPTIONS = [
  { value: '', label: 'All Grades' },
  { value: 'A', label: 'A & Above' },
  { value: 'B', label: 'B & Above' },
  { value: 'C', label: 'C & Above' },
  { value: 'D', label: 'D Only' },
];

const ROWS_PER_PAGE_OPTIONS = [25, 50, 100];

// Grade-based score thresholds for filtering: A = 85%+ (12), B = 65%+ (9), C = 50%+ (7)
const GRADE_MIN_SCORES = { 'A': 12, 'B': 9, 'C': 7, 'D': 0 };

// --- Helpers ---

// Grade calculation — matches CompanyPage.js getGradeFromScore exactly
function getGrade(score, max) {
  const pct = (score / max) * 100;
  if (pct >= 90) return 'A+';
  if (pct >= 85) return 'A';
  if (pct >= 80) return 'A-';
  if (pct >= 75) return 'B+';
  if (pct >= 70) return 'B';
  if (pct >= 65) return 'B-';
  if (pct >= 60) return 'C+';
  if (pct >= 55) return 'C';
  if (pct >= 50) return 'C-';
  return 'D';
}

function getGradeBadgeClasses(grade) {
  if (grade.startsWith('A')) return 'bg-emerald-50 text-emerald-700/85 border-emerald-200';
  if (grade.startsWith('B')) return 'bg-blue-50 text-blue-700 border-blue-200';
  if (grade.startsWith('C')) return 'bg-amber-50 text-amber-700 border-amber-200';
  return 'bg-red-50 text-red-700 border-red-200';
}

function GradeBadge({ score, max }) {
  const grade = getGrade(score, max);
  return (
    <span className={`inline-block text-xs font-bold py-px rounded border leading-snug text-center w-7 ${getGradeBadgeClasses(grade)}`}>
      {grade}
    </span>
  );
}

// --- Small Components ---

function PillarDots({ scores }) {
  if (!scores || scores.length === 0) return null;
  return (
    <div className="flex gap-1.5 items-center" aria-label="Pillar scores">
      {scores.map((score, i) => (
        <div
          key={i}
          title={`${PILLAR_NAMES[i]}: ${score === 2 ? 'Operational (2/2)' : score === 1 ? 'Policy (1/2)' : 'No Evidence (0/2)'}`}
          className={`w-2 h-2 rounded-full ${
            score === 2 ? 'bg-emerald-500' :
            score === 1 ? 'bg-amber-500' :
            'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
}

function isSortActive(column, sortBy) {
  return {
    name: ['name-asc', 'name-desc'].includes(sortBy),
    score: ['score-asc', 'score-desc'].includes(sortBy),
    industry: sortBy === 'industry',
  }[column] || false;
}

function SortIndicator({ column, sortBy }) {
  if (!isSortActive(column, sortBy)) return null;

  const isDesc = sortBy === 'score-desc' || sortBy === 'name-desc';
  const Icon = isDesc ? ChevronDown : ChevronUp;
  return <Icon size={14} className="inline ml-0.5 -mt-0.5" />;
}

// --- Main Component ---

function CompanyDirectory() {
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [minGrade, setMinGrade] = useState('');
  const [sortBy, setSortBy] = useState('score-desc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  // Fetch data
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const response = await fetch('/data/company_list.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        setCompanies(await response.json());
      } catch (err) {
        setError(`Failed to load companies data: ${err.message}`);
        console.error('Error fetching companies:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompanies();
  }, []);

  // Unique industries
  const industries = useMemo(() => {
    return [...new Set(companies.map(c => c.industry))].sort();
  }, [companies]);

  // Filter + sort
  const filteredCompanies = useMemo(() => {
    const term = searchTerm.toLowerCase();
    let result = companies.filter(c => {
      if (term && !c.name.toLowerCase().includes(term) && !c.industry.toLowerCase().includes(term)) return false;
      if (selectedIndustry && c.industry !== selectedIndustry) return false;
      if (minGrade) {
        if (minGrade === 'D') {
          if (c.score >= 7) return false; // D only = below C threshold
        } else {
          if (c.score < (GRADE_MIN_SCORES[minGrade] ?? 0)) return false;
        }
      }
      return true;
    });

    result.sort((a, b) => {
      switch (sortBy) {
        case 'score-desc': return b.score - a.score || a.name.localeCompare(b.name);
        case 'score-asc':  return a.score - b.score || a.name.localeCompare(b.name);
        case 'name-asc':   return a.name.localeCompare(b.name);
        case 'name-desc':  return b.name.localeCompare(a.name);
        case 'industry':   return a.industry.localeCompare(b.industry) || b.score - a.score;
        default: return 0;
      }
    });

    return result;
  }, [companies, searchTerm, selectedIndustry, minGrade, sortBy]);

  // Pagination derived values
  const totalPages = Math.ceil(filteredCompanies.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedCompanies = filteredCompanies.slice(startIndex, startIndex + rowsPerPage);

  // Reset to page 1 when any filter/sort/pageSize changes
  const updateFilter = (setter) => (value) => {
    setter(value);
    setCurrentPage(1);
  };

  const handleSearch = updateFilter(setSearchTerm);
  const handleIndustry = updateFilter(setSelectedIndustry);
  const handleGrade = updateFilter(setMinGrade);
  const handleSort = updateFilter(setSortBy);
  const handleRowsPerPage = (val) => { setRowsPerPage(Number(val)); setCurrentPage(1); };

  // Column header sort toggle
  const handleColumnSort = (column) => {
    const toggleMap = {
      score: { 'score-desc': 'score-asc', default: 'score-desc' },
      name:  { 'name-asc': 'name-desc', default: 'name-asc' },
      industry: { default: 'industry' },
    };
    const map = toggleMap[column];
    setSortBy(prev => map[prev] || map.default);
    setCurrentPage(1);
  };

  // Row click handler
  const handleRowClick = (slug, e) => {
    if (e.ctrlKey || e.metaKey) {
      window.open(`/company/${slug}`, '_blank');
    } else {
      navigate(`/company/${slug}`);
    }
  };

  const hasActiveFilters = searchTerm || selectedIndustry || minGrade;

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedIndustry('');
    setMinGrade('');
    setSortBy('score-desc');
    setCurrentPage(1);
  };

  const averageScore = companies.length > 0
    ? (companies.reduce((sum, c) => sum + c.score, 0) / companies.length).toFixed(1)
    : '0';

  // Loading & error states
  if (loading) return <LoadingSpinner message="Loading companies..." />;
  if (error) return <ErrorMessage error={error} onRetry={() => window.location.reload()} title="Failed to load companies" />;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-[1200px] mx-auto">
        <Helmet>
          <title>RAI Scores: Company Directory</title>
        </Helmet>

        {/* --- Header --- */}
        <div className="mb-8">
          <h1 className="text-slate-800 text-3xl font-bold tracking-tight mb-2">
            Company Directory
          </h1>
          <p className="text-slate-500 text-base">
            {companies.length} companies evaluated &middot; Average score {averageScore}/14
          </p>
        </div>

        {/* --- Toolbar --- */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6 shadow-sm">
          <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-0">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search by name or industry..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full py-2.5 pl-10 pr-9 border border-gray-200 rounded-lg text-sm bg-white outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              />
              {searchTerm && (
                <button
                  onClick={() => handleSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Filter dropdowns */}
            <div className="flex gap-2 flex-wrap">
              <select
                value={selectedIndustry}
                onChange={(e) => handleIndustry(e.target.value)}
                className="py-2.5 px-3 border border-gray-200 rounded-lg bg-white text-sm text-gray-700 cursor-pointer outline-none transition-colors hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              >
                <option value="">All Industries</option>
                {industries.map(ind => (
                  <option key={ind} value={ind}>{ind}</option>
                ))}
              </select>

              <select
                value={minGrade}
                onChange={(e) => handleGrade(e.target.value)}
                className="py-2.5 px-3 border border-gray-200 rounded-lg bg-white text-sm text-gray-700 cursor-pointer outline-none transition-colors hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              >
                {GRADE_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="py-2.5 px-3 border border-gray-200 rounded-lg bg-white text-sm text-gray-700 cursor-pointer outline-none transition-colors hover:border-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
              >
                {SORT_OPTIONS.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Clear filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                <X size={14} />
                Clear
              </button>
            )}
          </div>
        </div>

        {/* --- Active filter chips --- */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap mb-4">
            {searchTerm && (
              <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-medium py-1 px-2.5 rounded-full">
                Search: "{searchTerm}"
                <button onClick={() => handleSearch('')} className="text-gray-400 hover:text-gray-600 cursor-pointer"><X size={12} /></button>
              </span>
            )}
            {selectedIndustry && (
              <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-medium py-1 px-2.5 rounded-full">
                {selectedIndustry}
                <button onClick={() => handleIndustry('')} className="text-gray-400 hover:text-gray-600 cursor-pointer"><X size={12} /></button>
              </span>
            )}
            {minGrade && (
              <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 text-xs font-medium py-1 px-2.5 rounded-full">
                Grade: {minGrade}{minGrade !== 'D' ? ' & above' : ' only'}
                <button onClick={() => handleGrade('')} className="text-gray-400 hover:text-gray-600 cursor-pointer"><X size={12} /></button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="text-xs text-gray-500 hover:text-gray-700 cursor-pointer ml-1"
            >
              Clear all
            </button>
          </div>
        )}

        {/* --- Results count --- */}
        <div className="flex justify-between items-center mb-4 text-sm text-slate-500">
          <span>
            Showing {filteredCompanies.length > 0 ? startIndex + 1 : 0}–{Math.min(startIndex + rowsPerPage, filteredCompanies.length)} of {filteredCompanies.length} companies
          </span>
        </div>

        {/* --- Desktop Table (md+) --- */}
        <div className="hidden md:block bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <table className="w-full">
            <thead className="sticky top-0 z-10">
              <tr className="border-b-2 border-gray-200 bg-gray-50">
                <th className="py-3 px-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider w-14">
                  #
                </th>
                <th
                  className={`py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:text-gray-800 select-none ${isSortActive('name', sortBy) ? 'text-gray-800' : 'text-gray-500'}`}
                  onClick={() => handleColumnSort('name')}
                >
                  Company
                  <SortIndicator column="name" sortBy={sortBy} />
                </th>
                <th
                  className={`py-3 px-4 text-left text-xs font-semibold uppercase tracking-wider cursor-pointer hover:text-gray-800 select-none ${isSortActive('industry', sortBy) ? 'text-gray-800' : 'text-gray-500'}`}
                  onClick={() => handleColumnSort('industry')}
                >
                  Industry
                  <SortIndicator column="industry" sortBy={sortBy} />
                </th>
                <th className="py-3 px-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  <span className="inline-flex items-center gap-1">
                    Pillars
                    <span
                      className="inline-flex"
                      title={"Each dot = 1 of 7 RAI pillars (fixed order: Transparency, Fairness, Explainability, Oversight, Privacy, Governance, External Accountability)\n\nGreen = Operational evidence (2/2)\nAmber = Policy-level only (1/2)\nGray = No documented evidence (0/2)\n\nHover individual dots to see pillar names."}
                    >
                      <Info size={12} className="text-gray-400 hover:text-gray-600 cursor-help" />
                    </span>
                  </span>
                </th>
                <th
                  className={`py-3 px-4 text-right text-xs font-semibold uppercase tracking-wider cursor-pointer hover:text-gray-800 select-none ${isSortActive('score', sortBy) ? 'text-gray-800' : 'text-gray-500'}`}
                  onClick={() => handleColumnSort('score')}
                >
                  Score
                  <SortIndicator column="score" sortBy={sortBy} />
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedCompanies.map((company, index) => (
                <tr
                  key={company.slug}
                  className="border-b border-gray-50 last:border-0 hover:bg-blue-50/40 transition-colors cursor-pointer"
                  onClick={(e) => handleRowClick(company.slug, e)}
                >
                  <td className="py-3 px-4 text-right text-sm text-gray-400 tabular-nums">
                    {startIndex + index + 1}
                  </td>
                  <td className="py-3 px-4 max-w-[280px]">
                    <Link
                      to={`/company/${company.slug}`}
                      className="text-sm font-medium text-slate-700 hover:text-blue-600 hover:underline transition-colors no-underline block truncate"
                      title={company.name}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {company.name}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-500">
                    {company.industry}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex justify-center">
                      <PillarDots scores={company.pillar_scores} />
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className="inline-flex items-center gap-2">
                      <span className="text-sm font-semibold tabular-nums text-slate-700">
                        {company.score}<span className="text-gray-400 font-normal">/{company.max_score}</span>
                      </span>
                      <GradeBadge score={company.score} max={company.max_score} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* --- Mobile List (<md) --- */}
        <div className="md:hidden space-y-2 mb-6">
          {paginatedCompanies.map((company, index) => (
            <Link
              key={company.slug}
              to={`/company/${company.slug}`}
              className="block bg-white rounded-lg border border-gray-100 px-4 py-3 no-underline active:bg-gray-50 transition-colors"
            >
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-sm font-medium text-blue-800">
                  <span className="text-gray-400 tabular-nums mr-1.5">#{startIndex + index + 1}</span>
                  {company.name}
                </span>
                <span className="inline-flex items-center gap-1.5 ml-2">
                  <span className="text-sm font-semibold tabular-nums text-slate-700">
                    {company.score}<span className="text-gray-400 font-normal">/{company.max_score}</span>
                  </span>
                  <GradeBadge score={company.score} max={company.max_score} />
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{company.industry}</span>
                <PillarDots scores={company.pillar_scores} />
              </div>
            </Link>
          ))}
        </div>

        {/* --- No Results --- */}
        {filteredCompanies.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            <Building2 size={48} className="mx-auto mb-4 opacity-40" />
            <p className="text-lg mb-1">No companies found</p>
            <p className="text-sm mb-4">Try adjusting your search or filters</p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="py-2 px-4 bg-blue-500 text-white rounded-lg text-sm cursor-pointer hover:bg-blue-600 transition-colors"
              >
                Clear All Filters
              </button>
            )}
          </div>
        )}

        {/* --- Pagination --- */}
        {filteredCompanies.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl border border-gray-200 px-4 py-3 shadow-sm">
            {/* Rows per page */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Rows per page:</span>
              {ROWS_PER_PAGE_OPTIONS.map(opt => (
                <button
                  key={opt}
                  onClick={() => handleRowsPerPage(opt)}
                  className={`py-1 px-2.5 rounded text-sm cursor-pointer transition-colors ${
                    rowsPerPage === opt
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>

            {/* Page controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-gray-200 text-gray-500 cursor-pointer hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="text-sm text-gray-600 font-medium tabular-nums">
                Page {currentPage} of {totalPages || 1}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage >= totalPages}
                className="p-1.5 rounded-lg border border-gray-200 text-gray-500 cursor-pointer hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CompanyDirectory;
