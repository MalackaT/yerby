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
    subject: 'Tak jo, jsi in 🌿',
    html: `
  <div style="margin:0;padding:0;background-color:#f7f7f5;">
    <div style="max-width:520px;margin:0 auto;padding:40px 24px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">

      <!-- Logo hlavička -->
      <div style="text-align:center;padding-bottom:32px;">
        <img src="https://drinkyerby.com/logo-wordmark.png" alt="Yerby" width="120" style="display:inline-block;height:auto;" />
      </div>

      <!-- Hlavní karta -->
      <div style="background-color:#ffffff;border-radius:20px;padding:40px 32px;">

        <h1 style="font-size:26px;font-weight:800;color:#2d3a2e;margin:0 0 20px;line-height:1.2;">
          Tak jo, jsi in. 🌿
        </h1>

        <p style="font-size:16px;line-height:1.65;color:#3d4a3e;margin:0 0 18px;">
          Právě sis zajistil místo mezi prvními. Až spustíme, budeš u toho dřív než ostatní — a rovnou se slevou.
        </p>

        <p style="font-size:16px;line-height:1.65;color:#3d4a3e;margin:0 0 18px;">
          Chystáme 100% přírodní nápoj pro každého, kdo chce od svého dne trochu víc. Základ? Prvotřídní <strong>cold brew yerba maté</strong>, přirozeně nabité minerály a antioxidanty. Žádná chemie, žádný cukr, žádnej crash — jen čistá energie, co tě naladí a udrží v tempu.
        </p>

        <p style="font-size:16px;line-height:1.65;color:#3d4a3e;margin:0 0 28px;">
          Ať už tě čeká náročnej den v práci nebo aktivní odpoledne, Yerby jede s tebou ve tvým rytmu.
        </p>

        <!-- Tagline -->
        <div style="background-color:#f2f5ee;border-radius:14px;padding:20px 24px;text-align:center;margin:0 0 28px;">
          <p style="font-size:18px;font-weight:800;color:#598042;margin:0;letter-spacing:-0.3px;">
            Ne nakopnutí. Rovnováha.
          </p>
        </div>

        <!-- Co bude dál -->
        <p style="font-size:15px;line-height:1.65;color:#3d4a3e;margin:0 0 8px;">
          <strong>Co bude dál?</strong>
        </p>
        <p style="font-size:15px;line-height:1.65;color:#3d4a3e;margin:0 0 28px;">
          Pár dní před spuštěním ti pošleme mail, že se jde do prodeje — a s ním <strong>tvůj slevový kód</strong> pro první nákup. Tak koukej na schránku. 👀
        </p>

        <!-- Instagram CTA -->
        <div style="text-align:center;margin:0 0 8px;">
          <a href="https://www.instagram.com/yerbycz/" style="display:inline-block;background-color:#598042;color:#ffffff;text-decoration:none;font-size:15px;font-weight:700;padding:14px 32px;border-radius:999px;">
            Sleduj nás na Instagramu →
          </a>
        </div>

      </div>

      <!-- Patička -->
      <div style="text-align:center;padding:28px 24px 0;">
        <p style="font-size:13px;line-height:1.6;color:#9aa39b;margin:0 0 4px;">
          Dostáváš tento e-mail, protože ses přihlásil na čekací listinu Yerby.
        </p>
        <p style="font-size:13px;line-height:1.6;color:#9aa39b;margin:0;">
          — tým Yerby 🌿
        </p>
      </div>

    </div>
  </div>
    `,
  });
}
