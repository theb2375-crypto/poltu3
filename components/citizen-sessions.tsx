'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowUp, ArrowDown } from 'lucide-react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

const SESSIONS = [
  {
    id: 'run-on-ideas',
    title: 'Run on Your Ideas',
    desc: 'Any citizen can file a nomination for a ₹5,000 refundable deposit — so a seat is won on ideas and conviction, not the size of a war chest.',
    video:
      'https://videos.pexels.com/video-files/20613696/20613696-hd_1280_720_30fps.mp4',
    alt: 'A busy street in an Indian city, alive with people, stalls and rickshaws',
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
  const [direction, setDirection] = useState(1)

  const go = useCallback((dir: number) => {
    setDirection(dir)
    setIndex((i) => (i + dir + SESSIONS.length) % SESSIONS.length)
  }, [])

  // Jump straight to a dispatch by tapping its thumbnail
  const select = useCallback(
    (i: number) => {
      setDirection(i >= index ? 1 : -1)
      setIndex(i)
    },
    [index],
  )

  // Gentle auto-rotation
  useEffect(() => {
    if (prefersReducedMotion) return
    const t = setInterval(() => go(1), 9000)
    return () => clearInterval(t)
  }, [go, prefersReducedMotion])

  const s = SESSIONS[index]

  return (
    <section
      id="sessions"
      aria-labelledby="sessions-heading"
      className="relative overflow-hidden border-t border-border py-24 md:py-36"
    >
      {/* Warm stage glow behind everything — kept inside the section so the
          site background/theme stays untouched */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.06] blur-[140px]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 md:grid-cols-[1.25fr_0.85fr] md:gap-10 md:px-8">
        {/* Floating video card */}
        <div className="relative flex justify-center [perspective:1200px] md:justify-end md:pr-4">
          {/* Ghost frame drifting behind */}
          <motion.div
            aria-hidden="true"
            className="absolute -right-2 -top-10 hidden h-40 w-56 rounded-xl border border-border bg-card/60 blur-[2px] md:block"
            animate={
              prefersReducedMotion ? undefined : { y: [0, -12, 0], rotate: [2, 4, 2] }
            }
            transition={{ duration: 11, ease: 'easeInOut', repeat: Infinity }}
          />
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.figure
              key={s.id}
              custom={direction}
              initial={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      y: direction * 140,
                      rotateX: direction * -14,
                      scale: 0.92,
                      filter: 'blur(10px)',
                    }
              }
              animate={{
                opacity: 1,
                y: 0,
                rotateX: 0,
                scale: 1,
                filter: 'blur(0px)',
              }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0 }
                  : {
                      opacity: 0,
                      y: direction * -140,
                      rotateX: direction * 12,
                      scale: 0.92,
                      filter: 'blur(10px)',
                    }
              }
              transition={{ duration: 0.75, ease: EASE }}
              className="relative w-full max-w-xl [transform-style:preserve-3d]"
            >
              <motion.div
                animate={
                  prefersReducedMotion
                    ? undefined
                    : { y: [0, -10, 0], rotateZ: [-0.6, 0.6, -0.6] }
                }
                transition={{ duration: 9, ease: 'easeInOut', repeat: Infinity }}
                className="relative overflow-hidden rounded-2xl border border-border shadow-[0_50px_120px_-30px_rgba(0,0,0,0.85)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-black">
                  {/* Real rolling footage */}
                  <video
                    key={s.video}
                    src={s.video}
                    muted
                    autoPlay
                    loop
                    playsInline
                    preload="metadata"
                    aria-label={s.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10"
                  />
                  {/* Cinematic light sweep */}
                  {!prefersReducedMotion && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-y-0 w-1/3 -skew-x-12 bg-white/[0.05]"
                      animate={{ left: ['-40%', '130%'] }}
                      transition={{
                        duration: 6.5,
                        ease: 'easeInOut',
                        repeat: Infinity,
                        repeatDelay: 2.5,
                      }}
                    />
                  )}
                </div>
              </motion.div>
            </motion.figure>
          </AnimatePresence>
        </div>

        {/* Story copy + navigation */}
        <div className="relative text-center md:text-left">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.18em] text-primary [text-shadow:0_1px_12px_rgba(0,0,0,0.6)]">
            What We're Building
          </p>
          <div className="min-h-[220px] md:min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={s.id}
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: direction * 36, filter: 'blur(8px)' }
                }
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: direction * -28, filter: 'blur(6px)' }
                }
                transition={{ duration: 0.55, ease: EASE }}
              >
                <h2
                  id="sessions-heading"
                  className="text-balance text-5xl font-extrabold leading-[1.02] tracking-tight [text-shadow:0_2px_28px_rgba(0,0,0,0.65)] md:text-6xl lg:text-7xl"
                >
                  {s.title}
                </h2>
                <p className="mx-auto mt-6 max-w-md text-pretty text-base leading-relaxed text-muted-foreground [text-shadow:0_1px_12px_rgba(0,0,0,0.7)] md:mx-0 md:text-lg">
                  {s.desc}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex flex-col items-center gap-8 md:items-start">
            <Link
              href="#how"
              className="group inline-flex items-center gap-1 text-lg font-bold text-foreground underline underline-offset-8 transition-colors hover:text-primary"
            >
              See how it works
            </Link>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous citizen session"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-foreground text-background transition-transform hover:scale-105 active:scale-95"
              >
                <ArrowUp className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next citizen session"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-foreground text-background transition-transform hover:scale-105 active:scale-95"
              >
                <ArrowDown className="h-5 w-5" aria-hidden="true" />
              </button>
              <span className="ml-2 font-mono text-xs tabular-nums text-muted-foreground">
                {String(index + 1).padStart(2, '0')} /{' '}
                {String(SESSIONS.length).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tap-to-choose strip — pick any dispatch, in any order */}
      <div className="relative mx-auto mt-14 flex max-w-3xl flex-wrap items-center justify-center gap-3 px-5 md:mt-16 md:gap-4">
        {SESSIONS.map((session, i) => (
          <button
            key={session.id}
            type="button"
            onClick={() => select(i)}
            aria-label={`Show: ${session.title}`}
            aria-pressed={i === index}
            className={`group relative aspect-video w-28 shrink-0 overflow-hidden rounded-xl border transition-all duration-300 sm:w-36 md:w-40 ${
              i === index
                ? 'border-primary opacity-100 shadow-[0_14px_34px_-12px_rgba(52,224,161,0.55)] ring-2 ring-primary/60'
                : 'border-border opacity-55 hover:opacity-100'
            }`}
          >
            <video
              src={`${session.video}#t=1`}
              muted
              playsInline
              preload="metadata"
              aria-hidden="true"
              className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                i === index ? '' : 'grayscale group-hover:grayscale-0'
              }`}
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent"
            />
            <span className="absolute inset-x-2 bottom-1.5 truncate text-left text-[10px] font-bold uppercase tracking-wide text-white/95 md:text-[11px]">
              {session.title}
            </span>
          </button>
        ))}
      </div>
    </section>
  )
}
