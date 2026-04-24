# PROGRESS.md — Build Status

> Updated: 2026-04-24 — Phase 12 (Gate 4 cleared, final polish, FAQ page, SEO + a11y).

## Current Phase: 12 — Gate 4 self-cleared, final polish ✅ DEPLOYED

**Live:** https://tabador-translation.com
**Repo:** https://github.com/MoSalahOsh/Tabador-Translation.com
**Vercel project:** `tabador-translation` (rootDirectory = `app`)

## Phase Checklist

### Phase 0 — Bootstrap ✅
### Phase 1 — Research ✅
### Phase 2 — Asset & Brand Intake ✅ (🛑 Gate 1 CLEARED)
### Phase 3 — Information Architecture ✅
### Phase 4 — Design System ✅
### Phase 5 — Scaffolding ✅
### Phase 6 — Page Build ✅
### Phase 7 — Bilingual Content Pass ✅
### Phase 8 — QA / Performance / Accessibility / SEO ✅

### Phase 9 — Deploy ✅
- [x] Vercel project live; custom domain `tabador-translation.com` ALIASED
- [x] HTTPS, HSTS preload, full CSP / Permissions / X-Frame / Referrer / nosniff headers
- [x] **Vercel rootDirectory fix** — was `/`, now `app`. GitHub auto-deploy works (was previously failing with `ENOENT package.json`; fixed via Vercel API patch in Phase 12).
- [x] GitHub → Vercel continuous deploy verified working
- [x] `RESEND_API_KEY` set in Vercel production env (key: `re_aXc...bpyX` — **needs rotation**, see NEXT_STEPS)
- [x] `CONTACT_EMAIL_PRIMARY` and `CONTACT_EMAIL_BACKUP` env vars set
- [ ] **Resend domain verification** for `tabador-translation.com` (so emails can deliver to non-Resend-account inboxes — currently only `coolenaa999@gmail.com` receives form submissions)
- [ ] Lighthouse + axe scores recorded
- [ ] `v1.0.0` tag (after items above closed)

### Phase 10 — Live polish + conversion uplift ✅
Banner, Process, Industries, FAQ-on-home, Stats counter, Mobile call btn, scroll-aware Header, footer expansion, About mission/vision/values, Contact map embed, Arabic fixes (مدثر أحمد + stats numerals + MSA CTAs).

### Phase 11 — Forms + uploads + new pages + hardening ✅
Form file upload (≤3MB) → email attachment via Resend; email + notes fields; translated validation errors; HTML-escape + Origin allow-list (CSRF); MIME/ext/size validation; `/pricing` + `/urgent` pages; TrustBadges section; MobileActionBar.

### Phase 12 — Gate 4 + final polish ✅

**Gate 4 — Arabic copy self-cleared (autopilot)**
Deep audit + 13 fixes:
- `كل الصيغ` → `جميع الصيغ`
- `حيث تحتاجنا` → `بالمكان الذي تحتاجه`
- `للملفات الحساسة زمنياً` → `للملفات ذات المواعيد الحرجة`
- `فقط اسألنا` → `فاسألنا`
- `لأي مستند وأي جهة` → `لكل مستند ولكل جهة`
- `شركاء ترجمة يوميون` → `شريك الترجمة اليومي`
- `توصل لك ترجمة` → `تُسلّم لك ترجمة`
- `إحالة علاج` → `إحالة طبية`
- `عرض سعر مميز` → `عرض سعر بأولوية`
- `الاعتماد ... مشمول` → `مشمولة` (gender agreement)
- `وإلا نصلحها مجاناً` → `وإلا أعدنا التصحيح مجاناً`
- `كل دقيقة تحسب` → `الوقت يداهمك`
- `بعرض سعر دقيق ومحدد` → `بعرض سعر دقيق` (deduplication)

**New page — `/[lang]/faq`**
- 12 Q&A in 4 groups (About Certified Translation / Pricing & Turnaround / Submitting / Acceptance & Delivery)
- Native `<details>` accordion (no JS needed for collapse)
- FAQPage + BreadcrumbList JSON-LD
- "Still have a question?" CTA → WhatsApp + Call
- Header nav and Footer quick-links updated

**Per-page SEO**
- Service detail pages: full Service JSON-LD with provider linked to LocalBusiness `@id`, areaServed, offers.priceCurrency=SAR
- Service detail pages: gradient header card with service icon + improved bullet styling + trust callouts + dual CTA (WA + Call) + Pricing link
- `/services`, `/about`, `/contact`: per-locale meta description + canonical + alternates
- Sitemap now lists all 9 static routes per locale (×2) + 11 service detail pages (×2) = 40 entries plus root sitemap

**Accessibility**
- Skip-to-content link (`.skip-link` in globals.css), translatable
- Global `:focus-visible` ring (gold accent, 2px outline-offset)
- Service detail page CTA buttons gain proper hierarchy

**Verification**
- `tsc --noEmit` clean
- `next build` clean — **48 routes** generated

## Forms & WhatsApp — final verified state

| Component | Wired to | Status |
|---|---|---|
| QuickQuoteForm | `/api/quote` → Resend → `newtabador@gmail.com` (cc backup), reply-to=customer email, file as attachment | ✅ |
| ContactForm | `/api/contact` → same path | ✅ |
| WhatsApp button (×6 placements) | `+966538992076`, pre-filled per locale | ✅ |
| Mobile docked bar | Call · WhatsApp · Quote | ✅ |
| Floating WhatsApp (desktop) | tracks `whatsapp_click` analytics | ✅ |

**Caveat:** Until Resend domain verification is done, emails only reach `coolenaa999@gmail.com` (Resend account email) due to free-tier sender restrictions. Quote/Contact `mailto:` fallback always works.

## Lighthouse Scores
Pending live run.
