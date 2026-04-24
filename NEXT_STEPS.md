# NEXT_STEPS.md — Resume Here

> Updated: 2026-04-24 — Phase 12 deployed. Gate 4 self-cleared.

## Site is live at https://tabador-translation.com

GitHub `master` push → Vercel auto-deploy (rootDirectory fix in place).

Latest commit ships: dedicated `/faq` page, Service JSON-LD on every service detail page, gradient hero card on service pages, per-page metadata descriptions, skip-to-content a11y link, global focus-visible ring, and 13 Arabic copy refinements.

## What's left to close `v1.0.0`

### 1. Resend domain verification (skipped for now — DO LATER)
Until done, form emails only deliver to `coolenaa999@gmail.com`. To fix:
- Resend → Domains → Add `tabador-translation.com`
- Add the 3 DNS records (TXT + DKIM + SPF) at the registrar
- Update API route's `from:` from `onboarding@resend.dev` to `website@tabador-translation.com` (one-line change in `app/app/api/quote/route.ts` and `app/app/api/contact/route.ts`)

### 2. Rotate the Resend API key (skipped for now — DO LATER)
Current key `re_aXcWF7H1_3sE9n2XGZbkpHncYV8A2bpyX` was shared in chat. Once user is ready:
- Resend → API Keys → revoke that key → create new
- `vercel env rm RESEND_API_KEY production` then `vercel env add RESEND_API_KEY production`
- Trigger redeploy

### 3. Lighthouse + axe (run on live)
Record the four scores per locale in PROGRESS.md. Target Perf ≥ 90, A11y ≥ 95, BP ≥ 95, SEO ≥ 95.

### 4. Tag `v1.0.0`
Once 1–3 are done:
```
git tag -a v1.0.0 -m "v1.0.0 — initial production release"
git push --tags
```

## Pending client content (non-blocking)

| Item | Slot |
|---|---|
| Social URLs (TikTok / IG / LinkedIn / Facebook) | `content/{en,ar}/site.json` → `social.*` |
| Testimonials | Future `testimonials.items[]` in site.json |
| Partner logos | New `/partners` content when provided |
| Founding year | Replace "15+ years" with "since 20XX" |
| Specific pricing examples | Add to `/pricing` if desired |

## How to continue this project (for any agent picking up)

1. Read [AGENT.md](AGENT.md) and [MISSION.md](MISSION.md) first.
2. Read this file + [PROGRESS.md](PROGRESS.md).
3. Read [DECISIONS.md](DECISIONS.md) — D-001 through D-021 capture the architectural choices.
4. Code lives in `/app`. **Vercel rootDirectory is `app`** — never run `npm install` from repo root.
5. Auto-deploy: `git push origin master`. Manual deploy from `/app`: `npx vercel deploy --prod --yes`.
6. Vercel project ID: `prj_G6HVlAioGrUHJ4jDWZKZhIRRUQcD`, team `team_rxNZJMs7dSM8krr8o7ZoRu02`.
7. Forms POST JSON (with optional base64 file) to `/api/quote` or `/api/contact`. The API route validates origin + MIME + size, then forwards via Resend.
