import type { EmailStatus } from './contact';

export const SUBJECT_IDS = ['chinese-stem', 'chinese-humanities', 'math', 'physics', 'chemistry'] as const;
export type SubjectId = (typeof SUBJECT_IDS)[number];
export type PracticeMode = 'timed' | 'practice';
export type CatalogItem = { id: SubjectId; name: string; shortName: string; description: string; language: string; count: number };
export type Question = { id: string; text: string; topic: string; options: { key: string; text: string }[]; passage?: string; image?: string; imageAlt?: string };
export type QuestionResult = Question & { answer: string; selected: string | null; explanation: string; correct: boolean };
export type PaperResult = { subject: SubjectId; correct: number; answered: number; total: number; score: number; expired: boolean; questions: QuestionResult[] };
export type SessionView = {
  /** Public attempt/paper context; authorization is an HttpOnly cookie. */
  token: string;
  revision: number;
  answers: (string | null)[];
  flags: number[];
  kind: 'subject' | 'combined';
  mode: PracticeMode;
  subjects: SubjectId[];
  paper: number;
  papers?: { subject: SubjectId; questionCount: number; timeLimitSeconds: number | null }[];
  phase: 'test' | 'break' | 'contact' | 'results';
  contactSaved?: boolean;
  emailStatus?: EmailStatus;
  deadline: number | null;
  serverNow: number;
  questions: Question[];
  results?: PaperResult[];
  expired?: boolean;
};
