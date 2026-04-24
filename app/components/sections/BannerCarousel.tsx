'use client'

import Image from 'next/image'
import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react'

type Slide = { headline: string; body: string }
type Props = {
  lang: string
  label: string
  slides: Slide[]
  cta: string
  ctaHref: string
  images?: string[]
}

const DEFAULT_IMAGES = ['/images/ads/Ad-1.jpeg', '/images/ads/Ad-2.jpeg', '/images/ads/Ad-3.jpeg', '/images/ads/Ad-4.jpeg']
const INTERVAL_MS = 6000

export function BannerCarousel({ lang, label, slides, cta, ctaHref, images = DEFAULT_IMAGES }: Props) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const isAr = lang === 'ar'
  const total = Math.min(slides.length, images.length)

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total])
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, INTERVAL_MS)
    return () => clearInterval(id)
  }, [next, paused])

  if (total === 0) return null
  const slide = slides[index]
  const image = images[index]

  return (
    <section
      className="relative bg-brand-navy text-white overflow-hidden"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Image */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-card-elevated bg-brand-navy-light">
            <AnimatePresence mode="wait">
              <motion.div
                key={image}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0"
              >
                <Image src={image} alt="" fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
                <div className="absolute inset-0 bg-gradient-to-tr from-brand-navy/60 via-transparent to-transparent" />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Text */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-xs uppercase tracking-[0.18em] text-white/95 font-semibold mb-3">
                  <span className="inline-block w-2 h-2 rounded-full bg-brand-gold me-2 align-middle" />
                  {label}
                </p>
                <h2 className="text-2xl md:text-4xl font-extrabold leading-tight mb-3">{slide.headline}</h2>
                <p className="text-white/85 leading-relaxed mb-6 max-w-xl">{slide.body}</p>
              </motion.div>
            </AnimatePresence>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={ctaHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0a6855] text-white font-bold hover:bg-[#075144] transition-colors"
              >
                <MessageCircle size={18} />
                {cta}
              </a>

              {/* Controls */}
              <div className="ms-auto flex items-center gap-2">
                <button
                  onClick={prev}
                  aria-label="Previous slide"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                >
                  <ChevronLeft size={18} className={isAr ? 'rotate-180' : ''} />
                </button>
                <div className="flex items-center px-2">
                  {Array.from({ length: total }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      aria-label={`Slide ${i + 1}`}
                      aria-current={i === index ? 'true' : undefined}
                      className="group/dot inline-flex items-center justify-center w-8 h-8"
                    >
                      <span
                        className={`block h-1.5 rounded-full transition-all ${i === index ? 'w-6 bg-brand-gold' : 'w-1.5 bg-white/40 group-hover/dot:bg-white/70'}`}
                      />
                    </button>
                  ))}
                </div>
                <button
                  onClick={next}
                  aria-label="Next slide"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition"
                >
                  <ChevronRight size={18} className={isAr ? 'rotate-180' : ''} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
