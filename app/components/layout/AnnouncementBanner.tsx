'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

type Props = {
  text: string
  ctaText: string
  ctaHref: string
  dismissLabel: string
}

export function AnnouncementBanner({ text, ctaText, ctaHref, dismissLabel }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const dismissed = typeof window !== 'undefined' && sessionStorage.getItem('tbd-banner-dismissed') === '1'
    if (!dismissed) setVisible(true)
  }, [])

  if (!visible) return null

  return (
    <div className="w-full bg-gradient-to-r from-brand-navy via-brand-navy-light to-brand-navy text-white text-xs md:text-sm">
      <div className="container mx-auto px-4 md:px-6 py-2 flex items-center justify-between gap-3">
        <p className="flex-1 truncate text-center md:text-start">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-gold me-2 align-middle" />
          {text}
        </p>
        <a
          href={ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-brand-gold text-white font-semibold hover:brightness-110 transition"
        >
          {ctaText}
        </a>
        <button
          onClick={() => {
            sessionStorage.setItem('tbd-banner-dismissed', '1')
            setVisible(false)
          }}
          aria-label={dismissLabel}
          className="p-1 rounded hover:bg-white/10 transition"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  )
}
