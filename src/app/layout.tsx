import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import PremiumCursor from "../components/PremiumCursor";
import { PERSONAL_DATA } from "../db/cv";
import "./globals.css";
import { Footer } from "../components/ui/footer";
import { Header } from "../components/ui/header";
import { ParticleNetwork } from "../components/ui/particle-network";

const geistSans = Fira_Code({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Fira_Code({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${PERSONAL_DATA.name} | Portfolio`,
  description: `${PERSONAL_DATA.headline} - ${PERSONAL_DATA.bio}`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-black text-zinc-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-100 relative">
        <PremiumCursor />

        {/* Core Sci-Fi Particle Network Background Layer */}
        <ParticleNetwork />

        {/* Boxy IDE header extracted to component */}
        <Header />

        {/* Main content area */}
        <main className="flex-1 flex flex-col w-full py-12 relative z-10 overflow-hidden">
          {children}
        </main>

        {/* Watermark initials background */}
        <div className="fixed -bottom-10 -right-10 pointer-events-none select-none -z-10 animate-float opacity-[0.03] dark:opacity-[0.015] leading-none">
          <span className="text-[28vw] font-extrabold bg-gradient-to-br from-cyan-200 via-fuchsia-200 to-zinc-950 bg-clip-text text-transparent">
            {PERSONAL_DATA.initials}
          </span>
        </div>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
