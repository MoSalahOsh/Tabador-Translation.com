import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CheckCircle, FileText, Languages, Zap, Package, ChevronRight } from 'lucide-react'
import { getDictionary, hasLocale } from '../dictionaries'
import enSite from '../../../content/en/site.json'
import arSite from '../../../content/ar/site.json'

const BASE_URL = 'https://tabador-translation.com'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const isAr = lang === 'ar'
  return {
    title: isAr ? 'التسعير | مؤسسة دار تبادر للترجمة' : 'Pricing | Tabador Translation Est.',
    description: isAr
      ? 'تسعير شفاف للترجمة المعتمدة في الدمام: سعر ثابت، بدون رسوم خفية، عرض سعر مجاني خلال دقائق.'
      : 'Transparent certified translation pricing in Dammam: fixed quote, no hidden fees, free price in minutes.',
    alternates: {
      canonical: `${BASE_URL}/${lang}/pricing`,
      languages: { en: `${BASE_URL}/en/pricing`, ar: `${BASE_URL}/ar/pricing` },
    },
  }
}

const HOW_ICONS = [FileText, Languages, Zap, Package]

export default async function PricingPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const site = lang === 'ar' ? arSite : enSite
  const isAr = lang === 'ar'
  const p = dict.pricing

  const waHref = `https://wa.me/${site.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(site.contact.whatsappMessage)}`

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3">{p.title}</h1>
          <p className="text-xl text-muted-foreground">{p.subtitle}</p>
        </div>

        <p className="text-lg leading-relaxed text-foreground/85 mb-12 text-center max-w-3xl mx-auto">{p.intro}</p>

        {/* How pricing works */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6">{p.howTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {p.howItems.map((item: { title: string; desc: string }, i: number) => {
              const Icon = HOW_ICONS[i] ?? FileText
              return (
                <div key={item.title} className="p-5 rounded-2xl border border-border bg-card hover:border-brand-gold/40 hover:shadow-md transition-all">
                  <Icon size={22} className="text-brand-gold mb-3" />
                  <h3 className="font-bold mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </section>

        {/* Pricing guarantee */}
        <section className="mb-14">
          <div className="rounded-2xl border border-brand-gold/30 bg-brand-gold/5 p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-5 text-brand-navy dark:text-brand-gold">{p.guaranteeTitle}</h2>
            <ul className="space-y-3">
              {p.guaranteeItems.map((it: string) => (
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
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">{p.ctaTitle}</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto px-4">{p.ctaBody}</p>
          <div className="flex flex-wrap gap-3 justify-center px-4">
            <Link
              href={`/${lang}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-gold text-white font-bold hover:brightness-110 transition"
            >
              {p.ctaButton}
              <ChevronRight size={16} className={isAr ? 'rotate-180' : ''} />
            </Link>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#128C7E] text-white font-bold hover:bg-[#0a6855] transition"
            >
              {dict.hero.whatsappCta}
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
