"use client";

import { IconBrandGithub } from "@tabler/icons-react";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Layers3,
  Link2,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { motion, type Variants } from "motion/react";
import Link from "next/link";
import { useState } from "react";
import EditorPanel from "@/components/EditorPanel";
import { Badge } from "@/components/ui/badge";
import { CornerPluses } from "@/components/ui/corner-plus";
import { PROJECTS } from "@/db/cv";
import { projectSlug } from "@/lib/portfolio";

type Project = {
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  image?: string;
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

const highlights = [
  {
    icon: Rocket,
    title: "Product surface",
    body: "A focused interface layer for the user-facing workflow.",
    color: "text-cyan-300",
  },
  {
    icon: Layers3,
    title: "Stack boundary",
    body: "Technologies grouped around UI, data, and deployment concerns.",
    color: "text-fuchsia-300",
  },
  {
    icon: ShieldCheck,
    title: "Maintainability",
    body: "Designed to be inspectable, typed, and practical to extend.",
    color: "text-emerald-300",
  },
];

const systemNotes = [
  "Design the interface around repeatable workflows and inspectable states.",
  "Keep the stack typed end-to-end so APIs, data models, and UI contracts stay aligned.",
  "Use deployment-friendly boundaries between frontend, backend, persistence, and integrations.",
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 font-mono text-xs text-cyan-200/75">
      <span className="h-px w-8 bg-cyan-300/60" />
      {children}
    </div>
  );
}

export default function ProjectDetailView({ project }: { project: Project }) {
  const [imageOk, setImageOk] = useState(true);
  const slug = projectSlug(project.title);

  const index = PROJECTS.findIndex((p) => projectSlug(p.title) === slug);
  const prev =
    index >= 0
      ? PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length]
      : undefined;
  const next = index >= 0 ? PROJECTS[(index + 1) % PROJECTS.length] : undefined;
  const hasNeighbors = PROJECTS.length > 1 && prev && next;

  return (
    <motion.div
      className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 pb-20 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Back link */}
      <motion.div variants={itemVariants} className="pt-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 font-mono text-xs text-zinc-400 transition hover:text-cyan-100"
        >
          <ArrowLeft size={14} />
          back to projects
        </Link>
      </motion.div>

      {/* Banner ------------------------------------------------------------- */}
      <motion.section variants={itemVariants}>
        <div className="relative overflow-hidden border border-white/10">
          <CornerPluses />
          <div className="relative aspect-[16/9] w-full sm:aspect-[16/6]">
            {/* accent base / fallback */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-fuchsia-500/20 to-emerald-500/30" />
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />
            {project.image && imageOk ? (
              // biome-ignore lint/performance/noImgElement: remote project banner with onError fallback; remote domains not configured for next/image
              <img
                src={project.image}
                alt={project.title}
                onError={() => setImageOk(false)}
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : null}
            {/* legibility overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />

            {/* Caption */}
            <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 sm:p-8">
              <Badge
                variant="outline"
                className="w-fit border-cyan-300/30 bg-black/40 font-mono text-cyan-100 backdrop-blur-md"
              >
                /projects/{slug}
              </Badge>
              <h1 className="text-4xl font-black uppercase leading-[0.95] text-white sm:text-6xl">
                {project.title}
                <span className="block animated-gradient-text">
                  build dossier
                </span>
              </h1>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="border border-white/15 bg-black/50 px-2.5 py-1 font-mono text-[10px] text-zinc-200 backdrop-blur-md"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Overview + meta ---------------------------------------------------- */}
      <motion.section
        variants={itemVariants}
        className="grid gap-6 lg:grid-cols-[1.5fr_0.5fr]"
      >
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <SectionLabel>overview</SectionLabel>
            <p className="max-w-2xl text-base leading-8 text-zinc-300">
              {project.description}
            </p>
          </div>

          <EditorPanel filename="implementation.notes" status="readonly">
            <div className="space-y-4">
              {systemNotes.map((note, i) => (
                <div
                  key={note}
                  className="grid grid-cols-[2rem_1fr] gap-3 text-sm leading-7 text-zinc-300"
                >
                  <span className="select-none text-right font-mono text-zinc-600">
                    {i + 1}
                  </span>
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </EditorPanel>
        </div>

        {/* Meta sidebar */}
        <aside className="flex h-fit flex-col gap-5 border border-white/10 bg-black/40 p-6 backdrop-blur-xl lg:sticky lg:top-24">
          <div className="space-y-2">
            <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
              status
            </span>
            <div className="flex items-center gap-2 font-mono text-sm text-emerald-200">
              <span className="size-2 rounded-full bg-emerald-400" />
              documented
            </div>
          </div>

          <div className="neon-divider" />

          <div className="space-y-3">
            <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
              stack
            </span>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge
                  key={tech}
                  variant="outline"
                  className="border-white/10 bg-white/[0.04] text-zinc-300"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="neon-divider" />

          <div className="space-y-2">
            <span className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">
              links
            </span>
            <div className="grid gap-2">
              {project.github ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-between gap-2 border border-white/10 bg-white/[0.04] px-3 py-2.5 font-mono text-xs text-zinc-200 transition hover:border-emerald-300/40 hover:text-emerald-100"
                >
                  <span className="inline-flex items-center gap-2">
                    <IconBrandGithub size={14} />
                    source
                  </span>
                  <ArrowRight size={13} />
                </a>
              ) : null}
              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-between gap-2 border border-cyan-300/30 bg-cyan-300/10 px-3 py-2.5 font-mono text-xs text-cyan-50 transition hover:bg-cyan-300/20"
                >
                  <span className="inline-flex items-center gap-2">
                    <ExternalLink size={14} />
                    live demo
                  </span>
                  <ArrowRight size={13} />
                </a>
              ) : null}
              {!project.github && !project.demo ? (
                <span className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.02] px-3 py-2.5 font-mono text-xs text-zinc-500">
                  <Link2 size={14} />
                  no public links
                </span>
              ) : null}
            </div>
          </div>
        </aside>
      </motion.section>

      {/* Highlights --------------------------------------------------------- */}
      <motion.section variants={itemVariants} className="space-y-4">
        <SectionLabel>design.principles</SectionLabel>
        <div className="grid gap-4 md:grid-cols-3">
          {highlights.map((h) => {
            const Icon = h.icon;
            return (
              <div
                key={h.title}
                className="border border-white/10 bg-black/40 p-6 backdrop-blur-xl transition hover:border-white/20"
              >
                <Icon size={22} className={h.color} />
                <h3 className="mt-3 text-lg font-semibold text-white">
                  {h.title}
                </h3>
                <p className="mt-1.5 text-sm leading-7 text-zinc-400">
                  {h.body}
                </p>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* Project navigation ------------------------------------------------- */}
      {hasNeighbors ? (
        <motion.section
          variants={itemVariants}
          className="grid gap-4 sm:grid-cols-2"
        >
          <Link
            href={`/projects/${projectSlug(prev.title)}`}
            className="group flex flex-col gap-2 border border-white/10 bg-black/40 p-5 backdrop-blur-xl transition hover:border-cyan-300/30 hover:bg-cyan-300/[0.04]"
          >
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
              <ArrowLeft
                size={13}
                className="transition group-hover:-translate-x-1"
              />
              previous
            </span>
            <span className="text-lg font-semibold text-white">
              {prev.title}
            </span>
          </Link>
          <Link
            href={`/projects/${projectSlug(next.title)}`}
            className="group flex flex-col items-end gap-2 border border-white/10 bg-black/40 p-5 text-right backdrop-blur-xl transition hover:border-fuchsia-300/30 hover:bg-fuchsia-300/[0.04]"
          >
            <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-zinc-500">
              next
              <ArrowRight
                size={13}
                className="transition group-hover:translate-x-1"
              />
            </span>
            <span className="text-lg font-semibold text-white">
              {next.title}
            </span>
          </Link>
        </motion.section>
      ) : null}

      {/* Contact CTA -------------------------------------------------------- */}
      <motion.section variants={itemVariants}>
        <div className="glass-surface flex flex-col items-start justify-between gap-6 p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold leading-tight text-white sm:text-3xl">
              Want to discuss a similar build?
            </h2>
            <p className="max-w-2xl text-sm leading-7 text-zinc-400">
              Use this project as a reference point and send the workflow,
              timeline, and constraints you care about most.
            </p>
          </div>
          <Link
            href="/contact"
            className="group inline-flex w-fit shrink-0 items-center gap-2 border border-fuchsia-300/40 bg-fuchsia-300/10 px-4 py-3 font-mono text-sm text-fuchsia-50 transition hover:bg-fuchsia-300/20"
          >
            open contact.env
            <ArrowRight
              size={16}
              className="transition group-hover:translate-x-1"
            />
          </Link>
        </div>
      </motion.section>
    </motion.div>
  );
}
