// /src/hooks/useIndustryComparisons.js
import { useState, useEffect } from 'react';

/**
 * Custom hook for fetching industry comparison and ranking data
 * 
 * Fetches the company rankings JSON file that contains industry summaries,
 * leaders, and comparative data across all companies.
 * 
 * @returns {Object} - Industry comparison data and loading states
 * @returns {Object} returns.industryComparisons - Full rankings and industry data
 * @returns {boolean} returns.loading - Loading state for data fetching
 * @returns {Error|null} returns.error - Error object if fetching fails
 */
export const useIndustryComparisons = () => {
  const [industryComparisons, setIndustryComparisons] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${process.env.PUBLIC_URL}/data/rankings/companyRankings.json`)
      .then(res => res.json())
      .then(data => {
        setIndustryComparisons(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load industry comparisons", err);
        setError(err);
        setIndustryComparisons(null);
        setLoading(false);
      });
  }, []);

  return {
    industryComparisons,
    loading,
    error
  };
};

/**
 * Helper function to extract industry-specific data for a company
 * 
 * Looks up the industry summary data (leaders, totals, etc.) for a specific
 * company based on their industry classification.
 * 
 * @param {Object} companyData - Company data object with industry property
 * @param {Object} industryComparisons - Full industry comparisons data
 * @returns {Object|null} - Industry summary data or null if not found
 */
export const getIndustryDataForCompany = (companyData, industryComparisons) => {
  if (!companyData?.industry || !industryComparisons) {
    return null;
  }
  return industryComparisons.industrySummaries[companyData.industry];
};

/**
 * Helper function to find a company's details from the rankings data
 * 
 * Searches through the allCompanies array to find ranking details
 * (percentile, industry rank, etc.) for a specific company.
 * 
 * @param {Object} companyData - Company data object with slug property
 * @param {Object} industryComparisons - Full industry comparisons data
 * @returns {Object|null} - Company ranking details or null if not found
 */
export const getCompanyDetailsFromRankings = (companyData, industryComparisons) => {
  if (!companyData?.slug || !industryComparisons?.allCompanies) {
    return null;
  }
  return industryComparisons.allCompanies.find(c => c.slug === companyData.slug);
};