// Soft "strengths are an asset in fields like…" mapping for the aptitude areas.
// Deliberately NOT a concrete field→country→university recommendation (that stays
// the interests/personality job) — this only frames where each ability helps.

import type { AptitudeArea } from './aptitudeQuestions'

export const APTITUDE_FIELD_DIRECTIONS: Record<AptitudeArea, string[]> = {
  numerical: ['Engineering', 'Computer Science', 'Finance & Economics', 'Data Science'],
  verbal: ['Law', 'Journalism & Media', 'International Relations', 'Languages & Literature'],
  logical: ['Computer Science', 'Engineering', 'Mathematics', 'Natural Sciences'],
  spatial: ['Architecture', 'Engineering', 'Design', 'Medicine & Surgery'],
}

export const APTITUDE_AREA_BLURB: Record<AptitudeArea, string> = {
  numerical: 'Working confidently with numbers, patterns and data.',
  verbal: 'Understanding language, meaning and written reasoning.',
  logical: 'Spotting patterns and reasoning through problems step by step.',
  spatial: 'Visualising shapes, rotations and how things fit together.',
}
