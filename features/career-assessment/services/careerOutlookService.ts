'use server'

import { randomUUID } from 'node:crypto'
import Anthropic from '@anthropic-ai/sdk'
import { prisma } from '@/shared/lib/db/prisma'
import { findCareerByQuery } from '@/shared/lib/careers/catalog'
import { buildCareerOutlookPrompt } from '../prompts/careerOutlookPrompt'
import { buildCareerTranslationPrompt } from '../prompts/careerTranslationPrompt'
import {
  applyTranslation,
  catalogCareerToMaster,
  coerceMasterFromAI,
  coerceTranslation,
  normalizeQuery,
  slugify,
  toTranslationLocale,
  type CareerOutlookMaster,
  type MasterTranslation,
  type TranslationLocale,
} from '@/shared/lib/careers/outlookMaster'

const MODEL = 'claude-sonnet-4-6'
const MAX_QUERY_LEN = 80

type OutlookResult =
  | { status: 'ok'; master: CareerOutlookMaster }
  | { status: 'not-a-career' }
  | { status: 'busy' }
  | { status: 'error' }

// Transient Anthropic conditions worth a "busy, try again" rather than a hard error.
function isTransient(error: unknown): boolean {
  if (error instanceof Anthropic.APIConnectionError) return true // includes timeouts
  if (error instanceof Anthropic.APIError) {
    return error.status === 429 || error.status === 503 || error.status === 529
  }
  return false
}

/**
 * Resolve a career's outlook for a typed/selected query.
 * Order: DB cache → AI (validate + generate one master) → cache write → return.
 * The cache is keyed per-career (canonical slug + aliases); horizon is derived
 * client-side from the single master, so there is one row per career.
 */
export async function getCareerOutlook(rawQuery: string, rawLocale?: string): Promise<OutlookResult> {
  // English (or anything unrecognised) keeps the master as generated.
  const locale = toTranslationLocale(rawLocale)
  const query = normalizeQuery(String(rawQuery ?? '')).slice(0, MAX_QUERY_LEN)
  if (query.length < 2) return { status: 'not-a-career' }
  const slug = slugify(query)

  // 0. Catalog is the source of truth for the 43 known careers — serve the curated
  //    data instantly (no DB, no AI) so the explorer matches the results page exactly.
  //    AI runs only for free-text careers that aren't in the catalog.
  const catalogHit = findCareerByQuery(query)
  if (catalogHit) return { status: 'ok', master: catalogCareerToMaster(catalogHit) }

  // 1. Cache lookup (tolerates a missing table — just falls through to generate).
  const cached = await readCache(slug, query)
  if (cached) {
    return { status: 'ok', master: await localizeMaster(cached.master, cached.translations, locale) }
  }

  // 2. Generate via Claude (single call validates + produces the master).
  if (!process.env.ANTHROPIC_API_KEY) return { status: 'error' }
  let master: CareerOutlookMaster | null = null
  try {
    // Bound each attempt (the SDK's default timeout is 10 minutes). The SDK `timeout`
    // is per-attempt and retries multiply it, so cap retries at 1 to keep the worst-case
    // wait behind the "researching" animation reasonable (~60s), while still recovering a
    // single transient 429/5xx/connection blip.
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, maxRetries: 1, timeout: 30_000 })
    const res = await client.messages.create({
      model: MODEL,
      max_tokens: 1500,
      messages: [{ role: 'user', content: buildCareerOutlookPrompt(query) }],
    })
    const text = res.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('')
      .trim()
    const start = text.indexOf('{')
    const end = text.lastIndexOf('}')
    if (start === -1 || end === -1) return { status: 'error' }
    const parsed = JSON.parse(text.slice(start, end + 1)) as unknown
    if (parsed && typeof parsed === 'object' && (parsed as { valid?: unknown }).valid === false) {
      return { status: 'not-a-career' }
    }
    master = coerceMasterFromAI(parsed, query)
  } catch (error) {
    console.error('Career outlook generation failed:', error)
    // Transient overload/rate-limit/timeout → "busy" (retryable); anything else is a hard error.
    return { status: isTransient(error) ? 'busy' : 'error' }
  }
  if (!master) return { status: 'not-a-career' }

  // 3. Cache write (best-effort; never blocks the response on a DB issue).
  await writeCache(master, query)
  return { status: 'ok', master: await localizeMaster(master, null, locale) }
}

/**
 * Returns the master in the visitor's language. Catalog careers never come here
 * (their text is translated client-side). A stored translation is used when it
 * validates; otherwise one small AI call makes it and saves it beside the English.
 * Any failure falls back to the English master so the page never breaks.
 */
async function localizeMaster(
  master: CareerOutlookMaster,
  stored: unknown,
  locale: TranslationLocale | null,
): Promise<CareerOutlookMaster> {
  if (!locale) return master
  const saved = stored && typeof stored === 'object' ? (stored as Record<string, unknown>)[locale] : null
  const fromCache = coerceTranslation(saved, master)
  if (fromCache) return applyTranslation(master, fromCache)

  const fresh = await translateMaster(master, locale)
  if (!fresh) return master
  await writeTranslation(master.slug, locale, fresh)
  return applyTranslation(master, fresh)
}

/** One bounded call that translates only the display text. Null on any failure. */
async function translateMaster(
  master: CareerOutlookMaster,
  locale: TranslationLocale,
): Promise<MasterTranslation | null> {
  if (!process.env.ANTHROPIC_API_KEY) return null
  try {
    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, maxRetries: 1, timeout: 30_000 })
    const res = await client.messages.create({
      model: MODEL,
      max_tokens: 4000, // Burmese and Thai take many tokens per word
      messages: [{ role: 'user', content: buildCareerTranslationPrompt(master, locale) }],
    })
    const text = res.content
      .filter((b): b is Anthropic.TextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('')
      .trim()
    const start = text.indexOf('{')
    const end = text.lastIndexOf('}')
    if (start === -1 || end === -1) return null
    return coerceTranslation(JSON.parse(text.slice(start, end + 1)) as unknown, master)
  } catch (error) {
    console.warn('Career outlook translation skipped:', error instanceof Error ? error.message : error)
    return null
  }
}

/** Reads a cached master (and any stored translations) by canonical slug or a previously-seen alias. */
async function readCache(
  slug: string,
  alias: string,
): Promise<{ master: CareerOutlookMaster; translations: unknown } | null> {
  try {
    const rows = await prisma.$queryRaw<Array<{ payload: unknown }>>`
      SELECT payload FROM career_outlook_cache
      WHERE slug = ${slug} OR ${alias} = ANY(aliases)
      LIMIT 1
    `
    const payload = rows[0]?.payload
    if (!payload || typeof payload !== 'object') return null
    const master = coerceMasterFromAI(payload, slug)
    if (!master) return null
    return { master, translations: (payload as Record<string, unknown>).i18n ?? null }
  } catch {
    // Table missing or DB unreachable → behave as a cache miss.
    return null
  }
}

/** Upserts the generated master, appending the alias so synonyms dedupe over time. */
async function writeCache(master: CareerOutlookMaster, alias: string): Promise<void> {
  try {
    await prisma.$executeRaw`
      INSERT INTO career_outlook_cache (id, slug, title, field, payload, aliases, model)
      VALUES (
        ${randomUUID()}, ${master.slug}, ${master.title}, ${master.field},
        ${JSON.stringify(master)}::jsonb, ARRAY[${alias}]::text[], ${MODEL}
      )
      ON CONFLICT (slug) DO UPDATE SET
        payload = EXCLUDED.payload,
        aliases = array(SELECT DISTINCT unnest(career_outlook_cache.aliases || ARRAY[${alias}]::text[])),
        updated_at = now()
    `
  } catch (error) {
    // Non-fatal: a missing table or write error must not break the user's request.
    console.warn('Career outlook cache write skipped:', error instanceof Error ? error.message : error)
  }
}

/**
 * Stores a translation inside the same JSON payload (key `i18n`), so no schema
 * change is needed. Best-effort, like the master write.
 */
async function writeTranslation(slug: string, locale: TranslationLocale, tr: MasterTranslation): Promise<void> {
  try {
    await prisma.$executeRaw`
      UPDATE career_outlook_cache
      SET payload = payload || jsonb_build_object(
        'i18n',
        COALESCE(payload->'i18n', '{}'::jsonb) || jsonb_build_object(${locale}::text, ${JSON.stringify(tr)}::jsonb)
      )
      WHERE slug = ${slug}
    `
  } catch (error) {
    console.warn('Career outlook translation write skipped:', error instanceof Error ? error.message : error)
  }
}
