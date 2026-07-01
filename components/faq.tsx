import { SectionHeader } from '@/components/section-header'

const faqs = [
  {
    q: 'Is PoltuReform affiliated with any political party?',
    a: "No. It's an independent civic platform. Candidates from any party — or none — can register, and the feed treats every listing the same way.",
  },
  {
    q: 'How are candidates verified before they appear on the platform?',
    a: "Every applicant submits government ID and meets the standard eligibility checks for the office they're seeking before a profile goes live.",
  },
  {
    q: 'Where does my donation actually go?',
    a: 'Funds sit in escrow until a candidate requests a release. A release needs 50% donor approval, and a bill or receipt has to be submitted afterward as proof.',
  },
  {
    q: 'Can anyone register as a candidate?',
    a: 'Any citizen who meets the eligibility requirements for the office — age, residency, and so on — can apply, regardless of party backing or personal wealth.',
  },
  {
    q: "What's the ₹5,000 deposit for?",
    a: "It's a refundable filing fee, there to keep registrations serious without making them inaccessible the way real campaign costs do.",
  },
  {
    q: 'When can I actually use the app?',
    a: 'The design is complete and beta testing is being planned for select cities. Join the waitlist to get early access.',
  },
]

export function Faq() {
  return (
    <section
      id="faq"
      className="border-t border-border bg-card/40 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader
          label="Questions"
          title="Before you ask."
          sub="The things people usually want to know before they sign up."
        />
        <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-3">
          {faqs.map((f) => (
            <details
              key={f.q}
              className="group rounded-xl border border-border bg-background px-6 py-1 open:border-primary/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-sm font-semibold [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  className="text-lg font-light text-muted-foreground transition-transform group-open:rotate-45"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
