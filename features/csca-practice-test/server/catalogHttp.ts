import { getCatalog } from './bank'

export async function handleCatalog() {
  return Response.json(await getCatalog(), { headers: { 'Cache-Control': 'private, no-store' } })
}
