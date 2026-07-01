'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { AnimatedText } from '@/components/animated-text'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: EASE, delay: 0.1 + i * 0.12 },
  }),
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Text content drifts up + fades slightly as you scroll past the hero
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.3])

  const motionStyle = (style: object) =>
    prefersReducedMotion ? undefined : style

  return (
    <section ref={ref} className="relative overflow-hidden pt-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[90%] max-w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[160px] sm:h-[600px]"
      />
      {/* Left-side scrim: keeps hero copy readable against newspaper headlines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-full w-full bg-gradient-to-r from-background/80 via-background/40 to-transparent md:w-[70%]"
      />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 pb-16 pt-12 sm:gap-14 sm:pb-20 sm:pt-16 md:px-8 md:pb-28 md:pt-24 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          className="flex flex-col items-start"
          style={motionStyle({ y: contentY, opacity: contentOpacity })}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          animate={prefersReducedMotion ? undefined : 'visible'}
        >
          <motion.p
            custom={0}
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-foreground sm:mb-6"
          >
            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary"
              aria-hidden="true"
            />
            Beta launching in 5 cities
          </motion.p>
          <AnimatedText
            as="h1"
            text="Democracy, reimagined for every citizen."
            highlight={['reimagined']}
            stagger={0.09}
            delay={0.25}
            className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight [text-shadow:0_2px_28px_rgba(0,0,0,0.65)] sm:text-5xl sm:leading-[1.05] md:text-6xl lg:text-7xl"
          />
          <motion.p
            custom={2}
            variants={fadeUp}
            className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground [text-shadow:0_1px_12px_rgba(0,0,0,0.75)] sm:mt-6 sm:text-lg"
          >
            Contest elections for a ₹5,000 refundable deposit — not crores.
            Back the candidates you believe in, and track every rupee they
            spend, transparently.
          </motion.p>
          <motion.div
            custom={3}
            variants={fadeUp}
            className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8"
          >
            <Link
              href="#waitlist"
              className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 sm:px-6 sm:py-3.5"
            >
              Get Early Access
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="#problem"
              className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/50 px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary sm:px-6 sm:py-3.5"
            >
              See How It Works
            </Link>
          </motion.div>
          <motion.dl
            custom={4}
            variants={fadeUp}
            className="mt-10 grid w-full max-w-md grid-cols-3 gap-4 border-t border-border pt-7 sm:mt-12 sm:gap-6 sm:pt-8"
          >
            <div>
              <dt className="text-xs text-muted-foreground">To contest</dt>
              <dd className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">
                ₹5,000
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">App screens</dt>
              <dd className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">22+</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">User roles</dt>
              <dd className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">3</dd>
            </div>
          </motion.dl>
        </motion.div>

        {/* Phone screens: entrance animation only, no scroll parallax — stays fixed while scrolling */}
        <div className="relative mx-auto hidden w-full max-w-sm lg:block">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 rounded-full bg-primary/15 blur-3xl"
          />
          <div className="relative flex justify-center">
            <motion.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 60, rotate: -10 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, rotate: -4 }}
              transition={{ duration: 1, ease: EASE, delay: 0.4 }}
              className="w-56 rotate-[-4deg] overflow-hidden rounded-[2rem] border border-border shadow-2xl"
            >
              <Image
                src="/screens/screen-registration.jpg"
                alt="PoltuReform app — candidate registration screen"
                width={420}
                height={840}
                priority
                className="h-auto w-full"
              />
            </motion.div>
            <motion.div
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 80, rotate: 12 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0, rotate: 5 }}
              transition={{ duration: 1, ease: EASE, delay: 0.55 }}
              className="absolute -right-4 top-16 w-56 rotate-[5deg] overflow-hidden rounded-[2rem] border border-border shadow-2xl"
            >
              <Image
                src="/screens/screen-donations.jpg"
                alt="PoltuReform app — donations and transparency screen"
                width={420}
                height={840}
                priority
                className="h-auto w-full"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
