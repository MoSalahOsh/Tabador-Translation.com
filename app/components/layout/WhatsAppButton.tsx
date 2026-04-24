'use client'

import { MessageCircle } from 'lucide-react'
import { track } from '@vercel/analytics'

type Props = {
  lang: string
  whatsapp: string
  message: string
  dict: { whatsapp: { ariaLabel: string; tooltip: string } }
}

export function WhatsAppButton({ lang, whatsapp, message, dict }: Props) {
  const number = whatsapp.replace(/\D/g, '')
  const encodedMsg = encodeURIComponent(message)
  const href = `https://wa.me/${number}?text=${encodedMsg}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="float-cta group flex items-center gap-2 bg-[#0a6855] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0a6855] focus-visible:ring-offset-2"
      aria-label={dict.whatsapp.ariaLabel}
      onClick={() => track('whatsapp_click', { lang })}
    >
      {/* Icon always visible */}
      <span className="flex items-center justify-center w-14 h-14 rounded-full">
        <MessageCircle size={26} strokeWidth={2} fill="white" stroke="#25D366" />
      </span>
      {/* Tooltip label on hover — desktop only; aria-hidden so accessible name comes from button aria-label */}
      <span aria-hidden="true" className="hidden md:block pe-4 text-sm font-semibold whitespace-nowrap overflow-hidden max-w-0 group-hover:max-w-xs transition-all duration-300">
        {dict.whatsapp.tooltip}
      </span>
    </a>
  )
}
