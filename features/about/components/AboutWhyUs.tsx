import { useTranslations } from 'next-intl'

const REASONS = [1, 2, 3, 4] as const
const STATS = [1, 2, 3, 4] as const

export function AboutWhyUs() {
  const t = useTranslations('about')

  return (
    <section className="border-t border-stroke py-16 max-tablet:py-12">
      <div className="mx-auto max-w-wrap px-6">
        <h2 className="text-section font-medium leading-[1.2]">{t('whyTitle')}</h2>

        {/* items-center, not items-stretch: with 4 reasons now instead of 3,
            stretching the stats box to match the text column's height just
            padded the stat cells out with empty space instead of growing
            their content. Not items-start either — that left the (now
            shorter) box pinned to the top with an orphaned gap underneath
            it. The heading lives outside this grid (above) so centering
            lines the stats box up against just the 4 bullets, not the
            heading too — otherwise the box reads as sitting too high. */}
        <div className="mt-6 grid gap-10 lg:grid-cols-12 lg:items-center">
          <div className="flex flex-col border-t border-stroke pt-6 lg:col-span-6">
            <div className="space-y-5">
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
                    className="flex flex-col items-center justify-center p-8 text-center sm:p-10"
                  >
                    {/* Same gold as the homepage hero's own stat figures
                        (95% visa success, 3,000+ students), on all four here
                        rather than singling one out in the action colour. */}
                    <span className="text-title font-medium text-accent-ink sm:text-[36px]">
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
