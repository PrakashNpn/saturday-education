import { FIXTURE_CATALOG } from '../../features/imat-practice-test/data/catalog'
import { createExamEngine } from '../../features/imat-practice-test/services/exam'

/** Test-only engine: production always receives its catalog from the server. */
export const { createAttempt, finishAttempt, remainingSeconds, restoreAttempt, scoreAttempt, selectMockQuestions } = createExamEngine(FIXTURE_CATALOG)
