/**
 * Home page content data
 * Extracted from Home.js for better maintainability
 */

import { Eye, Scale, Users, Shield, Building, FileText, Lightbulb, BookOpen } from 'lucide-react';

// Trust indicators for hero section
export const trustIndicators = [
  "Evidence-based methodology",
  "Publicly available data only",
  "Independent evaluation"
];

// Enhanced evaluation themes
export const evaluationThemes = [
  {
    icon: <Shield size={24} />,
    title: 'Governance & Oversight',
    description: 'Board oversight, ethics committees, clear policies, and leadership accountability for AI decisions and outcomes.',
    color: '#2563eb',
    colorSecondary: '#1d4ed8'
  },
  {
    icon: <Eye size={24} />,
    title: 'Transparency & Disclosure',
    description: 'Public documentation of AI systems, model cards, impact assessments, and clear explanations of automated decision-making.',
    color: '#0ea5e9',
    colorSecondary: '#0284c7'
  },
  {
    icon: <Scale size={24} />,
    title: 'Fairness & Risk Management',
    description: 'Systematic bias testing, fairness audits, risk assessment processes, and documented mitigation strategies.',
    color: '#10b981',
    colorSecondary: '#059669'
  },
  {
    icon: <Users size={24} />,
    title: 'Privacy & Social Impact',
    description: 'Data protection practices, user consent mechanisms, privacy-by-design principles, and consideration of societal implications.',
    color: '#8b5cf6',
    colorSecondary: '#7c3aed'
  }
];

// Methodology transparency points
export const methodologyPoints = [
  {
    title: 'Public Data Only',
    description: 'We evaluate what companies publicly disclose, creating incentives for transparency.'
  },
  {
    title: 'Evolving Framework',
    description: 'Our methodology updates as AI governance standards and best practices mature.'
  },
  {
    title: 'Governance Focus',
    description: 'We assess frameworks and policies, not technical performance or model accuracy.'
  }
];

// Audience items for AudienceStrip
export const audienceItems = [
  {
    icon: <Building size={20} />,
    title: 'Investors & Analysts',
    description: 'Evaluate AI governance risks and opportunities in potential investments.'
  },
  {
    icon: <FileText size={20} />,
    title: 'Policy Makers',
    description: 'Access independent data to inform AI regulation and oversight policies.'
  },
  {
    icon: <Lightbulb size={20} />,
    title: 'AI Practitioners',
    description: 'Benchmark your organization against industry best practices.'
  },
  {
    icon: <BookOpen size={20} />,
    title: 'Researchers & Advocates',
    description: 'Leverage standardized evaluations for research and public accountability.'
  }
];
