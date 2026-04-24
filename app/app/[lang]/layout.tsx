import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Analytics } from '@vercel/analytics/react'
import { getDictionary, hasLocale, locales } from './dictionaries'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import enSite from '../../content/en/site.json'
import arSite from '../../content/ar/site.json'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const isAr = lang === 'ar'
  return {
    alternates: {
      canonical: `/${lang}`,
      languages: { en: '/en', ar: '/ar' },
    },
    openGraph: {
      locale: isAr ? 'ar_SA' : 'en_US',
      alternateLocale: isAr ? 'en_US' : 'ar_SA',
      siteName: isAr ? arSite.brand.name : enSite.brand.name,
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params

  if (!hasLocale(lang)) notFound()

  const dict = await getDictionary(lang)
  const site = lang === 'ar' ? arSite : enSite

  return (
    <>
      <Header lang={lang} dict={dict} site={site} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} dict={dict} site={site} />
      <WhatsAppButton lang={lang} dict={dict} whatsapp={site.contact.whatsapp} message={site.contact.whatsappMessage} />
      <Analytics />
    </>
  )
}
