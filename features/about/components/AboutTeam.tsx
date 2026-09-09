import Image from 'next/image'
import { useTranslations } from 'next-intl'

const MEMBERS = [
  { n: 1, file: 'david.webp' },
  { n: 2, file: 'raju-pokhrel.webp' },
  { n: 3, file: 'raju-dhakal.webp' },
] as const

export function AboutTeam() {
  const t = useTranslations('about')

  return (
    <section className="border-t border-stroke bg-[#f0f0f0] py-16 max-tablet:py-12">
      <div className="mx-auto max-w-wrap px-6">
        <div className="mb-8">
          <p className="mb-2 text-min font-medium tracking-[0.06em] text-muted-text uppercase">
            {t('teamLabel')}
          </p>
          <h2 className="max-w-[46ch] text-section font-medium">{t('teamTitle')}</h2>
          <p className="mt-2 max-w-[56ch] text-lede font-light text-secondary-text">
            {t('teamSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {MEMBERS.map(({ n, file }) => (
            <div
              key={n}
              className="flex flex-col overflow-hidden rounded-[6px] border border-stroke bg-surface"
            >
              {/* The pale ground behind the cut-out headshots, so the three
                  read as one set even though the crops differ. */}
              <div className="relative aspect-[4/3.3] w-full overflow-hidden border-b border-stroke bg-[#F6F2FB]">
                {/* unoptimized on purpose: these are transparent cut-outs and
                    Next's optimiser drops the alpha channel, which flattens the
                    background to black instead of letting the card's ground
                    show through. They are ~30KB each already. */}
                <Image
                  src={`/images/about/${file}`}
                  alt={t(`team${n}Name`)}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <b className="text-card font-medium text-action">{t(`team${n}Name`)}</b>
                <span className="mt-1 text-label font-normal text-muted-text">
                  {t(`team${n}Role`)}
                </span>
                <p className="mt-3 text-label leading-[1.6] font-normal text-secondary-text">
                  {t(`team${n}Bio`)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 overflow-hidden rounded-[6px] border border-stroke bg-surface">
          <div className="grid lg:grid-cols-3 lg:items-stretch">
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-2 lg:col-span-2 lg:aspect-auto lg:min-h-[320px]">
              <Image
                src="/images/about/team-meeting.webp"
                alt={t('reviewImageAlt')}
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover object-center"
              />
            </div>
            <div className="flex flex-col justify-center p-6 lg:col-span-1 lg:p-8">
              <p className="mb-2 text-min font-medium tracking-[0.06em] text-muted-text uppercase">
                {t('reviewLabel')}
              </p>
              <h3 className="mb-3 text-section leading-snug font-medium text-primary-text">
                {t('reviewTitle')}
              </h3>
              <p className="text-label leading-[1.65] font-normal text-secondary-text">
                {t('reviewBody')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
