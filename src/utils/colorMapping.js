// /src/utils/colorMapping.js
import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';

/**
 * Utility functions for mapping statuses to colors and visual elements
 * Used across company pages for consistent styling of scores, statuses, and performance indicators
 */

/**
 * Maps a generic status to color classnames for background, text, and icons
 * Used everywhere: pillar cards, performance cards, summary boxes, etc.
 * 
 * @param {string} status - The status to map ('excellent', 'good', 'fair', 'poor', or other)
 * @returns {Object} - Object containing text classes, background classes, and icon component
 */
export const getColorClassesFromStatus = (status) => {
  switch (status) {
    case 'excellent': 
      return { 
        text: 'text-green-600', 
        bg: 'bg-green-50', 
        icon: CheckCircle 
      };
    case 'good':      
      return { 
        text: 'text-blue-600',  
        bg: 'bg-blue-50',  
        icon: CheckCircle 
      };
    case 'fair':      
      return { 
        text: 'text-yellow-600',
        bg: 'bg-yellow-50',
        icon: AlertCircle 
      };
    case 'poor':      
      return { 
        text: 'text-red-600',   
        bg: 'bg-red-50',   
        icon: XCircle 
      };
    default:          
      return { 
        text: 'text-gray-600',  
        bg: 'bg-gray-50',  
        icon: AlertCircle 
      };
  }
};

/**
 * Maps a percentile (0-100) to a status string
 * Used for dynamic coloring of performance indicators based on ranking
 * 
 * @param {number|null|undefined} percentile - The percentile value (0-100)
 * @returns {string} - Status string ('excellent', 'good', 'fair', 'poor', or 'neutral')
 */
export const getStatusFromPercentile = (percentile) => {
  if (percentile === null || percentile === undefined) return 'neutral';
  if (percentile >= 90) return 'excellent';
  if (percentile >= 70) return 'good';
  if (percentile >= 40) return 'fair';
  return 'poor';
};

/**
 * Maps a numerical score (0-2) to text color classes
 * Used for displaying individual pillar scores and overall scores
 *
 * @param {number} score - The score value (0-2 scale)
 * @returns {string} - Tailwind CSS text color class
 */
export const getScoreColor = (score) => {
  if (score >= 2) return 'text-green-600';
  if (score >= 1.5) return 'text-blue-600';
  if (score >= 1) return 'text-yellow-600';
  return 'text-red-600';
};

/**
 * Maps a numerical score (0-2) to gradient classes for progress bars
 * Used for animated progress bars and score visualizations
 *
 * @param {number} score - The score value (0-2 scale)
 * @returns {string} - Tailwind CSS gradient classes (from-color to-color)
 */
export const getScoreGradient = (score) => {
  if (score >= 2) return 'from-green-500 to-green-600';
  if (score >= 1.5) return 'from-blue-500 to-blue-600';
  if (score >= 1) return 'from-yellow-500 to-yellow-600';
  return 'from-red-500 to-red-600';
};

/**
 * Determines pillar implementation status based on completion count
 * Used for executive summary cards and overview sections
 * 
 * @param {number} fullPillars - Number of fully implemented pillars
 * @param {number} totalPillars - Total number of pillars being evaluated
 * @returns {string} - Status string ('excellent', 'good', 'fair', or 'poor')
 */
export const getPillarImplementationStatus = (fullPillars, totalPillars) => {
  if (fullPillars === totalPillars) return 'excellent';
  if (fullPillars >= 5) return 'good';
  if (fullPillars >= 3) return 'fair';
  return 'poor';
};

/**
 * Maps best_evidence_type to a label + color set for display
 * Replaces editorial "excellent/good/poor" with evidence-based labels
 *
 * @param {string|null} bestEvidenceType - 'OPERATIONAL', 'POLICY', 'NARRATIVE', or null
 * @returns {Object} - { label, color, bg, border }
 */
export const getEvidenceTypeLabel = (bestEvidenceType) => {
  switch (bestEvidenceType) {
    case 'OPERATIONAL':
      return { label: 'Operational', color: 'text-green-700', bg: 'bg-green-50', border: 'border-green-200' };
    case 'POLICY':
      return { label: 'Policy', color: 'text-yellow-700', bg: 'bg-yellow-50', border: 'border-yellow-200' };
    case 'NARRATIVE':
      return { label: 'Narrative Only', color: 'text-orange-700', bg: 'bg-orange-50', border: 'border-orange-200' };
    default:
      return { label: 'No Evidence', color: 'text-red-700', bg: 'bg-red-50', border: 'border-red-200' };
  }
};

/**
 * Maps letter grade to Tailwind text color
 *
 * @param {string} grade - Letter grade (A+, A, A-, B+, B, B-, C+, C, C-, D)
 * @returns {string} - Tailwind text color class
 */
export const getGradeColor = (grade) => {
  if (grade.startsWith('A')) return 'text-emerald-800';
  if (grade.startsWith('B')) return 'text-blue-800';
  if (grade.startsWith('C')) return 'text-amber-800';
  return 'text-red-800';
};

/**
 * Maps letter grade to gradient background + border classes for grade card
 *
 * @param {string} grade - Letter grade
 * @returns {Object} - { gradient, border, pillBg } Tailwind classes
 */
export const getGradeBg = (grade) => {
  if (grade.startsWith('A')) return {
    gradient: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
    border: 'border-emerald-200',
    pillBg: 'bg-white/70',
    barColor: 'bg-emerald-500',
  };
  if (grade.startsWith('B')) return {
    gradient: 'bg-gradient-to-br from-blue-50 to-blue-100',
    border: 'border-blue-200',
    pillBg: 'bg-white/70',
    barColor: 'bg-blue-500',
  };
  if (grade.startsWith('C')) return {
    gradient: 'bg-gradient-to-br from-amber-50 to-amber-100',
    border: 'border-amber-200',
    pillBg: 'bg-white/70',
    barColor: 'bg-amber-500',
  };
  return {
    gradient: 'bg-gradient-to-br from-red-50 to-red-100',
    border: 'border-red-200',
    pillBg: 'bg-white/70',
    barColor: 'bg-red-500',
  };
};