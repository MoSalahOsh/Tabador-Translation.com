import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CheckCircle, Clock, Send, Upload, MessageSquareText, PackageCheck } from 'lucide-react'
import { getDictionary, hasLocale } from '../dictionaries'
import enSite from '../../../content/en/site.json'
import arSite from '../../../content/ar/site.json'

const BASE_URL = 'https://tabador-translation.com'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const isAr = lang === 'ar'
  return {
    title: isAr ? 'ترجمة عاجلة نفس اليوم | مؤسسة دار تبادر' : 'Express / Same-Day Translation | Tabador Translation Est.',
    description: isAr
      ? 'خدمة ترجمة معتمدة عاجلة نفس اليوم في الدمام — للسفارات والمحاكم والمستشفيات والمواعيد الحرجة.'
      : 'Same-day certified translation in Dammam — for embassy, court, hospital, and deadline-critical filings.',
    alternates: {
      canonical: `${BASE_URL}/${lang}/urgent`,
      languages: { en: `${BASE_URL}/en/urgent`, ar: `${BASE_URL}/ar/urgent` },
    },
  }
}

const HOW_ICONS = [Upload, MessageSquareText, Clock, PackageCheck]

export default async function UrgentPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const site = lang === 'ar' ? arSite : enSite
  const u = dict.urgent

  const waHref = `https://wa.me/${site.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent((lang === 'ar' ? 'عاجل: ' : 'URGENT: ') + site.contact.whatsappMessage)}`

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-bold uppercase tracking-wider mb-4">
          <Clock size={14} /> {lang === 'ar' ? 'عاجل' : 'Urgent'}
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-3">{u.title}</h1>
        <p className="text-xl text-muted-foreground mb-10">{u.subtitle}</p>

        <p className="text-lg leading-relaxed text-foreground/85 mb-12 max-w-3xl">{u.intro}</p>

        {/* When you need us */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6">{u.whenTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {u.whenItems.map((item: string) => (
              <div key={item} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card">
                <CheckCircle size={18} className="text-brand-gold shrink-0 mt-0.5" />
                <span className="text-sm md:text-base">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="mb-14">
          <h2 className="text-2xl font-bold mb-6">{u.howTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {u.howItems.map((step: { title: string; desc: string }, i: number) => {
              const Icon = HOW_ICONS[i] ?? Send
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
        <section className="mb-14">
          <div className="rounded-2xl border border-brand-gold/30 bg-brand-gold/5 p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-5 text-brand-navy dark:text-brand-gold">{u.guaranteeTitle}</h2>
            <ul className="space-y-3">
              {u.guaranteeItems.map((it: string) => (
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
          <h2 className="text-2xl md:text-3xl font-extrabold mb-3">{u.ctaTitle}</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto px-4">{u.ctaBody}</p>
          <div className="flex flex-wrap gap-3 justify-center px-4">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0a6855] text-white font-bold hover:bg-[#075144] transition"
            >
              {u.ctaWhatsApp}
            </a>
            <a
              href={`tel:${site.contact.phone}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-brand-navy font-bold hover:brightness-95 transition"
            >
              {u.ctaCall}
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
