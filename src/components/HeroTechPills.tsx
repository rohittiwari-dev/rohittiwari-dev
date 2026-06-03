"use client";

import { motion } from "motion/react";

interface HeroTechPillsProps {
  tags: string[];
}

export default function HeroTechPills({ tags }: HeroTechPillsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, idx) => (
        <motion.span
          key={idx}
          className="px-3 py-1 rounded-sm border border-cyan-300/20 text-cyan-200 text-xs font-mono bg-cyan-950/20 hover:bg-cyan-300/10 hover:border-cyan-300/50 transition-all cursor-default"
          whileHover={{ y: -2 }}
        >
          {tag}
        </motion.span>
      ))}
    </div>
  );
}
