import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react'
import { getDictionary, hasLocale } from '../dictionaries'
import { ContactForm } from '@/components/sections/ContactForm'
import enSite from '../../../content/en/site.json'
import arSite from '../../../content/ar/site.json'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'ar' ? 'تواصل معنا | مؤسسة دار تبادر للترجمة' : 'Contact Us | Tabador Translation Est.',
  }
}

export default async function ContactPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const site = lang === 'ar' ? arSite : enSite
  const isAr = lang === 'ar'

  const waHref = `https://wa.me/${site.contact.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(site.contact.whatsappMessage)}`

  const contactItems = [
    {
      icon: Phone,
      label: dict.contact.phone,
      value: site.contact.phoneDisplay,
      href: `tel:${site.contact.phone}`,
    },
    {
      icon: Mail,
      label: dict.contact.email,
      value: site.contact.email,
      href: `mailto:${site.contact.email}`,
    },
    {
      icon: MapPin,
      label: dict.contact.address,
      value: site.contact.address,
      href: site.contact.mapsUrl,
      external: true,
    },
    {
      icon: Clock,
      label: dict.contact.hours,
      value: `${site.contact.hours.days}\n${site.contact.hours.time}`,
      href: null,
    },
  ]

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-3">{dict.contact.title}</h1>
          <p className="text-xl text-muted-foreground">{dict.contact.subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact info */}
          <div className="space-y-5">
            {contactItems.map(({ icon: Icon, label, value, href, external }) => (
              <div key={label} className="flex gap-4 items-start">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-brand-navy/10 dark:bg-brand-gold/10 flex items-center justify-center">
                  <Icon size={18} className="text-brand-navy dark:text-brand-gold" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-0.5">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target={external ? '_blank' : undefined}
                      rel={external ? 'noopener noreferrer' : undefined}
                      className="text-sm font-medium hover:text-brand-gold transition-colors whitespace-pre-line"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium whitespace-pre-line">{value}</p>
                  )}
                </div>
              </div>
            ))}

            {/* WhatsApp CTA */}
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-2 px-5 py-3 rounded-xl bg-[#25D366] text-white font-bold text-sm hover:bg-[#1ebe5d] transition-colors"
            >
              <MessageCircle size={18} />
              {dict.hero.whatsappCta}
            </a>

            {/* Maps embed / link */}
            <div className="rounded-2xl overflow-hidden border border-border aspect-video relative bg-muted flex items-center justify-center mt-4">
              <a
                href={site.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <MapPin size={32} className="text-brand-gold" />
                <span className="text-sm font-medium">{dict.contact.mapTitle}</span>
                <span className="text-xs underline">{isAr ? 'افتح الخريطة' : 'Open in Google Maps'}</span>
              </a>
            </div>
          </div>

          {/* Contact form */}
          <div>
            <h2 className="text-xl font-bold mb-6">{dict.contact.form}</h2>
            <ContactForm lang={lang} dict={dict} emailContact={site.contact.emailContact} />
          </div>
        </div>
      </div>
    </div>
  )
}
