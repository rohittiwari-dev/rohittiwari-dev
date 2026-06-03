"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";

interface AnimatedNumberProps {
  value: number;
  className?: string;
}

export default function AnimatedNumber({ value, className = "" }: AnimatedNumberProps) {
  const [isInView, setIsInView] = useState(false);

  // We start at 0
  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
    mass: 1,
  });

  // When the component mounts, trigger the animation
  useEffect(() => {
    // A small delay to let the initial layout settle
    const timeout = setTimeout(() => {
      setIsInView(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, value, springValue]);

  // Transform the spring float value into an integer string
  const displayValue = useTransform(springValue, (current) =>
    Math.floor(current).toString()
  );

  return <motion.span className={className}>{displayValue}</motion.span>;
}
