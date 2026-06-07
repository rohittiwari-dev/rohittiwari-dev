import {
  Button,
  Column,
  Link,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { AccentBlock, colors, EmailShell, Eyebrow, MONO, SANS } from "./_shell";

export type ContactNotificationProps = {
  name: string;
  email: string;
  subject?: string;
  message: string;
  /** ISO timestamp; defaults to render time. */
  sentAt?: string;
};

export default function ContactNotification({
  name,
  email,
  subject,
  message,
  sentAt,
}: ContactNotificationProps) {
  const stamp = new Date(sentAt ?? Date.now()).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  const firstName = name.split(" ")[0] || name;
  const replySubject = subject?.trim()
    ? `Re: ${subject.trim()}`
    : `Re: your message on rohittiwari.me`;

  return (
    <EmailShell
      preview={`New message from ${name}${subject ? ` — ${subject}` : ""}`}
      eyebrow="New enquiry · contact form"
    >
      {/* Headline ------------------------------------------------------ */}
      <Section style={{ padding: "10px 4px 0" }}>
        <Text
          style={{
            margin: 0,
            fontFamily: MONO,
            fontSize: "24px",
            fontWeight: 700,
            color: colors.ink,
            lineHeight: "1.3",
          }}
        >
          New message from {firstName}
        </Text>
        <Text
          style={{
            margin: "14px 0 0",
            fontFamily: SANS,
            fontSize: "15px",
            lineHeight: "1.75",
            color: colors.body,
          }}
        >
          Someone just reached out through your portfolio contact form. Here are
          their details and what they said.
        </Text>
      </Section>

      {/* Contact details ---------------------------------------------- */}
      <Section style={{ padding: "26px 4px 0" }}>
        <Eyebrow>Contact details</Eyebrow>
        <DetailRow label="name" value={name} />
        <DetailRow label="email" value={email} href={`mailto:${email}`} />
        <DetailRow label="subject" value={subject?.trim() || "—"} />
        <DetailRow label="received" value={stamp} last />
      </Section>

      {/* Message ------------------------------------------------------- */}
      <Section style={{ padding: "26px 4px 0" }}>
        <Eyebrow>Message</Eyebrow>
        <AccentBlock>
          <Text
            style={{
              margin: 0,
              fontFamily: SANS,
              fontSize: "15px",
              lineHeight: "1.75",
              color: colors.ink,
              whiteSpace: "pre-wrap",
            }}
          >
            {message}
          </Text>
        </AccentBlock>
      </Section>

      {/* Reply CTA ----------------------------------------------------- */}
      <Section style={{ padding: "26px 4px 0" }}>
        <Button
          href={`mailto:${email}?subject=${encodeURIComponent(replySubject)}`}
          style={{
            display: "inline-block",
            padding: "13px 28px",
            backgroundColor: colors.brand,
            backgroundImage:
              "linear-gradient(135deg, #22d3ee 0%, #818cf8 50%, #f0abfc 100%)",
            color: colors.onBrand,
            fontFamily: MONO,
            fontSize: "13px",
            fontWeight: 700,
            letterSpacing: "0.02em",
            borderRadius: "10px",
            textDecoration: "none",
          }}
        >
          Reply to {firstName} →
        </Button>
        <Text
          style={{
            margin: "14px 0 0",
            fontFamily: MONO,
            fontSize: "12px",
            color: colors.faint,
            lineHeight: "1.6",
          }}
        >
          Tip: replying to this email also reaches{" "}
          <Link
            href={`mailto:${email}`}
            style={{
              color: colors.muted,
              textDecoration: "underline",
            }}
          >
            {email}
          </Link>{" "}
          directly.
        </Text>
      </Section>
    </EmailShell>
  );
}

function DetailRow({
  label,
  value,
  href,
  last,
}: {
  label: string;
  value: string;
  href?: string;
  last?: boolean;
}) {
  const border = last ? "none" : `1px solid ${colors.border}`;
  return (
    <Row>
      <Column
        style={{
          width: "92px",
          padding: "11px 0",
          verticalAlign: "top",
          borderBottom: border,
          fontFamily: MONO,
          fontSize: "13px",
          color: colors.muted,
        }}
      >
        {label}
      </Column>
      <Column
        style={{
          padding: "11px 0 11px 14px",
          verticalAlign: "top",
          borderBottom: border,
          fontFamily: MONO,
          fontSize: "14px",
          fontWeight: 600,
          color: colors.ink,
          wordBreak: "break-word",
        }}
      >
        {href ? (
          <Link
            href={href}
            style={{
              color: colors.brandText,
              textDecoration: "none",
            }}
          >
            {value}
          </Link>
        ) : (
          value
        )}
      </Column>
    </Row>
  );
}

ContactNotification.PreviewProps = {
  name: "Ada Lovelace",
  email: "ada@analytical.dev",
  subject: "Backend API for an EV charging dashboard",
  message:
    "Hi Rohit,\n\nI came across your work on OCPP-based charging systems and I'm building a fleet dashboard that needs a real-time backend. Would love to talk through scope and timelines.\n\nBest,\nAda",
} satisfies ContactNotificationProps;
