// The education levels the contact form offers. The form submits the key; the
// server turns it into the English name, which is what counsellors read and what
// the university recommender matches on ("high school", "foundation",
// "undergraduate", "graduate"). The dropdown's own text is translated, so it can
// never be what is sent. The same names are in messages/en.json under
// careerAssessment.contact.educationOptions (a test keeps the two in step).

export const EDUCATION_LEVELS = [
  { key: 'highSchool', name: 'High school graduate' },
  { key: 'foundation', name: 'Foundation / pre-university' },
  { key: 'undergraduate', name: 'Undergraduate' },
  { key: 'graduate', name: 'Graduate' },
  { key: 'other', name: 'Other' },
] as const

export const EDUCATION_KEYS: readonly string[] = EDUCATION_LEVELS.map((l) => l.key)

/** The English name for what a form submitted. Text from an older saved form passes through unchanged. */
export function educationLevelName(value: string): string {
  return EDUCATION_LEVELS.find((l) => l.key === value)?.name ?? value
}
