'use client'

import { motion } from 'framer-motion'
import { Building2, Landmark, Scale, Stethoscope, GraduationCap, Briefcase, Users, Banknote } from 'lucide-react'

type Item = { key: string; label: string }
type Props = { title: string; subtitle: string; items: Item[] }

const ICONS: Record<string, typeof Building2> = {
  government: Landmark,
  embassies: Building2,
  legal: Scale,
  medical: Stethoscope,
  academic: GraduationCap,
  corporate: Briefcase,
  individuals: Users,
  banking: Banknote,
}

export function IndustriesStrip({ title, subtitle, items }: Props) {
  return (
    <section className="py-14 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground text-sm md:text-base">{subtitle}</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {items.map((it, i) => {
            const Icon = ICONS[it.key] ?? Building2
            return (
              <motion.div
                key={it.key}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: (i % 4) * 0.05 }}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-brand-gold/30 transition-all text-center"
              >
                <Icon size={22} className="text-brand-gold" />
                <span className="text-xs md:text-sm font-medium text-foreground/85 leading-tight">{it.label}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
