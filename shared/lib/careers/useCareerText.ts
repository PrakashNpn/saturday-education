'use client'

import { useMemo } from 'react'
import { useTranslations } from 'next-intl'
import { slugify } from './outlookMaster'

/**
 * Locale-aware labels for the career catalog. The catalog itself stays English
 * (it is the lookup key for matching and for the AI cache); the translated text
 * lives in the `careerCatalog` message namespace, keyed by career slug or by the
 * slugified English label. Any label without a translation (a locale that has
 * none yet, or an AI-coined career outside the catalog) falls back to English.
 */
export function useCareerText() {
  const t = useTranslations('careerCatalog')
  return useMemo(() => {
    const pick = (key: string, fallback: string) => (t.has(key) ? t(key) : fallback)
    return {
      title: (slug: string, fallback: string) => pick(`title.${slug}`, fallback),
      summary: (slug: string, fallback: string) => pick(`summary.${slug}`, fallback),
      note: (slug: string, fallback: string) => pick(`note.${slug}`, fallback),
      skill: (skill: string) => pick(`skill.${slugify(skill)}`, skill),
      field: (field: string) => pick(`field.${slugify(field)}`, field),
      demand: (demand: string) => pick(`demand.${demand}`, demand),
      growth: (label: string) => pick(`growth.${slugify(label)}`, label),
    }
  }, [t])
}
