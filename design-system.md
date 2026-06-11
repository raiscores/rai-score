# RAI Scores Design System

Global visual reference for the RAI Scores frontend. For page-specific implementation details, see the cross-references in [Section 10](#10-page-specific-references).

Last updated: 2026-06-11

---

## Table of Contents

1. [Brand & Color Palette](#1-brand--color-palette)
2. [Typography](#2-typography)
3. [Spacing & Layout](#3-spacing--layout)
4. [Card Patterns](#4-card-patterns)
5. [Component Patterns](#5-component-patterns)
6. [Interactive States](#6-interactive-states)
7. [Responsive Breakpoints](#7-responsive-breakpoints)
8. [Tailwind 4 Conventions](#8-tailwind-4-conventions)
9. [Animations](#9-animations)
10. [Page-Specific References](#10-page-specific-references)
11. [File Reference](#11-file-reference)

---

## 1. Brand & Color Palette

### Brand Colors

| Token | Value | Usage |
|-------|-------|-------|
| Brand Navy | `#263552` (`navy-700`) | NavBar brand text ("RAI SCORES"); anchor of the navy ramp |
| Navy ramp | `navy-600` `#33466c` → `navy-950` `#0b1322` | Dark bands, future dark surfaces (defined in `@theme`) |
| Interactive Blue (cobalt) | `blue-600` `#2a56c6` / `blue-500` `#4170d4` | Links, focus rings, active tabs, primary actions |
| Star Gold | `#d97706` (amber-600) | Star ratings — rich gold, Morningstar feel (deliberate choice, not bright yellow) |

**The Tailwind `blue-*` ramp is overridden site-wide** in the `@theme` block of `index.css` with a deeper, less-saturated cobalt ramp (50–950). Any `bg-blue-600`, `text-blue-500`, `border-blue-200`, etc. resolves to cobalt values, not stock Tailwind blue. Don't reintroduce raw `#3b82f6`/`#2563eb` hexes.

### Dark Bands (replaces per-page gradients)

| Class | Value | Usage |
|-------|-------|-------|
| `.bg-band-hero` | `linear-gradient(150deg, #0b1322 0%, #131f36 45%, #2e4066 100%)` | All page hero backgrounds (Home, About, Methodology, Contact) |
| `.bg-band-dark` | `linear-gradient(150deg, #131f36 0%, #0b1322 100%)` | Footer, CTA bar backgrounds (all pages) |

One navy family for every dark surface — no inline gradient styles. Primary buttons are flat `bg-blue-600 hover:bg-blue-500` (on dark) or `hover:bg-blue-700` (on light); the old gradient/glow/shimmer button classes were removed as dead code.

Dark-band atmosphere: `.bg-dot-grid` (faint 22px radial dot matrix at 7% white alpha) applied as an absolutely-positioned overlay inside the band — currently the homepage hero. Use at most one textured band per page.

### Semantic Status Colors (from `colorMapping.js`)

Used for percentile-based performance indicators across the app.

| Status | Text | Background | Icon | Threshold |
|--------|------|------------|------|-----------|
| Excellent | `text-green-600` | `bg-green-50` | CheckCircle | ≥90th percentile |
| Good | `text-blue-600` | `bg-blue-50` | CheckCircle | ≥70th percentile |
| Fair | `text-yellow-600` | `bg-yellow-50` | AlertCircle | ≥40th percentile |
| Poor | `text-red-600` | `bg-red-50` | XCircle | <40th percentile |
| Neutral | `text-gray-600` | `bg-gray-50` | AlertCircle | No data |

### Score Colors (0–2 pillar scale)

Used for individual pillar score text and progress bar gradients.

| Score | Text Color | Gradient |
|-------|------------|----------|
| 2 (full) | `text-green-600` | `from-green-500 to-green-600` |
| 1.5 | `text-blue-600` | `from-blue-500 to-blue-600` |
| 1 | `text-yellow-600` | `from-yellow-500 to-yellow-600` |
| 0 | `text-red-600` | `from-red-500 to-red-600` |

### Grade Colors

Letter grades use authoritative dark tones, not bright status colors.

| Grade | Text | Gradient BG | Border | Bar Color |
|-------|------|-------------|--------|-----------|
| A (A+, A, A-) | `text-emerald-800` | `from-emerald-50 to-emerald-100` | `border-emerald-200` | `bg-emerald-500` |
| B (B+, B, B-) | `text-blue-800` | `from-blue-50 to-blue-100` | `border-blue-200` | `bg-blue-500` |
| C (C+, C, C-) | `text-amber-800` | `from-amber-50 to-amber-100` | `border-amber-200` | `bg-amber-500` |
| D | `text-red-800` | `from-red-50 to-red-100` | `border-red-200` | `bg-red-500` |

Grade card pill background is `bg-white/70` for all grades. See `getGradeBg()` in `colorMapping.js`.

### Evidence Type Badges

| Type | Label | Text | Background | Border |
|------|-------|------|------------|--------|
| OPERATIONAL | "Operational" | `text-green-700` | `bg-green-50` | `border-green-200` |
| POLICY | "Policy" | `text-yellow-700` | `bg-yellow-50` | `border-yellow-200` |
| NARRATIVE | "Narrative Only" | `text-slate-600` | `bg-slate-100` | `border-slate-200` |
| null/none | "No Evidence" | `text-red-700` | `bg-red-50` | `border-red-200` |

NARRATIVE is neutral slate (it scores zero points — absence of weight, not warning). EvidenceBreakdownBar segments follow the same logic: emerald / amber / slate.

### Pillar Score Marks (PillarStrip + PillarCard)

Discrete cells, never continuous bars, for 0–2 pillar scores:

| Score | Cells |
|-------|-------|
| 2/2 | `bg-emerald-500` + `bg-emerald-500` |
| 1/2 | `bg-amber-400` + `bg-gray-200` |
| 0/2 | `bg-gray-200` + `bg-gray-200` |

`PillarStrip` (`src/components/company/PillarStrip.js`) renders all 7 pillars as the site's signature score mark (rating seal; directory/homepage planned). PillarCard headers use a single 2-cell mark with score ink `text-emerald-700` / `text-amber-700` / `text-gray-500`.

### Score Bar Tiers (Homepage Featured Cards)

| Threshold | Color |
|-----------|-------|
| ≥12/14 | `bg-emerald-500` |
| ≥9/14 | `bg-blue-500` |
| ≥5/14 | `bg-amber-500` |
| <5/14 | `bg-red-500` |

### Pillar Dot Colors (Company Directory)

| Score | Color |
|-------|-------|
| 2 | `bg-emerald-500` |
| 1 | `bg-amber-500` |
| 0 | `bg-gray-200` |

### UI Neutrals

| Element | Class | Hex |
|---------|-------|-----|
| Primary text | `text-slate-900` | `#0f172a` |
| Secondary text | `text-slate-600` | `#475569` |
| Muted text | `text-slate-500` | `#64748b` |
| Borders (standard) | `border-gray-200` | `#e5e7eb` |
| Borders (heavy) | `border-gray-300` | `#d1d5db` |
| Borders (light) | `border-gray-100` | `#f3f4f6` |
| Page background | `bg-slate-50` | `#f8fafc` |
| Card background | `bg-white` | `#ffffff` |
| Footer text | `text-slate-50` | `#f8fafc` |
| Footer muted text | `text-slate-300` | `#cbd5e1` |

---

## 2. Typography

### Font Stack

Self-hosted via `@fontsource` packages, imported in `src/index.js` (no external font requests):

| Role | Family | Usage |
|------|--------|-------|
| Display + UI (`--font-sans`) | **Schibsted Grotesk Variable** (wght 400–900) | Everything: headlines, body, UI |
| Data (`--font-mono`) | **IBM Plex Mono** (400/500/600) | Scores, counts, dates, tickers, run IDs — apply with `font-mono` |

Fallbacks: system stack (sans), `ui-monospace`/Consolas (mono). Defined as `--font-sans`/`--font-mono` in the `@theme` block.

**Tabular figures:** `<table>` elements get `font-variant-numeric: tabular-nums` globally (base layer). For non-table numeric columns use the `tabular-nums` utility per element. Do NOT apply tnum to prose — Schibsted spaces periods/commas in tnum mode and it looks broken.

### Type Scale

| Element | Size (mobile → desktop) | Weight | Example |
|---------|------------------------|--------|---------|
| Hero headline | `text-[2rem]` → `sm:text-4xl` → `md:text-5xl` → `lg:text-6xl` | `font-black` (900) | "See Which Companies Take..." |
| Section heading | `text-3xl` → `md:text-4xl` | `font-extrabold` (800) | "Featured Evaluations" |
| Page heading | `text-2xl` → `md:text-3xl` | `font-extrabold` (800) | CompanyPage company name |
| Card title | `text-base` → `text-lg` | `font-bold` (700) | Pillar card headings |
| Body text | `text-sm` → `text-base` | `font-normal` (400) | Paragraphs, findings |
| Metadata | `text-xs` | `font-medium` (500) | Labels, dates, source counts |
| Micro label | `text-[10px]` | `font-medium` (500) | "out of 14", very small annotations |

### Brand Text

NavBar brand: `font-bold text-[#263552] tracking-tight text-xl` (desktop), `text-lg` (mobile), logo `h-9`/`h-8`. Text content: "RAI SCORES" (uppercase). Nav links are mixed-case `text-sm font-medium text-slate-600`; the active route gets `text-slate-900` + a 2px cobalt underline (`border-blue-600` via `NavLink`). "Request Evaluation" is a quiet bordered button (`border-slate-300 rounded-lg`), the only button in the nav.

### Text Styling

| Pattern | Usage |
|---------|-------|
| `tracking-tight` | Headings, brand text |
| `tracking-wide` + `uppercase` | Nav links |
| `leading-[1.1]` | Hero headline (tight) |
| `leading-relaxed` | Body paragraphs |

---

## 3. Spacing & Layout

### Container System

Containers use CSS classes (in `index.css`) for max-width/centering, with `clamp()` for responsive padding:

| Container | Max Width | Padding | CSS Class |
|-----------|-----------|---------|-----------|
| Default / Wide | `1400px` | `clamp(24px, 5vw, 40px)` | `.container-default` / `.container-wide` |
| Narrow | `900px` | `clamp(24px, 5vw, 40px)` | `.container-narrow` |
| CompanyPage content | `max-w-7xl` (1280px) | Tailwind utilities | Inline classes |
| CompanyDirectory | `max-w-[1200px]` | Tailwind utilities | Inline classes |

All containers: `margin-left: auto; margin-right: auto; width: 100%`.

The `Container.js` component accepts a `size` prop (`"default"`, `"wide"`, or `"narrow"`) and applies the corresponding CSS class.

### Inner Content Width Pattern

Most pages use `Container wide` (1400px) with nested `max-w-*` classes to constrain content width while keeping full-width section backgrounds:

| Inner Width | Class | Usage |
|-------------|-------|-------|
| ~800px | `max-w-[800px] mx-auto` | Hero content (headline + subheading) |
| ~768px | `max-w-3xl mx-auto` | Prose sections (body text, principles, limitations) |
| ~1024px | `max-w-5xl mx-auto` | Card grids, structured content, two-column layouts |

This pattern keeps text at readable line lengths while card grids use more horizontal space.

### Section Padding

| Pattern | Usage |
|---------|-------|
| `py-8` | CTA section (compact) |
| `py-10 md:py-12` | Standard content sections |
| `py-12 md:py-16` | Methodology section (more breathing room) |
| `pt-16 pb-8` | Footer |
| `py-20 md:py-24` | Hero section (via inner content div) |

### Card Padding

| Size | Usage |
|------|-------|
| `p-4` | Compact cards (featured evaluations, pillar cards) |
| `p-5` | Featured/sidebar cards |
| `p-6` | Standard content cards |
| `p-6 md:p-8` | Large cards (methodology, overview sections) |

### Grid Gaps

| Gap | Usage |
|-----|-------|
| `gap-0.5` | Star rating icons |
| `gap-2` | Pillar heatmap cells, pillar dots |
| `gap-3` | Filter controls, small element groups |
| `gap-4` | Card grids (featured, directory), tag groups |
| `gap-5` | `lg:gap-5` for featured card grids |
| `gap-7` | Nav links |
| `gap-8` | Major layout sections, footer columns |

---

## 4. Card Patterns

Three distinct card tiers are used across the application:

| Tier | Usage | Classes | Shadow | Radius |
|------|-------|---------|--------|--------|
| **Primary content** | Pillar cards, overview sections, company detail cards | `bg-white border border-gray-200` | `shadow-md` | `rounded-xl` |
| **Sidebar / reference** | Sidebar cards, toolbar, pagination, table rows | `bg-white border border-gray-100` or `border-gray-200` | `shadow-sm` or none | `rounded-xl` |
| **Homepage flat** | Featured cards, methodology cards, audience cards | `bg-white border border-gray-300` | none | `rounded-lg` or `rounded-xl` |

**Design rationale:** CompanyPage uses shadow hierarchy to create depth and visual importance. Homepage uses zero shadows for a flat, editorial feel.

### CSS Card Classes (index.css)

- `.card`: `bg-white rounded-xl p-6 shadow-sm border border-gray-200` — hover lifts with `shadow-md`
- `.card-interactive`: `bg-white rounded-2xl p-8 shadow-lg border-2 border-gray-200` — hover lifts 3px + scale 1.02 + blue border
- `.theme-card`: `bg-white rounded-2xl p-6 border border-slate-200` — hover lifts + blue border (no shadow)

---

## 5. Component Patterns

### Buttons

Buttons are inline Tailwind utilities (the old `.btn-*`/`.primary-cta` CSS classes were dead code and removed). Patterns:

| Button | Classes | Usage |
|--------|---------|-------|
| Primary (dark band) | `bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg py-3 px-6 sm:py-3.5 sm:px-7 transition-colors duration-150` | Hero primary CTA |
| Ghost (dark band) | `bg-white/10 hover:bg-white/15 border border-white/25 hover:border-white/40 text-white font-medium rounded-lg` | Hero secondary CTA |
| Primary (compact) | `bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition-colors` | CTA bars |

No gradients, no glow shadows, no shimmer effects, no hover lift on buttons — color shift only. Institutional, calm.

### CTA Bar (compact)

Used at the bottom of About, Methodology, Contact, and Home pages:

```
background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%)
py-8, border-t border-white/10
Content: centered flex row with text + blue button (bg-blue-600, text-sm, rounded-lg)
```

### Progress Bars

| Context | Height | Colors | Scale |
|---------|--------|--------|-------|
| CompanyPage pillar cards | `h-2` | Green/yellow/gray per 0–2 pillar score | 0–2 |
| Homepage featured cards | `h-2.5` | Tiered 4-color (emerald/blue/amber/red) | 0–14 |
| CompanyPage grade card | Dynamic | Grade-colored (`bg-emerald-500`, etc.) | Percent of 14 |

Progress bar fill uses `transition-all` for animated width.

### Grade Badges

- Fixed `w-7` width, `rounded` corners
- Colored background + text per grade tier (from `getGradeBg()` and `getGradeColor()`)
- Used in CompanyDirectory table and CompanyPage

### Evidence Badges

- Pill shape with `bg` + `text` + `border` per evidence type
- Styling from `getEvidenceTypeLabel()` in `colorMapping.js`

### Star Rating

- Fill color: `#d97706` (amber-600), empty outline: `#d1d5db` (gray-300)
- Size: `w-6 h-6` (24px)
- Gap: `gap-0.5`
- Supports half stars via `StarHalf` overlay
- Component: `StarRating.js`

### Pillar Dots (Directory)

- `w-2 h-2 rounded-full`
- Colors: emerald-500 (score 2), amber-500 (score 1), gray-200 (score 0)
- Displayed in a row with `gap-2`

### Spinner

```css
.spinner {
  width: 2.5rem;      /* w-10 */
  height: 2.5rem;     /* h-10 */
  border: 4px solid;
  border-color: #e5e7eb;        /* gray-200 */
  border-top-color: #2563eb;    /* blue-600 */
  border-radius: 9999px;
  animation: spin 1s linear infinite;
}
```

### Section Headers (homepage pattern)

Left-aligned with a mono eyebrow, optional action link on the right:

```
Eyebrow: font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400
Heading: text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight
Sub:     text-base text-slate-600
Right:   text-blue-600 font-semibold text-sm link with ArrowRight
```

Used by Featured Evaluations and How Scoring Works. (Centered headers remain on About/Methodology content pages.)

### Icons

Primary library: **Lucide React**. Secondary: **React Icons** (used sparingly).

### Muted Icon Pattern

Used across About, Methodology, and Contact pages for feature/info cards:

```
Container: w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center
Icon: w-5 h-5 text-slate-600
```

All icons use the same muted treatment — no per-card colored backgrounds. This creates a neutral, institutional feel.

Pillar icons:

| Pillar | Icon |
|--------|------|
| Transparency | `Eye` |
| Fairness & Bias Mitigation | `Scale` |
| Explainability | `Brain` |
| Human Oversight & Accountability | `Users` |
| Privacy & Data Protection | `Shield` |
| Governance & Internal Controls | `Building` |
| Public Commitments & External Audits | `Award` |

---

## 6. Interactive States

### Card Hover

- Lift: `-translate-y-0.5` (2px) for standard cards
- Border shift: `border-gray-200` → `border-blue-300` or `border-blue-400`
- Shadow increase on `.card`: `shadow-sm` → `shadow-md`
- Transition: `duration-200` or `duration-300`

### Link Hover

- Nav links: `text-slate-800` → `text-blue-500`, `duration-300`
- In-page links: `text-blue-600` → `text-blue-700`, `duration-200`

### Table Row Hover (Directory)

- `hover:bg-blue-50/40` — subtle blue tint

### Tab Active State

- Active: `text-blue-600 border-blue-600` with `border-b-2`
- Inactive: `text-gray-500` with transparent border

### "View evaluation" Reveal (Directory)

- Desktop: `opacity-0 group-hover:opacity-100` with `transition-opacity`
- Mobile: Always visible (no hover on touch)

### Button Hover

- All buttons: `-translate-y-0.5` lift
- `.btn-primary` / `.primary-cta`: Enhanced box-shadow + shimmer sweep
- `.btn-outline`: `bg-gray-50 border-gray-400`

---

## 7. Responsive Breakpoints

Tailwind default breakpoints (mobile-first):

| Breakpoint | Width | Key Layout Changes |
|------------|-------|--------------------|
| Default (mobile) | < 640px | Single column, stacked layouts, hamburger nav |
| `sm:` | ≥ 640px | Hero CTAs side-by-side, 2-col audience, proof strip dots |
| `md:` | ≥ 768px | 2-col grids, table view in directory, desktop nav, larger padding |
| `lg:` | ≥ 1024px | 3-col featured cards, 4-col audience, hero columns on CompanyPage |

### Mobile-Specific Patterns

| Element | Mobile | Desktop |
|---------|--------|---------|
| NavBar padding | `py-2.5` | `md:py-3` (container-wide horizontal padding) |
| Logo height | `h-8` (32px) | `h-9` (36px) |
| Brand font size | `text-lg` | `text-xl` |
| Hero CTAs | Stacked, `max-w-xs items-stretch`, `text-sm py-3 px-6` | Side-by-side, `flex-row`, `sm:text-base sm:py-3.5 sm:px-7` |
| Hero section padding | Reduced at ≤480px via CSS media query | `py-20 md:py-24` |
| `.theme-card` padding | `1rem` (≤480px), `1.25rem` (≤768px) | `1.5rem` |

### NavBar Mobile Menu

- Pure CSS breakpoints (`hidden md:flex` / `md:hidden`) — no JS width checks
- Hamburger uses Lucide `Menu`/`X` icons
- Menu: full-width white panel below nav, stacked `NavLink`s + bordered "Request Evaluation" button
- Menu closes on link click

---

## 8. Tailwind 4 Conventions

Key patterns and gotchas specific to Tailwind CSS v4 (used in this project):

### CSS Build Pipeline (no CDN)

CSS is compiled ahead of time by `@tailwindcss/cli`:

```
src/index.css  --(npm run tailwind:build)-->  public/tw.css  --(<link> in public/index.html)--> served verbatim
```

- The compiled CSS deliberately bypasses webpack: CRA 5's production CSS minifier statically rewrites Tailwind 4's `var()` references and breaks colors/sizes (dev unaffected — this broke production on 2026-06-11). Files in `public/` are copied byte-for-byte.
- `prestart`/`prebuild` hooks run the compile automatically for `npm start` / `npm run build`
- During development run `npm run tailwind:watch` in a second terminal; hard-refresh to pick up changes (CRA doesn't hot-reload `public/`)
- `public/tw.css` is generated and gitignored — never edit it
- The Tailwind Play CDN `<script>` was removed from `public/index.html` (it was dev-only tooling shipping to production); `tailwind.config.js` and `postcss.config.js` were deleted (v4 uses CSS-first config via `@theme`, and CRA ignores external postcss configs)

### Design Tokens (`@theme` in index.css)

- **Fonts:** `--font-sans` (Schibsted Grotesk Variable), `--font-mono` (IBM Plex Mono)
- **Cobalt blue ramp:** `--color-blue-50` … `--color-blue-950` override Tailwind's default blue
- **Navy ramp:** `--color-navy-600` … `--color-navy-950` (brand `#263552` = `navy-700`)
- **Radius personality:** compact 4/6/8px — `--radius-md` 4px, `--radius-lg`/`--radius-xl` 6px, `--radius-2xl`/`--radius-3xl` capped at 8px so legacy `rounded-xl/2xl/3xl` markup converges on one look. Use `rounded-lg` going forward.

### CSS Class Specificity

`@layer components` in Tailwind 4 has **low CSS specificity**. Tailwind utility classes will override properties set via `@apply` in `@layer components`. This means:

- **Do:** Use CSS classes for structural properties (max-width, margin, display)
- **Don't:** Use CSS classes for visual properties (padding, colors, shadows) that need per-instance overrides — use Tailwind utilities directly instead

### Container Pattern

The project uses a hybrid approach:

```css
/* CSS class for structure */
.container-default {
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}
```

```jsx
/* Tailwind utilities for padding (overridable per-instance) */
<div className="container-default px-6 sm:px-8 lg:px-10">
```

### Don't Mix CSS and Tailwind Breakpoints

CSS `@media` queries and Tailwind responsive prefixes (`sm:`, `md:`, `lg:`) can conflict because they apply at different specificity levels. Pick one per property.

### Inline Styles for Dynamic Values

Use inline `style={}` only for values that are:
- Calculated from data (progress bar widths, parallax transforms)
- Complex gradients that don't map to Tailwind utilities
- Data-driven colors or positions

```jsx
// Good: data-driven width
<div style={{ width: `${(score / 14) * 100}%` }} />

// Good: complex gradient
<section style={{ background: 'linear-gradient(135deg, #0a0f1c 0%, #1a202c 25%, #2d3748 100%)' }}>
```

### Padding Shorthand Gotcha

In CSS media queries, using `padding` shorthand kills all specific padding properties set elsewhere. Use only the specific side (`padding-top`, `padding-bottom`) to avoid overriding horizontal padding set by Tailwind.

---

## 9. Animations

### Scroll Reveal (Intersection Observer)

Used by About and Methodology page sections. (Removed from Home in the June 2026 redesign — homepage content renders immediately; only the hero load stagger remains.) Sections use `data-reveal` attribute and `id` for tracking:

```css
opacity: 0 → 1;
transform: translateY(40px) → translateY(0);
transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
```

### Keyframe Animations

| Animation | Duration | Easing | Usage |
|-----------|----------|--------|-------|
| `slideInUp` | 0.8s | `ease-out` | Hero content (staggered with `animationDelay`) |
| `pulse-subtle` | 8s | `ease-in-out` (infinite) | Decorative background elements |
| `iconPulse` | 2s | `ease-out` | Icon entrance effects |
| `spin` | 1s | `linear` (infinite) | Loading spinner |

### Hover Transitions

- Cards, buttons, links: `duration-200` or `duration-300`
- Progress bar fill: `transition-all` (500ms typical)
- NavBar link color: `duration-300`

### Reduced Motion

All animations respect `prefers-reduced-motion: reduce` via a global CSS media query that sets `animation-duration` and `transition-duration` to `0.01ms`.

---

## 10. Page-Specific References

This document covers global patterns. For detailed page-level implementation:

- **Homepage:** [`docs/homepage-design-spec.md`](docs/homepage-design-spec.md) — hero, featured evaluations, methodology preview, audience, CTA, responsive CTA decisions, proof strip
- **Company Page:** [`docs/company-page-requirements.md`](docs/company-page-requirements.md) — hero layout, grade card, tab system, pillar cards, sidebar, zero-score handling, evidence bar
- **Company Directory:** [`docs/company-directory-requirements.md`](docs/company-directory-requirements.md) — table design, filters, search, pagination, pillar dots, grade badges, top performers
- **About, Methodology, Contact:** Follow the shared page pattern: dark gradient hero (`Container wide`, `max-w-[800px]` inner), body sections (`Container wide`, `max-w-5xl` for card grids, `max-w-3xl` for prose), compact CTA bar. Content data files in `src/data/aboutContent.js` and `src/data/methodologyContent.js`.

---

## 11. File Reference

| File | Purpose |
|------|---------|
| `src/index.css` | Animations, container classes, button/card/CTA classes, glass effect, grid layouts, responsive overrides |
| `src/utils/colorMapping.js` | All color/status/grade/evidence mapping functions |
| `src/components/Container.js` | Layout wrapper (`size` prop → CSS class) |
| `src/components/NavBar.js` | Sticky navigation, brand styling, mobile hamburger |
| `src/components/Footer.js` | Dark gradient footer |
| `src/components/StarRating.js` | Star rating display (amber-600 gold, 24px, gap-0.5) |
| `src/components/CompanyCard.js` | Directory listing card |
| `src/components/SearchAndFilters.js` | Compound filter component |
