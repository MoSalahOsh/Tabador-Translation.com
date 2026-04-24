import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ChevronRight, Clock, ArrowRight } from 'lucide-react'
import { getDictionary, hasLocale } from '../dictionaries'

const BASE_URL = 'https://tabador-translation.com'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const isAr = lang === 'ar'
  return {
    title: isAr ? 'المدونة | مؤسسة دار تبادر للترجمة' : 'Blog | Tabador Translation Est.',
    description: isAr
      ? 'مقالات وأدلة عملية حول الترجمة المعتمدة في المملكة العربية السعودية: تأشيرات الشنغن، السفارات، التعليم، الأعمال.'
      : 'Practical guides on certified translation in Saudi Arabia: Schengen visas, embassies, education, business.',
    alternates: {
      canonical: `${BASE_URL}/${lang}/blog`,
      languages: { en: `${BASE_URL}/en/blog`, ar: `${BASE_URL}/ar/blog` },
    },
  }
}

type Post = { title: string; excerpt: string; minutes: number; date: string; body: unknown[] }

export default async function BlogIndex({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const isAr = lang === 'ar'

  const posts = Object.entries(dict.blog.posts) as [string, Post][]

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6" aria-label="breadcrumb">
          <Link href={`/${lang}`} className="hover:text-foreground">{dict.nav.home}</Link>
          <ChevronRight size={12} className={isAr ? 'rotate-180' : ''} aria-hidden="true" />
          <span className="text-foreground" aria-current="page">{dict.blog.title}</span>
        </nav>

        <h1 className="text-3xl md:text-5xl font-extrabold mb-3">{dict.blog.title}</h1>
        <p className="text-xl text-muted-foreground mb-12">{dict.blog.subtitle}</p>

        <div className="grid gap-5">
          {posts.map(([slug, post]) => (
            <Link
              key={slug}
              href={`/${lang}/blog/${slug}`}
              className="group block p-6 md:p-8 rounded-2xl border border-border bg-card hover:border-brand-gold/40 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                <span>{dict.blog.publishedOn} {post.date}</span>
                <span>·</span>
                <span className="flex items-center gap-1"><Clock size={12} /> {post.minutes} {dict.blog.readingTime}</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-brand-navy dark:group-hover:text-brand-gold transition-colors">
                {post.title}
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">{post.excerpt}</p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-brand-gold">
                {dict.services.learnMore}
                <ArrowRight size={14} className={isAr ? 'rotate-180' : ''} />
              </span>
            </Link>
          ))}
        </div>

        {/* Coming soon notice */}
        <div className="mt-12 p-6 rounded-2xl border border-dashed border-border text-center">
          <h3 className="font-bold mb-1">{dict.blog.moreArticles}</h3>
          <p className="text-sm text-muted-foreground">{dict.blog.moreArticlesBody}</p>
        </div>
      </div>
    </div>
  )
}
