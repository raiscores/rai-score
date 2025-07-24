// /src/hooks/useCompanyData.js
import { useState, useEffect } from 'react';

/**
 * Custom hook for fetching and managing company data
 * 
 * Fetches company profile and scores data from JSON files, merges them,
 * and provides loading states and score animation triggers.
 * 
 * @param {string} slug - The company slug/identifier (e.g., "microsoft", "google")
 * @returns {Object} - Company data, loading state, error state, and animation trigger
 * @returns {Object} returns.companyData - Merged company profile and scores data
 * @returns {boolean} returns.loading - Loading state for data fetching
 * @returns {Error|null} returns.error - Error object if fetching fails
 * @returns {boolean} returns.animateScores - Trigger for score animations (delayed after data load)
 */
export const useCompanyData = (slug) => {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animateScores, setAnimateScores] = useState(false);

  useEffect(() => {
    if (!slug) return;

    setLoading(true);
    setAnimateScores(false);
    setError(null);

    Promise.all([
      fetch(`${process.env.PUBLIC_URL}/data/companies/${slug}_profile.json`).then(res => res.json()),
      fetch(`${process.env.PUBLIC_URL}/data/companies/${slug}_scores.json`).then(res => res.json())
    ])
      .then(([profile, scores]) => {
        // Merge profile and scores data
        setCompanyData({
          ...profile,
          ...scores.aggregate,
          pillarDetails: scores.pillarDetails,
          overallFindings: scores.summary?.overallFindings,
          // HARDCODED DATA (keeping as-is for now)
          last_updated: "2025-06-10",
          percentile_rank: 95,
          industry_rank: 2,
          total_companies_in_industry: 45,
          data_confidence: "High",
          source_count: 14
        });
        setLoading(false);
        // Trigger score animations after data loads
        setTimeout(() => setAnimateScores(true), 500);
      })
      .catch((err) => {
        console.error('Error loading company data:', err);
        setError(err);
        setCompanyData(null);
        setLoading(false);
      });
  }, [slug]);

  return {
    companyData,
    loading,
    error,
    animateScores
  };
};