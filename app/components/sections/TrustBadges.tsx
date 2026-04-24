'use client'

import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'

type Props = { title: string; items: string[] }

export function TrustBadges({ title, items }: Props) {
  return (
    <section className="py-10 bg-gradient-to-br from-brand-navy via-brand-navy-light to-brand-navy text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.06] quill-watermark" />
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="flex items-center justify-center gap-2 mb-6 text-brand-gold">
          <ShieldCheck size={18} />
          <span className="text-sm font-semibold uppercase tracking-wider">{title}</span>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 md:gap-3"
        >
          {items.map((it) => (
            <span
              key={it}
              className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/15 text-xs md:text-sm font-medium text-white/90 hover:bg-white/15 transition-colors"
            >
              {it}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
