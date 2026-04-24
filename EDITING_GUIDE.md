# EDITING_GUIDE.md — Non-Developer Editing Guide

> For: Tabador Translation Est.
> Last updated: April 2026

This guide explains how to make common edits to the website without touching the code directly. All changes require a git commit + Vercel redeploys automatically.

---

## How to change phone / WhatsApp number

**Files:** `app/content/en/site.json` and `app/content/ar/site.json`

```json
"phone": "+966538992076",
"phoneDisplay": "+966 53 899 2076",
"whatsapp": "+966538992076"
```
`phone` = raw digits only. `phoneDisplay` = formatted version shown on site.

---

## How to change the email address

Same files — `app/content/en/site.json` / `app/content/ar/site.json`:
```json
"email": "newtabador@gmail.com"
```
Also update Vercel environment variables: `CONTACT_EMAIL_PRIMARY` and `CONTACT_EMAIL_BACKUP`.

---

## How to update working hours

`app/content/en/site.json` → `contact.hours.days` and `contact.hours.time`
`app/content/ar/site.json` → same fields in Arabic

---

## How to add a social media link

In both site.json files, update the `social` object. Leave unused platforms as `""`:
```json
"social": {
  "tiktok": "https://tiktok.com/@handle",
  "instagram": "https://instagram.com/handle",
  "linkedin": "",
  "facebook": ""
}
```

---

## How to swap a photo

Replace the file in `app/public/images/`:
- `hero.jpg` — hero background (1920×1080 recommended)
- `office.jpg` — office photo (1280×720 recommended)
- `logo.jpeg` — logo (square, 200×200 minimum)

No code change needed after replacing.

---

## How to add / edit a service

1. Add to `app/dictionaries/en.json` and `app/dictionaries/ar.json` under `services.categories`:
```json
"new-slug": { "title": "Service Name", "desc": "Short description." }
```
2. Add `'new-slug'` to the slugs array in `app/app/[lang]/services/[slug]/page.tsx` → `generateStaticParams`.

---

## How to set up email (Resend API)

1. Sign up at resend.com → create an API key
2. In Vercel → Project → Environment Variables:
   - `RESEND_API_KEY` = your key
   - `CONTACT_EMAIL_PRIMARY` = newtabador@gmail.com
   - `CONTACT_EMAIL_BACKUP` = mudtheronly1976@gmail.com

Without the API key, form submissions fall back to a mailto link — no leads are lost.

---

## How to update the Google Maps link

Both site.json files → `contact.mapsUrl`. Replace with any Google Maps URL.

---

## Deployment

Every push to GitHub triggers an automatic Vercel rebuild (~1 min). To push:
```bash
cd D:/Tabador-Translation.com
git add -A
git commit -m "content: describe your change"
git push
```
