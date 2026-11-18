/**
 * A small in-memory throttle so one browser cannot hammer the enquiry
 * endpoints. It is per-instance, so on a serverless platform it is a speed
 * bump rather than a guarantee, good enough to stop accidental double
 * submissions and casual abuse. Move to Supabase or Upstash if the forms ever
 * attract real spam.
 */

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

const hits = new Map<string, number[]>();

export function tooManyRequests(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  // Keep the map from growing without bound on a long-lived instance.
  if (hits.size > 5_000) {
    for (const [k, times] of hits) {
      if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
    }
  }

  return recent.length > MAX_PER_WINDOW;
}

export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
