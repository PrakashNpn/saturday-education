import type { ExamFormat } from '../types'

/** Development simulation blueprint. Historical papers carry their own format. */
export const SIMULATION_FORMAT: ExamFormat = {
  minutes: 100,
  correct: 1.5,
  incorrect: -0.4,
  sections: [
    { id: 'reading', count: 4 },
    { id: 'reasoning', count: 5 },
    { id: 'biology', count: 23 },
    { id: 'chemistry', count: 15 },
    { id: 'physicsMath', count: 13 },
  ],
}
