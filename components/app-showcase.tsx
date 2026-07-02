import Image from 'next/image'
import { SectionHeader } from '@/components/section-header'
import {
  ScrollRevealGroup,
  ScrollRevealItem,
} from '@/components/scroll-reveal'

const screens = [
  {
    src: '/screens/screen-splash.png',
    alt: 'PoltuReform app splash screen — Democracy, Reimagined',
    caption: 'Splash & Onboarding',
  },
  {
    src: '/screens/screen-registration.jpg',
    alt: 'Candidate registration flow in the PoltuReform app',
    caption: 'Candidate Registration',
  },
  {
    src: '/screens/screen-donations.jpg',
    alt: 'Donations and fund transparency screen in the PoltuReform app',
    caption: 'Donations & Transparency',
  },
  {
    src: '/screens/screen-about.jpg',
    alt: 'About and vision screen in the PoltuReform app',
    caption: 'About & Vision',
  },
]

export function AppShowcase() {
  return (
    <section
      id="app"
      className="border-t border-border bg-card/40 py-20 md:py-28"
    >
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeader
          label="The App"
          title="22+ screens. Built for real democratic action."
          sub="Your constituency, your candidates, your donations — all in one place."
        />
        <ScrollRevealGroup
          className="mt-16 flex flex-wrap items-start justify-center gap-8 lg:gap-10"
          stagger={0.14}
        >
          {screens.map((s, i) => (
            <ScrollRevealItem key={s.src} direction="up" distance={56}>
              <figure className="flex flex-col items-center">
                <div
                  className={`w-48 overflow-hidden rounded-[2rem] border border-border bg-secondary shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(52,224,161,0.25)] md:w-52 ${
                    i % 2 === 1 ? 'lg:mt-10' : ''
                  }`}
                >
                  <Image
                    src={s.src || '/placeholder.svg'}
                    alt={s.alt}
                    width={420}
                    height={840}
                    className="h-auto w-full"
                  />
                </div>
                <figcaption className="mt-4 text-sm font-medium text-muted-foreground">
                  {s.caption}
                </figcaption>
              </figure>
            </ScrollRevealItem>
          ))}
        </ScrollRevealGroup>
      </div>
    </section>
  )
}
