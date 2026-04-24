import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { CheckCircle, MapPin, Phone, Mail } from 'lucide-react'
import { getDictionary, hasLocale } from '../dictionaries'
import enSite from '../../../content/en/site.json'
import arSite from '../../../content/ar/site.json'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return {
    title: lang === 'ar' ? 'من نحن | مؤسسة دار تبادر للترجمة' : 'About Us | Tabador Translation Est.',
  }
}

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const site = lang === 'ar' ? arSite : enSite

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">{dict.about.title}</h1>
        <p className="text-xl text-muted-foreground mb-10">{dict.about.subtitle}</p>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-5">
            <p className="text-foreground/80 leading-relaxed">{dict.about.body}</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-brand-gold" />{dict.about.licence}</li>
              <li className="flex items-center gap-2"><CheckCircle size={16} className="text-brand-gold" />{dict.about.cr}</li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-brand-gold" />
                <a href={site.contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-brand-gold">
                  {dict.about.location}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-brand-gold" />
                <a href={`tel:${site.contact.phone}`} className="hover:text-brand-gold">{site.contact.phoneDisplay}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-brand-gold" />
                <a href={`mailto:${site.contact.email}`} className="hover:text-brand-gold">{site.contact.email}</a>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl aspect-video relative">
            <Image src="/images/office.jpg" alt={site.brand.name} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
          </div>
        </div>
      </div>
    </div>
  )
}
