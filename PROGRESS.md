# PROGRESS.md — Build Status

> Updated: 2026-04-24 (post-Phase 11 forms + new pages + security)

## Current Phase: 11 — Forms, uploads, new pages, hardening ✅ DEPLOYED

## Phase Checklist

### Phase 0 — Bootstrap ✅
### Phase 1 — Research ✅
### Phase 2 — Asset & Brand Intake ✅ (Gate 1 CLEARED)
### Phase 3 — Information Architecture ✅
### Phase 4 — Design System ✅
### Phase 5 — Scaffolding ✅
### Phase 6 — Page Build ✅
### Phase 7 — Bilingual Content Pass ✅
### Phase 8 — QA / Performance / Accessibility / SEO ✅

### Phase 9 — Deploy ✅
- [x] Vercel project `tabador-translation` live on `tabador-translation.com`
- [x] HTTPS, HSTS preload, security headers all verified
- [x] GitHub → Vercel continuous deploy wired
- [ ] `RESEND_API_KEY` — still pending
- [ ] Lighthouse scores (run post-merge)
- [ ] Tag `v1.0.0` (after Gate 4)

### Phase 10 — Live polish + conversion uplift ✅
(Announcement banner, Process, Industries, FAQ, Stats counter, Mobile call btn, scroll-aware Header, footer expansion, About mission/vision/values, Contact map embed, Arabic fixes.)

### Phase 11 — Forms, uploads, new pages, hardening ✅

**Forms — parity upgrade**
- [x] QuickQuoteForm: added `email`, `notes`, `file upload` (PDF/JPG/PNG/WEBP/DOC/DOCX, ≤3MB)
- [x] ContactForm: added `file upload`
- [x] Both forms: translated validation errors (`required`, `invalidEmail`, `fileTooLarge`, `fileTypeBad`), proper `htmlFor`/`id` a11y pairing
- [x] File → base64 → API → Resend attachment (up to 3MB; larger routed to WhatsApp)

**API hardening**
- [x] Origin header / host allow-list check (`ALLOWED_HOSTS`)
- [x] HTML-escape all user input in email bodies (XSS-clean)
- [x] Server-side MIME + extension + size validation (`lib/email.ts`)
- [x] `reply_to` set to customer email when provided (staff can reply-all)
- [x] Rate limit kept (5/min/IP, in-memory) — upgrade to Vercel KV is a future nice-to-have

**New pages**
- [x] `/[lang]/pricing` — how pricing is calculated + pricing guarantee + CTA
- [x] `/[lang]/urgent` — same-day/express service landing with dedicated CTA
- [x] Sitemap updated (46 routes vs. 42 before)

**Conversion hooks**
- [x] **TrustBadges** section — 8 authorities (MOFA, MOHE, MOH, MOJ, Jawazat, Chambers, Schengen, GCC) as pill-badges over gradient
- [x] **MobileActionBar** — docked bottom bar with Call / WhatsApp / Quote (replaces MobileCallButton)
- [x] Header nav expanded: Pricing + Urgent added

**Arabic polish**
- [x] `اطلب سعراً سريعاً` → `اطلب عرض سعر سريع`
- [x] `نصادق على صحة الترجمة ليس المحتوى` → `نصادق على أمانة الترجمة لا على محتوى المستند الأصلي`
- [x] Subtitle "أرسل مستندك الآن — نرد عليك في دقائق" → "...خلال دقائق"
- [x] All form validation in Arabic MSA

**Verified:** `tsc --noEmit` clean, `next build` clean (46 routes compiled).

## Lighthouse Scores
Run post-deploy on `tabador-translation.com`. Pending.

## Known Pre-v1.0.0 Gaps
1. `RESEND_API_KEY` env var (enables email delivery instead of mailto fallback)
2. Lighthouse + axe run on live URL
3. Gate 4 Arabic sign-off
4. Social URLs, testimonials, partner logos (pending client)

## Forms & WhatsApp — final verified state
- **QuickQuoteForm & ContactForm**: POST to `/api/quote` or `/api/contact` → Resend → `newtabador@gmail.com` (primary), cc `mudtheronly1976@gmail.com` (backup). Reply-to = customer email. File attached inline.
- **WhatsApp button**: `+966538992076`, pre-filled EN and AR messages, tracks `whatsapp_click` event, appears in header nav, hero, service pages, contact, mobile bar, floating side-button on desktop.
- **Fallback**: If Resend key missing or API fails, browser opens `mailto:` to office email with form contents (no leads lost).
