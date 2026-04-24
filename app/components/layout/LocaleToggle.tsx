'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { track } from '@vercel/analytics'

type Props = {
  lang: string
  dict: { locale: { switchTo: string; switchToAriaLabel: string } }
}

export function LocaleToggle({ lang, dict }: Props) {
  const pathname = usePathname()
  const otherLang = lang === 'en' ? 'ar' : 'en'

  // Replace /en/... with /ar/... (or vice-versa)
  const targetPath = pathname.replace(new RegExp(`^/${lang}`), `/${otherLang}`)

  return (
    <Link
      href={targetPath}
      className="px-2.5 py-1.5 rounded-md text-sm font-medium border border-border text-foreground/70 hover:bg-muted hover:text-foreground transition-colors"
      aria-label={dict.locale.switchToAriaLabel}
      hrefLang={otherLang}
      onClick={() => track('locale_toggle', { from: lang, to: otherLang })}
    >
      <span aria-hidden="true">{dict.locale.switchTo}</span>
    </Link>
  )
}
