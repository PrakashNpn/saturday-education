interface Section {
  heading: string
  body: React.ReactNode
}

interface Props {
  title: string
  lastUpdated: string
  intro: string
  sections: Section[]
}

export default function LegalPageLayout({ title, lastUpdated, intro, sections }: Props) {
  return (
    <div className="bg-neutral-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <h1 className="font-extrabold text-brand-purple leading-tight" style={{ fontSize: 'clamp(1.75rem, 1rem + 3vw, 2.75rem)' }}>
          {title}
        </h1>
        <p className="text-sm text-gray-400 mt-3">Last updated: {lastUpdated}</p>
        <div className="w-14 h-1 bg-[#590D82] mt-5 mb-8 rounded-full" />

        <p className="text-gray-600 leading-relaxed mb-10">{intro}</p>

        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg font-bold text-gray-900 mb-3">{section.heading}</h2>
              <div className="text-gray-600 leading-relaxed space-y-3">{section.body}</div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
