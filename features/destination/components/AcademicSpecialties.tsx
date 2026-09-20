import { getTranslations } from 'next-intl/server'
import type { ReactNode } from 'react'

interface Props {
  specialties: string[]
}

/** The design ships six hand-drawn 16x16 glyphs. Our countries between them use
 *  around sixty different specialty names, so three more are drawn here in the
 *  same language (1.6 stroke, round caps) to cover law, health and the
 *  environmental sciences rather than stretching the original six. */
const ICONS: Record<string, ReactNode> = {
  trend: <path d="M2 13h12M4 10l3-3 2.5 2.5L13 5M10 5h3v3" strokeLinecap="round" strokeLinejoin="round" />,
  chip: (
    <>
      <rect x="3.5" y="3.5" width="9" height="9" rx="1.5" />
      <path d="M6 1.5v2M10 1.5v2M6 12.5v2M10 12.5v2M1.5 6h2M1.5 10h2M12.5 6h2M12.5 10h2" strokeLinecap="round" />
    </>
  ),
  plane: <path d="M14 2L8.5 7.5M14 2L9.5 14l-2.5-4.5L2.5 7 14 2z" strokeLinecap="round" strokeLinejoin="round" />,
  palette: (
    <path
      d="M8 2a6 6 0 100 12c.8 0 1.5-.7 1.5-1.5 0-.4-.2-.8-.4-1.1-.3-.3-.4-.7-.4-1.1 0-.8.7-1.5 1.5-1.5H12a2 2 0 002-2c0-3.3-2.7-4.8-6-4.8z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  users: (
    <>
      <circle cx="6" cy="5" r="2.5" />
      <path d="M1.5 13.5c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4M10.5 3.5a2 2 0 010 4M14.5 12.5c0-1.8-1.3-3-3-3.3" strokeLinecap="round" />
    </>
  ),
  compass: (
    <>
      <circle cx="8" cy="8" r="6" />
      <path d="M10.5 5.5l-1.8 3.2-3.2 1.8 1.8-3.2 3.2-1.8z" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  scales: <path d="M8 2.5v11M5 13.5h6M3 5h10M3 5L1.5 9h3L3 5zM13 5l-1.5 4h3L13 5z" strokeLinecap="round" strokeLinejoin="round" />,
  health: (
    <>
      <circle cx="8" cy="8" r="6" />
      <path d="M8 5v6M5 8h6" strokeLinecap="round" />
    </>
  ),
  leaf: (
    <>
      <path d="M13.5 2.5c0 6-4 9-8 9a4 4 0 01-3-1.5C4 4.5 8 2.5 13.5 2.5z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.5 13.5C4 10 7 7.5 10.5 6" strokeLinecap="round" />
    </>
  ),
  book: (
    <>
      <path d="M2.5 3.5h4a2 2 0 012 2v8a1.5 1.5 0 00-1.5-1.5h-4.5v-8.5z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13.5 3.5h-4a2 2 0 00-2 2v8a1.5 1.5 0 011.5-1.5h4.5v-8.5z" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
}

/** First pattern to match wins, so the order matters: several names carry two
 *  subjects and the leading one should decide the icon. "Hospitality & Culinary
 *  Arts" is hospitality, not art; "Law & Social Sciences" is law, not social. */
const RULES: [RegExp, keyof typeof ICONS][] = [
  [/\blaw\b|juris|legal/, 'scales'],
  [/hospitality|tourism|hotel|culinar|gastronom|\bspa\b|wellness|event/, 'compass'],
  [/aviation|aerospace|aeronaut/, 'plane'],
  [/psycholog/, 'users'],
  [/education|social work/, 'users'],
  [/medicin|medical|health|nursing|veterinar|biomedical|biological|pharmaceutic|life science|dental/, 'health'],
  [/comput|software|\bai\b|\bit\b|\bdata\b|technolog|engineer/, 'chip'],
  [/environment|agricultur|natural resource|mining|marine|ocean|natural science|food science|geolog/, 'leaf'],
  [/design|\barts?\b|creative|media|communication|literature|language|culture|liberal|architect/, 'palette'],
  [/business|financ|management|\bmba\b|economic|banking|logistic|supply|human resource|luxury|marketing|accounting/, 'trend'],
]

function iconFor(specialty: string) {
  const s = specialty.toLowerCase()
  const hit = RULES.find(([pattern]) => pattern.test(s))
  return ICONS[hit ? hit[1] : 'book']
}

export async function AcademicSpecialties({ specialties }: Props) {
  const t = await getTranslations('destinations')

  if (specialties.length === 0) return null

  return (
    <>
      <h2 className="mb-2 text-min font-medium tracking-[0.06em] text-muted-text uppercase">
        {t('popularFields')}
      </h2>
      <p className="mb-6 max-w-[52ch] text-section font-medium">{t('academicSpecialties')}</p>

      <ul className="flex flex-wrap gap-2.5">
        {specialties.map((specialty) => (
          <li
            key={specialty}
            className="inline-flex items-center gap-2 rounded-sm border border-stroke bg-surface-0 px-3.5 py-2 text-label font-medium text-primary-text"
          >
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              aria-hidden="true"
              className="size-3.5 shrink-0 text-action"
            >
              {iconFor(specialty)}
            </svg>
            <span>{specialty}</span>
          </li>
        ))}
      </ul>
    </>
  )
}
