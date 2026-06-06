"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Thin gradient progress bar pinned to the top of the viewport that tracks
 * how far the page has been scrolled. Scroll-linked (not auto-playing), so it
 * stays comfortable for reduced-motion users.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-emerald-400 shadow-[0_0_12px_rgba(34,211,238,0.5)]"
    />
  );
}
