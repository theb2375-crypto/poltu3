'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

/**
 * Fixed, parallaxing newspaper texture that sits behind the whole page.
 * The texture drifts slowly upward as you scroll (classic parallax depth),
 * and subtly rotates/scales for a "living paper" feel.
 */
export function NewspaperBackground() {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll()

  // Parallax: background moves slower than content
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 2])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1.12, 1.05])
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.85, 1],
    [0.45, 0.3, 0.3, 0.5],
  )

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <motion.div
        style={
          prefersReducedMotion
            ? { opacity: 0.3 }
            : { y, rotate, scale, opacity }
        }
        className="absolute -inset-[15%] bg-[url('/textures/newspaper-dark.png')] bg-cover bg-center grayscale"
      />
      {/* Vignette + tint so content stays readable */}
      <div className="absolute inset-0 bg-background/40" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,var(--background)_100%)]" />
    </div>
  )
}
