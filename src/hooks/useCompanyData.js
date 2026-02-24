// /src/hooks/useCompanyData.js
import { useState, useEffect } from 'react';

/**
 * Custom hook for fetching and managing company data
 *
 * Fetches company profile and assessment data from JSON files, merges them,
 * and provides loading states and score animation triggers.
 *
 * @param {string} slug - The company slug/identifier (e.g., "microsoft", "apple")
 * @returns {Object} - Company data, loading state, error state, and animation trigger
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
      fetch(`${process.env.PUBLIC_URL}/data/companies/${slug}_assessment.json`).then(res => res.json())
    ])
      .then(([profile, assessment]) => {
        setCompanyData({
          // Profile fields as base (company metadata)
          ...profile,
          // Prefer display_name over legal name for UI
          name: profile.display_name || profile.name,
          // Flatten aggregate fields
          total_score: assessment.aggregate.total_score,
          max_possible_score: assessment.aggregate.max_possible_score,
          percent_score: assessment.aggregate.percent_score,
          star_rating: assessment.aggregate.star_rating,
          star_display: assessment.aggregate.star_display,
          // Flatten summary fields individually (keeps profile.summary as company description)
          overall_findings: assessment.summary.overall_findings,
          key_strengths: assessment.summary.key_strengths,
          key_gaps: assessment.summary.key_gaps,
          total_sources_used: assessment.summary.total_sources_used,
          total_evidence_items: assessment.summary.total_evidence_items,
          pillars_with_evidence: assessment.summary.pillars_with_evidence,
          pillars_without_evidence: assessment.summary.pillars_without_evidence,
          pillars_operational: assessment.summary.pillars_operational,
          pillars_policy_only: assessment.summary.pillars_policy_only,
          // Nested objects
          pillar_scores: assessment.pillar_scores,
          evidence_breakdown: assessment.evidence_breakdown,
          // Metadata
          published_at: assessment.published_at,
          schema_version: assessment.schema_version,
          run_id: assessment.run_id,
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
