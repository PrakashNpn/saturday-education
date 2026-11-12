import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { BANK_VERSION, PAPERS, PAST_PAPERS, QUESTION_BANK, QUESTIONS_BY_ID, SAMPLE_PAPER } from '../features/imat-practice-test/data/catalog'
import { SIMULATION_FORMAT } from '../features/imat-practice-test/data/formats'
import { createExamEngine } from '../features/imat-practice-test/services/exam'
import { createAttempt, finishAttempt, remainingSeconds, restoreAttempt, scoreAttempt, selectMockQuestions } from './helpers/imatEngine'
import type { Attempt, ExamCatalog } from '../features/imat-practice-test/types'

const NOW = 1_800_000_000_000
const encode = (attempt: Attempt) => JSON.stringify(attempt)

function generator(seed: number) {
  return () => {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0
    return seed / 2 ** 32
  }
}

describe('IMAT content integrity', () => {
  test('every question has one keyed answer, five distinct choices, and a source', () => {
    assert.equal(new Set(QUESTION_BANK.map((q) => q.id)).size, QUESTION_BANK.length)
    for (const q of QUESTION_BANK) {
      assert.equal(q.options.length, 5, q.id)
      assert.equal(new Set(q.options.map((o) => o.id)).size, 5, q.id)
      assert.equal(new Set(q.options.map((o) => o.text)).size, 5, q.id)
      assert.equal(q.options.filter((o) => o.id === q.correctOptionId).length, 1, q.id)
      assert.ok(q.prompt && q.explanation && q.source.reference, q.id)
      if (q.source.kind !== 'development') {
        assert.ok(q.source.review?.reviewer && q.source.review.checkedAt && q.source.review.reuseEvidence, q.id)
      }
    }
    // Samples must never silently be branded official when the bank is extended.
    assert.ok(QUESTION_BANK.filter((q) => q.id.startsWith('dev-')).every((q) => q.source.kind === 'development'))
  })
  test('fixed papers have exactly their declared section order and no duplicates', () => {
    for (const paper of PAPERS) {
      const sections = paper.format.sections.flatMap((s) => Array(s.count).fill(s.id))
      assert.deepEqual(paper.questionIds.map((id) => QUESTIONS_BY_ID.get(id)?.section), sections)
      assert.equal(new Set(paper.questionIds).size, paper.questionIds.length)
      if (!paper.development) {
        assert.ok(paper.year && paper.sourceUrl)
        assert.ok(paper.questionIds.every((id) => QUESTIONS_BY_ID.get(id)?.source.kind === 'official'))
        assert.ok(paper.questionIds.every((id) => QUESTIONS_BY_ID.get(id)?.source.year === paper.year))
      }
    }
    assert.ok(PAST_PAPERS.every((p) => !p.development))
  })
})

describe('IMAT random selection', () => {
  test('many random mocks preserve exact counts, section order, unique ids and complete passages', () => {
    const selections = new Set<string>()
    for (let seed = 1; seed <= 100; seed++) {
      const chosen = selectMockQuestions(QUESTION_BANK, SIMULATION_FORMAT, generator(seed))
      const ids = chosen.map((q) => q.id)
      assert.equal(chosen.length, 60)
      assert.equal(new Set(ids).size, 60)
      assert.deepEqual(chosen.map((q) => q.section), SIMULATION_FORMAT.sections.flatMap((s) => Array(s.count).fill(s.id)))
      for (const q of chosen) {
        if (!q.passage) continue
        const block = QUESTION_BANK.filter((other) => other.passage?.id === q.passage!.id).map((other) => other.id)
        assert.deepEqual(ids.slice(ids.indexOf(block[0]), ids.indexOf(block[0]) + block.length), block)
      }
      selections.add(ids.join(','))
    }
    assert.ok(selections.size > 90)
  })
  test('insufficient bank fails rather than silently creating a partial exam', () => {
    assert.throws(() => selectMockQuestions(QUESTION_BANK.filter((q) => q.section !== 'chemistry'), SIMULATION_FORMAT))
  })
  test('an unfillable passage size is rejected without splitting the passage', () => {
    const group = QUESTION_BANK.filter((q) => q.passage?.id === 'seed-study')
    assert.throws(() => selectMockQuestions(group, { ...SIMULATION_FORMAT, sections: [{ id: 'reading', count: 1 }] }))
  })
  test('selection follows the supplied blueprint rather than hardcoding current section counts', () => {
    const format = { ...SIMULATION_FORMAT, minutes: 120, sections: [{ id: 'biology' as const, count: 12 }, { id: 'chemistry' as const, count: 8 }] }
    const chosen = selectMockQuestions(QUESTION_BANK, format, generator(123))
    assert.equal(chosen.length, 20)
    assert.deepEqual(chosen.map((q) => q.section), [...Array(12).fill('biology'), ...Array(8).fill('chemistry')])
  })
})

describe('IMAT scoring', () => {
  test('all correct is 90, all wrong is negative 24, all blank is zero', () => {
    const a = createAttempt('paper', SAMPLE_PAPER.id, NOW)
    assert.equal(scoreAttempt(a).score, 0)
    assert.equal(scoreAttempt(a).unanswered, 60)
    for (const id of a.questionIds) a.answers[id] = QUESTIONS_BY_ID.get(id)!.correctOptionId
    assert.equal(scoreAttempt(a).score, 90)
    for (const id of a.questionIds) a.answers[id] = QUESTIONS_BY_ID.get(id)!.options.find((o) => o.id !== QUESTIONS_BY_ID.get(id)!.correctOptionId)!.id
    assert.equal(scoreAttempt(a).score, -24)
    assert.equal(scoreAttempt(a).incorrect, 60)
  })
  test('mixed correct, wrong and omitted answers produce exact section totals', () => {
    const a = createAttempt('paper', SAMPLE_PAPER.id, NOW)
    const [first, second] = a.questionIds
    a.answers[first] = QUESTIONS_BY_ID.get(first)!.correctOptionId
    a.answers[second] = QUESTIONS_BY_ID.get(second)!.options.find((o) => o.id !== QUESTIONS_BY_ID.get(second)!.correctOptionId)!.id
    const result = scoreAttempt(a)
    assert.equal(result.score, 1.1)
    assert.equal(result.rows[0].score, 1.1)
    assert.deepEqual([result.correct, result.incorrect, result.unanswered], [1, 1, 58])
  })
})

describe('IMAT attempts and deadlines', () => {
  test('fixed paper preserves exact questions and valid option permutations', () => {
    const a = createAttempt('paper', SAMPLE_PAPER.id, NOW)
    assert.deepEqual(a.questionIds, SAMPLE_PAPER.questionIds)
    for (const id of a.questionIds) assert.deepEqual([...a.optionOrder[id]].sort(), QUESTIONS_BY_ID.get(id)!.options.map((o) => o.id).sort())
    assert.throws(() => createAttempt('paper', 'imat-2011', NOW))
  })
  test('paper shuffles eligible choices once, scores by ID and restores old and new orders', (t) => {
    t.mock.method(Math, 'random', generator(42))
    const questions = SAMPLE_PAPER.questionIds.map((id, i) => ({ ...QUESTIONS_BY_ID.get(id)!, shuffleOptions: i !== 0 }))
    const catalog: ExamCatalog = { bankVersion: 'shuffle-test', questions, papers: [SAMPLE_PAPER], mockQuestionIds: [] }
    const engine = createExamEngine(catalog)
    const a = engine.createAttempt('paper', SAMPLE_PAPER.id, NOW)
    const next = engine.createAttempt('paper', SAMPLE_PAPER.id, NOW)
    assert.deepEqual(a.questionIds, SAMPLE_PAPER.questionIds)
    assert.notDeepEqual(a.optionOrder, next.optionOrder)
    assert.deepEqual(a.optionOrder[questions[0].id], questions[0].options.map(o => o.id))
    const correctPositions = new Set<number>()
    for (const q of questions) {
      assert.deepEqual([...a.optionOrder[q.id]].sort(), q.options.map(o => o.id).sort())
      correctPositions.add(a.optionOrder[q.id].indexOf(q.correctOptionId))
      a.answers[q.id] = q.correctOptionId
    }
    assert.equal(correctPositions.size, 5)
    a.flagged = [questions[2].id]
    a.index = 4
    assert.equal(engine.scoreAttempt(a).score, 90)
    assert.deepEqual(engine.restoreAttempt(encode(a), NOW + 1000), a)
    const completed = engine.finishAttempt(a, NOW + 1000)
    assert.deepEqual(engine.restoreAttempt(encode(completed), NOW + 2000), completed)
    // Existing attempts keep their original source order, answers and deadline.
    const old = { ...a, optionOrder: Object.fromEntries(questions.map(q => [q.id, q.options.map(o => o.id)])) }
    assert.deepEqual(engine.restoreAttempt(encode(old), NOW + 1000), old)
    const fixed = structuredClone(a)
    fixed.optionOrder[questions[0].id].reverse()
    assert.equal(engine.restoreAttempt(encode(fixed), NOW), null)
    for (const invalid of [
      ['unknown', ...a.optionOrder[questions[1].id].slice(1)],
      Array(5).fill(a.optionOrder[questions[1].id][0]),
      a.optionOrder[questions[1].id].slice(1),
    ]) {
      const broken = structuredClone(a)
      broken.optionOrder[questions[1].id] = invalid
      assert.equal(engine.restoreAttempt(encode(broken), NOW), null)
    }
  })
  test('save and restore preserves all question and option order, flags and answers', () => {
    const a = createAttempt('mock', undefined, NOW)
    a.answers[a.questionIds[0]] = a.optionOrder[a.questionIds[0]][2]
    a.flagged = [a.questionIds[2]]
    a.index = 5
    assert.deepEqual(restoreAttempt(encode(a), NOW + 50_000), a)
    assert.equal(remainingSeconds(a, NOW), 6000)
    assert.equal(remainingSeconds(a, NOW + 50_000), 5950)
  })
  test('expired attempts finish at the original deadline; finished attempts stay finished', () => {
    const a = createAttempt('mock', undefined, NOW)
    assert.equal(remainingSeconds(a, a.deadline + 1000), 0)
    const restored = restoreAttempt(encode(a), a.deadline + 1_000_000)!
    assert.equal(restored.completedAt, a.deadline)
    assert.strictEqual(finishAttempt(restored, NOW), restored)
    const early = finishAttempt(a, NOW + 1000)
    assert.deepEqual(restoreAttempt(encode(early), a.deadline + 1000), early)
  })
  test('invalid, outdated, mismatched and incomplete saves are discarded safely', () => {
    assert.equal(restoreAttempt('{bad json', NOW), null)
    assert.equal(restoreAttempt(null, NOW), null)
    const a = createAttempt('mock', undefined, NOW)
    const cases = [
      { bankVersion: `${BANK_VERSION}-old` }, { mode: 'other' }, { index: -1 }, { index: 60 },
      { startedAt: NOW + 1 }, { deadline: a.deadline + 60_000 }, { completedAt: NOW - 1 },
      { questionIds: a.questionIds.slice(1) }, { answers: { unknown: 'o1' } },
      { answers: { [a.questionIds[0]]: 'invalid' } }, { flagged: ['unknown'] },
      { optionOrder: {} }, { development: false }, { paperId: 'anything' },
      { questionIds: [a.questionIds[0], ...a.questionIds.slice(0, -1)] },
    ]
    for (const patch of cases) assert.equal(restoreAttempt(JSON.stringify({ ...a, ...patch }), NOW), null, JSON.stringify(patch))
    const b = createAttempt('paper', SAMPLE_PAPER.id, NOW)
    const ids = [...b.questionIds]
    ;[ids[0], ids[1]] = [ids[1], ids[0]]
    assert.equal(restoreAttempt(JSON.stringify({ ...b, questionIds: ids }), NOW), null)
  })
})

describe('IMAT routing and payload boundaries', () => {
  test('the page is locale-aware and uses standard metadata; messages stay scoped', () => {
    const root = path.join(__dirname, '..')
    const read = (file: string) => fs.readFileSync(path.join(root, file), 'utf8')
    assert.match(read('app/[locale]/imat-practice-test/page.tsx'), /setRequestLocale\(/)
    assert.match(read('app/[locale]/imat-practice-test/page.tsx'), /pageMetadata\(/)
    assert.match(read('app/[locale]/layout.tsx'), /PAGE_ONLY_NAMESPACES = \[\.\.\.ASSESSMENT_NAMESPACES, 'imat', 'educationEvent'\]/)
    assert.match(read('app/[locale]/imat-practice-test/layout.tsx'), /messages=\{\{ imat: messages.imat \}\}/)
    assert.match(read('shared/lib/seo/sitemap.ts'), /path: '\/imat-practice-test'/)
  })
})
