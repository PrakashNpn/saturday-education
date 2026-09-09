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
      <AboutStory />
      <AboutWhyUs />
      <AboutValues />
      <AboutCertifications />
      <AboutTeam />
      <AboutCTA />
    </main>
  )
}
