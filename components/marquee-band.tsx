'use client'

import { useRef } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'

const items = [
  '₹5,000 to contest',
  'Donor-approved spending',
  'Equal visibility for all',
  'People-funded parties',
  'Free print reach',
  'ID-verified candidates',
  'Transparent, rupee by rupee',
]

/**
 * A scrolling ticker band between sections. The strip drifts continuously
 * and its horizontal speed is nudged by scroll for a tactile feel.
 */
export function MarqueeBand() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])

  const strip = (ariaHidden: boolean) => (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 animate-[marquee_38s_linear_infinite] items-center"
    >
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-6 whitespace-nowrap pr-6 text-sm font-semibold uppercase tracking-[0.18em] text-muted-foreground"
        >
          {item}
          <span
            className="h-1.5 w-1.5 rounded-full bg-primary"
            aria-hidden="true"
          />
        </li>
      ))}
    </ul>
  )

  return (
    <div
      ref={ref}
      className="relative overflow-hidden border-y border-border bg-card/50 py-5"
    >
      <motion.div
        style={prefersReducedMotion ? undefined : { x }}
        className="flex w-max"
      >
        {strip(false)}
        {strip(true)}
        {strip(true)}
      </motion.div>
      {/* Edge fades */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent"
      />
    </div>
  )
}
