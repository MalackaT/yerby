import { NextResponse } from 'next/server';
import { getSubscriberCount } from '@/lib/resend';

export const dynamic = 'force-dynamic';

// Short in-memory cache so bursts of page loads don't hammer the Resend API,
// while still reflecting a new signup within a few seconds on reload.
const TTL_MS = 15_000;
let cached: { count: number | null; at: number } | null = null;

export async function GET() {
  if (!cached || Date.now() - cached.at > TTL_MS) {
    cached = { count: await getSubscriberCount(), at: Date.now() };
  }

  return NextResponse.json(
    { count: cached.count },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=15, stale-while-revalidate=30',
      },
    },
  );
}
