// Target path: supabase/functions/_shared/notify.ts
// Shared email sender for Pride Times (SMTP, same approach as the HealthHub reference).
// All credentials come from Supabase Edge Function Secrets. Nothing is hardcoded here.
//
// Secrets (Supabase dashboard > Edge Functions > Secrets):
//   SMTP_HOST            e.g. mail.yourdomain.com
//   SMTP_PORT            e.g. 465 (TLS) or 587 (STARTTLS)
//   SMTP_USER            mailbox user, e.g. news@yourdomain.com
//   SMTP_PASS            mailbox password (rotate if it was ever shared in code)
//   SMTP_FROM_NAME       e.g. "The Pride Times"
//   SMTP_FROM_EMAIL      e.g. news@yourdomain.com
//   ADMIN_NOTIFY_EMAIL   where admin alerts are delivered, e.g. pridetimenews@gmail.com
//
// Email failures are logged and returned as { success: false }. They never throw,
// so a failed email cannot break a sign-up, subscription or payment.

const SMTP_HOST = Deno.env.get("SMTP_HOST") ?? "";
const SMTP_PORT = parseInt(Deno.env.get("SMTP_PORT") ?? "465");
const SMTP_USER = Deno.env.get("SMTP_USER") ?? "";
const SMTP_PASS = Deno.env.get("SMTP_PASS") ?? "";
const FROM_NAME = Deno.env.get("SMTP_FROM_NAME") ?? "The Pride Times";
const FROM_EMAIL = Deno.env.get("SMTP_FROM_EMAIL") ?? SMTP_USER;
const ADMIN_EMAIL = Deno.env.get("ADMIN_NOTIFY_EMAIL") ?? "";

export type SendResult = { success: boolean; error?: string };

export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stripTags(html: string): string {
  return html.replace(/<style[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function istNow(): string {
  return new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" });
}

/** Sends one HTML email through SMTP. Never throws. */
export async function sendEmail(opts: { to: string; toName?: string; subject: string; html: string }): Promise<SendResult> {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("SMTP_NOT_CONFIGURED");
    return { success: false, error: "SMTP secrets are not set" };
  }
  let client: any;
  try {
    const { SMTPClient } = await import("https://deno.land/x/denomailer@1.6.0/mod.ts");
    client = new SMTPClient({
      connection: {
        hostname: SMTP_HOST,
        port: SMTP_PORT,
        tls: SMTP_PORT === 465,
        auth: { username: SMTP_USER, password: SMTP_PASS },
      },
    });
    await client.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: opts.toName ? `${opts.toName} <${opts.to}>` : opts.to,
      subject: opts.subject,
      content: stripTags(opts.html),
      html: opts.html,
    });
    return { success: true };
  } catch (err) {
    console.error("SMTP_SEND_FAILED", opts.to, err);
    return { success: false, error: String(err) };
  } finally {
    try { await client?.close(); } catch { /* ignore */ }
  }
}

/* ------------------------------------------------------------------
   Admin alerts
   ------------------------------------------------------------------ */

export type AdminEvent = "sign_in" | "newsletter_subscribe" | "newsletter_unsubscribe" | "premium_purchase";

const EVENT_TITLES: Record<AdminEvent, string> = {
  sign_in: "User signed in",
  newsletter_subscribe: "New newsletter subscription",
  newsletter_unsubscribe: "Newsletter unsubscribe",
  premium_purchase: "Premium purchase",
};

const LABELS: Record<string, string> = {
  email: "Email",
  name: "Name",
  user_id: "User ID",
  newsletter: "Newsletter",
  plan: "Plan / product",
  amount: "Amount (INR)",
  payment_id: "Payment ID",
  order_id: "Order ID",
  provider: "Sign-in method",
};

/** Sends an alert to ADMIN_NOTIFY_EMAIL describing one event. Never throws. */
export async function notifyAdmin(event: AdminEvent, details: Record<string, string | number | undefined>): Promise<SendResult> {
  if (!ADMIN_EMAIL) {
    console.warn("ADMIN_NOTIFY_EMAIL not set, admin alert skipped", event);
    return { success: false, error: "ADMIN_NOTIFY_EMAIL is not set" };
  }
  const rows = Object.entries(details)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) =>
      `<tr><td style="padding:10px 14px;color:#6b7280;font-size:12px;text-transform:uppercase;letter-spacing:.5px;border-bottom:1px solid #e5e7eb">${escapeHtml(LABELS[k] ?? k)}</td>` +
      `<td style="padding:10px 14px;font-size:14px;color:#111827;border-bottom:1px solid #e5e7eb">${escapeHtml(v)}</td></tr>`
    )
    .join("");

  const title = EVENT_TITLES[event];
  const html = `<!DOCTYPE html><html><body style="margin:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:560px;margin:32px auto;background:#fff;border-top:4px solid #dc2626">
    <div style="padding:24px 28px;border-bottom:1px solid #e5e7eb">
      <div style="font-size:11px;letter-spacing:2px;color:#dc2626;font-weight:700;text-transform:uppercase">The Pride Times · Admin alert</div>
      <div style="font-size:20px;color:#111827;font-weight:700;margin-top:6px">${escapeHtml(title)}</div>
      <div style="font-size:12px;color:#6b7280;margin-top:4px">${escapeHtml(istNow())} (IST)</div>
    </div>
    <table style="width:100%;border-collapse:collapse">${rows}</table>
  </div></body></html>`;

  return sendEmail({ to: ADMIN_EMAIL, subject: `[Pride Times] ${title}`, html });
}

/* ------------------------------------------------------------------
   Customer emails
   ------------------------------------------------------------------ */

function userShell(heading: string, bodyHtml: string): string {
  return `<!DOCTYPE html><html><body style="margin:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif">
  <div style="max-width:560px;margin:32px auto;background:#fff;border-top:4px solid #dc2626">
    <div style="padding:24px 28px;border-bottom:1px solid #e5e7eb">
      <div style="font-size:11px;letter-spacing:2px;color:#dc2626;font-weight:700;text-transform:uppercase">The Pride Times</div>
      <div style="font-size:20px;color:#111827;font-weight:700;margin-top:6px">${escapeHtml(heading)}</div>
    </div>
    <div style="padding:24px 28px;font-size:14px;line-height:1.6;color:#374151">${bodyHtml}</div>
    <div style="padding:16px 28px;border-top:1px solid #e5e7eb;font-size:12px;color:#9ca3af">
      If you did not make this change, please sign in and review your account, or reply to this email.
    </div>
  </div></body></html>`;
}

export function newsletterEmailHtml(name: string, subscribed: boolean): string {
  const body = subscribed
    ? `<p>You are now subscribed to <strong>${escapeHtml(name)}</strong>.</p><p>You can change this anytime in your account settings.</p>`
    : `<p>You have unsubscribed from <strong>${escapeHtml(name)}</strong>. You will no longer receive emails for this newsletter.</p>`;
  return userShell(subscribed ? `You're subscribed to ${name}` : `You've unsubscribed from ${name}`, body);
}

export function premiumReceiptHtml(opts: { plan: string; amount: number; paymentId: string; validUntil?: string }): string {
  const rupees = (opts.amount / 100).toLocaleString("en-IN", { minimumFractionDigits: 2 });
  const until = opts.validUntil
    ? `<p>Your access is valid until <strong>${escapeHtml(new Date(opts.validUntil).toLocaleDateString("en-IN", { dateStyle: "medium" }))}</strong>.</p>`
    : "";
  const body = `<p>Thank you for your purchase. Your payment has been received.</p>
    <p><strong>Plan / product:</strong> ${escapeHtml(opts.plan)}<br/>
    <strong>Amount paid:</strong> ₹${escapeHtml(rupees)}<br/>
    <strong>Payment ID:</strong> ${escapeHtml(opts.paymentId)}</p>${until}
    <p>Keep this email as your receipt.</p>`;
  return userShell("Thank you for your purchase", body);
}
