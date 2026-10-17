import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import { computeBigFive, computeRiasec, computeScores } from '../features/career-assessment/services/scoring'
import { scoreAptitude } from '../features/career-assessment/services/aptitudeScoring'
import { APTITUDE_ANSWER_KEY } from '../features/career-assessment/data/aptitudeAnswerKey'
import { APTITUDE_QUESTIONS } from '../features/career-assessment/data/aptitudeQuestions'
import { RIASEC_QUESTIONS } from '../features/career-assessment/data/riasecQuestions'
import { BIG_FIVE_QUESTIONS } from '../features/career-assessment/data/bigFiveQuestions'
import type { AnswerMap } from '../features/career-assessment/types'

const all = (value: number): AnswerMap =>
  Object.fromEntries([...RIASEC_QUESTIONS, ...BIG_FIVE_QUESTIONS].map((q) => [q.id, value]))

describe('computeRiasec', () => {
  test('sums ratings per category and ranks them', () => {
    const answers: AnswerMap = {}
    for (const q of RIASEC_QUESTIONS) answers[q.id] = q.category === 'S' ? 5 : q.category === 'A' ? 4 : q.category === 'I' ? 3 : 1
    const r = computeRiasec(answers)
    assert.equal(r.scores.S, 50)
    assert.equal(r.scores.A, 40)
    assert.equal(r.scores.I, 30)
    assert.equal(r.hollandCode, 'SAI')
    assert.deepEqual(r.ranked.slice(0, 3), ['S', 'A', 'I'])
  })

  test('ties are broken in R I A S E C order, so the result is repeatable', () => {
    const r = computeRiasec(all(3))
    assert.deepEqual(r.ranked, ['R', 'I', 'A', 'S', 'E', 'C'])
    assert.equal(r.hollandCode, 'RIA')
  })

  test('unanswered questions count as zero and do not throw', () => {
    const r = computeRiasec({})
    assert.equal(r.scores.R, 0)
    assert.equal(r.hollandCode.length, 3)
  })
})

describe('computeBigFive', () => {
  test('answering 5 to everything: normal items max out and reverse items are scored low', () => {
    const r = computeBigFive(all(5))
    for (const trait of ['O', 'C', 'E', 'A', 'N'] as const) {
      const items = BIG_FIVE_QUESTIONS.filter((q) => q.trait === trait)
      const expected = items.reduce((s, q) => s + (q.reverse ? 1 : 5), 0)
      assert.equal(r.raw[trait], expected)
    }
  })

  test('percent runs from 0 for all-lowest to 100 for all-highest scoring', () => {
    const highest: AnswerMap = {}
    const lowest: AnswerMap = {}
    for (const q of BIG_FIVE_QUESTIONS) {
      highest[q.id] = q.reverse ? 1 : 5
      lowest[q.id] = q.reverse ? 5 : 1
    }
    const hi = computeBigFive(highest)
    const lo = computeBigFive(lowest)
    for (const trait of ['O', 'C', 'E', 'A', 'N'] as const) {
      assert.equal(hi.percent[trait], 100)
      assert.equal(lo.percent[trait], 0)
    }
  })

  test('percentile stays between 1 and 99 and rises with the score', () => {
    const highest: AnswerMap = {}
    const lowest: AnswerMap = {}
    for (const q of BIG_FIVE_QUESTIONS) {
      highest[q.id] = q.reverse ? 1 : 5
      lowest[q.id] = q.reverse ? 5 : 1
    }
    const hi = computeBigFive(highest)
    const lo = computeBigFive(lowest)
    for (const trait of ['O', 'C', 'E', 'A', 'N'] as const) {
      assert.ok(hi.percentile[trait] <= 99 && lo.percentile[trait] >= 1)
      assert.ok(hi.percentile[trait] > lo.percentile[trait])
    }
  })

  test('has 10 items per trait, the assumption behind the percent maths', () => {
    for (const trait of ['O', 'C', 'E', 'A', 'N']) {
      assert.equal(BIG_FIVE_QUESTIONS.filter((q) => q.trait === trait).length, 10)
    }
  })
})

test('computeScores returns both interest and personality results', () => {
  const s = computeScores(all(3))
  assert.ok(s.riasec && s.bigFive)
})

describe('scoreAptitude', () => {
  const correctAnswers = (): AnswerMap =>
    Object.fromEntries(APTITUDE_QUESTIONS.map((q) => [q.id, APTITUDE_ANSWER_KEY[q.id]]))

  test('every question has an answer key entry that is one of its options', () => {
    for (const q of APTITUDE_QUESTIONS) {
      const key = APTITUDE_ANSWER_KEY[q.id]
      assert.ok(typeof key === 'number', `${q.id} has no answer`)
      assert.ok(key >= 0 && key < q.options.length, `${q.id} answer is out of range`)
    }
  })

  test('all correct gives 100 percent in every area', () => {
    const r = scoreAptitude(correctAnswers())
    assert.equal(r.overallPercent, 100)
    assert.equal(r.overallCorrect, r.overallTotal)
    assert.ok(r.areas.every((a) => a.percent === 100))
    assert.ok(r.strengthAreas.length <= 2)
  })

  test('no answers gives 0 percent and no strength areas', () => {
    const r = scoreAptitude({})
    assert.equal(r.overallPercent, 0)
    assert.deepEqual(r.strengthAreas, [])
    assert.deepEqual(r.directions, [])
  })

  test('a single strong area becomes the strength and gets field directions', () => {
    const only = APTITUDE_QUESTIONS[0].area
    const answers: AnswerMap = {}
    for (const q of APTITUDE_QUESTIONS) if (q.area === only) answers[q.id] = APTITUDE_ANSWER_KEY[q.id]
    const r = scoreAptitude(answers)
    assert.deepEqual(r.strengthAreas, [only])
    assert.equal(r.directions[0].area, only)
    assert.ok(r.directions[0].fields.length > 0)
  })
})
