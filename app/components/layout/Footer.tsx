import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

type SiteData = {
  brand: { name: string; cr: string; certNote: string }
  contact: {
    phoneDisplay: string
    phone: string
    email: string
    address: string
    hours: { days: string; time: string }
    mapsUrl: string
  }
  social: { tiktok: string; instagram: string; linkedin: string; facebook: string }
}

type Props = {
  lang: string
  dict: {
    nav: Record<string, string>
    footer: { rights: string; privacy: string; terms: string; certNote: string; servicesCol1: string; servicesCol2: string; quickLinks: string }
    services: { categories: Record<string, { title: string; desc: string }> }
  }
  site: SiteData
}

const CORE_SLUGS = ['personal-official', 'embassy-schengen', 'academic', 'contracts-business', 'medical', 'legal-administrative']
const SPECIALIZED_SLUGS = ['trademark', 'financial-commercial', 'technical-engineering', 'website-localization', 'interpretation']

export function Footer({ lang, dict, site }: Props) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-brand-navy text-white/90 pt-12 pb-6 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent" />
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">

          {/* Brand column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image src="/images/logo.jpeg" alt={site.brand.name} width={44} height={44} className="rounded-full" />
              <span className="font-bold text-white leading-tight">{site.brand.name}</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">{site.brand.certNote}</p>
            <div className="flex gap-3 flex-wrap text-xs text-white/50">
              <span>C.R. {site.brand.cr}</span>
            </div>
            <div className="flex gap-3">
              {(['tiktok', 'instagram', 'linkedin', 'facebook'] as const).map((platform) => (
                site.social[platform] ? (
                  <a
                    key={platform}
                    href={site.social[platform]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors text-xs uppercase font-bold"
                    aria-label={platform}
                  >
                    {platform[0].toUpperCase()}
                  </a>
                ) : null
              ))}
            </div>
          </div>

          {/* Services column 1 */}
          <div>
            <h3 className="font-semibold text-white mb-4">{dict.footer.servicesCol1}</h3>
            <ul className="space-y-2">
              {CORE_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link href={`/${lang}/services/${slug}`} className="text-sm text-white/70 hover:text-white transition-colors">
                    {dict.services.categories[slug]?.title ?? slug}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services column 2 */}
          <div>
            <h3 className="font-semibold text-white mb-4">{dict.footer.servicesCol2}</h3>
            <ul className="space-y-2">
              {SPECIALIZED_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link href={`/${lang}/services/${slug}`} className="text-sm text-white/70 hover:text-white transition-colors">
                    {dict.services.categories[slug]?.title ?? slug}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="font-semibold text-white mb-4">{dict.nav.contact}</h3>
            <ul className="space-y-2 mb-5">
              <li><Link href={`/${lang}/pricing`} className="text-sm text-white/70 hover:text-white transition-colors">{dict.nav.pricing}</Link></li>
              <li><Link href={`/${lang}/urgent`} className="text-sm text-white/70 hover:text-white transition-colors">{dict.nav.urgent}</Link></li>
              <li><Link href={`/${lang}/about`} className="text-sm text-white/70 hover:text-white transition-colors">{dict.nav.about}</Link></li>
            </ul>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-sm text-white/70">
                <Phone size={15} className="shrink-0 mt-0.5" />
                <a href={`tel:${site.contact.phone}`} className="hover:text-white transition-colors">
                  {site.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/70">
                <Mail size={15} className="shrink-0 mt-0.5" />
                <a href={`mailto:${site.contact.email}`} className="hover:text-white transition-colors break-all">
                  {site.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/70">
                <MapPin size={15} className="shrink-0 mt-0.5" />
                <a href={site.contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {site.contact.address}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-white/70">
                <Clock size={15} className="shrink-0 mt-0.5" />
                <span>{site.contact.hours.days}<br />{site.contact.hours.time}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <p>© {year} {site.brand.name}. {dict.footer.rights}</p>
          <div className="flex gap-4">
            <Link href={`/${lang}/privacy`} className="hover:text-white/80 transition-colors">{dict.footer.privacy}</Link>
            <Link href={`/${lang}/terms`} className="hover:text-white/80 transition-colors">{dict.footer.terms}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
