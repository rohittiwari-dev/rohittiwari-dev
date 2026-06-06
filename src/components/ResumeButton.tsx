"use client";

import { Download } from "lucide-react";
import { CornerPluses } from "@/components/ui/corner-plus";
import { PERSONAL_DATA } from "@/db/cv";
import { cn } from "@/lib/utils";

interface ResumeButtonProps {
  className?: string;
  label?: string;
  /** "solid" = emerald accent (default), "ghost" = neutral secondary. */
  variant?: "solid" | "ghost";
}

const variantClasses: Record<
  NonNullable<ResumeButtonProps["variant"]>,
  string
> = {
  solid:
    "border-emerald-300/50 bg-emerald-300/10 text-emerald-50 shadow-[0_0_24px_rgba(52,211,153,0.18)] hover:bg-emerald-300/20",
  ghost:
    "border-white/15 bg-white/[0.03] text-zinc-200 hover:border-white/30 hover:bg-white/[0.06]",
};

/**
 * Download-résumé link. Renders nothing when `PERSONAL_DATA.resume` is empty,
 * so it self-hides until a resume path is configured.
 */
export default function ResumeButton({
  className,
  label = "download résumé",
  variant = "solid",
}: ResumeButtonProps) {
  const resume = (PERSONAL_DATA as { resume?: string }).resume;
  if (!resume?.trim()) return null;

  return (
    <a
      href={resume}
      download={`${PERSONAL_DATA.name.replace(/\s+/g, "-")}-Resume.pdf`}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 border px-5 py-3 font-mono text-sm transition",
        variantClasses[variant],
        className,
      )}
    >
      <CornerPluses />
      <Download
        size={16}
        className="transition-transform group-hover:translate-y-0.5"
      />
      {label}
    </a>
  );
}
