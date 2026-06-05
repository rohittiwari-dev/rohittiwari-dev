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
import { ProjectCard } from "@/components/project-card";
import EditorPanel from "@/components/EditorPanel";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OPEN_SOURCE_PROJECTS, PROJECTS, PROJECTS_PAGE_DATA } from "@/db/cv";
import { cn } from "@/lib/utils";

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
    <motion.div
      className="mx-auto flex w-full max-w-7xl flex-col gap-14 px-4 pb-20 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header ------------------------------------------------------------- */}
      <motion.section
        variants={itemVariants}
        className="flex flex-col gap-8 pt-10"
      >
        <div className="max-w-3xl space-y-5">
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
        </div>

        {/* Telemetry Stats Grid */}
        <div className="grid gap-3 sm:grid-cols-3">
          {PROJECTS_PAGE_DATA.stats.map((stat) => {
            const Icon = lucideIcons[stat.icon] ?? Sparkles;
            const value = getStatValue(stat.label);
            return (
              <div
                key={stat.label}
                className="group flex items-start gap-4 border border-white/10 bg-white/[0.03] p-5 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/[0.05]"
              >
                <div className={cn("grid size-10 place-items-center border border-white/10 bg-black/40 transition-colors group-hover:bg-white/[0.04]", stat.color)}>
                  <Icon size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                    {stat.label.replace(/_/g, " ")}
                  </span>
                  <span className="text-3xl font-extrabold text-white mt-1">
                    {value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.section>

      {/* Main content tabs -------------------------------------------------- */}
      <motion.section variants={itemVariants}>
        <Tabs defaultValue="featured" className="gap-6">
          <TabsList
            variant="line"
            className="glass-surface flex h-fit w-full flex-wrap justify-start gap-2 p-3 mb-6"
          >
            <TabsTrigger
              value="featured"
              className="border border-white/10 bg-white/[0.03] px-3 py-2 data-active:border-cyan-300/50 data-active:text-cyan-100"
            >
              <Layers3 size={14} />
              {PROJECTS_PAGE_DATA.tabs.featured.label}
            </TabsTrigger>
            <TabsTrigger
              value="stack"
              className="border border-white/10 bg-white/[0.03] px-3 py-2 data-active:border-emerald-300/50 data-active:text-emerald-100"
            >
              <Radar size={14} />
              {PROJECTS_PAGE_DATA.tabs.stack.label}
            </TabsTrigger>
            <TabsTrigger
              value="open-source"
              className="border border-white/10 bg-white/[0.03] px-3 py-2 data-active:border-fuchsia-300/50 data-active:text-fuchsia-100"
            >
              <GitPullRequestArrow size={14} />
              {PROJECTS_PAGE_DATA.tabs.openSource.label}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="featured">
            <EditorPanel
              filename={PROJECTS_PAGE_DATA.tabs.featured.editorPanel.filename}
              status={PROJECTS_PAGE_DATA.tabs.featured.editorPanel.status}
            >
              <div className="grid gap-6 lg:grid-cols-2 mt-2">
                {PROJECTS.map((project, index) => (
                  <ProjectCard
                    key={project.title}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            </EditorPanel>
          </TabsContent>

          <TabsContent value="stack">
            <EditorPanel
              filename={PROJECTS_PAGE_DATA.tabs.stack.editorPanel.filename}
              status={PROJECTS_PAGE_DATA.tabs.stack.editorPanel.status}
            >
              <div className="grid gap-3 p-2 sm:grid-cols-2 lg:grid-cols-4 mt-2">
                {technologyIndex.map((tech) => (
                  <div
                    key={tech}
                    className="group flex items-center gap-3 border border-white/10 bg-black/35 px-4 py-3 font-mono text-sm text-zinc-300 transition hover:border-emerald-300/40 hover:bg-emerald-300/10 hover:text-emerald-100"
                  >
                    <Box
                      size={15}
                      className="text-zinc-600 transition group-hover:text-emerald-300"
                    />
                    {tech}
                  </div>
                ))}
              </div>
            </EditorPanel>
          </TabsContent>

          <TabsContent value="open-source">
            <EditorPanel
              filename={PROJECTS_PAGE_DATA.tabs.openSource.editorPanel.filename}
              status={PROJECTS_PAGE_DATA.tabs.openSource.editorPanel.status}
            >
              <div className="grid gap-4 md:grid-cols-2 mt-2">
                {OPEN_SOURCE_PROJECTS.map((project) => (
                  <Card
                    key={project.name}
                    className="border-white/10 bg-black/40 text-zinc-100 backdrop-blur-xl"
                  >
                    <CardHeader>
                      <CardTitle className="text-xl text-white font-mono">
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
                        className="inline-flex items-center gap-2 border border-fuchsia-300/30 bg-fuchsia-300/10 px-3 py-2 font-mono text-xs text-fuchsia-50 transition hover:bg-fuchsia-300/20"
                      >
                        visit source
                        <ExternalLink size={14} />
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </EditorPanel>
          </TabsContent>
        </Tabs>
      </motion.section>
    </motion.div>
  );
}
