/**
 * Methodology page content data
 */

import { Eye, Scale, Brain, Users, Shield, Building, Award,
         FileText, Cpu, RefreshCw, Globe } from 'lucide-react';

export const frameworkCards = [
  {
    icon: FileText,
    title: 'Evidence-Based',
    description: 'Grounded in publicly available documentation and verifiable information.'
  },
  {
    icon: Cpu,
    title: 'Deterministic',
    description: 'AI extracts verbatim evidence from public sources. All scoring is computed from evidence classifications \u2014 no subjective judgment.'
  },
  {
    icon: RefreshCw,
    title: 'Reproducible',
    description: 'Same inputs always produce the same scores. The pipeline can be re-run against updated sources to track changes over time.'
  }
];

export const scoringTiers = [
  {
    score: '2/2',
    title: 'Operational Evidence',
    colorClass: 'text-emerald-600',
    bgClass: 'bg-emerald-50',
    borderClass: 'border-emerald-200',
    description: 'Concrete, observable accountability mechanisms \u2014 processes that run, controls that are executed, named oversight bodies with documented authority and meeting cadence.',
    example: '\u201COur AI Ethics Board reviews all high-risk deployments quarterly and publishes findings.\u201D'
  },
  {
    score: '1/2',
    title: 'Policy Evidence',
    colorClass: 'text-amber-600',
    bgClass: 'bg-amber-50',
    borderClass: 'border-amber-200',
    description: 'Formal documentation describing intent, structure, or expectations \u2014 published principles, governance frameworks, stated policies \u2014 without evidence that these translate into operational practice.',
    example: '\u201CWe are committed to fairness in AI and have established guidelines.\u201D'
  },
  {
    score: '0/2',
    title: 'No Qualifying Evidence',
    colorClass: 'text-slate-500',
    bgClass: 'bg-slate-50',
    borderClass: 'border-slate-200',
    description: 'No public evidence meeting our criteria was found, or only narrative and aspirational content such as values statements, blog posts about AI ethics, or marketing language.',
    note: 'Narrative content signals awareness but does not demonstrate governance.'
  }
];

export const starRatings = [
  { stars: '\u2605\u2605\u2605\u2605\u2605', range: '13\u201314 points' },
  { stars: '\u2605\u2605\u2605\u2605', range: '10\u201312 points' },
  { stars: '\u2605\u2605\u2605', range: '7\u20139 points' },
  { stars: '\u2605\u2605', range: '4\u20136 points' },
  { stars: '\u2605', range: '0\u20133 points' }
];

export const gradeRanges = [
  { grade: 'A-range', variants: 'A+, A, A\u2212', colorClass: 'text-emerald-700', threshold: '\u226580% (11\u201314 pts)', meaning: 'Strong governance & disclosure' },
  { grade: 'B-range', variants: 'B+, B, B\u2212', colorClass: 'text-blue-700', threshold: '\u226565% (9\u201310 pts)', meaning: 'Solid foundations with gaps' },
  { grade: 'C-range', variants: 'C+, C, C\u2212', colorClass: 'text-amber-700', threshold: '\u226550% (7\u20138 pts)', meaning: 'Limited public evidence' },
  { grade: 'D', variants: 'D', colorClass: 'text-red-700', threshold: '<50% (0\u20136 pts)', meaning: 'Minimal disclosure' }
];

export const pillars = [
  {
    id: 'transparency',
    title: 'Transparency',
    icon: Eye,
    description: 'Public disclosure of AI systems, capabilities, limitations, and decision-making processes. Includes model cards, system documentation, and algorithmic transparency reports.'
  },
  {
    id: 'fairness',
    title: 'Fairness & Bias Mitigation',
    icon: Scale,
    description: 'Systematic approaches to identify, measure, and mitigate bias in AI systems. Includes bias audits, fairness metrics, diverse testing practices, and corrective measures.'
  },
  {
    id: 'explainability',
    title: 'Explainability',
    icon: Brain,
    description: 'Ability to explain AI decision-making processes in understandable terms. Includes interpretability tools, explanation interfaces, and decision rationale documentation.'
  },
  {
    id: 'oversight',
    title: 'Human Oversight & Accountability',
    icon: Users,
    description: 'Human-in-the-loop systems, accountability structures, and oversight mechanisms for AI deployment. Includes governance bodies, escalation procedures, and responsible deployment practices.'
  },
  {
    id: 'privacy',
    title: 'Privacy & Data Protection',
    icon: Shield,
    description: 'Data protection practices, user privacy controls, and privacy-by-design principles. Includes data minimization, consent mechanisms, and privacy impact assessments.'
  },
  {
    id: 'governance',
    title: 'Governance & Internal Controls',
    icon: Building,
    description: 'Internal governance structures, ethics committees, risk management, and compliance frameworks for AI. Includes policies, training, audit processes, and accountability mechanisms.'
  },
  {
    id: 'external_accountability',
    title: 'Public Commitments & External Audits',
    icon: Award,
    description: 'Public commitments to responsible AI principles and third-party validation. Includes certifications, external audits, industry partnerships, and regulatory engagement.'
  }
];

export const sourceTiers = [
  {
    icon: Globe,
    title: 'Company-Owned',
    iconBgClass: 'bg-blue-100',
    iconColorClass: 'text-blue-600',
    credit: 'Full credit up to Operational (2/2)',
    description: 'The company\'s own websites, documentation, annual reports, and official publications. These are the most authoritative sources because the company directly controls and stands behind the content.'
  },
  {
    icon: Shield,
    title: 'Authority',
    iconBgClass: 'bg-green-100',
    iconColorClass: 'text-green-600',
    credit: 'Full credit up to Operational (2/2)',
    description: 'Government agencies, regulatory bodies, and enforcement actions. Regulatory filings and enforcement records provide independent verification of governance practices.'
  },
  {
    icon: FileText,
    title: 'Third-Party',
    iconBgClass: 'bg-amber-100',
    iconColorClass: 'text-amber-600',
    credit: 'Capped at Policy (1/2)',
    description: 'News outlets, academic research, and independent publications. Third-party accounts may be secondhand or incomplete. Only the company or an authority can definitively confirm operational implementation.'
  }
];

export const processSteps = [
  {
    title: 'Source Collection & Validation',
    description: 'Public documentation gathered from company websites, regulatory filings, and third-party publications. Each source is assigned a tier and validated for relevance.'
  },
  {
    title: 'Evidence Extraction',
    description: 'AI reads source documents and extracts verbatim evidence relevant to each pillar\'s criteria. Each piece of evidence is classified as Operational, Policy, or Narrative based on what it describes.'
  },
  {
    title: 'Evidence Validation',
    description: 'Three-level text matching verifies that every piece of extracted evidence actually appears in the original source document. Evidence that cannot be traced back to its source is discarded.'
  },
  {
    title: 'Deterministic Scoring',
    description: 'Pillar scores are computed from validated evidence classifications with source tier weighting applied. The highest qualifying evidence type per pillar sets that pillar\'s score. No human judgment in the scoring step.'
  }
];

export const limitations = [
  'Scores are based solely on publicly available information. Companies with strong internal practices but limited public disclosure will score lower.',
  'The three-tier evidence classification (Operational / Policy / No Evidence) does not capture gradations within each level.',
  'Assessments are point-in-time snapshots. A company\'s score reflects what was publicly documented when the assessment was run.',
  'We evaluate governance frameworks and disclosure practices, not the technical performance or accuracy of individual AI models.',
  'Source coverage varies. Companies with more extensive public documentation have more evidence available for evaluation.'
];

export const anchorLinks = [
  { id: 'framework', label: 'Framework' },
  { id: 'scoring', label: 'Scoring' },
  { id: 'pillars', label: 'Pillars' },
  { id: 'sources', label: 'Sources' },
  { id: 'limitations', label: 'Limitations' }
];
