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
import { NewspaperBackground } from '@/components/newspaper-background'
import { ScrollProgress } from '@/components/scroll-progress'
import { ScrollReveal } from '@/components/scroll-reveal'
import { ScrollScene3DLoader as ScrollScene3D } from '@/components/scroll-scene-3d-loader'

export default function Page() {
  return (
    <>
      <NewspaperBackground />
      <ScrollScene3D />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <ScrollReveal direction="up">
          <Problem />
        </ScrollReveal>
        <ScrollReveal direction="left">
          <AppShowcase />
        </ScrollReveal>
        <ScrollReveal direction="up">
          <Features />
        </ScrollReveal>
        <ScrollReveal direction="right">
          <HowItWorks />
        </ScrollReveal>
        <ScrollReveal direction="up">
          <Roadmap />
        </ScrollReveal>
        <ScrollReveal direction="up">
          <Faq />
        </ScrollReveal>
        <ScrollReveal direction="none">
          <Waitlist />
        </ScrollReveal>
      </main>
      <SiteFooter />
      <Chatbot />
    </>
  )
}
