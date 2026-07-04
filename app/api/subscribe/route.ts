import { NextRequest, NextResponse } from 'next/server';
import { addSubscriber, sendWelcomeEmail } from '@/lib/resend';

export const dynamic = 'force-dynamic';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Neplatný požadavek.' }, { status: 400 });
  }

  const email =
    body && typeof body === 'object' && 'email' in body
      ? (body as Record<string, unknown>).email
      : undefined;

  if (!email || typeof email !== 'string' || !email.trim()) {
    return NextResponse.json({ error: 'E-mail je povinný.' }, { status: 400 });
  }

  const normalized = email.trim().toLowerCase();

  if (!EMAIL_RE.test(normalized)) {
    return NextResponse.json({ error: 'Zadejte platnou e-mailovou adresu.' }, { status: 422 });
  }

  try {
    const result = await addSubscriber(normalized);

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    try {
      await sendWelcomeEmail(normalized);
    } catch (mailErr) {
      console.error('[subscribe] welcome email failed:', mailErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Jsi na seznamu. Sleduj nás!',
    });
  } catch (err) {
    console.error('[subscribe] error:', err);
    return NextResponse.json({ error: 'Něco se pokazilo. Zkuste to prosím znovu.' }, { status: 500 });
  }
}
