'use client'

import { useFormatter, useTranslations } from 'next-intl'
import { ArrowDown, ArrowUpRight, BookOpen, Check, Clock3, ListChecks, MoveRight, Plus, Shuffle } from 'lucide-react'
import { OFFICIAL_ARCHIVE } from '../data/papers'
import { SIMULATION_FORMAT } from '../data/formats'
import { ImatSciencePreview } from './ImatSciencePreview'
import { PRIMARY_BUTTON } from './styles'

const UNIVERSITY_GUIDE = 'https://international.unime.it/study-us/english-taught-programmes/imat-test-info-page'
const EYEBROW = 'text-min font-semibold uppercase tracking-[0.12em] text-action'
const SECTION_HEADING = 'text-title font-medium leading-tight text-primary-text'
const PRACTICE_STEPS = [
  { Icon: ListChecks, title: 'landing.expectNavigate', body: 'landing.expectNavigateBody' },
  { Icon: Clock3, title: 'landing.expectSave', body: 'landing.expectSaveBody' },
  { Icon: Check, title: 'landing.expectReview', body: 'landing.expectReviewBody' },
] as const

export function ImatLanding({ onStart, children }: {
  onStart: (mode?: 'mock' | 'paper') => void; children?: React.ReactNode
}) {
  const t = useTranslations('imat')
  const formatter = useFormatter()
  return <>
    <section className="relative overflow-hidden bg-surface">
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 top-20 size-[540px] rounded-full bg-tint blur-3xl" />
      <div className="relative mx-auto grid max-w-wrap items-start gap-12 px-6 py-12 sm:py-16 tablet:grid-cols-2">
        <div className="min-w-0">
          <h1 className="mb-6 text-action">
            <span className="block text-[clamp(5.5rem,10vw,7rem)] font-semibold leading-none tracking-[-0.07em]">IMAT<span className="text-action-hover">.</span></span>
            <span className="mt-3 block text-label font-normal tracking-normal text-secondary-text">{t('landing.fullName')}</span>
          </h1>
          <div className="mb-6 flex items-center gap-4 text-min font-normal text-muted-text"><span>{t('landing.practiceWith')}</span><span className="h-px flex-1 bg-stroke" /></div>
          <h2 className="text-title font-medium leading-[1.2] text-primary-text">{t('landing.headline')} <span className="text-action">{t('landing.headlineAccent')}</span></h2>
          <p className="mb-7 mt-5 max-w-[43ch] text-label font-normal leading-relaxed text-secondary-text">{t('landing.heroBody')}</p>
          <button type="button" onClick={() => onStart()} className={`${PRIMARY_BUTTON} min-h-14 w-full justify-between px-6 shadow-[0_8px_20px_-12px_var(--color-deep)]`}>{t('landing.start')}<ArrowUpRight className="size-5 shrink-0" aria-hidden="true" /></button>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 text-min font-normal">
            <a href="#about-imat" className="inline-flex min-h-11 items-center gap-1.5 font-medium text-action hover:underline focus-visible:outline-2 focus-visible:outline-action">{t('landing.learn')}<ArrowDown className="size-3.5" aria-hidden="true" /></a>
            <span className="text-muted-text">{t('freeAccess')}</span>
          </div>
        </div>
        <ImatSciencePreview />
      </div>
    </section>
    <div className="mx-auto max-w-wrap px-6">{children}</div>

    <section id="about-imat" className="scroll-mt-24 bg-surface py-16 sm:py-20">
      <div className="mx-auto grid max-w-wrap gap-8 border-t border-stroke px-6 pt-12 tablet:grid-cols-[.8fr_1.2fr] tablet:gap-16">
        <div><p className={EYEBROW}>{t('landing.aboutEyebrow')}</p><h2 className={`${SECTION_HEADING} mt-4`}>{t('landing.aboutTitle')}</h2></div>
        <div><p className="text-lede font-normal leading-relaxed text-secondary-text">{t('landing.aboutBody')}</p>
          <div className="mt-7 grid grid-cols-3 gap-3 border-t border-stroke pt-6">
            {[['60', 'landing.questionsLabel'], ['100', 'landing.minutesLabel'], ['English', 'landing.languageLabel']].map(([value, key]) => <div key={key}><p className="text-section font-semibold text-deep">{value}</p><p className="mt-1 text-min font-normal text-muted-text">{t(key)}</p></div>)}
          </div>
          <p className="mt-5 text-min font-normal text-muted-text">{t('landing.formatNote')}</p>
        </div>
      </div>
    </section>

    <section className="border-y border-stroke bg-tint/50 py-16 sm:py-20">
      <div className="mx-auto max-w-wrap px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-5"><div><p className={EYEBROW}>{t('landing.structureEyebrow')}</p><h2 className={`${SECTION_HEADING} mt-4`}>{t('landing.structureTitle')}</h2></div><p className="max-w-sm text-label font-normal text-secondary-text">{t('landing.structureBody')}</p></div>
        <div className="grid gap-3 sm:grid-cols-2 tablet:grid-cols-5">
          {SIMULATION_FORMAT.sections.map(({ id, count }, i) => <div key={id} className="flex flex-col rounded-lg border border-action/15 bg-surface p-5">
            <span className="text-min font-normal text-muted-text">0{i + 1}</span><h3 className="mb-5 mt-4 text-label font-medium text-primary-text">{t(`sections.${id}`)}</h3>
            <p className="mt-auto text-title font-semibold text-action">{count}<span className="ml-1 text-min font-normal text-muted-text">/ 60</span></p>
          </div>)}
        </div>
        <p className="mt-5 text-min font-normal text-muted-text">{t('landing.formatNote')}</p>
      </div>
    </section>

    <section className="mx-auto max-w-wrap px-6 py-16 sm:py-20">
      <div className="grid gap-8 tablet:grid-cols-[.8fr_1.2fr] tablet:gap-16">
        <div><p className={EYEBROW}>{t('landing.scoringEyebrow')}</p><h2 className={`${SECTION_HEADING} mt-4`}>{t('landing.scoringTitle')}</h2><p className="mt-5 text-label font-normal text-secondary-text">{t('landing.scoringBody')}</p></div>
        <div><div className="grid grid-cols-3 gap-3">
          {[[SIMULATION_FORMAT.correct, 'correct'], [SIMULATION_FORMAT.incorrect, 'incorrect'], [0, 'unanswered']].map(([value, key]) => <div key={key} className="rounded-lg border border-stroke p-4 sm:p-5"><p className={`text-section font-semibold tabular-nums ${Number(value) > 0 ? 'text-action' : 'text-primary-text'}`}>{Number(value) > 0 ? '+' : ''}{formatter.number(Number(value))}</p><p className="mt-2 text-min font-normal text-muted-text">{t(String(key))}</p></div>)}
          </div><div className="mt-4 rounded-lg bg-surface-0 p-5"><p className="mb-2 text-min font-semibold uppercase tracking-wide text-action">{t('landing.exampleLabel')}</p><p className="text-label font-normal leading-relaxed text-secondary-text">{t('landing.scoringExample', { correct: 40, incorrect: 10, blank: 10, score: formatter.number(56) })}</p></div>
        </div>
      </div>
    </section>

    <section className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-wrap px-6"><p className={EYEBROW}>{t('landing.modesEyebrow')}</p><h2 className={`${SECTION_HEADING} mt-4`}>{t('landing.modesTitle')}</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">{(['mock', 'paper'] as const).map((mode) => {
          const Icon = mode === 'mock' ? Shuffle : BookOpen
          return <div key={mode} className="flex flex-col rounded-xl border border-stroke p-6 sm:p-8"><Icon className="mb-6 size-7 text-action" aria-hidden="true" /><h3 className="text-card font-semibold text-primary-text">{t(mode === 'mock' ? 'mockTitle' : 'paperTitle')}</h3><p className="mb-6 mt-3 text-label font-normal leading-relaxed text-secondary-text">{t(mode === 'mock' ? 'mockDescription' : 'paperDescription')}</p><button type="button" onClick={() => onStart(mode)} className="mt-auto flex min-h-11 cursor-pointer items-center justify-between gap-3 text-left text-label font-medium text-action hover:underline focus-visible:outline-2 focus-visible:outline-action">{t(mode === 'mock' ? 'landing.chooseMock' : 'landing.choosePaper')}<MoveRight className="size-5" aria-hidden="true" /></button></div>
        })}</div>
      </div>
    </section>

    <section className="mx-auto max-w-wrap px-6 py-16 sm:py-20"><p className={EYEBROW}>{t('landing.expectEyebrow')}</p><h2 className={`${SECTION_HEADING} mt-4`}>{t('landing.expectTitle')}</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">{PRACTICE_STEPS.map(({ Icon, title, body }) =>
        <div key={title} className="border-t border-stroke pt-6"><Icon className="mb-5 size-5 text-action" aria-hidden="true" /><h3 className="text-label font-semibold text-primary-text">{t(title)}</h3><p className="mt-3 text-label font-normal leading-relaxed text-secondary-text">{t(body)}</p></div>,
      )}</div>
    </section>

    <section className="border-t border-stroke bg-surface py-16 sm:py-20"><div className="mx-auto grid max-w-wrap gap-8 px-6 tablet:grid-cols-[.8fr_1.2fr] tablet:gap-16">
      <div><p className={EYEBROW}>{t('landing.faqEyebrow')}</p><h2 className={`${SECTION_HEADING} mt-4`}>{t('landing.faqTitle')}</h2><a href={UNIVERSITY_GUIDE} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 text-label font-medium text-action underline underline-offset-4">{t('landing.officialGuide')}<ArrowUpRight className="size-4" aria-hidden="true" /><span className="sr-only">{t('newTab')}</span></a></div>
      <div>{['format', 'registration', 'papers'].map((key) => <details key={key} className="group border-b border-stroke first:border-t"><summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 py-5 text-label font-medium text-primary-text [&::-webkit-details-marker]:hidden">{t(`landing.faq.${key}Q`)}<Plus className="size-4 shrink-0 text-action transition-transform group-open:rotate-45" aria-hidden="true" /></summary><p className="pb-5 pr-6 text-label font-normal leading-relaxed text-secondary-text">{t(`landing.faq.${key}A`)}</p></details>)}
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">{[[OFFICIAL_ARCHIVE, 'officialArchive'], ['https://www.universitaly.it/', 'landing.registrationLink']].map(([href, label]) => <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1.5 text-min font-medium text-action underline underline-offset-4">{t(label)}<ArrowUpRight className="size-3.5" aria-hidden="true" /><span className="sr-only">{t('newTab')}</span></a>)}</div>
      </div>
    </div></section>

    <section className="bg-deep py-14 pb-24 text-white sm:py-16"><div className="mx-auto flex max-w-wrap flex-wrap items-center justify-between gap-7 px-6"><div><p className="mb-3 text-min font-medium uppercase tracking-[0.12em] text-light">{t('landing.finalEyebrow')}</p><h2 className="text-title font-medium">{t('landing.finalTitle')}</h2><p className="mt-3 text-label font-normal text-white/75">{t('landing.finalBody')}</p></div><button type="button" onClick={() => onStart()} className="inline-flex min-h-14 cursor-pointer items-center justify-between gap-6 rounded-full bg-light px-7 text-label font-semibold text-deep hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light">{t('landing.start')}<ArrowUpRight className="size-5" aria-hidden="true" /></button></div></section>
  </>
}
