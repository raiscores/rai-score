/**
 * Home page content data
 * (trustIndicators / evaluationThemes / methodologyPoints were removed with
 * the June 2026 homepage redesign — their sections no longer exist)
 */

import { Building, FileText, Lightbulb, BookOpen } from 'lucide-react';

// Audience items for the "Built for" line (AudienceStrip)
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
