import {
  Body,
  Column,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { PERSONAL_DATA } from "@/db/cv";

// A clean, professional brand system for transactional email. Light surface,
// one confident accent, generous spacing — designed to look at home next to a
// bank or SaaS receipt, not a terminal. Every value is inline + email-safe.
export const colors = {
  page: "#eef0f4",
  card: "#ffffff",
  surface: "#f7f8fa",
  border: "#e6e8ee",
  ink: "#15161a",
  body: "#3d3f47",
  muted: "#71747e",
  faint: "#9a9da6",
  brand: "#4f46e5",
  brandDark: "#4338ca",
  onBrand: "#ffffff",
  brandSoft: "#eef0ff",
};

export const SANS =
  '"Segoe UI", Roboto, Helvetica, Arial, system-ui, -apple-system, BlinkMacSystemFont, sans-serif';

const footerLinks = [
  PERSONAL_DATA.linkedin && { label: "LinkedIn", href: PERSONAL_DATA.linkedin },
  PERSONAL_DATA.github && { label: "GitHub", href: PERSONAL_DATA.github },
  PERSONAL_DATA.twitter && { label: "X", href: PERSONAL_DATA.twitter },
  PERSONAL_DATA.email && {
    label: "Email",
    href: `mailto:${PERSONAL_DATA.email}`,
  },
].filter(Boolean) as { label: string; href: string }[];

export function EmailShell({
  preview,
  eyebrow,
  children,
}: {
  preview: string;
  /** Small label shown under the name, e.g. "New enquiry" or the headline. */
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <Html lang="en">
      <Head />
      <Preview>{preview}</Preview>
      <Body
        style={{
          margin: 0,
          padding: "32px 12px",
          backgroundColor: colors.page,
          fontFamily: SANS,
        }}
      >
        <Container
          style={{
            width: "100%",
            maxWidth: "584px",
            margin: "0 auto",
            backgroundColor: colors.card,
            border: `1px solid ${colors.border}`,
            borderRadius: "16px",
            overflow: "hidden",
            boxShadow: "0 1px 2px rgba(16,18,40,0.04)",
          }}
        >
          {/* Brand header ------------------------------------------------- */}
          <Section
            style={{
              padding: "26px 32px",
              backgroundColor: colors.brand,
              backgroundImage:
                "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
            }}
          >
            <Row>
              <Column style={{ width: "52px", verticalAlign: "middle" }}>
                <table cellPadding={0} cellSpacing={0} role="presentation">
                  <tr>
                    <td
                      style={{
                        width: "44px",
                        height: "44px",
                        textAlign: "center",
                        verticalAlign: "middle",
                        backgroundColor: "rgba(255,255,255,0.16)",
                        border: "1px solid rgba(255,255,255,0.28)",
                        borderRadius: "11px",
                        color: colors.onBrand,
                        fontSize: "16px",
                        fontWeight: 700,
                        letterSpacing: "0.04em",
                      }}
                    >
                      {PERSONAL_DATA.initials}
                    </td>
                  </tr>
                </table>
              </Column>
              <Column style={{ verticalAlign: "middle", paddingLeft: "14px" }}>
                <Text
                  style={{
                    margin: 0,
                    color: colors.onBrand,
                    fontSize: "17px",
                    fontWeight: 700,
                    lineHeight: "1.25",
                  }}
                >
                  {PERSONAL_DATA.name}
                </Text>
                <Text
                  style={{
                    margin: "2px 0 0",
                    color: "rgba(255,255,255,0.82)",
                    fontSize: "13px",
                    lineHeight: "1.4",
                  }}
                >
                  {eyebrow}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* Body --------------------------------------------------------- */}
          {children}

          {/* Footer ------------------------------------------------------- */}
          <Section
            style={{
              padding: "22px 32px 26px",
              backgroundColor: colors.surface,
              borderTop: `1px solid ${colors.border}`,
            }}
          >
            <Text
              style={{
                margin: "0 0 8px",
                fontSize: "13px",
                color: colors.muted,
              }}
            >
              {footerLinks.map((link, i) => (
                <span key={link.label}>
                  {i > 0 ? (
                    <span style={{ color: colors.faint }}>{"  ·  "}</span>
                  ) : null}
                  <Link
                    href={link.href}
                    style={{
                      color: colors.brandDark,
                      textDecoration: "none",
                      fontWeight: 600,
                    }}
                  >
                    {link.label}
                  </Link>
                </span>
              ))}
            </Text>
            <Text
              style={{
                margin: 0,
                fontSize: "12px",
                color: colors.faint,
                lineHeight: "1.6",
              }}
            >
              {PERSONAL_DATA.location}
              <br />© {new Date().getFullYear()} {PERSONAL_DATA.name}. Sent from{" "}
              <Link
                href="https://rohittiwari.me"
                style={{ color: colors.muted, textDecoration: "underline" }}
              >
                rohittiwari.me
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
