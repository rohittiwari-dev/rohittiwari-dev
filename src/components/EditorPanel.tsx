"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface EditorPanelProps {
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  filename?: string;
  status?: string;
}

export default function EditorPanel({
  children,
  className,
  contentClassName,
  filename = "index.ts",
  status = "UTF-8  TSX  main",
}: EditorPanelProps) {
  return (
    <motion.div
      className={cn(
        "group/editor relative flex flex-col overflow-hidden rounded-none border border-white/10 bg-[#06070b]/72 font-mono shadow-2xl shadow-cyan-950/20 backdrop-blur-2xl",
        "before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(120deg,rgba(34,211,238,0.13),transparent_35%,rgba(236,72,153,0.1)_70%,transparent)] before:opacity-70",
        className,
      )}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <div className="relative z-10 flex h-10 items-center justify-between border-b border-white/10 bg-black/30 px-3">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-rose-400 shadow-[0_0_14px_rgba(251,113,133,0.75)]" />
          <span className="size-2.5 rounded-full bg-amber-300 shadow-[0_0_14px_rgba(252,211,77,0.65)]" />
          <span className="size-2.5 rounded-full bg-emerald-400 shadow-[0_0_14px_rgba(52,211,153,0.7)]" />
        </div>
        <div className="border-x border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] text-cyan-100/80">
          {filename}
        </div>
        <div className="flex w-16 items-center justify-end gap-1">
          <span className="h-1.5 w-4 bg-cyan-300/40" />
          <span className="h-1.5 w-2 bg-fuchsia-300/40" />
        </div>
      </div>

      <div className={cn("relative z-10 flex-1 p-5 sm:p-6", contentClassName)}>
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative z-10">{children}</div>
      </div>

      <div className="relative z-10 flex items-center justify-between border-t border-white/10 bg-cyan-400/10 px-3 py-2 text-[10px] text-cyan-100/70">
        <span>{status}</span>
        <span className="text-emerald-300">connected</span>
      </div>
    </motion.div>
  );
}
