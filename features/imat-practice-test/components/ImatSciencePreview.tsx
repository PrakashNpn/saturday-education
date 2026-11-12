'use client'

import { Atom, BookOpen, BrainCircuit, Dna, FlaskConical } from 'lucide-react'
import { useTranslations } from 'next-intl'
import styles from './ImatSciencePreview.module.css'

const AREAS = [
  { id: 'biology', Icon: Dna, x: '50%', y: '9%' },
  { id: 'reading', Icon: BookOpen, x: '15%', y: '31%' },
  { id: 'chemistry', Icon: FlaskConical, x: '85%', y: '31%' },
  { id: 'reasoning', Icon: BrainCircuit, x: '17%', y: '74%' },
  { id: 'physicsMath', Icon: Atom, x: '83%', y: '74%' },
] as const

/** Decorative medical linework; not an anatomical teaching diagram. */
function MedicalStudyIllustration() {
  return <svg viewBox="0 0 440 400" fill="none" aria-hidden="true" className="absolute inset-0 size-full text-action">
    <defs>
      <radialGradient id="imat-science-wash"><stop stopColor="var(--color-light)" stopOpacity=".55" /><stop offset="1" stopColor="var(--color-tint)" stopOpacity="0" /></radialGradient>
    </defs>
    <circle cx="220" cy="200" r="180" fill="url(#imat-science-wash)" />
    <circle cx="220" cy="200" r="150" stroke="currentColor" strokeOpacity=".15" strokeDasharray="2 7" />
    <circle cx="220" cy="200" r="112" stroke="currentColor" strokeOpacity=".12" />
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) =>
      <path key={angle} d="M220 76V82" stroke="currentColor" strokeOpacity=".24" transform={`rotate(${angle} 220 200)`} />)}
    <path d="M220 83V106M109 147L133 160M331 147L307 160M119 294L141 275M321 294L299 275" stroke="currentColor" strokeOpacity=".2" />
    <circle cx="220" cy="200" r="91" fill="var(--color-surface)" stroke="currentColor" strokeOpacity=".18" />
    {/* A continuous heart study, with aortic branches and fine internal contours. */}
    <g stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M213 151C205 139 193 135 181 142C163 152 160 173 164 193C170 219 191 240 218 251C239 242 263 219 272 196C282 170 274 152 258 150C247 148 238 155 232 164" fill="var(--color-tint)" />
      <path d="M212 170C209 156 212 142 222 133C234 121 254 124 261 138L265 150M224 161C220 151 225 140 234 138C242 136 247 141 249 149" fill="var(--color-surface)" />
      <path d="M231 128L228 114M244 127L247 113M256 133L265 122M177 146L171 133M187 140L184 125" />
      <path d="M206 166C199 180 200 194 207 206C214 218 219 233 218 251M207 206L191 212M205 194L182 186M220 213C239 209 250 194 253 177M237 204L248 218M246 192L264 191" strokeWidth="1.5" />
      <path d="M179 163C173 173 175 187 181 198M229 229C240 223 251 211 256 201" strokeOpacity=".35" strokeWidth="1" />
    </g>
    <path d="M160 280H188L196 269L205 290L216 265L224 280H280" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeOpacity=".6" />
    <circle cx="160" cy="280" r="2.5" fill="currentColor" fillOpacity=".6" />
    <circle cx="280" cy="280" r="2.5" fill="currentColor" fillOpacity=".6" />
    <path d="M210 312H230M220 302V322" stroke="currentColor" strokeOpacity=".2" />
  </svg>
}

export function ImatSciencePreview() {
  const t = useTranslations('imat')
  return <div className="min-w-0 tablet:self-center">
    <p className="text-center text-min font-medium uppercase tracking-[0.12em] text-muted-text">{t('landing.previewCaption')}</p>
    <div className="relative mx-auto aspect-[440/400] w-full max-w-[460px] tablet:-ml-6 tablet:w-[calc(100%+3rem)] tablet:max-w-none">
      <MedicalStudyIllustration />
      <ul aria-label={t('landing.previewSections')} className="absolute inset-0">
        {AREAS.map(({ id, Icon, x, y }, index) => <li key={id} style={{ left: x, top: y }}
          className="absolute flex w-[29%] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 px-1 py-2 text-center text-secondary-text">
          <span style={{ animationDelay: `${index * -1.2}s` }} className={`${styles.icon} relative isolate flex size-10 items-center justify-center rounded-full border border-action/20 bg-surface text-action sm:size-11`}>
            <span aria-hidden="true" style={{ animationDelay: `${index * -2.4}s` }} className={`${styles.halo} pointer-events-none absolute -inset-1 -z-10 rounded-full bg-action/10`} />
            <Icon className="size-5" aria-hidden="true" />
          </span>
          <span className="max-w-full text-min font-medium leading-snug">{t(`landing.previewTabs.${id}`)}</span>
        </li>)}
      </ul>
    </div>
  </div>
}
