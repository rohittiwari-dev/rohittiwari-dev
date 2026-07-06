"use client";

import { IconBrandGithub } from "@tabler/icons-react";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { motion, type Variants } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { CornerPluses } from "@/components/ui/corner-plus";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { projectSlug } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

export type Project = {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  image?: string;
};

const accents = [
  { grad: "from-cyan-500 via-sky-400 to-emerald-500", text: "text-cyan-300" },
  {
    grad: "from-fuchsia-500 via-purple-400 to-cyan-500",
    text: "text-fuchsia-300",
  },
  {
    grad: "from-emerald-500 via-teal-400 to-cyan-400",
    text: "text-emerald-300",
  },
  {
    grad: "from-amber-400 via-orange-400 to-fuchsia-500",
    text: "text-amber-300",
  },
];

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

interface ProjectCardProps {
  project: Project;
  index?: number;
  /** Layout: stacked media-on-top, or side-by-side media-on-left. */
  orientation?: "vertical" | "horizontal";
  /** Max tech chips before collapsing into a "+N" pill. */
  maxTech?: number;
  className?: string;
}

export function ProjectCard({
  project,
  index = 0,
  orientation = "vertical",
  maxTech = 6,
  className,
}: ProjectCardProps) {
  const [imageOk, setImageOk] = useState(true);
  const accent = accents[index % accents.length];
  const isHorizontal = orientation === "horizontal";
  const numeral = String(index + 1).padStart(2, "0");

  const shownTech = project.technologies.slice(0, maxTech);
  const overflowTech = project.technologies.length - shownTech.length;

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className={cn(
        "group relative flex h-full cursor-pointer overflow-visible rounded-none border border-white/10 bg-black/40 backdrop-blur-2xl transition-colors duration-500 hover:border-white/25",
        isHorizontal
          ? "min-h-[220px] flex-col sm:flex-row"
          : "min-h-[380px] flex-col",
        className,
      )}
    >
      {/* Full-card clickable overlay */}
      <Link
        href={`/projects/${projectSlug(project.title)}`}
        className="absolute inset-0 z-20"
        aria-label={`View ${project.title} project`}
      />
      <CornerPluses />
      <GlowingEffect
        disabled={false}
        proximity={120}
        spread={30}
        borderWidth={1}
      />

      {/* Ambient accent that wakes on hover */}
      <div className="pointer-events-none absolute -inset-px opacity-0 blur-2xl transition duration-500 group-hover:opacity-20">
        <div className={cn("h-full w-full bg-gradient-to-br", accent.grad)} />
      </div>

      {/* Media: dynamic gradient + numeral + optional remote image -------------- */}
      <div
        className={cn(
          "relative z-10 flex shrink-0 items-center justify-center overflow-hidden",
          isHorizontal
            ? "min-h-[150px] w-full border-b border-white/10 sm:min-h-0 sm:w-52 sm:border-b-0 sm:border-r md:w-60"
            : "h-40 w-full border-b border-white/10",
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-30",
            accent.grad,
          )}
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.18] mix-blend-overlay" />

        {project.image && imageOk ? (
          // biome-ignore lint/performance/noImgElement: optional remote thumbnail with onError fallback; remote domains not configured for next/image
          <img
            src={project.image}
            alt=""
            onError={() => setImageOk(false)}
            className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-luminosity transition duration-700 group-hover:scale-105 group-hover:opacity-45"
          />
        ) : null}

        {/* Numeral watermark, painted with the dynamic gradient */}
        <span
          className={cn(
            "relative z-10 select-none bg-gradient-to-br bg-clip-text font-black leading-none text-transparent drop-shadow-[0_2px_18px_rgba(0,0,0,0.5)]",
            accent.grad,
            isHorizontal ? "[font-size:5.5rem]" : "[font-size:5rem]",
          )}
        >
          {numeral}
        </span>

        <div className="absolute bottom-3 left-4 z-10">
          <Badge className="border-white/20 bg-black/50 font-mono text-[10px] tracking-wider text-white backdrop-blur-md">
            {`${numeral} // CASE STUDY`}
          </Badge>
        </div>
      </div>

      {/* Content --------------------------------------------------------------- */}
      <div className="relative z-10 flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 group-hover:bg-clip-text group-hover:text-transparent sm:text-2xl">
            {project.title}
          </h3>
          <div className="relative z-30 flex shrink-0 gap-2">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="flex size-8 items-center justify-center border border-white/10 bg-white/[0.03] text-zinc-300 transition hover:border-white/30 hover:bg-white hover:text-black"
              >
                <IconBrandGithub size={15} />
              </a>
            ) : null}
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} live demo`}
                className="flex size-8 items-center justify-center border border-white/10 bg-white/[0.03] text-zinc-300 transition hover:border-white/30 hover:bg-white hover:text-black"
              >
                <ExternalLink size={15} />
              </a>
            ) : null}
          </div>
        </div>

        <p
          className={cn(
            "mt-3 text-sm leading-relaxed text-zinc-400",
            isHorizontal ? "line-clamp-2 sm:line-clamp-3" : "line-clamp-3",
          )}
        >
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {shownTech.map((tech) => (
            <span
              key={tech}
              className="border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px] text-zinc-300 transition-colors group-hover:border-white/20"
            >
              {tech}
            </span>
          ))}
          {overflowTech > 0 ? (
            <span
              className={cn(
                "border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10px]",
                accent.text,
              )}
            >
              +{overflowTech}
            </span>
          ) : null}
        </div>

        <div className="mt-auto pt-6">
          <div className="inline-flex w-full items-center justify-between border-t border-white/10 pt-4 font-mono text-xs uppercase tracking-wider text-zinc-400 transition-colors group-hover:text-white">
            <span>Inspect project</span>
            <span className="flex size-8 items-center justify-center border border-white/10 transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/10">
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:rotate-45"
              />
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default ProjectCard;
