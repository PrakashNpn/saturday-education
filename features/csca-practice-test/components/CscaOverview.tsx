'use client'

import { useTranslations } from 'next-intl'
import { PracticeButton } from '@/shared/components/practice-test/PracticeButton'
import { PAPER_FORMATS } from '../config'
import type { SubjectId } from '../types'
import s from './practice.module.css'

const SUBJECTS: { id: SubjectId; key: string; symbol: string }[] = [
  { id: 'chinese-stem', key: 'chinese', symbol: '中' },
  { id: 'math', key: 'math', symbol: 'ƒ' },
  { id: 'physics', key: 'physics', symbol: '↗' },
  { id: 'chemistry', key: 'chemistry', symbol: 'H₂' },
]
const UNIVERSITY_GUIDE = 'https://admission.zstu.edu.cn/En/Csca?classId=78'

export function CscaOverview({ onStart }: { onStart: () => void }) {
  const t = useTranslations('csca')
  return <div id="about-csca" className={s.overview}>
    <section className={s.overviewOpening} aria-labelledby="csca-overview-title">
      <div><p className={s.eyebrow}>{t('aboutLink')}</p><h2 id="csca-overview-title">{t('overview.heading')}</h2></div>
      <div className={s.overviewDefinition}><span className={s.overviewIndex}>01 / {t('aboutTitle')}</span><p>{t('aboutIntro')}</p><a href="https://csca.cn/home" target="_blank" rel="noopener noreferrer">{t('officialLink')} ↗</a></div>
    </section>

    <section className={s.overviewImportance} aria-labelledby="csca-purpose-title">
      <p className={s.overviewIndex}>02 / {t('overview.why')}</p><h2 id="csca-purpose-title">{t('prepareTitle')}</h2>
      <div className={s.overviewReasons}>{['application', 'foundations', 'focus'].map((key, index) => <article key={key}><span aria-hidden="true">0{index + 1}</span><h3>{t(`overview.${key}Title`)}</h3><p>{t(`overview.${key}Body`)}</p></article>)}</div>
    </section>

    <section className={s.overviewSubjects} aria-labelledby="csca-subjects-title">
      <div className={s.overviewSectionHeading}><div><p className={s.overviewIndex}>03 / {t('overview.subjects')}</p><h2 id="csca-subjects-title">{t('overview.subjectsTitle')}</h2></div><p>{t('overview.subjectsIntro')}</p></div>
      <div className={s.overviewSubjectGrid}>{SUBJECTS.map(({ id, key, symbol }) => <article key={id}>
        <div className={s.overviewSubjectTop}><span aria-hidden="true">{symbol}</span><span>{t('overview.score')}</span></div>
        <h3>{t(key === 'chinese' ? 'design.chinese' : `subjects.${id}`)}</h3>
        <p className={s.overviewSubjectDetail}>{t(`overview.${key}Detail`)}</p><p>{t(`overview.${key}Body`)}</p>
        <div className={s.overviewSubjectMeta}><strong>{t('format', PAPER_FORMATS[id])}</strong><span>{t('overview.multipleChoice')}</span><span>{t(key === 'chinese' ? 'chineseLanguage' : 'englishLanguage')}</span></div>
      </article>)}</div>
      <p className={s.overviewSource}>{t('overview.languageNote')} <a href={UNIVERSITY_GUIDE} target="_blank" rel="noopener noreferrer">{t('overview.source')} ↗</a></p>
    </section>

    <section className={s.overviewPlanning} aria-labelledby="csca-planning-title">
      <div><p className={s.overviewIndex}>04 / {t('overview.plan')}</p><h2 id="csca-planning-title">{t('overview.planTitle')}</h2><p>{t('guideNote')}</p><p>{t('overview.planBody')}</p><a href={UNIVERSITY_GUIDE} target="_blank" rel="noopener noreferrer">{t('design.subjectGuide')} ↗</a></div>
      <div className={s.overviewPaths}>{['engineering', 'medicine', 'humanities'].map(key => <article key={key}><h3>{t(`directions.${key}`)}</h3><p>{t(`directionNotes.${key}`)}</p></article>)}</div>
    </section>

    <section className={s.overviewHow} aria-labelledby="csca-how-title"><div className={s.overviewSectionHeading}><div><p className={s.overviewIndex}>05 / {t('overview.practice')}</p><h2 id="csca-how-title">{t('overview.howTitle')}</h2></div><p>{t('overview.independent')}</p></div>
      <ol className={s.overviewSteps}>{['choose', 'complete', 'review'].map((key, index) => <li key={key}><span aria-hidden="true">0{index + 1}</span><h3>{t(`overview.${key}Title`)}</h3><p>{t(`overview.${key}Body`)}</p></li>)}</ol>
    </section>

    <section className={s.overviewFaq} aria-labelledby="csca-faq-title"><div><p className={s.overviewIndex}>{t('overview.answers')}</p><h2 id="csca-faq-title">{t('faqTitle')}</h2></div><div>{['subjects', 'chinese', 'scores'].map(key => <details key={key}><summary>{t(`faq.${key}Title`)}</summary><p>{t(`faq.${key}Body`)}</p></details>)}<details><summary>{t('overview.datesTitle')}</summary><p>{t('overview.datesBody')} <a href="https://csca.cn/home" target="_blank" rel="noopener noreferrer">{t('officialLink')} ↗</a></p></details></div></section>
    <div className={s.overviewCta}><div><h2>{t('overview.ready')}</h2><p>{t('free')}</p></div><PracticeButton onClick={onStart}>{t('build')} <span aria-hidden="true">↗</span></PracticeButton></div>
  </div>
}
