import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { CheckCircle, MapPin, Phone, Mail, Target, Eye, Heart, Lock, Gauge, Zap } from 'lucide-react'
import { getDictionary, hasLocale } from '../dictionaries'
import enSite from '../../../content/en/site.json'
import arSite from '../../../content/ar/site.json'

const BASE_URL = 'https://tabador-translation.com'

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  const isAr = lang === 'ar'
  return {
    title: isAr ? 'من نحن | مؤسسة دار تبادر للترجمة' : 'About Us | Tabador Translation Est.',
    description: isAr
      ? 'مؤسسة دار تبادر للترجمة · أكثر من 15 عاماً من الترجمة المعتمدة في الدمام والمنطقة الشرقية. ترخيص رقم 317، س.ت 2051221647.'
      : 'Tabador Translation Est. · over 15 years of certified translation in Dammam and the Eastern Province. Licence No. 317, C.R. 2051221647.',
    alternates: {
      canonical: `${BASE_URL}/${lang}/about`,
      languages: { en: `${BASE_URL}/en/about`, ar: `${BASE_URL}/ar/about` },
    },
  }
}

const VALUE_ICONS = [Gauge, Zap, Heart, Lock]

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!hasLocale(lang)) notFound()
  const dict = await getDictionary(lang)
  const site = lang === 'ar' ? arSite : enSite

  return (
    <div className="py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3">{dict.about.title}</h1>
        <p className="text-xl text-muted-foreground mb-10">{dict.about.subtitle}</p>

        <div className="grid md:grid-cols-2 gap-10 items-start mb-16">
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
              <li className="flex items-start gap-2">
                <Mail size={16} className="text-brand-gold mt-1" />
                <div className="flex flex-col">
                  <a href={`mailto:${site.contact.email}`} className="hover:text-brand-gold">{site.contact.email}</a>
                  <a href={`mailto:${site.contact.emailContact}`} className="hover:text-brand-gold">{site.contact.emailContact}</a>
                </div>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-xl aspect-video relative">
            <Image src="/images/office.jpg" alt={site.brand.name} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
          </div>
        </div>

        {/* Mission / Vision */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          <div className="p-6 rounded-2xl border border-border bg-card relative overflow-hidden">
            <Target size={28} className="text-brand-gold mb-3" />
            <h2 className="text-xl font-bold mb-2">{dict.about.missionTitle}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{dict.about.missionBody}</p>
          </div>
          <div className="p-6 rounded-2xl border border-border bg-card relative overflow-hidden">
            <Eye size={28} className="text-brand-gold mb-3" />
            <h2 className="text-xl font-bold mb-2">{dict.about.visionTitle}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{dict.about.visionBody}</p>
          </div>
        </div>

        {/* Values */}
        <div>
          <h2 className="text-2xl font-bold mb-6">{dict.about.valuesTitle}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dict.about.values.map((v: { title: string; desc: string }, i: number) => {
              const Icon = VALUE_ICONS[i] ?? CheckCircle
              return (
                <div key={v.title} className="p-5 rounded-xl border border-border bg-card hover:border-brand-gold/40 hover:shadow-md transition-all">
                  <Icon size={22} className="text-brand-gold mb-3" />
                  <h3 className="font-bold mb-1">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
