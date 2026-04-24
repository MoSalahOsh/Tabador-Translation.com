import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, Clock, MessageCircle, Phone } from 'lucide-react'
import { getDictionary, hasLocale } from '../../dictionaries'
import enSite from '../../../../content/en/site.json'
import arSite from '../../../../content/ar/site.json'

const BASE_URL = 'https://tabador-translation.com'

const KNOWN_SLUGS = ['schengen-from-saudi'] as const

export function generateStaticParams() {
  return ['en', 'ar'].flatMap((lang) => KNOWN_SLUGS.map((slug) => ({ lang, slug })))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }): Promise<Metadata> {
  const { lang, slug } = await params
  if (!hasLocale(lang)) return {}
  const dict = await getDictionary(lang)
  const post = (dict.blog.posts as Record<string, { title: string; excerpt: string }>)[slug]
  if (!post) return {}
  return {
    title: `${post.title} | ${lang === 'ar' ? 'مؤسسة دار تبادر للترجمة' : 'Tabador Translation Est.'}`,
    description: post.excerpt,
    alternates: {
      canonical: `${BASE_URL}/${lang}/blog/${slug}`,
      languages: {
        en: `${BASE_URL}/en/blog/${slug}`,
        ar: `${BASE_URL}/ar/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${BASE_URL}/${lang}/blog/${slug}`,
      type: 'article',
    },
  }
}

type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'ul'; items: string[] }
  | { type: 'ol'; items: string[] }

type Post = { title: string; excerpt: string; minutes: number; date: string; body: Block[] }

export default async function BlogPostPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const site = lang === 'ar' ? arSite : enSite
  const isAr = lang === 'ar'

  const post = (dict.blog.posts as Record<string, Post>)[slug]
  if (!post) notFound()

  const waHref = `https://wa.me/${site.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(site.contact.whatsappMessage)}`

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: site.brand.name, url: BASE_URL },
    publisher: { '@id': `${BASE_URL}/${lang}#business` },
    mainEntityOfPage: `${BASE_URL}/${lang}/blog/${slug}`,
    inLanguage: isAr ? 'ar-SA' : 'en-US',
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: dict.nav.home, item: `${BASE_URL}/${lang}` },
      { '@type': 'ListItem', position: 2, name: dict.nav.blog, item: `${BASE_URL}/${lang}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${BASE_URL}/${lang}/blog/${slug}` },
    ],
  }

  return (
    <div className="py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <article className="container mx-auto px-4 md:px-6 max-w-3xl">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="breadcrumb">
          <Link href={`/${lang}`} className="hover:text-foreground">{dict.nav.home}</Link>
          <ChevronRight size={12} className={isAr ? 'rotate-180' : ''} aria-hidden="true" />
          <Link href={`/${lang}/blog`} className="hover:text-foreground">{dict.nav.blog}</Link>
          <ChevronRight size={12} className={isAr ? 'rotate-180' : ''} aria-hidden="true" />
          <span className="text-foreground" aria-current="page">{post.title}</span>
        </nav>

        <header className="mb-10">
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
            <span>{dict.blog.publishedOn} {post.date}</span>
            <span>·</span>
            <span className="flex items-center gap-1"><Clock size={12} /> {post.minutes} {dict.blog.readingTime}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-3">{post.title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>
        </header>

        <div className="prose-content space-y-5">
          {post.body.map((block, i) => {
            if (block.type === 'p') return <p key={i} className="text-base leading-relaxed text-foreground/85">{block.text}</p>
            if (block.type === 'h2') return <h2 key={i} className="text-2xl font-bold mt-10 mb-3 text-foreground">{block.text}</h2>
            if (block.type === 'ul') return (
              <ul key={i} className="space-y-2 ps-5 list-disc marker:text-brand-gold">
                {block.items.map((it) => <li key={it} className="text-foreground/85">{it}</li>)}
              </ul>
            )
            if (block.type === 'ol') return (
              <ol key={i} className="space-y-2 ps-5 list-decimal marker:text-brand-gold marker:font-bold">
                {block.items.map((it) => <li key={it} className="text-foreground/85">{it}</li>)}
              </ol>
            )
            return null
          })}
        </div>

        {/* Inline CTA */}
        <aside className="mt-16 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy text-white text-center">
          <h2 className="text-2xl font-extrabold mb-2">{dict.urgent.ctaTitle}</h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">{dict.urgent.ctaBody}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a href={waHref} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#128C7E] text-white font-bold hover:bg-[#0a6855] transition">
              <MessageCircle size={18} /> {dict.hero.whatsappCta}
            </a>
            <a href={`tel:${site.contact.phone}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-brand-navy font-bold hover:brightness-95 transition">
              <Phone size={18} /> {dict.hero.callCta}
            </a>
          </div>
        </aside>
      </article>
    </div>
  )
}
