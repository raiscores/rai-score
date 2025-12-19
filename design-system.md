# RAI Scores Design System

This document outlines the visual design system used throughout the RAI Scores frontend application, including colors, typography, spacing, component patterns, and UI conventions.

---

## Table of Contents

1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Spacing System](#spacing-system)
4. [Component Styling Patterns](#component-styling-patterns)
5. [UI Conventions](#ui-conventions)
6. [Responsive Design](#responsive-design)

---

## Color Palette

### Brand Colors

| Color Name | Hex Code | Usage |
|------------|----------|-------|
| Brand Primary | `#263552` | Logo text, brand identity |
| Primary Blue | `#3b82f6` | Primary actions, links, focus states |
| Indigo | `#6366f1` | Gradients, accent highlights |

### Semantic Colors

#### Status Colors (Score-Based)

| Status | Text Color | Background Color | Gradient | Score Threshold |
|--------|------------|------------------|----------|-----------------|
| Excellent | `#22c55e` (green-500) | `rgba(34, 197, 94, 0.15)` | `from-green-500 to-green-600` | ≥80% or score ≥8 |
| Good | `#3b82f6` (blue-500) | `rgba(59, 130, 246, 0.15)` | `from-blue-500 to-blue-600` | ≥70% or score ≥6 |
| Fair | `#facc15` (yellow-400) | `rgba(250, 204, 21, 0.15)` | `from-yellow-500 to-yellow-600` | ≥60% or score ≥4 |
| Poor | `#ef4444` (red-500) | `rgba(239, 68, 68, 0.15)` | `from-red-500 to-red-600` | <60% or score <4 |

#### Tailwind Status Classes (from colorMapping.js)

```javascript
// Status to color class mapping
excellent: { text: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle }
good:      { text: 'text-blue-600',  bg: 'bg-blue-50',  icon: CheckCircle }
fair:      { text: 'text-yellow-600', bg: 'bg-yellow-50', icon: AlertCircle }
poor:      { text: 'text-red-600',   bg: 'bg-red-50',   icon: XCircle }
neutral:   { text: 'text-gray-600',  bg: 'bg-gray-50',  icon: AlertCircle }
```

### UI Colors

| Element | Color | Hex/Class |
|---------|-------|-----------|
| Text Primary | Slate 900 | `#1e293b` |
| Text Secondary | Slate 600 | `#64748b` |
| Text Muted | Slate 500 | `#94a3b8` |
| Border Default | Gray 200 | `#e5e7eb` |
| Border Light | `rgba(203, 213, 225, 0.5)` | - |
| Background Page | Slate 50 | `#f8fafc` |
| Background Card | White | `#ffffff` |
| Background Subtle | Gray 50 | `#f9fafb` |

### Footer & Dark Theme Colors

| Element | Color |
|---------|-------|
| Footer Background | `linear-gradient(135deg, #1e293b 0%, #0f172a 100%)` |
| Footer Text | `#f8fafc` |
| Footer Muted Text | `#cbd5e1` |
| Footer Link | `#f1f5f9` |

**Note**: Footer uses inline style for the gradient background to ensure reliable cross-browser rendering.

### Star Rating Colors

| Element | Color |
|---------|-------|
| Filled Star | `#facc15` (yellow-400) |
| Empty Star Outline | `#d1d5db` (gray-300) |

---

## Typography

### Font Stack

The application uses the system font stack inherited from Tailwind CSS defaults:

```css
font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
             "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

### Type Scale

| Element | Size | Weight | Usage |
|---------|------|--------|-------|
| Brand Logo | 1.6rem (mobile: 1.5rem) | 800 | NavBar brand name |
| Page Title | 3rem (mobile: 2.25rem) | 800 | Hero sections, main headings |
| Section Title | 2rem | 700 | Major section headings |
| Card Title | 1.5rem | 700 | Card headers |
| Subsection | 1.125rem | 600 | Subsection headings |
| Body Text | 1rem | 400 | General content |
| Small Text | 0.875rem | 400-500 | Labels, metadata |
| Caption | 0.75rem | 500 | Badges, tags |

### Text Styling Conventions

| Style | Application |
|-------|-------------|
| `letter-spacing: -0.5px` | Brand logo text |
| `letter-spacing: 0.05em` | Nav links (uppercase) |
| `text-transform: uppercase` | Navigation links |
| `line-height: 1.7` | Body paragraphs |
| `line-height: 1.2` | Headings |

---

## Spacing System

### Base Units

The application uses a consistent spacing scale based on rem units:

| Size | Value | Common Usage |
|------|-------|--------------|
| xs | 0.25rem | Icon gaps, minimal padding |
| sm | 0.5rem | Tight spacing, tag padding |
| md | 1rem | Standard padding, gaps |
| lg | 1.5rem | Section padding |
| xl | 2rem | Major section gaps |
| 2xl | 3rem | Hero section spacing |
| 3xl | 4rem | Footer padding |

### Container Widths

| Container | Max Width | Padding |
|-----------|-----------|---------|
| Main Content | 1400px | 2rem horizontal |
| Search Bar | 500px | Centered |
| Form Sections | 600px | - |
| Narrow Content | 800px | - |

### Common Spacing Patterns

```css
/* Card Padding */
padding: 1.5rem;

/* Section Margin */
margin-bottom: 2rem;

/* Grid Gaps */
gap: 1.5rem; /* Cards */
gap: 2rem;   /* Major sections */

/* Nav Padding */
padding: 1rem 2.25rem; /* Desktop */
padding: 0.85rem 1rem; /* Mobile */
```

---

## Component Styling Patterns

All components use Tailwind CSS utility classes as the primary styling method. Reusable patterns are defined in `src/index.css` using `@apply`.

### Cards

```jsx
{/* Base Card - Tailwind classes */}
<div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50 transition-all duration-200">

{/* Card with hover effect */}
<div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200/50
                transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:border-blue-300">
```

### Buttons

```jsx
{/* Primary Button - uses .btn-primary from index.css */}
<button className="btn-primary">Submit</button>

{/* Or inline Tailwind */}
<button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">

{/* Secondary Button - uses .btn-secondary from index.css */}
<button className="btn-secondary">Cancel</button>

{/* Filter Toggle (active/inactive states) */}
<button className={`py-3 px-6 rounded-lg text-sm font-medium transition-all duration-200 ${
  isActive
    ? 'bg-blue-500 text-white border border-blue-500'
    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
}`}>
```

### Form Inputs

```jsx
{/* Search Input with icon */}
<input className="w-full py-3.5 pr-4 pl-12 border border-slate-300 rounded-xl
                  text-base bg-white shadow-sm outline-none transition-all duration-200
                  focus:border-blue-500 focus:ring-[3px] focus:ring-blue-500/10" />
```

### Dropdown Menus

```jsx
{/* Dropdown Container */}
<div className="absolute top-full left-0 right-0 bg-white border border-gray-300
                rounded-lg shadow-lg z-[1000] max-h-[200px] overflow-y-auto mt-1">

{/* Dropdown Item */}
<button className="w-full py-3 px-4 border-none text-left text-sm text-gray-800
                   hover:bg-gray-50 bg-transparent">
```

### Navigation

```jsx
{/* Sticky NavBar - solid white background for consistent appearance */}
<nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">

{/* Nav Links */}
<Link className="text-base font-semibold uppercase tracking-wide text-slate-800
                 no-underline py-1 transition-colors duration-300 hover:text-blue-500">
```

**Note**: The `.glass` class is available in index.css but NavBar uses solid white background to avoid visual glitches during scroll transitions.

### Progress Bars

```jsx
{/* Progress Bar Container */}
<div className="w-full h-1.5 bg-slate-500/20 rounded-sm overflow-hidden">
  {/* Progress Bar Fill - width is dynamic */}
  <div
    className="h-full rounded-sm transition-all duration-300 bg-green-500"
    style={{ width: `${percentage}%` }}
  />
</div>
```

### Badges & Tags

```jsx
{/* Industry Tag */}
<div className="inline-block bg-slate-500/10 text-slate-500 py-1 px-3 rounded-md text-xs font-medium">
  Technology
</div>

{/* Status Badge */}
<span className="bg-amber-100 text-amber-600 py-1 px-3 rounded-xl text-xs font-medium">
  Filters Applied
</span>

{/* Quality Indicator Pill */}
<div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full">
```

### Avatars (Company Initials)

```jsx
<div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
  <span className="text-blue-500 font-semibold text-base">GO</span>
</div>
```

### Loading Spinner

```jsx
{/* Uses .spinner class from index.css */}
<div className="spinner mx-auto mb-4" />

{/* Full implementation in index.css */}
.spinner {
  @apply w-10 h-10 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin;
}
```

### Error States

```jsx
{/* Error Container */}
<div className="bg-red-50 p-8 rounded-xl border border-red-200">
  <h2 className="text-red-600 text-xl font-bold mb-2">Error Title</h2>
  <p className="text-red-800">Error message details</p>
</div>
```

---

## UI Conventions

### Icons

The application uses **Lucide React** for all icons. Common icons include:

| Icon | Usage |
|------|-------|
| `Search` | Search input |
| `SlidersHorizontal` | Filter toggle |
| `ChevronDown` | Dropdown indicators |
| `X` | Close, clear buttons |
| `Share2` | Share functionality |
| `ExternalLink` | External links |
| `CheckCircle` | Success/excellent status |
| `AlertCircle` | Warning/fair status |
| `XCircle` | Error/poor status |
| `Star`, `StarHalf` | Ratings |
| `Eye` | Transparency pillar |
| `Scale` | Fairness pillar |
| `Brain` | Explainability pillar |
| `Users` | Human oversight pillar |
| `Shield` | Privacy & Security pillar |
| `Building` | Governance pillar |
| `Award` | Public commitments pillar |

### Score Display

```javascript
// Score formatting
function displayScore(score) {
  return typeof score === "number" && !isNaN(score)
    ? score.toFixed(1)
    : "N/A";
}
```

### Hover & Interaction States

| Element | Effect |
|---------|--------|
| Cards | `translateY(-2px)`, enhanced shadow |
| Buttons | Background color change, slight lift |
| Links | Color transition to blue |
| Nav Links | Color transition: `#1e293b` → `#3b82f6` |
| Icons in colored containers | `scale(1.05)` on group hover |

### Animation Conventions

| Animation | Duration | Easing |
|-----------|----------|--------|
| Hover transitions | 0.2s - 0.3s | ease |
| Progress bar fills | 1s | ease-out |
| Fade effects | 0.3s | ease |
| Modal backdrop | instant | - |

---

## Responsive Design

### Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| Mobile | ≤768px | Stack layouts, hamburger menu |
| Tablet | 769px - 1024px | 2-column grids |
| Desktop | >1024px | Full layouts, 3-4 column grids |

### Mobile-Specific Adjustments

| Component | Desktop | Mobile |
|-----------|---------|--------|
| NavBar padding | `1rem 2.25rem` | `0.85rem 1rem` |
| Logo height | 55px | 45px |
| Brand font size | 1.6rem | 1.5rem |
| Hero title | 3rem | 2.25rem |
| Grid columns | 3-4 | 1-2 |

### Grid Patterns

```css
/* Company Cards Grid */
gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))'

/* Stats Grid */
gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'

/* Footer Grid */
gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))'

/* Themes Grid - Home page Core Themes section (defined in index.css) */
.themes-grid {
  grid-template-columns: repeat(auto-fit, minmax(275px, 1fr));
  gap: 40px;
  max-width: 1440px;
}

/* Audiences Grid - Home page Who This Helps section (inline styles) */
gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
gap: '30px'
maxWidth: '1200px'
```

### Navigation Mobile Menu

- Hamburger icon appears at ≤768px
- Menu slides down from nav as full-width dropdown
- Menu items stack vertically with `1rem 2rem` padding
- White background with bottom border

---

## Gradients

### Common Gradients

| Name | CSS | Usage |
|------|-----|-------|
| Footer | `linear-gradient(135deg, #1e293b 0%, #0f172a 100%)` | Footer background |
| Hero | `linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)` | Page hero sections |
| Methodology Hero | `from-indigo-50 to-purple-50` | Special hero section |
| CTA Banner | `from-blue-600 to-indigo-600` | Call-to-action sections |
| Source Methodology | `from-blue-50 to-indigo-50` | Info sections |

---

## Box Shadows

| Name | Value | Usage |
|------|-------|-------|
| Card Default | `0 4px 20px rgba(0, 0, 0, 0.08)` | Cards at rest |
| Card Hover | `0 12px 40px rgba(0, 0, 0, 0.12)` | Cards on hover |
| NavBar | `0 2px 12px rgba(0, 0, 0, 0.05)` | Navigation |
| Dropdown | `0 10px 25px rgba(0, 0, 0, 0.1)` | Dropdown menus |
| Input Default | `0 1px 3px rgba(0, 0, 0, 0.1)` | Form inputs |
| Subtle | `shadow-sm` | Light elevation |

---

## Z-Index Scale

| Layer | Z-Index | Usage |
|-------|---------|-------|
| Navigation | 1000 | Sticky navbar |
| Mobile Menu | 999 | Dropdown nav menu |
| Dropdowns | 1000 | Filter dropdowns |
| Modals | 50 | Share modal backdrop |
| Tooltips | 1001 | If needed |

---

## File Reference

Key design-related files:
- `src/index.css` - Tailwind imports, animations (`@keyframes`), and reusable component classes (`.glass`, `.btn-primary`, `.spinner`, `.theme-card`, `.primary-cta`, etc.)
- `src/data/homeContent.js` - Home page static content data (themes, audiences, etc.)
- `src/utils/colorMapping.js` - Status-to-color utility functions
- `src/App.css` - Additional global styles (minimal)
- `tailwind.config.js` - Tailwind configuration
- `Color and Style Guide.txt` - Original color reference

### Implementation Notes

- **NavBar**: Uses `bg-white shadow-sm border-b border-gray-200` instead of `.glass` class for consistent appearance
- **Footer**: Uses inline style for gradient background instead of `.bg-footer-gradient` utility
- **Home page**: Componentized into 6 section components in `src/components/home/`:
  - `HeroSection.js` - Hero with parallax floating elements
  - `MethodologyPreview.js` - Core themes grid
  - `AudienceSection.js` - Target audience cards
  - `TransparencySection.js` - Methodology explanation
  - `CTASection.js` - Call-to-action section
  - `ExpandingImpact.js` - Future features roadmap

### index.css Structure

```css
/* Tailwind base imports */
@import "tailwindcss";

/* Animations */
@keyframes float { ... }
@keyframes pulse-subtle { ... }
@keyframes slideInUp { ... }
@keyframes iconPulse { ... }
@keyframes spin { ... }

/* Layout containers */
.container-default { @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full; }
.container-wide { @apply max-w-[1400px] mx-auto px-5 md:px-9 w-full; }
.container-narrow { @apply max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full; }

/* Reusable components */
.btn-primary { @apply bg-blue-600 hover:bg-blue-700 text-white ...; }
.btn-secondary { @apply border border-gray-300 hover:bg-gray-50 ...; }
.glass { @apply bg-white/70 backdrop-blur-lg ...; }
.spinner { @apply w-10 h-10 border-4 border-gray-200 border-t-blue-500 ...; }

/* Background gradients */
.bg-hero-dark { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); }
.bg-footer-gradient { background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); }
```
