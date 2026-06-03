"use client";

import { Atom, Pause, Play } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// How long each orbital stays active before auto-advancing.
const AUTO_ROTATE_MS = 5000;

type SkillGroup = { category: string; skills: string[] };

interface SkillsNucleusProps {
  groups: SkillGroup[];
}

// Visual config per orbital ring (inner -> outer).
const rings = [
  { radius: 0.22, duration: 24, reverse: false, color: "cyan", weight: 2 },
  { radius: 0.34, duration: 30, reverse: true, color: "fuchsia", weight: 3 },
  { radius: 0.46, duration: 20, reverse: false, color: "emerald", weight: 4 },
];

const chipColor: Record<string, string> = {
  cyan: "border-cyan-300/40 bg-cyan-400/10 text-cyan-100 shadow-[0_0_18px_rgba(34,211,238,0.25)]",
  fuchsia:
    "border-fuchsia-300/40 bg-fuchsia-400/10 text-fuchsia-100 shadow-[0_0_18px_rgba(236,72,153,0.25)]",
  emerald:
    "border-emerald-300/40 bg-emerald-400/10 text-emerald-100 shadow-[0_0_18px_rgba(52,211,153,0.25)]",
};

const ringBorder: Record<string, string> = {
  cyan: "border-cyan-300/15",
  fuchsia: "border-fuchsia-300/12",
  emerald: "border-emerald-300/10",
};

// Balance skills across rings, weighting outer rings (more circumference).
function distribute(skills: string[]) {
  const buckets: string[][] = [[], [], []];
  for (const skill of skills) {
    let best = 0;
    for (let k = 1; k < rings.length; k++) {
      if (
        buckets[k].length / rings[k].weight <
        buckets[best].length / rings[best].weight
      ) {
        best = k;
      }
    }
    buckets[best].push(skill);
  }
  return buckets;
}

export default function SkillsNucleus({ groups }: SkillsNucleusProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const group = groups[active];
  const buckets = distribute(group.skills);

  // Auto-advance through the orbitals; resets whenever `active` changes
  // (manual click) and halts while paused / hovered.
  // biome-ignore lint/correctness/useExhaustiveDependencies: `active` re-arms the timer after each rotation so it keeps cycling
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => {
      setActive((current) => (current + 1) % groups.length);
    }, AUTO_ROTATE_MS);
    return () => clearTimeout(id);
  }, [active, paused, groups.length]);

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: hover-to-pause is a progressive enhancement; the explicit, keyboard-accessible pause button offers the same control
    <div
      className="grid items-center gap-8 lg:grid-cols-[1fr_0.8fr]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Atom -------------------------------------------------------------- */}
      <div className="relative mx-auto aspect-square w-full max-w-[460px]">
        {/* Decorative tilted orbital ellipses */}
        {[0, 60, 120].map((deg) => (
          <div
            key={deg}
            className="pointer-events-none absolute inset-[8%] rounded-full border border-white/[0.06]"
            style={{ transform: `rotate(${deg}deg) scaleY(0.4)` }}
          />
        ))}

        {/* Functional orbit rings carrying electrons */}
        {rings.map((ring) => (
          <div
            key={ring.color}
            className={cn(
              "pointer-events-none absolute rounded-full border",
              ringBorder[ring.color],
            )}
            style={{
              inset: `${(0.5 - ring.radius) * 100}%`,
            }}
          />
        ))}

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {rings.map((ring, rIndex) => {
              const electrons = buckets[rIndex];
              return (
                <motion.div
                  key={ring.color}
                  className="absolute inset-0"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    delay: rIndex * 0.12,
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {/* Spinning layer */}
                  <div
                    className="absolute inset-0"
                    style={{
                      animation: `nucleus-orbit ${ring.duration}s linear infinite`,
                      animationDirection: ring.reverse ? "reverse" : "normal",
                    }}
                  >
                    {electrons.map((skill, i) => {
                      const angle = (i / electrons.length) * Math.PI * 2;
                      const left = 50 + ring.radius * Math.cos(angle) * 100;
                      const top = 50 + ring.radius * Math.sin(angle) * 100;
                      return (
                        <div
                          key={skill}
                          className="absolute"
                          style={{
                            left: `${left}%`,
                            top: `${top}%`,
                            transform: "translate(-50%, -50%)",
                          }}
                        >
                          {/* Counter-spin keeps the chip upright */}
                          <div
                            style={{
                              animation: `nucleus-orbit ${ring.duration}s linear infinite`,
                              animationDirection: ring.reverse
                                ? "normal"
                                : "reverse",
                            }}
                          >
                            <span
                              className={cn(
                                "block whitespace-nowrap border px-2 py-1 font-mono text-[10px] backdrop-blur-sm",
                                chipColor[ring.color],
                              )}
                            >
                              {skill}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Nucleus core */}
        <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
          <div
            className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-cyan-400/40 via-fuchsia-400/30 to-emerald-400/40 blur-xl"
            style={{ animation: "nucleus-pulse 3.5s ease-in-out infinite" }}
          />
          <div className="flex size-24 flex-col items-center justify-center gap-1 rounded-full border border-white/15 bg-black/70 text-center backdrop-blur-md">
            <Atom size={22} className="text-cyan-200" />
            <span className="font-mono text-lg font-bold leading-none text-white">
              {group.skills.length}
            </span>
            <span className="px-1 font-mono text-[8px] uppercase leading-tight tracking-wider text-zinc-500">
              skills
            </span>
          </div>
        </div>
      </div>

      {/* Controls ---------------------------------------------------------- */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 font-mono text-xs text-cyan-200/75">
            <span className="h-px w-8 bg-cyan-300/60" />
            select.orbital
          </div>
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="flex items-center gap-1.5 border border-white/10 bg-white/[0.03] px-2 py-1 font-mono text-[10px] text-zinc-400 transition-colors hover:text-zinc-200"
            aria-label={paused ? "Resume auto-rotate" : "Pause auto-rotate"}
          >
            {paused ? <Play size={11} /> : <Pause size={11} />}
            {paused ? "paused" : "auto"}
          </button>
        </div>

        <p className="font-mono text-[11px] leading-5 text-zinc-500">
          Click an orbital to spin up its skills — the nucleus auto-rotates
          every 5s and pauses while you hover.
        </p>

        <h3 className="text-xl font-semibold text-white sm:text-2xl">
          {group.category}
        </h3>

        {/* Auto-rotate progress */}
        <div className="h-0.5 w-full overflow-hidden bg-white/5">
          <div
            key={active}
            className="h-full origin-left bg-gradient-to-r from-cyan-400 to-emerald-400"
            style={{
              animation: `nucleus-progress ${AUTO_ROTATE_MS}ms linear forwards`,
              animationPlayState: paused ? "paused" : "running",
            }}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {groups.map((g, i) => (
            <button
              key={g.category}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "border px-3 py-2 text-left font-mono text-xs transition-all",
                i === active
                  ? "border-cyan-300/50 bg-cyan-400/10 text-cyan-100"
                  : "border-white/10 bg-white/[0.03] text-zinc-400 hover:border-white/25 hover:text-zinc-200",
              )}
            >
              {g.category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
