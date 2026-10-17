/**
 * The public address of the site, without a trailing slash. Everything that needs
 * an absolute URL (sitemap, robots, canonical and language alternates, share links,
 * email images) reads it from here.
 *
 * Vercel's NEXT_PUBLIC_SITE_URL wins when it is set. The default is the www address
 * because the bare domain redirects to it, so www is the real home of the site.
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.saturdayeducation.com').replace(/\/+$/, '')
