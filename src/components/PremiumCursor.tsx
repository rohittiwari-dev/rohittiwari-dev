"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export default function PremiumCursor() {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for the inner dot (exact position)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Motion values for the trailing ring (spring physics)
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 20, mass: 0.5 });
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 20, mass: 0.5 });

  useEffect(() => {
    // Detect touch devices
    const touch =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.matchMedia("(pointer: coarse)").matches;

    if (touch) {
      setEnabled(false);
      return;
    }
    
    setEnabled(true);
    document.body.classList.add("custom-cursor-active");

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Check if hovering over clickable elements
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button"
      ) {
        setIsHovered(true);
      }
    };

    const handleMouseOut = () => {
      setIsHovered(false);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <>
      {/* Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? 48 : 32,
          height: isHovered ? 48 : 32,
          border: isHovered ? "1px solid rgba(139, 92, 246, 0.8)" : "1px solid rgba(139, 92, 246, 0.4)",
          backgroundColor: isHovered ? "rgba(139, 92, 246, 0.15)" : "transparent",
          boxShadow: isHovered ? "0 0 25px rgba(139, 92, 246, 0.6)" : "0 0 15px rgba(139, 92, 246, 0.3)",
        }}
        animate={{
          scale: isHovered ? 1 : [1, 1.15, 1],
        }}
        transition={{
          type: "tween",
          duration: 0.15,
          scale: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      />
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[10000]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: isHovered ? 0 : 8,
          height: isHovered ? 0 : 8,
          backgroundColor: "rgb(99, 102, 241)", // Indigo-500
          boxShadow: "0 0 15px rgba(99, 102, 241, 0.9), 0 0 8px rgba(139, 92, 246, 0.8)",
        }}
        transition={{ type: "tween", duration: 0.1 }}
      />
    </>
  );
}
