interface Section {
  heading: string
  body: React.ReactNode
}

interface Props {
  title: string
  lastUpdated: string
  intro: string
  sections: Section[]
  centerTitle?: boolean
}

export default function LegalPageLayout({ title, lastUpdated, intro, sections, centerTitle = false }: Props) {
  return (
    <div className="bg-canvas">
      <div className="mx-auto max-w-wrap px-6 py-16 max-tablet:py-10">
        <div className="mx-auto max-w-[74ch]">
          <p
            className={`mb-3 text-min font-medium tracking-[0.06em] text-muted-text uppercase ${centerTitle ? 'text-center' : ''}`}
          >
            Legal
          </p>
          <h1
            className={`text-title font-medium leading-[1.15] text-primary-text ${centerTitle ? 'text-center' : ''}`}
          >
            {title}
          </h1>
          <p className={`mt-3 text-min text-muted-text ${centerTitle ? 'text-center' : ''}`}>
            Last updated: {lastUpdated}
          </p>
          <div
            className={`mt-5 mb-10 h-1 w-14 rounded-full bg-action max-tablet:mb-6 ${centerTitle ? 'mx-auto' : ''}`}
          />

          <p className="mb-2 text-body leading-relaxed text-secondary-text">{intro}</p>

          <div className="divide-y divide-stroke">
            {sections.map((section) => (
              <section key={section.heading} className="py-8 max-tablet:py-6">
                <h2 className="mb-3 text-section font-medium text-primary-text">{section.heading}</h2>
                <div className="space-y-4 text-body leading-relaxed text-secondary-text">{section.body}</div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
