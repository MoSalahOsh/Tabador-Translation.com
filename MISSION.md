# MISSION — TABADOR TRANSLATION WEBSITE (v3)

## §0. PRIME DIRECTIVE
Build a bilingual (English + Arabic), light/dark, accessibly-glassmorphic corporate website for **Tabador Translation Est.** at **tabador-translation.com**, optimized to convert visitors into paying customers within the first minute. Use the files in this project folder as the single source of truth for all client facts and copy. Persist full state inside the folder so any future coding session can resume without re-briefing.

## §1. HOW TO READ THIS FILE
This file is your mission. Read it fully before acting. When you finish, write your condensed understanding to `AGENT.md` in your own words — that becomes the bootstrap for any future agent.

## §2. ROLE STACK
You are ONE agent with FOUR integrated expertises:
1. **Creative Director** — 15+ years premium corporate web design, Gulf professional-services.
2. **Senior Next.js Engineer** — App Router, TypeScript, Tailwind, Framer Motion, shadcn/ui, Core Web Vitals.
3. **Arabic Localization Lead** — native MSA in Saudi corporate register; true RTL layout engineering.
4. **DevOps Engineer** — GitHub + Vercel Pro + custom domain + CI/CD + analytics.

## §3. CLIENT IDENTITY CARD
| Field | Value |
|---|---|
| Trade name (EN) | Tabador Translation Est. |
| Trade name (AR) | مؤسسة دار تبادر للترجمة |
| Domain / folder | `Tabador-Translation.com` |
| Hosting | Vercel Pro (user-owned) |
| VCS | GitHub (user-connected) |
| Market | Saudi Arabia + GCC + international |
| Brand adjectives | certified · precise · fast · confidential · premium · trusted |
| Anti-adjectives | generic · casual · quirky · playful · cheap-looking |

All other facts (phones, emails, address, socials, service list, case studies, partner logos, taglines, hero copy, testimonials) come from the folder. If missing → flag in `OPEN_QUESTIONS.md`; do not invent.

## §4. FOLDER-AS-TRUTH PRECEDENCE
1. **Folder > research > your assumptions.** Research informs *pattern*; the folder dictates *content*.
2. **Extract client-authored copy** (taglines, value props, banner lines) from WhatsApp screenshots and notes — prefer the client's own words, lightly edited.
3. **Extract testimonials** from WhatsApp client-praise screenshots — but flag them for the user's permission before publishing (user must confirm "okay to publish" per testimonial).
4. **Extract brand signals** from any logos/files: dominant colors, typography hints, stamp motifs. Feed into Phase 4.
5. Never invent a phone number, email, address, partner, client name, project, or testimonial.

## §5. SKILL INVOCATION (MANDATORY)
Before starting each phase, read the listed `SKILL.md` file(s) and follow their procedures. Copy each used skill into `SKILLS_SNAPSHOT/` so a future agent has the same guidance even if the user's library moves.

| Phase | Required skill(s) |
|---|---|
| 1 | `research-assistant` |
| 2 | `file-reading`, `pdf-reading` |
| 3 | `diagram-generator`, `corporate-website-builder` |
| 4 | `design-md-library`, `frontend-design`, (optional) `visual-explainer` |
| 5–6 | `corporate-website-builder`, `frontend-design` |
| Any sub-prompt | `promptforge` |

If a skill is missing, log in `DECISIONS.md` and proceed with best practice.

## §6. EXECUTION CONTRACT
1. **Plan, then act.** Announce each phase before working in it.
2. **Respect approval gates.** Do not cross 🛑 gates silently.
3. **Folder truth.** Never fabricate client facts or copy.
4. **Content-model discipline.** Every user-facing string lives in `/content/{en|ar}/…`. Zero hardcoded strings in components.
5. **Single-write principle.** Phone numbers, emails, socials, brand colors each live in exactly ONE source (`content/site.json` or env var).
6. **Bilingual parity.** Every feature ships in EN and AR simultaneously. No English-only shipping.
7. **Commit early, commit often.** Conventional commits, one logical change per commit.
8. **Token economy.** Before any large file read or long chat reply, ask: "Is this necessary now?" Prefer targeted reads.
9. **Leave the campsite cleaner.** End every response with updated `PROGRESS.md` + `NEXT_STEPS.md`, and a git commit if code changed.
10. **No silent decisions.** Non-obvious choices go in `DECISIONS.md` with a one-line rationale.
11. **Propose variants at creative forks.** At each major creative decision (hero concept, color scheme, type pairing), present 2 options with trade-offs before committing.
12. **Concurrency rule.** Only one coding session edits this folder at a time. If two sessions collide, surface the conflict to the user.

## §7. MODES
The user declares a mode in their first reply. Default is `review`.
- **`review`** — Full gates (5 🛑 points). Maximum control. Slower.
- **`autopilot`** — Critical gates only (Gate 1 + Gate 4 + Gate 5). Faster. You proceed past design-system and IA gates by self-approval if you've met the explicit criteria in those phases.

## §8. MEMORY & HANDOFF PROTOCOL
Create and maintain these files in the project root:

```
Tabador-Translation.com/
├── MISSION.md              # This file (do not modify)
├── AGENT.md               # Your condensed bootstrap for future agents
├── PROJECT_MEMORY.md       # Extracted client facts (NAP, services, socials, quotes)
├── RESEARCH.md             # Phase 1 synthesized research
├── DECISIONS.md            # Dated ADR-style decision log
├── PROGRESS.md             # Checklist with statuses + Lighthouse scores
├── NEXT_STEPS.md           # Ordered "resume here" pointer (updated every response)
├── OPEN_QUESTIONS.md       # Unresolved questions for the user
├── DEPLOYMENT.md           # Env vars, DNS, Vercel config
├── EDITING_GUIDE.md        # For the non-dev user: how to edit phones, add services, etc.
├── SKILLS_SNAPSHOT/        # Copies of every SKILL.md used
├── source-materials/       # User's raw client files (read-only)
└── app/                    # The Next.js project
```

**Handoff rule.** If context is nearing full, or the user says "pause":
1. Update `PROGRESS.md` with what you did.
2. Write a precise enumerated resume plan in `NEXT_STEPS.md`.
3. Commit: `chore: checkpoint — session handoff`.
4. Reply: "Safe to start a new session — next agent resumes from `AGENT.md` + `NEXT_STEPS.md`."

**`AGENT.md` is the master briefing** — must always be current enough that a fresh agent, given only the folder, needs zero re-explanation.

## §9. PHASE-BY-PHASE EXECUTION
Each phase has entry criteria (must be true to start) and exit criteria (must be true to finish). Do not skip. 🛑 = mandatory user approval.

### PHASE 0 — Bootstrap
- **Do:** Create memory files. Copy relevant SKILL.md files into `SKILLS_SNAPSHOT/`. Init git. First commit: `chore: bootstrap project memory`.
- **Ask the user (before starting Phase 1):**
  - Mode: `review` or `autopilot`?
  - New GitHub repo, or push to an existing one? (If existing, provide URL.)
- **Exit:** Memory files exist; git initialized; user has answered the two questions.

### PHASE 1 — Deep Research *(skill: `research-assistant`)*
- **Do:** Produce `RESEARCH.md`:
  1. Analyze ≥ 5 leading translation agency sites (global + Gulf/Saudi).
  2. Industry UX patterns: quote flows, file-upload expectations, certification displays, pricing transparency.
  3. Bilingual RTL/LTR best practices (Arabic typography, numerals, mirrored UI).
  4. Trust signals that convert Saudi/GCC buyers.
  5. EN + AR SEO keyword map (intuitive estimates, not invented data).
  6. 2025–2026 glassmorphism — used tastefully vs. the dated traps.
  7. 8–12 Tabador-specific recommendations.
- **Exit:** `RESEARCH.md` saved; 5-line summary posted in chat.

### PHASE 2 — Asset & Brand Intake *(skills: `file-reading`, `pdf-reading`)*
- **Do:**
  - Walk `source-materials/` recursively. Classify every file.
  - Transcribe text in images (WhatsApp screenshots, business cards, etc.).
  - Extract requirements, service list, contacts, socials, client quotes from all text/chat.
  - Extract testimonials from WhatsApp praise screenshots — list them in `OPEN_QUESTIONS.md` for user approval.
  - Run **brand extraction** on logo(s): identify dominant colors (hex), suggested type pairing, visual motifs.
  - Populate `PROJECT_MEMORY.md` with verified facts.
  - List all gaps in `OPEN_QUESTIONS.md`.
- **🛑 Gate 1 — User review:** Post extracted facts + open questions + testimonial candidates. Wait for corrections/approvals before proceeding.

### PHASE 3 — Information Architecture *(skills: `diagram-generator`, `corporate-website-builder`)*
- **Do:** Draft site map (EN + AR mirror routes). Generate a Mermaid diagram saved as `docs/ia.mmd` + PNG. Propose navigation. Record in `DECISIONS.md`.
- **🛑 Gate 2 *(review-mode only)*:** Confirm IA before design. In autopilot, proceed.

### PHASE 4 — Design System *(skills: `design-md-library`, `frontend-design`)*
- **Do:**
  1. Load an appropriate DESIGN.md spec (Stripe polish + Apple whitespace + restrained glass layer).
  2. Define tokens: color (light/dark), spacing, radii, shadows, glass tiers (blur + opacity), motion timing.
  3. Pick fonts via `next/font`: Latin (Inter / Geist / Manrope) + Arabic (IBM Plex Sans Arabic / Tajawal / Readex Pro). Subset Arabic fonts to the characters actually used — they're heavy.
  4. **Propose 2 hero concepts** (Concept A: 5-banner carousel; Concept B: single strong hero + 5-reason strip) as side-by-side previews in `app/design-system/hero-preview`.
  5. Build `app/design-system/` showing every primitive in both themes × both locales.
- **🛑 Gate 3 *(review-mode only)*:** User picks hero concept + approves design system. In autopilot, pick Concept B (single hero + reason strip) as the conversion-optimized default, build the chosen concept, and note in `DECISIONS.md`.

### PHASE 5 — Scaffolding *(skill: `corporate-website-builder`)*
- **Do:**
  - `npx create-next-app@latest` (TS, Tailwind, App Router, ESLint).
  - Install: `next-intl`, `framer-motion`, `lucide-react`, `clsx`, `tailwind-merge`, shadcn/ui, `zod`, `react-hook-form`, `sharp`, `@vercel/analytics`, `@vercel/og`.
  - Configure i18n routing (`/en/...`, `/ar/...`) with `<html lang dir>` switching + middleware locale detection.
  - Global layout: header (locale + theme toggle), footer, **floating WhatsApp button** (locale-aware pre-filled message; bottom-right LTR, bottom-left RTL).
  - Wire Vercel Analytics + a custom event for every WhatsApp click and form submit.
- **Exit:** Shell runs; both locales route correctly; theme toggle works; WhatsApp button opens `wa.me` with greeting.

### PHASE 6 — Page Build
Build and commit in this order. After each page, run Lighthouse mobile + run the §13 Conversion Audit; log results in `PROGRESS.md`.

1. **Homepage** — chosen hero (Concept A or B) + trust row (years, docs translated, certifications, partner logos) + quick-quote mini-form + services grid (6 cards) + featured projects strip + testimonials (only approved ones) + final CTA band.
2. **Services index** + one route per service (`/[locale]/services/[slug]`): Legal, Medical, Personal Documents, Academic, Business/Commercial, Certified/Notarized, plus any surfaced from the folder.
3. **Projects / Case Studies** page.
4. **Partners & Clients** page (logo grid).
5. **About / Why Tabador** page.
6. **Contact** page: Google Map embed, click-to-call, click-to-mail, full address (EN + AR), working hours, social row (TikTok, Instagram, LinkedIn, Facebook), full service-request form (§10.3 reliability rules).
7. **Legal pages** — Privacy Policy + Terms of Service (minimal, Saudi-PDPL-aware; bilingual).
8. **System pages** — 404, loading skeletons, error boundary.
9. **Assets stack** — favicon set, Apple touch icons, Android manifest, default OG image, per-page OG via `@vercel/og`.

### PHASE 7 — Bilingual Content Pass
- Fill `/content/en/` and `/content/ar/` completely. Arabic is authored deliberately — never machine-translated.
- Run the §12 Arabic QA Checklist on every page.
- Verify RTL on every page: mirrored layouts, flipped arrows, correct numeral convention, no English word-order bleed.
- Every image `alt` exists in both languages.
- **🛑 Gate 4 — User review:** Share full staging URL. User approves Arabic copy before QA pass. If user is not a native Arabic reader, strongly recommend a human proofread by one of the client's own translators before Gate 5.

### PHASE 8 — QA, Performance, Accessibility, SEO
- Run §13 Conversion Audit on homepage + every service page + contact page. Fix every failing item.
- Lighthouse mobile targets: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
- axe / pa11y: 0 critical, 0 serious.
- Cross-browser: Chrome, Safari, Firefox, Edge.
- Cross-device: 360px, 414px, 768px, 1024px, 1440px.
- Functional matrix: theme × locale × WhatsApp × form submit × file upload × every internal link.
- SEO: per-page metadata, `hreflang`, `sitemap.xml`, `robots.txt`, `LocalBusiness` + `ProfessionalService` JSON-LD.
- Write `EDITING_GUIDE.md` — a non-dev guide for the user: "How to change a phone number" / "How to add a service" / "How to swap a photo."

### PHASE 9 — Deploy
- Create or use the GitHub repo per Gate 0 answer.
- Push `main`. Connect Vercel project. Set env vars (documented in `DEPLOYMENT.md`: form provider key, WhatsApp number, contact emails, analytics IDs).
- Attach custom domain `tabador-translation.com`. Write DNS instructions in `DEPLOYMENT.md`.
- Deploy to production. Smoke-test live. Tag `v1.0.0`.
- **🛑 Gate 5 — Final sign-off.** User confirms before project is declared done.

## §10. DELIVERABLES

### §10.1 Functional
- 5+ hero banners OR 1 strong hero + 5-reason strip (per Gate 3 choice)
- First-minute conversion stack above the fold
- Full service catalog with dedicated pages
- Projects, Partners, About, Contact pages
- Privacy + Terms (EN + AR)
- Persistent floating WhatsApp button (locale-aware)
- Full service-request form + file upload
- Theme toggle (persists, respects `prefers-color-scheme`)
- Language toggle (persists, true RTL)
- 404 / loading / error states

### §10.2 Design
- Glassmorphism as **signature accent only** (scrolled header, modals, hero overlay, floating CTA). NEVER on primary content cards.
- Layered depth: base → elevated → glass overlay → floating CTA.
- Restrained motion (150–300ms ease; reveal-on-scroll; hover micro-interactions). Respect `prefers-reduced-motion`.
- Typography hierarchy: display / h1–h6 / body / caption / mono.
- Dual-palette via CSS variables; no class duplication per theme.

### §10.3 Form reliability
- Client validation (zod + react-hook-form) + server validation (API route).
- Rate-limit + honeypot + file-type allow-list (`pdf,doc,docx,jpg,png`) + 10 MB max.
- Primary send via Resend/Web3Forms/Formspree → documented choice.
- **Always CC a backup email** so no lead is lost.
- **On API failure, auto-fallback to a `mailto:` link** pre-populated with the form contents. No lead ever silently fails.
- Log every submit as a Vercel Analytics event.

### §10.4 Analytics
- Vercel Analytics on every page.
- Custom events: `whatsapp_click`, `form_submit`, `form_fail`, `theme_toggle`, `locale_toggle`, `banner_cta_click_{index}`.
- Document event schema in `DEPLOYMENT.md`.

### §10.5 Technical stack
- Next.js 14+ · App Router · TypeScript · Tailwind · shadcn/ui · Framer Motion · next-intl · zod + react-hook-form · Resend · lucide-react · `sharp` · `@vercel/analytics` · `@vercel/og`.

### §10.6 Image pipeline
- All images via Next `<Image>`, AVIF/WebP, responsive `sizes`, `priority` only on hero.
- Any source image >300 KB gets pre-optimized to ≤150 KB.
- Arabic fonts subset to used glyphs (huge performance win).

## §11. CONTENT MODEL
```
content/
├── en/
│   ├── site.json                # brand, NAP, socials, whatsapp, hours
│   ├── home.mdx                 # hero banners array, sections copy
│   ├── services/<slug>.mdx      # title, summary, bullets, stance, FAQs
│   ├── projects/<slug>.mdx
│   ├── partners.json
│   ├── about.mdx
│   ├── privacy.mdx
│   └── terms.mdx
└── ar/  (mirror structure, independently authored)
```
- Identical frontmatter fields in both languages per page.
- `site.json` is the ONE source for phones/emails/address/socials/whatsapp. All components import from it.

## §12. ARABIC QA CHECKLIST
Run on every Arabic page before Gate 4. Each item must pass.

1. No machine-translation tells: no English word-order bleed (e.g., "الترجمة الشركة" ≠ "شركة الترجمة").
2. Correct إضافة (construct state): second term in definite form where appropriate; first term without الـ.
3. Tanween applied where required; no stray harakat.
4. Definite/indefinite agreement correct throughout.
5. Verb-subject agreement (gender + number + person) correct.
6. Prepositions correct — especially إلى / عن / في / على (common MT errors).
7. Industry terminology in Saudi register: "ترجمة معتمدة" (certified), "ترجمة موثّقة" (notarized — with context), "رخصة قيادة" (driving license), "عقد زواج" (marriage contract), "سجل تجاري" (commercial registration).
8. Numerals: consistent Western Arabic (0–9) OR Eastern Arabic (٠–٩) — pick ONE site-wide; default to Western Arabic unless client specifies.
9. Punctuation: Arabic comma (،), Arabic question mark (؟), Arabic semicolon (؛) where appropriate.
10. Dates: Hijri + Gregorian formats per context; match locale convention.
11. Icons and arrows mirrored (← becomes →) except for brand logos and directional media.
12. No left-aligned paragraphs in RTL pages (must be start-aligned).
13. Line-height slightly higher than English (Arabic diacritics need vertical room).
14. No English text accidentally rendered in an Arabic UI element.
15. Form placeholder text, error messages, toasts, modals, aria-labels all localized — nothing falls back to English.

## §13. CONVERSION AUDIT CHECKLIST
Run on every customer-facing page before Gate 5. Each item must pass.

1. **3-second rule.** The value proposition is readable within 3 seconds of load.
2. **Primary CTA visible above the fold** without scroll on a 360×640 mobile viewport.
3. **WhatsApp is always one tap away** — floating button never obscured; never hidden on mobile.
4. **Trust signals above the fold** — at least 2 of: years in business, document count, certification badge, partner logo.
5. **Social proof within 2 scrolls** on homepage.
6. **Pricing expectation set** — either specific prices or a frictionless "quick quote" with ≤4 fields.
7. **Service specificity** — visitor can see "we translate X document from Y language to Z language."
8. **Location trust** — address + map visible on Contact; city name visible on Home.
9. **Language pair clarity** — any mention of translation specifies language pairs.
10. **Mobile-first quality** — hero LCP < 2.0s on mid-tier mobile; tap targets ≥ 44×44px.
11. **No generic stock photography** where a real office/staff photo from the folder exists.
12. **Arabic site passes §12 checklist** — broken Arabic is an immediate trust kill.
13. **Every CTA clickable from keyboard**, focus ring visible.
14. **Form friction check** — request form has ≤ 6 fields; file upload optional; no account creation.
15. **Exit-safe form** — on API fail, `mailto:` fallback preserves user input.

## §14. PERFORMANCE / SEO / SECURITY / PRIVACY
- **Perf budget:** LCP < 2.0s, CLS < 0.05, INP < 200ms on mid-tier mobile.
- **SEO:** per-page metadata, canonical, `hreflang`, OG + Twitter images (via `@vercel/og`), JSON-LD (`LocalBusiness`, `ProfessionalService`, `BreadcrumbList`), `sitemap.xml`, `robots.txt`.
- **Security headers:** strict CSP, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, HSTS.
- **Privacy / Saudi PDPL:** minimal cookies; privacy-respecting analytics (Vercel Analytics is fine); don't retain form data longer than necessary; Privacy Policy + Terms pages describe practices in both languages.

## §15. FAILURE RECOVERY PLAYBOOK
| Situation | Response |
|---|---|
| Folder has no client materials | Stop at Gate 1, ask user to add files. |
| A skill's SKILL.md missing | Best-practice fallback; log in `DECISIONS.md`. |
| Unreadable file | Skip; note filename in `OPEN_QUESTIONS.md`. |
| Web research rate-limited | Fall back to documented patterns; note in `RESEARCH.md`. |
| Context nearing full | Run handoff protocol (§8). |
| Lighthouse target missed | Profile top 3 offenders; if still short, log trade-off in `DECISIONS.md`. |
| Form endpoint not configured | Ship with `mailto:` fallback + WhatsApp only; document env vars needed. |
| User unresponsive at a gate | Stop. Update `NEXT_STEPS.md` with the exact blocking question. |
| Arabic ambiguity / regional choice | Ask in `OPEN_QUESTIONS.md`; don't guess. |

## §16. CHAT INTERACTION FORMAT
Every response follows:
```
▶ Phase <n> — <name>
<1–3 line status>

Actions this turn:
- …
- …

Questions (if any):
1. …

Progress updated ✅
Next action: <one sentence>
```
No code dumps in chat if they can go to files. Memory files hold detail.

## §17. DEFINITION OF DONE
- [ ] All gates passed per active mode
- [ ] §10.1 deliverables exist and work
- [ ] §12 Arabic QA checklist passes on every AR page
- [ ] §13 Conversion Audit passes on every customer-facing page
- [ ] Lighthouse mobile targets met on home + 2 service pages + contact
- [ ] axe: 0 critical, 0 serious
- [ ] Deployed on `tabador-translation.com` with HTTPS
- [ ] All memory files current; `AGENT.md` bootstrap-ready
- [ ] `SKILLS_SNAPSHOT/` populated
- [ ] `EDITING_GUIDE.md` written for non-dev edits
- [ ] `v1.0.0` tag pushed

## §18. KICKOFF
Begin **Phase 0** now:
1. Confirm folder location.
2. Create all memory files from §8.
3. Copy relevant `SKILL.md` files into `SKILLS_SNAPSHOT/`.
4. `git init` + first commit.
5. Post the Phase 0 status block per §16, **including the two Gate-0 questions** (mode + repo).
6. Wait for user answers before starting Phase 1.
