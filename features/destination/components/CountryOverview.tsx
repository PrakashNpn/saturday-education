import { getLocale, getTranslations } from 'next-intl/server'
import { formatNumber } from '@/shared/utils/formatNumber'
import type { CountryDetailData } from '../types'

interface Props {
  country: CountryDetailData
}

/** Splits a work-rights sentence into short bullet points at its natural
 *  clause breaks (";" and ". ") instead of showing it as one dense run-on
 *  sentence. Every country's value follows this pattern (hours during study;
 *  then a post-study clause), so this holds up across all of them rather
 *  than being tuned to one example. Also strips any stray em dash a clause
 *  slipped in with — left distinct from en dashes, which this same data
 *  legitimately uses for numeric ranges ("2–4 years") elsewhere. */
function splitWorkRights(text: string): string[] {
  return text
    .split(/[;.]\s+/)
    .map((s) => s.trim().replace(/[.;]+$/, '').replace(/\s*—\s*/g, ', '))
    .filter(Boolean)
}

export async function CountryOverview({ country }: Props) {
  const t = await getTranslations('destinations')
  const locale = await getLocale()
  const groupDigits = (n: number) => formatNumber(n, locale)

  // Six facts in the design's order. Anything the country has no data for is
  // dropped rather than shown blank.
  const stats = [
    [t('institutions'), country.institutionCount],
    [t('tuitionFees'), country.tuitionFeeRange],
    [t('studentLife'), country.studentSatisfaction != null && `${country.studentSatisfaction}%`],
    [
      t('internationalStudents'),
      country.internationalStudents != null && `${groupDigits(country.internationalStudents)}+`,
    ],
    [
      t('employability'),
      country.graduateEmployability != null && `${country.graduateEmployability}%`,
    ],
  ].filter((entry): entry is [string, string] => Boolean(entry[1]))

  const workRights = country.workRights ?? country.postStudyWorkVisa
  const workRightsBullets = workRights ? splitWorkRights(workRights) : []

  // The hairlines are the container showing through a 1px gap, so a part-filled
  // last row would leave a grey block. These fill it back in. Work rights
  // counts as one cell here too, so a full house of stats plus work rights
  // still lands on a clean multiple of three instead of leaving a gap.
  const cellCount = stats.length + (workRightsBullets.length > 0 ? 1 : 0)
  const fillers = (3 - (cellCount % 3)) % 3

  return (
    <>
      <h2 className="mb-2 text-min font-medium tracking-[0.06em] text-muted-text uppercase">
        {t('overviewEyebrow')}
      </h2>
      <p className="mb-2 text-section font-medium">
        {t('aboutCountry', { country: country.name })}
      </p>

      {country.overview && (
        <p className="mb-8 text-label leading-relaxed font-normal text-secondary-text">
          {country.overview}
        </p>
      )}

      {cellCount > 0 && (
        <div className="grid gap-px overflow-hidden rounded-sm border border-stroke bg-stroke sm:grid-cols-3">
          {stats.map(([label, value]) => (
            <div key={label} className="bg-surface p-5">
              <p className="mb-1 text-min font-medium text-muted-text uppercase">{label}</p>
              <p className="text-card font-medium text-primary-text">{value}</p>
            </div>
          ))}

          {workRightsBullets.length > 0 && (
            <div className="bg-surface p-5">
              <p className="mb-1 text-min font-medium text-muted-text uppercase">
                {t('workRightsLabel')}
              </p>
              <ul className="space-y-1">
                {workRightsBullets.map((bullet, i) => (
                  <li key={i} className="flex gap-1.5 text-label leading-snug font-normal text-primary-text">
                    <span aria-hidden="true" className="text-muted-text">
                      &bull;
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {Array.from({ length: fillers }, (_, i) => (
            <div key={`filler-${i}`} aria-hidden="true" className="hidden bg-surface sm:block" />
          ))}
        </div>
      )}
    </>
  )
}
