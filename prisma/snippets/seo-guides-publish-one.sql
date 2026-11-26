-- Publish one English guide after counsellor fact-check.
-- Replace the slug, then run in the Supabase SQL editor.
-- The site caches pages up to ~1 day (revalidate = 86400); redeploy or wait
-- for ISR refresh to see the change in production.

UPDATE public.guides
SET
  is_published = true,
  published_at = COALESCE(published_at, now()),
  updated_at = now()
WHERE slug = 'uk-visa-ban-myanmar-students-a-level'
  AND btrim(body_markdown) <> '';

-- Verify
SELECT slug, is_published, published_at, left(seo_title, 60) AS seo_title
FROM public.guides
WHERE slug = 'uk-visa-ban-myanmar-students-a-level';
