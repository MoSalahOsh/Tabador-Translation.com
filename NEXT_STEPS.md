# NEXT_STEPS.md — Resume Here

> Updated: 2026-04-24 — Phases 7 & 8 complete. Ready for Gate 4 + Deploy.

## Current status

Phases 5–8 complete and pushed to GitHub. The site is fully bilingual, RTL-correct, SEO-structured, and security-hardened. Ready for Vercel deployment.

## 🛑 Gate 4 — User review of Arabic copy

Before going live, the user (or a native Arabic speaker from the team) should review the Arabic pages:
- `/ar` — Homepage
- `/ar/services` — Services index
- `/ar/contact` — Contact page
- Any 2–3 service detail pages in Arabic

Specifically check (§12 checklist items 1–7): grammar, construct state (إضافة), verb agreement, industry terminology, punctuation (،؟؛).

**Action:** Confirm "Arabic copy approved" before Phase 9.

---

## Phase 9 — Deploy to Vercel

### Step 1: Connect GitHub repo to Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Import: `https://github.com/MoSalahOsh/Tabador-Translation.com`
3. **Root Directory:** set to `app` (the Next.js project is inside `app/`)
4. Framework Preset: Next.js (auto-detected)

### Step 2: Set environment variables in Vercel
```
RESEND_API_KEY          = <get from resend.com>
CONTACT_EMAIL_PRIMARY   = newtabador@gmail.com
CONTACT_EMAIL_BACKUP    = mudtheronly1976@gmail.com
```

### Step 3: Add custom domain
1. Vercel → Project → Settings → Domains
2. Add `tabador-translation.com` and `www.tabador-translation.com`
3. Follow Vercel DNS instructions (add CNAME or A record at your domain registrar)

### Step 4: Smoke-test live
- Visit `https://tabador-translation.com/en` and `/ar`
- Test WhatsApp button opens correct pre-filled chat
- Submit a test quote form
- Check HTTPS + security headers

### Step 5: Run Lighthouse on live URL
Target: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95

### Step 6: Tag v1.0.0
```bash
git tag v1.0.0 && git push --tags
```

---

## Remaining content items (non-blocking, add any time)

| Item | Action |
|---|---|
| Social media URLs | Update `content/{en,ar}/site.json` → `social.*` |
| Backup email | Set `CONTACT_EMAIL_BACKUP` env var in Vercel |
| Testimonials | Add to dictionaries + homepage component |

All pending in OPEN_QUESTIONS.md #3–6, #11, #12.

---

## 🛑 Gate 5 — Final sign-off

After deploy + live smoke test: user confirms site is done → tag `v1.0.0`.
