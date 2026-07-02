import {
  BadgeCheck,
  Eye,
  MapPin,
  Megaphone,
  Newspaper,
  Users,
} from 'lucide-react'
import { SectionHeader } from '@/components/section-header'
import { TiltCard } from '@/components/tilt-card'

const features = [
  {
    icon: BadgeCheck,
    title: 'Free Candidate Registration',
    desc: 'Any qualified Indian citizen can contest with a ₹5,000 refundable deposit — not lakhs in campaign costs.',
  },
  {
    icon: Eye,
    title: 'Transparent Fund Tracking',
    desc: 'Every rupee voted on before spending. 50% donor approval required. Bills submitted as proof after use.',
  },
  {
    icon: MapPin,
    title: 'Constituency-Based Feed',
    desc: "Candidates, parties, and issues curated for your ward and district — politics that's actually local.",
  },
  {
    icon: Megaphone,
    title: 'Influencer Support System',
    desc: 'Creators back candidates whose ideology aligns with theirs, directing audience support transparently.',
  },
  {
    icon: Newspaper,
    title: 'Free Print Media',
    desc: 'Daily newspapers and weekly magazines distributed free — equal column space for every candidate.',
  },
  {
    icon: Users,
    title: 'Community Forums & Events',
    desc: 'Auditoriums, digital events with QR check-in, and forums where citizens shape the national conversation.',
  },
]

export function Features() {
  return (
    <section id="features" className="border-t border-border py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader
          label="What We Offer"
          title="Built for citizens. Not corporations."
          sub="Every feature gives the general public real ownership of who represents them."
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <TiltCard
              key={f.title}
              className="group relative h-full rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_0_40px_-12px] hover:shadow-primary/30"
            >
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-transform duration-300 [transform:translateZ(24px)] group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground">
                <f.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mb-2 text-base font-bold tracking-tight [transform:translateZ(16px)]">
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground [transform:translateZ(8px)]">
                {f.desc}
              </p>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  )
}
