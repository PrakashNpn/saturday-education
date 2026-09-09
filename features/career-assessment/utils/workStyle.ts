// A short "best fit" label derived from a career's Holland code: the noun comes
// from the strongest type, optionally prefixed by an adjective from the second
// (e.g. I·C -> "Methodical Analyst").

const STYLE_NOUN: Record<string, string> = {
  R: 'Builder',
  I: 'Analyst',
  A: 'Creative',
  S: 'Mentor',
  E: 'Leader',
  C: 'Planner',
}

const STYLE_ADJ: Record<string, string> = {
  R: 'Hands-on',
  I: 'Analytical',
  A: 'Creative',
  S: 'Supportive',
  E: 'Driven',
  C: 'Methodical',
}

export function workStyleOf(riasec: readonly string[]): string {
  const noun = STYLE_NOUN[riasec[0] ?? '']
  if (!noun) return '—'
  const second = riasec[1]
  const adj = second ? STYLE_ADJ[second] : undefined
  return adj && adj !== noun ? `${adj} ${noun}` : noun
}
