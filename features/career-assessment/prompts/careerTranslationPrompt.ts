import { CAREER_FIELDS, type CareerOutlookMaster, type TranslationLocale } from '@/shared/lib/careers/outlookMaster'

const LANGUAGE: Record<TranslationLocale, string> = {
  th: `Thai. Keep tool names, acronyms and widely used technical terms (for example "Python", "SQL", "CI/CD") in English.`,
  vi: `Vietnamese. Keep tool names, acronyms and widely used technical terms (for example "Python", "SQL", "CI/CD") in English.`,
  fil: `natural Filipino, the way Filipinos write today, with common English terms kept in English (for example job titles such as "Software Engineer" and terms such as "Machine learning"). Do not force deep Tagalog.`,
  id: `Indonesian (Bahasa Indonesia). Keep tool names, acronyms and widely used technical terms (for example "Python", "SQL", "CI/CD") in English.`,
  my: `Burmese, written the way people in Myanmar naturally write today: Burmese grammar and particles, with career names, field and subject names, skills and technical terms kept in English where that is the normal usage. Use the friendly spoken-style endings used elsewhere on the site (such as -ပါတယ်, -တယ်, -တဲ့). Whole sentences (summary, market notes) must read as natural Burmese.`,
}

/**
 * Translates only the display text of an already-generated career outlook.
 * The English master stays the source of truth; this prompt never sees or
 * returns numbers, sources or codes.
 */
export function buildCareerTranslationPrompt(master: CareerOutlookMaster, locale: TranslationLocale): string {
  const source = {
    title: master.title,
    summary: master.summary,
    field: master.field,
    exampleRoles: master.exampleRoles,
    requiredSkills: master.requiredSkills,
    niceToHaveSkills: master.niceToHaveSkills,
    relatedFields: master.relatedFields,
    marketNoteNear: master.marketNoteNear,
    marketNoteLong: master.marketNoteLong,
  }
  const keepAsIs = CAREER_FIELDS.map((f) => `"${f}"`).join(', ')
  return `You translate career information for a study-abroad consultancy website. Translate the values of the JSON below into ${LANGUAGE[locale]}

Rules:
- Return ONLY a valid JSON object with exactly the same keys and the same structure. No markdown, no commentary.
- Every array must have exactly the same number of items, in the same order as the source.
- If "field" or an item of "relatedFields" is exactly one of these names, copy it unchanged: ${keepAsIs}.
- Translate meaning, not word for word. Short, plain sentences, the way a real person writes. No em dashes or en dashes; use commas or full stops instead.
- Keep proper nouns, product and tool names, and acronyms as they are.
- Do not add, remove or reinterpret facts.

Source JSON:
${JSON.stringify(source)}`
}
