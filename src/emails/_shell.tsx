import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import { PERSONAL_DATA } from "@/db/cv";

// Clean, airy, colourful brand system that mirrors rohittiwari.me — a deep
// blue-black canvas, a cyan→magenta neon accent, and monospace wordmarks. No
// cards, no borders around content, no heavy shadows: colour and whitespace do
// the work. Every value is inline + email-safe; gradients fall back to a solid
// cyan in clients (Outlook) that don't render them.
export const colors = {
  page: "#05090f",
  ink: "#eef3fa",
  body: "#aab6c8",
  muted: "#7d8a9e",
  faint: "#5d6a7e",
  border: "#18222f",
  brand: "#22d3ee", // cyan-400 — primary accent
  brandText: "#67e8f9", // cyan-300 — links on dark
  brandDeep: "#0e7490", // cyan-700
  accent: "#f0abfc", // neon magenta — gradient 2nd stop
  onBrand: "#04080e", // text on the cyan/magenta button
};

// Fira Code (the site's typeface) first, then a robust system-monospace stack
// for the many clients that strip web fonts. Sans is reserved for prose so long
// paragraphs stay easy to read everywhere.
export const MONO =
  '"Fira Code", "SFMono-Regular", ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", "Roboto Mono", monospace';
export const SANS =
  '"Segoe UI", Roboto, Helvetica, Arial, system-ui, -apple-system, BlinkMacSystemFont, sans-serif';

const GRADIENT =
  "linear-gradient(135deg, #22d3ee 0%, #818cf8 50%, #f0abfc 100%)";

const footerLinks = [
  PERSONAL_DATA.linkedin && { label: "linkedin", href: PERSONAL_DATA.linkedin },
  PERSONAL_DATA.github && { label: "github", href: PERSONAL_DATA.github },
  PERSONAL_DATA.twitter && { label: "x", href: PERSONAL_DATA.twitter },
  PERSONAL_DATA.email && {
    label: "email",
    href: `mailto:${PERSONAL_DATA.email}`,
  },
].filter(Boolean) as { label: string; href: string }[];

/**
 * A borderless block with a slim cyan→magenta gradient rail on the left.
 * Replaces heavy "cards" — it groups content with colour, not a box.
 */
export function AccentBlock({ children }: { children: React.ReactNode }) {
  return (
    <Row>
      <Column
        width={3}
        style={{
          width: "3px",
          fontSize: "1px",
          lineHeight: "1px",
          backgroundColor: colors.brand,
          backgroundImage: "linear-gradient(180deg, #22d3ee, #f0abfc)",
          borderRadius: "3px",
        }}
      >
        &nbsp;
      </Column>
      <Column style={{ paddingLeft: "18px", verticalAlign: "top" }}>
        {children}
      </Column>
    </Row>
  );
}

/** Small uppercase mono label in cyan — a clean, colourful section marker. */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <Text
      style={{
        margin: "0 0 10px",
        fontFamily: MONO,
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: colors.brandText,
      }}
    >
      {children}
    </Text>
  );
}

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
      <Head>
        <meta name="color-scheme" content="dark" />
        <meta name="supported-color-schemes" content="dark" />
      </Head>
      <Preview>{preview}</Preview>
      <Body
        style={{
          margin: 0,
          padding: "40px 16px",
          backgroundColor: colors.page,
          fontFamily: SANS,
        }}
      >
        <Container
          style={{
            width: "100%",
            maxWidth: "552px",
            margin: "0 auto",
            backgroundColor: colors.page,
          }}
        >
          {/* Colourful top accent ---------------------------------------- */}
          <Section style={{ padding: 0 }}>
            <Row>
              <Column
                style={{
                  height: "4px",
                  fontSize: "4px",
                  lineHeight: "4px",
                  backgroundColor: colors.brand,
                  backgroundImage: GRADIENT,
                  borderRadius: "4px",
                }}
              >
                &nbsp;
              </Column>
            </Row>
          </Section>

          {/* Brand header ------------------------------------------------- */}
          <Section style={{ padding: "26px 4px 14px" }}>
            <Row>
              <Column style={{ width: "54px", verticalAlign: "middle" }}>
                <table cellPadding={0} cellSpacing={0} role="presentation">
                  <tbody>
                    <tr>
                      <td
                        style={{
                          width: "44px",
                          height: "44px",
                          textAlign: "center",
                          verticalAlign: "middle",
                          backgroundColor: colors.brand,
                          backgroundImage: GRADIENT,
                          borderRadius: "12px",
                          color: colors.onBrand,
                          fontFamily: MONO,
                          fontSize: "16px",
                          fontWeight: 700,
                          letterSpacing: "0.04em",
                        }}
                      >
                        {PERSONAL_DATA.initials}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Column>
              <Column style={{ verticalAlign: "middle", paddingLeft: "14px" }}>
                <Text
                  style={{
                    margin: 0,
                    fontFamily: MONO,
                    color: colors.ink,
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
                    fontFamily: MONO,
                    color: colors.brandText,
                    fontSize: "11px",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
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
          <Section style={{ padding: "30px 4px 6px" }}>
            <Hr
              style={{
                width: "100%",
                border: "none",
                borderTop: `1px solid ${colors.border}`,
                margin: "0 0 20px",
              }}
            />
            <Text
              style={{
                margin: "0 0 8px",
                fontFamily: MONO,
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
                      color: colors.brandText,
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
                fontFamily: MONO,
                fontSize: "12px",
                color: colors.faint,
                lineHeight: "1.7",
              }}
            >
              {PERSONAL_DATA.location} · © {new Date().getFullYear()}{" "}
              {PERSONAL_DATA.name}
              <br />
              Sent from{" "}
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
