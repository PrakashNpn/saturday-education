import { SIMULATION_FORMAT } from '../data/formats'
import { isCorrectOption, questionScore } from './scoring'
import type { Attempt, ExamCatalog, ExamFormat, Question } from '../types'

export function createExamEngine(catalog: ExamCatalog) {
  const BANK_VERSION = catalog.bankVersion
  const PAPERS = catalog.papers
  const QUESTION_BANK = catalog.questions
  const QUESTIONS_BY_ID = new Map(QUESTION_BANK.map(q => [q.id, q]))
  const mockBank = QUESTION_BANK.filter(q => catalog.mockQuestionIds.includes(q.id))
  function shuffled<T>(values: readonly T[], random = Math.random): T[] {
    const result = [...values]
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1))
      ;[result[i], result[j]] = [result[j], result[i]]
    }
    return result
  }

  /** Exact selection by section. Passage blocks are indivisible, including when shuffled.
   * Bounded subset selection avoids unreliable retries when block sizes vary. */
  function selectMockQuestions(bank: Question[], format: ExamFormat, random = Math.random): Question[] {
    return format.sections.flatMap(({ id, count }) => {
      const groups = new Map<string, Question[]>()
      for (const question of bank.filter((q) => q.section === id)) {
        const key = question.passage ? `passage:${question.passage.id}` : `question:${question.id}`
        groups.set(key, [...(groups.get(key) ?? []), question])
      }
      const choices = new Map<number, Question[][]>([[0, []]])
      for (const group of shuffled([...groups.values()], random)) {
        for (const [size, selected] of [...choices.entries()]) {
          const next = size + group.length
          if (next <= count && !choices.has(next)) choices.set(next, [...selected, group])
        }
      }
      const chosen = choices.get(count)
      if (!chosen) throw new Error(`Insufficient compatible questions for ${id}`)
      return chosen.flat()
    })
  }

  function formatFor(attempt: Pick<Attempt, 'mode' | 'paperId'>): ExamFormat {
    if (attempt.mode === 'mock') return SIMULATION_FORMAT
    const paper = PAPERS.find((p) => p.id === attempt.paperId)
    if (!paper) throw new Error('Unknown paper')
    return paper.format
  }

  function createAttempt(mode: Attempt['mode'], paperId?: string, now = Date.now()): Attempt {
    const paper = mode === 'paper' ? PAPERS.find((p) => p.id === paperId) : undefined
    if (mode === 'paper' && !paper) throw new Error('Paper is not available')
    const format = paper?.format ?? SIMULATION_FORMAT
    const questions = paper
      ? paper.questionIds.map((id) => {
          const question = QUESTIONS_BY_ID.get(id)
          if (!question) throw new Error('Paper contains an unknown question')
          return question
        })
      : selectMockQuestions(mockBank, format)
    return {
      version: 1, bankVersion: BANK_VERSION, id: crypto.randomUUID(), mode,
      paperId: paper?.id ?? null,
      development: questions.some((q) => q.source.kind === 'development'),
      questionIds: questions.map((q) => q.id),
      optionOrder: Object.fromEntries(questions.map((q) => [q.id,
        (q.shuffleOptions !== false ? shuffled(q.options) : q.options).map((o) => o.id)])),
      answers: {}, flagged: [], index: 0, startedAt: now,
      deadline: now + format.minutes * 60_000, completedAt: null, leadCaptured: false,
    }
  }

  function remainingSeconds(attempt: Attempt, now = Date.now()): number {
    return Math.max(0, Math.ceil((attempt.deadline - now) / 1000))
  }

  function finishAttempt(attempt: Attempt, now = Date.now()): Attempt {
    if (attempt.completedAt !== null) return attempt
    return { ...attempt, completedAt: Math.min(attempt.deadline, Math.max(attempt.startedAt, now)) }
  }

  function scoreAttempt(attempt: Attempt) {
    const format = formatFor(attempt)
    const rows = format.sections.map(({ id }) => {
      const questions = attempt.questionIds.map((qid) => QUESTIONS_BY_ID.get(qid)!).filter((q) => q.section === id)
      let correct = 0
      let incorrect = 0
      let scoreHundredths = 0
      for (const q of questions) {
        const answer = attempt.answers[q.id]
        scoreHundredths += questionScore(q, answer, format)
        if (answer === undefined) continue
        if (isCorrectOption(q, answer)) correct++
        else incorrect++
      }
      return {
        id, total: questions.length, correct, incorrect, unanswered: questions.length - correct - incorrect,
        // Preserve historical quarter-point penalties as well as current tenths.
        score: scoreHundredths / 100,
      }
    })
    return {
      rows,
      score: rows.reduce((total, row) => total + Math.round(row.score * 100), 0) / 100,
      maximum: attempt.questionIds.length * format.correct,
      correct: rows.reduce((n, row) => n + row.correct, 0),
      incorrect: rows.reduce((n, row) => n + row.incorrect, 0),
      unanswered: rows.reduce((n, row) => n + row.unanswered, 0),
    }
  }

  const record = (value: unknown): value is Record<string, unknown> =>
    value !== null && typeof value === 'object' && !Array.isArray(value)
  const strings = (value: unknown): value is string[] => Array.isArray(value) && value.every((v) => typeof v === 'string')

  /** Browser storage is untrusted and may belong to an older question bank. */
  function restoreAttempt(raw: string | null, now = Date.now()): Attempt | null {
    if (!raw || raw.length > 250_000) return null
    try {
      const a: unknown = JSON.parse(raw)
      if (!record(a) || a.version !== 1 || a.bankVersion !== BANK_VERSION ||
        typeof a.id !== 'string' || !a.id || !['mock', 'paper'].includes(String(a.mode)) ||
        typeof a.development !== 'boolean' || !strings(a.questionIds) ||
        !record(a.answers) || !record(a.optionOrder) || !strings(a.flagged)) return null
      const ids = a.questionIds
      if (a.leadCaptured !== undefined && typeof a.leadCaptured !== 'boolean') return null
      const idSet = new Set(ids)
      if (!ids.length || idSet.size !== ids.length || ids.some((id) => !QUESTIONS_BY_ID.has(id))) return null
      if (!Number.isInteger(a.index) || Number(a.index) < 0 || Number(a.index) >= ids.length) return null
      if (typeof a.startedAt !== 'number' || !Number.isFinite(a.startedAt) || a.startedAt < 0 || a.startedAt > now ||
        typeof a.deadline !== 'number' || !Number.isFinite(a.deadline) ||
        (a.completedAt !== null && (typeof a.completedAt !== 'number' || !Number.isFinite(a.completedAt) ||
          a.completedAt < a.startedAt || a.completedAt > a.deadline))) return null
      if (a.mode === 'mock' ? a.paperId !== null : typeof a.paperId !== 'string') return null
      const candidate = a as unknown as Attempt
      const format = formatFor(candidate)
      if (a.deadline !== a.startedAt + format.minutes * 60_000) return null
      if (candidate.mode === 'mock' && ids.some(id => !catalog.mockQuestionIds.includes(id))) return null
      if (candidate.mode === 'paper') {
        const paper = PAPERS.find((p) => p.id === candidate.paperId)!
        if (ids.join('|') !== paper.questionIds.join('|')) return null
      }
      let offset = 0
      for (const section of format.sections) {
        if (ids.slice(offset, offset + section.count).some((id) => QUESTIONS_BY_ID.get(id)!.section !== section.id)) return null
        offset += section.count
      }
      if (offset !== ids.length) return null
      const expectedDevelopment = ids.some((id) => QUESTIONS_BY_ID.get(id)!.source.kind === 'development')
      if (a.development !== expectedDevelopment) return null
      if (Object.keys(a.optionOrder).length !== ids.length) return null
      for (const id of ids) {
        const question = QUESTIONS_BY_ID.get(id)!
        const order = a.optionOrder[id]
        if (!strings(order) || order.length !== question.options.length || new Set(order).size !== order.length ||
          order.some((oid) => !question.options.some((option) => option.id === oid))) return null
        if (question.shuffleOptions === false && order.join('|') !== question.options.map((o) => o.id).join('|')) return null
      }
      if (Object.entries(a.answers).some(([id, option]) => !idSet.has(id) ||
        !QUESTIONS_BY_ID.get(id)!.options.some((o) => o.id === option))) return null
      if (new Set(a.flagged).size !== a.flagged.length || a.flagged.some((id) => !idSet.has(id))) return null
      // Verify that any selected passage block is complete, contiguous and in source order.
      for (const id of ids) {
        const passage = QUESTIONS_BY_ID.get(id)!.passage
        if (!passage) continue
        const block = QUESTION_BANK.filter((q) => q.passage?.id === passage.id).map((q) => q.id)
        const start = ids.indexOf(block[0])
        if (start < 0 || ids.slice(start, start + block.length).join('|') !== block.join('|')) return null
      }
      return candidate.completedAt === null && remainingSeconds(candidate, now) === 0 ? finishAttempt(candidate, now) : candidate
    } catch {
      return null
    }
  }

  return { shuffled, selectMockQuestions, formatFor, createAttempt, remainingSeconds, finishAttempt, scoreAttempt, restoreAttempt }
}
