import type { MetadataRoute } from 'next'

const BASE_URL = 'https://tabador-translation.com'

const langs = ['en', 'ar']
const serviceSlugs = [
  'personal-official', 'embassy-schengen', 'academic', 'contracts-business',
  'medical', 'legal-administrative', 'trademark', 'financial-commercial',
  'technical-engineering', 'website-localization', 'interpretation',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/services', '/about', '/contact', '/pricing', '/urgent', '/faq']

  const entries: MetadataRoute.Sitemap = []

  for (const lang of langs) {
    for (const route of staticRoutes) {
      entries.push({
        url: `${BASE_URL}/${lang}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : route === '/services' ? 0.9 : 0.7,
        alternates: {
          languages: {
            en: `${BASE_URL}/en${route}`,
            ar: `${BASE_URL}/ar${route}`,
          },
        },
      })
    }

    for (const slug of serviceSlugs) {
      entries.push({
        url: `${BASE_URL}/${lang}/services/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: {
          languages: {
            en: `${BASE_URL}/en/services/${slug}`,
            ar: `${BASE_URL}/ar/services/${slug}`,
          },
        },
      })
    }
  }

  return entries
}
