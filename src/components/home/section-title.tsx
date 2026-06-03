import { motion, type Variants } from "motion/react";
import React from "react";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function SectionTitle({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <motion.div variants={itemVariants} className="flex flex-col gap-3">
      <div className="flex items-center gap-3 font-mono text-xs text-cyan-200/75">
        <span className="h-px w-8 bg-cyan-300/60" />
        <span>{kicker}</span>
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-3xl text-3xl font-semibold leading-tight text-zinc-50 sm:text-4xl">
          {title}
        </h2>
        {children ? (
          <div className="text-sm text-zinc-400">{children}</div>
        ) : null}
      </div>
    </motion.div>
  );
}
