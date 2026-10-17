// Types and constants shared by the comparison tool's parts.

export type AdvisorQuestion = { q: string; a: string }
export type AdvisorResult = { verdict: string; questions: AdvisorQuestion[] }

export const EASE = [0, 0, 0.2, 1] as const
