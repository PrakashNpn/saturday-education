import { Reveal } from '@/shared/components/motion/Reveal'
import { AboutHero } from './AboutHero'
import { AboutStory } from './AboutStory'
import { AboutWhyUs } from './AboutWhyUs'
import { AboutValues } from './AboutValues'
import { AboutCertifications } from './AboutCertifications'
import { AboutTeam } from './AboutTeam'
import { AboutCTA } from './AboutCTA'

export function AboutPage() {
  return (
    <main className="bg-canvas">
      <AboutHero />
      {/* Not wrapped in Reveal: its own dark band has to stay solid, so the
          fade lives on its inner content instead. */}
      <AboutStory />
      <Reveal>
        <AboutWhyUs />
      </Reveal>
      {/* Not wrapped in Reveal: its own value cards already stagger in on
          scroll, so an outer fade would just delay that a second time. */}
      <AboutValues />
      {/* Not wrapped in Reveal either, for the same reason as AboutStory. */}
      <AboutCertifications />
      {/* Not wrapped in Reveal either, for the same reason as AboutValues. */}
      <AboutTeam />
      <Reveal>
        <AboutCTA />
      </Reveal>
    </main>
  )
}
