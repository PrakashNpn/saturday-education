import { getTranslations } from 'next-intl/server'
import type { CountryDetailData } from '../types'

interface Props {
  country: CountryDetailData
}

/** Fixed grouping rather than the server's default locale, so the number a
 *  visitor sees does not depend on which machine rendered the page. */
const groupDigits = (n: number) => n.toLocaleString('en-US')

export async function CountryOverview({ country }: Props) {
  const t = await getTranslations('destinations')

  // Six facts in the design's order. Anything the country has no data for is
  // dropped rather than shown blank.
  const stats = [
    [t('institutions'), country.institutionCount],
    [t('tuitionFees'), country.tuitionFeeRange],
    [t('workRightsLabel'), country.workRights ?? country.postStudyWorkVisa],
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

  // The hairlines are the container showing through a 1px gap, so a part-filled
  // last row would leave a grey block. These fill it back in. They only exist
  // once the grid has three columns; below that it is a single column and every
  // cell is occupied.
  const fillers = (3 - (stats.length % 3)) % 3

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

      {stats.length > 0 && (
        <div className="grid gap-px overflow-hidden rounded-sm border border-stroke bg-stroke sm:grid-cols-3">
          {stats.map(([label, value]) => (
            <div key={label} className="bg-surface p-5">
              <p className="mb-1 text-min font-medium text-muted-text uppercase">{label}</p>
              <p className="text-card font-medium text-primary-text">{value}</p>
            </div>
          ))}
          {Array.from({ length: fillers }, (_, i) => (
            <div key={`filler-${i}`} aria-hidden="true" className="hidden bg-surface sm:block" />
          ))}
        </div>
      )}
    </>
  )
}
