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
    subject: 'Jsi na seznamu 🌿',
    html: `
  <div style="margin:0;padding:0;background-color:#f7f7f5;">
    <div style="max-width:520px;margin:0 auto;padding:48px 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">

      <!-- Logo hlavička -->
      <div style="text-align:center;padding-bottom:36px;">
        <img src="https://drinkyerby.com/logo-wordmark.png" alt="Yerby" width="220" style="display:inline-block;height:auto;max-width:80%;" />
      </div>

      <!-- Hlavní karta -->
      <div style="background-color:#ffffff;border-radius:20px;padding:40px 32px;text-align:center;">

        <h1 style="font-size:26px;font-weight:800;color:#2d3a2e;margin:0 0 16px;line-height:1.2;">
          Jsi na seznamu. 🌿
        </h1>

        <p style="font-size:16px;line-height:1.65;color:#3d4a3e;margin:0 0 28px;">
          Jakmile budeme launchovat, ozveme se ti jako prvnímu — i s tvým slevovým kódem na první nákup.
        </p>

        <!-- Instagram CTA -->
        <a href="https://www.instagram.com/yerbycz/" style="display:inline-block;background-color:#598042;color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 32px;border-radius:999px;">
          Sleduj nás na Instagramu →
        </a>

      </div>

      <!-- Patička -->
      <div style="text-align:center;padding:28px 24px 0;">
        <p style="font-size:13px;line-height:1.6;color:#9aa39b;margin:0;">
          — tým Yerby 🌿
        </p>
      </div>

    </div>
  </div>
    `,
  });
}
