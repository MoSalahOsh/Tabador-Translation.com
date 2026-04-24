# NEXT_STEPS.md — Resume Here

> Updated: 2026-04-24 — Gate 1 cleared, entering Phase 5.

## Current action

**Phase 5 — Scaffolding** is running now.

## Phase 5 checklist (in order)

1. `npx create-next-app@latest app` — TypeScript, Tailwind, App Router, ESLint, src dir: no
2. Install packages: `next-intl framer-motion lucide-react clsx tailwind-merge zod react-hook-form sharp @vercel/analytics @vercel/og`
3. Install shadcn/ui: `npx shadcn@latest init`
4. Configure `next-intl`:
   - `messages/en.json` + `messages/ar.json` (site.json strings)
   - `middleware.ts` (locale detection + redirect)
   - `i18n/routing.ts` + `i18n/request.ts`
5. Root layout: `<html lang dir>` switching, Inter + Tajawal fonts via `next/font`
6. Global CSS: CSS variables for color tokens (light/dark), glass tiers, spacing scale
7. Header component: logo, nav, locale toggle, theme toggle
8. Footer component: contact block, social icons (placeholder hrefs), legal links, CR number
9. WhatsApp floating button (locale-aware pre-filled message, RTL positioning)
10. Wire `@vercel/analytics` + custom events skeleton
11. Smoke test: `npm run dev`, visit `/en` and `/ar`, toggle theme, click WhatsApp

## After Phase 5 — Phase 6 page build order

1. Homepage (hero + trust row + quick-quote + services grid + why-us + CTA)
2. Services index + all 11 service sub-pages
3. About page
4. Contact page (map embed, form, hours, socials)
5. Privacy + Terms
6. 404 + loading + error states
7. Projects + Partners (stubs with pending-content messages)

## Pending from user (non-blocking until Phase 7)

- Social media URLs → footer icons will be `href="#"` placeholders
- Backup email → form sends to newtabador@gmail.com only
- Testimonials → no testimonials section until provided
- Research-derived services confirmation (items 8–11) → included as stubs
