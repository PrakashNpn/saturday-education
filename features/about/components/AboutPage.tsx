import { AboutHero } from './AboutHero'
import { AboutStory } from './AboutStory'
import { AboutValues } from './AboutValues'
import { AboutCertifications } from './AboutCertifications'
import { AboutTeam } from './AboutTeam'
import { AboutWhyUs } from './AboutWhyUs'
import { AboutCTA } from './AboutCTA'
import type { AboutTranslations } from '../types'

interface Props {
  translations: AboutTranslations
}

export function AboutPage({ translations: t }: Props) {
  return (
    <main className="bg-neutral-50">
      <AboutHero
        translations={{
          heroLabel: t.heroLabel,
          heroTitle: t.heroTitle,
          heroSubtitle: t.heroSubtitle,
          heroStat1Label: t.heroStat1Label,
          heroStat2Label: t.heroStat2Label,
          heroStat3Label: t.heroStat3Label,
          heroStat4Label: t.heroStat4Label,
        }}
      />

      <AboutStory
        translations={{
          storyLabel: t.storyLabel,
          storyTitle: t.storyTitle,
          storyBody1: t.storyBody1,
          storyBody2: t.storyBody2,
          storyHighlight: t.storyHighlight,
          storyHighlightSub: t.storyHighlightSub,
          milestone1Year: t.milestone1Year,
          milestone1Label: t.milestone1Label,
          milestone2Year: t.milestone2Year,
          milestone2Label: t.milestone2Label,
          milestone3Year: t.milestone3Year,
          milestone3Label: t.milestone3Label,
        }}
      />

      <AboutValues
        translations={{
          valuesLabel: t.valuesLabel,
          valuesTitle: t.valuesTitle,
          valuesSubtitle: t.valuesSubtitle,
          value1Title: t.value1Title,
          value1Desc: t.value1Desc,
          value2Title: t.value2Title,
          value2Desc: t.value2Desc,
          value3Title: t.value3Title,
          value3Desc: t.value3Desc,
          value4Title: t.value4Title,
          value4Desc: t.value4Desc,
        }}
      />

      <AboutCertifications
        translations={{
          certsLabel: t.certsLabel,
          certsTitle: t.certsTitle,
          certsSubtitle: t.certsSubtitle,
        }}
      />

      <AboutTeam
        translations={{
          teamLabel: t.teamLabel,
          teamTitle: t.teamTitle,
          teamSubtitle: t.teamSubtitle,
          team1Name: t.team1Name,
          team1Role: t.team1Role,
          team1Bio: t.team1Bio,
          team2Name: t.team2Name,
          team2Role: t.team2Role,
          team2Bio: t.team2Bio,
          team3Name: t.team3Name,
          team3Role: t.team3Role,
          team3Bio: t.team3Bio,
        }}
      />

      <AboutWhyUs
        translations={{
          whyLabel: t.whyLabel,
          whyTitle: t.whyTitle,
          whySubtitle: t.whySubtitle,
          why1Title: t.why1Title,
          why1Desc: t.why1Desc,
          why2Title: t.why2Title,
          why2Desc: t.why2Desc,
          why3Title: t.why3Title,
          why3Desc: t.why3Desc,
        }}
      />

      <AboutCTA
        translations={{
          ctaTitle: t.ctaTitle,
          ctaSubtitle: t.ctaSubtitle,
          ctaButton: t.ctaButton,
        }}
      />
    </main>
  )
}
