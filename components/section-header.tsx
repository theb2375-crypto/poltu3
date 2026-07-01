import { AnimatedText, FadeIn } from '@/components/animated-text'

export function SectionHeader({
  label,
  title,
  sub,
}: {
  label: string
  title: string
  sub?: string
}) {
  return (
    <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
      {/* Soft scrim so headings stay legible over the newspaper backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[160%] w-[130%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-background/70 blur-3xl"
      />
      <FadeIn delay={0}>
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-primary [text-shadow:0_1px_12px_rgba(0,0,0,0.6)]">
          {label}
        </p>
      </FadeIn>
      <AnimatedText
        as="h2"
        text={title}
        stagger={0.07}
        delay={0.1}
        className="text-balance text-4xl font-extrabold tracking-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.55)] md:text-5xl"
      />
      {sub && (
        <FadeIn delay={0.35}>
          <p className="mt-5 max-w-lg text-pretty text-base leading-relaxed text-muted-foreground [text-shadow:0_1px_10px_rgba(0,0,0,0.7)]">
            {sub}
          </p>
        </FadeIn>
      )}
    </div>
  )
}
