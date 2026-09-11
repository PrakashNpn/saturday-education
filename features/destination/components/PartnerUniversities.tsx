import Image from 'next/image'
import type { UniversityCardData } from '../types'

interface Props {
  universities: UniversityCardData[]
  eyebrow: string
  title: string
}

/** Logo wall of the partners we can currently place students with. The cards
 *  are deliberately not links, as in the design: there are no per-university
 *  pages, the course finder covers that ground instead. */
export function PartnerUniversities({ universities, eyebrow, title }: Props) {
  if (universities.length === 0) return null

  return (
    <>
      <h2 className="mb-2 text-min font-medium tracking-[0.06em] text-muted-text uppercase">
        {eyebrow}
      </h2>
      <p className="mb-6 max-w-[52ch] text-section font-medium">{title}</p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {universities.map((university) => (
          <div
            key={university.id}
            className="flex flex-col items-center justify-between rounded-sm border border-stroke bg-surface p-4 text-center transition-colors hover:border-action/40"
          >
            {/* Fixed height whether or not a logo exists, so the cards in a row
                stay the same size and the names line up. */}
            <div className="relative mb-3 h-10 w-full">
              {university.logoUrl && (
                <Image
                  src={university.logoUrl}
                  alt=""
                  fill
                  sizes="200px"
                  className="object-contain"
                />
              )}
            </div>
            <span className="line-clamp-2 text-label leading-snug font-medium text-primary-text">
              {university.name}
            </span>
          </div>
        ))}
      </div>
    </>
  )
}
