import { Button, Hr, Section, Text } from "@react-email/components";
import { PERSONAL_DATA } from "@/db/cv";
import { colors, EmailShell, SANS } from "./_shell";

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
  const firstName = name.split(" ")[0] || name;

  return (
    <EmailShell
      preview={`Thanks for reaching out, ${firstName} — I've received your message.`}
      eyebrow={PERSONAL_DATA.headline}
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
          Thanks for reaching out, {firstName}
        </Text>
        <Text
          style={{
            margin: "12px 0 0",
            fontFamily: SANS,
            fontSize: "15px",
            lineHeight: "1.75",
            color: colors.body,
          }}
        >
          Your message has reached my inbox, and I appreciate you taking the
          time to write. I read every enquiry personally and will get back to
          you within{" "}
          <strong style={{ color: colors.ink }}>1–2 business days</strong>.
        </Text>
      </Section>

      {/* Copy of their message ---------------------------------------- */}
      <Section style={{ padding: "22px 32px 4px" }}>
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
          A copy of your message
        </Text>
        <div
          style={{
            padding: "18px 20px",
            backgroundColor: colors.surface,
            border: `1px solid ${colors.border}`,
            borderLeft: `3px solid ${colors.brand}`,
            borderRadius: "12px",
          }}
        >
          {subject?.trim() ? (
            <Text
              style={{
                margin: "0 0 10px",
                fontFamily: SANS,
                fontSize: "14px",
                fontWeight: 700,
                color: colors.ink,
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
        </div>
      </Section>

      <Section style={{ padding: "20px 32px 4px" }}>
        <Text
          style={{
            margin: 0,
            fontFamily: SANS,
            fontSize: "15px",
            lineHeight: "1.75",
            color: colors.body,
          }}
        >
          While you wait, feel free to explore my recent work and case studies.
          If your enquiry is time-sensitive, just reply to this email and it
          will come straight to me.
        </Text>
      </Section>

      <Section style={{ padding: "22px 32px 4px" }}>
        <Button
          href="https://rohittiwari.me/projects"
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
          View my work
        </Button>
      </Section>

      <Hr
        style={{
          margin: "26px 32px 0",
          border: "none",
          borderTop: `1px solid ${colors.border}`,
        }}
      />

      <Section style={{ padding: "18px 32px 4px" }}>
        <Text
          style={{
            margin: 0,
            fontFamily: SANS,
            fontSize: "15px",
            lineHeight: "1.7",
            color: colors.body,
          }}
        >
          Warm regards,
          <br />
          <strong style={{ color: colors.ink }}>{PERSONAL_DATA.name}</strong>
          <br />
          <span style={{ color: colors.muted, fontSize: "14px" }}>
            {PERSONAL_DATA.headline}
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
