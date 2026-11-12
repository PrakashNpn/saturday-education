import 'server-only'
import { createHash } from 'node:crypto'
import { prisma } from '@/shared/lib/db/prisma'
import { mapDatabasePaper } from './databaseCatalog'
import type { ExamCatalog } from '../types'

export async function loadImatCatalog(): Promise<ExamCatalog> {
  // Offline test/build option; no database request is made in this mode.
  if (process.env.IMAT_CONTENT_SOURCE === 'fixtures') return (await import('../data/catalog')).FIXTURE_CATALOG
  const rows = await prisma.imatPaper.findMany({
    where: { is_published: true },
    include: { source: true, sections: true, passages: true, questions: { include: { options: true, answer: true } } },
    orderBy: { exam_year: 'desc' },
  })
  const catalog: ExamCatalog = {
    bankVersion: '', questions: [], papers: [], mockQuestionIds: [],
  }
  for (const row of rows) {
    try {
      const mapped = mapDatabasePaper(row)
      if (mapped.questions.some(q=>catalog.questions.some(existing=>existing.id === q.id))) throw new Error('Duplicate question identity')
      catalog.questions.push(...mapped.questions)
      catalog.papers.push(mapped.paper)
      catalog.mockQuestionIds.push(...mapped.mockQuestionIds)
    } catch {
      console.warn(`IMAT paper ${row.slug} omitted: content or publication validation failed.`)
    }
  }
  // Retain the former false preview field in the fingerprint only, so this
  // cleanup does not invalidate otherwise compatible published-paper saves.
  catalog.bankVersion = createHash('sha256').update(JSON.stringify({ ...catalog, draftPreview: false })).digest('hex').slice(0,24)
  return catalog
}
