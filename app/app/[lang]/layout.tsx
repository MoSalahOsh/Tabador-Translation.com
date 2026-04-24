import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Analytics } from '@vercel/analytics/react'
import { getDictionary, hasLocale, locales } from './dictionaries'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/layout/WhatsAppButton'
import { AnnouncementBanner } from '@/components/layout/AnnouncementBanner'
import { MobileActionBar } from '@/components/layout/MobileActionBar'
import enSite from '../../content/en/site.json'
import arSite from '../../content/ar/site.json'

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }))
}

const BASE_URL = 'https://tabador-translation.com'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>
}): Promise<Metadata> {
  const { lang } = await params
  const isAr = lang === 'ar'
  const site = isAr ? arSite : enSite
  return {
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: `${BASE_URL}/${lang}`,
      languages: {
        'en': `${BASE_URL}/en`,
        'ar': `${BASE_URL}/ar`,
        'x-default': `${BASE_URL}/en`,
      },
    },
    openGraph: {
      locale: isAr ? 'ar_SA' : 'en_US',
      alternateLocale: isAr ? 'en_US' : 'ar_SA',
      siteName: site.brand.name,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@tabador',
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

  const waHref = `https://wa.me/${site.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(site.contact.whatsappMessage)}`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['LocalBusiness', 'ProfessionalService'],
        '@id': `${BASE_URL}/${lang}#business`,
        name: site.brand.name,
        description: site.brand.description,
        url: `${BASE_URL}/${lang}`,
        telephone: site.contact.phone,
        email: site.contact.email,
        address: {
          '@type': 'PostalAddress',
          streetAddress: lang === 'ar' ? 'مقابل الجوازات' : 'Opposite Jawazat (Passport Office)',
          addressLocality: site.contact.city,
          postalCode: '31952',
          addressCountry: 'SA',
        },
        geo: { '@type': 'GeoCoordinates', latitude: 26.4207, longitude: 50.0888 },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
          opens: '08:00',
          closes: '22:00',
        },
        hasMap: site.contact.mapsUrl,
        priceRange: '$$',
        serviceArea: { '@type': 'Country', name: 'Saudi Arabia' },
        knowsLanguage: ['ar', 'en'],
        identifier: [
          { '@type': 'PropertyValue', name: 'CR', value: '2051221647' },
          { '@type': 'PropertyValue', name: 'Licence', value: '317' },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AnnouncementBanner
        text={dict.banner.text}
        ctaText={dict.banner.cta}
        ctaHref={waHref}
        dismissLabel={dict.banner.dismiss}
      />
      <Header lang={lang} dict={dict} site={site} />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <Footer lang={lang} dict={dict} site={site} />
      <WhatsAppButton lang={lang} dict={dict} whatsapp={site.contact.whatsapp} message={site.contact.whatsappMessage} />
      <MobileActionBar lang={lang} phone={site.contact.phone} whatsappHref={waHref} labels={dict.mobileBar} />
      <Analytics />
    </>
  )
}
