"use client";

import {
  Box,
  ExternalLink,
  GitPullRequestArrow,
  Layers3,
  Radar,
} from "lucide-react";
import { motion, type Variants } from "motion/react";
import { ProjectCard } from "@/components/project-card";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { OPEN_SOURCE_PROJECTS, PROJECTS } from "@/db/cv";

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

  return (
    <motion.div
      className="mx-auto flex w-full max-w-7xl flex-col gap-14 px-4 pb-20 sm:px-6 lg:px-8"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.section
        variants={itemVariants}
        className="flex flex-col gap-8 pt-10"
      >
        <div className="max-w-3xl space-y-5">
          <Badge
            variant="outline"
            className="border-fuchsia-300/30 bg-fuchsia-300/10 text-fuchsia-100"
          >
            projects.json
          </Badge>
          <h1 className="text-4xl font-black uppercase leading-none text-white sm:text-6xl">
            Project archive
            <span className="block animated-gradient-text">
              with live routes
            </span>
          </h1>
          <p className="text-sm leading-7 text-zinc-400">
            A compact build log for product surfaces, backend systems, and
            deployment-ready experiments. Each project keeps its own inspectable
            route for stack, links, and implementation notes.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {[
            {
              label: "featured_projects",
              value: PROJECTS.length,
              icon: Layers3,
              color: "text-cyan-200",
            },
            {
              label: "unique_technologies",
              value: technologyIndex.length,
              icon: Radar,
              color: "text-emerald-200",
            },
            {
              label: "open_source_refs",
              value: OPEN_SOURCE_PROJECTS.length,
              icon: GitPullRequestArrow,
              color: "text-fuchsia-200",
            },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex items-center justify-between border border-white/10 bg-black/40 p-5 backdrop-blur-xl transition hover:border-white/20"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[11px] text-zinc-500">
                    {stat.label}
                  </span>
                  <span className={`text-3xl font-bold ${stat.color}`}>
                    {stat.value}
                  </span>
                </div>
                <Icon size={22} className="text-zinc-600" />
              </div>
            );
          })}
        </div>
      </motion.section>

      <motion.section variants={itemVariants}>
        <Tabs defaultValue="featured" className="gap-6">
          <TabsList
            variant="line"
            className="glass-surface flex h-fit w-full flex-wrap justify-start gap-2 p-3"
          >
            <TabsTrigger
              value="featured"
              className="border border-white/10 bg-white/[0.03] px-3 py-2 data-active:border-cyan-300/50 data-active:text-cyan-100"
            >
              <Layers3 size={14} />
              featured
            </TabsTrigger>
            <TabsTrigger
              value="stack"
              className="border border-white/10 bg-white/[0.03] px-3 py-2 data-active:border-emerald-300/50 data-active:text-emerald-100"
            >
              <Radar size={14} />
              stack index
            </TabsTrigger>
            <TabsTrigger
              value="open-source"
              className="border border-white/10 bg-white/[0.03] px-3 py-2 data-active:border-fuchsia-300/50 data-active:text-fuchsia-100"
            >
              <GitPullRequestArrow size={14} />
              open source
            </TabsTrigger>
          </TabsList>

          <TabsContent value="featured">
            <div className="grid gap-6 lg:grid-cols-2">
              {PROJECTS.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stack">
            <div className="glass-surface grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
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
          </TabsContent>

          <TabsContent value="open-source">
            <div className="grid gap-4 md:grid-cols-2">
              {OPEN_SOURCE_PROJECTS.map((project) => (
                <Card
                  key={project.name}
                  className="border-white/10 bg-black/40 text-zinc-100 backdrop-blur-xl"
                >
                  <CardHeader>
                    <CardTitle className="text-xl text-white">
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
          </TabsContent>
        </Tabs>
      </motion.section>
    </motion.div>
  );
}
