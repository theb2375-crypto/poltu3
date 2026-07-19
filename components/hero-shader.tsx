'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import * as THREE from 'three'

/* ------------------------------------------------------------------ */
/* A custom GLSL aurora — slow-moving ink/light in the brand green,    */
/* rendered on a fullscreen plane behind the hero content. It reacts   */
/* to scroll (uScroll) by drifting and dimming as you leave the hero.  */
/* ------------------------------------------------------------------ */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uScroll;
  uniform vec2 uResolution;
  varying vec2 vUv;

  /* Hash + value noise + fbm */
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = rot * p * 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = uv * vec2(uResolution.x / uResolution.y, 1.0);

    float t = uTime * 0.06;
    float drift = uScroll * 1.4;

    /* Two layers of flowing ink, domain-warped for an aurora feel */
    vec2 q = vec2(
      fbm(p * 1.6 + vec2(t, -t * 0.7) + drift * 0.4),
      fbm(p * 1.6 + vec2(-t * 0.8, t * 0.5))
    );
    float flow = fbm(p * 2.2 + q * 1.8 + vec2(t * 0.5, drift * 0.6));

    /* Concentrate the glow toward the upper area of the hero */
    float band = smoothstep(0.15, 0.75, uv.y) * smoothstep(1.05, 0.55, uv.y);
    float edgeFade = smoothstep(0.0, 0.22, uv.x) * smoothstep(1.0, 0.78, uv.x);

    float intensity = pow(flow, 2.2) * band * edgeFade;

    /* Brand palette: deep teal-black -> mint green */
    vec3 mint = vec3(0.22, 0.88, 0.62);
    vec3 teal = vec3(0.03, 0.22, 0.17);
    vec3 col = mix(teal, mint, intensity) * intensity;

    /* Faint scanline grain so it feels printed, matching the newspaper motif */
    float grain = (hash(uv * uResolution + uTime) - 0.5) * 0.03;
    col += grain * intensity;

    /* Fade the whole layer out as the user scrolls past the hero */
    float alpha = intensity * (1.0 - clamp(uScroll * 1.2, 0.0, 0.85)) * 0.85;

    gl_FragColor = vec4(col, alpha);
  }
`

function AuroraPlane() {
  const material = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uResolution: { value: new THREE.Vector2(16, 9) },
    }),
    [],
  )

  useFrame((state) => {
    if (!material.current) return
    material.current.uniforms.uTime.value = state.clock.elapsedTime
    const heroHeight = window.innerHeight * 1.1
    material.current.uniforms.uScroll.value = Math.min(
      window.scrollY / heroHeight,
      1,
    )
    material.current.uniforms.uResolution.value.set(
      state.size.width,
      state.size.height,
    )
  })

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

export function HeroShader() {
  const prefersReducedMotion = useReducedMotion()
  const wrapper = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(true)

  // The fbm shader is expensive; stop the render loop entirely once the
  // hero has scrolled out of the viewport.
  useEffect(() => {
    const el = wrapper.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) =>
      setInView(entry.isIntersecting),
    )
    io.observe(el)
    return () => io.disconnect()
  }, [prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <div
      ref={wrapper}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      <Canvas
        orthographic
        camera={{ position: [0, 0, 1], zoom: 1 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        dpr={[1, 1.25]}
        frameloop={inView ? 'always' : 'never'}
      >
        <AuroraPlane />
      </Canvas>
    </div>
  )
}
