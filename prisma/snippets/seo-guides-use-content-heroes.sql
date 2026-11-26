-- Promote content images to the only card/OG image for all 15 guides.
-- Repo files already renamed: former *-2.jpg is now *-hero.jpg.
-- This updates live Supabase rows: keep hero URL path, refresh alt, clear inline.
-- MANUAL: run in Supabase SQL editor after deploying the new image files.

BEGIN;

UPDATE public.guides SET
  hero_image_url = '/images/guides/uk-visa-ban-myanmar-students-a-level-hero.jpg',
  hero_image_alt = 'A Level study materials and a passport on a desk while planning a UK student route',
  inline_image_url = NULL,
  inline_image_alt = NULL,
  og_image_url = NULL,
  updated_at = now()
WHERE slug = 'uk-visa-ban-myanmar-students-a-level';

UPDATE public.guides SET
  hero_image_url = '/images/guides/malaysia-private-university-fees-hero.jpg',
  hero_image_alt = 'Planning Malaysia tuition costs with notebooks and a calculator on a desk',
  inline_image_url = NULL,
  inline_image_alt = NULL,
  og_image_url = NULL,
  updated_at = now()
WHERE slug = 'malaysia-private-university-fees';

UPDATE public.guides SET
  hero_image_url = '/images/guides/cheapest-country-to-study-abroad-myanmar-hero.jpg',
  hero_image_alt = 'Budget planning still life for comparing study abroad costs',
  inline_image_url = NULL,
  inline_image_alt = NULL,
  og_image_url = NULL,
  updated_at = now()
WHERE slug = 'cheapest-country-to-study-abroad-myanmar';

UPDATE public.guides SET
  hero_image_url = '/images/guides/student-visa-checklist-myanmar-hero.jpg',
  hero_image_alt = 'Organised visa application folders on a counsellor desk',
  inline_image_url = NULL,
  inline_image_alt = NULL,
  og_image_url = NULL,
  updated_at = now()
WHERE slug = 'student-visa-checklist-myanmar';

UPDATE public.guides SET
  hero_image_url = '/images/guides/top-universities-thailand-myanmar-students-hero.jpg',
  hero_image_alt = 'Bright university library atrium for studying in Thailand',
  inline_image_url = NULL,
  inline_image_alt = NULL,
  og_image_url = NULL,
  updated_at = now()
WHERE slug = 'top-universities-thailand-myanmar-students';

UPDATE public.guides SET
  hero_image_url = '/images/guides/hungary-scholarships-myanmar-students-hero.jpg',
  hero_image_alt = 'Scholarship application materials on a desk for Hungary study plans',
  inline_image_url = NULL,
  inline_image_alt = NULL,
  og_image_url = NULL,
  updated_at = now()
WHERE slug = 'hungary-scholarships-myanmar-students';

UPDATE public.guides SET
  hero_image_url = '/images/guides/part-time-work-minimum-wage-by-country-hero.jpg',
  hero_image_alt = 'Weekly planner and coins suggesting student work hours and wages',
  inline_image_url = NULL,
  inline_image_alt = NULL,
  og_image_url = NULL,
  updated_at = now()
WHERE slug = 'part-time-work-minimum-wage-by-country';

UPDATE public.guides SET
  hero_image_url = '/images/guides/private-universities-germany-myanmar-hero.jpg',
  hero_image_alt = 'Bank folder and passport for Germany study funds and visa planning',
  inline_image_url = NULL,
  inline_image_alt = NULL,
  og_image_url = NULL,
  updated_at = now()
WHERE slug = 'private-universities-germany-myanmar';

UPDATE public.guides SET
  hero_image_url = '/images/guides/study-in-canada-myanmar-students-hero.jpg',
  hero_image_alt = 'Canada study permit planning documents on a desk',
  inline_image_url = NULL,
  inline_image_alt = NULL,
  og_image_url = NULL,
  updated_at = now()
WHERE slug = 'study-in-canada-myanmar-students';

UPDATE public.guides SET
  hero_image_url = '/images/guides/study-in-new-zealand-myanmar-students-hero.jpg',
  hero_image_alt = 'New Zealand student visa planning documents and passport on a desk',
  inline_image_url = NULL,
  inline_image_alt = NULL,
  og_image_url = NULL,
  updated_at = now()
WHERE slug = 'study-in-new-zealand-myanmar-students';

UPDATE public.guides SET
  hero_image_url = '/images/guides/study-in-ireland-myanmar-students-hero.jpg',
  hero_image_alt = 'Wet cobblestone street mood for studying in Ireland',
  inline_image_url = NULL,
  inline_image_alt = NULL,
  og_image_url = NULL,
  updated_at = now()
WHERE slug = 'study-in-ireland-myanmar-students';

UPDATE public.guides SET
  hero_image_url = '/images/guides/study-in-italy-myanmar-students-hero.jpg',
  hero_image_alt = 'Desk scene suggesting Italy study planning and scholarships',
  inline_image_url = NULL,
  inline_image_alt = NULL,
  og_image_url = NULL,
  updated_at = now()
WHERE slug = 'study-in-italy-myanmar-students';

UPDATE public.guides SET
  hero_image_url = '/images/guides/study-in-finland-myanmar-students-hero.jpg',
  hero_image_alt = 'Bright minimal Nordic classroom with forest views',
  inline_image_url = NULL,
  inline_image_alt = NULL,
  og_image_url = NULL,
  updated_at = now()
WHERE slug = 'study-in-finland-myanmar-students';

UPDATE public.guides SET
  hero_image_url = '/images/guides/study-in-china-myanmar-students-hero.jpg',
  hero_image_alt = 'Passport and study planning materials for China applications',
  inline_image_url = NULL,
  inline_image_alt = NULL,
  og_image_url = NULL,
  updated_at = now()
WHERE slug = 'study-in-china-myanmar-students';

UPDATE public.guides SET
  hero_image_url = '/images/guides/study-in-switzerland-myanmar-students-hero.jpg',
  hero_image_alt = 'Elegant hospitality training table setting for Swiss hotel schools',
  inline_image_url = NULL,
  inline_image_alt = NULL,
  og_image_url = NULL,
  updated_at = now()
WHERE slug = 'study-in-switzerland-myanmar-students';

COMMIT;

SELECT slug, hero_image_url, left(hero_image_alt, 48) AS alt, inline_image_url, og_image_url
FROM public.guides
ORDER BY sort_order;
