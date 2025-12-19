# RAI Scores - Architecture Documentation

This document explains the technical architecture of the RAI Scores frontend application, including the technology stack, folder structure, data flow patterns, and component organization.

---

## Table of Contents

1. [Technology Stack](#technology-stack)
2. [Folder Structure](#folder-structure)
3. [Data Architecture](#data-architecture)
4. [Component Architecture](#component-architecture)
5. [State Management](#state-management)
6. [Routing](#routing)
7. [Styling Architecture](#styling-architecture)
8. [Build & Deployment](#build--deployment)

---

## Technology Stack

### Core Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19.1.0 | UI framework |
| React DOM | 19.1.0 | DOM rendering |
| React Router DOM | 7.6.0 | Client-side routing |
| React Scripts | 5.0.1 | Build tooling (Create React App) |

### Styling

| Technology | Version | Purpose |
|------------|---------|---------|
| Tailwind CSS | 4.1.11 | Utility-first CSS |
| @tailwindcss/postcss | 4.1.11 | PostCSS integration |
| Autoprefixer | 10.4.21 | CSS vendor prefixing |

### UI Components

| Library | Version | Purpose |
|---------|---------|---------|
| Lucide React | 0.513.0 | Icon system |

### Development & Deployment

| Tool | Version | Purpose |
|------|---------|---------|
| gh-pages | 6.3.0 | GitHub Pages deployment |
| Web Vitals | 4.2.4 | Performance monitoring |

### Testing

| Tool | Purpose |
|------|---------|
| @testing-library/react | Component testing |
| @testing-library/jest-dom | DOM assertions |
| @testing-library/user-event | User interaction simulation |

---

## Folder Structure

```
frontend/
├── public/                     # Static assets (served as-is)
│   ├── data/                   # JSON data files
│   │   ├── companies/          # Individual company data
│   │   │   ├── {slug}_profile.json
│   │   │   └── {slug}_scores.json
│   │   ├── rankings/           # Ranking data
│   │   │   └── companyRankings.json
│   │   └── company_list.json   # Company directory data
│   ├── 404.html                # GitHub Pages SPA fallback
│   ├── favicon.ico             # Browser favicon
│   ├── index.html              # HTML entry point
│   ├── manifest.json           # PWA manifest
│   ├── og-image.png            # Social sharing image
│   ├── robots.txt              # Search engine directives
│   └── sitemap.xml             # SEO sitemap
│
├── src/                        # Application source code
│   ├── assets/                 # Imported assets
│   │   └── logo_transparent.svg
│   │
│   ├── components/             # Reusable components
│   │   ├── company/            # Company-specific components
│   │   │   ├── tabs/           # Tab content components
│   │   │   │   ├── MethodologyTab.js
│   │   │   │   ├── OverviewTab.js
│   │   │   │   └── SourcesTab.js
│   │   │   └── PillarCard.js
│   │   │
│   │   ├── ui/                 # Generic UI components
│   │   │   ├── ErrorMessage.js
│   │   │   └── LoadingSpinner.js
│   │   │
│   │   ├── CompanyCard.js      # Directory card component
│   │   ├── Footer.js           # Site footer
│   │   ├── NavBar.js           # Navigation header
│   │   ├── SearchAndFilters.js # Search/filter UI
│   │   ├── ShareButton.js      # Social sharing modal
│   │   └── StarRating.js       # Star display component
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── useCompanyData.js   # Company data fetching
│   │   └── useIndustryComparisons.js  # Rankings data
│   │
│   ├── pages/                  # Page components (routes)
│   │   ├── About.js
│   │   ├── ComingSoon.js
│   │   ├── CompanyDirectory.js
│   │   ├── CompanyPage.js
│   │   ├── Contact.js
│   │   ├── Home.js
│   │   └── Methodology.js
│   │
│   ├── utils/                  # Utility functions
│   │   └── colorMapping.js     # Status-to-color utilities
│   │
│   ├── App.js                  # Root component with routes
│   ├── App.css                 # Global app styles
│   ├── App.test.js             # App tests
│   ├── index.js                # React entry point
│   ├── index.css               # Tailwind imports
│   ├── reportWebVitals.js      # Performance reporting
│   └── setupTests.js           # Test configuration
│
├── design-system.md            # Design documentation
├── requirements.md             # Feature documentation
├── architecture.md             # This file
├── Color and Style Guide.txt   # Original color reference
├── package.json                # Dependencies & scripts
├── tailwind.config.js          # Tailwind configuration
└── postcss.config.js           # PostCSS configuration
```

---

## Data Architecture

### Data Storage Strategy

The application uses a **static JSON file architecture**:

- No backend server or database
- All data pre-generated and stored as JSON files
- Served directly from the `public/data/` directory
- Fetched at runtime via HTTP requests

### Data File Organization

```
public/data/
├── company_list.json           # Directory listing (all companies)
├── companies/                  # Per-company data
│   ├── {slug}_profile.json     # Company metadata
│   └── {slug}_scores.json      # Assessment scores & sources
└── rankings/
    └── companyRankings.json    # Industry rankings & comparisons
```

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        JSON Data Files                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────────┐  │
│  │company_list  │  │{slug}_profile│  │companyRankings.json  │  │
│  │   .json      │  │{slug}_scores │  │                      │  │
│  └──────────────┘  └──────────────┘  └──────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
           │                  │                    │
           ▼                  ▼                    ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Custom React Hooks                          │
│  ┌──────────────────────┐  ┌────────────────────────────────┐  │
│  │  useCompanyData()    │  │  useIndustryComparisons()      │  │
│  │  - Fetch profile     │  │  - Fetch rankings              │  │
│  │  - Fetch scores      │  │  - Get industry data           │  │
│  │  - Merge data        │  │  - Get company rankings        │  │
│  │  - Animation trigger │  │                                │  │
│  └──────────────────────┘  └────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
           │                             │
           ▼                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Page Components                          │
│  ┌────────────────┐  ┌──────────────┐  ┌────────────────────┐  │
│  │CompanyDirectory│  │ CompanyPage  │  │      Home          │  │
│  │ (list view)    │  │ (detail view)│  │ (featured view)    │  │
│  └────────────────┘  └──────────────┘  └────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

### Data Fetching Patterns

#### Pattern 1: Direct Fetch (Company Directory)

```javascript
// CompanyDirectory.js
useEffect(() => {
  fetch(`${process.env.PUBLIC_URL}/data/company_list.json`)
    .then(res => res.json())
    .then(data => {
      setCompanies(data);
      const industries = [...new Set(data.map(c => c.industry))].sort();
      setIndustryOptions(industries);
      setLoading(false);
    })
    .catch(err => {
      setError("Failed to load companies.");
      setLoading(false);
    });
}, []);
```

#### Pattern 2: Custom Hook (Company Detail)

```javascript
// hooks/useCompanyData.js
export const useCompanyData = (slug) => {
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animateScores, setAnimateScores] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch(`${process.env.PUBLIC_URL}/data/companies/${slug}_profile.json`),
      fetch(`${process.env.PUBLIC_URL}/data/companies/${slug}_scores.json`)
    ])
    .then(responses => Promise.all(responses.map(r => r.json())))
    .then(([profile, scores]) => {
      // Merge profile and scores data
      setCompanyData({ ...profile, ...scores.aggregate, pillarDetails: scores.pillarDetails });
      setLoading(false);
      setTimeout(() => setAnimateScores(true), 500);
    })
    .catch(err => {
      setError(err);
      setLoading(false);
    });
  }, [slug]);

  return { companyData, loading, error, animateScores };
};
```

#### Pattern 3: Helper Functions (Rankings)

```javascript
// hooks/useIndustryComparisons.js
export const getIndustryDataForCompany = (companyData, industryComparisons) => {
  if (!companyData?.industry || !industryComparisons) return null;
  return industryComparisons.industrySummaries[companyData.industry];
};

export const getCompanyDetailsFromRankings = (companyData, industryComparisons) => {
  if (!companyData?.slug || !industryComparisons?.allCompanies) return null;
  return industryComparisons.allCompanies.find(c => c.slug === companyData.slug);
};
```

### Data Transformation

Company data undergoes transformation when merged:

```javascript
// Merged company data structure
{
  // From profile.json
  name, slug, website, industry, headquarters,
  fortune_rank, ticker, founded_year, employee_count,
  market_cap_usd, is_public, summary,

  // From scores.json.aggregate
  totalScoreOutOf7, percentScore, starRating,

  // From scores.json
  pillarDetails: { ... },
  overallFindings: "...",

  // Hardcoded (for now)
  last_updated: "2025-06-10",
  percentile_rank: 95,
  industry_rank: 2,
  total_companies_in_industry: 45,
  data_confidence: "High",
  source_count: 14
}
```

---

## Component Architecture

### Component Hierarchy

```
App
├── NavBar                          # Global navigation
├── Routes
│   ├── Home                        # Landing page
│   ├── CompanyDirectory            # Company listing
│   │   ├── SearchAndFilters        # Search/filter UI
│   │   │   ├── Dropdown            # Industry/sort dropdowns
│   │   │   └── RangeSlider         # Score range slider
│   │   └── CompanyCard[]           # Company cards
│   │       └── CompanyName         # Truncating name component
│   │
│   ├── CompanyPage                 # Company detail
│   │   ├── StarRating              # Star display
│   │   ├── ShareButton             # Share modal
│   │   ├── OverviewTab             # Overview content
│   │   │   └── PillarCard[]        # Pillar assessments
│   │   ├── MethodologyTab          # Methodology content
│   │   └── SourcesTab              # Sources content
│   │
│   ├── Methodology                 # Standalone methodology
│   ├── About                       # About page
│   ├── Contact                     # Contact page
│   └── ComingSoon                  # Placeholder page
│
└── Footer                          # Global footer
```

### Component Categories

#### 1. Page Components (`src/pages/`)

Top-level route components that represent full pages:

| Component | Route | Purpose |
|-----------|-------|---------|
| `Home.js` | `/` | Landing page |
| `CompanyDirectory.js` | `/companies` | Company listing |
| `CompanyPage.js` | `/company/:slug` | Company detail |
| `Methodology.js` | `/methodology` | Methodology page |
| `About.js` | `/about` | About page |
| `Contact.js` | `/contact`, `/request` | Contact form |
| `ComingSoon.js` | `/blog`, `/faq`, etc. | Placeholder |

#### 2. Layout Components (`src/components/`)

Structural components used across pages:

| Component | Purpose |
|-----------|---------|
| `NavBar.js` | Site header with navigation |
| `Footer.js` | Site footer with links |

#### 3. Feature Components (`src/components/`)

Complex, feature-rich components:

| Component | Purpose |
|-----------|---------|
| `SearchAndFilters.js` | Search, filter, and sort UI |
| `ShareButton.js` | Social sharing modal |
| `CompanyCard.js` | Company card with score display |
| `StarRating.js` | 5-star rating display |

#### 4. Company Tab Components (`src/components/company/tabs/`)

Tab content for company detail page:

| Component | Purpose |
|-----------|---------|
| `OverviewTab.js` | Executive summary and pillars |
| `MethodologyTab.js` | Assessment methodology |
| `SourcesTab.js` | Research sources |

#### 5. UI Components (`src/components/ui/`)

Generic, reusable UI elements:

| Component | Purpose |
|-----------|---------|
| `LoadingSpinner.js` | Loading indicator |
| `ErrorMessage.js` | Error display with retry |
| `PillarCard.js` | Individual pillar assessment |

### Component Design Patterns

#### Pattern 1: Container/Presentational Split

Page components handle data fetching; child components receive data as props.

```javascript
// CompanyPage.js (container)
const { companyData, loading, error, animateScores } = useCompanyData(slug);

return (
  <OverviewTab
    companyData={companyData}
    animateScores={animateScores}
    // ...other props
  />
);
```

#### Pattern 2: Render Props for Dynamic Icons

```javascript
// PillarCard.js
const PillarCard = ({ icon: Icon, ... }) => {
  return (
    <div className={`p-3 rounded-lg ${color.bg}`}>
      <Icon className={`w-5 h-5 ${color.text}`} />
    </div>
  );
};
```

#### Pattern 3: Compound Components

SearchAndFilters contains internal Dropdown and RangeSlider components:

```javascript
// SearchAndFilters.js
function Dropdown({ label, value, onChange, options, placeholder }) { ... }
function RangeSlider({ label, min, max, value, onChange, step }) { ... }

function SearchAndFilters({ ... }) {
  return (
    <>
      <Dropdown ... />
      <RangeSlider ... />
    </>
  );
}
```

---

## State Management

### State Strategy

The application uses **React's built-in state management**:

- `useState` for component-local state
- `useEffect` for side effects and data fetching
- Props for parent-to-child data flow
- Callbacks for child-to-parent communication

### No Global State Library

Given the application's scope, no Redux/Zustand/Context is used. Each page manages its own data fetching and state.

### State Patterns by Component

#### CompanyDirectory State

```javascript
// Data state
const [companies, setCompanies] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// Filter state
const [searchTerm, setSearchTerm] = useState('');
const [selectedIndustry, setSelectedIndustry] = useState('');
const [scoreRange, setScoreRange] = useState([0, 7]);
const [sortBy, setSortBy] = useState('');
const [showTopPerformers, setShowTopPerformers] = useState(false);

// Derived data (computed in component)
const filteredCompanies = useMemo(() => {
  return companies.filter(/* ... */);
}, [companies, searchTerm, selectedIndustry, scoreRange, showTopPerformers]);
```

#### CompanyPage State

```javascript
// Data from custom hook
const { companyData, loading, error, animateScores } = useCompanyData(slug);
const { industryComparisons } = useIndustryComparisons();

// UI state
const [activeTab, setActiveTab] = useState('overview');
```

#### ShareButton State

```javascript
const [isOpen, setIsOpen] = useState(false);  // Modal visibility
const [copied, setCopied] = useState(false);  // Copy feedback
```

---

## Routing

### Router Configuration

```javascript
// App.js
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/companies" element={<CompanyDirectory />} />
        <Route path="/company/:slug" element={<CompanyPage />} />
        <Route path="/methodology" element={<Methodology />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/request" element={<Contact />} />
        <Route path="/blog" element={<ComingSoon />} />
        <Route path="/faq" element={<ComingSoon />} />
        <Route path="/privacy" element={<ComingSoon />} />
        <Route path="/terms" element={<ComingSoon />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
```

### Dynamic Route Parameters

```javascript
// CompanyPage.js
import { useParams } from 'react-router-dom';

function CompanyPage() {
  const { slug } = useParams();  // Extract from URL
  const { companyData, loading, error } = useCompanyData(slug);
  // ...
}
```

### Navigation Links

```javascript
// Using React Router Link component
import { Link } from 'react-router-dom';

<Link to="/companies">Browse Companies</Link>
<Link to={`/company/${company.slug}`}>View Details</Link>
```

### SPA Fallback (GitHub Pages)

```html
<!-- public/404.html -->
<!-- Redirects all 404s back to index.html for client-side routing -->
<script>
  var pathSegments = window.location.pathname.split('/').filter(Boolean);
  window.location.replace('/' + pathSegments.join('/'));
</script>
```

---

## Styling Architecture

### Tailwind CSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### CSS Organization

```
src/
├── index.css        # Tailwind imports + animations + reusable component classes
├── App.css          # Global custom styles (minimal)
└── components/      # Tailwind utility classes (inline className)
```

### Primary Styling Approach: Tailwind Utility Classes

The codebase uses Tailwind CSS as the primary styling method:

```jsx
<div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
  <h2 className="text-2xl font-bold text-gray-900 mb-4">Title</h2>
</div>
```

### Reusable Component Classes (index.css)

Common patterns are defined in `index.css` using Tailwind's `@apply` directive:

```css
/* Animations */
@keyframes float { ... }
@keyframes pulse-subtle { ... }
@keyframes slideInUp { ... }
@keyframes spin { ... }

/* Layout */
.container-default { @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full; }
.container-wide { @apply max-w-[1400px] mx-auto px-5 md:px-9 w-full; }

/* Components */
.glass { @apply bg-white/70 backdrop-blur-lg border-b border-gray-200/80 shadow-sm; }
.btn-primary { @apply bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors; }
.btn-secondary { @apply border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors; }
.spinner { @apply w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin; }

/* Backgrounds */
.bg-footer-gradient { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); }
```

### Dynamic Class Generation

For status-based styling:

```jsx
<div className={`rounded-lg p-4 ${color.bg}`}>
  <span className={`font-semibold ${color.text}`}>{status}</span>
</div>
```

### Hover States: Tailwind Variants

```jsx
<button className="bg-blue-500 hover:bg-blue-600 transition-colors duration-200">
```

### Acceptable Inline Styles

Inline styles are used only for truly dynamic values:

```jsx
// Parallax effects
style={{ transform: `translateY(${scrollY * 0.5}px)` }}

// Dynamic progress bar widths
style={{ width: `${(score / maxScore) * 100}%` }}

// Data-driven colors from JSON
style={{ backgroundColor: pillar.color }}
```

### Utility Functions

```javascript
// src/utils/colorMapping.js
export const getColorClassesFromStatus = (status) => {
  switch (status) {
    case 'excellent': return { text: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle };
    case 'good':      return { text: 'text-blue-600',  bg: 'bg-blue-50',  icon: CheckCircle };
    // ...
  }
};

export const getScoreColor = (score) => {
  if (score >= 8) return 'text-green-600';
  if (score >= 6) return 'text-blue-600';
  // ...
};
```

---

## Build & Deployment

### Available Scripts

```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

### Build Process

1. **Development**: `npm start` - Runs dev server with hot reload
2. **Production Build**: `npm run build` - Creates optimized production build
3. **Deployment**: `npm run deploy` - Builds and deploys to GitHub Pages

### Environment Variables

```javascript
// Used for public URL resolution
process.env.PUBLIC_URL  // Base URL for static assets
```

### GitHub Pages Configuration

```json
// package.json
{
  "homepage": "https://username.github.io/rai-scores"
}
```

### Production Optimizations

- Code splitting via React's lazy loading (if needed)
- Asset optimization via Create React App
- Tree shaking of unused code
- Minification and compression

### Browser Support

Defined in `browserslist` in package.json:
- Production: >0.2%, not dead, not op_mini all
- Development: last 1 chrome version, last 1 firefox version, last 1 safari version

---

## Key Architectural Decisions

### 1. Static JSON vs. Backend API

**Decision**: Use static JSON files instead of a backend API.

**Rationale**:
- Simplifies deployment (static hosting)
- No server costs
- Fast page loads (files can be cached)
- Data doesn't change frequently

**Trade-offs**:
- Data updates require rebuild/redeploy
- No user-specific data
- Limited to client-side filtering/search

### 2. Create React App vs. Next.js/Vite

**Decision**: Use Create React App (CRA).

**Rationale**:
- Familiar tooling
- Zero configuration
- Good for SPAs without SSR needs

**Trade-offs**:
- No server-side rendering
- Larger initial bundle size
- Limited build customization

### 3. Tailwind CSS as Primary Styling

**Decision**: Tailwind CSS with reusable classes in index.css.

**Rationale**:
- Tailwind utility classes for all static styles
- Reusable component classes (`.glass`, `.btn-primary`, etc.) defined in index.css using `@apply`
- Inline styles only for truly dynamic values (parallax, calculated widths, data-driven colors)
- No CSS-in-JS library needed

**Benefits**:
- Consistent styling approach across all components
- Smaller bundle size (utility classes are deduplicated)
- Full access to Tailwind's responsive prefixes and design tokens
- Hover states use Tailwind's `hover:` variants instead of inline event handlers

### 4. No Global State Management

**Decision**: Use React's built-in state only.

**Rationale**:
- Application scope is limited
- No complex state sharing between distant components
- Simpler mental model

**Trade-offs**:
- Would need refactoring if app grows significantly
- Some prop drilling in deep component trees

---

## Future Architecture Considerations

1. **API Integration**: If adding a backend, create a data service layer
2. **Authentication**: Would require global auth state (Context or library)
3. **Real-time Updates**: Consider WebSocket integration or polling
4. **Caching**: Implement SWR or React Query for better data management
5. **Code Splitting**: Lazy load routes for better initial load time
6. **Testing**: Expand test coverage beyond basic App test
