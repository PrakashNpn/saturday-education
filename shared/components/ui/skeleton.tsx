interface Props {
  className?: string
  /** 'dark' for a skeleton sitting on one of the black/dark-purple bands
   *  (hero, CTA) — a light-grey fill would look like a rendering error there.
   *  Kept as a prop rather than an appended class so the two never collide on
   *  the same background-color property. */
  tone?: 'light' | 'dark'
}

export function Skeleton({ className, tone = 'light' }: Props) {
  return (
    <div
      className={`animate-pulse rounded-md ${tone === 'dark' ? 'bg-white/15' : 'bg-stroke'} ${className ?? ''}`}
    />
  )
}
