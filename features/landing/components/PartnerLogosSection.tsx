import type { CSSProperties } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

type Logo = { alt: string; file: string }
type Row = { direction: 'left' | 'right'; duration: number; logos: Logo[] }

// Three rows travelling at different speeds and in alternating directions, so
// the wall never reads as one block sliding. Split alphabetically, 13/12/12,
// and the durations are the design's own.
const ROWS: Row[] = [
  {
    direction: 'right',
    duration: 72,
    logos: [
      { alt: "AIHM", file: "aihm.webp" },
      { alt: "Alexander College", file: "alexander-college.webp" },
      { alt: "Asia Pacific International University", file: "asia-pacific-international-university.webp" },
      { alt: "BSBI", file: "bsbi.webp" },
      { alt: "Braemar College", file: "braemar-college.webp" },
      { alt: "Carlos V Education, Spain", file: "carlos-v-education-spain.webp" },
      { alt: "Dusit Thani College", file: "dusit-thani-college.webp" },
      { alt: "EU Business School", file: "eu-business-school.webp" },
      { alt: "George Brown College", file: "george-brown-college.webp" },
      { alt: "GISMA", file: "gisma.webp" },
      { alt: "Global Academy at Siam University", file: "global-academy-at-siam-university.webp" },
      { alt: "Humber College", file: "humber-college.webp" },
      { alt: "IBAT College", file: "ibat-college.webp" },
    ],
  },
  {
    direction: 'left',
    duration: 88,
    logos: [
      { alt: "IBS Hungary", file: "ibs-hungary.webp" },
      { alt: "James Cook University", file: "james-cook-university.webp" },
      { alt: "Keyano College", file: "keyano-college.webp" },
      { alt: "Kings University College Malaysia", file: "kings-university-college-malaysia.webp" },
      { alt: "Lincoln University, New Zealand", file: "lincoln-university-new-zealand.webp" },
      { alt: "MAHSA University", file: "mahsa-university.webp" },
      { alt: "Maynooth University", file: "maynooth-university.webp" },
      { alt: "Munich Business School", file: "munich-business-school.webp" },
      { alt: "NCI Ireland", file: "nci-ireland.webp" },
      { alt: "SBS Spain", file: "sbs-spain.webp" },
      { alt: "SEGi", file: "segi.webp" },
      { alt: "SRH", file: "srh.webp" },
    ],
  },
  {
    direction: 'right',
    duration: 80,
    logos: [
      { alt: "Stamford International University", file: "stamford-international-university.webp" },
      { alt: "TU Dublin", file: "tu-dublin.webp" },
      { alt: "TUS Ireland", file: "tus-ireland.webp" },
      { alt: "UCSI", file: "ucsi.webp" },
      { alt: "UE Applied Sciences", file: "ue-applied-sciences.webp" },
      { alt: "UTCC", file: "utcc.webp" },
      { alt: "University Canada West", file: "university-canada-west.webp" },
      { alt: "University of Malaya-Wales", file: "university-of-malaya-wales.webp" },
      { alt: "University of Wollongong Dubai", file: "university-of-wollongong-dubai.webp" },
      { alt: "Webster University, Geneva", file: "webster-university-geneva.webp" },
      { alt: "Westminster College", file: "westminster-college.webp" },
      { alt: "Wittenborg University of Applied Sciences", file: "wittenborg-university-of-applied-sciences.webp" },
    ],
  },
]

export default function PartnerLogosSection() {
  const t = useTranslations('Landing.partners')

  return (
    // A light teal wash that fades to plain white behind the heading. It stops
    // well above the logo rows on purpose: about a third of the logos are
    // images with a solid white background, which would show as boxes on any
    // tint, so the rows stay on pure white. The stops are in pixels so the
    // fade ends at the same place however many lines the heading wraps to.
    <section className="border-y border-stroke bg-surface bg-[linear-gradient(180deg,rgba(197,248,255,.24)_0px,rgba(240,251,253,.34)_70px,#fff_150px)] py-14 max-tablet:py-10">
      <div className="mx-auto mb-10 max-w-wrap px-6 text-center">
        <h2 className="mb-2 text-min font-medium tracking-[0.06em] text-muted-text uppercase">
          {t('eyebrow')}
        </h2>
        <p className="mx-auto max-w-[46ch] text-section font-medium">{t('headline')}</p>
      </div>

      <div className="flex flex-col gap-3">
        {ROWS.map((row, rowIndex) => (
          <div key={rowIndex} className="marquee">
            <div
              className={`marquee-track marquee-track--${row.direction}`}
              style={{ '--marquee-duration': `${row.duration}s` } as CSSProperties}
            >
              {/* The list is rendered twice and the track slides by half its
                  width, which is what makes the loop seamless. The copy is
                  hidden from screen readers so the names are not read out
                  twice. */}
              {[false, true].map((isClone) => (
                <ul key={String(isClone)} className="flex" aria-hidden={isClone}>
                  {row.logos.map((logo) => (
                    <li
                      key={logo.file}
                      className="mx-7 flex h-12 w-32 shrink-0 items-center justify-center"
                    >
                      <span className="relative h-full w-full">
                        <Image
                          src={`/images/partners/${logo.file}`}
                          alt={isClone ? '' : logo.alt}
                          fill
                          unoptimized
                          sizes="128px"
                          className="object-contain"
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
