import Image from 'next/image'
import { SectionHeader } from '@/components/section-header'

const screens = [
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
        <div className="mt-16 flex flex-wrap items-start justify-center gap-10">
          {screens.map((s, i) => (
            <figure key={s.src} className="flex flex-col items-center">
              <div
                className={`w-52 overflow-hidden rounded-[2rem] border border-border bg-secondary shadow-xl transition-transform duration-300 hover:-translate-y-2 md:w-56 ${
                  i === 1 ? 'lg:-mt-6 lg:scale-105' : ''
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
          ))}
        </div>
      </div>
    </section>
  )
}
