'use client'

import Image from 'next/image'
import { Clock, Heart, BadgeCheck } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { HollandHexagon, BipolarBar, ScoreRing } from './DashboardCharts'
import type { PublicResultsData } from '../services/publicResults'

interface Props {
  data: PublicResultsData
}

const sectionHeading = 'mb-6 flex items-center gap-2 text-label font-bold tracking-wider text-action uppercase'

/**
 * The same visual profile ResultsDashboard shows the student themselves, on
 * a public read-only page reached via the share card's QR code. No contact
 * info (this component's own PublicResultsData type has no email/phone field
 * to render even by mistake), no AI polling (the studentRead paragraph, if
 * the background synthesis had already landed, was read once server-side).
 * The career-match preview and the locked "book a consultation" section are
 * both dropped entirely rather than shown to a visitor who isn't the student
 * themselves — replaced by one CTA addressed to a third-party visitor.
 */
export function PublicResultsView({ data }: Props) {
  const t = useTranslations('careerAssessment.dashboard')
  const tp = useTranslations('careerAssessment.publicResults')
  const rankedInterests = [...data.interests].sort((a, b) => b.value - a.value)
  const name = data.fullName

  return (
    <div className="mx-auto w-full max-w-wrap px-6 py-12 max-tablet:py-8">
      <div className="mb-8 overflow-hidden rounded-md border border-stroke bg-surface shadow-xs">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-4 border-b border-stroke/60 pb-6 sm:flex-row sm:items-center">
            <span className="inline-block rounded-full bg-tint px-3 py-1 text-min font-semibold tracking-wider text-action uppercase">
              {tp('eyebrow', { name })}
            </span>
            <Image
              src="/images/logo/logo.webp"
              alt="Saturday Education Consulting"
              width={300}
              height={84}
              priority
              unoptimized
              className="h-10 w-auto shrink-0 self-start sm:self-auto"
            />
          </div>

          <div className="pt-6">
            <h1 className="mb-3 text-2xl font-bold tracking-tight text-primary-text sm:text-3xl">
              {data.archetype}
            </h1>
            <p className="max-w-4xl text-body font-normal leading-relaxed text-secondary-text">
              {data.studentRead ?? data.archetypeSummary}
            </p>
          </div>
        </div>

        <div className="border-b border-stroke" />

        <div className="grid grid-cols-1 divide-y divide-stroke bg-surface lg:grid-cols-3 lg:divide-x lg:divide-y-0">
          <div className="flex flex-col justify-between p-6 sm:p-7">
            <div>
              <p className={sectionHeading}>
                <Clock size={18} />
                {t('interestsTitle')}
              </p>
              <HollandHexagon interests={data.interests} />
            </div>
            <ul className="mt-4 space-y-2 border-t border-stroke/60 pt-2 text-label">
              {rankedInterests.map((it, i) => (
                <li key={it.category} className="flex items-center justify-between">
                  <span className="font-semibold text-primary-text">
                    {i + 1}. {it.label}
                  </span>
                  <span className="font-medium text-secondary-text">{it.value}%</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 sm:p-7">
            <p className={sectionHeading}>
              <Heart size={18} />
              {t('personalityTitle')}
            </p>
            <div className="space-y-6">
              {data.personality.map((p, i) => (
                <BipolarBar
                  key={p.trait}
                  label={p.label}
                  low={p.low}
                  high={p.high}
                  percentile={p.percentile}
                  delay={0.2 + i * 0.06}
                />
              ))}
            </div>
          </div>

          <div className="p-6 sm:p-7">
            <p className={sectionHeading}>
              <BadgeCheck size={18} />
              {t('aptitudeTitle')}
            </p>
            <div className="my-4 flex flex-col items-center justify-center">
              <ScoreRing percent={data.aptitudeOverall.percent} size={116} stroke={9} />
              <span className="mt-2 text-min font-bold tracking-widest text-muted-text uppercase">
                {t('overallLabel')}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4 border-t border-stroke/60 pt-4 text-center">
              {data.aptitude.map((a, i) => (
                <ScoreRing key={a.area} percent={a.percent} label={a.label} size={68} stroke={6} delay={0.3 + i * 0.08} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-md border border-action/25 bg-gradient-to-b from-tint/30 via-surface to-surface p-8 text-center shadow-xs sm:p-10">
        <p className="mb-2 text-section font-medium text-primary-text">{tp('ctaTitle')}</p>
        <p className="mx-auto mb-6 max-w-xl text-label leading-relaxed text-secondary-text">
          {tp('ctaBody', { name })}
        </p>
        <Link
          href="/career-assessment"
          className="inline-flex min-h-13 items-center justify-center gap-2 rounded-full bg-action px-12 text-body font-medium whitespace-nowrap text-white transition-colors hover:bg-action-hover"
        >
          <span>{tp('ctaButton')}</span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  )
}
