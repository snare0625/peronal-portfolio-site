"use server";

import { getSupabase } from "@/lib/supabase/server";

export type ContactState = { ok: boolean; message: string } | null;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: bots fill hidden fields; pretend success.
  if (String(formData.get("company") ?? "")) return { ok: true, message: "Thanks!" };

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || name.length > 120) return { ok: false, message: "Please add your name." };
  if (!EMAIL.test(email) || email.length > 200) return { ok: false, message: "That email doesn’t look right." };
  if (message.length < 10 || message.length > 4000) return { ok: false, message: "Tell me a little more — at least 10 characters." };

  const sb = getSupabase();
  if (!sb) return { ok: false, message: "The form isn’t connected yet — please email me directly." };

  const { error } = await sb.from("contact_messages").insert({ name, email, message });
  if (error) {
    console.error("[contact] insert failed", error);
    return { ok: false, message: "Something went wrong — please email me directly." };
  }

  await notify(name, email, message);
  return { ok: true, message: "Message sent — I’ll get back to you soon." };
}

/** Optional email notification via Resend's REST API (no SDK needed). */
async function notify(name: string, email: string, message: string) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) return;
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: "New portfolio enquiry from " + name,
        text: message + "\n\n— " + name + " <" + email + ">",
      }),
    });
  } catch (err) {
    console.error("[contact] notify failed", err);
  }
}
