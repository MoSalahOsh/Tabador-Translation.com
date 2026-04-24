# NEXT_STEPS.md — Resume Here

> Updated: 2026-04-24 — Phases 5 & 6 complete. Smoke test passed.

## Current status

All pages built and smoke-tested locally. The site runs at `localhost:3000` with both `/en` and `/ar` working, RTL correct, theme toggle functional, and all 6 pages + 11 service sub-pages rendering.

## Immediate next: Phase 7 — Bilingual Content Pass

### 7a — Footer service links (quick fix, 5 min)
The Footer currently derives link labels from slugs (`"Personal Official"` instead of the localized dictionary title). Fix by passing `dict.services.categories` to Footer and rendering proper titles.

**File:** `app/components/layout/Footer.tsx`
**Fix:** Replace the `.replace(/-/g, ' ')` label hack with a lookup into a passed `categories` dict.

### 7b — Arabic QA checklist (from MISSION.md)
- [ ] All Arabic text renders in Tajawal (not fallback)
- [ ] No mixed LTR/RTL in Arabic pages
- [ ] Form fields RTL-correct (labels, placeholders, error messages)
- [ ] Numbers displayed correctly (Arabic-Indic vs Western)
- [ ] Breadcrumb chevrons rotate 180° in RTL
- [ ] WhatsApp floating button on correct side (left in RTL) ✅ done
- [ ] Footer columns order sensible in RTL
- [ ] Locale toggle accessible from Arabic page ✅ done

### 7c — Content gaps (waiting on client)
These are non-blocking. When client provides:
- **Social URLs** → update `content/{en|ar}/site.json` social object
- **Backup email** → update `CONTACT_EMAIL_BACKUP` env var
- **Testimonials** → add section to homepage between services grid and final CTA

## After Phase 7 — Phase 8: QA / Perf / A11y / SEO

1. Run Lighthouse on `/en` and `/ar`
2. Fix any a11y issues (aria labels, focus states, color contrast)
3. Add `next/og` OG image generation for service pages
4. Add `sitemap.xml` + `robots.txt`
5. Verify `generateMetadata` canonical/hreflang on all pages
6. Check Core Web Vitals (LCP, CLS, FID)

## After Phase 8 — Phase 9: Deploy

1. Push to GitHub: `https://github.com/MoSalahOsh/Tabador-Translation.com`
2. Connect repo to Vercel Pro
3. Set env vars: `RESEND_API_KEY`, `CONTACT_EMAIL_PRIMARY=newtabador@gmail.com`, `CONTACT_EMAIL_BACKUP=mudtheronly1976@gmail.com`
4. Add custom domain `tabador-translation.com`
5. Verify DNS (CNAME/A records via Vercel DNS guide)
6. 🛑 Gate 2: User approves live URL before social announcement

## Pending from user (non-blocking)

- Social media URLs → see OPEN_QUESTIONS.md #3–6
- Backup email → see OPEN_QUESTIONS.md #11
- Testimonials → see OPEN_QUESTIONS.md #12
