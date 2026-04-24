import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, MessageCircle, Phone, CheckCircle, ShieldCheck, Clock } from 'lucide-react'
import { getDictionary, hasLocale } from '../../dictionaries'
import enSite from '../../../../content/en/site.json'
import arSite from '../../../../content/ar/site.json'

const BASE_URL = 'https://tabador-translation.com'

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

export async function generateStaticParams() {
  const slugs = [
    'personal-official','embassy-schengen','academic','contracts-business',
    'medical','legal-administrative','trademark','financial-commercial',
    'technical-engineering','website-localization','interpretation',
  ]
  return ['en', 'ar'].flatMap((lang) => slugs.map((slug) => ({ lang, slug })))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang)
  const svc = dict.services.categories[slug as keyof typeof dict.services.categories]
  if (!svc) return {}
  const isAr = lang === 'ar'
  return {
    title: `${svc.title} | ${isAr ? 'مؤسسة دار تبادر للترجمة' : 'Tabador Translation Est.'}`,
    description: svc.desc,
    alternates: {
      canonical: `${BASE_URL}/${lang}/services/${slug}`,
      languages: {
        en: `${BASE_URL}/en/services/${slug}`,
        ar: `${BASE_URL}/ar/services/${slug}`,
      },
    },
    openGraph: {
      title: svc.title,
      description: svc.desc,
      url: `${BASE_URL}/${lang}/services/${slug}`,
      type: 'article',
    },
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>
}) {
  const { lang, slug } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const site = lang === 'ar' ? arSite : enSite
  const isAr = lang === 'ar'

  const svc = dict.services.categories[slug as keyof typeof dict.services.categories]
  if (!svc) notFound()

  const waHref = `https://wa.me/${site.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(`${site.contact.whatsappMessage}${svc.title}`)}`

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: dict.nav.home, item: `${BASE_URL}/${lang}` },
      { '@type': 'ListItem', position: 2, name: dict.nav.services, item: `${BASE_URL}/${lang}/services` },
      { '@type': 'ListItem', position: 3, name: svc.title, item: `${BASE_URL}/${lang}/services/${slug}` },
    ],
  }

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: svc.title,
    name: svc.title,
    description: svc.desc,
    provider: { '@id': `${BASE_URL}/${lang}#business` },
    areaServed: { '@type': 'Country', name: 'Saudi Arabia' },
    url: `${BASE_URL}/${lang}/services/${slug}`,
    offers: { '@type': 'Offer', priceCurrency: 'SAR', availability: 'https://schema.org/InStock' },
  }

  return (
    <div className="py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="breadcrumb">
          <Link href={`/${lang}`} className="hover:text-foreground">{dict.nav.home}</Link>
          <ChevronRight size={12} className={isAr ? 'rotate-180' : ''} aria-hidden="true" />
          <Link href={`/${lang}/services`} className="hover:text-foreground">{dict.nav.services}</Link>
          <ChevronRight size={12} className={isAr ? 'rotate-180' : ''} aria-hidden="true" />
          <span className="text-foreground" aria-current="page">{svc.title}</span>
        </nav>

        {/* Header card */}
        <div className="rounded-2xl bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy text-white p-6 md:p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-[0.06] quill-watermark" />
          <div className="relative flex items-start gap-4">
            <span className="text-5xl shrink-0">{SERVICE_ICONS[slug] ?? '📄'}</span>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-2">{svc.title}</h1>
              <p className="text-white/85 leading-relaxed">{svc.desc}</p>
            </div>
          </div>
        </div>

        {/* Service bullets */}
        {'bullets' in svc && Array.isArray(svc.bullets) && svc.bullets.length > 0 && (
          <ul className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-2">
            {(svc.bullets as string[]).map((b: string) => (
              <li key={b} className="flex items-start gap-2 text-sm p-3 rounded-lg bg-card border border-border">
                <CheckCircle size={16} className="text-brand-gold shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}

        {/* Trust callouts */}
        <div className="grid sm:grid-cols-2 gap-3 mb-8">
          <div className="p-5 rounded-2xl bg-secondary/30 border border-border flex items-start gap-3">
            <ShieldCheck size={20} className="text-brand-gold shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-0.5">{dict.trust.certified}</p>
              <p className="text-sm text-muted-foreground">{dict.trust.firstTime}</p>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-secondary/30 border border-border flex items-start gap-3">
            <Clock size={20} className="text-brand-gold shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold mb-0.5">{dict.trust.fast}</p>
              <p className="text-sm text-muted-foreground">{dict.trust.fastDesc}</p>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#128C7E] text-white font-bold hover:bg-[#0a6855] transition-colors"
          >
            <MessageCircle size={20} />
            {dict.hero.cta}
          </a>
          <a
            href={`tel:${site.contact.phone}`}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-navy text-white font-bold hover:bg-brand-navy-light transition-colors"
          >
            <Phone size={18} />
            {dict.hero.callCta}
          </a>
          <Link
            href={`/${lang}/pricing`}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-border text-foreground font-semibold hover:bg-secondary transition-colors"
          >
            {dict.nav.pricing}
            <ChevronRight size={16} className={isAr ? 'rotate-180' : ''} />
          </Link>
        </div>
      </div>
    </div>
  )
}
