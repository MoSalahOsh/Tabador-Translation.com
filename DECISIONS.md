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

### D-003: Skill availability
**Decision:** Skills `research-assistant`, `corporate-website-builder`, `frontend-design`, `design-md-library`, `diagram-generator`, `visual-explainer`, `promptforge` are available in this session. Will copy them to SKILLS_SNAPSHOT/ before their respective phases.
**Rationale:** Per §5 of MISSION.md — skill copies ensure future agents have same guidance.
