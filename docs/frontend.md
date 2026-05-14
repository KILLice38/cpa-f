# Frontend

## Choice: Next.js (App Router)

We use Next.js with the App Router. Rendering strategy is mixed: SSG for static content, ISR for data-driven sections.

## Why Next.js

- Built-in SSG and ISR support in App Router
- File-based routing — no extra router setup needed
- Turbopack bundler included — faster HMR in development
- Strong TypeScript support out of the box

## Rendering strategy

| Content | Strategy | Reason |
|---|---|---|
| Static sections (hero, layout) | SSG | No data dependency |
| Benefits, Multiply, Tasks | ISR | Data changes rarely, but must stay fresh |
| Contact form submission | Client-side fetch | Runtime POST, no prerendering |

**ISR** (Incremental Static Regeneration) — pages are pre-built at build time and regenerated in the background after a set interval. This gives near-static performance while keeping content up to date.

## Key conventions

- All pages live in `src/app/` following Next.js App Router structure
- `layout.tsx` at the root handles global fonts, metadata, and providers
- Prefer React Server Components by default; use `'use client'` only when interactivity or browser APIs are required
- Metadata (SEO) is defined via the Next.js `metadata` export, not manual `<head>` tags
- Locale (`lang`) is passed as a route segment or search param to fetch locale-specific data
