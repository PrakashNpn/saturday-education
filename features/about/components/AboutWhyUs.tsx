import { useTranslations } from 'next-intl'

const REASONS = [1, 2, 3] as const
const STATS = [1, 2, 3, 4] as const

export function AboutWhyUs() {
  const t = useTranslations('about')

  return (
    <section className="border-t border-stroke py-16 max-tablet:py-12">
      <div className="mx-auto max-w-wrap px-6">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-stretch">
          <div className="flex flex-col lg:col-span-6">
            <h2 className="text-section font-medium leading-[1.2]">{t('whyTitle')}</h2>

            <div className="mt-6 space-y-5 border-t border-stroke pt-6">
              {REASONS.map((n) => (
                <div key={n} className="flex items-start gap-3.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-action" />
                  <div>
                    <b className="block text-body font-medium text-primary-text">
                      {t(`why${n}Title`)}
                    </b>
                    <p className="mt-1 text-body leading-relaxed font-light text-secondary-text">
                      {t(`why${n}Desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6">
            {/* divide-x and divide-y draw the cross between the four cells, so
                there are no per-cell borders to double up at the edges. */}
            <div className="h-full overflow-hidden rounded-[6px] border border-stroke bg-surface shadow-none">
              <div className="grid h-full grid-cols-2 divide-x divide-y divide-stroke">
                {STATS.map((n) => (
                  <div
                    key={n}
                    className="flex flex-col items-center justify-center p-6 text-center sm:p-7"
                  >
                    {/* The visa figure is the one people remember, so it is the
                        only cell that takes the action colour. */}
                    <span
                      className={`text-title font-medium sm:text-[36px] ${
                        n === 3 ? 'text-action' : 'text-primary-text'
                      }`}
                    >
                      {t(`whyStat${n}Value`)}
                    </span>
                    <span className="mt-1.5 block text-min font-medium text-muted-text">
                      {t(`whyStat${n}Label`)}
                    </span>
                    <span className="mt-1 block text-label font-normal text-secondary-text">
                      {t(`whyStat${n}Sub`)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
