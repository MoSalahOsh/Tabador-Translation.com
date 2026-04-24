import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, MessageCircle, Phone } from 'lucide-react'
import { getDictionary, hasLocale } from '../dictionaries'
import enSite from '../../../content/en/site.json'
import arSite from '../../../content/ar/site.json'

const BASE_URL = 'https://tabador-translation.com'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const isAr = lang === 'ar'
  return {
    title: isAr ? 'الأسئلة الشائعة | مؤسسة دار تبادر للترجمة' : 'FAQ | Tabador Translation Est.',
    description: isAr
      ? 'إجابات شاملة عن الترجمة المعتمدة في الدمام والمملكة العربية السعودية: السعر، التسليم، السرية، السفارات، والشنغن.'
      : 'Comprehensive answers about certified translation in Dammam and Saudi Arabia: pricing, turnaround, confidentiality, embassies, and Schengen.',
    alternates: {
      canonical: `${BASE_URL}/${lang}/faq`,
      languages: { en: `${BASE_URL}/en/faq`, ar: `${BASE_URL}/ar/faq` },
    },
  }
}

type QA = { q: string; a: string }
type Group = { title: string; items: QA[] }

export default async function FaqPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const site = lang === 'ar' ? arSite : enSite
  const isAr = lang === 'ar'
  const f = dict.faqPage

  const allItems: QA[] = (f.groups as Group[]).flatMap((g) => g.items)
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allItems.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: dict.nav.home, item: `${BASE_URL}/${lang}` },
      { '@type': 'ListItem', position: 2, name: f.title, item: `${BASE_URL}/${lang}/faq` },
    ],
  }

  const waHref = `https://wa.me/${site.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(site.contact.whatsappMessage)}`

  return (
    <div className="py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="breadcrumb">
          <Link href={`/${lang}`} className="hover:text-foreground">{dict.nav.home}</Link>
          <ChevronRight size={12} className={isAr ? 'rotate-180' : ''} aria-hidden="true" />
          <span className="text-foreground" aria-current="page">{f.title}</span>
        </nav>

        <h1 className="text-3xl md:text-5xl font-extrabold mb-3">{f.title}</h1>
        <p className="text-xl text-muted-foreground mb-12">{f.subtitle}</p>

        <div className="space-y-12">
          {(f.groups as Group[]).map((group) => (
            <section key={group.title}>
              <h2 className="text-2xl font-bold mb-5 pb-2 border-b border-border">
                {group.title}
              </h2>
              <div className="space-y-4">
                {group.items.map((item, i) => (
                  <details
                    key={i}
                    className="group rounded-xl border border-border bg-card open:border-brand-gold/40 open:shadow-md transition-all"
                    open={i === 0}
                  >
                    <summary className="flex items-start justify-between gap-4 cursor-pointer list-none p-5 font-semibold text-foreground">
                      <span className="flex-1">{item.q}</span>
                      <span className="shrink-0 w-7 h-7 rounded-full bg-brand-navy/10 dark:bg-brand-gold/15 text-brand-navy dark:text-brand-gold flex items-center justify-center text-lg leading-none transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <div className="px-5 pb-5 -mt-1 text-sm md:text-base text-muted-foreground leading-relaxed">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Still have a question CTA */}
        <section className="mt-16 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy text-white text-center">
          <h2 className="text-2xl font-extrabold mb-2">{f.stillTitle}</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">{f.stillBody}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0a6855] text-white font-bold hover:bg-[#075144] transition"
            >
              <MessageCircle size={18} />
              {dict.hero.whatsappCta}
            </a>
            <a
              href={`tel:${site.contact.phone}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-brand-navy font-bold hover:brightness-95 transition"
            >
              <Phone size={18} />
              {dict.hero.callCta}
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
