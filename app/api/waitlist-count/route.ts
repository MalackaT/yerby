import { NextResponse } from 'next/server';
import { getSubscriberCount } from '@/lib/resend';

export const dynamic = 'force-dynamic';
// The Resend SDK uses global fetch, which Next would otherwise cache in the
// Data Cache for GET route handlers — freezing the count at its first value.
export const fetchCache = 'force-no-store';

// Tiny in-memory cache so bursts of page loads don't hammer the Resend API.
// No CDN caching (no-store): a shared edge cache would serve the same stale
// number to every device for its whole lifetime.
const TTL_MS = 5_000;
let cached: { count: number | null; at: number } | null = null;

export async function GET() {
  if (!cached || Date.now() - cached.at > TTL_MS || cached.count === null) {
    cached = { count: await getSubscriberCount(), at: Date.now() };
  }

  return NextResponse.json(
    { count: cached.count },
    {
      headers: {
        'Cache-Control': 'no-store',
      },
    },
  );
}
