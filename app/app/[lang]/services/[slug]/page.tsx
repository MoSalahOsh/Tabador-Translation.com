import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, MessageCircle } from 'lucide-react'
import { getDictionary, hasLocale } from '../../dictionaries'
import enSite from '../../../../content/en/site.json'
import arSite from '../../../../content/ar/site.json'

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
  return { title: `${svc.title} | Tabador Translation Est.`, description: svc.desc }
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

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href={`/${lang}`} className="hover:text-foreground">{dict.nav.home}</Link>
          <ChevronRight size={12} className={isAr ? 'rotate-180' : ''} />
          <Link href={`/${lang}/services`} className="hover:text-foreground">{dict.nav.services}</Link>
          <ChevronRight size={12} className={isAr ? 'rotate-180' : ''} />
          <span className="text-foreground">{svc.title}</span>
        </nav>

        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">{svc.title}</h1>
        <p className="text-lg text-muted-foreground mb-8">{svc.desc}</p>

        <div className="p-6 rounded-2xl bg-secondary/30 border border-border space-y-4 mb-8">
          <p className="font-semibold">{dict.trust.certified}</p>
          <p className="text-sm text-muted-foreground">{dict.trust.firstTime}</p>
        </div>

        <a href={waHref} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#25D366] text-white font-bold hover:bg-[#1ebe5d] transition-colors">
          <MessageCircle size={20} />
          {dict.hero.cta}
        </a>
      </div>
    </div>
  )
}
