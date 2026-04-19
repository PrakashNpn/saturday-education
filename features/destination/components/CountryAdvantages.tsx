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
      <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-6">
        {t('theAdvantage', { country: countryName })}
      </h2>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Left: image overlay with first advantage */}
        <div className="relative rounded-2xl overflow-hidden min-h-[260px] md:min-h-[320px]">
          {/* Solid gradient base — always visible, acts as fallback when image 404s */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-brand-purple" />
          {/* Decorative image on top — empty alt suppresses broken alt text */}
          {heroImageUrl && (
            <img
              src={heroImageUrl}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-40"
            />
          )}
          {/* Dark gradient overlay from bottom for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="relative z-10 flex flex-col justify-end h-full p-6">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mb-3">
              <span className="text-white text-sm font-bold">1</span>
            </div>
            <h3 className="text-white font-bold text-lg mb-1">{first.title}</h3>
            {first.description && (
              <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
                {first.description}
              </p>
            )}
          </div>
        </div>

        {/* Right: remaining advantage cards stacked */}
        <div className="flex flex-col gap-5">
          {rest.slice(0, 2).map((adv, i) => (
            <div
              key={adv.id}
              className="flex-1 bg-white border border-gray-200 rounded-2xl p-6 flex flex-col gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-brand-purple-50 flex items-center justify-center flex-shrink-0">
                <span className="text-brand-purple text-sm font-bold">{i + 2}</span>
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 mb-1">{adv.title}</h3>
                {adv.description && (
                  <p className="text-gray-600 text-sm leading-relaxed">{adv.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
