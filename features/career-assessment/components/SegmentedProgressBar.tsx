'use client'

import { useTranslations } from 'next-intl'

interface Props {
  current: number // 1-based question number across the whole run
  total: number
  sectionLabel: string
  /** Question count per part, in order. Always three parts here (RIASEC,
   *  Big Five, aptitude), so this is a fixed-length tuple rather than the
   *  open-ended array the design's own three-part layout doesn't need. */
  sectionSizes: readonly [number, number, number]
}

export function SegmentedProgressBar({ current, total, sectionLabel, sectionSizes }: Props) {
  const t = useTranslations('careerAssessment.chrome')
  const percent = Math.max(0, Math.min(100, Math.round((current / total) * 100)))

  // Strictly proportional — no floor. A part's segment starts genuinely
  // empty and only fills as far as the student has actually gone.
  const fills = sectionSizes.reduce<{ consumed: number; values: number[] }>(
    (acc, size) => {
      const into = current - acc.consumed
      const fill = into <= 0 ? 0 : into >= size ? 100 : Math.round((into / size) * 100)
      return { consumed: acc.consumed + size, values: [...acc.values, fill] }
    },
    { consumed: 0, values: [] },
  ).values

  return (
    <div className="w-full border-b border-stroke bg-white/80 px-4 py-3 backdrop-blur-sm sm:px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-2 flex items-center justify-between text-min font-medium">
          <span className="font-semibold tracking-wider text-action uppercase">{sectionLabel}</span>
          <span className="font-normal text-secondary-text">
            {t('progressFraction', { percent, current, total })}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {fills.map((fill, i) => (
            <div key={i} className="relative h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-action transition-all duration-300"
                style={{ width: `${fill}%` }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
