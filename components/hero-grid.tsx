'use client'

import { useReducedMotion } from 'framer-motion'

/**
 * A 3D perspective floor grid that scrolls infinitely toward the horizon,
 * in the brand green — sits at the bottom of the hero for a "tron floor"
 * depth effect behind the hand.
 */
export function HeroGrid() {
  const prefersReducedMotion = useReducedMotion()

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 h-[46%] overflow-hidden [perspective:520px]"
    >
      {/* Extra 56px (one grid cell) above the frame so the transform-based
          pan never exposes a gap at the top edge */}
      <div
        className={`absolute -inset-x-1/4 -bottom-1/4 -top-14 origin-bottom [transform:rotateX(62deg)] ${
          prefersReducedMotion ? '' : 'animate-[grid-pan_2.4s_linear_infinite]'
        }`}
        style={{
          backgroundImage: `
            linear-gradient(to right, oklch(0.72 0.11 175 / 0.16) 1px, transparent 1px),
            linear-gradient(to bottom, oklch(0.72 0.11 175 / 0.16) 1px, transparent 1px)
          `,
          backgroundSize: '56px 56px',
        }}
      />
      {/* Fade the grid into the page so it never fights the content */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
    </div>
  )
}
