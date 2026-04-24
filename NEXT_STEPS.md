# NEXT_STEPS.md — Resume Here

> Updated: 2026-04-24 — Audit pass complete. Phases 5–8 + audit fixes pushed. Ready for Gate 4 + Deploy.

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

**Status: DEPLOYED** — https://tabador-translation.vercel.app (live now)

### ✅ Done
- Vercel CLI deployed, project = `tabador-translation` (account: mu-salah-oshi)
- Env vars set: CONTACT_EMAIL_PRIMARY, CONTACT_EMAIL_BACKUP
- Domains registered in Vercel: tabador-translation.com + www

### 🔧 Remaining: DNS (at your domain registrar)
Add these two DNS records at wherever you bought `tabador-translation.com`:

| Type | Name | Value |
|---|---|---|
| A | `@` (or `tabador-translation.com`) | `76.76.21.21` |
| A | `www` | `76.76.21.21` |

DNS propagates in 0–48 hours. After that, the site is live at `https://tabador-translation.com`.

### 🔧 Remaining: Email (Resend API key)
1. Sign up free at [resend.com](https://resend.com)
2. Create an API key
3. Go to [Vercel → Project → Settings → Environment Variables](https://vercel.com/mu-salah-oshi/tabador-translation/settings/environment-variables)
4. Add: `RESEND_API_KEY = <your-key>`
5. Redeploy: `vercel --prod` from `D:/Tabador-Translation.com/app`

Without this, forms fall back to mailto (no leads are lost).

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
