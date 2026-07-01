'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: '110%',
    rotateX: -40,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: '0%',
    rotateX: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: EASE },
  },
}

/**
 * Reveals text word-by-word: each word rises out of a clipping mask with a
 * slight 3D tilt and de-blur, like type being pressed onto newsprint.
 *
 * `highlight` words are rendered in the primary color.
 */
export function AnimatedText({
  text,
  highlight = [],
  className,
  as: Tag = 'span',
  stagger = 0.06,
  delay = 0,
  once = true,
}: {
  text: string
  highlight?: string[]
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  stagger?: number
  delay?: number
  once?: boolean
}) {
  const prefersReducedMotion = useReducedMotion()
  const words = text.split(' ')
  const highlightSet = new Set(
    highlight.map((w) => w.toLowerCase().replace(/[.,!?]/g, '')),
  )

  const isHighlighted = (word: string) =>
    highlightSet.has(word.toLowerCase().replace(/[.,!?]/g, ''))

  if (prefersReducedMotion) {
    return (
      <Tag className={className}>
        {words.map((word, i) => (
          <span key={i} className={isHighlighted(word) ? 'text-primary' : undefined}>
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </Tag>
    )
  }

  const MotionTag = motion.create(Tag)

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.5, margin: '0px 0px -40px 0px' }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-baseline"
          style={{ perspective: '600px' }}
        >
          <motion.span
            variants={wordVariants}
            className={`inline-block will-change-transform ${
              isHighlighted(word) ? 'text-primary' : ''
            }`}
          >
            {word}
          </motion.span>
          {i < words.length - 1 ? <span>&nbsp;</span> : null}
        </span>
      ))}
    </MotionTag>
  )
}

/**
 * Simple fade-up for supporting copy (labels, subtitles) with optional delay,
 * so it choreographs after an AnimatedText heading.
 */
export function FadeIn({
  children,
  className,
  delay = 0,
  y = 16,
  once = true,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
}) {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: 'blur(4px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once, amount: 0.5, margin: '0px 0px -40px 0px' }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}
