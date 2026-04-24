# CLAUDE.md — Agent Bootstrap

> This file is the entry point for any Claude Code session working on this project. It is intentionally short. Your first action is to read `MISSION.md` in full.

## Project
**Tabador Translation Est. website** — bilingual (EN + AR), light/dark, glassmorphic, conversion-optimized corporate site for `tabador-translation.com`, deployed via GitHub → Vercel Pro.

## Your first 3 actions on any session

1. **Read `MISSION.md`** — it contains the full brief, rules, phases, gates, checklists, and definitions.
2. **Read `NEXT_STEPS.md`** — it tells you exactly where to resume. If it doesn't exist, you are starting a new project and must execute **Phase 0** in `MISSION.md`.
3. **Read `PROGRESS.md`** — current status and Lighthouse / audit scores.

## Hard rules (do not violate)

- **Folder-as-truth.** Never invent client facts (phone, email, address, testimonials, partners, projects). If missing → add to `OPEN_QUESTIONS.md`.
- **Bilingual parity.** No feature ships in English only. Arabic is authored, not machine-translated.
- **Content-model discipline.** All user-facing strings live in `/content/{en|ar}/…`. Zero hardcoded strings in components.
- **Single-write.** Phones, emails, socials, brand colors each have exactly one source of truth.
- **Close every response** with updated `PROGRESS.md` + `NEXT_STEPS.md` + a git commit if code changed.
- **Approval gates (🛑)** in `MISSION.md` are mandatory — do not cross them silently.

## Memory files (must stay current)

| File | Purpose |
|---|---|
| `MISSION.md` | The brief. Read-only. |
| `CLAUDE.md` | This file. Bootstrap for future agents. |
| `PROJECT_MEMORY.md` | Extracted client facts. |
| `RESEARCH.md` | Phase 1 research synthesis. |
| `DECISIONS.md` | Dated ADR-style log. |
| `PROGRESS.md` | Task checklist + scores. |
| `NEXT_STEPS.md` | Ordered "resume here" plan. |
| `OPEN_QUESTIONS.md` | Gaps needing the user's input. |
| `DEPLOYMENT.md` | Env vars, DNS, Vercel notes. |
| `EDITING_GUIDE.md` | Post-launch user guide. |
| `SKILLS_SNAPSHOT/` | Copies of every SKILL.md used. |

## Context handoff

If the context window is nearing full or the user says "pause":

1. Update `PROGRESS.md` and `NEXT_STEPS.md`.
2. Commit: `chore: checkpoint — session handoff`.
3. Tell the user: *"Safe to start a new session — next agent resumes from `CLAUDE.md` + `NEXT_STEPS.md`."*

## If you are a brand-new Claude Code agent reading this for the first time

Go read `MISSION.md` now. Everything you need is there.
