import { prisma } from '@/shared/lib/db/prisma'

export async function getProgramDetail(universitySlug: string, programSlug: string) {
  return prisma.program.findFirst({
    where: {
      slug: programSlug,
      university: { slug: universitySlug, isPublished: true },
    },
    include: {
      university: {
        select: {
          name: true,
          slug: true,
          logoUrl: true,
          country: { select: { name: true } },
        },
      },
    },
  })
}
