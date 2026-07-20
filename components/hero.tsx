'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  IndianRupee,
  BadgeCheck,
  Users,
  ReceiptText,
} from 'lucide-react'
import dynamic from 'next/dynamic'
import { AnimatedText } from '@/components/animated-text'
import { StatCounter } from '@/components/stat-counter'
import { HeroGrid } from '@/components/hero-grid'
import { Magnetic } from '@/components/magnetic'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

// Loaded lazily so three.js/react-three-fiber stay out of the initial
// bundle — the aurora is decorative and can fade in a beat later.
const HeroShader = dynamic(
  () => import('@/components/hero-shader').then((m) => m.HeroShader),
  { ssr: false },
)

const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: 'blur(6px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: EASE, delay: 0.1 + i * 0.12 },
  }),
}

/* Deterministic pseudo-random particles so SSR + client markup match */
const PARTICLES = Array.from({ length: 14 }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280
  const rand = seed / 233280
  return {
    left: 8 + ((i * 61) % 84),
    size: 2 + Math.round(rand * 3),
    delay: (i * 0.9) % 7,
    duration: 6 + ((i * 37) % 50) / 10,
    drift: (rand - 0.5) * 90,
  }
})

/* App notifications that spring out of the phone once it powers on */
const NOTIFICATIONS = [
  {
    icon: IndianRupee,
    label: '₹500 donation received',
    sub: 'from a supporter in Pune',
    left: '2%',
    top: '18%',
    tilt: -4,
    bob: 5.6,
    delay: 2.0,
  },
  {
    icon: BadgeCheck,
    label: 'Candidate verified',
    sub: 'Deposit confirmed · ₹5,000',
    left: '68%',
    top: '10%',
    tilt: 3,
    bob: 6.4,
    delay: 2.35,
  },
  {
    icon: Users,
    label: '128 new supporters',
    sub: 'joined your constituency',
    left: '72%',
    top: '58%',
    tilt: 5,
    bob: 7.2,
    delay: 2.7,
  },
  {
    icon: ReceiptText,
    label: 'Bill approved',
    sub: '62% of donors voted yes',
    left: '0%',
    top: '62%',
    tilt: -6,
    bob: 6.8,
    delay: 3.05,
  },
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const [entranceDone, setEntranceDone] = useState(false)

  useEffect(() => {
    if (prefersReducedMotion) setEntranceDone(true)
  }, [prefersReducedMotion])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Content drifts up + fades slightly as you scroll past the hero
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.3])
  // The hand rises slower than the page for depth, and scales up slightly
  const handY = useTransform(scrollYProgress, [0, 1], [0, -110])
  const handScale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const handRotate = useTransform(scrollYProgress, [0, 1], [0, -5])
  const glowOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  // Pointer tilt + parallax: the hand leans toward and follows the cursor
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const panX = useMotionValue(0)
  const panY = useMotionValue(0)
  const springTiltX = useSpring(tiltX, { stiffness: 120, damping: 18 })
  const springTiltY = useSpring(tiltY, { stiffness: 120, damping: 18 })
  const springPanX = useSpring(panX, { stiffness: 80, damping: 20 })
  const springPanY = useSpring(panY, { stiffness: 80, damping: 20 })

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    tiltY.set(px * 22)
    tiltX.set(-py * 16)
    panX.set(px * 34)
    panY.set(py * 22)
  }

  function handlePointerLeave() {
    tiltX.set(0)
    tiltY.set(0)
    panX.set(0)
    panY.set(0)
  }

  const motionStyle = (style: object) =>
    prefersReducedMotion ? undefined : style

  return (
    <section ref={ref} className="relative overflow-hidden pt-16">
      {/* Custom WebGL aurora shader — brand-green ink light behind the hero */}
      <HeroShader />
      {/* 3D perspective floor grid scrolling toward the horizon */}
      <HeroGrid />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/10 blur-[160px]"
      />
      {/* Rising ember particles */}
      {!prefersReducedMotion && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-full"
        >
          {PARTICLES.map((p, i) => (
            <span
              key={i}
              className="absolute bottom-0 rounded-full bg-primary/60 animate-[particle-rise_var(--dur)_linear_infinite]"
              style={
                {
                  left: `${p.left}%`,
                  width: p.size,
                  height: p.size,
                  animationDelay: `${p.delay}s`,
                  '--dur': `${p.duration}s`,
                  '--drift': `${p.drift}px`,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}
      {/* Left-side scrim: keeps hero copy readable against newspaper headlines */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-full w-full bg-gradient-to-r from-background/80 via-background/40 to-transparent md:w-[70%]"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-16 md:px-8 md:pb-28 md:pt-24 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          className="flex flex-col items-start"
          style={motionStyle({ y: contentY, opacity: contentOpacity })}
          initial={prefersReducedMotion ? undefined : 'hidden'}
          animate={prefersReducedMotion ? undefined : 'visible'}
        >
          <motion.p
            custom={0}
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent-foreground"
          >
            <span
              className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary"
              aria-hidden="true"
            />
            Launching soon
          </motion.p>
          <AnimatedText
            as="h1"
            text="Democracy, reimagined for every citizen."
            highlight={['reimagined']}
            stagger={0.09}
            delay={0.25}
            className="text-balance text-5xl font-extrabold leading-[1.05] tracking-tight [text-shadow:0_2px_28px_rgba(0,0,0,0.65)] md:text-6xl lg:text-7xl"
          />
          <motion.p
            custom={2}
            variants={fadeUp}
            className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground [text-shadow:0_1px_12px_rgba(0,0,0,0.75)]"
          >
            Contest elections for a ₹5,000 refundable deposit — not crores.
            Back the candidates you believe in, and track every rupee they
            spend, transparently. We&apos;re launching soon — and won&apos;t stop
            until every citizen, everywhere, can take part.
          </motion.p>
          <motion.div
            custom={3}
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Magnetic strength={0.32}>
              <Link
                href="/app/"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-md bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[0_0_24px_-6px] shadow-primary/50 transition-shadow hover:shadow-[0_0_36px_-4px] hover:shadow-primary/70"
              >
                {/* Light sweep across the button on hover */}
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-white/30 opacity-0 blur-sm transition-all duration-500 group-hover:left-[120%] group-hover:opacity-100"
                />
                Login
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Link>
            </Magnetic>
            <Magnetic strength={0.22}>
              <Link
                href="#problem"
                className="inline-flex items-center gap-2 rounded-md border border-border bg-secondary/50 px-6 py-3.5 text-sm font-semibold text-foreground transition-all duration-300 hover:border-primary/50 hover:bg-secondary"
              >
                See How It Works
              </Link>
            </Magnetic>
          </motion.div>
          <motion.dl
            custom={4}
            variants={fadeUp}
            className="mt-12 grid w-full max-w-md grid-cols-2 gap-6 border-t border-border pt-8"
          >
            <div>
              <dt className="text-xs text-muted-foreground">To contest</dt>
              <dd className="mt-1 text-2xl font-bold tracking-tight">
                <StatCounter value={5000} prefix="₹" />
              </dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">User roles</dt>
              <dd className="mt-1 text-2xl font-bold tracking-tight">
                <StatCounter value={3} />
              </dd>
            </div>
          </motion.dl>
        </motion.div>

        {/* The app, in hand — cinematic rise, power-on flash, sonar rings,
            light sweep, floating idle, and full 3D pointer tracking */}
        <div
          className="relative mx-auto w-full max-w-xl lg:max-w-3xl lg:scale-[1.16] xl:scale-[1.26] [perspective:1200px]"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <motion.div
            aria-hidden="true"
            style={motionStyle({ opacity: glowOpacity })}
            className="absolute inset-8 -z-10 rounded-full bg-primary/20 blur-[90px]"
          />

          {/* Sonar rings rippling out from the phone once it powers on */}
          {entranceDone && !prefersReducedMotion && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[36%] -z-10 -translate-x-1/2 -translate-y-1/2"
            >
              <span className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40 animate-[pulse-ring_3.2s_ease-out_infinite]" />
              <span className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30 animate-[pulse-ring_3.2s_ease-out_1.1s_infinite]" />
              <span className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20 animate-[pulse-ring_3.2s_ease-out_2.2s_infinite]" />
            </div>
          )}

          <motion.div
            style={motionStyle({
              y: handY,
              scale: handScale,
              rotate: handRotate,
              rotateX: springTiltX,
              rotateY: springTiltY,
              x: springPanX,
              translateY: springPanY,
              transformStyle: 'preserve-3d',
            })}
            initial={
              prefersReducedMotion
                ? undefined
                : {
                    opacity: 0,
                    x: 340,
                    y: 90,
                    scale: 0.82,
                    rotate: 14,
                    rotateY: -38,
                    filter: 'blur(16px)',
                  }
            }
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    opacity: 1,
                    x: [340, -26, 12, 0],
                    y: [90, -12, 4, 0],
                    scale: [0.82, 1.04, 0.99, 1],
                    rotate: [14, -4, 1.5, 0],
                    rotateY: [-38, 6, -2, 0],
                    filter: 'blur(0px)',
                  }
            }
            transition={{
              duration: 1.6,
              ease: EASE,
              delay: 0.35,
              times: [0, 0.6, 0.84, 1],
            }}
            onAnimationComplete={() => setEntranceDone(true)}
            className="relative"
          >
            <div
              className={
                prefersReducedMotion
                  ? undefined
                  : 'animate-[float-slow_7s_ease-in-out_infinite]'
              }
            >
              {/* Wrist sway: the whole hand pivots gently from the wrist,
                  anchored where the arm enters the frame (bottom-left) */}
              <div
                className={
                  prefersReducedMotion
                    ? undefined
                    : 'origin-[32%_98%] animate-[hand-sway_9s_ease-in-out_infinite]'
                }
              >
                <div
                  className={`relative ${
                    prefersReducedMotion
                      ? ''
                      : 'animate-[hand-grip_4.5s_ease-in-out_infinite]'
                  }`}
                >
                  <Image
                    src="/images/hero-hand-phone-realistic-cutout.png"
                    alt="A photorealistic hand holding a phone showing the PoltuReform app splash screen — Democracy, Reimagined"
                    width={880}
                    height={880}
                    priority
                    className="h-auto w-full drop-shadow-[0_24px_48px_rgba(0,0,0,0.55)]"
                  />
                  {/* Ambient screen glow spilling onto the fingers */}
                  {entranceDone && !prefersReducedMotion && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-[50%] top-[45%] -z-10 h-[52%] w-[38%] rounded-[3rem] bg-primary/25 blur-3xl animate-[screen-glow_5s_ease-in-out_infinite]"
                    />
                  )}
                  {/* Thumb-tap ripple pulsing from the center of the screen */}
                  {entranceDone && !prefersReducedMotion && (
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute left-[49%] top-[42%] h-16 w-16 rounded-full border-solid border-primary/70 animate-[tap-ripple_2.8s_ease-out_infinite]"
                    />
                  )}
                </div>
              </div>

              {/* Power-on flash: the screen "boots" right as the hand lands */}
              {!prefersReducedMotion && (
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-[48%] top-[33%] h-56 w-40 -translate-x-1/2 -translate-y-1/2 rounded-[2.5rem] bg-primary/50 blur-2xl"
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: [0, 0.9, 0], scale: [0.6, 1.15, 1.3] }}
                  transition={{ duration: 1.1, delay: 1.35, ease: 'easeOut' }}
                />
              )}
            </div>

            {/* Live app notifications popping out of the phone with spring physics */}
            {entranceDone && !prefersReducedMotion && (
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden sm:block">
                {NOTIFICATIONS.map((n) => (
                  <motion.div
                    key={n.label}
                    initial={{ opacity: 0, scale: 0.4, x: 0, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 14,
                      mass: 0.9,
                      delay: n.delay,
                    }}
                    style={
                      {
                        left: n.left,
                        top: n.top,
                        '--tilt': `${n.tilt}deg`,
                      } as React.CSSProperties
                    }
                    className="absolute"
                  >
                    <div
                      className="flex items-center gap-2.5 rounded-xl border border-primary/25 bg-card/90 px-3.5 py-2.5 shadow-[0_8px_32px_-8px_rgba(52,224,161,0.35)] backdrop-blur-md animate-[card-bob_var(--bob,6s)_ease-in-out_infinite]"
                      style={{ '--bob': `${n.bob}s` } as React.CSSProperties}
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm">
                        <n.icon className="h-3.5 w-3.5 text-primary" />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-xs font-semibold leading-tight text-foreground">
                          {n.label}
                        </span>
                        <span className="text-[10px] leading-tight text-muted-foreground">
                          {n.sub}
                        </span>
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Breathing floor shadow that grounds the floating hand */}
            {!prefersReducedMotion && (
              <span
                aria-hidden="true"
                className="absolute -bottom-6 left-1/2 h-8 w-3/5 -translate-x-1/2 rounded-[100%] bg-black/70 blur-xl animate-[shadow-breathe_7s_ease-in-out_infinite]"
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
