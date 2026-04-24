'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
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

  const nav = [
    { key: 'home', href: `/${lang}` },
    { key: 'services', href: `/${lang}/services` },
    { key: 'about', href: `/${lang}/about` },
    { key: 'contact', href: `/${lang}/contact` },
  ]

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-all duration-200',
        'glass border-b border-border/40'
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-3 shrink-0">
          <Image
            src="/images/logo.jpeg"
            alt={site.brand.name}
            width={44}
            height={44}
            className="rounded-full"
            priority
          />
          <span className="font-bold text-sm md:text-base text-brand-navy dark:text-brand-navy leading-tight hidden sm:block">
            {lang === 'ar' ? site.brand.name : site.brand.nameShort}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
          {nav.map(({ key, href }) => (
            <Link
              key={key}
              href={href}
              className={cn(
                'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                'hover:bg-accent/10 hover:text-accent',
                pathname === href
                  ? 'text-brand-navy dark:text-brand-navy font-semibold'
                  : 'text-foreground/80'
              )}
            >
              {dict.nav[key]}
            </Link>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          <ThemeToggle dict={dict} />
          <LocaleToggle lang={lang} dict={dict} />

          {/* Desktop CTA */}
          <Link
            href={`/${lang}/contact`}
            className="hidden md:inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold bg-brand-navy text-white hover:bg-brand-navy-light transition-colors"
          >
            {dict.nav.getQuote}
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-foreground/70 hover:bg-muted"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
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
                  pathname === href ? 'text-brand-navy font-semibold' : 'text-foreground/80'
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
