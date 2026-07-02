'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion, animate } from 'framer-motion'

/**
 * Counts up from 0 to `value` when scrolled into view.
 * Supports optional prefix/suffix (e.g. "₹5,000", "22+").
 */
export function StatCounter({
  value,
  prefix = '',
  suffix = '',
  className,
  duration = 1.6,
}: {
  value: number
  prefix?: string
  suffix?: string
  className?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' })
  const prefersReducedMotion = useReducedMotion()
  const [display, setDisplay] = useState(prefersReducedMotion ? value : 0)

  useEffect(() => {
    if (!inView || prefersReducedMotion) return
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, duration, prefersReducedMotion])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString('en-IN')}
      {suffix}
    </span>
  )
}
