import { NextResponse } from "next/server";
import { Resend } from "resend";
import { PERSONAL_DATA } from "@/db/cv";
import ContactAutoReply from "@/emails/contact-autoreply";
import ContactNotification from "@/emails/contact-notification";

// Always run on the server at request time — never prerender/cache.
export const dynamic = "force-dynamic";

// Sender must be on a Resend-verified domain. The visitor's address goes into
// `replyTo` so hitting "reply" in the inbox answers them directly.
const FROM =
  process.env.CONTACT_FROM_EMAIL ?? "Rohit Tiwari <rohit@rohittiwari.me>";
const TO = process.env.CONTACT_TO_EMAIL ?? PERSONAL_DATA.email;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
};

const clean = (v: unknown) => (typeof v === "string" ? v.trim() : "");

export async function POST(request: Request) {
  if (!process.env.RESEND_KEY) {
    console.error("[contact] RESEND_KEY is not set");
    return NextResponse.json(
      { error: "Email is not configured on the server." },
      { status: 500 },
    );
  }

  let body: ContactPayload;
  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const name = clean(body.name);
  const email = clean(body.email);
  const subject = clean(body.subject);
  const message = clean(body.message);

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = "Name is required.";
  if (!email) fieldErrors.email = "Email is required.";
  else if (!EMAIL_RE.test(email)) fieldErrors.email = "Enter a valid email.";
  if (!message) fieldErrors.message = "Message is required.";
  // Honeypot-friendly guard against absurd payloads.
  if (message.length > 5000)
    fieldErrors.message = "Message is too long (5000 chars max).";

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { error: "Please fix the highlighted fields.", fieldErrors },
      { status: 422 },
    );
  }

  const resend = new Resend(process.env.RESEND_KEY);
  const sentAt = new Date().toISOString();

  try {
    // 1. Notify the site owner. This is the critical send — if it fails, the
    //    visitor's message is lost, so we surface an error.
    const notify = await resend.emails.send({
      from: FROM,
      to: [TO],
      replyTo: email,
      subject: subject ? `New enquiry: ${subject}` : `New enquiry from ${name}`,
      react: ContactNotification({ name, email, subject, message, sentAt }),
    });

    if (notify.error) {
      console.error("[contact] Notification send failed:", notify.error);
      return NextResponse.json(
        { error: "Couldn't send your message. Please try again." },
        { status: 502 },
      );
    }

    // 2. Auto-reply to the visitor. Best-effort: a failure here shouldn't lose
    //    the enquiry, so we log it but still report success to the user.
    const autoReply = await resend.emails.send({
      from: FROM,
      to: [email],
      replyTo: TO,
      subject: "Thanks for reaching out — I've received your message",
      react: ContactAutoReply({ name, subject, message }),
    });

    if (autoReply.error) {
      console.error("[contact] Auto-reply send failed:", autoReply.error);
    }

    return NextResponse.json(
      { ok: true, id: notify.data?.id },
      { status: 200 },
    );
  } catch (err) {
    console.error("[contact] Unexpected error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
