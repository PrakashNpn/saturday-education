import { defineConfig } from 'prisma/config';
import { config } from 'dotenv';
import { resolve } from 'path';

// Load .env.local for Prisma CLI commands
config({ path: resolve(process.cwd(), '.env.local') });

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'npx tsx prisma/seed.ts',
  },
  datasource: {
    // DIRECT_URL: non-pooled Supabase connection (port 5432) — required for migrations
    // DATABASE_URL: pooler connection (port 6543) — used by the app at runtime
    url: process.env.DIRECT_URL || process.env.DATABASE_URL!,
  },
});
