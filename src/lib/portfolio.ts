export function projectSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatYearRange(startDate: string, endDate?: string) {
  const start = new Date(startDate).getFullYear();
  const end = endDate ? new Date(endDate).getFullYear() : "Present";

  return `${start} - ${end}`;
}

export const aboutParagraphs = [
  "I build full-stack products with a systems mindset: typed frontends, reliable APIs, data layers that can evolve, and deployment paths that are easy to operate.",
  "My strongest work sits around React and Next.js interfaces, Node/Nest/Express backends, PostgreSQL and MongoDB data models, cloud infrastructure, and AI/RAG integrations.",
  "I like portfolio interfaces that feel usable rather than decorative, so this site is shaped like an editor workspace with panels, commands, status lines, and scan-friendly code typography.",
];

export const operatingPrinciples = [
  "Ship readable systems",
  "Design for repeated use",
  "Automate boring checks",
  "Keep latency visible",
];
