'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

type Item = { q: string; a: string }
type Props = { title: string; subtitle: string; items: Item[] }

export function FAQSection({ title, subtitle, items }: Props) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-3xl">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </div>

        <div className="space-y-3">
          {items.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={i}
                className="rounded-xl border border-border bg-card overflow-hidden hover:border-brand-gold/30 transition-colors"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-start p-5 font-semibold text-foreground hover:bg-secondary/40 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="flex-1">{item.q}</span>
                  <span className="shrink-0 w-7 h-7 rounded-full bg-brand-navy/10 dark:bg-brand-gold/15 text-brand-navy dark:text-brand-gold flex items-center justify-center">
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
