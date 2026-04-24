import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle, ChevronRight, MessageCircle, Phone, Building2, FileCheck, Clock, ShieldCheck } from 'lucide-react'
import { getDictionary, hasLocale } from '../../dictionaries'
import enSite from '../../../../content/en/site.json'
import arSite from '../../../../content/ar/site.json'

const BASE_URL = 'https://tabador-translation.com'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const isAr = lang === 'ar'
  return {
    title: isAr ? 'ترجمة وثائق الشنغن | مؤسسة دار تبادر للترجمة' : 'Schengen Visa Translation | Tabador Translation Est.',
    description: isAr
      ? 'ترجمة معتمدة لجميع وثائق ملف تأشيرة الشنغن في الدمام: كشوف بنكية، عقود زواج، شهادات راتب، سجل تجاري — معتمدة لدى جميع قنصليات الشنغن.'
      : 'Certified translation for every Schengen visa document in Dammam: bank statements, marriage certificates, salary letters, commercial register — accepted by all Schengen consulates.',
    alternates: {
      canonical: `${BASE_URL}/${lang}/embassies/schengen`,
      languages: {
        en: `${BASE_URL}/en/embassies/schengen`,
        ar: `${BASE_URL}/ar/embassies/schengen`,
      },
    },
  }
}

const PROCESS_ICONS = [FileCheck, ShieldCheck, Clock, Building2]

export default async function SchengenPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const site = lang === 'ar' ? arSite : enSite
  const isAr = lang === 'ar'
  const s = dict.schengen

  const waHref = `https://wa.me/${site.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent((isAr ? 'ملف شنغن: ' : 'Schengen file: ') + site.contact.whatsappMessage)}`

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: dict.nav.home, item: `${BASE_URL}/${lang}` },
      { '@type': 'ListItem', position: 2, name: dict.nav.services, item: `${BASE_URL}/${lang}/services` },
      { '@type': 'ListItem', position: 3, name: s.title, item: `${BASE_URL}/${lang}/embassies/schengen` },
    ],
  }

  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: s.title,
    name: s.title,
    description: s.subtitle,
    provider: { '@id': `${BASE_URL}/${lang}#business` },
    areaServed: { '@type': 'Country', name: 'Saudi Arabia' },
    url: `${BASE_URL}/${lang}/embassies/schengen`,
  }

  return (
    <div className="py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="breadcrumb">
          <Link href={`/${lang}`} className="hover:text-foreground">{dict.nav.home}</Link>
          <ChevronRight size={12} className={isAr ? 'rotate-180' : ''} aria-hidden="true" />
          <Link href={`/${lang}/services`} className="hover:text-foreground">{dict.nav.services}</Link>
          <ChevronRight size={12} className={isAr ? 'rotate-180' : ''} aria-hidden="true" />
          <span className="text-foreground" aria-current="page">{s.title}</span>
        </nav>

        {/* Header */}
        <div className="rounded-2xl bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy text-white p-6 md:p-10 mb-10 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-[0.06] quill-watermark" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/20 border border-brand-gold/30 text-brand-gold text-xs font-bold uppercase tracking-wider mb-4">
              🛂 Schengen
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold mb-3">{s.title}</h1>
            <p className="text-xl text-white/85 mb-6">{s.subtitle}</p>
            <p className="text-base text-white/75 leading-relaxed max-w-3xl">{s.intro}</p>
          </div>
        </div>

        {/* Checklist */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-2">{s.checklistTitle}</h2>
          <p className="text-sm text-muted-foreground mb-5">{s.checklistNote}</p>
          <ul className="grid sm:grid-cols-2 gap-2">
            {s.checklistItems.map((it: string) => (
              <li key={it} className="flex items-start gap-2 p-3 rounded-lg bg-card border border-border">
                <CheckCircle size={16} className="text-brand-gold shrink-0 mt-0.5" />
                <span className="text-sm">{it}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Consulates */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-5">{s.consulatesTitle}</h2>
          <div className="flex flex-wrap gap-2">
            {s.consulates.map((c: string) => (
              <span key={c} className="px-4 py-2 rounded-full border border-border bg-card text-sm">
                {c}
              </span>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{s.processTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {s.processItems.map((step: { title: string; desc: string }, i: number) => {
              const Icon = PROCESS_ICONS[i] ?? FileCheck
              return (
                <div key={step.title} className="p-5 rounded-2xl border border-border bg-card hover:border-brand-gold/40 hover:shadow-md transition-all">
                  <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-3">
                    <Icon size={20} className="text-brand-gold" />
                  </div>
                  <h3 className="font-bold text-sm mb-1">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Guarantee */}
        <section className="mb-12">
          <div className="rounded-2xl border border-brand-gold/30 bg-brand-gold/5 p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-5 text-brand-navy dark:text-brand-gold">{s.guaranteeTitle}</h2>
            <ul className="space-y-3">
              {s.guaranteeItems.map((it: string) => (
                <li key={it} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-brand-gold shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base">{it}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-12 rounded-2xl bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy text-white">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">{s.ctaTitle}</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto px-4">{s.ctaBody}</p>
          <div className="flex flex-wrap gap-3 justify-center px-4">
            <a href={waHref} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#128C7E] text-white font-bold hover:bg-[#0a6855] transition">
              <MessageCircle size={18} /> {dict.hero.whatsappCta}
            </a>
            <a href={`tel:${site.contact.phone}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-brand-navy font-bold hover:brightness-95 transition">
              <Phone size={18} /> {dict.hero.callCta}
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
