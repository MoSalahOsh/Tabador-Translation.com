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

### D-003: Skill availability
**Decision:** Skills `research-assistant`, `corporate-website-builder`, `frontend-design`, `design-md-library`, `diagram-generator`, `visual-explainer`, `promptforge` are available in this session. Will copy them to SKILLS_SNAPSHOT/ before their respective phases.
**Rationale:** Per §5 of MISSION.md — skill copies ensure future agents have same guidance.
