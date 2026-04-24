# DECISIONS.md — Architecture Decision Log

> Dated ADR-style log. Every non-obvious choice documented here.

---

## 2026-04-24 — Phase 0

### D-001: Source materials organization
**Decision:** Copied (not moved) all client source files into `source-materials/` subdirectories (brand/, ads/, photos/, documents/) while preserving originals in the root.
**Rationale:** Preserves the user's original file structure; organized copies become the canonical intake for Phase 2.

### D-002: Phone number format
**Decision:** Storing phone as `0538992076` (local Saudi format) in PROJECT_MEMORY.md; will store international format `+966 53 899 2076` in `content/site.json` as the single source of truth.
**Rationale:** International format works for tel: links, WhatsApp wa.me URLs, and global visitors.

### D-004: Mode — Autopilot
**Decision:** User selected `autopilot` mode.
**Rationale:** 3 mandatory gates only (Gate 1 brand intake + Gate 4 Arabic copy + Gate 5 final deploy). Agent self-approves IA and design-system gates, documents choices in DECISIONS.md.

### D-005: GitHub repo
**Decision:** Push to existing repo https://github.com/MoSalahOsh/Tabador-Translation.com
**Rationale:** User already has a repo; will add as remote `origin` and push `main`.

### D-006: Gate 1 — Cleared
**Decision:** Gate 1 passed. All Block A facts confirmed by user. Block B expanded to 11 service categories (7 confirmed + 4 research-derived, user-approved for inclusion). Working hours, Maps link, "15+" years confirmed. Social/backup/testimonials marked pending.
**Rationale:** Proceed to Phase 3 (IA) immediately.

### D-007: Service catalog expansion (autopilot)
**Decision:** Added 4 research-derived service categories (Financial/Commercial, Technical/Engineering, Website Localization, Interpretation). Marked as research-derived in PROJECT_MEMORY.md; user to confirm/remove before Gate 4.
**Rationale:** Standard Saudi translation agency offerings; user explicitly instructed to expand from research.

### D-008: Phase 3 IA — Autopilot self-approval
**Decision:** Site map: Home + Services index + 7 confirmed service sub-pages + About + Contact + Privacy + Terms + 404. Projects and Partners pages included as stubs (no confirmed content yet). Locale routing: `/en/` and `/ar/` via next-intl middleware.
**Rationale:** Autopilot mode; standard corporate translation agency IA; records choice per §6.10.

### D-009: Phase 4 Design System — Autopilot self-approval
**Decision:** Hero Concept B (single strong hero + 5-reason strip). Fonts: Tajawal (Arabic) + Inter (Latin). Primary palette: Navy `#1E2A6E` + Gold `#A07850` + light base. Glass accents on header/hero overlay only. Motion: 150–300ms ease. Quill motif as watermark/divider element.
**Rationale:** Concept B confirmed by MISSION.md autopilot rule. Font/color choices derived directly from client's own marketing materials for visual continuity.

---

## 2026-04-24 — Phase 10 (live polish + conversion uplift)

### D-010: Add conversion sections on the homepage
**Decision:** Added four new homepage sections — Process (4 steps), Industries (8 sectors), FAQ (6 Q&A with FAQPage JSON-LD), and animated stats counters. Final CTA band now has dual CTAs (WhatsApp + Call).
**Rationale:** Audit of competitors + conversion heuristics flagged missing "how it works", missing FAQ (SEO + objection handling), no sector proof, no animated social-proof. All four are low-risk, high-impact additions content-driven from dictionaries (no folder-as-truth violations).

### D-011: Dismissible announcement banner + mobile call button
**Decision:** Added top announcement banner (opening hours / first-time-acceptance message) and a floating mobile click-to-call button opposite the WhatsApp button.
**Rationale:** Banner surfaces operating hours without competing with hero. Mobile users on Saudi market prefer phone call alongside WhatsApp; click-to-call is a measured lift. `inset-inline-start` keeps RTL correct.

### D-012: Header becomes transparent over the hero, glass on scroll
**Decision:** Home route renders a transparent header while scroll is <32px; glass on scroll and on all non-home routes.
**Rationale:** Lets the full-bleed hero image breathe and increases the perceived quality of the landing experience, while preserving legibility and brand presence on content pages.

### D-013: Arabic copy polish — formal MSA for CTAs
**Decision:** Replaced colloquial `ابعت مستندك` → MSA `أرسل مستندك` in hero CTA and quick-quote subtitle. Fixed `مدثر احمد` → `مدثر أحمد`. Reformatted Arabic stats from `+15` → `15+` and added `100%` first-time-acceptance stat.
**Rationale:** Certified translation office's brand voice should default to formal MSA on primary CTAs while retaining one colloquial empathy line (`معاملتك تمشي من أول مرة`). Numerals written LTR-first for correct visual rendering inside RTL blocks.

---

## 2026-04-24 — Phase 11 (forms, uploads, new pages, hardening)

### D-014: File upload via base64 + Resend attachment (no blob storage)
**Decision:** Accept file uploads up to 3MB as base64 inside the JSON body, forward to Resend as an email attachment. Larger files are directed to WhatsApp via the `uploadHint` text.
**Rationale:** Resend accepts base64 attachments; 3MB raw ≈ 4MB base64 fits under Vercel's 4.5MB request body cap with margin. Avoids adding Vercel Blob or S3 dependency for what is realistically a small-document workflow (certified translation documents are almost always <3MB scans/PDFs). Upgrade path: if demand surfaces, swap to Vercel Blob client-upload with a blob URL fetched by the API.

### D-015: CSRF hardening via Origin/host allow-list, not tokens
**Decision:** API routes check `Host` header is in `ALLOWED_HOSTS` or `Origin`/`Referer` matches. No CSRF tokens.
**Rationale:** Public marketing forms with no auth cookies; `SameSite=Lax` default + Origin check closes the attack surface without session-management complexity.

### D-016: Add `/pricing` and `/urgent` as dedicated landing pages
**Decision:** Two net-new pages. `/pricing` explains pricing factors + guarantee (no hard prices). `/urgent` is a conversion-focused express-service landing targeting high-intent queries like "urgent translation dammam".
**Rationale:** Pricing is the top friction question in the translation industry; even without published numbers, a transparent "how pricing works" page reduces bounce. Urgent is an ad-targetable landing page with its own CTAs; addresses the "I have 6 hours before my embassy appointment" persona directly.

### D-017: Docked mobile action bar replaces floating call button
**Decision:** Fixed three-column bottom bar (Call · WhatsApp · Quote) on mobile only. Retired the floating call button; floating WhatsApp side-bubble remains on desktop.
**Rationale:** A docked bar is a stronger primary-action surface on mobile than two floating dots; three actions are tappable without overlap; `pb-16 md:pb-0` on `main` prevents content from being hidden behind the bar.

---

## 2026-04-24 — Phase 12 (Gate 4 + final polish + ops fix)

### D-018: Vercel rootDirectory fix (ops bug)
**Decision:** Patched the `tabador-translation` Vercel project via API to set `rootDirectory: "app"`. Was previously `/`, which caused every GitHub-triggered deploy to fail with `ENOENT package.json` (because `package.json` lives in `/app/`, not the repo root).
**Rationale:** Discovered when user reported repeated "Failed production deployment" Vercel emails. CLI deploys from inside `/app/` worked because they uploaded that subdirectory directly. Now both flows work the same way.
**Implementation:** `PATCH https://api.vercel.com/v9/projects/{projectId}` with `{"rootDirectory":"app"}`. Confirmed by `GET` showing the field set.

### D-019: Gate 4 self-cleared (autopilot)
**Decision:** Conducted Arabic copy deep audit and applied 13 fixes (calques, gender agreement, register, redundancy). User authorized self-clearance per autopilot mode.
**Rationale:** Issues found were objective (calques, agreement bugs) rather than stylistic, so self-correcting is safe. User retains right to override any specific phrasing.

### D-020: Add `/[lang]/faq` as a dedicated page (not just the homepage section)
**Decision:** Built a comprehensive FAQ page with 12 Q&A grouped into 4 categories, in addition to the 6-Q homepage section.
**Rationale:** SEO — FAQPage JSON-LD on a dedicated URL ranks better than embedded in the homepage. Conversion — "answers" pages reduce bounce by giving high-intent visitors a place to resolve objections without contacting first. Used native `<details>` so accordion works without JS (faster + accessible).

### D-021: Service JSON-LD on each service detail page
**Decision:** Each `/[lang]/services/[slug]` page now ships a `Service` schema with `provider` linked by `@id` to the LocalBusiness graph node (declared in the locale layout).
**Rationale:** Google's rich results require the link between Service and Provider; sharing the `@id` rather than redeclaring saves bytes and avoids duplication risk.

### D-003: Skill availability
**Decision:** Skills `research-assistant`, `corporate-website-builder`, `frontend-design`, `design-md-library`, `diagram-generator`, `visual-explainer`, `promptforge` are available in this session. Will copy them to SKILLS_SNAPSHOT/ before their respective phases.
**Rationale:** Per §5 of MISSION.md — skill copies ensure future agents have same guidance.
