export const SECTION_IDS = ['reading', 'reasoning', 'biology', 'chemistry', 'physicsMath'] as const
export type SectionId = typeof SECTION_IDS[number]

export interface QuestionImage {
  /** Checked, local asset under public/images/imat/. */
  src: string
  alt: string
  width: number
  height: number
}

export interface Question {
  id: string
  section: SectionId
  prompt: string
  options: { id: string; text: string; image?: QuestionImage }[]
  correctOptionId: string
  /** Official corrections or disclosed practice policies may accept every valid choice. */
  scoringPolicy?: {
    kind: 'all-options-accepted'
    blankTreatment: 'zero' | 'full-credit'
    evidenceUrl: string
    basis?: 'official-correction' | 'practice-adjustment'
    note?: string
  }
  explanation: string
  /** Questions sharing a passage are selected together and kept in order. */
  passage?: { id: string; text: string; image?: QuestionImage }
  image?: QuestionImage
  /** False preserves source order in both modes for order-dependent wording/diagrams. */
  shuffleOptions?: boolean
  source: {
    kind: 'development' | 'official' | 'original'
    reference: string
    url?: string
    year?: number
    originalNumber?: number
    review?: { reviewer: string; checkedAt: string; reuseEvidence: string }
  }
}

export interface ExamFormat {
  minutes: number
  sections: { id: SectionId; count: number }[]
  correct: number
  incorrect: number
}

export interface Paper {
  id: string
  year?: number
  format: ExamFormat
  questionIds: string[]
  sourceUrl?: string
  /** English source/scoring annotation, shown before a timed paper and in its results. */
  scoringNotice?: string
  /** Only populated papers with reviewed content and resolved reuse rights belong in the registry. */
  development: boolean
}

export interface Attempt {
  version: 1
  bankVersion: string
  id: string
  mode: 'mock' | 'paper'
  paperId: string | null
  development: boolean
  questionIds: string[]
  optionOrder: Record<string, string[]>
  answers: Record<string, string>
  flagged: string[]
  index: number
  startedAt: number
  deadline: number
  completedAt: number | null
  /** UX gate only: set after the server confirms contact storage. No PII is stored here. */
  leadCaptured?: boolean
}

export interface ExamCatalog {
  bankVersion: string
  questions: Question[]
  papers: Paper[]
  mockQuestionIds: string[]
}
