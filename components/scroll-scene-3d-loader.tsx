'use client'

import dynamic from 'next/dynamic'

export const ScrollScene3DLoader = dynamic(
  () => import('@/components/scroll-scene-3d').then((m) => m.ScrollScene3D),
  { ssr: false },
)
