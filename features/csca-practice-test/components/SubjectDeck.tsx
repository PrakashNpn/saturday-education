'use client'

import { useEffect, useState, useSyncExternalStore, type CSSProperties } from 'react'
import { useTranslations } from 'next-intl'
import type { SubjectId } from '../types'
import s from './practice.module.css'

const SUBJECTS: SubjectId[] = ['chinese-stem', 'math', 'physics', 'chemistry']
const motionQuery = '(prefers-reduced-motion: reduce)'
const subscribeMotion = (notify: () => void) => {
  const media = window.matchMedia(motionQuery)
  media.addEventListener('change', notify)
  return () => media.removeEventListener('change', notify)
}
const reducedMotion = () => window.matchMedia(motionQuery).matches
const serverMotion = () => true

/** Think Asia's four-card deck, using Saturday tokens and translated UI. */
export function SubjectDeck() {
  const t = useTranslations('csca')
  const reduce = useSyncExternalStore(subscribeMotion, reducedMotion, serverMotion)
  const [active, setActive] = useState(1)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (reduce || hovered || focused || paused) return
    let timer: ReturnType<typeof setInterval> | undefined
    const restart = () => {
      clearInterval(timer)
      if (!document.hidden) timer = setInterval(() => setActive(value => (value + 1) % SUBJECTS.length), 3000)
    }
    restart()
    document.addEventListener('visibilitychange', restart)
    return () => { clearInterval(timer); document.removeEventListener('visibilitychange', restart) }
  }, [reduce, hovered, focused, paused])

  const name = (id: SubjectId) => t(id.startsWith('chinese') ? 'design.chinese' : `subjects.${id}`)
  return <section className={s.deck} aria-label={t('fourSubjects')}
    onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}>
    <p className={s.deckHeader}>{t('fourSubjects')}</p>
    <div className={s.deckStage}>
      {SUBJECTS.map((id, index) => {
        const position = (index - active + SUBJECTS.length) % SUBJECTS.length
        return <article key={id} className={s.subjectSlide} data-position={position} aria-hidden={position !== 0}
          inert={position !== 0} style={{ '--slide-layer': SUBJECTS.length - position } as CSSProperties}>
          <div className={s.slideTop}><strong>{t('title')}</strong><span>0{index + 1} / 04</span></div>
          <h2 className={s.slideTitle}>{name(id)}</h2><p className={s.slideTopic}>{t(`design.topics.${id}`)}</p>
          {id === 'math' ? <svg className={s.heroGeometry} viewBox="0 0 280 165" role="img" aria-label={t('design.triangle')}>
            <path d="M63 17V123H220Z" stroke="currentColor" strokeWidth="1.6" fill="var(--color-tint)" />
            <path d="M63 108h15v15" fill="none" stroke="currentColor" />
            <g fill="currentColor" fontFamily="sans-serif" fontSize="22"><text x="14" y="80">6 cm</text><text x="123" y="151">8 cm</text><text x="153" y="53">?</text></g>
          </svg> : <div className={`${s.slideSymbol} ${id.startsWith('chinese') ? s.chineseSymbol : ''}`} aria-hidden="true">
            {id.startsWith('chinese') ? <span lang="zh-Hans">理解 · 表达</span> : id === 'physics' ? 'F = ma' : <>2H₂ + O₂ <span>→ 2H₂O</span></>}
          </div>}
          <div className={s.slideBottom}><span>{t(id.startsWith('chinese') ? 'chineseLanguage' : 'englishLanguage')}</span><span>{t('design.partOfPractice')}</span></div>
        </article>
      })}
    </div>
    <div className={s.deckControls}><div className={s.deckSubjects} role="group" aria-label={t('design.chooseCard')}>
      {SUBJECTS.map((id, index) => <button type="button" key={id} aria-pressed={active === index} onClick={() => setActive(index)}>{name(id)}</button>)}
    </div>{!reduce && <button type="button" className={s.deckPause} onClick={() => setPaused(value => !value)} aria-label={t(paused ? 'design.play' : 'design.pause')}><span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span></button>}</div>
  </section>
}
