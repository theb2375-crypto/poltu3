'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Newspaper } from 'lucide-react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { CLIPPINGS_COLLECTION, type Clipping } from '@/lib/clippings'
import { SectionHeader } from '@/components/section-header'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * NEWS CLIPPINGS
 * --------------
 * Clippings are managed from the login-protected /admin page and stored in the
 * Firestore "clippings" collection. This section reads them live — add or remove
 * a clipping in /admin and it appears/disappears here automatically.
 */
export function NewsClippings() {
  const prefersReducedMotion = useReducedMotion()
  const [clippings, setClippings] = useState<Clipping[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Live subscription: newest clippings first.
    const q = query(
      collection(db, CLIPPINGS_COLLECTION),
      orderBy('createdAt', 'desc'),
    )
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setClippings(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Clipping, 'id'>),
          })),
        )
        setLoading(false)
      },
      (err) => {
        console.error('Failed to load clippings:', err)
        setLoading(false)
      },
    )
    return () => unsubscribe()
  }, [])

  return (
    <section
      id="press"
      aria-labelledby="news-clippings-heading"
      className="relative border-t border-border py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader
          label="In The News"
          title="Press &amp; clippings"
          sub="What people are writing about a fairer, funded-by-the-people way to contest elections."
        />

        {!loading && clippings.length === 0 && (
          <div className="mx-auto mt-16 flex max-w-xl flex-col items-center rounded-2xl border border-dashed border-border bg-card/60 px-6 py-14 text-center backdrop-blur-sm">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
              <Newspaper className="h-6 w-6 text-primary" aria-hidden="true" />
            </span>
            <h3 className="mt-5 text-lg font-bold tracking-tight">
              Press coverage coming soon
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              We&apos;ll feature clippings here as journalists write about a
              fairer, funded-by-the-people way to contest elections.
            </p>
          </div>
        )}

        {clippings.length > 0 && (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {clippings.map((clip, i) => {
              const CardInner = (
                <motion.article
                  initial={
                    prefersReducedMotion
                      ? undefined
                      : { opacity: 0, y: 28, rotate: i % 2 === 0 ? -1.2 : 1.2 }
                  }
                  whileInView={
                    prefersReducedMotion
                      ? undefined
                      : { opacity: 1, y: 0, rotate: 0 }
                  }
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                  whileHover={prefersReducedMotion ? undefined : { y: -6 }}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/90 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.7)] backdrop-blur-sm transition-colors hover:border-primary/50"
                >
                  {clip.imageUrl && (
                    <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
                      {/* Plain <img>: sources are arbitrary external URLs and
                          next.config sets images.unoptimized, so next/image
                          would add no benefit and would need remote config. */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={clip.imageUrl}
                        alt={clip.headline}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover grayscale transition duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]"
                      />
                    </div>
                  )}

                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center gap-2 text-xs">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 font-bold uppercase tracking-wide text-foreground">
                        <Newspaper className="h-3 w-3" aria-hidden="true" />
                        {clip.source}
                      </span>
                      <span className="font-mono text-muted-foreground">
                        {clip.date}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold leading-snug tracking-tight">
                      {clip.headline}
                    </h3>

                    {clip.excerpt && (
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {clip.excerpt}
                      </p>
                    )}

                    {clip.url && (
                      <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                        Read the story
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </span>
                    )}
                  </div>
                </motion.article>
              )

              return clip.url ? (
                <Link
                  key={clip.id}
                  href={clip.url}
                  target={clip.url.startsWith('#') ? undefined : '_blank'}
                  rel={
                    clip.url.startsWith('#')
                      ? undefined
                      : 'noopener noreferrer'
                  }
                  className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {CardInner}
                </Link>
              ) : (
                <div key={clip.id} className="h-full">
                  {CardInner}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
