import { Button, Hr, Link, Section, Text } from "@react-email/components";
import { colors, EmailShell, SANS } from "./_shell";

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
      preview={`New enquiry from ${name}${subject ? ` — ${subject}` : ""}`}
      eyebrow="New enquiry · contact form"
    >
      <Section style={{ padding: "30px 32px 6px" }}>
        <Text
          style={{
            margin: 0,
            fontFamily: SANS,
            fontSize: "21px",
            fontWeight: 700,
            color: colors.ink,
            lineHeight: "1.3",
          }}
        >
          You have a new enquiry
        </Text>
        <Text
          style={{
            margin: "8px 0 0",
            fontFamily: SANS,
            fontSize: "15px",
            lineHeight: "1.65",
            color: colors.body,
          }}
        >
          {firstName} reached out through your portfolio contact form. Their
          details and message are below.
        </Text>
      </Section>

      {/* Contact details ---------------------------------------------- */}
      <Section style={{ padding: "20px 32px 4px" }}>
        <table
          width="100%"
          cellPadding={0}
          cellSpacing={0}
          role="presentation"
          style={{
            backgroundColor: colors.surface,
            border: `1px solid ${colors.border}`,
            borderRadius: "12px",
          }}
        >
          <tbody>
            <DetailRow label="Name" value={name} />
            <DetailRow label="Email" value={email} href={`mailto:${email}`} />
            <DetailRow label="Subject" value={subject?.trim() || "—"} />
            <DetailRow label="Received" value={stamp} last />
          </tbody>
        </table>
      </Section>

      {/* Message ------------------------------------------------------- */}
      <Section style={{ padding: "20px 32px 4px" }}>
        <Text
          style={{
            margin: "0 0 8px",
            fontFamily: SANS,
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            color: colors.muted,
          }}
        >
          Message
        </Text>
        <div
          style={{
            padding: "18px 20px",
            backgroundColor: colors.card,
            border: `1px solid ${colors.border}`,
            borderLeft: `3px solid ${colors.brand}`,
            borderRadius: "12px",
          }}
        >
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
        </div>
      </Section>

      {/* Reply CTA ----------------------------------------------------- */}
      <Section style={{ padding: "26px 32px 4px" }}>
        <Button
          href={`mailto:${email}?subject=${encodeURIComponent(replySubject)}`}
          style={{
            display: "inline-block",
            padding: "13px 26px",
            backgroundColor: colors.brand,
            color: colors.onBrand,
            fontFamily: SANS,
            fontSize: "14px",
            fontWeight: 600,
            borderRadius: "10px",
            textDecoration: "none",
          }}
        >
          Reply to {firstName}
        </Button>
      </Section>

      <Hr
        style={{
          margin: "26px 32px 0",
          border: "none",
          borderTop: `1px solid ${colors.border}`,
        }}
      />

      <Section style={{ padding: "14px 32px 4px" }}>
        <Text
          style={{
            margin: 0,
            fontFamily: SANS,
            fontSize: "12px",
            color: colors.faint,
            lineHeight: "1.6",
          }}
        >
          Tip: replying to this email reaches{" "}
          <Link
            href={`mailto:${email}`}
            style={{ color: colors.muted, textDecoration: "underline" }}
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
  const cellBorder = last ? "none" : `1px solid ${colors.border}`;
  return (
    <tr>
      <td
        style={{
          width: "92px",
          padding: "13px 0 13px 18px",
          verticalAlign: "top",
          borderBottom: cellBorder,
          fontFamily: SANS,
          fontSize: "13px",
          color: colors.muted,
        }}
      >
        {label}
      </td>
      <td
        style={{
          padding: "13px 18px 13px 10px",
          verticalAlign: "top",
          borderBottom: cellBorder,
          fontFamily: SANS,
          fontSize: "14px",
          fontWeight: 600,
          color: colors.ink,
        }}
      >
        {href ? (
          <Link
            href={href}
            style={{ color: colors.brandDark, textDecoration: "none" }}
          >
            {value}
          </Link>
        ) : (
          value
        )}
      </td>
    </tr>
  );
}

ContactNotification.PreviewProps = {
  name: "Ada Lovelace",
  email: "ada@analytical.dev",
  subject: "Backend API for an EV charging dashboard",
  message:
    "Hi Rohit,\n\nI came across your work on OCPP-based charging systems and I'm building a fleet dashboard that needs a real-time backend. Would love to talk through scope and timelines.\n\nBest,\nAda",
} satisfies ContactNotificationProps;
