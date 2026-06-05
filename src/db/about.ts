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

export const ABOUT_PAGE_DATA = {
  kicker: "about.md",
  title: "Developer",
  titleGradient: "profile",
  inspectWorkButton: "inspect work",
  profilePortraitLabel: "profile.portrait",
  editorPanel: {
    filename: "profile.rohit.ts",
    status: "About  markdown-preview",
  },
  profileModules: [
    {
      label: "frontend",
      value: "React, Next.js, animated interfaces",
      icon: "Code2",
    },
    {
      label: "backend",
      value: "Node, Nest, Express, APIs, queues",
      icon: "Workflow",
    },
    {
      label: "data",
      value: "PostgreSQL, MongoDB, Redis, RAG",
      icon: "Cpu",
    },
    {
      label: "thinking",
      value: "product clarity, system design, delivery",
      icon: "Brain",
    },
  ],
  timelines: {
    experience: "experience.timeline",
    education: "education.timeline",
  },
  skills: {
    label: "skills.nucleus",
    editorPanel: {
      filename: "skills.nucleus",
      status: "electron-orbit  live",
    },
    softSkillsLabel: "soft-skills",
  },
  certifications: {
    label: "certifications.log",
  },
  interests: {
    label: "interests.cfg",
    subLabel: "outside the editor",
  },
};
