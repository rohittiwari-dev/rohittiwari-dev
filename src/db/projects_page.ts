export const PROJECTS_PAGE_DATA = {
  kicker: "projects.json",
  title: "Project archive",
  titleGradient: "with live routes",
  description: "A compact build log for product surfaces, backend systems, and deployment-ready experiments. Each project keeps its own inspectable route for stack, links, and implementation notes.",
  stats: [
    {
      label: "featured_projects",
      icon: "Layers3",
      color: "text-cyan-200",
    },
    {
      label: "unique_technologies",
      icon: "Radar",
      color: "text-emerald-200",
    },
    {
      label: "open_source_refs",
      icon: "GitPullRequestArrow",
      color: "text-fuchsia-200",
    },
  ],
  tabs: {
    featured: {
      label: "featured",
      icon: "Layers3",
      editorPanel: {
        filename: "projects.db",
        status: "query  success",
      },
    },
    stack: {
      label: "stack index",
      icon: "Radar",
      editorPanel: {
        filename: "stack.cfg",
        status: "read-only  active",
      },
    },
    openSource: {
      label: "open source",
      icon: "GitPullRequestArrow",
      editorPanel: {
        filename: "open_source.log",
        status: "mirrored  live",
      },
    },
  },
};
