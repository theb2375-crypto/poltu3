'use client'

import { useRef, type ReactNode } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
} from 'framer-motion'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'

const EASE = [0.22, 1, 0.36, 1] as const

function makeVariants(direction: Direction, distance: number): Variants {
  const offsets: Record<Direction, { x: number; y: number }> = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  }
  const { x, y } = offsets[direction]
  return {
    hidden: { opacity: 0, x, y, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: EASE },
    },
  }
}

/**
 * Reveals children with a cinematic fade + slide + de-blur when scrolled into view.
 */
export function ScrollReveal({
  children,
  direction = 'up',
  distance = 48,
  delay = 0,
  className,
  once = true,
}: {
  children: ReactNode
  direction?: Direction
  distance?: number
  delay?: number
  className?: string
  once?: boolean
}) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  const variants = makeVariants(direction, distance)
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2, margin: '0px 0px -80px 0px' }}
      variants={variants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Staggers reveals of direct children.
 */
export function ScrollRevealGroup({
  children,
  className,
  stagger = 0.12,
}: {
  children: ReactNode
  className?: string
  stagger?: number
}) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -60px 0px' }}
      transition={{ staggerChildren: stagger }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  )
}

export function ScrollRevealItem({
  children,
  className,
  direction = 'up',
  distance = 40,
}: {
  children: ReactNode
  className?: string
  direction?: Direction
  distance?: number
}) {
  return (
    <motion.div className={className} variants={makeVariants(direction, distance)}>
      {children}
    </motion.div>
  )
}

/**
 * Wraps a section and applies a gentle parallax drift as it moves through
 * the viewport — content lags slightly behind the scroll for depth.
 */
export function ParallaxSection({
  children,
  className,
  strength = 60,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [strength, -strength])

  if (prefersReducedMotion) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    )
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
