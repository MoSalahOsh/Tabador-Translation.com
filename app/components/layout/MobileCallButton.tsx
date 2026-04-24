'use client'

import { Phone } from 'lucide-react'
import { track } from '@vercel/analytics'

type Props = { phone: string; ariaLabel: string }

export function MobileCallButton({ phone, ariaLabel }: Props) {
  return (
    <a
      href={`tel:${phone}`}
      onClick={() => track('call_click', { source: 'floating' })}
      aria-label={ariaLabel}
      className="md:hidden fixed bottom-6 inset-inline-start-6 z-50 w-14 h-14 rounded-full bg-brand-navy text-white shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
    >
      <Phone size={22} />
    </a>
  )
}
