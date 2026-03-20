/**
 * About page content data
 */

import { Search, Layers, Cpu, BarChart3, LinkIcon } from 'lucide-react';

export const howItWorksCards = [
  {
    icon: Search,
    title: 'Public Evidence Only',
    description: 'We evaluate companies based on what they publicly disclose \u2014 governance documents, transparency reports, regulatory filings, and official statements.'
  },
  {
    icon: Layers,
    title: '7-Pillar Framework',
    description: 'Each company is assessed across seven pillars of responsible AI, from transparency and fairness to governance and external accountability.'
  },
  {
    icon: Cpu,
    title: 'AI Extracts. Rules Score.',
    description: 'AI is used only to extract verbatim evidence from public documents. It does not score, interpret, or make judgments. All scoring is deterministic and rule-based.'
  },
  {
    icon: BarChart3,
    title: '14-Point Scale',
    description: 'Each pillar scores 0\u20132 based on evidence type: Operational (2), Policy (1), or No Evidence (0). Maximum score: 14.'
  },
  {
    icon: LinkIcon,
    title: 'Fully Traceable',
    description: 'Every score traces back to verbatim excerpts from public source documents. No score exists without documented, verifiable evidence.'
  }
];

export const principles = [
  {
    title: 'Evidence over claims',
    description: 'We score what companies demonstrably do, not what they say they believe. Marketing language and aspirational statements do not earn points.'
  },
  {
    title: 'One framework for every company',
    description: 'A Fortune 500 bank is evaluated with the same criteria as a Fortune 500 retailer. Consistent standards enable meaningful comparison.'
  },
  {
    title: 'Transparency about limitations',
    description: 'Our scores reflect public disclosures, not internal practices. A low score may mean limited transparency rather than poor governance.'
  },
  {
    title: 'Independence',
    description: 'RAI Scores is not funded by or affiliated with the companies we evaluate. No company can pay for a higher score or suppress a low one.'
  }
];
