export const PROJECTS = [
  {
    title: "VoltCharge",
    description: "A cloud-native EV charging station management platform that handles real-time OCPP 1.6 and 2.0.1 protocol signals, transaction billing, and dynamic load balancing.",
    technologies: ["TypeScript", "NestJS", "WebSockets", "Redis", "PostgreSQL", "Docker", "AWS", "OCPP"],
    github: "https://github.com/rohittiwari/voltcharge",
    demo: "https://voltcharge.rohittiwari.me",
    image: "/voltcharge.png",
    role: "Lead Platform Engineer",
    duration: "6 Months (Jan 2025 - Jun 2025)",
    status: "Production Ready",
    metrics: [
      { label: "Uptime", value: "99.98%" },
      { label: "Active Connectors", value: "5,000+" },
      { label: "Message Latency", value: "<15ms" },
      { label: "Daily Transactions", value: "85K+" },
    ],
    systemNotes: [
      "Implement websocket-based connection scaling to manage state preservation across thousands of active charger heartbeats.",
      "Ensure message payloads strictly validate against JSON schemas for both OCPP 1.6-J and 2.0.1 protocols.",
      "Incorporate Redis pub/sub channels to broadcast live status changes instantly to active web dashboards.",
      "Build transaction state machines that gracefully resolve charging session discrepancies (e.g. abrupt plug disconnects).",
    ],
    highlights: [
      {
        title: "Real-time Telemetry",
        body: "Direct websocket telemetry capturing current, voltage, and state changes from chargers every 10 seconds.",
        icon: "Zap",
        color: "text-cyan-300",
      },
      {
        title: "OCPP State Machine",
        body: "Robust, event-driven parser supporting standard transaction cycles, remote start/stop, and diagnostic uploads.",
        icon: "Layers3",
        color: "text-fuchsia-300",
      },
      {
        title: "Resilient Cache",
        body: "Redis-backed connection maps and in-memory rate limiting to handle packet bursts during peak charging hours.",
        icon: "Database",
        color: "text-emerald-300",
      },
    ],
    architecture: [
      {
        title: "Connection Gateway Layer",
        body: "Scalable WebSocket servers that validate and parse charger payloads before delegating to the message brokers.",
      },
      {
        title: "Event Routing Broker",
        body: "RabbitMQ/BullMQ instance managing charger status changes, smart charging profiles, and billing logs asynchronously.",
      },
      {
        title: "Relational Persistence",
        body: "PostgreSQL database keeping track of charger configurations, firmwares, user accounts, and financial transactions.",
      },
    ],
  },
  {
    title: "PayGate",
    description: "A high-performance secure payment processing gateway designed to coordinate multi-merchant checkouts, ledger audits, and automated card chargebacks with bank networks.",
    technologies: ["TypeScript", "NestJS", "RabbitMQ", "PostgreSQL", "BullMQ", "Redis", "Docker"],
    github: "https://github.com/rohittiwari/paygate",
    demo: "https://paygate.rohittiwari.me",
    image: "/paygate.png",
    role: "Senior Backend Architect",
    duration: "4 Months (Sep 2024 - Dec 2024)",
    status: "Completed",
    metrics: [
      { label: "API Response", value: "85ms" },
      { label: "Throughput", value: "1,200 TPS" },
      { label: "Settle Rate", value: "99.99%" },
      { label: "Fraud Detection", value: "<15ms" },
    ],
    systemNotes: [
      "Deploy strict transaction isolation levels (Serializable) in PostgreSQL to eliminate race conditions during concurrent account deductions.",
      "Adopt RabbitMQ queues with manual acknowledgment modes to implement 'at-least-once' payment message delivery.",
      "Configure idempotency keys on all api entry points to prevent double-charging due to network retries.",
      "Implement a fallback circuit breaker using Hystrix patterns to shield database bottlenecks from bank server downtimes.",
    ],
    highlights: [
      {
        title: "Transactional Safety",
        body: "Multi-phase commit database transaction boundaries ensuring ledgers remain strictly balanced.",
        icon: "ShieldCheck",
        color: "text-emerald-300",
      },
      {
        title: "Idempotency Control",
        body: "Middleware layer using Redis cache to intercept duplicate request payloads within a 24-hour window.",
        icon: "Cpu",
        color: "text-cyan-300",
      },
      {
        title: "Asynchronous Settlement",
        body: "Scheduled cron workers and queue consumers executing batch settlement uploads to banking APIs overnight.",
        icon: "Workflow",
        color: "text-fuchsia-300",
      },
    ],
    architecture: [
      {
        title: "API Gateway & Security",
        body: "Entrypoint providing JWT authentication, HMAC request signing validation, and rate-limiting controls."
      },
      {
        title: "Idempotency Ledger",
        body: "Fast-lookup cache verifying request hashes before committing payments to the transactional pipeline."
      },
      {
        title: "Ledger Engine",
        body: "Audit-ready database schema tracking double-entry accounting records for all merchant assets."
      },
    ],
  },
  {
    title: "StaffSync",
    description: "An enterprise-grade human resource management and payroll ledger platform designed for automatic tax calculations, shift schedules, and employee document vaults.",
    technologies: ["Next.js", "React", "Prisma", "PostgreSQL", "TypeORM", "AWS", "Tanstack Table"],
    github: "https://github.com/rohittiwari/staffsync",
    demo: "https://staffsync.rohittiwari.me",
    image: "/staffsync.png",
    role: "Full Stack Developer",
    duration: "5 Months (Apr 2024 - Aug 2024)",
    status: "Completed",
    metrics: [
      { label: "Payroll Processing", value: "<2 mins" },
      { label: "Active Employees", value: "10K+" },
      { label: "Report Gen Time", value: "<1s" },
      { label: "UI Load Speed", value: "0.6s" },
    ],
    systemNotes: [
      "Utilize Prisma for query writing and TypeORM for batch synchronization logic between local records and cloud payroll services.",
      "Optimize rendering of dense directories (10,000+ entries) by integrating virtualized lists and Tanstack Table client-side paging.",
      "Store secure tax documentation PDFs inside encrypted AWS S3 buckets using signed, expiring URL access limits.",
      "Develop background cron routines to automatically compile country-specific tax distributions on the first day of each month.",
    ],
    highlights: [
      {
        title: "Automated Ledger",
        body: "Serverless lambda triggers that auto-calculate tax forms, pension margins, and local deductions.",
        icon: "ServerCog",
        color: "text-emerald-300",
      },
      {
        title: "Virtualized Rendering",
        body: "Fluid React directory layout displaying thousands of active employee records without frame drops.",
        icon: "Layers3",
        color: "text-cyan-300",
      },
      {
        title: "Encrypted Storage",
        body: "AWS S3 file uploads protected by KMS envelope encryption keys and expiring pre-signed URLs.",
        icon: "ShieldCheck",
        color: "text-fuchsia-300",
      },
    ],
    architecture: [
      {
        title: "Next.js Portal Layout",
        body: "Dense, responsive dashboard with role-based page redirects for administrators and general staff.",
      },
      {
        title: "Payroll Computation Engine",
        body: "Stateless calculation modules computing taxes, bonuses, and holiday pay policies programmatically.",
      },
      {
        title: "Encrypted File Service",
        body: "API integrating AWS S3 upload paths with automated malware scanning and pre-signed retrieval gates.",
      },
    ],
  },
];

export const OPEN_SOURCE_PROJECTS = [
  {
    name: "TanStack Table",
    description: "Headless UI for building tables and data grids.",
    url: "https://tanstack.com/table",
  },
  {
    name: "NextAuth.js",
    description: "Authentication for Next.js applications.",
    url: "https://next-auth.js.org",
  },
];
