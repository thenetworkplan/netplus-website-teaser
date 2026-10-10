/**
 * Early-access requests are emailed to the NetPlus inbox through FormSubmit (formsubmit.co):
 * no server, no password, works on any hosting. The very first request triggers a one-time
 * "Activate form" email to the inbox below — click it once and every request after that is delivered.
 */
export const CONTACT_EMAIL = "contact@netplus-software.com";
const ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

export type NotifyState = {
  status: "idle" | "success" | "error";
  /** Why it failed, so the form can show the right message in the visitor's language. */
  reason?: "invalid" | "failed";
};

const EMAIL_PATTERN = /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/;

const FORM_NAMES: Record<string, string> = {
  email: "Hero — Be the first to know",
  "contact-email": "Contact — Ready to take off?",
};

export async function sendEarlyAccess(formData: FormData): Promise<NotifyState> {
  // Honeypot: a field real visitors never see. Bots that fill it get a silent "success".
  if (String(formData.get("_honey") ?? "").trim()) return { status: "success" };

  const email = String(formData.get("email") ?? "").trim();
  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return { status: "error", reason: "invalid" };
  }

  const source = String(formData.get("source") ?? "");
  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        email,
        Form: FORM_NAMES[source] ?? "Website",
        Language: formData.get("lang") === "fr" ? "French" : "English",
        _subject: `New early-access request — ${email}`,
        _replyto: email,
        _template: "table",
        _captcha: "false",
      }),
    });
    const data = (await res.json().catch(() => ({}))) as { success?: string | boolean };
    if (!res.ok || String(data.success) !== "true") throw new Error(JSON.stringify(data));
    return { status: "success" };
  } catch (error) {
    console.error("[notify] could not send the request:", error);
    return { status: "error", reason: "failed" };
  }
}
