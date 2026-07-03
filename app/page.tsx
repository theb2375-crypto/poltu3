import { Navbar } from '@/components/navbar'
import { Hero } from '@/components/hero'
import { Problem } from '@/components/problem'
import { AppShowcase } from '@/components/app-showcase'
import { Features } from '@/components/features'
import { HowItWorks } from '@/components/how-it-works'
import { Roadmap } from '@/components/roadmap'
import { Faq } from '@/components/faq'
import { Waitlist } from '@/components/waitlist'
import { SiteFooter } from '@/components/site-footer'
import { Chatbot } from '@/components/chatbot'
import { MarqueeBand } from '@/components/marquee-band'
import { Vision } from '@/components/vision'
import { Journey } from '@/components/journey'
import { NewspaperBackground } from '@/components/newspaper-background'
import { ScrollProgress } from '@/components/scroll-progress'
import { ScrollReveal } from '@/components/scroll-reveal'
import { TiltOnScroll } from '@/components/tilt-on-scroll'
import { ScrollScene3DLoader as ScrollScene3D } from '@/components/scroll-scene-3d-loader'
import { NewsClippings } from '@/components/news-clippings'
import { CitizenSessions } from '@/components/citizen-sessions'

export default function Page() {
  return (
    <>
      <NewspaperBackground />
      <ScrollScene3D />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <MarqueeBand />
        <TiltOnScroll>
          <ScrollReveal direction="up">
            <Problem />
          </ScrollReveal>
        </TiltOnScroll>
        <TiltOnScroll intensity={6}>
          <ScrollReveal direction="left">
            <AppShowcase />
          </ScrollReveal>
        </TiltOnScroll>
        <Journey />
        <NewsClippings />
        <TiltOnScroll>
          <ScrollReveal direction="up">
            <Features />
          </ScrollReveal>
        </TiltOnScroll>
        <Vision />
        <CitizenSessions />
        <TiltOnScroll intensity={6}>
          <ScrollReveal direction="right">
            <HowItWorks />
          </ScrollReveal>
        </TiltOnScroll>
        <TiltOnScroll>
          <ScrollReveal direction="up">
            <Roadmap />
          </ScrollReveal>
        </TiltOnScroll>
        <TiltOnScroll intensity={5}>
          <ScrollReveal direction="up">
            <Faq />
          </ScrollReveal>
        </TiltOnScroll>
        <ScrollReveal direction="none">
          <Waitlist />
        </ScrollReveal>
      </main>
      <SiteFooter />
      <Chatbot />
    </>
  )
}
