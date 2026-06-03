import ProjectDetailView from "@/components/ProjectDetailView";
import { PROJECTS } from "@/db/cv";
import { projectSlug } from "@/lib/portfolio";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({
    id: projectSlug(project.title),
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = PROJECTS.find((item) => projectSlug(item.title) === id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailView project={project} />;
}
