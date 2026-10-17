-- Setting image URLs without the admin panel (it was removed in October 2026).
-- Run in the Supabase SQL editor. Each statement changes ONE row, matched by slug.
--
-- 1. Upload the file in Supabase: Storage > bucket "media". Keep this folder layout
--    so files stay easy to find:
--      countries/<slug>/card.<ext>        countries/<slug>/hero.<ext>
--      universities/<slug>/logo.<ext>     universities/<slug>/cover.<ext>
-- 2. Click the uploaded file, "Get URL" / copy the public URL, paste it below.
--    It looks like: https://<project>.supabase.co/storage/v1/object/public/media/countries/canada/card.webp
--
-- Tip: run the SELECT first to see the current value, then the UPDATE, then the SELECT again.

-- Country: card image (the tile on the destinations list) and hero image (top of the country page)
SELECT slug, card_image_url, hero_image_url FROM countries WHERE slug = 'canada';

UPDATE countries
SET card_image_url = 'PASTE-PUBLIC-URL-HERE'
WHERE slug = 'canada';

UPDATE countries
SET hero_image_url = 'PASTE-PUBLIC-URL-HERE'
WHERE slug = 'canada';

-- University: logo and cover image
SELECT slug, logo_url, cover_image_url FROM universities WHERE slug = 'university-of-toronto';

UPDATE universities
SET logo_url = 'PASTE-PUBLIC-URL-HERE'
WHERE slug = 'university-of-toronto';

UPDATE universities
SET cover_image_url = 'PASTE-PUBLIC-URL-HERE'
WHERE slug = 'university-of-toronto';

-- Remove an image (the page falls back to its placeholder):
-- UPDATE countries SET card_image_url = NULL WHERE slug = 'canada';
