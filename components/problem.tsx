import { Check, Minus } from 'lucide-react'
import { SectionHeader } from '@/components/section-header'

const rows = [
  {
    cat: 'Cost to contest',
    old: 'Crores in campaign spend',
    next: '₹5,000 refundable deposit',
  },
  {
    cat: 'Who can run',
    old: 'Needs party backing or a family name',
    next: 'Any eligible citizen, ID-verified',
  },
  {
    cat: 'Funding',
    old: 'Private donors, undisclosed sums',
    next: 'Public donations, capped & visible',
  },
  {
    cat: 'Spending oversight',
    old: 'Disclosed after the fact, if ever',
    next: 'Donors approve spend before it happens',
  },
  {
    cat: 'Reach',
    old: 'Whoever can afford the airtime',
    next: 'Equal feed visibility, equal print space',
  },
]

export function Problem() {
  return (
    <section id="problem" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader
          label="The Problem"
          title="Elections shouldn't cost a fortune."
          sub="Across India, capable people sit out elections because the cost of entry — not the cost of ideas — keeps them out."
        />

        <div className="mx-auto mt-14 max-w-4xl overflow-hidden rounded-2xl border border-border bg-card">
          <div className="grid grid-cols-[1fr_1fr] gap-4 border-b border-border bg-secondary/50 px-5 py-4 text-sm font-semibold sm:grid-cols-[0.8fr_1fr_1fr] sm:px-7">
            <div className="hidden text-xs uppercase tracking-wider text-muted-foreground sm:block" />
            <div className="flex items-center gap-2 text-muted-foreground">
              <span
                className="h-1.5 w-1.5 rounded-full bg-muted-foreground"
                aria-hidden="true"
              />
              The Old Way
            </div>
            <div className="flex items-center gap-2 text-primary">
              <span
                className="h-1.5 w-1.5 rounded-full bg-primary"
                aria-hidden="true"
              />
              PoltuReform
            </div>
          </div>
          {rows.map((r) => (
            <div
              key={r.cat}
              className="grid grid-cols-[1fr_1fr] gap-4 border-b border-border px-5 py-5 last:border-b-0 sm:grid-cols-[0.8fr_1fr_1fr] sm:px-7"
            >
              <div className="col-span-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:col-span-1">
                {r.cat}
              </div>
              <div className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground">
                <Minus
                  className="mt-0.5 h-4 w-4 shrink-0 opacity-50"
                  aria-hidden="true"
                />
                {r.old}
              </div>
              <div className="flex items-start gap-2.5 text-sm font-medium leading-relaxed">
                <Check
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary"
                  aria-hidden="true"
                />
                {r.next}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
