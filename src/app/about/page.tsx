"use client";

import {
  ArrowRight,
  Award,
  Brain,
  Briefcase,
  CalendarDays,
  Code2,
  Cpu,
  ExternalLink,
  GitCommitHorizontal,
  GraduationCap,
  Heart,
  MapPin,
  Sparkles,
  Terminal,
  Workflow,
} from "lucide-react";
import { motion, type Variants } from "motion/react";
import Link from "next/link";
import EditorPanel from "@/components/EditorPanel";
import SkillsNucleus from "@/components/SkillsNucleus";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CornerPluses } from "@/components/ui/corner-plus";
import {
  ABOUT_PAGE_DATA,
  aboutParagraphs,
  CERTIFICATES,
  EDUCATION,
  EXPERIENCE,
  Interest,
  operatingPrinciples,
  PERSONAL_DATA,
  SKILLS,
  SoftSkills,
} from "@/db/cv";
import { formatYearRange } from "@/lib/portfolio";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  },
};

const lucideIcons: Record<string, React.ElementType> = {
  Code2,
  Workflow,
  Cpu,
  Brain,
  Sparkles,
};

type TimelineEntry = {
  title: string;
  org: string;
  location: string;
  start_date: string;
  end_date?: string;
  description?: string;
};

const byNewest = (a: TimelineEntry, b: TimelineEntry) =>
  new Date(b.start_date).getTime() - new Date(a.start_date).getTime();

const experienceTimeline: TimelineEntry[] = EXPERIENCE.map((item) => ({
  title: item.title,
  org: item.company,
  location: item.location,
  start_date: item.start_date,
  end_date: item.end_date,
  description: item.description,
})).sort(byNewest);

const educationTimeline: TimelineEntry[] = EDUCATION.map((item) => ({
  title: item.title,
  org: item.institution,
  location: item.location,
  start_date: item.start_date,
  end_date: item.end_date,
})).sort(byNewest);

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 font-mono text-xs text-cyan-200/75">
      <span className="h-px w-8 bg-cyan-300/60" />
      {children}
    </div>
  );
}

function Timeline({
  entries,
  accent,
  icon: Icon,
}: {
  entries: TimelineEntry[];
  accent: string;
  icon: React.ElementType;
}) {
  return (
    <ol className="relative ml-3 space-y-5 border-l border-white/10 pl-7 sm:pl-8">
      {entries.map((item) => (
        <li key={`${item.org}-${item.start_date}`} className="relative">
          <CornerPluses
            size={10}
            strokeWidth={0.75}
            className="text-cyan-300/60"
          />
          <span
            className={`absolute top-1.5 grid size-7 place-items-center rounded-full border border-white/10 bg-black ${accent} -left-[42px] sm:-left-[46px]`}
          >
            <Icon size={13} />
          </span>
          <div className="border border-white/10 bg-black/40 p-5 backdrop-blur-xl transition hover:border-white/20">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Badge
                variant="outline"
                className={`flex w-fit items-center gap-1.5 border-white/10 bg-white/[0.04] font-mono ${accent}`}
              >
                <CalendarDays size={12} />
                {formatYearRange(item.start_date, item.end_date)}
              </Badge>
              <span className="inline-flex items-center gap-1 font-mono text-[11px] text-zinc-500">
                <MapPin size={11} />
                {item.location}
              </span>
            </div>
            <h3 className="mt-3 text-lg font-semibold text-white">
              {item.title}
            </h3>
            <p className="mt-0.5 text-sm text-zinc-400">{item.org}</p>
            {item.description ? (
              <p className="mt-3 text-sm leading-7 text-zinc-300">
                {item.description}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

export default function AboutPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 pb-20 sm:px-6 lg:px-8">
      {/* Intro — asymmetric monogram portrait ------------------------------- */}
      <motion.section
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-10 pt-10 lg:grid-cols-[1fr_0.82fr] lg:items-center"
      >
        {/* Compact intro */}
        <div className="flex flex-col gap-6">
          <Badge
            variant="outline"
            className="relative w-fit border-cyan-300/30 bg-cyan-300/10 text-cyan-100"
          >
            <CornerPluses
              size={10}
              strokeWidth={0.75}
              className="text-cyan-300/60"
            />
            {ABOUT_PAGE_DATA.kicker}
          </Badge>
          <h1 className="text-5xl font-black uppercase leading-[0.95] text-white sm:text-7xl">
            {ABOUT_PAGE_DATA.title}
            <span className="block animated-gradient-text">
              {ABOUT_PAGE_DATA.titleGradient}
            </span>
          </h1>
          <p className="max-w-lg text-base leading-8 text-zinc-300">
            {aboutParagraphs[0]}
          </p>
          <div className="flex flex-wrap gap-2 font-mono text-xs text-zinc-400">
            <span className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.04] px-3 py-2 relative">
              <CornerPluses
                size={10}
                strokeWidth={0.75}
                className="text-cyan-300/60"
              />
              <MapPin size={14} className="text-cyan-300" />
              {PERSONAL_DATA.location}
            </span>
            <span className="inline-flex items-center gap-2 border border-white/10 bg-white/[0.04] px-3 py-2 relative">
              <CornerPluses
                size={10}
                strokeWidth={0.75}
                className="text-cyan-300/60"
              />
              <Terminal size={14} className="text-emerald-300" />
              {PERSONAL_DATA.headline}
            </span>
          </div>
          <Link
            href="/projects"
            className="group relative inline-flex w-fit items-center gap-2 border border-cyan-300/40 bg-cyan-300/10 px-4 py-3 font-mono text-sm text-cyan-50 transition hover:bg-cyan-300/20"
          >
            <CornerPluses size={10} strokeWidth={0.75} />
            {ABOUT_PAGE_DATA.inspectWorkButton}
            <ArrowRight
              size={16}
              className="transition group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Monogram portrait tile */}
        <div className="relative mx-auto w-full max-w-sm lg:mx-0 lg:ml-auto">
          <div className="relative aspect-[4/5] overflow-visible border border-white/10 bg-black/50 backdrop-blur-xl">
            <CornerPluses />
            {/* grid texture */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
                backgroundSize: "32px 32px",
              }}
            />
            {/* radial glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(34,211,238,0.22),transparent_62%)]" />

            {/* header strip */}
            <div className="absolute inset-x-0 top-0 flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-2.5 font-mono text-[10px] text-zinc-500">
              <span>{ABOUT_PAGE_DATA.profilePortraitLabel}</span>
              <span className="flex gap-1.5">
                <span className="size-2 rounded-full bg-rose-400/70" />
                <span className="size-2 rounded-full bg-amber-300/70" />
                <span className="size-2 rounded-full bg-emerald-400/70" />
              </span>
            </div>

            {/* monogram */}
            <div className="absolute inset-0 grid place-items-center">
              <span className="bg-gradient-to-br from-cyan-300 via-fuchsia-300 to-emerald-300 bg-clip-text font-black leading-none text-transparent drop-shadow-[0_4px_30px_rgba(34,211,238,0.25)] [font-size:9rem]">
                {PERSONAL_DATA.initials}
              </span>
            </div>

            {/* footer label */}
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/10 bg-black/40 px-4 py-3 font-mono text-[11px]">
              <span className="font-semibold text-white">
                {PERSONAL_DATA.name}
              </span>
              <span className="text-cyan-300">{PERSONAL_DATA.headline}</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Profile file ------------------------------------------------------- */}
      <motion.section
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <EditorPanel
          filename={ABOUT_PAGE_DATA.editorPanel.filename}
          status={ABOUT_PAGE_DATA.editorPanel.status}
        >
          <div className="space-y-5">
            {aboutParagraphs.slice(1).map((paragraph, index) => (
              <p
                key={paragraph}
                className="grid grid-cols-[2rem_1fr] gap-3 text-sm leading-8 text-zinc-300"
              >
                <span className="select-none text-right font-mono text-zinc-600">
                  {index + 1}
                </span>
                <span>{paragraph}</span>
              </p>
            ))}
          </div>
          <div className="neon-divider my-6" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {operatingPrinciples.map((principle) => (
              <div
                key={principle}
                className="border border-white/10 bg-white/[0.035] px-3 py-3 font-mono text-xs text-emerald-100"
              >
                <GitCommitHorizontal
                  size={14}
                  className="mb-2 text-emerald-300"
                />
                {principle}
              </div>
            ))}
          </div>
        </EditorPanel>
      </motion.section>

      {/* Capability modules ------------------------------------------------- */}
      <motion.section
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
      >
        {ABOUT_PAGE_DATA.profileModules.map((module) => {
          const Icon = lucideIcons[module.icon] ?? Sparkles;
          return (
            <Card
              key={module.label}
              className="relative overflow-visible border-white/10 bg-black/30 text-zinc-100 backdrop-blur-xl"
            >
              <CornerPluses
                size={10}
                strokeWidth={0.75}
                className="text-cyan-300/60"
              />
              <CardHeader>
                <div className="mb-2 grid size-10 place-items-center border border-white/10 bg-white/[0.04] text-cyan-200">
                  <Icon size={18} />
                </div>
                <CardTitle className="font-mono text-base text-white">
                  {module.label}
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  {module.value}
                </CardDescription>
              </CardHeader>
            </Card>
          );
        })}
      </motion.section>

      {/* Experience + Education timelines (separate tracks) ----------------- */}
      <motion.section
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid gap-x-10 gap-y-12 lg:grid-cols-2"
      >
        <div className="space-y-6">
          <SectionLabel>{ABOUT_PAGE_DATA.timelines.experience}</SectionLabel>
          <Timeline
            entries={experienceTimeline}
            accent="text-cyan-300"
            icon={Briefcase}
          />
        </div>

        <div className="space-y-6">
          <SectionLabel>{ABOUT_PAGE_DATA.timelines.education}</SectionLabel>
          <Timeline
            entries={educationTimeline}
            accent="text-emerald-300"
            icon={GraduationCap}
          />
        </div>
      </motion.section>

      {/* Skills nucleus ----------------------------------------------------- */}
      <motion.section
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="space-y-6"
      >
        <SectionLabel>
          {ABOUT_PAGE_DATA.skills.label} — {SKILLS.length} orbitals
        </SectionLabel>
        <EditorPanel
          filename={ABOUT_PAGE_DATA.skills.editorPanel.filename}
          status={ABOUT_PAGE_DATA.skills.editorPanel.status}
        >
          <div className="py-4">
            <SkillsNucleus groups={SKILLS} />
          </div>
          <div className="neon-divider my-8" />
          <div className="mb-3 flex items-center gap-2 font-mono text-xs text-emerald-200">
            <Sparkles size={14} />
            {ABOUT_PAGE_DATA.skills.softSkillsLabel}
          </div>
          <div className="flex flex-wrap gap-2">
            {SoftSkills.map((skill) => (
              <span
                key={skill}
                className="border border-emerald-300/20 bg-emerald-300/10 px-3 py-2 font-mono text-xs text-emerald-100"
              >
                {skill}
              </span>
            ))}
          </div>
        </EditorPanel>
      </motion.section>

      {/* Certificates + Interests ------------------------------------------- */}
      <motion.section
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="grid gap-x-10 gap-y-12 lg:grid-cols-2"
      >
        <div className="space-y-6">
          <SectionLabel>{ABOUT_PAGE_DATA.certifications.label}</SectionLabel>
          <div className="grid gap-4 sm:grid-cols-2">
            {CERTIFICATES.map((item) => (
              <Card
                key={item.title}
                className="relative overflow-visible border-white/10 bg-black/40 text-zinc-100 backdrop-blur-xl"
              >
                <CornerPluses
                  size={10}
                  strokeWidth={0.75}
                  className="text-cyan-300/60"
                />
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <Award size={22} className="mt-1 shrink-0 text-amber-300" />
                    <div>
                      <CardTitle className="text-base text-white">
                        {item.url ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 hover:text-amber-200 hover:underline transition-colors"
                          >
                            {item.title}
                            <ExternalLink size={13} className="opacity-60" />
                          </a>
                        ) : (
                          item.title
                        )}
                      </CardTitle>
                      <CardDescription className="mt-1 text-zinc-400">
                        {item.institution} / {new Date(item.date).getFullYear()}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <SectionLabel>{ABOUT_PAGE_DATA.interests.label}</SectionLabel>
          <div className="glass-surface flex flex-col gap-4 p-6">
            <div className="flex items-center gap-2 font-mono text-xs text-fuchsia-200">
              <Heart size={14} />
              {ABOUT_PAGE_DATA.interests.subLabel}
            </div>
            <div className="flex flex-wrap gap-2">
              {Interest.map((interest) => (
                <span
                  key={interest}
                  className="border border-fuchsia-300/20 bg-fuchsia-300/10 px-3 py-2 font-mono text-xs text-fuchsia-100"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
