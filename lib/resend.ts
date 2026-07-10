import { Resend } from 'resend';

// Lazily initialised so the module doesn't fail during `next build`
// when env vars are absent.
let _client: Resend | null = null;
function getClient() {
  if (!_client) _client = new Resend(process.env.RESEND_API_KEY ?? '');
  return _client;
}

export type SubscribeResult =
  | { success: true; alreadyExists: boolean }
  | { success: false; error: string };

type ContactPage = {
  object: 'list';
  data: Array<{ id: string }>;
  has_more?: boolean;
};

/**
 * One page of audience contacts. Reads the legacy /audiences endpoint FIRST —
 * the same resource new signups are written to via contacts.create — so a
 * fresh contact is immediately visible to the counter. (The SDK's
 * contacts.list maps audienceId onto the newer /segments endpoint, which can
 * lag or diverge from the audience; it's kept only as a fallback.)
 */
async function listContactPage(
  audienceId: string,
  after?: string,
): Promise<ContactPage | null> {
  const client = getClient();
  const qs = `limit=100${after ? `&after=${encodeURIComponent(after)}` : ''}`;

  const legacy = await client.get<ContactPage>(
    `/audiences/${audienceId}/contacts?${qs}`,
  );
  if (!legacy.error && legacy.data && Array.isArray(legacy.data.data)) {
    return legacy.data;
  }

  const seg = await client.contacts.list({
    audienceId,
    limit: 100,
    ...(after ? { after } : {}),
  });
  if (!seg.error && seg.data && Array.isArray(seg.data.data)) {
    return seg.data;
  }

  return null;
}

/**
 * Real signup count from the Resend audience.
 * Returns null when env vars are missing or the API call fails —
 * callers hide the counter in that case.
 */
export async function getSubscriberCount(): Promise<number | null> {
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_AUDIENCE_ID) {
    return null;
  }

  try {
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    // Pages default to only 20 items, so a single call would plateau the
    // counter well before every email is counted. Page through the whole
    // audience, deduping by id so a repeated/stuck cursor can never overcount.
    const ids = new Set<string>();
    let after: string | undefined;

    for (let page = 0; page < 200; page++) {
      const data = await listContactPage(audienceId, after);

      if (!data) {
        // First page failed → unknown; a later page failed → keep what we have.
        return page === 0 ? null : ids.size;
      }

      const seenBefore = ids.size;
      for (const contact of data.data) ids.add(contact.id);

      // Stop when the API says there's no more, the page was empty, or the
      // cursor stopped yielding new ids (guards against an infinite loop).
      if (!data.has_more || data.data.length === 0 || ids.size === seenBefore) {
        break;
      }

      after = data.data[data.data.length - 1].id;
    }

    return ids.size;
  } catch {
    return null;
  }
}

export async function addSubscriber(email: string): Promise<SubscribeResult> {
  if (!process.env.RESEND_API_KEY || !process.env.RESEND_AUDIENCE_ID) {
    throw new Error('RESEND_API_KEY and RESEND_AUDIENCE_ID must be set in .env.local');
  }

  const audienceId = process.env.RESEND_AUDIENCE_ID;

  // Reliable duplicate check: if this email is already a contact, it's an
  // idempotent no-op — don't re-create, re-email, or tick the counter.
  // Any lookup failure falls through to create (safe: Resend upserts by email).
  try {
    const existing = await getClient().contacts.get({ audienceId, email });
    if (existing.data?.id) {
      return { success: true, alreadyExists: true };
    }
  } catch {
    /* fall through to create */
  }

  const { error } = await getClient().contacts.create({
    email,
    audienceId,
    unsubscribed: false,
  });

  if (error) {
    // Fallback: some Resend API versions surface an existing email as an error
    // instead of returning it — still treat "already exists" as a signup.
    if (/already\s*exist|duplicate/i.test(error.message)) {
      return { success: true, alreadyExists: true };
    }
    return { success: false, error: error.message };
  }

  return { success: true, alreadyExists: false };
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
