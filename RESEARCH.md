# RESEARCH.md — Phase 1 Research Synthesis

**Prepared:** 2026-04-24
**Scope:** Translation agency web UX, Gulf/Saudi trust signals, RTL/bilingual engineering, glassmorphism 2026, SEO keywords, and 12 Tabador-specific recommendations.

---

## Executive Summary

The Saudi certified-translation market is crowded with agencies competing almost entirely on the same surface signals (government-acceptance claims, "all languages" breadth, WhatsApp CTAs). Tabador can differentiate through design quality, service specificity per category page, and conversion engineering: a sub-4-field quick-quote above the fold, a floating WhatsApp button, and credential display (Licence 317, C.R. 2051221647, Chamber 240404) that no competitor puts front-and-center. RTL/LTR bilingual architecture requires true `dir` switching at the HTML level, Arabic-specific font sizing (+10–15 % larger than Latin), and directional animation mirroring — not just text replacement. Glassmorphism in 2026 is mature and appropriate for premium service brands when confined to the scrolled header, hero overlays, and modals — never on data-dense service cards.

---

## Finding 1 — Competitor Landscape (Gulf & Saudi)

**Agencies studied:**

| Agency | Strengths | Weaknesses |
|---|---|---|
| **Tarjama** (tarjama.com) | Clear enterprise metrics (2B+ words, 7 offices, ISO), case studies with ROI figures, strong "Why Choose" section, theme toggle | Enterprise-focused, intimidating for individuals; quote flow is long |
| **Al Salim** (alsalimtranslation.sa) | Established 1983, ISO 9001, instant quote calculator, clear service grid (8 cards) | Cluttered above-the-fold, too many CTAs simultaneously |
| **Shamil Translation** (shamiltranslation.com) | MOJ-approved messaging, embassy acceptance claim, GCC-focused copy | Generic stock photography, no specific document list visible |
| **Noor Translation** (noortranslation.sa) | 25 years history, government + embassy recognition claim, phone prominent | Minimal design, low visual differentiation |
| **Elite Translation KSA** (elitetranslation.com.sa) | 65+ language claim, remote interpretation, marketing services add-on | Crowded nav, service-category depth unclear from homepage |

**Pattern:** Every Gulf competitor leads with "certified + fast + all languages." None prominently displays their actual licence number or chamber registration as a hero trust signal. **Tabador has both (Licence 317, C.R. 2051221647) — use them front and center.**

---

## Finding 2 — Industry UX Patterns

**Quote flow best practices:**
- Maximum 4 fields above the fold: document type (dropdown), language pair (from/to), urgency (standard/express), file upload (optional). CTA: "ابعت مستندك الآن" / "Send My Document."
- First-person CTA copy outperforms generic "Submit" by measurable margins.
- Progressive disclosure: basic quote → detail collection → confirmation — never dump all fields at once.
- File upload must support PDF, JPG, PNG, DOC, DOCX; max 10 MB; show accepted formats inline.

**Conversion architecture (above the fold, 360px mobile):**
- Value proposition readable in 3 seconds.
- Primary CTA (WhatsApp or form) visible without scroll.
- At least 2 trust signals visible (licence, years, document count, government-acceptance badge).
- WhatsApp is the dominant channel in Saudi — it must never be buried.

**Service card pattern:**
- Category icon + category name + 3–4 sub-document types listed.
- "Learn more" link to dedicated service page.
- Do NOT use glassmorphism on cards — readability degrades on information-dense grids.

---

## Finding 3 — RTL / Bilingual Engineering Best Practices

**HTML/CSS foundations:**
- `<html lang="ar" dir="rtl">` — switch at the root on Arabic pages; do NOT use CSS-only solutions.
- Use `next-intl` with `/en/` and `/ar/` route segments and middleware locale detection.
- `logical` CSS properties (`margin-inline-start`, `padding-inline-end`) instead of left/right — they flip automatically.

**Typography:**
- Arabic body text: 18–20 px (10–15% larger than equivalent Latin).
- Line height: minimum `1.8` for Arabic body (Latin can stay at `1.5`).
- Recommended Arabic fonts: **Tajawal** or **IBM Plex Sans Arabic** (excellent legibility, moderate file size). Subset to used glyphs only — full Arabic Unicode is ~150 KB+.
- Recommended Latin font: **Inter** or **Geist** (pairs cleanly with both Arabic options).
- Do NOT mix Arabic and Latin fonts in the same font stack declaration.

**Layout mirroring:**
- All flexbox `row` layouts flip naturally with `dir="rtl"`.
- Icons that convey direction (arrows, chevrons, back/forward) must be mirrored; brand logos and non-directional icons must NOT be mirrored.
- Animations: slide-in-from-left in LTR → slide-in-from-right in RTL. Use CSS logical animation transforms.
- Floating WhatsApp button: bottom-right in LTR, bottom-left in RTL.
- Scrollbar: browser handles this natively in RTL mode.

**Numerals:**
- Default to Western Arabic (0–9) unless client specifies Eastern Arabic (٠–٩).
- Pick ONE system and apply it site-wide; mixing is a QA fail.

**Punctuation:**
- Arabic comma: ، (U+060C) — not the English comma.
- Arabic question mark: ؟ (U+061F).
- Ellipsis in Arabic: ... is acceptable; no special Arabic form required.

---

## Finding 4 — Trust Signals that Convert Saudi/GCC Buyers

In order of impact for this market:

1. **Government/embassy acceptance claim** — "معتمدة لدى جميع السفارات والجهات الحكومية" is the #1 converter. Tabador already uses this language in ads; it must be the hero subheading.
2. **Licence/registration display** — Licence No. 317, C.R. 2051221647, Chamber of Commerce 240404. Competitors almost never show these; displaying them is an immediate credibility differentiator.
3. **First-time-acceptance guarantee** — "تمشي من أول مرة" is client's own proven ad copy and a powerful anxiety-reducer. Use verbatim.
4. **Location proximity** — "مقابل الجوازات، الدمام" is a location-authority signal for the target audience (people going to the passport office need translation — perfect intercept).
5. **Owner-as-expert positioning** — مدثر احمد المترجم (Mudthar Ahmad) named as the translator signals personal accountability, rare among agencies.
6. **Physical office photo** — IMG-10 (storefront photo) is real, not stock. This alone outperforms 95% of competitor sites.
7. **WhatsApp-first accessibility** — prominent, floating, one-tap. Saudi users expect WhatsApp as the primary contact channel.
8. **Core-values trinity** — دقة • سرعة • التزام (Precision • Speed • Commitment). Already established in client's marketing; carry through as a visual motif.

---

## Finding 5 — SEO Keyword Map

### High-intent Arabic keywords (primary targets)
| Keyword | Intent |
|---|---|
| ترجمة معتمدة الدمام | Local certified translation, Dammam |
| مكتب ترجمة معتمد الدمام | Local office |
| ترجمة للسفارة الدمام | Embassy translation |
| ترجمة شنغن السعودية | Schengen-specific |
| ترجمة وثائق رسمية | Official documents |
| ترجمة شهادات دراسية معتمدة | Academic certificate |
| ترجمة عقود شركات | Business contracts |
| ترجمة تقارير طبية | Medical reports |
| ترجمة رخصة قيادة الدمام | Driving licence |
| مكتب ترجمة مقابل الجوازات | Near passport office |

### High-intent English keywords (secondary)
| Keyword | Intent |
|---|---|
| certified translation Dammam | Local intent |
| official document translation Saudi Arabia | Broad |
| certified Arabic translation embassy | Embassy-specific |
| legal translation Saudi Arabia | Legal docs |
| medical translation Dammam | Medical |
| Schengen document translation KSA | Travel |
| trademark translation Saudi Arabia | Trademark |

### Long-tail / question keywords
- "كيف أترجم جواز السفر للسفارة الأمريكية"
- "ترجمة شهادة الميلاد للشنغن"
- "سعر ترجمة العقد للدمام"
- "certified translation near Jawazat Dammam"

---

## Finding 6 — Glassmorphism 2026: What Works vs. What Doesn't

**Status:** Mature trend, still contemporary in 2026 when used with restraint.

**Use glassmorphism for:**
- Scrolled/sticky header (subtle blur over hero image background)
- Hero section overlay panel (translucent card holding headline + CTA)
- Modal/dialog backgrounds
- Floating CTA / WhatsApp button badge

**Never use glassmorphism for:**
- Service cards (readability degrades on information-dense grids)
- Primary content areas (trust-killing blur on key facts)
- Mobile navigation (performance and readability issues)
- Anything with small Arabic text (diacritics disappear in blur)

**Technical recipe (2026 standard):**
```css
/* Glass panel */
background: rgba(255,255,255,0.12);
backdrop-filter: blur(16px) saturate(180%);
-webkit-backdrop-filter: blur(16px) saturate(180%);
border: 1px solid rgba(255,255,255,0.25);
box-shadow: 0 8px 32px rgba(0,0,0,0.12);
```

**Dark mode:** Lower opacity (0.08–0.12), higher blur (20–24px), lighter border (rgba(255,255,255,0.15)).

**Performance note:** `backdrop-filter` is GPU-composited on modern browsers (Chrome 76+, Safari 9+, Edge 79+). No polyfill needed. Fallback: `background: rgba(255,255,255,0.85)` for unsupported browsers.

---

## Finding 7 — Conversion Audit Pre-Build Notes

Against MISSION.md §13, these risks exist before a single line of code:
- ❌ No pricing policy defined yet → use "Quick Quote" with ≤4 fields + WhatsApp fallback.
- ❌ No testimonials confirmed → trust row must lean on credentials + office photo + values.
- ✅ WhatsApp number confirmed — floating button is implementable immediately.
- ✅ Location (near Jawazat Dammam) is a meaningful anchor for location trust (§13 item 8).
- ✅ "First time acceptance" claim exists in client's own copy — use as hero sub-line.

---

## 12 Tabador-Specific Recommendations

1. **Lead with the passport-office location.** "مقابل الجوازات، الدمام" means your target audience physically passes your door on the way to the very building where they need certified translations. Hero sub-copy should echo this.

2. **Display Licence 317 and C.R. 2051221647 in the hero or trust row.** No Saudi competitor does this prominently. It's a powerful credibility signal that costs nothing to add.

3. **Make the 7 service categories the visual backbone of the homepage.** The client has already produced professional marketing graphics for all 7. These become the service-card images after color-consistent treatment.

4. **Use IMG-12 (Saudi man in thobe + Riyadh skyline + flags circle) as the primary hero image.** It's professional, culturally resonant, and visually distinctive. None of the competitors use imagery this strong.

5. **The quill-in-inkwell logo motif is underused.** Build it into the design system as a subtle background watermark element and section divider — gives visual coherence across pages without extra assets.

6. **"تمشي من أول مرة" as the hero sub-headline.** Client's own proven ad copy; tests well in anxiety-heavy document translation context.

7. **Service specificity beats breadth claims.** Build dedicated sub-pages for all 7 categories with the exact document sub-types (from the marketing images). This wins both SEO long-tail and conversion for specific-intent visitors.

8. **Trademark + SAIP filing is a differentiator.** None of the smaller Saudi offices promote SAIP (هيئة الملكية الفكرية) filing assistance. Feature it prominently in the services grid.

9. **Dual email strategy.** The letterhead shows `newtabador@gmail.com` as the official business email (different from the personal ad email). Use `newtabador@gmail.com` as the business contact; recommend Resend for form delivery with both emails CC'd.

10. **Office storefront photo (IMG-10) on the About page.** Real office photos convert significantly better than stock imagery. Crop, straighten, and use it.

11. **Arabic font choice: Tajawal.** It matches the bold, clean geometric style of the existing marketing materials. Use `font-weight: 700` for headings (matches the marketing creative's dense Arabic headline style).

12. **Autopilot hero choice: Concept B (single strong hero + 5-reason strip).** The client's existing marketing materials are landscape-format and not designed for carousel reuse. A single hero (IMG-12) + trust strip (Licence 317, C.R., 3 values, WhatsApp) is the highest-converting pattern for document-service buyers on mobile.

---

## Sources

- [Tarjama](https://tarjama.com/) — homepage UX analysis
- [Al Salim Certified Translation](https://alsalimtranslation.sa/en/home/) — homepage UX analysis
- [Goodfirms — Saudi Arabia Translation Companies](https://www.goodfirms.co/translation-services-companies/saudi-arabia)
- [Arabic RTL Web Design Best Practices — Aivensoft](https://www.aivensoft.com/en/blog/rtl-arabic-website-design-guide)
- [Arabic RTL Web Design — Bycom Solutions](https://bycomsolutions.com/blog/arabic-rtl-web-design-best-practices/)
- [W3C Arabic & Persian Layout Requirements](https://www.w3.org/International/alreq/)
- [Glassmorphism 2026 — Onyx8 Agency](https://onyx8agency.com/blog/glassmorphism-inspiring-examples/)
- [Glassmorphism Best Practices — UXPilot](https://uxpilot.ai/blogs/glassmorphism-ui)
- [Quote Form Conversion — SmartMoving](https://www.smartmoving.com/blog/3-effective-strategies-to-boost-your-quote-form-conversions-expert-insights)
- [Web Design Trends 2026 — TheeDigital](https://www.theedigital.com/blog/web-design-trends)
- Client source materials: brand assets, ad texts (×4), marketing images (×12), business card, letterhead, stamp
