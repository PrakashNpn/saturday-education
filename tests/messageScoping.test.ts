// The root layout does not send the assessment strings or the career catalog to the
// browser (they are large and only the assessment pages use them). These checks stop
// a component outside those pages from starting to depend on them, which would show
// raw message keys instead of text.
import { describe, test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'

const root = path.join(__dirname, '..')

function sourceFiles(dir: string, out: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) sourceFiles(full, out)
    else if (/\.(ts|tsx)$/.test(entry.name)) out.push(full)
  }
  return out
}

const rel = (f: string) => path.relative(root, f).split(path.sep).join('/')

// Files that run inside the assessment routes, which get the full messages.
const inAssessment = (f: string) =>
  f.startsWith('features/career-assessment/') ||
  f.startsWith('app/[locale]/career-assessment/') ||
  f === 'shared/lib/careers/useCareerText.ts'

describe('message scoping', () => {
  const files = ['app', 'features', 'shared'].flatMap((d) => sourceFiles(path.join(root, d)))

  test('nothing outside the assessment pages reads the assessment strings or the career catalog on the client', () => {
    const offenders = files
      .map(rel)
      .filter((f) => !inAssessment(f))
      .filter((f) => {
        const text = fs.readFileSync(path.join(root, f), 'utf8')
        const client = /^['"]use client['"]/m.test(text)
        return client && /useTranslations\(\s*['"`](careerAssessment|careerCatalog)|useCareerText/.test(text)
      })
    assert.deepEqual(offenders, [])
  })

  test('the root layout leaves both namespaces out and the assessment layout puts them back', () => {
    const layout = fs.readFileSync(path.join(root, 'app/[locale]/layout.tsx'), 'utf8')
    assert.match(layout, /ASSESSMENT_NAMESPACES = \['careerAssessment', 'careerCatalog'\]/)
    const nested = fs.readFileSync(path.join(root, 'app/[locale]/career-assessment/layout.tsx'), 'utf8')
    assert.match(nested, /NextIntlClientProvider/)
    assert.match(nested, /getMessages\(\{ locale \}\)/)
  })

  test('every assessment route sits under the assessment layout', () => {
    const base = path.join(root, 'app/[locale]/career-assessment')
    const pages = sourceFiles(base).filter((f) => path.basename(f) === 'page.tsx')
    assert.ok(pages.length >= 2)
    assert.ok(fs.existsSync(path.join(base, 'layout.tsx')))
  })
})

describe('static rendering', () => {
  test('the pages that are prebuilt set the locale and the layout lists the locales', () => {
    const layout = fs.readFileSync(path.join(root, 'app/[locale]/layout.tsx'), 'utf8')
    assert.match(layout, /export function generateStaticParams\(\)/)
    for (const page of ['page.tsx', 'about/page.tsx', 'contact/page.tsx', 'privacy/page.tsx', 'terms/page.tsx', 'destinations/page.tsx', 'guides/page.tsx', 'guides/[slug]/page.tsx']) {
      const text = fs.readFileSync(path.join(root, 'app/[locale]', page), 'utf8')
      assert.match(text, /setRequestLocale\(/, `${page} must call setRequestLocale to be prebuilt`)
    }
  })
})
