'use client'

import Link from 'next/link'
import { Phone, MessageCircle, FileText } from 'lucide-react'
import { track } from '@vercel/analytics'

type Props = {
  lang: string
  phone: string
  whatsappHref: string
  labels: { call: string; whatsapp: string; quote: string }
}

export function MobileActionBar({ lang, phone, whatsappHref, labels }: Props) {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-background/95 backdrop-blur-md border-t border-border">
      <div className="grid grid-cols-3">
        <a
          href={`tel:${phone}`}
          onClick={() => track('call_click', { source: 'mobile_bar' })}
          className="flex flex-col items-center gap-1 py-2.5 text-brand-navy dark:text-brand-gold active:bg-muted transition-colors"
        >
          <Phone size={20} />
          <span className="text-[11px] font-semibold">{labels.call}</span>
        </a>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track('whatsapp_click', { source: 'mobile_bar' })}
          className="flex flex-col items-center gap-1 py-2.5 text-[#128C7E] active:bg-muted transition-colors border-x border-border"
        >
          <MessageCircle size={20} />
          <span className="text-[11px] font-semibold">{labels.whatsapp}</span>
        </a>
        <Link
          href={`/${lang}/contact`}
          className="flex flex-col items-center gap-1 py-2.5 text-brand-navy dark:text-brand-gold active:bg-muted transition-colors"
        >
          <FileText size={20} />
          <span className="text-[11px] font-semibold">{labels.quote}</span>
        </Link>
      </div>
    </div>
  )
}
