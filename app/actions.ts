"use server";

export type NotifyState = {
  status: "idle" | "success" | "error";
  message: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function subscribe(
  _prevState: NotifyState,
  formData: FormData,
): Promise<NotifyState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }

  // TODO: persist the address (mailing list provider, CRM or database).
  console.log(`[notify] new subscriber: ${email}`);

  return { status: "success", message: "Thank you — we'll be in touch soon." };
}
