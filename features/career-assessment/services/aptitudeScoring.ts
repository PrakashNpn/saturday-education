// Pure aptitude scoring. Imports the server-only answer key, so this module is
// itself server-only (scoring runs inside the submit server action).

import { APTITUDE_ANSWER_KEY } from '../data/aptitudeAnswerKey'
import { APTITUDE_QUESTIONS, APTITUDE_AREA_ORDER, APTITUDE_AREA_LABELS } from '../data/aptitudeQuestions'
import { aptitudeBandFor } from '../data/aptitudeBands'
import { APTITUDE_FIELD_DIRECTIONS } from '../data/aptitudeFieldDirections'
import type { AnswerMap, AptitudeResult, AptitudeAreaResult, AptitudeDirectionGroup } from '../types'

export function scoreAptitude(answers: AnswerMap): AptitudeResult {
  const areas: AptitudeAreaResult[] = APTITUDE_AREA_ORDER.map((area) => {
    const qs = APTITUDE_QUESTIONS.filter((q) => q.area === area)
    let correct = 0
    for (const q of qs) {
      if (answers[q.id] === APTITUDE_ANSWER_KEY[q.id]) correct++
    }
    const total = qs.length
    const percent = total > 0 ? Math.round((correct / total) * 100) : 0
    return { area, label: APTITUDE_AREA_LABELS[area], correct, total, percent, band: aptitudeBandFor(percent).label }
  })

  const overallCorrect = areas.reduce((s, a) => s + a.correct, 0)
  const overallTotal = areas.reduce((s, a) => s + a.total, 0)
  const overallPercent = overallTotal > 0 ? Math.round((overallCorrect / overallTotal) * 100) : 0

  // Strength area(s) = the top scorer(s), capped at 2 for a focused message.
  const maxPercent = Math.max(...areas.map((a) => a.percent))
  const strengthAreas =
    maxPercent > 0
      ? areas
          .filter((a) => a.percent === maxPercent)
          .map((a) => a.area)
          .slice(0, 2)
      : []

  const directions: AptitudeDirectionGroup[] = strengthAreas.map((area) => ({
    area,
    label: APTITUDE_AREA_LABELS[area],
    fields: APTITUDE_FIELD_DIRECTIONS[area],
  }))

  return {
    areas,
    overallCorrect,
    overallTotal,
    overallPercent,
    overallBand: aptitudeBandFor(overallPercent).label,
    strengthAreas,
    directions,
  }
}
