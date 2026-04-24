# NEXT_STEPS.md — Resume Here

> Updated: 2026-04-24 — Phase 10 (live polish) pushed. Site live on custom domain.

## Current status

Site is **live** at https://tabador-translation.com with Phase 10 polish shipped:
announcement banner, How-it-works process, FAQ (+JSON-LD), industries strip, animated stats,
mobile call button, scroll-aware header, expanded footer, richer about page, embedded map,
and Arabic translation fixes (`مدثر أحمد`, MSA `أرسل`).

GitHub push to `master` auto-deploys via Vercel.

## 🛑 Gate 4 — User review of Arabic copy

Before tagging v1.0.0, review Arabic copy on:
- `/ar` — Homepage (banner, hero, process, FAQ, industries)
- `/ar/services` + 2–3 service detail pages
- `/ar/about` — new mission/vision/values blocks
- `/ar/contact`

Check §12 items 1–7: grammar, construct state (إضافة), verb agreement, industry terminology, punctuation.

## Remaining to close v1.0.0

1. **RESEND_API_KEY** — get from [resend.com](https://resend.com) and add in Vercel → Settings → Environment Variables. Without it, forms fall back to `mailto:` (no leads lost).
2. **Lighthouse + axe** — run on live `tabador-translation.com` for both locales, record scores in PROGRESS.md. Target: Perf ≥ 90, A11y ≥ 95, BP ≥ 95, SEO ≥ 95.
3. **Gate 4 sign-off** — you confirm Arabic copy OK.
4. **Tag v1.0.0**:
   ```bash
   git tag v1.0.0 && git push --tags
   ```

## Pending client content (non-blocking)

| Item | Where it slots in |
|---|---|
| Social URLs | `content/{en,ar}/site.json` → `social.*` |
| Testimonials | Future `testimonials.items[]` in site.json (section will render once populated) |
| Partner logos | New `/partners` content when provided |
| Founding year | Swap "15+ years" for "since 2009" if preferred |
| Public pricing | Add price cards if you want to display rates |

Tracked in [OPEN_QUESTIONS.md](OPEN_QUESTIONS.md).

## 🛑 Gate 5 — Final sign-off

Post-deploy smoke test on production domain → you confirm → tag `v1.0.0`.
