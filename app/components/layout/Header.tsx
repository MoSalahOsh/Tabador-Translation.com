'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from './ThemeToggle'
import { LocaleToggle } from './LocaleToggle'
import { cn } from '@/lib/utils'

type Props = {
  lang: string
  dict: {
    nav: Record<string, string>
    theme: { light: string; dark: string; toggle: string }
    locale: { switchTo: string; switchToAriaLabel: string }
    hero: Record<string, string>
  }
  site: {
    brand: { name: string; nameShort: string }
    contact: { phone: string; phoneDisplay: string }
  }
}

export function Header({ lang, dict, site }: Props) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const isHome = pathname === `/${lang}`

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const nav = [
    { key: 'home', href: `/${lang}` },
    { key: 'services', href: `/${lang}/services` },
    { key: 'pricing', href: `/${lang}/pricing` },
    { key: 'urgent', href: `/${lang}/urgent` },
    { key: 'faq', href: `/${lang}/faq` },
    { key: 'about', href: `/${lang}/about` },
    { key: 'contact', href: `/${lang}/contact` },
  ]

  const transparent = isHome && !scrolled && !open

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-300',
        transparent
          ? 'bg-transparent border-b border-transparent'
          : 'glass border-b border-border/40'
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href={`/${lang}`} className="flex items-center gap-3 shrink-0">
          <Image
            src="/images/logo.jpeg"
            alt={site.brand.name}
            width={44}
            height={44}
            className="rounded-full"
            priority
          />
          <span className={cn(
            'font-bold text-sm md:text-base leading-tight hidden sm:block transition-colors',
            transparent ? 'text-white' : 'text-brand-navy dark:text-brand-gold'
          )}>
            {lang === 'ar' ? site.brand.name : site.brand.nameShort}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {nav.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className={cn(
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                transparent
                  ? 'text-white/85 hover:text-white hover:bg-white/10'
                  : 'hover:bg-accent/10 hover:text-accent',
                pathname === href
                  ? transparent
                    ? 'text-white font-semibold'
                    : 'text-brand-navy dark:text-brand-gold font-semibold'
                  : transparent
                    ? ''
                    : 'text-foreground/80'
              )}
            >
              {dict.nav[key]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle dict={dict} />
          <LocaleToggle lang={lang} dict={dict} />

          <Link
            href={`/${lang}/contact`}
            className={cn(
              'hidden md:inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold transition-colors',
              transparent
                ? 'bg-brand-gold text-white hover:brightness-110'
                : 'bg-brand-navy text-white hover:bg-brand-navy-light'
            )}
          >
            {dict.nav.getQuote}
          </Link>

          <button
            className={cn(
              'md:hidden p-2 rounded-md transition-colors',
              transparent ? 'text-white hover:bg-white/10' : 'text-foreground/70 hover:bg-muted'
            )}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
          <nav className="container mx-auto flex flex-col px-4 py-3 gap-1">
            {nav.map(({ key, href }) => (
              <Link
                key={key}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  'px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
                  'hover:bg-accent/10',
                  pathname === href ? 'text-brand-navy dark:text-brand-gold font-semibold' : 'text-foreground/80'
                )}
              >
                {dict.nav[key]}
              </Link>
            ))}
            <Link
              href={`/${lang}/contact`}
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex justify-center items-center px-4 py-2.5 rounded-lg text-sm font-semibold bg-brand-navy text-white"
            >
              {dict.nav.getQuote}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
