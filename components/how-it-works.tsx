import { Vote, ClipboardList, Mic } from 'lucide-react'
import { SectionHeader } from '@/components/section-header'

const roles = [
  {
    icon: Vote,
    tag: 'Citizen',
    title: 'Back what you believe in',
    desc: 'Find your representatives, fund the ones you trust, and hold them to it.',
    steps: [
      'Verify your constituency',
      'Browse candidates, parties & forums',
      'Fund what you believe in',
      'Vote on how funds get spent',
    ],
  },
  {
    icon: ClipboardList,
    tag: 'Candidate',
    title: 'Run without the war chest',
    desc: 'Eligibility and ideas decide who gets on the ballot, not bank balance.',
    steps: [
      'Apply with ID & ₹5,000 deposit',
      'Get verified by the platform',
      'Build your profile & platform',
      'Raise funds, report every rupee spent',
    ],
  },
  {
    icon: Mic,
    tag: 'Influencer',
    title: 'Turn your audience into action',
    desc: 'Direct the people who trust you toward the candidates who earn it.',
    steps: [
      'Apply as a verified creator',
      'Pick candidates aligned with your values',
      'Share their platform with your audience',
      'See the transparent impact of every rupee',
    ],
  },
]

export function HowItWorks() {
  return (
    <section
      id="how"
      className="border-t border-border bg-card/40 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader
          label="How It Works"
          title="Three roles. One platform."
          sub="Whether you're voting with your wallet, running for office, or rallying your audience — there's a path built for you."
        />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {roles.map((r) => (
            <div
              key={r.tag}
              className="rounded-2xl border border-border bg-background p-7 transition-colors hover:border-primary/40"
            >
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-accent px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-accent-foreground">
                <r.icon className="h-3.5 w-3.5" aria-hidden="true" />
                {r.tag}
              </div>
              <h3 className="mb-2 text-lg font-bold tracking-tight">
                {r.title}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                {r.desc}
              </p>
              <ol className="flex flex-col gap-3.5">
                {r.steps.map((s, i) => (
                  <li key={s} className="flex items-start gap-3">
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border text-xs font-semibold text-muted-foreground"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <span className="pt-0.5 text-sm leading-relaxed">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
