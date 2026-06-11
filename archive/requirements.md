# RAI Scores - Requirements Documentation

This document describes the current features, user flows, and functionality implemented in the RAI Scores frontend application.

---

## Table of Contents

1. [Product Overview](#product-overview)
2. [Pages & Routes](#pages--routes)
3. [Core Features](#core-features)
4. [User Flows](#user-flows)
5. [Data Requirements](#data-requirements)
6. [Functional Specifications](#functional-specifications)

---

## Product Overview

### Mission Statement

RAI Scores (Responsible AI Scorecard) is a web application that makes AI accountability transparent, accessible, and actionable for everyone. It provides comprehensive assessments of how Fortune 500 companies implement responsible AI practices.

### Target Users

- **Business Decision Makers**: Evaluating AI vendors and partners
- **Compliance Teams**: Assessing corporate AI governance
- **Investors**: Understanding ESG and AI risk profiles
- **Researchers**: Studying corporate AI accountability
- **General Public**: Learning about company AI practices

### Core Value Proposition

- Independent, evidence-based assessment of corporate AI practices
- Standardized scoring across seven responsible AI pillars
- Transparent methodology with source citations
- Easy-to-understand grades and rankings

---

## Pages & Routes

### Public Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home | Landing page with featured companies and value proposition |
| `/companies` | Company Directory | Searchable/filterable list of all evaluated companies |
| `/company/:slug` | Company Page | Detailed assessment for individual company |
| `/methodology` | Methodology | Explanation of assessment framework |
| `/about` | About | Information about RAI Scores |
| `/contact` | Contact | Contact form / request evaluation |
| `/request` | Request (alias) | Same as contact - request company evaluation |
| `/blog` | Coming Soon | Placeholder for future blog |
| `/faq` | Coming Soon | Placeholder for future FAQ |
| `/privacy` | Coming Soon | Placeholder for privacy policy |
| `/terms` | Coming Soon | Placeholder for terms of service |

### Navigation Structure

**Primary Navigation (NavBar):**
- Companies
- About
- Methodology
- Request

**Footer Quick Links:**
- Browse Companies
- Our Methodology
- About Us
- Request Evaluation
- Blog
- FAQ

---

## Core Features

### 1. Company Directory (`/companies`)

#### Search Functionality
- Real-time text search across company names and industries
- Debounced search input
- Case-insensitive matching

#### Filtering System
- **Industry Filter**: Dropdown with all available industries
- **Score Range**: Dual range sliders (0-7 scale)
- **Top Performers Toggle**: Filter for companies with score ≥6.5
- **Sort Options**:
  - By name (alphabetical)
  - By score (descending)
  - By score (ascending)
  - By industry (alphabetical)

#### Display Features
- Responsive grid layout (auto-fill columns, min 300px)
- Company cards showing:
  - Company name (with truncation for long names)
  - Company initials avatar
  - Industry badge
  - RAI Score with visual progress bar
  - Score color coding (green/blue/yellow/red)
- Click-through to company detail page
- Results count display
- Loading and error states

### 2. Company Detail Page (`/company/:slug`)

#### Header Section
- Company name
- Industry badge
- Star rating display (1-5 stars)
- Overall score with letter grade
- Share button

#### Tabbed Interface

**Tab 1: Overview**
- Executive Summary with three metric cards:
  - Pillar Implementation (X/7 pillars fully implemented)
  - Performance Percentile ranking
  - Data Confidence level
- Overall findings text summary
- Individual pillar assessment cards:
  - Pillar name and icon
  - Score out of 10 with animated progress bar
  - Status indicator (excellent/good/fair/poor)
  - Source count
  - Findings description
  - "View Sources" link

**Tab 2: Methodology**
- Assessment framework explanation
- Scoring system (Full/Partial/No Evidence)
- Seven pillars detailed breakdown:
  - Transparency
  - Fairness & Bias Mitigation
  - Explainability
  - Human Oversight & Accountability
  - Privacy & Security
  - Governance & Accountability
  - Public Commitments & External Audits
- Limitations and planned enhancements
- Methodology update schedule

**Tab 3: Sources**
- Source statistics overview:
  - Total sources used
  - ESG reports count
  - Policy pages count
  - Confidence level
- Quality indicators (verified, official documents, recently updated)
- Sources grouped by document type (ESG Report, Blog, HTML, PDF)
- Individual source cards with:
  - Title and summary
  - Document type and retrieval date
  - Source URL
- Sources by assessment pillar breakdown
- Source methodology explanation

### 3. Home Page (`/`)

#### Hero Section
- Headline and value proposition
- Call-to-action buttons:
  - Browse Companies (primary)
  - View Methodology (secondary)
- Statistics display (companies evaluated, data sources, pillars)

#### Featured Sections
- Top-rated companies showcase
- How it works explanation
- Call-to-action for company evaluation requests

### 4. Share Functionality

#### Share Modal
- Content preview with company name and grade
- Copy link button with confirmation feedback
- Social sharing options:
  - LinkedIn (professional sharing)
  - X/Twitter (social sharing)
  - Email (with pre-formatted message)
- Auto-generated share messages include:
  - Company name and grade
  - Link to assessment

### 5. Static Pages

#### Methodology Page (`/methodology`)
- Comprehensive explanation of assessment framework
- Same content as company page methodology tab
- Standalone resource for understanding scoring

#### About Page (`/about`)
- Mission and vision
- Team information
- Contact details

#### Contact Page (`/contact`)
- Request company evaluation
- General inquiries
- Feedback submission

#### Coming Soon Page
- Placeholder for upcoming features (blog, FAQ)
- Visual indicator of future content

---

## User Flows

### Flow 1: Browse and Discover Companies

```
1. User lands on Home page
2. Clicks "Browse Companies" CTA
3. Views Company Directory with all companies
4. Uses search to find specific company OR
5. Applies filters (industry, score range, top performers)
6. Clicks on company card
7. Views detailed company assessment
8. Navigates between Overview/Methodology/Sources tabs
9. Shares company assessment via share button
```

### Flow 2: Research Specific Company

```
1. User arrives via direct link to /company/:slug
2. Views company overview with executive summary
3. Reviews individual pillar scores
4. Clicks "View Sources" to verify claims
5. Reviews methodology to understand scoring
6. Shares assessment with colleagues
```

### Flow 3: Understand Methodology

```
1. User clicks "Methodology" in navigation
2. Reviews assessment framework
3. Understands scoring system (0/5/10)
4. Reviews seven pillars and criteria
5. Notes limitations and planned enhancements
```

### Flow 4: Request Company Evaluation

```
1. User clicks "Request" in navigation
2. Views contact/request form
3. Submits request for new company evaluation
4. Receives confirmation
```

### Flow 5: Compare Companies (Implicit)

```
1. User views Company Directory
2. Notes scores and industries of multiple companies
3. Opens companies in separate tabs
4. Compares assessments manually
```

---

## Data Requirements

### Company List Data (`company_list.json`)

```json
{
  "slug": "company-slug",
  "name": "Company Name",
  "industry": "Industry Name",
  "score": 6.5,
  "max_score": 7
}
```

### Company Profile Data (`{slug}_profile.json`)

```json
{
  "name": "Company Name",
  "slug": "company-slug",
  "website": "https://company.com",
  "industry": "Industry",
  "headquarters": "City, State, Country",
  "fortune_rank": 100,
  "ticker": "TICK",
  "founded_year": 2000,
  "employee_count": 50000,
  "market_cap_usd": 100000000000,
  "is_public": true,
  "summary": "Company description...",
  "last_updated": "2025-06-10T00:00:00Z"
}
```

### Company Scores Data (`{slug}_scores.json`)

```json
{
  "company": "Company Name",
  "pillarDetails": {
    "Pillar Name": {
      "score": 1,
      "justification": "Score justification...",
      "findings": "Detailed findings...",
      "relevantSources": [
        {
          "url": "https://source.url",
          "title": "Source Title",
          "summary": "Source summary",
          "documentType": "PDF|HTML|Blog|ESG Report",
          "retrievedAt": "2025-06-10",
          "sourceUsed": true
        }
      ]
    }
  },
  "aggregate": {
    "totalScoreOutOf7": 7,
    "percentScore": 100.0,
    "starRating": 5
  },
  "summary": {
    "starString": "★★★★★",
    "keyStrengths": ["Pillar1", "Pillar2"],
    "keyGaps": [],
    "sourcesUsed": [...],
    "overallFindings": "Overall assessment text..."
  }
}
```

### Rankings Data (`companyRankings.json`)

```json
{
  "allCompanies": [
    {
      "slug": "company-slug",
      "name": "Company Name",
      "industry": "Industry",
      "aggregate_score": 7,
      "industry_rank": 1,
      "rating": "A+",
      "industry_percentile": 95,
      "overall_rank": 1,
      "overall_percentile": 95
    }
  ],
  "industrySummaries": {
    "Technology": {
      "leaders": [...],
      "total_companies": 10
    }
  }
}
```

---

## Functional Specifications

### Scoring System

| Score | Label | Criteria |
|-------|-------|----------|
| 10/10 | Full Implementation | Comprehensive, verifiable evidence |
| 5/10 | Partial Implementation | Limited evidence or general statements |
| 0/10 | No Evidence | No public information found |

### Grade Calculation

- **Total Score**: Sum of all 7 pillar scores (max 70)
- **RAI Score**: Displayed as X/7 (scaled)

| Grade | Point Range | Score Range (out of 7) |
|-------|-------------|------------------------|
| A+ | 63-70 | 6.3-7.0 |
| A | 56-62 | 5.6-6.2 |
| B | 42-55 | 4.2-5.5 |
| C | Below 42 | Below 4.2 |

### Star Rating

| Stars | Score Range |
|-------|-------------|
| ★★★★★ (5) | 100% (7/7) |
| ★★★★ (4) | 80-99% |
| ★★★ (3) | 60-79% |
| ★★ (2) | 40-59% |
| ★ (1) | Below 40% |

### The Seven Pillars

1. **Transparency**: Clear communication about AI systems, capabilities, and limitations
2. **Fairness & Bias Mitigation**: Measures to identify and mitigate AI bias
3. **Explainability**: Ability to explain AI decisions clearly
4. **Human Oversight & Accountability**: Human control and clear accountability
5. **Privacy & Security**: Data protection throughout AI lifecycle
6. **Governance & Accountability**: Structured governance frameworks
7. **Public Commitments & External Audits**: Public commitments and external validation

### Status Indicators

| Status | Criteria |
|--------|----------|
| Excellent | Score ≥8 or percentile ≥90 |
| Good | Score ≥6 or percentile ≥70 |
| Fair | Score ≥4 or percentile ≥40 |
| Poor | Score <4 or percentile <40 |

### Responsive Behavior

| Viewport | Behavior |
|----------|----------|
| ≤768px | Mobile navigation (hamburger menu), single column layouts |
| 769px-1024px | 2-column grids |
| >1024px | Full desktop layout, 3-4 column grids |

### Performance Considerations

- Lazy loading of company data on detail pages
- Delayed score animations (500ms after data load)
- Debounced search input
- Static JSON data files (no server-side rendering)

---

## Planned/Coming Soon Features

Based on code analysis, the following features are referenced but not fully implemented:

1. **Blog Section** (`/blog`) - Coming soon page
2. **FAQ Section** (`/faq`) - Coming soon page
3. **Privacy Policy** (`/privacy`) - Coming soon page
4. **Terms of Service** (`/terms`) - Coming soon page
5. **Premium Source Access** - Commented out in SourcesTab
6. **Free Trial / Pricing** - Commented out in SourcesTab
7. **Real-time Industry Comparisons** - Data structure exists
8. **Historical Score Tracking** - Not implemented
9. **Export/Download Features** - Not implemented
10. **User Accounts** - Not implemented

---

## External Integrations

### Current Integrations
- **Lucide React**: Icon library
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework

### Social Sharing
- Twitter/X intent URLs
- LinkedIn share URLs
- Email mailto links

### No Backend Integration
- All data served from static JSON files
- No user authentication
- No database connections
- Deployed as static site (GitHub Pages via `gh-pages` package)
