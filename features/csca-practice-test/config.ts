import type { SessionView, SubjectId } from './types';

// Keep storage compatibility behind the unified subject-selection experience.
export function practiceKind(subjects: readonly SubjectId[]): 'subject' | 'combined' {
  return subjects.length === 1 ? 'subject' : 'combined';
}

export const MAX_PAPER_QUESTIONS = 80;
export const PAPER_FORMATS: Record<SubjectId, { questions: number; minutes: number }> = {
  'chinese-stem': { questions: 80, minutes: 90 },
  'chinese-humanities': { questions: 80, minutes: 90 },
  math: { questions: 48, minutes: 60 },
  physics: { questions: 48, minutes: 60 },
  chemistry: { questions: 48, minutes: 60 },
};
export function paperTotals(subjects: SubjectId[]) {
  return subjects.reduce((total, id) => ({ questions: total.questions + PAPER_FORMATS[id].questions, minutes: total.minutes + PAPER_FORMATS[id].minutes }), { questions: 0, minutes: 0 });
}
/** Assigned metadata wins, so existing attempts retain their original paper length and timer. */
export function sessionPaper(session: SessionView, index = session.paper) {
  if (session.papers?.[index]) return session.papers[index];
  const subject = session.subjects[index];
  const legacy = session.answers.length === 5;
  return { subject, questionCount: legacy ? 5 : PAPER_FORMATS[subject].questions, timeLimitSeconds: session.mode === 'practice' ? null : legacy ? 600 : PAPER_FORMATS[subject].minutes * 60 };
}
export const SUBJECTS: Record<SubjectId, { name: string; shortName: string; description: string; language: string }> = {
  'chinese-stem': { name: 'Professional Chinese · STEM', shortName: 'Chinese · STEM', description: 'Chinese for science and technical study', language: 'Chinese' },
  'chinese-humanities': { name: 'Professional Chinese · Humanities', shortName: 'Chinese · Humanities', description: 'Chinese for humanities and social study', language: 'Chinese' },
  math: { name: 'Mathematics', shortName: 'Mathematics', description: 'Sets, algebra, functions, geometry and more', language: 'English' },
  physics: { name: 'Physics', shortName: 'Physics', description: 'Motion, forces, electricity and more', language: 'English' },
  chemistry: { name: 'Chemistry', shortName: 'Chemistry', description: 'Matter, reactions, calculations and more', language: 'English' },
};
