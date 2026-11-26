-- Publish all 15 English guide drafts (Phase B).
-- Run in the Supabase SQL editor AFTER fact-check.
-- Only updates rows that are still unpublished and have body text.
-- Site cache: up to ~1 day (revalidate = 86400), or redeploy to see sooner.

UPDATE public.guides
SET
  is_published = true,
  published_at = COALESCE(published_at, now()),
  updated_at = now()
WHERE slug IN (
  'uk-visa-ban-myanmar-students-a-level',
  'malaysia-private-university-fees',
  'cheapest-country-to-study-abroad-myanmar',
  'student-visa-checklist-myanmar',
  'top-universities-thailand-myanmar-students',
  'hungary-scholarships-myanmar-students',
  'part-time-work-minimum-wage-by-country',
  'private-universities-germany-myanmar',
  'study-in-canada-myanmar-students',
  'study-in-new-zealand-myanmar-students',
  'study-in-ireland-myanmar-students',
  'study-in-italy-myanmar-students',
  'study-in-finland-myanmar-students',
  'study-in-china-myanmar-students',
  'study-in-switzerland-myanmar-students'
)
  AND is_published = false
  AND btrim(body_markdown) <> '';

-- Verify (expect 15 published)
SELECT slug, is_published, published_at
FROM public.guides
WHERE slug IN (
  'uk-visa-ban-myanmar-students-a-level',
  'malaysia-private-university-fees',
  'cheapest-country-to-study-abroad-myanmar',
  'student-visa-checklist-myanmar',
  'top-universities-thailand-myanmar-students',
  'hungary-scholarships-myanmar-students',
  'part-time-work-minimum-wage-by-country',
  'private-universities-germany-myanmar',
  'study-in-canada-myanmar-students',
  'study-in-new-zealand-myanmar-students',
  'study-in-ireland-myanmar-students',
  'study-in-italy-myanmar-students',
  'study-in-finland-myanmar-students',
  'study-in-china-myanmar-students',
  'study-in-switzerland-myanmar-students'
)
ORDER BY sort_order;
