# DEPLOYMENT.md — Environment, DNS, Vercel

> Populated during Phase 9. Placeholder entries marked TBD.

## GitHub

| Field | Value |
|---|---|
| Repo | TBD (Gate 0 answer) |
| Branch strategy | `main` = production |

## Vercel

| Field | Value |
|---|---|
| Project name | tabador-translation-com |
| Account | User's Vercel Pro |
| Framework preset | Next.js |
| Root directory | `app/` |
| Node version | 20.x |

## Environment Variables (set in Vercel dashboard)

| Variable | Purpose | Value |
|---|---|---|
| `WHATSAPP_NUMBER` | Floating button + form fallback | +966538992076 |
| `CONTACT_EMAIL_PRIMARY` | Form recipient | mudtheronly1976@gmail.com |
| `CONTACT_EMAIL_BACKUP` | Form CC (no lead lost) | TBD |
| `RESEND_API_KEY` | Email delivery via Resend | TBD |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for OG/sitemap | https://tabador-translation.com |
| `VERCEL_ANALYTICS_ID` | Auto-injected by Vercel | auto |

## DNS Instructions (to be written at Phase 9)

Point `tabador-translation.com` A record to Vercel's IP, and add CNAME for `www`.
Full DNS instructions will be added here when the Vercel project is created.

## Analytics Event Schema

| Event name | Trigger |
|---|---|
| `whatsapp_click` | Floating WhatsApp button click |
| `form_submit` | Contact/quote form successful submission |
| `form_fail` | Form API failure (triggers mailto: fallback) |
| `theme_toggle` | Light/dark toggle |
| `locale_toggle` | EN ↔ AR toggle |
| `banner_cta_click_0..n` | Hero banner CTA click (indexed) |
