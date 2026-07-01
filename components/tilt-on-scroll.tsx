'use client'

import { useRef, type ReactNode } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
} from 'framer-motion'

/**
 * Wraps a section in a subtle 3D perspective tilt:
 * the section rotates in from below (rotateX) and settles flat
 * as it reaches the center of the viewport, then tilts away as it leaves.
 */
export function TiltOnScroll({
  children,
  className,
  intensity = 8,
}: {
  children: ReactNode
  className?: string
  intensity?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const rotateXRaw = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [intensity, 0, 0, -intensity],
  )
  const rotateX = useSpring(rotateXRaw, { stiffness: 120, damping: 26 })
  const scale = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    [0.97, 1, 1, 0.97],
  )

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <div ref={ref} className={className} style={{ perspective: 1200 }}>
      <motion.div
        style={{
          rotateX,
          scale,
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
