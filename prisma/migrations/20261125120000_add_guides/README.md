# Manual guides schema (Phase B SEO/AEO)

Run `migration.sql` once, in full, as the owner in the Supabase SQL editor. The agent must not run it against Supabase. This creates two empty tables only. It does not publish articles or change existing application tables.

The transaction fails and rolls back if `guides` or `guide_faqs` already exists. If execution reports an error, inspect it before retrying.

## Tables

| Table | Purpose |
| --- | --- |
| guides | English guide pages: slug, SEO fields, answer box, markdown body, publish flag |
| guide_faqs | FAQ rows rendered on the page and mirrored in FAQPage JSON-LD |

English only for v1. Locale UI chrome can still wrap `/guides`; article body is always English. Keep `is_published = false` until a counsellor has fact-checked fees/visa claims.

## After schema

1. Optional drafts: run `prisma/snippets/seo-guides-seed-drafts.sql` (all rows unpublished).
2. Images: one content hero per guide (`seo-guides-add-images.sql`, or `seo-guides-use-content-heroes.sql` to refresh live rows). `og_image_url` stays null so shares use the hero.
3. Review a guide in the Table Editor (or SQL), fix facts, then:

```sql
UPDATE public.guides
SET is_published = true,
    published_at = now(),
    updated_at = now()
WHERE slug = 'uk-visa-ban-myanmar-students-a-level';
```

4. Deploy the website code that reads these tables. Content edits show within about a day (`revalidate = 86400`) or after the next deploy.

## Verify

```sql
SELECT tablename
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('guides', 'guide_faqs')
ORDER BY tablename;
```

Expected: two rows.
