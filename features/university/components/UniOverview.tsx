interface Props {
  overview: string | null
  title: string
}

export function UniOverview({ overview, title }: Props) {
  if (!overview) return null

  const paragraphs = overview.includes('\n\n')
    ? overview.split('\n\n').map((p) => p.trim()).filter(Boolean)
    : [overview]

  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-brand-purple mb-6">{title}</h2>
      <div className="space-y-4">
        {paragraphs.map((p, i) => (
          <p key={i} className="text-gray-600 leading-relaxed">
            {p}
          </p>
        ))}
      </div>
    </div>
  )
}
