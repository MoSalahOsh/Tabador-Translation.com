'use client'

import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'
import { useEffect, useState } from 'react'

type Props = {
  dict: { theme: { light: string; dark: string; toggle: string } }
}

export function ThemeToggle({ dict }: Props) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  if (!mounted) return <div className="w-9 h-9" />

  const isDark = theme === 'dark'
  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="p-2 rounded-md text-foreground/70 hover:bg-muted hover:text-foreground transition-colors"
      aria-label={dict.theme.toggle}
      title={isDark ? dict.theme.light : dict.theme.dark}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
