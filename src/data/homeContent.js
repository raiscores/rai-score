/**
 * Home page content data
 * Extracted from Home.js for better maintainability
 */

import { Eye, Scale, Users, Shield, Building, Lightbulb, FileText, Star } from 'lucide-react';

// Trust indicators for hero section
export const trustIndicators = [
  "Evidence-based methodology",
  "Publicly available data only",
  "Independent evaluation"
];

// Enhanced evaluation themes
export const evaluationThemes = [
  {
    icon: <Shield size={32} />,
    title: 'Governance & Oversight',
    description: 'Board oversight, ethics committees, clear policies, and leadership accountability for AI decisions and outcomes.',
    subtitle: 'Leadership commitment and institutional frameworks',
    color: '#2563eb',
    colorSecondary: '#1d4ed8'
  },
  {
    icon: <Eye size={32} />,
    title: 'Transparency & Disclosure',
    description: 'Public documentation of AI systems, model cards, impact assessments, and clear explanations of automated decision-making.',
    subtitle: 'Public reporting and system documentation',
    color: '#0ea5e9',
    colorSecondary: '#0284c7'
  },
  {
    icon: <Scale size={32} />,
    title: 'Fairness & Risk Management',
    description: 'Systematic bias testing, fairness audits, risk assessment processes, and documented mitigation strategies.',
    subtitle: 'Testing, measurement, and risk mitigation',
    color: '#10b981',
    colorSecondary: '#059669'
  },
  {
    icon: <Users size={32} />,
    title: 'Privacy & Social Impact',
    description: 'Data protection practices, user consent mechanisms, privacy-by-design principles, and consideration of societal implications.',
    subtitle: 'User protection and societal responsibility',
    color: '#8b5cf6',
    colorSecondary: '#7c3aed'
  }
];

// Target audiences
export const audiences = [
  {
    icon: <Building size={24} />,
    title: 'Investors & Analysts',
    description: 'Evaluate AI governance risks and opportunities in potential investments or portfolio companies.',
    useCase: 'Due diligence and risk assessment',
    color: '#2563eb'
  },
  {
    icon: <FileText size={24} />,
    title: 'Policy Makers',
    description: 'Access independent data to inform AI regulation, oversight policies, and public sector decisions.',
    useCase: 'Evidence-based policy development',
    color: '#059669'
  },
  {
    icon: <Lightbulb size={24} />,
    title: 'AI Practitioners',
    description: 'Benchmark your organization against industry practices and identify areas for improvement.',
    useCase: 'Internal benchmarking and best practices',
    color: '#7c3aed'
  },
  {
    icon: <Star size={24} />,
    title: 'Researchers & Advocates',
    description: 'Leverage standardized evaluations for academic research, advocacy work, and public accountability efforts.',
    useCase: 'Research and public advocacy',
    color: '#dc2626'
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

// Coming soon features with detailed descriptions
export const expandingImpactFeatures = [
  {
    icon: '📊',
    title: 'Detailed Score Breakdowns',
    description: 'More granular analysis for each pillar with specific improvement recommendations.'
  },
  {
    icon: '🏆',
    title: 'Industry Benchmarks',
    description: 'Compare companies within sectors for quick context and actionable insight.'
  },
  {
    icon: '⭐',
    title: 'Premium Access',
    description: 'Advanced analytics, custom reports, and real-time monitoring for stakeholders'
  },
  {
    icon: '🛡️',
    title: 'Responsible AI Certification',
    description: 'Independent certification program for companies demonstrating excellence in AI governance and ethics'
  }
];
