# SETUP_CHECKLIST.md — Before You Kick Off Claude Code

> Complete this checklist BEFORE running Claude Code. The quality of the final site is directly tied to the quality of what you put in this folder.

---

## 1. Folder structure to prepare

Inside the `Tabador-Translation.com` project folder, create these three files + one subfolder:

```
Tabador-Translation.com/
├── MISSION.md              ← provided (drop in)
├── CLAUDE.md               ← provided (drop in)
├── SETUP_CHECKLIST.md      ← this file (you can delete after reading)
└── source-materials/       ← create this folder and fill it (see below)
```

---

## 2. Fill `source-materials/` with everything the client has sent you

Inside `source-materials/`, create the following subfolders and drop in what you have. Missing items are fine — Claude will flag them as open questions, and you can answer later.

```
source-materials/
├── whatsapp/            ← WhatsApp screenshots (.jpg / .png), chat exports (.txt)
├── brand/               ← Logos, stamps, brand guidelines, color preferences
│   ├── logo-primary.(png|svg)
│   ├── logo-stamp.(png|svg)
│   └── colors.txt        ← if you have specific brand colors, list them
├── documents/           ← Company profile, CR (commercial registration), sample translations
├── photos/              ← Office photos, staff photos, certification photos
├── contacts/            ← Anything with NAP: phone / email / address / map pin
├── services/            ← Any description of services the client offers
├── projects/            ← Evidence of big past projects (can be screenshots)
├── partners/            ← Partner / client logos (only if you have permission to use)
└── notes/               ← Your own notes, client corrections, preferences
```

---

## 3. Minimum viable inputs (the agent will ask if missing)

Before Phase 1, the agent will expect at least these facts. If you don't have them yet, that's okay — they'll be added to `OPEN_QUESTIONS.md`:

- [ ] Legal trade name (EN + AR) — *already in MISSION.md*
- [ ] Primary phone number (with country code)
- [ ] WhatsApp number (same as phone or different?)
- [ ] Primary email address
- [ ] Backup email address (for form CC)
- [ ] Physical address (EN + AR)
- [ ] Working hours
- [ ] Google Maps pin / coordinates
- [ ] Social media handles / URLs:
  - [ ] TikTok
  - [ ] Instagram
  - [ ] LinkedIn
  - [ ] Facebook
- [ ] Primary logo file (SVG preferred, PNG acceptable)
- [ ] List of services (with Arabic names if you have them)
- [ ] At least 3 office/staff photos (real, not stock)

---

## 4. Accounts & credentials

The agent will need these at Phase 9 (deploy). Have them ready:

- [ ] GitHub account connected to Claude Code
- [ ] Vercel account (Pro plan)
- [ ] DNS access for `tabador-translation.com` (to point it at Vercel)
- [ ] A form-provider account: **Resend** (recommended) OR Web3Forms OR Formspree
  - If using Resend, create an API key and have it ready.

---

## 5. Decisions you can make now (to speed things up)

You don't have to decide these, but if you do, the agent moves faster:

- [ ] **Mode preference:** `review` (5 gates, slower, max control) or `autopilot` (3 gates, faster)?
- [ ] **Repo preference:** New GitHub repo called `Tabador-Translation.com`, or push to an existing repo? (URL if existing)
- [ ] **Numeral preference in Arabic site:** Western Arabic (0–9) or Eastern Arabic (٠–٩)?
- [ ] **Hero preference:** 5-banner carousel (as originally briefed) or a single strong hero + 5-reason strip (recommended for conversion)?

---

## 6. How to kick off

1. Drop `MISSION.md` + `CLAUDE.md` into the `Tabador-Translation.com` folder.
2. Fill `source-materials/` with everything you have from the client.
3. Open Claude Code in the folder.
4. Send exactly this message:

```
Read MISSION.md and begin Phase 0.
```

That's it. Claude Code will bootstrap the memory files, copy relevant skills into `SKILLS_SNAPSHOT/`, initialize git, and ask you the two Gate-0 questions (mode + repo).

---

## 7. During the build

- **Every response** from Claude Code ends with an updated `PROGRESS.md` + a "Next action" line. You'll always know where things stand.
- **If context runs out,** Claude will commit a handoff and tell you to start a new session. The next agent reads `CLAUDE.md` and resumes without you repeating anything.
- **At each 🛑 gate,** Claude stops and asks for your input. You can approve, correct, or provide missing info.

---

## 8. After launch

`EDITING_GUIDE.md` will be written by the agent at Phase 8. That file tells you — in plain language — how to edit the site later (change a phone, add a service, swap a photo) without touching code or breaking anything.
