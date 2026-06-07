export const PROJECTS = [
	{
		title: "OqronKit",
		description:
			"A crash-safe, adapter-driven background job engine for Node.js. Provides task queues, distributed workers, schedulers, rate limiters, caching, and pub/sub built on a shared adapter layer allowing seamless scaling from in-memory to Redis or PostgreSQL.",
		technologies: [
			"Node.js",
			"TypeScript",
			"Redis",
			"PostgreSQL",
			"Event-Driven Architecture",
			"Observability",
		],
		github: "https://github.com/rohittiwari-dev/oqronkit",
		demo: "https://oqronkit.rohittiwari.me/",
		image: "/projects/oqronkit.png",
		role: "Creator & Maintainer",
		duration: "2026",
		status: "Published on npm",
		systemNotes: [
			"Built for production from day one with one cohesive TypeScript engine.",
			"Adapter-driven architecture: Memory for dev, Redis or Postgres for production.",
			"Crash-safe by default: heartbeat locks, automatic stall detection, and job reclamation.",
			"Extensive module ecosystem: Task Queue, Distributed Worker, Scheduler, PubSub, Webhooks, and more.",
		],
		highlights: [
			{
				title: "Adapter-driven",
				body: "Start in memory and scale to Redis or Postgres with zero code changes.",
				icon: "Layers3",
				color: "text-cyan-300",
			},
			{
				title: "Crash-safe",
				body: "Heartbeat locks and automatic stall detection ensure your jobs are never lost.",
				icon: "ShieldCheck",
				color: "text-fuchsia-300",
			},
			{
				title: "Horizontal Scaling",
				body: "Scales natively across processes and machines with sharded leader election.",
				icon: "Cpu",
				color: "text-emerald-300",
			},
		],
		architecture: [
			{
				title: "Shared Adapter Layer",
				body: "Unified contracts across memory, Redis, and PostgreSQL backends.",
			},
			{
				title: "Crash Recovery Engine",
				body: "Automatic stall detection and job reclamation within ~15 seconds of process failure.",
			},
			{
				title: "Distributed Modules",
				body: "Queues, Schedulers, Rate Limiters, and PubSub operating natively across distributed nodes.",
			},
		],
	},
	{
		title: "Rollease",
		description:
			"A production-grade, database-backed feature flag SDK for Node.js, React, and Next.js. Provides a framework-agnostic evaluation engine with adapters for in-memory, Sequelize, Prisma, and Drizzle. Supports targeting rules, staged rollouts, scheduled releases, and real-time frontend integration via SSE.",
		technologies: [
			"TypeScript",
			"Node.js",
			"React",
			"Next.js",
			"PostgreSQL",
			"Redis",
			"Prisma",
			"Drizzle ORM",
		],
		github: "https://github.com/rohittiwari-dev/rollease",
		demo: "https://npmx.dev/package/rollease",
		image: "/projects/rollease.png",
		role: "Creator & Maintainer",
		duration: "May 2026",
		status: "Published on npm",
		systemNotes: [
			"Zero-flicker feature flagging spanning RSC, SSR, and client side seamlessly.",
			"Adapter-driven design to integrate with existing Prisma, Sequelize, Drizzle, and In-Memory stacks.",
			"Built-in telemetry routing and robust execution tracing for deep evaluation observability.",
			"Configurable privacy features offering zero data leaks through custom PII scrubbing mechanisms.",
		],
		highlights: [
			{
				title: "Database Backed",
				body: "First-class ORM adapters for Drizzle, Prisma, and Sequelize.",
				icon: "Database",
				color: "text-cyan-300",
			},
			{
				title: "Universal SDK",
				body: "Works strictly everywhere — Node, React, RSC, Bun, Edge runtimes, and the browser.",
				icon: "Code2",
				color: "text-fuchsia-300",
			},
			{
				title: "Production Ready",
				body: "Configurable resilience with circuit breakers, graceful degradation, and scheduled releases.",
				icon: "Workflow",
				color: "text-emerald-300",
			},
		],
		architecture: [
			{
				title: "Universal Evaluation Engine",
				body: "Shared rule pipelines evaluating context identically on servers or browsers.",
			},
			{
				title: "Pluggable Adapters Layer",
				body: "Swappable memory, SQL ORMs, caching algorithms, telemetry hooks, and persistence.",
			},
			{
				title: "Edge Delivery Pipeline",
				body: "Next.js middleware bridging evaluated flags down through RSC and Client SSE.",
			},
		],
	},
	{
		title: "OCPP Protocol Proxy",
		description:
			"A transport-agnostic OCPP version translation proxy. Enables legacy OCPP 1.6 charge points to communicate with modern OCPP 2.1 central systems without rewriting firmware. Features pluggable middleware, stateful session management, and spec-compliant presets.",
		technologies: [
			"TypeScript",
			"Node.js",
			"OCPP",
			"Middleware",
			"Event-Driven Architecture",
		],
		github: "https://github.com/rohittiwari-dev/ocpp-ws-io/tree/main/packages/ocpp-protocol-proxy",
		demo: "https://ocpp-ws-io.rohittiwari.me/docs/protocol-proxy",
		image: "/projects/ocpp-protocol-proxy.png",
		role: "Creator & Maintainer",
		duration: "Mar 2026",
		status: "Published on npm",
		systemNotes: [
			"Translate any OCPP version to any other (1.6 ↔ 2.0.1 ↔ 2.1) seamlessly.",
			"Transport-agnostic core logic entirely independent of WebSockets.",
			"Support middleware pipelines for logging, validation, and telemetry hooks.",
			"Maintain stateful sessions mapping UUIDs to integers for transaction tracking across messages.",
		],
		highlights: [
			{
				title: "Version Translation",
				body: "Any-to-any translation bridging legacy 1.6 hardware with 2.1 modern backends.",
				icon: "Layers3",
				color: "text-cyan-300",
			},
			{
				title: "Modular Presets",
				body: "Selective imports for Core, Smart Charging, Firmware Management, and Reservation profiles.",
				icon: "ShieldCheck",
				color: "text-fuchsia-300",
			},
			{
				title: "Pipeline Architecture",
				body: "Intercept messages with pre/post hooks for custom business logic or telemetry.",
				icon: "Cpu",
				color: "text-emerald-300",
			},
		],
		architecture: [
			{
				title: "Translation Engine",
				body: "Pure, transport-independent engine mapping properties across OCPP specification versions.",
			},
			{
				title: "Stateful Session Store",
				body: "Pluggable memory or clustered storage to persist identity state and transaction IDs.",
			},
			{
				title: "Middleware Hooks",
				body: "Intercept translation pipelines at 4 lifecycle points (pre/post upstream & downstream).",
			},
		],
	},
	{
		title: "OCPP Smart Charge Engine",
		description:
			"A library-agnostic OCPP smart-charging constraint solver that fairly and safely distributes a site's grid power across EV chargers via OCPP's SetChargingProfile command. Ships three strategies — Equal Share, Priority, and Time-of-Use — with profile builders for OCPP 1.6, 2.0.1, and 2.1, strict TypeScript types, and zero runtime dependencies.",
		technologies: [
			"TypeScript",
			"Node.js",
			"OCPP",
			"Smart Charging",
			"WebSockets",
		],
		github: "https://github.com/rohittiwari-dev/ocpp-smart-charge-engine",
		image: "/projects/smart-charge-engine.png",
		role: "Creator & Maintainer",
		demo: "https://ocpp-ws-io.rohittiwari.me/docs/smart-charge-engine",
		duration: "Mar 2026",
		status: "Published on npm",
		systemNotes: [
			"Distribute the site's grid power across active chargers without exceeding the connection limit or tripping breakers.",
			"Expose three interchangeable strategies — Equal Share, Priority, and Time-of-Use — for power allocation.",
			"Keep the core transport-agnostic so it drops into ocpp-ws-io, raw WebSockets, or any OCPP stack.",
			"Ship strict TypeScript types and zero runtime dependencies for a lean, predictable footprint.",
		],
		highlights: [
			{
				title: "Library-agnostic",
				body: "Zero opinions on your OCPP transport — works with ocpp-ws-io, raw WebSockets, or any other implementation.",
				icon: "Layers3",
				color: "text-cyan-300",
			},
			{
				title: "Three strategies",
				body: "Built-in Equal Share, Priority, and Time-of-Use constraint solvers with a configurable minimum charge rate per EV.",
				icon: "Cpu",
				color: "text-fuchsia-300",
			},
			{
				title: "Multi-protocol profiles",
				body: "SetChargingProfile and ClearChargingProfile builders for OCPP 1.6, 2.0.1, and 2.1 with auto-dispatch intervals.",
				icon: "ShieldCheck",
				color: "text-emerald-300",
			},
		],
		architecture: [
			{
				title: "Constraint Solver",
				body: "Calculates a safe, fair power distribution across active EVs while respecting the site's grid connection limit.",
			},
			{
				title: "Strategy Layer",
				body: "Pluggable Equal Share, Priority, and Time-of-Use strategies with per-EV minimum charge rates.",
			},
			{
				title: "Profile Builders",
				body: "Version-aware OCPP 1.6 / 2.0.1 / 2.1 charging-profile generators with auto-dispatch and clear-profile handling.",
			},
		],
	},
	{
		title: "OCPP WebSocket CLI",
		description:
			"A breathtakingly fast, immensely powerful suite of CLI tools for OCPP 1.6 / 2.0.1 / 2.1 charge point management systems. Features a terminal-based Virtual Charge Point, distributed load testing engine, server sent events mock server, production security auditing, and protocol chaos fuzzer.",
		technologies: [
			"TypeScript",
			"Node.js",
			"CLI",
			"WebSockets",
			"OCPP",
			"Load Testing",
		],
		github: "https://github.com/rohittiwari-dev/ocpp-ws-io/tree/main/packages/ocpp-ws-cli",
		demo: "https://ocpp-ws-io.rohittiwari.me/docs/cli",
		image: "/projects/ocpp-ws-cli.png",
		role: "Creator & Maintainer",
		duration: "Apr 2026",
		status: "Published on npm",
		systemNotes: [
			"Boot a fully interactive virtual charge point natively from the terminal.",
			"Track server throughput and sub-millisecond round-trip latencies during benchmarks.",
			"Execute distributed load testing engines mimicking thousands of concurrent stations.",
			"Deploy protocol fuzzers to validate real-world schema and DDOS resilience on your CSMS.",
		],
		highlights: [
			{
				title: "Terminal Emulation",
				body: "Fully interactive Virtual Charge Point with an auto-refreshing ASCII hardware dashboard.",
				icon: "ServerCog",
				color: "text-cyan-300",
			},
			{
				title: "Benchmarking UI",
				body: "Observe throughput and precise P99 latency percentiles updating live in your terminal.",
				icon: "Radar",
				color: "text-fuchsia-300",
			},
			{
				title: "Chaos & Fuzzing",
				body: "Protocol fuzzer sending malformed/invalid payloads to harden CSMS strict-mode.",
				icon: "ShieldCheck",
				color: "text-emerald-300",
			},
		],
		architecture: [
			{
				title: "Interactive Commands",
				body: "Extensive Clack prompts structuring complex benchmarking and simulation inputs effortlessly.",
			},
			{
				title: "Chaos Engine",
				body: "Worker-thread driven payload generation deliberately structured to violate schema limits.",
			},
			{
				title: "Metrics Pipeline",
				body: "Performance observer feeding real-time sub-millisecond tracking across the CLI dashboard.",
			},
		],
	},
	{
		title: "OCPP Web Simulator",
		description:
			"A production-ready browser-based charge point emulator built on Next.js. Emulates real charging stations visually without hardware, allowing you to seamlessly connect to a CSMS and manually trigger core OCPP workflows.",
		technologies: ["Next.js", "React", "TypeScript", "WebSockets", "OCPP"],
		github: "https://github.com/rohittiwari-dev/ocpp-ws-simulator",
		demo: "https://ocpp.rohittiwari.me",
		image: "/projects/ev-charger-simulator.png",
		role: "Creator & Maintainer",
		duration: "Jan 2026 – Feb 2026",
		status: "Live",
		systemNotes: [
			"Emulate real-world charging stations directly in the browser so backends can be tested interactively.",
			"Implement visual core OCPP workflows: BootNotification, Auth, Start/Stop Transaction, and interactive MeterValues sliders.",
			"Operate without CLI constraints — perfect for live demonstrations and complex multi-connector flows.",
		],
		highlights: [
			{
				title: "Visual Dashboard",
				body: "Emulate real-world stations for testing with a clean, fully functional Web UI.",
				icon: "Box",
				color: "text-cyan-300",
			},
			{
				title: "Interactive Workflows",
				body: "Sliders and controls for dynamic MeterValues and manual Start/Stop Transaction triggers.",
				icon: "Layers3",
				color: "text-fuchsia-300",
			},
			{
				title: "Protocol Ready",
				body: "Boot, Heartbeat, Authorize, and state-transitions managed seamlessly over a live WebSocket.",
				icon: "ShieldCheck",
				color: "text-emerald-300",
			},
		],
		architecture: [
			{
				title: "Next.js Frontend",
				body: "React-driven client connecting natively to Central Systems directly from the browser context.",
			},
			{
				title: "WebSockets Engine",
				body: "Isolated OCPP connection managers bridging UI state to active socket connections.",
			},
			{
				title: "Hardware Emulation",
				body: "Logical state machines decoupling charging profiles from the visual button triggers.",
			},
		],
	},
	{
		title: "Voltlog",
		description:
			"A modern, type-safe, zero-dependency structured logger built for high-throughput, real-time infrastructure such as IoT platforms and WebSocket servers. Isomorphic across Node.js, Bun, Deno, and the browser, with built-in middleware that automatically redacts sensitive data (PII, tokens) and configurable sampling that preserves 100% of errors while thinning high-volume debug noise.",
		technologies: ["TypeScript", "Node.js", "Bun", "Deno", "Observability"],
		github: "https://github.com/rohittiwari-dev/voltlog-io",
		demo: "https://ocpp-ws-io.rohittiwari.me/docs/voltlog-io",
		image: "/projects/voltlog.png",
		role: "Creator & Maintainer",
		duration: "Feb 2026",
		status: "Published on npm",
		systemNotes: [
			"Keep the core zero-dependency and lightweight enough to run in any JavaScript runtime.",
			"Run isomorphically across Node.js, Bun, Deno, and the browser without code changes.",
			"Redact sensitive data such as PII and tokens automatically via built-in middleware.",
			"Control log volume and cost with configurable sampling — keep every error, sample noisy debug logs.",
		],
		highlights: [
			{
				title: "Zero-Dependency Core",
				body: "An exceptionally lightweight footprint with no runtime dependency tree to drag around.",
				icon: "Layers3",
				color: "text-cyan-300",
			},
			{
				title: "Security-First",
				body: "Built-in middleware automatically redacts sensitive data — PII and tokens — before logs are emitted.",
				icon: "ShieldCheck",
				color: "text-fuchsia-300",
			},
			{
				title: "Intelligent Sampling",
				body: "Configurable strategies preserve 100% of errors while sampling a fraction of high-volume debug logs.",
				icon: "Cpu",
				color: "text-emerald-300",
			},
		],
		architecture: [
			{
				title: "Isomorphic Core",
				body: "Runs unchanged across Node.js, Bun, Deno, and the browser for consistent logging everywhere.",
			},
			{
				title: "Redaction Middleware",
				body: "Pluggable middleware that strips PII and secrets from log records before they leave the process.",
			},
			{
				title: "Sampling Engine",
				body: "Per-level sampling that keeps all errors while throttling noisy debug output to control cost.",
			},
		],
	},
	{
		title: "ocpp-ws-io",
		description:
			"An open-source, TypeScript-first OCPP-J WebSocket RPC library for Node.js with end-to-end type safety. Implements the full OCPP-J specification across 1.6, 2.0.1, and 2.1 with version-aware call() / handle() APIs, auto-generated types, all four OCPP security profiles, JSON-schema validation, auto-reconnect, and Redis-based clustering. Framework-agnostic — runs standalone or integrates with Express, Fastify, and NestJS.",
		technologies: [
			"TypeScript",
			"Node.js",
			"WebSockets",
			"Ajv",
			"Redis",
			"OCPP",
		],
		github: "https://github.com/rohittiwari-dev/ocpp-ws-io",
		demo: "https://ocpp-ws-io.rohittiwari.me",
		image: "/projects/ocpp-ws-io.png",
		role: "Creator & Maintainer",
		duration: "Feb 2026",
		status: "Published on npm",
		systemNotes: [
			"Implement OCPP-J RPC framing — Call, CallResult, and CallError — strictly per specification.",
			"Infer request and response types automatically based on the OCPP version in use.",
			"Support all four OCPP security profiles, from no security to mutual TLS with client certificates.",
			"Scale horizontally with a Redis-based clustering adapter compatible with ioredis and node-redis.",
		],
		highlights: [
			{
				title: "End-to-end Type Safety",
				body: "Version-aware call() and handle() APIs infer params and responses per OCPP version for full autocomplete.",
				icon: "ShieldCheck",
				color: "text-cyan-300",
			},
			{
				title: "Full OCPP-J RPC",
				body: "Spec-accurate Call / CallResult / CallError framing with every RPC error class exported.",
				icon: "Cpu",
				color: "text-fuchsia-300",
			},
			{
				title: "Production-grade",
				body: "Four security profiles, Ajv schema validation, auto-reconnect with backoff, and Redis clustering.",
				icon: "ServerCog",
				color: "text-emerald-300",
			},
		],
		architecture: [
			{
				title: "RPC Framing Engine",
				body: "Handles OCPP-J Call/CallResult/CallError message framing per specification.",
			},
			{
				title: "Version-aware Type System",
				body: "Auto-generated, per-version typed params and responses for compile-time validation.",
			},
			{
				title: "Clustering Adapter",
				body: "Redis-backed horizontal scaling with handleUpgrade integration for any HTTP server.",
			},
		],
	},
	{
		title: "API Studio",
		description:
			"A modern, self-hostable API testing and development tool built with Next.js 16 and React 19. Supports REST, GraphQL, WebSocket, Socket.IO, and Server-Sent Events with comprehensive authentication (Basic, Bearer, OAuth 1.0/2.0, Digest, API Key, HMAC), environment variables, collections, cookie management, code generation to 20+ languages, and real-time team collaboration.",
		technologies: [
			"Next.js",
			"React",
			"TypeScript",
			"PostgreSQL",
			"Prisma",
			"Better Auth",
			"shadcn/ui",
			"Tailwind CSS",
			"RTK Query",
			"zod",
		],
		github: "https://github.com/rohittiwari-dev/api-studio",
		demo: "https://apistudio.rohittiwari.me",
		image: "/projects/api-studio.png",
		role: "Creator & Maintainer",
		duration: "Nov 2025 – Jan 2026",
		status: "Live",
		systemNotes: [
			"Support REST, GraphQL, WebSocket, Socket.IO, and Server-Sent Events from a single client.",
			"Cover the full auth matrix: Basic, Bearer, OAuth 1.0/2.0, Digest, API Key, and HMAC.",
			"Manage environments with {{variable}} syntax, collections, and an automatic cookie jar.",
			"Generate request code for 20+ languages and frameworks, and self-host via Docker.",
		],
		highlights: [
			{
				title: "Multi-protocol",
				body: "REST, GraphQL, WebSocket, Socket.IO, and SSE testing unified in one developer-first client.",
				icon: "Layers3",
				color: "text-cyan-300",
			},
			{
				title: "Comprehensive Auth",
				body: "Basic, Bearer, OAuth 1.0/2.0, Digest, API Key, and HMAC authentication out of the box.",
				icon: "ShieldCheck",
				color: "text-fuchsia-300",
			},
			{
				title: "Self-hostable",
				body: "Deploy on your own infrastructure with Docker and share workspaces in real time with your team.",
				icon: "ServerCog",
				color: "text-emerald-300",
			},
		],
		architecture: [
			{
				title: "Next.js 16 App Router",
				body: "React 19 front end with shadcn/ui + Radix UI, Tailwind CSS, and Motion animations.",
			},
			{
				title: "Request Engine",
				body: "Multi-protocol client with environments, collections, and cookie-jar management.",
			},
			{
				title: "Persistence & Auth",
				body: "PostgreSQL via Prisma with Better Auth for accounts and shared collaborative workspaces.",
			},
		],
	},
	{
		title: "Project Management System",
		description:
			"A full-stack project management application built with React, TypeScript, Node.js, and MongoDB. This system provides comprehensive workspace management, project tracking, and task organization with role-based access control.",
		technologies: [
			"Next.js",
			"React",
			"TypeScript",
			"PostgreSQL",
			"Prisma",
			"Better Auth",
			"shadcn/ui",
			"Tailwind CSS",
			"RTK Query",
			"zod",
		],
		github: "https://github.com/rohittiwari-dev/project-management-server",
		role: "Solo Developer",
		duration: "Jan 2026 – Jan 2026",
		status: "Completed",
		demo: "https://pms.rohittiwari.me",
		image: "/projects/project-management-system.webp",
	},
	{
		title: "NoteSpace",
		description:
			'A Next.js note-taking app with a rich, WYSIWYG slash-command ("/") editor and multi-organization support — users can create organizations, invite teammates, and manage all their notes from a single dashboard. Planned scope: real-time collaborative editing and a Trello-style task board for a student mindspace.',
		technologies: [
			"Next.js",
			"React",
			"TypeScript",
			"Cloudinary",
			"tRpc",
			"Tailwind CSS",
			"Wizywig Editor",
		],
		github: "https://github.com/rohittiwari-dev/notespace",
		image: "/projects/notespace.png",
		role: "Solo Developer",
		duration: "Aug 2025 – Oct 2025",
		status: "Completed",
		demo: "https://devnotespace.netlify.app/",
		highlights: [
			{
				title: "Slash-command Editor",
				body: 'A rich WYSIWYG editor with a "/" command palette for fast, structured note authoring.',
				icon: "Zap",
				color: "text-cyan-300",
			},
			{
				title: "Organizations",
				body: "Multi-organization workspaces where users can invite people and collaborate.",
				icon: "Layers3",
				color: "text-fuchsia-300",
			},
			{
				title: "Notes Dashboard",
				body: "A unified dashboard surfacing all of a user's notes across their organizations.",
				icon: "Database",
				color: "text-emerald-300",
			},
		],
	},
	{
		title: "Scheduler",
		description:
			"Automated scheduling software that makes finding meeting times easy: connect your calendar, choose which calendars Scheduler checks, and define meeting durations for others to book — no back-and-forth required.",
		technologies: ["Next.js", "React", "TypeScript"],
		github: "https://github.com/rohittiwari-dev/scheduler-app",
		image: "/projects/scheduler.png",
		role: "Solo Developer",
		demo: "https://devschedule.netlify.app/",
		duration: "Sep 2023",
		status: "Completed",
	},
	{
		title: "Code Screenshot Maker",
		description:
			"A web tool that turns code into polished screenshot images, with automatic language detection, 10+ themes, 15+ supported languages, and 6+ customization options to fine-tune the look and feel of each shot.",
		technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
		github: "https://github.com/rohittiwari-dev/codeshare",
		image: "/projects/code-screenshot-maker.png",
		role: "Solo Developer",
		duration: "Aug 2023",
		demo: "https://codeshare.rohittiwari.me",
		status: "Completed",
	},
	{
		title: "NirvanaMeet — Business & Partner Portals",
		description:
			"As an intern at Niladvantage Technologies, built the Business and Partner web portals for NirvanaMeet, a video-conferencing platform, and integrated the Cashfree payment gateway for in-app payments.",
		technologies: [
			"Next.js",
			"React",
			"Node.js",
			"Tailwind CSS",
			"Material UI",
			"MongoDB",
		],
		image: "/projects/nirvanameet.png",
		role: "Full-Stack Developer (Intern)",
		duration: "Jul 2022 – Feb 2023",
		status: "Completed",
		demo: "https://niladvantage.com/nirvanameet",
	},
	{
		title: "Web3 Twitter Clone with NFT Profiles",
		description:
			"A Twitter clone with posts, comments, likes, and profiles — plus cover/profile image uploads and NFT-enabled profile images backed by a Solidity smart contract, MetaMask, and Alchemy. Built on Next.js with Firebase Firestore and Storage.",
		technologies: [
			"Next.js",
			"React",
			"Firebase",
			"Solidity",
			"Web3",
			"Alchemy",
		],
		github: "https://github.com/rohittiwari-dev/twitter-clone",
		image: "/projects/twitter.webp",
		role: "Solo Developer",
		duration: "Jan 2023 – Feb 2023",
		demo: "https://twitterrohit.netlify.app/login",
		status: "Completed",
	},
	{
		title: "Video Classification & Metadata Generation (SIH)",
		description:
			"An ISRO problem statement built for the Smart India Hackathon: a Python deep-learning pipeline using CNNs and RNNs to interpret video frames, classify the video, and generate metadata as CSV. Built with OpenCV, Pandas, and TensorFlow.",
		technologies: [
			"Python",
			"TensorFlow",
			"OpenCV",
			"Pandas",
			"Deep Learning",
		],
		github: "https://github.com/rohittiwari-dev/video-classification-metadata-generation",
		image: "/projects/video-classification.webp",
		role: "Developer — Smart India Hackathon",
		duration: "Mar 2022 – Jun 2022",
		status: "Completed",
	},
	{
		title: "Library Management System",
		description:
			"A desktop library management system with full offline functionality — book inventory and report generation for all book transactions. Built with Java (JDBC, Swing) and SQLite, packaged as a standalone installer bundling the JRE.",
		technologies: ["Java", "JDBC", "Java Swing", "SQLite"],
		github: "https://github.com/rohittiwari-dev/library-management-system",
		image: "/projects/library-management-system.webp",
		role: "Solo Developer",
		duration: "Jun 2021 – Jul 2021",
		status: "Completed",
	},
	{
		title: "Command-Based Voice Assistant",
		description:
			"A Python voice assistant built during COVID to automate day-to-day tasks — answering questions and pulling information from the web using libraries like pyttsx3, SpeechRecognition, Wikipedia, and pywhatkit.",
		technologies: ["Python", "SpeechRecognition", "pyttsx3", "pywhatkit"],
		github: "https://github.com/rohittiwari-dev/JARVIS-Desktop-Voice-Assistance",
		image: "/projects/command-based-voice-assistant.webp",
		role: "Solo Developer",
		duration: "May 2020 – Jul 2020",
		status: "Completed",
	},
	{
		title: "Bank Management System",
		description:
			"A console-based bank management application in C++ with offline functionality — account creation with Aadhaar validation, per-field validation, and money/account transaction management, persisted via file-based I/O streams.",
		technologies: ["C++", "File I/O"],
		github: "https://github.com/rohittiwari-dev/bank-management-system",
		image: "/projects/bank-management-system.webp",
		role: "Solo Developer",
		duration: "Nov 2019 – Jan 2020",
		status: "Completed",
	},
	{
		title: "School Council Election System",
		description:
			"A student council election system with offline functionality — adding candidates, casting votes against existing admission numbers, and generating election results. Built with Java (JDBC, JavaFX) and a MySQL database.",
		technologies: ["Java", "JDBC", "JavaFX", "MySQL"],
		github: "https://github.com/rohittiwari-dev/student-election-system",
		role: "Solo Developer",
		duration: "Dec 2017 – Jan 2018",
		status: "Completed",
	},
];

export const OPEN_SOURCE_PROJECTS = [
	{
		name: "OqronKit",
		description:
			"A crash-safe, adapter-driven background job engine for Node.js. Queues, workers, schedulers, and pub/sub.",
		url: "https://github.com/rohittiwari-dev/oqronkit",
	},
	{
		name: "rollease",
		description:
			"Framework-agnostic feature flag SDK — targeting rules, rollouts, releases. Server and client on the same plane.",
		url: "https://github.com/rohittiwari-dev/rollease",
	},
	{
		name: "ocpp-protocol-proxy",
		description:
			"Transport-agnostic OCPP version translation proxy supporting any-to-any translation (1.6 ↔ 2.1) with middleware.",
		url: "https://npmx.dev/package/ocpp-protocol-proxy",
	},
	{
		name: "ocpp-ws-cli",
		description:
			"The ultimate CLI ecosystem for OCPP-J — terminal simulator, benchmark engine, and protocol fuzzer.",
		url: "https://npmx.dev/package/ocpp-ws-cli",
	},
	{
		name: "ocpp-ws-simulator",
		description:
			"Browser-based visual Charge Point Emulator built with Next.js bridging directly to your CSMS via WebSocket.",
		url: "https://github.com/rohittiwari-dev/ocpp-ws-simulator",
	},
	{
		name: "ocpp-ws-io",
		description:
			"Type-safe OCPP-J WebSocket RPC library for Node.js — version-aware APIs, schema validation, and Redis clustering.",
		url: "https://github.com/rohittiwari-dev/ocpp-ws-io",
	},
	{
		name: "ocpp-smart-charge-engine",
		description:
			"Library-agnostic OCPP smart-charging constraint solver with Equal Share, Priority, and Time-of-Use strategies.",
		url: "https://github.com/rohittiwari-dev/ocpp-smart-charge-engine",
	},
	{
		name: "voltlog-io",
		description:
			"Modern, type-safe, zero-dependency structured logger built for high-throughput, real-time infrastructure.",
		url: "https://github.com/rohittiwari-dev/voltlog-io",
	},
	{
		name: "ocpp-rpc",
		description:
			"A robust WAMP-like RPC-over-websocket implementation for all OCPP protocols. Contributed to security logic.",
		url: "https://github.com/mikuso/ocpp-rpc",
	},
	{
		name: "coolify",
		description:
			"An open-source & self-hostable Heroku / Netlify / Vercel alternative. Contributor to core features.",
		url: "https://github.com/coollabsio/coolify",
	},
	{
		name: "motion-primitives",
		description:
			"A UI kit featuring beautifully designed motion components for rapid interface development. Contributor to core components.",
		url: "https://motion-primitives.com/",
	},
];
