'use client'

import { motion } from 'framer-motion'
import { FileUp, MessageSquare, Stamp, PackageCheck } from 'lucide-react'

type Step = { n: string; title: string; desc: string }
type Props = {
  title: string
  subtitle: string
  steps: Step[]
}

const ICONS = [FileUp, MessageSquare, Stamp, PackageCheck]

export function ProcessSection({ title, subtitle, steps }: Props) {
  return (
    <section className="py-16 bg-secondary/30 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] quill-watermark" />
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((step, i) => {
            const Icon = ICONS[i] ?? FileUp
            return (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="relative flex flex-col gap-3 p-6 rounded-2xl bg-card border border-border hover:border-brand-gold/40 hover:shadow-lg transition-all"
              >
                <div className="absolute top-4 end-4 text-4xl font-black text-brand-gold/15 select-none">
                  {step.n}
                </div>
                <div className="w-11 h-11 rounded-xl bg-brand-navy/10 dark:bg-brand-gold/10 flex items-center justify-center">
                  <Icon size={22} className="text-brand-navy dark:text-brand-gold" />
                </div>
                <h3 className="font-bold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
