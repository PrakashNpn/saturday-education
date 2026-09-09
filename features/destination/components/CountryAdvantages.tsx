import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { cn } from '@/shared/utils/cn'
import type { CountryAdvantageData } from '../types'

interface Props {
  countryName: string
  advantages: CountryAdvantageData[]
  heroImageUrl: string | null
}

/** How many advantages sit beside the photograph. The design shows two. */
const STACKED_LIMIT = 2

const HEADING = 'mb-2 block text-body font-medium'
const COPY = 'text-label leading-relaxed font-normal'

export async function CountryAdvantages({ countryName, advantages, heroImageUrl }: Props) {
  const t = await getTranslations('destinations')

  if (advantages.length === 0) return null

  // The first advantage gets the photograph and two more stack beside it, as
  // in the design. Countries hold up to six; the rest are not shown here.
  const [lead, ...rest] = advantages
  const stacked = rest.slice(0, STACKED_LIMIT)

  return (
    <>
      <h2 className="mb-2 text-min font-medium tracking-[0.06em] text-muted-text uppercase">
        {t('whyStudyHere')}
      </h2>
      <p className="mb-8 max-w-[52ch] text-section font-medium">
        {t('theAdvantage', { country: countryName })}
      </p>

      <div
        className={cn(
          'grid divide-y divide-stroke overflow-hidden rounded-sm border border-stroke bg-surface max-tablet:grid-cols-1',
          // Only split into two columns when there is something to put in the
          // second one, so a country with a single advantage does not leave
          // half the card empty.
          stacked.length > 0 && 'lg:grid-cols-2 lg:divide-x lg:divide-y-0',
        )}
      >
        <div className="relative flex min-h-[300px] flex-col justify-end overflow-hidden p-6 max-tablet:min-h-[240px]">
          {heroImageUrl && (
            <Image
              src={heroImageUrl}
              // Decorative: the heading sitting on top of it carries the meaning.
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 400px"
              className="object-cover object-center"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-primary-text/90 via-primary-text/40 to-transparent" />

          <div className="relative z-10 text-white">
            <b className={cn(HEADING, 'text-white')}>{lead.title}</b>
            {lead.description && (
              <p className={cn(COPY, 'text-white/90')}>{lead.description}</p>
            )}
          </div>
        </div>

        {stacked.length > 0 && (
          <div className="flex flex-col divide-y divide-stroke bg-surface">
            {stacked.map((advantage) => (
              <div key={advantage.id} className="flex flex-1 flex-col justify-center p-6">
                <b className={cn(HEADING, 'text-primary-text')}>{advantage.title}</b>
                {advantage.description && (
                  <p className={cn(COPY, 'text-secondary-text')}>{advantage.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
