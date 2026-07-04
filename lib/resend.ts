import { Resend } from 'resend';

// Lazily initialised so the module doesn't fail during `next build`
// when env vars are absent.
let _client: Resend | null = null;
function getClient() {
  if (!_client) _client = new Resend(process.env.RESEND_API_KEY ?? '');
  return _client;
}

export type SubscribeResult =
  | { success: true }
  | { success: false; error: string };

export async function addSubscriber(email: string): Promise<SubscribeResult> {
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_AUDIENCE_ID) {
    throw new Error('RESEND_API_KEY and RESEND_AUDIENCE_ID must be set in .env.local');
  }

  const { error } = await getClient().contacts.create({
    email,
    audienceId: process.env.RESEND_AUDIENCE_ID,
    unsubscribed: false,
  });

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true };
}

export async function sendWelcomeEmail(email: string): Promise<void> {
  await getClient().emails.send({
    from: 'Yerby <ahoj@drinkyerby.com>',
    to: email,
    subject: 'Jsi na seznamu',
    html: '<div style="font-family: sans-serif; padding: 24px; color: #2d3a2e;"><h1>Vitej u Yerby.</h1><p>Jsi na seznamu. Brzy se ozveme.</p><p><strong>Ne nakopnuti. Rovnovaha.</strong></p></div>',
  });
}
