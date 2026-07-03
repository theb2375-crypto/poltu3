import { Check } from 'lucide-react'
import { SectionHeader } from '@/components/section-header'

const phases = [
  {
    phase: 'Phase 01 — Design',
    title: 'Fully Designed',
    desc: 'Onboarding, candidate profiles, forums, events, donations, and feed — every flow mapped end to end.',
    status: 'complete' as const,
  },
  {
    phase: 'Phase 02 — Beta',
    title: 'Beta Pilot',
    desc: 'Candidate verification, donation escrow, and the constituency feed go live for early registered users.',
    status: 'active' as const,
  },
  {
    phase: 'Phase 03 — Reach',
    title: 'Poltu Print & Campus Partnerships',
    desc: 'Free print media rollout and IIT development clubs bring the platform offline and onto campuses.',
    status: 'upcoming' as const,
  },
  {
    phase: 'Phase 04 — Scale',
    title: 'Pan-India Launch',
    desc: 'Every constituency, every state — open to any citizen ready to run.',
    status: 'upcoming' as const,
  },
]

export function Roadmap() {
  return (
    <section id="roadmap" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader
          label="Roadmap"
          title="Where we are. Where we're headed."
          sub="Built in public, one milestone at a time."
        />
        <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {phases.map((p, i) => (
            <li
              key={p.phase}
              className={`relative rounded-2xl border p-6 ${
                p.status === 'active'
                  ? 'border-primary/50 bg-accent/40'
                  : 'border-border bg-card'
              }`}
            >
              <div className="mb-4 flex items-center gap-3">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                    p.status === 'complete'
                      ? 'bg-primary text-primary-foreground'
                      : p.status === 'active'
                        ? 'border-2 border-primary text-primary'
                        : 'border border-border text-muted-foreground'
                  }`}
                  aria-hidden="true"
                >
                  {p.status === 'complete' ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    i + 1
                  )}
                </span>
                <span
                  className={`text-xs font-semibold uppercase tracking-wider ${
                    p.status === 'active'
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  {p.status === 'complete'
                    ? 'Complete'
                    : p.status === 'active'
                      ? 'In Progress'
                      : 'Upcoming'}
                </span>
              </div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {p.phase}
              </p>
              <h3 className="mt-1.5 text-base font-bold tracking-tight">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.desc}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
