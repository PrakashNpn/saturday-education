import type { CountryFAQData } from '../types'

interface Props {
  faqs: CountryFAQData[]
  eyebrow: string
  title: string
}

/** Native <details>, exactly as the design has it, so the accordion opens with
 *  no JavaScript and stays keyboard accessible for free. `list-none` plus the
 *  flex summary drops the default disclosure marker. */
export function CountryFAQs({ faqs, eyebrow, title }: Props) {
  if (faqs.length === 0) return null

  return (
    <>
      <h2 className="mb-2 text-min font-medium tracking-[0.06em] text-muted-text uppercase">
        {eyebrow}
      </h2>
      <p className="mb-6 max-w-[52ch] text-section font-medium">{title}</p>

      <div className="flex flex-col divide-y divide-stroke border-t border-b border-stroke">
        {faqs.map((faq) => (
          <details key={faq.id} className="group">
            <summary className="-mx-2.5 flex min-h-[54px] cursor-pointer list-none items-center justify-between gap-4 rounded-sm px-2.5 py-4 text-body font-medium text-primary-text transition-all duration-200 hover:bg-surface-0 hover:text-action">
              <span>{faq.question}</span>
              {/* The plus becomes a cross on open, via group-open:rotate-45. */}
              <span
                aria-hidden="true"
                className="flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-1 text-card font-light text-muted-text transition-all duration-200 group-hover:bg-surface-2 group-hover:text-primary-text group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="-mx-2.5 px-2.5 pt-1 pb-5">
              <p className="text-label leading-relaxed font-normal text-secondary-text">
                {faq.answer}
              </p>
            </div>
          </details>
        ))}
      </div>
    </>
  )
}
