import { Button, Section, Text } from "@react-email/components";
import { PERSONAL_DATA } from "@/db/cv";
import { AccentBlock, colors, EmailShell, Eyebrow, MONO, SANS } from "./_shell";

export type ContactAutoReplyProps = {
  name: string;
  subject?: string;
  message: string;
};

export default function ContactAutoReply({
  name,
  subject,
  message,
}: ContactAutoReplyProps) {
  const firstName = name?.split(" ")[0] || name;

  return (
    <EmailShell
      preview={`Thanks for reaching out, ${firstName} — I've got your message.`}
      eyebrow={PERSONAL_DATA.headline}
    >
      {/* Greeting ------------------------------------------------------ */}
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
          Thanks for reaching out, {firstName}
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
          Your message has landed safely in my inbox — thank you for taking the
          time to write. I read every message myself and I'll get back to you
          within{" "}
          <strong style={{ color: colors.ink }}>1–2 business days</strong>.
        </Text>
      </Section>

      {/* Copy of their message ---------------------------------------- */}
      <Section style={{ padding: "26px 4px 0" }}>
        <Eyebrow>Here's what you sent</Eyebrow>
        <AccentBlock>
          {subject?.trim() ? (
            <Text
              style={{
                margin: "0 0 8px",
                fontFamily: MONO,
                fontSize: "15px",
                fontWeight: 700,
                color: colors.brandText,
              }}
            >
              {subject.trim()}
            </Text>
          ) : null}
          <Text
            style={{
              margin: 0,
              fontFamily: SANS,
              fontSize: "15px",
              lineHeight: "1.75",
              color: colors.body,
              whiteSpace: "pre-wrap",
            }}
          >
            {message}
          </Text>
        </AccentBlock>
      </Section>

      {/* What happens next -------------------------------------------- */}
      <Section style={{ padding: "26px 4px 0" }}>
        <Text
          style={{
            margin: 0,
            fontFamily: SANS,
            fontSize: "15px",
            lineHeight: "1.75",
            color: colors.body,
          }}
        >
          If anything is time-sensitive, just reply to this email and it comes
          straight to me. In the meantime, feel free to explore my recent work.
        </Text>
      </Section>

      {/* CTA ---------------------------------------------------------- */}
      <Section style={{ padding: "24px 4px 0" }}>
        <Button
          href="https://rohittiwari.me/projects"
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
          View my work →
        </Button>
      </Section>

      {/* Sign-off ----------------------------------------------------- */}
      <Section style={{ padding: "28px 4px 0" }}>
        <Text
          style={{
            margin: 0,
            fontFamily: SANS,
            fontSize: "15px",
            lineHeight: "1.7",
            color: colors.body,
          }}
        >
          Talk soon,
          <br />
          <strong style={{ fontFamily: MONO, color: colors.ink }}>
            {PERSONAL_DATA.name}
          </strong>{" "}
          <span style={{ color: colors.muted, fontSize: "14px" }}>
            · {PERSONAL_DATA.headline}
          </span>
        </Text>
      </Section>
    </EmailShell>
  );
}

ContactAutoReply.PreviewProps = {
  name: "Ada Lovelace",
  subject: "Backend API for an EV charging dashboard",
  message:
    "Hi Rohit,\n\nI came across your work on OCPP-based charging systems and I'm building a fleet dashboard that needs a real-time backend. Would love to talk through scope and timelines.\n\nBest,\nAda",
} satisfies ContactAutoReplyProps;
