"use client";

import { motion } from "motion/react";

export default function AuroraBackground() {
  return (
    <div
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <div className="absolute inset-0 bg-[#020305]" />

      <motion.div
        className="absolute inset-[-20%] opacity-55 blur-3xl"
        style={{
          background:
            "conic-gradient(from 120deg at 50% 50%, rgba(34,211,238,0.24), rgba(168,85,247,0.2), rgba(16,185,129,0.14), rgba(245,158,11,0.12), rgba(34,211,238,0.24))",
        }}
        animate={{ rotate: [0, 16, -10, 0], scale: [1, 1.04, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "linear-gradient(115deg, rgba(6,182,212,0.12), transparent 28%, rgba(236,72,153,0.1) 52%, transparent 72%, rgba(16,185,129,0.12))",
        }}
        animate={{ x: ["-4%", "4%", "-4%"], y: ["-2%", "2%", "-2%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className="absolute inset-0 opacity-[0.11]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.18) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 15%, black 80%, transparent)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.09]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 220 220' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.72' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.65'/%3E%3C/svg%3E\")",
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
