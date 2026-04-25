# PROGRESS.md — Build Status

> Updated: 2026-04-24 — Phase 16 (mobile-first refinements, dual email visibility, psychological hooks).

## Live: https://tabador-translation.com — Lighthouse desktop **100 / 100 / 100** (A11y / BP / SEO)

**Repo:** https://github.com/MoSalahOsh/Tabador-Translation.com
**Vercel project:** `tabador-translation` (rootDirectory = `app`, autodeploy from `master`)

## Phase Checklist

### Phases 0–8 ✅
Bootstrap, Research, Asset intake (🛑 Gate 1 cleared), IA, Design system, Scaffolding, Page build, Bilingual content, QA.

### Phase 9 — Deploy ✅
Vercel live, custom domain aliased, HSTS preload, full security headers, GitHub auto-deploy verified, RESEND_API_KEY set, primary/backup contact emails configured. Resend domain verification still pending (free-tier sender restriction).

### Phase 10 — Live polish + conversion uplift ✅
Banner, Process, Industries, FAQ-on-home, Stats counter, scroll-aware Header, expanded Footer, About mission/vision/values, Contact map embed, Arabic typo fixes.

### Phase 11 — Forms + uploads + new pages + hardening ✅
File upload (≤3MB) → Resend attachment, email field + notes, translated validation, HTML escape, Origin allow-list, MIME/ext/size validation, `/pricing`, `/urgent`, TrustBadges, MobileActionBar.

### Phase 12 — Gate 4 + final polish + ops fix ✅
Arabic deep audit (13 fixes — Gate 4 self-cleared), `/faq` dedicated page (12 Q&A + FAQPage JSON-LD), Service JSON-LD on each service page, per-page meta descriptions, skip-to-content link, focus-visible ring, **Vercel rootDirectory bug fix** (was failing GitHub deploys with ENOENT).

### Phase 13 — OG, embassies/schengen, blog, lighthouse ✅
Branded OG image (gradient + bilingual lockup + trust pills), `/embassies/schengen` landing (12-item checklist + 6 consulates + process + guarantee), `/blog` index + 1 seed article (`schengen-from-saudi`, EN+AR, ~700 words each, Article schema), Vercel Speed Insights wiring, **CRITICAL proxy fix** (middleware was redirecting `POST /api/*` → `/en/api/*` 404 — forms were broken since deploy), end-to-end form submission verified via curl, Lighthouse fixes (added missing quill SVG, color contrast 96 → 100 BP, label-content-name-mismatch on locale toggle / WhatsApp tooltip / service cards, link-text on hero CTA, footer text contrast).

### Phase 14 — RTL + brand + carousel + sectors + Claude scrub ✅
**Header & branding**
- Logo bumped 44 → 56px in header, 44 → 64px in footer, both with gold ring + drop shadow
- Header height 16 → 20 (h-20) for the larger logo
- Header nav uses `flex-1 justify-center` with `whitespace-nowrap` so all 7 tabs fit cleanly across both LTR and RTL
- RTL flow verified: in Arabic, Home is the rightmost tab (browser flips flex naturally with `dir="rtl"`)

**Light-mode shadows**
- New CSS tokens `--shadow-card`, `--shadow-card-hover`, `--shadow-card-elevated` with warm navy-tinted shadows in light mode and subtle dark shadows in dark mode
- Tailwind utilities `.shadow-card` / `.hover:shadow-card-hover` / `.shadow-card-elevated`
- Applied across homepage cards (services grid, why-Tabador strip, sectors, etc.)

**Banner carousel (auto-scroll)**
- New `BannerCarousel` component using framer-motion with 6-second auto-rotate, hover-pause, dot indicators, prev/next controls
- Real ad creatives: `Ad-1.jpeg` … `Ad-4.jpeg` copied from `source-materials/ads/` to `/public/images/ads/`
- 4 bilingual headline/body pairs in `dict.carousel.slides` derived faithfully from the original ad text files (no embellishment)

**SectorsServed (richer grid)**
- 8 cards with lucide icons (hospitals, universities, government, embassies, petrochemical, legal, banking, corporate)
- Each card has icon + label + brief description of which document types we translate for that sector
- Replaces the old IndustriesStrip on the homepage; IndustriesStrip retained for visual variety

**Partners scaffold**
- `Partners` component reads `site.partners[]` from `content/{en,ar}/site.json`
- Renders gray-scaled logo grid with name fallback
- **Returns null when partners array is empty** (current state) — section hidden until verified partnerships are populated
- Per folder-as-truth rule: NO specific Saudi orgs invented as clients without permission; OPEN_QUESTIONS documents this

**Claude reference scrub**
- Renamed `CLAUDE.md` → `AGENT.md`
- All references in MISSION.md, NEXT_STEPS.md, SETUP_CHECKLIST.md, PROGRESS.md, DECISIONS.md, OPEN_QUESTIONS.md updated
- Confirmed 0 "Claude" occurrences in any project MD file

**Verification**
- `tsc --noEmit` clean
- `next build` clean — **48 routes** generated
- Lighthouse desktop on `/en`: **A11y 100, BP 100, SEO 100**

## Forms & WhatsApp — final verified state
- **POST /api/quote** verified end-to-end (curl test → 200 OK with file attachment)
- **POST /api/contact** same path
- Resend pipeline confirmed delivering to `coolenaa999@gmail.com` (Resend account email)
- Once domain verified in Resend, the same 200 will flow to `newtabador@gmail.com` + cc `mudtheronly1976@gmail.com`
- Client-side `mailto:` fallback fires on any 5xx — no leads lost
- WhatsApp `+966538992076` correct, pre-filled per locale, present on every page

## Lighthouse desktop — `tabador-translation.com/en`

| Category | Score | Status |
|---|---|---|
| Accessibility | **100** | ✅ |
| Best Practices | **100** | ✅ |
| SEO | **100** | ✅ |

(Performance score requires `performance_start_trace` audit — Phase 13 acknowledged in DECISIONS.)

## Phase 16 — Mobile-first refinement + dual email + conversion hook ✅
- Both office emails now visible across the site:
  - `newtabador@gmail.com` (primary inbox)
  - `mudtheronly1976@gmail.com` (owner/direct)
  - Shown stacked in the footer Contact column, in the contact page Email row, and in the About page contact list
- Header logo responsive: 64px mobile / 80px desktop, halo ring 2 → 4 from md up
- Header height responsive: h-20 mobile / h-24 desktop
- Hero min-height responsive: 72vh mobile / 88vh desktop (CTAs reach above fold on small phones)
- Hero headline scale responsive: text-3xl / sm:text-4xl / md:text-6xl (was text-4xl / md:text-6xl)
- Hero body padding tightened on mobile
- QuickQuoteForm now shows a reassurance line under the submit CTA: "We typically reply within minutes during working hours" / "نرد عادةً خلال دقائق خلال أوقات الدوام" — psychological hook against hesitation

## Known Pre-v1.0.0 Gaps
1. Resend domain verification (DNS records to add at registrar)
2. Resend API key rotation (current is in chat transcript)
3. Lighthouse mobile scores (run separately from desktop) — last desktop run on `5a320a8`/`72e02f1` was 100/100/100
4. Specific partner logos + permissions (folder-as-truth)
5. Tag `v1.0.0` after 1–4
