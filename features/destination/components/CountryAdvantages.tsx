import { getTranslations } from 'next-intl/server'
import type { CountryAdvantageData } from '../types'

interface Props {
  countryName: string
  advantages: CountryAdvantageData[]
  heroImageUrl: string | null
}

export async function CountryAdvantages({ countryName, advantages, heroImageUrl }: Props) {
  const t = await getTranslations('destinations')

  if (advantages.length === 0) return null

  const [first, ...rest] = advantages

  return (
    <div>
      {/* Section header */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-1.5 bg-brand-purple-50 text-brand-purple text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
          {t('whyStudyHere')}
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
          {t('theAdvantage', { country: countryName })}
        </h2>
        <p className="text-gray-500 text-sm md:text-base">{t('advantageSubtitle')}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Left: image overlay with first advantage */}
        <div className="relative rounded-2xl overflow-hidden min-h-[260px] md:min-h-[320px]">
          {heroImageUrl ? (
            <img
              src={heroImageUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-brand-purple" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="relative z-10 flex flex-col justify-end h-full p-6">
            <h3 className="text-white font-bold text-lg mb-1">{first.title}</h3>
            {first.description && (
              <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
                {first.description}
              </p>
            )}
          </div>
        </div>

        {/* Right: alternating decorative ring cards */}
        <div className="flex flex-col gap-5">
          {rest.slice(0, 2).map((adv, i) => (
            <div
              key={adv.id}
              className="relative flex-1 bg-gradient-to-br from-brand-purple-50/50 to-white border border-brand-purple/10 rounded-2xl p-6 overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              {/* Concentric rings — top-right on first card, bottom-left on second */}
              <div className={`absolute pointer-events-none ${i === 0 ? '-top-8 -right-8' : '-bottom-8 -left-8'}`}>
                <div className="relative w-32 h-32">
                  <div className="absolute inset-0 rounded-full border border-brand-purple/[0.07]" />
                  <div className="absolute inset-4 rounded-full border border-brand-purple/[0.07]" />
                  <div className="absolute inset-8 rounded-full border border-brand-purple/[0.07]" />
                  <div className="absolute inset-0 rounded-full bg-brand-purple/[0.1]" />
                </div>
              </div>
              <h3 className="relative font-bold text-brand-purple mb-2">{adv.title}</h3>
              {adv.description && (
                <p className="relative text-gray-600 text-sm leading-relaxed">{adv.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
