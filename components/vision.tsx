'use client'

import { useRef } from 'react'
import Image from 'next/image'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { SectionHeader } from '@/components/section-header'

const EASE = [0.22, 1, 0.36, 1] as const

const panels = [
  {
    src: '/images/vision-voters.png',
    alt: 'Young Indian citizens proudly showing ink-marked fingers after voting',
    label: 'The Voters',
    caption: 'Every citizen becomes a stakeholder — not a spectator.',
  },
  {
    src: '/images/vision-auditorium.png',
    alt: 'A young candidate addressing citizens in a public auditorium',
    label: 'The Candidates',
    caption: 'Public auditoriums where ideas — not money — win the room.',
  },
  {
    src: '/images/vision-press.png',
    alt: 'A printing press producing free newspapers at night',
    label: 'The Press',
    caption: 'Free newspapers and magazines carry every voice, door to door.',
  },
]

/**
 * A single panel: the image parallaxes inside a clipped frame while
 * the frame itself un-clips and rises into view.
 */
function VisionPanel({
  panel,
  index,
}: {
  panel: (typeof panels)[number]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // Inner image drifts slower than the frame — classic parallax window
  const imgY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])
  const imgScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.18, 1.08, 1.18])

  return (
    <motion.figure
      ref={ref}
      initial={
        prefersReducedMotion
          ? undefined
          : { opacity: 0, y: 56, clipPath: 'inset(12% 8% 12% 8% round 24px)' }
      }
      whileInView={
        prefersReducedMotion
          ? undefined
          : { opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0% round 24px)' }
      }
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1, ease: EASE, delay: index * 0.12 }}
      className={`group relative overflow-hidden rounded-3xl border border-border bg-card ${
        index === 1 ? 'md:mt-14' : ''
      }`}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <motion.div
          style={prefersReducedMotion ? undefined : { y: imgY, scale: imgScale }}
          className="absolute inset-0"
        >
          <Image
            src={panel.src || '/placeholder.svg'}
            alt={panel.alt}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </motion.div>
        {/* Readability gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/20 to-transparent"
        />
      </div>
      <figcaption className="absolute inset-x-0 bottom-0 p-6">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
          {panel.label}
        </p>
        <p className="mt-2 text-pretty text-base font-medium leading-relaxed">
          {panel.caption}
        </p>
      </figcaption>
    </motion.figure>
  )
}

export function Vision() {
  return (
    <section id="vision" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader
          label="The Movement"
          title="More than an app. A public square."
          sub="Auditoriums, a free press, and a feed where every candidate gets the same spotlight — funded by the people, answerable to the people."
        />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {panels.map((panel, i) => (
            <VisionPanel key={panel.src} panel={panel} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
