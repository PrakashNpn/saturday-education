import { DEVELOPMENT_QUESTIONS } from './development-questions'
import { SIMULATION_FORMAT } from './formats'
import type { Paper } from '../types'

/** Increment whenever content, keys, formats or identifiers change. Old saves are rejected. */
export const BANK_VERSION = 'development-1'
export const QUESTION_BANK = DEVELOPMENT_QUESTIONS
export const QUESTIONS_BY_ID = new Map(QUESTION_BANK.map((q) => [q.id, q]))

/** Add only fully checked papers here. Never infer historical formats from the current blueprint. */
export const PAST_PAPERS: Paper[] = []
export const SAMPLE_PAPER: Paper = {
  id: 'development-sample', development: true, format: SIMULATION_FORMAT,
  questionIds: SIMULATION_FORMAT.sections.flatMap(({ id, count }) =>
    QUESTION_BANK.filter((q) => q.section === id).slice(0, count).map((q) => q.id)),
}
export const PAPERS = [SAMPLE_PAPER, ...PAST_PAPERS]
export const FIXTURE_CATALOG = { bankVersion: BANK_VERSION, questions: QUESTION_BANK, papers: PAPERS, mockQuestionIds: QUESTION_BANK.map((q) => q.id) }
