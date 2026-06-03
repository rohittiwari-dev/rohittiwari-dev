"use client";

import {
  ArrowRight,
  Braces,
  Cloud,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Layers3,
  Mail,
  MapPin,
  ServerCog,
  Sparkles,
  Terminal,
  Workflow,
  Zap,
} from "lucide-react";
import { motion, type Variants } from "motion/react";
import Link from "next/link";
import HeroTechPills from "@/components/HeroTechPills";
import { SectionTitle } from "@/components/home/section-title";
import MagneticElement from "@/components/MagneticElement";
import { ProjectCard } from "@/components/project-card";
import RotatingTypewriter from "@/components/RotatingTypewriter";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CornerPluses } from "@/components/ui/corner-plus";
import { IconCloud } from "@/components/ui/icon-cloud";
import { focusAreas, PERSONAL_DATA, PROJECTS } from "@/db/cv";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const lucideIcons: Record<string, React.ElementType> = {
  ServerCog,
  Code2,
  Database,
  Cloud,
  Workflow,
  Layers3,
  Cpu,
  Zap,
  Braces,
  Terminal,
  GitBranch,
  Sparkles,
};

const heroPills = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "NestJS",
  "PostgreSQL",
  "Redis",
  "Docker",
  "AWS",
];

const heroStackIcons = [
  "https://cdn.simpleicons.org/react/22d3ee",
  "https://cdn.simpleicons.org/nextdotjs/ffffff",
  "https://cdn.simpleicons.org/nodedotjs/22c55e",
  "https://cdn.simpleicons.org/nestjs/e0234e",
  "https://cdn.simpleicons.org/express/ffffff",
  "https://cdn.simpleicons.org/postgresql/4169e1",
  "https://cdn.simpleicons.org/mysql/4479a1",
  "https://cdn.simpleicons.org/mongodb/47a248",
  "https://cdn.simpleicons.org/redis/dc382d",
  "https://cdn.simpleicons.org/docker/2496ed",
  "https://cdn.simpleicons.org/amazonwebservices/ffffff",
  "https://cdn.simpleicons.org/nginx/009639",
  "https://cdn.simpleicons.org/caddy/00add8",
  "https://cdn.simpleicons.org/traefik/24a1c1",
  "https://cdn.simpleicons.org/graphql/e10098",
  "https://cdn.simpleicons.org/webrtc/ffffff",
  "https://cdn.simpleicons.org/reactquery/ff4154",
  "https://cdn.simpleicons.org/trpc/2596be",
  "https://cdn.simpleicons.org/openai/ffffff",
  "https://cdn.simpleicons.org/tailwindcss/06b6d4",
  "https://cdn.simpleicons.org/github/22c55e",
  "https://cdn.simpleicons.org/gitlab/6366f1",
  "https://cdn.simpleicons.org/figma/rose",
  "https://cdn.simpleicons.org/javascript/green",
];

export default function Home() {
  return (
    <motion.div
      className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-4 pb-24 sm:px-8 lg:px-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Hero --------------------------------------------------------------- */}
      <section className="relative z-10 grid w-full items-center gap-10 pt-2 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <motion.div variants={itemVariants} className="flex flex-col gap-6">
          <div className="glass-surface flex w-fit items-center gap-3 rounded-full px-4 py-2 font-mono text-xs text-emerald-200">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300 opacity-70" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-300" />
            </span>
            available-for-new-builds
            <span className="text-zinc-600">·</span>
            <span className="inline-flex items-center gap-1 text-zinc-400">
              <MapPin size={12} />
              {PERSONAL_DATA.location}
            </span>
          </div>

          <div className="space-y-3">
            <p className="font-mono text-sm text-cyan-200/80">
              {"// "}
              {PERSONAL_DATA.headline}
            </p>
            <h1 className="text-5xl font-black uppercase leading-[0.92] text-zinc-50 sm:text-7xl lg:text-8xl">
              {PERSONAL_DATA.name.split(" ")[0]}
              <span className="block animated-gradient-text">
                {PERSONAL_DATA.name.split(" ").slice(1).join(" ")}
              </span>
            </h1>
          </div>

          <div className="flex min-h-9 items-center font-mono text-lg text-zinc-200 sm:text-2xl">
            <span className="mr-3 text-emerald-300">&gt;</span>
            <RotatingTypewriter
              words={PERSONAL_DATA.typewriter}
              className="font-semibold text-zinc-100"
            />
          </div>

          <p className="max-w-xl border-l-2 border-cyan-300/40 pl-5 text-base leading-8 text-zinc-300">
            {PERSONAL_DATA.bio} I turn product ideas into fast, typed, and
            deployable web systems with a backend-first sense for reliability.
          </p>

          <HeroTechPills tags={heroPills} />

          <div className="flex flex-col gap-3 pt-1 sm:flex-row">
            <MagneticElement strength={14}>
              <Link
                href="/projects"
                className="group relative inline-flex items-center justify-center gap-2 border border-cyan-300/50 bg-cyan-300/12 px-5 py-3 font-mono text-sm text-cyan-50 shadow-[0_0_28px_rgba(34,211,238,0.25)] transition hover:bg-cyan-300/20"
              >
                <CornerPluses />
                <Zap size={16} />
                launch projects
                <ArrowRight
                  size={16}
                  className="transition group-hover:translate-x-1"
                />
              </Link>
            </MagneticElement>
            <MagneticElement strength={10}>
              <Link
                href="/contact"
                className="group relative inline-flex items-center justify-center gap-2 border border-white/10 bg-white/[0.04] px-5 py-3 font-mono text-sm text-zinc-100 transition hover:border-fuchsia-300/50 hover:bg-fuchsia-300/10"
              >
                <CornerPluses />
                <Mail size={16} />
                open contact.env
              </Link>
            </MagneticElement>
          </div>
        </motion.div>

        {/* Open, floating stack orbit */}
        <motion.div
          variants={itemVariants}
          className="relative flex min-h-[420px] w-full items-center justify-center sm:min-h-[500px]"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/10 via-fuchsia-400/10 to-emerald-400/10 blur-3xl" />
          <div className="scale-125 md:scale-[1.55]">
            <IconCloud images={heroStackIcons} />
          </div>
        </motion.div>
      </section>

      {/* Focus areas -------------------------------------------------------- */}
      <motion.section variants={itemVariants} className="flex flex-col gap-8">
        <SectionTitle
          kicker="focus // what-i-build"
          title="Where I do my best work"
        >
          Three lanes I keep sharp across every build.
        </SectionTitle>
        <div className="grid gap-4 md:grid-cols-3">
          {focusAreas.map((area) => {
            const Icon = lucideIcons[area.icon] ?? Sparkles;
            return (
              <Card
                key={area.title}
                className="border-white/10 bg-black/40 text-zinc-100 backdrop-blur-xl"
              >
                <CardHeader>
                  <div className="mb-2 grid size-10 place-items-center border border-white/10 bg-white/[0.04] text-cyan-200">
                    <Icon size={18} />
                  </div>
                  <CardTitle className="text-lg text-white">
                    {area.title}
                  </CardTitle>
                  <CardDescription className="leading-7 text-zinc-400">
                    {area.body}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </motion.section>

      {/* Capability / stack grid -------------------------------------------- */}
      <motion.section variants={itemVariants} className="flex flex-col gap-8">
        <SectionTitle
          kicker="stack // capabilities"
          title="The toolkit I reach for"
        >
          A backend-first stack, end to end.
        </SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {PERSONAL_DATA.stackStats.map((stat) => {
            const Icon = lucideIcons[stat.icon] ?? Sparkles;
            return (
              <div
                key={`${stat.label}-${stat.value}`}
                className="group flex items-start gap-3 border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div
                  className={`grid size-9 shrink-0 place-items-center border border-white/10 bg-black/40 ${stat.tone}`}
                >
                  <Icon size={16} />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-500">
                    {stat.label}
                  </span>
                  <span className="text-sm text-zinc-200">{stat.value}</span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* Featured projects -------------------------------------------------- */}
      <motion.section variants={itemVariants} className="flex flex-col gap-8">
        <SectionTitle kicker="work // featured" title="Selected case studies">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 font-mono text-cyan-200 transition hover:text-cyan-100"
          >
            view all projects
            <ArrowRight
              size={14}
              className="transition group-hover:translate-x-1"
            />
          </Link>
        </SectionTitle>
        <div className="grid gap-5">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
              orientation="horizontal"
            />
          ))}
        </div>
      </motion.section>
    </motion.div>
  );
}
