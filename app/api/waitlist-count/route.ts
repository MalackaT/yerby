import { NextResponse } from 'next/server';
import { getSubscriberCount } from '@/lib/resend';

export const dynamic = 'force-dynamic';

// In-memory cache so we don't hit the Resend API on every page load.
const TTL_MS = 60_000;
let cached: { count: number | null; at: number } | null = null;

export async function GET() {
  if (!cached || Date.now() - cached.at > TTL_MS) {
    cached = { count: await getSubscriberCount(), at: Date.now() };
  }

  return NextResponse.json(
    { count: cached.count },
    {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=60',
      },
    },
  );
}
