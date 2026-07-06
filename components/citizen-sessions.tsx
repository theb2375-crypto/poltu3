'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const
const ROTATE_MS = 9000

const SESSIONS = [
  {
    id: 'run-on-ideas',
    title: 'Run on Your Ideas',
    desc: 'Any citizen can file a nomination for a ₹5,000 refundable deposit — so a seat is won on ideas and conviction, not the size of a war chest.',
    video:
      'https://videos.pexels.com/video-files/29883592/12829637_1920_1080_30fps.mp4',
    alt: 'A young Indian man speaking into a microphone at a community event',
  },
  {
    id: 'funded-by-many',
    title: 'Funded by Many',
    desc: 'Campaigns powered by thousands of small donations — every rupee tracked, and every expense approved by the people who gave it.',
    video:
      'https://videos.pexels.com/video-files/33998875/14422586_1920_1080_25fps.mp4',
    alt: 'An aerial view of a vast crowd of people gathered together in India',
  },
  {
    id: 'a-free-press',
    title: 'A Free Press',
    desc: 'Donation-powered newspapers and magazines, delivered free — bringing local candidates and the issues that matter to every doorstep.',
    video:
      'https://videos.pexels.com/video-files/3936483/3936483-hd_1280_720_30fps.mp4',
    alt: 'A printing press rolling out fresh pages',
  },
  {
    id: 'an-equal-stage',
    title: 'An Equal Stage',
    desc: 'Purpose-built town halls where every candidate gets the same platform and the same minutes. Equal airtime, by design — not by luck.',
    video:
      'https://videos.pexels.com/video-files/20201541/20201541-hd_1280_720_30fps.mp4',
    alt: 'An aerial view of a village festival gathering in India',
  },
] as const

export function CitizenSessions() {
  const prefersReducedMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  const select = useCallback((i: number) => {
    setIndex(i % SESSIONS.length)
  }, [])

  // Auto-advance; restarts whenever the visitor picks a clip themselves
  useEffect(() => {
    if (prefersReducedMotion) return
    const t = setTimeout(() => setIndex((i) => (i + 1) % SESSIONS.length), ROTATE_MS)
    return () => clearTimeout(t)
  }, [index, prefersReducedMotion])

  const s = SESSIONS[index]

  return (
    <section
      id="sessions"
      aria-labelledby="sessions-heading"
      className="relative flex min-h-[92svh] flex-col justify-end overflow-hidden border-t border-border"
    >
      {/* Full-bleed rolling footage, crossfading between dispatches */}
      <div aria-hidden="true" className="absolute inset-0 bg-black">
        <AnimatePresence initial={false}>
          <motion.div
            key={s.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 1.1, ease: 'easeInOut' }}
          >
            <motion.video
              src={s.video}
              muted
              autoPlay
              loop
              playsInline
              preload="metadata"
              aria-label={s.alt}
              className="h-full w-full object-cover"
              animate={
                prefersReducedMotion ? undefined : { scale: [1, 1.07] }
              }
              transition={{ duration: ROTATE_MS / 1000 + 2, ease: 'linear' }}
            />
          </motion.div>
        </AnimatePresence>
        {/* Scrim: bottom-heavy on mobile (copy sits low), left-heavy on desktop,
            always blending into the page at the top/bottom edges */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-background/95 via-background/40 to-background/10 md:block" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/25 md:bg-gradient-to-t md:from-background md:via-transparent md:to-background/70" />
      </div>

      {/* Story copy */}
      <div className="relative mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-5 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
        <p className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-primary">
          What We're Building
        </p>
        <div className="min-h-[240px] md:min-h-[280px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={s.id}
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 36, filter: 'blur(8px)' }
              }
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: -24, filter: 'blur(6px)' }
              }
              transition={{ duration: 0.55, ease: EASE }}
            >
              <h2
                id="sessions-heading"
                className="max-w-2xl text-balance text-5xl font-extrabold leading-[1.02] tracking-tight [text-shadow:0_2px_28px_rgba(0,0,0,0.65)] md:text-6xl lg:text-7xl"
              >
                {s.title}
              </h2>
              <p className="mt-6 max-w-md text-pretty text-base leading-relaxed text-foreground/85 [text-shadow:0_1px_12px_rgba(0,0,0,0.7)] md:text-lg">
                {s.desc}
              </p>
              <Link
                href="#how"
                className="group mt-8 inline-flex items-center gap-1 text-lg font-bold text-foreground underline underline-offset-8 transition-colors hover:text-primary"
              >
                See how it works
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Filmstrip tabs — pick any dispatch; the bar shows time to the next one */}
      <div className="relative mx-auto w-full max-w-6xl px-5 pb-8 md:px-8 md:pb-10">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
          {SESSIONS.map((session, i) => (
            <button
              key={session.id}
              type="button"
              onClick={() => select(i)}
              aria-label={`Show: ${session.title}`}
              aria-pressed={i === index}
              className={`group relative overflow-hidden rounded-lg border px-3 pb-3 pt-4 text-left backdrop-blur-md transition-colors duration-300 md:px-4 ${
                i === index
                  ? 'border-primary/60 bg-background/55'
                  : 'border-border/60 bg-background/30 hover:border-border hover:bg-background/50'
              }`}
            >
              {/* Auto-advance progress bar along the top edge */}
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-0.5 bg-border/50"
              />
              {i === index && (
                <motion.span
                  key={s.id}
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-0.5 bg-primary"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{
                    duration: prefersReducedMotion ? 0 : ROTATE_MS / 1000,
                    ease: 'linear',
                  }}
                />
              )}
              <span className="block font-mono text-[10px] tabular-nums text-muted-foreground">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className={`mt-1 block truncate text-xs font-bold uppercase tracking-wide transition-colors md:text-[13px] ${
                  i === index
                    ? 'text-foreground'
                    : 'text-muted-foreground group-hover:text-foreground'
                }`}
              >
                {session.title}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
