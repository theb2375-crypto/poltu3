'use client'

import { useRef } from 'react'
import Image from 'next/image'
import {
  FileCheck,
  MessagesSquare,
  HandCoins,
  ReceiptText,
  Newspaper,
  Landmark,
} from 'lucide-react'
import { SectionHeader } from '@/components/section-header'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

const STEPS = [
  {
    icon: FileCheck,
    step: '01',
    tag: 'Contest',
    title: 'Anyone can stand for election',
    desc: 'A young graduate with ideas — not crores — applies with ID proof and a refundable ₹5,000 seriousness deposit. Eligibility and capability decide who gets on the ballot.',
    img: '/steps/step-contest.png',
    alt: 'A young Indian graduate filling an election nomination form on a phone',
    points: ['₹5,000 refundable deposit', 'Full candidate detail disclosure', 'Verified by the platform'],
  },
  {
    icon: MessagesSquare,
    step: '02',
    tag: 'Discuss',
    title: 'Debate ideas, form parties',
    desc: 'Citizens discuss politics openly, share ideas for the nation, and form political parties around ideology — with the general public as the stakeholders, not big business.',
    img: '/steps/step-discuss.png',
    alt: 'Young Indian citizens discussing politics together at a chai stall',
    points: ['Constituency-level forums', 'Form parties around ideas', 'Stored candidate interviews'],
  },
  {
    icon: HandCoins,
    step: '03',
    tag: 'Fund',
    title: 'The people become the stakeholders',
    desc: 'Supporters fund candidates and influencers directly. Transparent sharing plans — 80-20 for newcomers, 50-50 for established voices, 50-30-20 for ideology backers.',
    img: '/steps/step-donate.png',
    alt: 'Many hands holding phones showing donation confirmations',
    points: ['Newcomers keep 80%', 'Influencers redirect support', 'Ads boost reach in your constituency'],
  },
  {
    icon: ReceiptText,
    step: '04',
    tag: 'Verify',
    title: 'Every rupee is donor-approved',
    desc: 'Funds never move silently. Candidates declare intended use, 50% of donors must approve it, and every bill is uploaded as proof — approved again before the next spend.',
    img: '/steps/step-transparency.png',
    alt: 'A phone showing an expense bill approved by donors',
    points: ['50% donor approval to spend', 'Bills uploaded as proof', 'Full public audit trail'],
  },
  {
    icon: Newspaper,
    step: '05',
    tag: 'Print',
    title: 'Free press, delivered to every door',
    desc: 'A share of donations powers a printing press. Daily newspapers and weekly magazines carry candidate ideas — distributed free, collected back monthly for recycling.',
    img: '/images/vision-press.png',
    alt: 'A printing press producing free newspapers and magazines',
    points: ['10–20% of donations fund it', 'Reader opinion columns', 'Collected & recycled monthly'],
  },
  {
    icon: Landmark,
    step: '06',
    tag: 'Assemble',
    title: 'Auditoriums, posters, equal airtime',
    desc: 'City-wide posters rotate a different candidate daily. Purpose-built auditoriums let every candidate address the public — equal opportunity, by design.',
    img: '/images/vision-auditorium.png',
    alt: 'A public auditorium where candidates address citizens',
    points: ['Rotating city banners', 'Public town-hall auditoriums', 'Software clubs at IITs'],
  },
]

/* Each step's image card gets its own physics personality:
   01 stamps down like an approved form, 02 swings in like a chat bubble,
   03 pops like a coin, 04 flips like a verified receipt,
   05 slides off the press, 06 rises like a stage curtain. */
const CARD_PHYSICS = [
  {
    initial: { opacity: 0, y: -140, rotate: -7, scale: 0.92 },
    inView: { opacity: 1, y: 0, rotate: 0, scale: 1 },
    transition: { type: 'spring' as const, stiffness: 260, damping: 13, mass: 1 },
  },
  {
    initial: { opacity: 0, x: 120, rotate: 10, transformPerspective: 900 },
    inView: { opacity: 1, x: 0, rotate: 0 },
    transition: { type: 'spring' as const, stiffness: 110, damping: 10, mass: 1.2 },
  },
  {
    initial: { opacity: 0, scale: 0.4, rotate: -12 },
    inView: { opacity: 1, scale: 1, rotate: 0 },
    transition: { type: 'spring' as const, stiffness: 320, damping: 12, mass: 0.8 },
  },
  {
    initial: { opacity: 0, rotateY: 85, transformPerspective: 1000, scale: 0.94 },
    inView: { opacity: 1, rotateY: 0, scale: 1 },
    transition: { type: 'spring' as const, stiffness: 90, damping: 14, mass: 1.1 },
  },
  {
    initial: { opacity: 0, x: -170, skewX: 10, scale: 0.96 },
    inView: { opacity: 1, x: 0, skewX: 0, scale: 1 },
    transition: { type: 'spring' as const, stiffness: 130, damping: 15, mass: 1.2 },
  },
  {
    initial: { opacity: 0, y: 150, scale: 0.9, transformPerspective: 900, rotateX: 18 },
    inView: { opacity: 1, y: 0, scale: 1, rotateX: 0 },
    transition: { type: 'spring' as const, stiffness: 140, damping: 13, mass: 1.1 },
  },
]

function JourneyStep({
  step,
  index,
}: {
  step: (typeof STEPS)[number]
  index: number
}) {
  const prefersReducedMotion = useReducedMotion()
  const flip = index % 2 === 1
  const Icon = step.icon
  const physics = CARD_PHYSICS[index % CARD_PHYSICS.length]

  return (
    <li className="relative grid items-center gap-8 md:grid-cols-2 md:gap-14">
      {/* Timeline node: springs in with a bounce when the step scrolls into view */}
      <motion.span
        aria-hidden="true"
        initial={prefersReducedMotion ? undefined : { scale: 0, rotate: -90 }}
        whileInView={prefersReducedMotion ? undefined : { scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: '-20% 0px' }}
        transition={{ type: 'spring', stiffness: 380, damping: 15 }}
        className="absolute left-1/2 top-1/2 z-10 hidden h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/40 bg-background shadow-[0_0_28px_-4px] shadow-primary/50 md:flex"
      >
        <Icon className="h-5 w-5 text-primary" />
      </motion.span>

      {/* Image card */}
      <motion.figure
        initial={prefersReducedMotion ? undefined : physics.initial}
        whileInView={prefersReducedMotion ? undefined : physics.inView}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={physics.transition}
        className={`group relative ${flip ? 'md:order-2 md:pl-14' : 'md:pr-14'}`}
      >
        <div className="relative overflow-hidden rounded-2xl border border-border bg-secondary shadow-2xl transition-transform duration-500 [transform-style:preserve-3d] group-hover:-translate-y-2 group-hover:shadow-[0_28px_70px_-20px_rgba(52,224,161,0.3)]">
          <Image
            src={step.img || '/placeholder.svg'}
            alt={step.alt}
            width={720}
            height={540}
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent"
          />
          <span className="absolute bottom-3 left-4 font-mono text-6xl font-black tracking-tighter text-primary/90 [text-shadow:0_2px_24px_rgba(0,0,0,0.8)]">
            {step.step}
          </span>
        </div>
      </motion.figure>

      {/* Copy */}
      <motion.div
        initial={
          prefersReducedMotion ? undefined : { opacity: 0, x: flip ? -60 : 60 }
        }
        whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ duration: 0.7, ease: EASE, delay: 0.12 }}
        className={flip ? 'md:order-1 md:pr-14 md:text-right' : 'md:pl-14'}
      >
        <p
          className={`mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-accent px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-foreground ${
            flip ? 'md:flex-row-reverse' : ''
          }`}
        >
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          {step.tag}
        </p>
        <h3 className="text-balance text-2xl font-bold tracking-tight md:text-3xl">
          {step.title}
        </h3>
        <p className="mt-3 text-pretty leading-relaxed text-muted-foreground">
          {step.desc}
        </p>
        <ul
          className={`mt-5 flex flex-col gap-2.5 ${flip ? 'md:items-end' : ''}`}
        >
          {step.points.map((p, i) => (
            <motion.li
              key={p}
              initial={prefersReducedMotion ? undefined : { opacity: 0, y: 14 }}
              whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 20,
                delay: 0.25 + i * 0.1,
              }}
              className={`flex items-center gap-2.5 text-sm ${
                flip ? 'md:flex-row-reverse' : ''
              }`}
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
              />
              {p}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </li>
  )
}

export function Journey() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 70%', 'end 65%'],
  })
  const rawProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
  })
  const lineScale = useTransform(rawProgress, [0, 1], [0, 1])

  return (
    <section
      id="journey"
      className="relative border-t border-border py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader
          label="The Blueprint"
          title={'\u201CWhen money stops deciding elections, ideas start winning.\u201D'}
          sub="Six steps to make it real — contest, discuss, fund, verify, print, assemble."
        />

        <div ref={ref} className="relative mt-20">
          {/* Scroll-drawn timeline spine with a glowing tip */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-border md:block"
          />
          {!prefersReducedMotion && (
            <motion.div
              aria-hidden="true"
              style={{ scaleY: lineScale }}
              className="absolute left-1/2 top-0 hidden h-full w-[3px] origin-top -translate-x-1/2 rounded-full bg-gradient-to-b from-primary via-primary to-primary/20 shadow-[0_0_16px_0] shadow-primary/60 md:block"
            />
          )}

          <ol className="flex flex-col gap-20 md:gap-28">
            {STEPS.map((s, i) => (
              <JourneyStep key={s.step} step={s} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
