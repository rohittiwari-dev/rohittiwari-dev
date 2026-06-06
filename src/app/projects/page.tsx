"use client";

import {
  Box,
  ExternalLink,
  GitPullRequestArrow,
  Layers3,
  Radar,
  Sparkles,
} from "lucide-react";
import { motion, type Variants } from "motion/react";
import AnimatedNumber from "@/components/AnimatedNumber";
import EditorPanel from "@/components/EditorPanel";
import { SectionTitle } from "@/components/home/section-title";
import { ProjectCard } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OPEN_SOURCE_PROJECTS, PROJECTS, PROJECTS_PAGE_DATA } from "@/db/cv";
import { cn } from "@/lib/utils";
import { CornerPluses } from "@/components/ui/corner-plus";

const lucideIcons: Record<string, React.ElementType> = {
  Layers3,
  Radar,
  GitPullRequestArrow,
  Box,
  Sparkles,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
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

// Shared scroll-reveal props for stacked sections.
const sectionReveal = {
  initial: "hidden" as const,
  whileInView: "visible" as const,
  viewport: { once: true, amount: 0.15 },
  variants: itemVariants,
};

// Inner grid that staggers its children once scrolled into view.
const gridReveal = {
  initial: "hidden" as const,
  whileInView: "visible" as const,
  viewport: { once: true, amount: 0.1 },
  variants: containerVariants,
};

export default function ProjectsPage() {
  const technologyIndex = Array.from(
    new Set(PROJECTS.flatMap((project) => project.technologies)),
  );

  const getStatValue = (label: string) => {
    if (label === "featured_projects") return PROJECTS.length;
    if (label === "unique_technologies") return technologyIndex.length;
    if (label === "open_source_refs") return OPEN_SOURCE_PROJECTS.length;
    return 0;
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-20 px-4 pb-20 sm:px-6 lg:px-8">
      {/* Header ------------------------------------------------------------- */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex flex-col gap-8 pt-10"
      >
        <motion.div variants={itemVariants} className="max-w-3xl space-y-5">
          <Badge
            variant="outline"
            className="border-fuchsia-300/30 bg-fuchsia-300/10 text-fuchsia-100"
          >
            {PROJECTS_PAGE_DATA.kicker}
          </Badge>
          <h1 className="text-4xl font-black uppercase leading-none text-white sm:text-6xl">
            {PROJECTS_PAGE_DATA.title}
            <span className="block animated-gradient-text">
              {PROJECTS_PAGE_DATA.titleGradient}
            </span>
          </h1>
          <p className="text-sm leading-7 text-zinc-400">
            {PROJECTS_PAGE_DATA.description}
          </p>
        </motion.div>

        {/* Telemetry stats grid — animated count-up */}
        <motion.div
          variants={containerVariants}
          className="grid gap-3 sm:grid-cols-3"
        >
          {PROJECTS_PAGE_DATA.stats.map((stat) => {
            const Icon = lucideIcons[stat.icon] ?? Sparkles;
            const value = getStatValue(stat.label);
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="group flex items-start gap-4 border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition-colors hover:border-white/20 hover:bg-white/[0.05]"
              >
                <CornerPluses size={10} strokeWidth={0.75} />
                <div
                  className={cn(
                    "grid size-10 place-items-center border border-white/10 bg-black/40 transition-colors group-hover:bg-white/[0.04]",
                    stat.color,
                  )}
                >
                  <Icon size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                    {stat.label.replace(/_/g, " ")}
                  </span>
                  <span className="mt-1 text-3xl font-extrabold text-white">
                    <AnimatedNumber value={value} />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.section>

      {/* Featured work ------------------------------------------------------ */}
      <motion.section {...sectionReveal} className="flex flex-col gap-8">
        <SectionTitle
          kicker="featured.work"
          title={PROJECTS_PAGE_DATA.tabs.featured.label}
        >
          <span className="font-mono text-cyan-200/80">
            {PROJECTS.length} case studies
          </span>
        </SectionTitle>
        <EditorPanel
          filename={PROJECTS_PAGE_DATA.tabs.featured.editorPanel.filename}
          status={PROJECTS_PAGE_DATA.tabs.featured.editorPanel.status}
        >
          <motion.div
            {...gridReveal}
            className="mt-2 grid gap-6 lg:grid-cols-2"
          >
            {PROJECTS.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
              />
            ))}
          </motion.div>
        </EditorPanel>
      </motion.section>

      {/* Technology arsenal ------------------------------------------------- */}
      <motion.section {...sectionReveal} className="flex flex-col gap-8">
        <SectionTitle
          kicker="tech.stack"
          title={PROJECTS_PAGE_DATA.tabs.stack.label}
        >
          <span className="font-mono text-emerald-200/80">
            {technologyIndex.length} technologies
          </span>
        </SectionTitle>
        <EditorPanel
          filename={PROJECTS_PAGE_DATA.tabs.stack.editorPanel.filename}
          status={PROJECTS_PAGE_DATA.tabs.stack.editorPanel.status}
        >
          <motion.div
            {...gridReveal}
            className="mt-2 grid gap-3 p-2 sm:grid-cols-2 lg:grid-cols-4"
          >
            {technologyIndex.map((tech) => (
              <motion.div
                key={tech}
                variants={itemVariants}
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="group flex items-center gap-3 border border-white/10 bg-black/35 px-4 py-3 font-mono text-sm text-zinc-300 transition-colors hover:border-emerald-300/40 hover:bg-emerald-300/10 hover:text-emerald-100"
              >
                <Box
                  size={15}
                  className="text-zinc-500 transition group-hover:text-emerald-300"
                />
                {tech}
              </motion.div>
            ))}
          </motion.div>
        </EditorPanel>
      </motion.section>

      {/* Open source -------------------------------------------------------- */}
      <motion.section {...sectionReveal} className="flex flex-col gap-8">
        <SectionTitle
          kicker="open.source"
          title={PROJECTS_PAGE_DATA.tabs.openSource.label}
        >
          <span className="font-mono text-fuchsia-200/80">
            {OPEN_SOURCE_PROJECTS.length} references
          </span>
        </SectionTitle>
        <EditorPanel
          filename={PROJECTS_PAGE_DATA.tabs.openSource.editorPanel.filename}
          status={PROJECTS_PAGE_DATA.tabs.openSource.editorPanel.status}
        >
          <motion.div
            {...gridReveal}
            className="mt-2 grid gap-4 md:grid-cols-2"
          >
            {OPEN_SOURCE_PROJECTS.map((project) => (
              <motion.div key={project.name} variants={itemVariants}>
                <Card className="h-full border-white/10 bg-black/40 text-zinc-100 backdrop-blur-xl transition-colors hover:border-fuchsia-300/30">
                  <CardHeader>
                    <CardTitle className="font-mono text-xl text-white">
                      {project.name}
                    </CardTitle>
                    <CardDescription className="text-zinc-400">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 border border-fuchsia-300/30 bg-fuchsia-300/10 px-3 py-2 font-mono text-xs text-fuchsia-50 transition hover:bg-fuchsia-300/20"
                    >
                      visit source
                      <ExternalLink
                        size={14}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </EditorPanel>
      </motion.section>
    </div>
  );
}
