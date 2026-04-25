import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle, Zap, Shield, MapPin, ChevronRight } from 'lucide-react'
import { getDictionary, hasLocale } from './dictionaries'
import enSite from '../../content/en/site.json'
import arSite from '../../content/ar/site.json'
import { QuickQuoteForm } from '@/components/sections/QuickQuoteForm'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { FAQSection } from '@/components/sections/FAQSection'
import { StatsCounter } from '@/components/sections/StatsCounter'
import { TrustBadges } from '@/components/sections/TrustBadges'
import { SectorsServed } from '@/components/sections/SectorsServed'
import { Partners } from '@/components/sections/Partners'
import { HeroCarousel } from '@/components/sections/HeroCarousel'

const BASE_URL = 'https://tabador-translation.com'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const site = lang === 'ar' ? arSite : enSite
  return {
    title: lang === 'ar'
      ? 'مؤسسة دار تبادر للترجمة | ترجمة معتمدة الدمام'
      : 'Tabador Translation Est. | Certified Translation Dammam',
    description: site.brand.description,
  }
}

const SERVICE_ICONS: Record<string, string> = {
  'personal-official': '🪪',
  'embassy-schengen': '🛂',
  'academic': '🎓',
  'contracts-business': '📋',
  'medical': '🏥',
  'legal-administrative': '⚖️',
  'trademark': '™️',
  'financial-commercial': '💼',
  'technical-engineering': '⚙️',
  'website-localization': '🌐',
  'interpretation': '🗣️',
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)
  const site = lang === 'ar' ? arSite : enSite
  const isAr = lang === 'ar'

  const serviceEntries = Object.entries(dict.services.categories) as [string, { title: string; desc: string }][]

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: dict.faq.items.map((it: { q: string; a: string }) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  }

  const waHref = `https://wa.me/${site.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(site.contact.whatsappMessage)}`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── HERO (auto-rotating image carousel — Saudi guy first) ── */}
      <HeroCarousel
        lang={lang}
        badge={dict.hero.badge}
        slides={[
          { ...dict.hero.slides[0], image: '/images/ads/Ad-1.jpeg' },
          { ...dict.hero.slides[1], image: '/images/ads/Ad-3.jpeg' },
          { ...dict.hero.slides[2], image: '/images/ads/Ad-4.jpeg' },
          { ...dict.hero.slides[3], image: '/images/ads/Ad-2.jpeg' },
        ]}
        cta={dict.hero.cta}
        ctaSecondary={dict.hero.ctaSecondary}
        ctaSecondaryHref={`/${lang}/services`}
        callCta={dict.hero.callCta}
        whatsappHref={waHref}
        callHref={`tel:${site.contact.phone}`}
        trust={{ firstTime: dict.trust.firstTime, fast: dict.trust.fast, certified: dict.trust.certified }}
      />

      {/* ── ANIMATED STATS ─────────────────────────────── */}
      <section className="bg-brand-navy py-10">
        <div className="container mx-auto px-4 md:px-6">
          <StatsCounter stats={site.stats} />
        </div>
      </section>

      {/* ── TRUST BADGES (authorities accepted) ─────────── */}
      <TrustBadges title={dict.trustBadges.title} items={dict.trustBadges.items} />

      {/* ── WHY TABADOR – 5-REASON STRIP ────────────────────── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-foreground">
            {dict.trust.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { icon: <CheckCircle className="text-brand-gold" size={28} />, title: dict.trust.firstTime, desc: dict.trust.firstTimeDesc },
              { icon: <Zap className="text-brand-gold" size={28} />, title: dict.trust.fast, desc: dict.trust.fastDesc },
              { icon: <Shield className="text-brand-gold" size={28} />, title: dict.trust.certified, desc: dict.trust.certifiedDesc },
              { icon: <span className="text-2xl">🌐</span>, title: dict.trust.allLanguages, desc: dict.trust.allLanguagesDesc },
              { icon: <MapPin className="text-brand-gold" size={28} />, title: dict.trust.location, desc: dict.trust.locationDesc },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center text-center p-5 rounded-xl border border-border bg-card hover:border-brand-gold/40 shadow-card hover:shadow-card-hover transition-all">
                <div className="mb-3">{item.icon}</div>
                <h3 className="font-semibold text-sm mb-1 text-foreground">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <ProcessSection
        title={dict.process.title}
        subtitle={dict.process.subtitle}
        steps={dict.process.steps}
      />

      {/* ── QUICK-QUOTE FORM ─────────────────────────────────── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{dict.quote.title}</h2>
            <p className="text-muted-foreground">{dict.quote.subtitle}</p>
          </div>
          <QuickQuoteForm lang={lang} dict={dict} site={site} />
        </div>
      </section>

      {/* ── SERVICES GRID ────────────────────────────────────── */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">{dict.services.title}</h2>
            <p className="text-muted-foreground">{dict.services.subtitle}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {serviceEntries.map(([slug, svc]) => (
              <Link
                key={slug}
                href={`/${lang}/services/${slug}`}
                className="group flex flex-col gap-3 p-5 rounded-xl border border-border hover:border-brand-gold/40 shadow-card hover:shadow-card-hover bg-card transition-all duration-200"
              >
                <span className="text-3xl" aria-hidden="true">{SERVICE_ICONS[slug] ?? '📄'}</span>
                <h3 className="font-semibold text-foreground group-hover:text-brand-navy dark:group-hover:text-brand-gold transition-colors">
                  {svc.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1">{svc.desc}</p>
                <span className="text-xs font-medium text-brand-gold flex items-center gap-1">
                  {dict.services.learnMore}
                  <ChevronRight size={12} className={isAr ? 'rotate-180' : ''} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTORS WE SERVE (rich grid, each card deep-links) ── */}
      <SectorsServed
        lang={lang}
        title={dict.sectorsServed.title}
        subtitle={dict.sectorsServed.subtitle}
        items={dict.sectorsServed.items}
      />

      {/* ── PARTNERS (renders only when site.partners is populated) ── */}
      <Partners
        title={dict.partners.title}
        subtitle={dict.partners.subtitle}
        emptyNote={dict.partners.emptyNote}
        partners={site.partners}
      />

      {/* ── OFFICE PHOTO + LOCATION CTA ─────────────────────── */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-xl aspect-video relative">
              <Image
                src="/images/office.jpg"
                alt={`${site.brand.name} · ${site.contact.city}`}
                fill
                className="object-cover"
                sizes="(max-width:768px) 100vw, 50vw"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold">{dict.about.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{dict.about.body}</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-foreground/80">
                  <CheckCircle size={16} className="text-brand-gold shrink-0" />
                  {dict.about.licence}
                </li>
                <li className="flex items-center gap-2 text-foreground/80">
                  <CheckCircle size={16} className="text-brand-gold shrink-0" />
                  {dict.about.cr}
                </li>
                <li className="flex items-center gap-2 text-foreground/80">
                  <MapPin size={16} className="text-brand-gold shrink-0" />
                  <a href={site.contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold transition-colors">
                    {dict.about.location}
                  </a>
                </li>
              </ul>
              <Link
                href={`/${lang}/about`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand-navy text-white font-semibold hover:bg-brand-navy-light transition-colors"
              >
                {dict.nav.about}
                <ChevronRight size={16} className={isAr ? 'rotate-180' : ''} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <FAQSection
        title={dict.faq.title}
        subtitle={dict.faq.subtitle}
        items={dict.faq.items}
      />

      {/* ── FINAL CTA BAND ──────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] quill-watermark" />
        <div className="container mx-auto px-4 md:px-6 max-w-2xl space-y-5 relative">
          <h2 className="text-2xl md:text-3xl font-extrabold">{site.brand.tagline}</h2>
          <p className="text-white/75">{site.brand.taglineSub}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#0a6855] text-white font-bold text-base hover:bg-[#075144] transition-colors shadow-xl"
            >
              {dict.hero.cta}
            </a>
            <a
              href={`tel:${site.contact.phone}`}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-brand-navy font-bold text-base hover:bg-white/90 transition-colors shadow-xl"
            >
              {dict.hero.callCta}
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
