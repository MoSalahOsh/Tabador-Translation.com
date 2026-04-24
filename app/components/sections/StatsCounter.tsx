'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

type Stat = { value: string; label: string }
type Props = { stats: Stat[] }

function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [display, setDisplay] = useState(value)

  const match = value.match(/^(\d+)(.*)$/)
  const target = match ? parseInt(match[1], 10) : null
  const suffix = match ? match[2] : ''

  useEffect(() => {
    if (!inView || target === null) return
    let start = 0
    const duration = 1400
    const stepTime = Math.max(20, Math.floor(duration / target))
    const increment = Math.max(1, Math.ceil(target / (duration / stepTime)))
    const id = setInterval(() => {
      start += increment
      if (start >= target) {
        setDisplay(`${target}${suffix}`)
        clearInterval(id)
      } else {
        setDisplay(`${start}${suffix}`)
      }
    }, stepTime)
    return () => clearInterval(id)
  }, [inView, target, suffix])

  return <span ref={ref}>{display}</span>
}

export function StatsCounter({ stats }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      {stats.map((stat) => (
        <div key={stat.label} className="space-y-1">
          <p className="text-3xl md:text-4xl font-extrabold text-white">
            <Counter value={stat.value} />
          </p>
          <p className="text-sm text-white/85">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}
