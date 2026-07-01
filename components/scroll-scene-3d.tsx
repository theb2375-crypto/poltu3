'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import * as THREE from 'three'

/* ------------------------------------------------------------------ */
/* Scroll progress (0..1) read directly from the document scroll.      */
/* ------------------------------------------------------------------ */
function useScrollProgress() {
  const progress = useRef(0)
  useFrame(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight
    progress.current = max > 0 ? window.scrollY / max : 0
  })
  return progress
}

/* ------------------------------------------------------------------ */
/* Config for the open newspaper book.                                 */
/* ------------------------------------------------------------------ */
const PAGE_WIDTH = 5.2
const PAGE_HEIGHT = 6.8
const SEGMENTS_X = 32
const SEGMENTS_Y = 8
const NUM_FLIP_PAGES = 6
const TEXTURE_URL = '/textures/newspaper-dark.png'

/* Ease for the flip so pages accelerate then settle like real paper. */
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

/* ------------------------------------------------------------------ */
/* A single turnable page. It is hinged at the spine (x = 0) and       */
/* extends to +x. As `flip` goes 0 → 1 the page rotates over to the    */
/* left side while the paper curls — like a real newspaper page turn.  */
/* ------------------------------------------------------------------ */
function TurnablePage({
  scrollRef,
  index,
  total,
  texture,
}: {
  scrollRef: React.MutableRefObject<number>
  index: number
  total: number
  texture: THREE.Texture
}) {
  const group = useRef<THREE.Group>(null)
  const mesh = useRef<THREE.Mesh>(null)
  const flipRef = useRef(0)

  // Geometry hinged at the spine: x runs 0 → PAGE_WIDTH
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(
      PAGE_WIDTH,
      PAGE_HEIGHT,
      SEGMENTS_X,
      SEGMENTS_Y,
    )
    geo.translate(PAGE_WIDTH / 2, 0, 0)
    return geo
  }, [])

  const basePositions = useMemo(
    () => Float32Array.from(geometry.attributes.position.array),
    [geometry],
  )

  // Each page owns a slice of the scroll range, with a little overlap
  // so turns cascade naturally into each other.
  const sliceStart = index / total
  const sliceEnd = (index + 1.35) / total

  useFrame(() => {
    if (!group.current || !mesh.current) return

    const s = scrollRef.current
    const raw = THREE.MathUtils.clamp(
      (s - sliceStart) / (sliceEnd - sliceStart),
      0,
      1,
    )
    // Smoothly chase the scroll target so fast scrolls still look fluid
    flipRef.current = THREE.MathUtils.lerp(
      flipRef.current,
      easeInOutCubic(raw),
      0.09,
    )
    const flip = flipRef.current

    // Curl strength peaks mid-flip and relaxes flat at rest
    const curl = Math.sin(flip * Math.PI)

    const pos = mesh.current.geometry.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x0 = basePositions[i * 3]
      const y0 = basePositions[i * 3 + 1]
      const u = x0 / PAGE_WIDTH // 0 at spine, 1 at outer edge

      // Rotate each column of vertices around the spine.
      // The outer edge leads the turn slightly (uLead), which bends
      // the paper the way a real page bows while it's being flipped.
      const lead = flip * Math.PI * (1 + 0.35 * curl * u)
      const angle = Math.min(lead, Math.PI)

      const bend = Math.sin(u * Math.PI) * curl * 0.9

      // Position on the arc
      const px = Math.cos(angle) * x0
      const pz = Math.sin(angle) * x0 * 0.35 + bend * (1 - Math.abs(Math.cos(angle)) * 0.3)

      pos.setXYZ(i, px, y0, pz)
    }
    pos.needsUpdate = true
    mesh.current.geometry.computeVertexNormals()

    // Stacking: unturned pages rest slightly above lower ones,
    // turned pages settle onto the left stack.
    group.current.position.z = -index * 0.015 + flip * (index * 0.015 + 0.02)
  })

  return (
    <group ref={group}>
      <mesh ref={mesh} geometry={geometry}>
        <meshStandardMaterial
          map={texture}
          color="#cfcbc2"
          side={THREE.DoubleSide}
          roughness={0.95}
          metalness={0}
          transparent
          opacity={0.85}
        />
      </mesh>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Static base pages: the left page (already open) and the bottom      */
/* right page revealed after all flips.                                */
/* ------------------------------------------------------------------ */
function BasePage({
  side,
  texture,
}: {
  side: 'left' | 'right'
  texture: THREE.Texture
}) {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(PAGE_WIDTH, PAGE_HEIGHT, 16, 4)
    geo.translate(side === 'right' ? PAGE_WIDTH / 2 : -PAGE_WIDTH / 2, 0, 0)
    // Slight resting bow so the paper doesn't look laser-flat
    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const u = Math.abs(x) / PAGE_WIDTH
      pos.setZ(i, Math.sin(u * Math.PI) * 0.12)
    }
    geo.computeVertexNormals()
    return geo
  }, [side])

  return (
    <mesh geometry={geometry} position={[0, 0, -0.12]}>
      <meshStandardMaterial
        map={texture}
        color="#b8b4ab"
        side={THREE.DoubleSide}
        roughness={0.95}
        metalness={0}
        transparent
        opacity={0.8}
      />
    </mesh>
  )
}

/* ------------------------------------------------------------------ */
/* The open newspaper: gently floats/breathes while its pages turn     */
/* with scroll.                                                        */
/* ------------------------------------------------------------------ */
function NewspaperBook({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const book = useRef<THREE.Group>(null)
  const texture = useLoader(THREE.TextureLoader, TEXTURE_URL)

  const pageTexture = useMemo(() => {
    const t = texture.clone()
    t.wrapS = THREE.RepeatWrapping
    t.wrapT = THREE.RepeatWrapping
    t.needsUpdate = true
    return t
  }, [texture])

  useFrame((state) => {
    if (!book.current) return
    const t = state.clock.elapsedTime
    const s = scrollRef.current
    // Living paper: slow breathing drift
    book.current.rotation.x = -0.35 + Math.sin(t * 0.25) * 0.03
    book.current.rotation.y = Math.sin(t * 0.18) * 0.04 + s * 0.15
    book.current.rotation.z = -0.04 + Math.sin(t * 0.2) * 0.015
    book.current.position.y = -0.4 + Math.sin(t * 0.4) * 0.12
  })

  return (
    <group ref={book} position={[0, -0.4, -3]} scale={1.15}>
      <BasePage side="left" texture={pageTexture} />
      <BasePage side="right" texture={pageTexture} />
      {Array.from({ length: NUM_FLIP_PAGES }, (_, i) => (
        <TurnablePage
          key={i}
          scrollRef={scrollRef}
          index={i}
          total={NUM_FLIP_PAGES}
          texture={pageTexture}
        />
      ))}
      {/* Spine shadow line */}
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[0.25, PAGE_HEIGHT]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.35} />
      </mesh>
    </group>
  )
}

/* ------------------------------------------------------------------ */
/* Particle field — tiny ink dots with slow scroll drift.              */
/* ------------------------------------------------------------------ */
function InkDots({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const points = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const count = 260
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 22
      arr[i * 3 + 1] = (Math.random() - 0.5) * 24
      arr[i * 3 + 2] = -5 - Math.random() * 8
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!points.current) return
    points.current.rotation.z = state.clock.elapsedTime * 0.008
    points.current.position.y = scrollRef.current * 8
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#9a9a9a"
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.5}
      />
    </points>
  )
}

/* ------------------------------------------------------------------ */
/* Scene contents                                                       */
/* ------------------------------------------------------------------ */
function Scene() {
  const scrollRef = useScrollProgress()

  return (
    <>
      <ambientLight intensity={0.75} />
      <directionalLight position={[3, 5, 6]} intensity={0.9} />
      <directionalLight position={[-4, -2, 3]} intensity={0.25} />

      <InkDots scrollRef={scrollRef} />
      <NewspaperBook scrollRef={scrollRef} />

      {/* Fog fades distant objects into the page background */}
      <fog attach="fog" args={['#111111', 7, 18]} />
    </>
  )
}

/* ------------------------------------------------------------------ */
/* Fixed full-viewport canvas that sits between the newspaper texture  */
/* and the page content.                                                */
/* ------------------------------------------------------------------ */
export function ScrollScene3D() {
  const prefersReducedMotion = useReducedMotion()

  if (prefersReducedMotion) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-[5]"
    >
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
