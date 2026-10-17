import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import type { ComparisonUniversity } from '@/features/landing/services/comparison-service'
import { isTranslationLocale, type TranslationLocale } from '@/i18n/languages'
import { modelForLocale } from '@/shared/lib/ai/models'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

// Language the advisor writes in. English (or anything unrecognised) adds no instruction.
const LANGUAGE_NOTE: Record<TranslationLocale, string> = {
  th: 'Thai. Keep university names, tool names and acronyms in English.',
  vi: 'Vietnamese. Keep university names, tool names and acronyms in English.',
  fil: 'natural Filipino, the way Filipinos write today, with common English terms kept in English. Do not force deep Tagalog.',
  id: 'Indonesian (Bahasa Indonesia). Keep university names, tool names and acronyms in English.',
  my: 'Burmese, written the way people in Myanmar naturally write today: Burmese grammar and particles with the friendly spoken-style endings (such as -ပါတယ်, -တယ်), and university names, city names and technical terms kept in English.',
}

function buildPrompt(uni1: ComparisonUniversity, uni2: ComparisonUniversity, locale?: string): string {
  const language = isTranslationLocale(locale) ? LANGUAGE_NOTE[locale] : undefined
  // The JSON template below is written in English, which pulls the model back
  // to English, so the language is stated first and again just before the template.
  const languageIntro = language
    ? `\nIMPORTANT: every text value in your answer (the verdict, the three questions and the three answers) must be written in ${language} Do not answer in English.\n`
    : ''
  const languageRule = language
    ? `\nLanguage reminder: the verdict, the three questions and the three answers are all in ${language} Translate the three question texts naturally; keep the JSON keys exactly as shown. Short plain sentences, no em dashes or en dashes.\n`
    : ''

  function describe(u: ComparisonUniversity) {
    const tuition = u.tuition
      ? `${u.tuition.currency}${u.tuition.min.toLocaleString()}–${u.tuition.currency}${u.tuition.max.toLocaleString()}/year`
      : 'Not available'
    const ranking = u.globalRanking != null ? `#${u.globalRanking} globally` : 'Unranked'
    const acceptance = u.acceptanceRate != null ? `${u.acceptanceRate}%` : 'N/A'
    const fields = u.popularCourses.length > 0 ? u.popularCourses.join(', ') : 'N/A'
    return [
      `Name: ${u.name} (${u.country})`,
      `Tuition: ${tuition}`,
      `Visa Processing: ${u.visaProcessing}`,
      `Work Rights: ${u.workRights}`,
      `Scholarships: ${u.scholarships}`,
      `Ranking: ${ranking}`,
      `Acceptance Rate: ${acceptance}`,
      `Popular Fields: ${fields}`,
    ].join('\n')
  }

  return `You are a straight-talking study abroad advisor helping Asian students pick between two universities.
${languageIntro}
UNIVERSITY 1:
${describe(uni1)}

UNIVERSITY 2:
${describe(uni2)}

The student already sees tuition, visa time, work rights, scholarships, ranking, and acceptance rate. Do NOT repeat those numbers.

Add what they can't see: real cost of living in each city, what graduates actually do after, how employers see each degree, what student life is really like.

Never use em dashes or en dashes. Use a comma, a semicolon, or a second sentence instead.

Write like a real person talking to a friend — short sentences, plain words, direct opinions. No AI phrases like "it's worth noting", "both have their merits", "it's important to consider". No corporate language. Just honest, simple advice.

${languageRule}
Return ONLY valid JSON, no extra text:
{
  "verdict": "One sentence. Direct opinion or clear trade-off. Under 20 words. Plain language.",
  "questions": [
    {
      "q": "Which is more affordable to actually live in?",
      "a": "1–2 short sentences. Talk about the city, rent, food, daily life — not tuition. Simple words."
    },
    {
      "q": "Which opens more doors after graduation?",
      "a": "1–2 short sentences. What jobs do graduates get? Which industries hire from there? Be specific."
    },
    {
      "q": "Which suits your lifestyle better?",
      "a": "1–2 short sentences. City vibe, safety, social life, language, weather — whatever matters most for this pair."
    }
  ]
}`
}

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
  }

  let body: { uni1?: ComparisonUniversity; uni2?: ComparisonUniversity; locale?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  }
  const { uni1, uni2, locale } = body

  if (!uni1 || !uni2) {
    return NextResponse.json({ error: 'Missing university data' }, { status: 400 })
  }

  const stream = await client.messages.create({
    // Burmese and Filipino need the stronger model: Haiku produced broken Burmese and
    // kept slipping back into English for Filipino.
    model: modelForLocale(locale),
    max_tokens: isTranslationLocale(locale) ? 1600 : 600, // Thai and Burmese need many more tokens
    stream: true,
    messages: [{ role: 'user', content: buildPrompt(uni1, uni2, locale) }],
  })

  const readable = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder()
      try {
        for await (const event of stream) {
          if (
            event.type === 'content_block_delta' &&
            event.delta.type === 'text_delta'
          ) {
            controller.enqueue(encoder.encode(event.delta.text))
          }
        }
      } finally {
        controller.close()
      }
    },
  })

  return new Response(readable, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache',
    },
  })
}
