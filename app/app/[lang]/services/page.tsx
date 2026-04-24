import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { getDictionary, hasLocale } from '../dictionaries'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'ar' ? 'خدماتنا | دار تبادر للترجمة' : 'Services | Tabador Translation Est.',
  }
}

const SERVICE_ICONS: Record<string, string> = {
  'personal-official': '🪪', 'embassy-schengen': '🛂', 'academic': '🎓',
  'contracts-business': '📋', 'medical': '🏥', 'legal-administrative': '⚖️',
  'trademark': '™️', 'financial-commercial': '💼', 'technical-engineering': '⚙️',
  'website-localization': '🌐', 'interpretation': '🗣️',
}

export default async function ServicesPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const isAr = lang === 'ar'
  const entries = Object.entries(dict.services.categories) as [string, { title: string; desc: string }][]

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">{dict.services.title}</h1>
          <p className="text-muted-foreground">{dict.services.subtitle}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {entries.map(([slug, svc]) => (
            <Link key={slug} href={`/${lang}/services/${slug}`}
              className="group flex flex-col gap-3 p-6 rounded-2xl border border-border hover:border-brand-gold/40 hover:shadow-lg bg-card transition-all">
              <span className="text-4xl">{SERVICE_ICONS[slug] ?? '📄'}</span>
              <h2 className="font-bold text-lg text-foreground group-hover:text-brand-navy dark:group-hover:text-brand-gold transition-colors">{svc.title}</h2>
              <p className="text-sm text-muted-foreground flex-1">{svc.desc}</p>
              <span className="text-xs font-medium text-brand-gold flex items-center gap-1">
                {dict.services.learnMore}
                <ChevronRight size={12} className={isAr ? 'rotate-180' : ''} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
