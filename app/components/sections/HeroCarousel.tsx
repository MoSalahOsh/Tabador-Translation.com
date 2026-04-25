'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, MessageCircle, Phone, CheckCircle, Zap, Shield } from 'lucide-react'

type Slide = { headline: string; sub: string; image: string }
type Props = {
  lang: string
  badge: string
  slides: Slide[]
  cta: string
  ctaSecondary: string
  ctaSecondaryHref: string
  callCta: string
  whatsappHref: string
  callHref: string
  trust: { firstTime: string; fast: string; certified: string }
}

const INTERVAL_MS = 5500

export function HeroCarousel({
  lang, badge, slides, cta, ctaSecondary, ctaSecondaryHref, callCta,
  whatsappHref, callHref, trust,
}: Props) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const isAr = lang === 'ar'
  const total = slides.length

  const next = useCallback(() => setIndex((i) => (i + 1) % total), [total])
  const prev = useCallback(() => setIndex((i) => (i - 1 + total) % total), [total])

  useEffect(() => {
    if (paused) return
    const id = setInterval(next, INTERVAL_MS)
    return () => clearInterval(id)
  }, [next, paused])

  const slide = slides[index]

  return (
    <section
      className="relative min-h-[88vh] md:min-h-[92vh] flex items-stretch overflow-hidden bg-brand-navy"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
    >
      {/* Background image layer (auto-rotates) */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.image}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.0, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt=""
              fill
              priority={index === 0}
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        {/* Reading-friendly overlay: stronger on the start side, lighter on the image side */}
        <div className={`absolute inset-0 ${isAr ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-brand-navy/95 via-brand-navy/70 to-brand-navy/30`} />
        <div className="absolute inset-0 md:hidden bg-brand-navy/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,157,82,0.25),transparent_55%)]" />
      </div>

      {/* Foreground content */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 py-14 md:py-20 flex flex-col justify-center">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass-sm rounded-full px-4 py-1.5 text-xs text-white/90 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse" />
            {badge}
          </div>

          {/* Animated headline + sub (changes per slide) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-tight mb-3 drop-shadow-[0_4px_16px_rgba(0,0,0,0.4)]">
                {slide.headline}
              </h1>
              <p className="text-lg md:text-2xl font-semibold text-brand-gold mb-6 md:mb-8 drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)]">
                {slide.sub}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-6">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0a6855] text-white font-bold text-base hover:bg-[#075144] transition-colors shadow-card-elevated"
            >
              <MessageCircle size={18} />
              {cta}
            </a>
            <a
              href={callHref}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-gold text-white font-bold text-base hover:brightness-110 transition-colors shadow-card-elevated"
            >
              <Phone size={18} />
              {callCta}
            </a>
            <Link
              href={ctaSecondaryHref}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/30 text-white font-semibold text-base hover:bg-white/20 transition-colors"
            >
              {ctaSecondary}
              <ChevronRight size={16} className={isAr ? 'rotate-180' : ''} aria-hidden="true" />
            </Link>
          </div>

          {/* Trust pills under hero */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs sm:text-sm text-white/85 mb-8">
            <span className="inline-flex items-center gap-1.5"><CheckCircle size={14} className="text-brand-gold" />{trust.firstTime}</span>
            <span className="inline-flex items-center gap-1.5"><Zap size={14} className="text-brand-gold" />{trust.fast}</span>
            <span className="inline-flex items-center gap-1.5"><Shield size={14} className="text-brand-gold" />{trust.certified}</span>
          </div>

          {/* Slide controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              aria-label={isAr ? 'الشريحة السابقة' : 'Previous slide'}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition border border-white/20"
            >
              <ChevronLeft size={18} className={isAr ? 'rotate-180' : ''} />
            </button>
            <div className="flex items-center">
              {Array.from({ length: total }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`${isAr ? 'الشريحة' : 'Slide'} ${i + 1}`}
                  aria-current={i === index ? 'true' : undefined}
                  className="group/dot inline-flex items-center justify-center w-8 h-8"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all ${i === index ? 'w-7 bg-brand-gold' : 'w-1.5 bg-white/40 group-hover/dot:bg-white/70'}`}
                  />
                </button>
              ))}
            </div>
            <button
              onClick={next}
              aria-label={isAr ? 'الشريحة التالية' : 'Next slide'}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition border border-white/20"
            >
              <ChevronRight size={18} className={isAr ? 'rotate-180' : ''} />
            </button>
          </div>
        </div>
      </div>

      {/* Gold accent bar */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-brand-gold to-transparent z-10" />
    </section>
  )
}
