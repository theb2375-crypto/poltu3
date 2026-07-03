'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, Newspaper } from 'lucide-react'
import { SectionHeader } from '@/components/section-header'

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * NEWS CLIPPINGS
 * --------------
 * To add a clipping, copy one block below and edit the fields.
 *   source   – publication name (e.g. "The Hindu")
 *   date     – as you want it shown (e.g. "12 Jun 2026")
 *   headline – the clipping's headline
 *   excerpt  – a short pull-quote or summary (optional)
 *   img      – path under /public (optional). Leave undefined for a text-only clipping.
 *   url      – link to the full article (optional). Leave undefined for no link.
 */
const CLIPPINGS: {
  source: string
  date: string
  headline: string
  excerpt?: string
  img?: string
  url?: string
}[] = [
  {
    source: 'The Hindu',
    date: '12 Jun 2026',
    headline: 'Crowdfunded candidates challenge the money-first playbook',
    excerpt:
      'A new platform lets first-time contestants raise transparent, small-ticket donations from their own constituency.',
    img: '/images/vision-press.png',
    url: '#',
  },
  {
    source: 'Indian Express',
    date: '28 May 2026',
    headline: 'Every rupee, on the record: the audit trail reshaping campaigns',
    excerpt:
      'Donors approve each spend and bills are uploaded as public proof — an experiment in radical transparency.',
    url: '#',
  },
  {
    source: 'Mint',
    date: '09 May 2026',
    headline: '₹5,000 to stand for election, not crores',
    excerpt:
      'Organisers say lowering the cost of contesting could open the ballot to teachers, students and workers.',
    url: '#',
  },
]

export function NewsClippings() {
  const prefersReducedMotion = useReducedMotion()

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

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CLIPPINGS.map((clip, i) => {
            const CardInner = (
              <motion.article
                initial={
                  prefersReducedMotion
                    ? undefined
                    : { opacity: 0, y: 28, rotate: i % 2 === 0 ? -1.2 : 1.2 }
                }
                whileInView={
                  prefersReducedMotion ? undefined : { opacity: 1, y: 0, rotate: 0 }
                }
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.6, ease: EASE, delay: i * 0.08 }}
                whileHover={prefersReducedMotion ? undefined : { y: -6 }}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card/90 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.7)] backdrop-blur-sm transition-colors hover:border-primary/50"
              >
                {clip.img && (
                  <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
                    <Image
                      src={clip.img}
                      alt={clip.headline}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover grayscale transition duration-500 group-hover:grayscale-0 group-hover:scale-[1.03]"
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
                key={i}
                href={clip.url}
                target={clip.url.startsWith('#') ? undefined : '_blank'}
                rel={clip.url.startsWith('#') ? undefined : 'noopener noreferrer'}
                className="block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {CardInner}
              </Link>
            ) : (
              <div key={i} className="h-full">
                {CardInner}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
