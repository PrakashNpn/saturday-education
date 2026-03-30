// Prisma client — generated via: npx prisma generate
// Run: npx prisma generate before using DB features
// Phase 1: DB not required — this file is imported lazily by server-side code only

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let prismaInstance: any = null

export function getPrisma() {
  if (prismaInstance) return prismaInstance
  // Dynamic import to avoid build errors when generated client doesn't exist yet
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { PrismaClient } = require('../../../generated')
  const globalForPrisma = globalThis as unknown as { prisma: typeof prismaInstance }
  prismaInstance = globalForPrisma.prisma ?? new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prismaInstance
  return prismaInstance
}

// Named export for direct use when DB is available
export const prisma = new Proxy({} as ReturnType<typeof getPrisma>, {
  get: (_target, prop) => getPrisma()[prop],
})
