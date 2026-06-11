# RAI Scores — Frontend

The web frontend for [www.raiscores.com](https://www.raiscores.com): independent, evidence-based ratings of how Fortune 500 companies govern AI, scored across 7 pillars using public evidence only.

## Stack

- **React 19** (Create React App) + **React Router 7**
- **Tailwind CSS 4**, precompiled by `@tailwindcss/cli` into `public/tw.css` and linked in `index.html` — it deliberately bypasses webpack (CRA's production CSS minifier mangles Tailwind 4 output)
- **Fonts:** Schibsted Grotesk Variable (display/UI) + IBM Plex Mono (data), self-hosted via `@fontsource`
- **Hosting:** Vercel — pushing `main` auto-deploys production
- **Data:** static JSON in `public/data/`, produced by the evaluation pipeline (separate repository); no backend

## Commands

```bash
npm start              # dev server (localhost:3000); prestart compiles Tailwind
npm run tailwind:watch # recompile Tailwind on change (run alongside npm start)
npm run build          # production build to /build
npm test               # test runner
```

## Documentation

- `design-system.md` — the visual system source of truth (tokens, fonts, colors, component patterns, gotchas)
- `archive/` — superseded MVP-era docs, kept for reference
