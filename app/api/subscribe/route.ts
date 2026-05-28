import { NextRequest, NextResponse } from 'next/server';
import { addSubscriber } from '@/lib/resend';

export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const email =
    body && typeof body === 'object' && 'email' in body
      ? (body as Record<string, unknown>).email
      : undefined;

  if (!email || typeof email !== 'string' || !email.trim()) {
    return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
  }

  const normalized = email.trim().toLowerCase();

  if (!EMAIL_RE.test(normalized)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 422 });
  }

  try {
    const result = await addSubscriber(normalized);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: "You're on the list. Stay tuned.",
    });
  } catch (err) {
    console.error('[subscribe] error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 });
  }
}
