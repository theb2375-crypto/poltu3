'use client'

import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion'

/**
 * Wraps any element with a "magnetic" hover: the child is gently pulled
 * toward the cursor while hovered, and springs back on leave.
 */
export function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: React.ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 240, damping: 16, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 240, damping: 16, mass: 0.5 })

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  function handlePointerLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={prefersReducedMotion ? undefined : { x: springX, y: springY }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </motion.div>
  )
}
