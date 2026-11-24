import type { QualificationLevel, ScaleType, StudyLevel, SubjectArea } from '../data/estimate-model'

export type GradeConverterLeadPayload = {
  fullName: string
  email: string
  phone?: string
  targetCountry?: string
  message?: string
  gradeSummary: string
}

export type Selection = {
  origin: string
  level: QualificationLevel | ''
  scale: ScaleType | ''
  score: string
  target: string
  studyLevel: StudyLevel | ''
  subject: SubjectArea | ''
}

export const EMPTY_SELECTION: Selection = {
  origin: 'myanmar',
  level: '',
  scale: '',
  score: '',
  target: '',
  studyLevel: '',
  subject: '',
}

export const STEP_KEYS = ['stepGrades', 'stepDestination', 'stepResult', 'stepContact'] as const
