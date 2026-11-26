import type { GuideFaqData } from '../types'

interface Props {
  faqs: GuideFaqData[]
  eyebrow: string
  title: string
}

export function GuideFaqs({ faqs, eyebrow, title }: Props) {
  if (faqs.length === 0) return null

  return (
    <section className="mt-14 border-t border-stroke pt-12">
      <p className="mb-2 text-min font-medium tracking-[0.06em] text-muted-text uppercase">
        {eyebrow}
      </p>
      <h2 className="mb-7 max-w-[28ch] text-[1.35rem] leading-snug font-medium text-primary-text">
        {title}
      </h2>

      <div className="flex flex-col divide-y divide-stroke border-t border-b border-stroke">
        {faqs.map((faq) => (
          <details key={faq.id} className="group">
            <summary className="-mx-1 flex min-h-[52px] cursor-pointer list-none items-center justify-between gap-4 rounded-sm px-1 py-3.5 text-body font-medium text-primary-text transition-colors hover:text-action">
              <span>{faq.question}</span>
              <span
                aria-hidden="true"
                className="flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-1 text-card font-light text-muted-text transition-transform duration-200 group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <div className="px-1 pt-0.5 pb-5">
              <p className="text-label leading-relaxed text-secondary-text">{faq.answer}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
