# NEXT_STEPS.md — Resume Here

> Updated: 2026-04-24 — Phase 11 (forms + uploads + new pages + hardening) pushed.

## Site is live at https://tabador-translation.com

GitHub push to `master` auto-deploys via Vercel. Latest commit adds:
- Document upload on both forms (PDF/JPG/PNG/WEBP/DOC/DOCX, ≤3MB) → delivered as email attachment to the office
- Email field + notes field on quote form; translated validation errors
- HTML-escape + Origin/host check on API routes (CSRF/XSS hardening)
- New pages: `/pricing` + `/urgent` (both locales, indexed in sitemap)
- TrustBadges strip (8 authorities) on homepage
- Mobile docked action bar (Call · WhatsApp · Quote) replacing single call button
- Arabic polish: `اطلب عرض سعر سريع`, `نصادق على أمانة الترجمة`
- Header nav expanded with Pricing + Urgent links

## 🛑 Gate 4 — User review of Arabic copy

Review live Arabic pages before v1.0.0:
- `/ar`, `/ar/services`, `/ar/about`, `/ar/contact`
- **New**: `/ar/pricing`, `/ar/urgent`

Check grammar, construct state (إضافة), verb agreement, industry terminology, punctuation (،؟؛).
Report any exact line that needs change.

## Remaining to close v1.0.0

1. **RESEND_API_KEY** — at [resend.com](https://resend.com), free tier is fine. Add in Vercel → Settings → Environment Variables → redeploy. Without it, forms fall back to `mailto:` (still works).
   - Note: until you verify the `tabador-translation.com` sending domain in Resend, the `from` address stays `onboarding@resend.dev`. Verifying the domain is a 5-minute DNS step — optional but recommended for production.
2. **Lighthouse + axe** on live URL, record scores in PROGRESS.md.
3. **Gate 4 sign-off** — confirm Arabic copy OK.
4. **Tag v1.0.0**:
   ```bash
   git tag v1.0.0 && git push --tags
   ```

## Form flow — end-to-end (for your reference)

**Quote form (homepage + on `/en` `/ar`):** Name + Phone + Document type + From/To language + Email (optional) + Notes (optional) + File upload (optional, ≤3MB).
- Submits JSON to `/api/quote` → Resend → `newtabador@gmail.com` with `mudtheronly1976@gmail.com` CC'd. Reply-to = customer's email.
- File arrives as an attachment on the email.
- If anything fails, browser opens a pre-filled `mailto:` to your email.

**Contact form (on `/en/contact` `/ar/contact`):** Name + Phone + Email + Service + Message + File. Same Resend path.

**WhatsApp:** `+966538992076`, pre-filled message per locale. Note: WhatsApp deep-links cannot pre-attach files (platform limitation) — customers attach in WA manually. Form upload is the "upload a file to us" path.

## Pending client content (non-blocking)

| Item | Where it slots in |
|---|---|
| Social URLs | `content/{en,ar}/site.json` → `social.*` |
| Testimonials | Future `testimonials.items[]` in site.json |
| Partner logos | New `/partners` content when provided |
| Founding year | Replace "15+ years" with "since 20XX" if preferred |
| Pricing examples | If you want specific numbers on `/pricing` |

## 🛑 Gate 5 — Final sign-off

Post-deploy smoke test on production → you confirm → tag `v1.0.0`.
