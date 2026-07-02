'use client'

import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from 'framer-motion'

/**
 * A card that tilts in 3D toward the cursor with a moving spotlight glow
 * that follows the pointer across its surface.
 */
export function TiltCard({
  children,
  className,
  maxTilt = 8,
}: {
  children: React.ReactNode
  className?: string
  maxTilt?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRX = useSpring(rotateX, { stiffness: 200, damping: 20 })
  const springRY = useSpring(rotateY, { stiffness: 200, damping: 20 })
  const spotX = useMotionValue(50)
  const spotY = useMotionValue(50)
  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${spotX}% ${spotY}%, oklch(0.72 0.11 175 / 0.12), transparent 70%)`

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (prefersReducedMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rotateY.set((px - 0.5) * maxTilt * 2)
    rotateX.set(-(py - 0.5) * maxTilt * 2)
    spotX.set(px * 100)
    spotY.set(py * 100)
  }

  function handlePointerLeave() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <div className="[perspective:900px]">
      <motion.div
        ref={ref}
        className={className}
        style={
          prefersReducedMotion
            ? undefined
            : {
                rotateX: springRX,
                rotateY: springRY,
                transformStyle: 'preserve-3d',
              }
        }
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {!prefersReducedMotion && (
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: spotlight }}
          />
        )}
        {children}
      </motion.div>
    </div>
  )
}
