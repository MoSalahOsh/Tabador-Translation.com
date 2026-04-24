'use client'

import { motion } from 'framer-motion'
import { Stethoscope, GraduationCap, Landmark, Building2, Factory, Scale, Banknote, Briefcase } from 'lucide-react'

type Item = { key: string; label: string; desc: string }
type Props = { title: string; subtitle: string; items: Item[] }

const ICONS: Record<string, typeof Stethoscope> = {
  hospitals: Stethoscope,
  universities: GraduationCap,
  government: Landmark,
  embassies: Building2,
  petrochemical: Factory,
  legal: Scale,
  banking: Banknote,
  corporate: Briefcase,
}

export function SectorsServed({ title, subtitle, items }: Props) {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((it, i) => {
            const Icon = ICONS[it.key] ?? Building2
            return (
              <motion.div
                key={it.key}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
                className="group p-5 rounded-2xl bg-card border border-border shadow-card hover:shadow-card-hover hover:border-brand-gold/40 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  <Icon size={22} className="text-brand-gold" />
                </div>
                <h3 className="font-bold text-foreground mb-1">{it.label}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{it.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
