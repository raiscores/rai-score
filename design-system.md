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

### Cards

```css
/* Base Card */
{
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  padding: '1.5rem',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
  border: '1px solid rgba(203, 213, 225, 0.5)',
  transition: 'all 0.2s ease'
}

/* Card Hover State */
{
  transform: 'translateY(-2px)',
  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
  borderColor: 'rgba(59, 130, 246, 0.3)'
}

/* Tailwind Card Classes */
.card: "bg-white rounded-xl p-6 shadow-sm border border-gray-200"
.card-hover: "hover:shadow-md transition-all duration-300"
```

### Buttons

#### Primary Button
```css
{
  backgroundColor: '#3b82f6',
  color: '#ffffff',
  padding: '0.75rem 1.5rem',
  borderRadius: '8px',
  fontWeight: '600',
  transition: 'all 0.2s ease'
}
/* Hover: backgroundColor: '#2563eb' */
```

#### Secondary/Outline Button
```css
{
  backgroundColor: 'transparent',
  color: '#374151',
  border: '1px solid #d1d5db',
  padding: '0.75rem 1.5rem',
  borderRadius: '8px'
}
```

#### Filter Toggle Button
```css
/* Active State */
{
  backgroundColor: '#3b82f6',
  color: '#ffffff',
  border: '1px solid #3b82f6'
}
/* Inactive State */
{
  backgroundColor: '#ffffff',
  color: '#374151',
  border: '1px solid #d1d5db'
}
```

### Form Inputs

```css
/* Text Input */
{
  padding: '0.875rem 1rem 0.875rem 3rem', /* With icon */
  border: '1px solid #cbd5e1',
  borderRadius: '12px',
  fontSize: '1rem',
  backgroundColor: '#ffffff',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
}

/* Focus State */
{
  borderColor: '#3b82f6',
  boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)'
}
```

### Dropdown Menus

```css
/* Dropdown Container */
{
  backgroundColor: '#ffffff',
  border: '1px solid #d1d5db',
  borderRadius: '8px',
  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
  maxHeight: '200px',
  overflowY: 'auto'
}

/* Dropdown Item Hover */
{
  backgroundColor: '#f9fafb'
}
```

### Navigation

```css
/* Sticky NavBar */
{
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  backdropFilter: 'blur(20px)',
  background: 'rgba(255, 255, 255, 0.7)',
  borderBottom: '1px solid rgba(229, 231, 235, 0.8)',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)'
}

/* Nav Links */
{
  fontSize: '1rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: '#1e293b'
}
/* Hover: color: '#3b82f6' */
```

### Progress Bars

```css
/* Container */
{
  width: '100%',
  height: '6px', /* Cards */ or '3px' /* Detail */
  backgroundColor: 'rgba(100, 116, 139, 0.2)',
  borderRadius: '3px',
  overflow: 'hidden'
}

/* Fill (animated) */
{
  height: '100%',
  backgroundColor: '{dynamic based on score}',
  borderRadius: '3px',
  transition: 'width 0.3s ease'
}
```

### Badges & Tags

```css
/* Industry Tag */
{
  backgroundColor: 'rgba(100, 116, 139, 0.1)',
  color: '#64748b',
  padding: '0.25rem 0.75rem',
  borderRadius: '6px',
  fontSize: '0.75rem',
  fontWeight: '500'
}

/* Status Badge */
{
  padding: '0.125rem 0.5rem',
  borderRadius: '10px',
  fontSize: '0.75rem',
  fontWeight: '600'
}

/* Quality Indicator Pill */
"flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full"
```

### Avatars (Company Initials)

```css
{
  width: '48px',
  height: '48px',
  borderRadius: '12px',
  backgroundColor: 'rgba(59, 130, 246, 0.1)',
  border: '1px solid rgba(59, 130, 246, 0.2)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}
```

### Loading Spinner

```css
{
  width: '40px',
  height: '40px',
  border: '4px solid #e5e7eb',
  borderTop: '4px solid #3b82f6',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite'
}
```

### Error States

```css
/* Error Container */
{
  backgroundColor: '#fef2f2',
  padding: '2rem',
  borderRadius: '12px',
  border: '1px solid #fecaca'
}

/* Error Text */
{
  color: '#dc2626' /* Title */
  color: '#991b1b' /* Message */
}
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
- `src/utils/colorMapping.js` - Status-to-color utility functions
- `src/index.css` - Global Tailwind imports
- `src/App.css` - Additional global styles
- `Color and Style Guide.txt` - Original color reference
- `tailwind.config.js` - Tailwind configuration
