'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

type Partner = { name: string; logo?: string; href?: string }
type Props = {
  title: string
  subtitle: string
  emptyNote: string
  partners: Partner[]
}

export function Partners({ title, subtitle, emptyNote, partners }: Props) {
  if (!partners || partners.length === 0) {
    // Hide section entirely until verified partners are configured
    return null
  }

  return (
    <section className="py-14 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground text-sm md:text-base">{subtitle}</p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 items-center"
        >
          {partners.map((p) => {
            const inner = p.logo ? (
              <Image
                src={p.logo}
                alt={p.name}
                width={140}
                height={70}
                className="object-contain max-h-14 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
              />
            ) : (
              <span className="text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors text-center">
                {p.name}
              </span>
            )
            return (
              <div key={p.name} className="flex items-center justify-center p-3 rounded-lg bg-card border border-border shadow-card hover:shadow-card-hover transition-shadow">
                {p.href ? (
                  <a href={p.href} target="_blank" rel="noopener noreferrer" aria-label={p.name}>{inner}</a>
                ) : inner}
              </div>
            )
          })}
        </motion.div>

        <p className="mt-6 text-center text-xs text-muted-foreground italic">{emptyNote}</p>
      </div>
    </section>
  )
}
