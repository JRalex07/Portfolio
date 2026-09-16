export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "Distributed Ecosystem" | "Agentic Systems" | "Mobile Engineering" | "Backend Systems" | "E-Commerce";
  badge: string;
  problem: string;
  solution: string;
  architectureDetails: string[];
  keyFeatures: string[];
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  secondaryUrl?: { label: string; url: string };
  isFeatured: boolean;
}

export const projects: Project[] = [
  {
    id: "cloudpower-ecosystem",
    title: "CloudPower Multi-App E-Commerce & Logistics Ecosystem",
    subtitle: "Production commercial infrastructure coordinating 6 specialized operational interfaces",
    category: "Distributed Ecosystem",
    badge: "Core Architecture Case Study",
    problem: "Commercial platforms frequently fracture into disconnected silos where consumer checkout, merchant stock, courier dispatch, field sales, and support dispute handling operate on disjointed schemas and unsynchronized states, causing ghost orders and operational chaos.",
    solution: "Engineered a unified multi-tier application ecosystem where six dedicated frontend applications (Consumer, Merchant, Admin, Support, Rider, Salesman) interface with a centralized event-driven orchestration layer, maintaining strict state transition guarantees across the complete order and fulfillment lifecycle.",
    architectureDetails: [
      "Event-Driven Order Broker: High-throughput ingestion of client intents with idempotency keys preventing duplicate payments.",
      "Dedicated Role Applications: Native Flutter client for mobile consumers and field couriers; high-density React web portals for inventory management, administrative governance, and support intervention.",
      "Real-Time Bi-Directional State Sync: WebSocket channels delivering instantaneous alerts to merchants and GPS tracking coordinates to consumer devices.",
      "Offline-First Field Resilience: SQLite-backed caching in the Salesman Field Unit enabling merchant onboarding and territory audit under intermittent network coverage."
    ],
    keyFeatures: [
      "6 Synchronized Applications: Consumer, Merchant, Admin, Support, Rider, and Salesman",
      "Interactive Order Lifecycle State Machine: ORDER_CREATED → PREPPED → DISPATCHED → OTP_VERIFIED",
      "Live Consumer Web Store deployed at cloudpower.store",
      "Central Documentation & Specification Hub deployed at info.cloudpower.store"
    ],
    technologies: ["Flutter", "Dart", "TypeScript", "React", "Python", "WebSocket", "REST API", "SQLite", "Power BI"],
    liveUrl: "https://cloudpower.store",
    secondaryUrl: {
      label: "Ecosystem Hub (info.cloudpower.store)",
      url: "https://info.cloudpower.store"
    },
    githubUrl: "https://github.com/JRalex07",
    isFeatured: true
  },
  {
    id: "himamrit-shop",
    title: "Himamrit Shop E-Commerce Platform",
    subtitle: "Production digital retail storefront with optimized catalog discovery and frictionless checkout",
    category: "E-Commerce",
    badge: "Live Retail Platform",
    problem: "Modern retail storefronts often experience high bounce rates and abandonment due to heavy bundle payloads, clunky multi-step checkouts, and unreliable client-side cart synchronization across devices.",
    solution: "Architected and deployed a blazing-fast, responsive e-commerce web platform at himamritshop.in featuring instant client-side product filtering, persistent reactive shopping bag state, and clean payment orchestration.",
    architectureDetails: [
      "Dynamic Product Discovery: Optimized search queries and fast client-side indexing for instant product filtering.",
      "Synchronized Cart Pipeline: Unidirectional cart dispatchers ensuring zero item loss across page refreshes.",
      "Mobile-First Layout: Architectural responsive views providing app-like fluidity on mobile browsers.",
      "Secure Gateway Handshake: Verified payment processing with automated customer notification dispatch."
    ],
    keyFeatures: [
      "Live production deployment at himamritshop.in",
      "Sub-second catalog browsing and category navigation",
      "Fluid, responsive mobile and desktop checkout flow",
      "Clean semantic architecture with zero performance bloat"
    ],
    technologies: ["React", "TypeScript", "REST APIs", "Modern CSS", "Web Performance"],
    liveUrl: "https://himamritshop.in",
    githubUrl: "https://github.com/JRalex07",
    isFeatured: true
  },
  {
    id: "cloudpower-info-hub",
    title: "CloudPower Ecosystem Information & Documentation Portal",
    subtitle: "Centralized architecture documentation, merchant onboarding guides, and service specifications",
    category: "Distributed Ecosystem",
    badge: "Architecture & Docs Hub",
    problem: "Operating a multi-application commerce suite requires consistent documentation for merchants, logistics couriers, and administrators to understand integration endpoints, commission structures, and platform operational policies.",
    solution: "Designed and launched the dedicated CloudPower Information Portal at info.cloudpower.store, delivering comprehensive guides, interactive system diagrams, and onboarding workflows.",
    architectureDetails: [
      "Modular Content Topology: Structured guides covering each specialized role in the CloudPower ecosystem.",
      "Interactive Integration Specs: Clear endpoint contracts and state lifecycle documentation.",
      "High-Performance Edge Deployment: Cached global assets ensuring instant documentation lookup."
    ],
    keyFeatures: [
      "Live production portal at info.cloudpower.store",
      "End-to-end merchant and logistics onboarding specifications",
      "Integrated architectural guidelines for the 6-application suite"
    ],
    technologies: ["React", "TypeScript", "Vite", "Modern CSS", "Cloud Hosting"],
    liveUrl: "https://info.cloudpower.store",
    githubUrl: "https://github.com/JRalex07",
    isFeatured: false
  },
  {
    id: "agentic-mcp-sandbox",
    title: "Model Context Protocol (MCP) Agent Execution Framework",
    subtitle: "Deterministic agent runtime environment with policy-governed tool execution",
    category: "Agentic Systems",
    badge: "Agentic Architecture",
    problem: "Autonomous AI agents executing arbitrary scripts or interacting with enterprise APIs risk non-deterministic failure loops, context window pollution, and unmonitored side-effects when lacking formal isolation boundaries.",
    solution: "Constructed an MCP-compliant agent execution harness featuring formal schema validation, isolated tool execution sandboxes, structured reflection loops, and end-to-end execution telemetry.",
    architectureDetails: [
      "MCP Protocol Implementation: Standardized JSON-RPC 2.0 communication between LLM client runtimes and localized service tools.",
      "Defensive Execution Sandbox: Policy-based authorization checks restricting system resource mutations.",
      "State & Context Management: Dynamic token-budget allocator pruning stale conversation history while preserving critical environment variables.",
      "Automated SDLC Verification: Tracing hooks capturing tool inputs, outputs, latency, and error states for iterative regression evaluation."
    ],
    keyFeatures: [
      "Strict Model Context Protocol (MCP) compliance",
      "Dynamic tool registration with automated JSON-Schema generation",
      "Autonomous error recovery loops with context window guardrails",
      "Structured telemetry logging for agent run inspection"
    ],
    technologies: ["Python", "TypeScript", "MCP Specification", "C# Runtime", "JSON-RPC", "Docker"],
    githubUrl: "https://github.com/JRalex07",
    isFeatured: false
  },
  {
    id: "flutter-mobile-suite",
    title: "Reactive Mobile Application Suite",
    subtitle: "Production cross-platform mobile architectures with robust state lifecycles",
    category: "Mobile Engineering",
    badge: "Cross-Platform Engineering",
    problem: "Mobile applications that rely on naive state patterns quickly suffer from UI thread stutters, memory leaks during screen navigation, and inconsistent offline states during device network transitions.",
    solution: "Designed and implemented robust Flutter mobile clients leveraging reactive state containers, declarative component trees, hardware sensor abstraction layers (geolocator, camera, secure storage), and native method channel bridges.",
    architectureDetails: [
      "Unidirectional Data Flow: Predictable state transitions shielding UI components from direct data mutations.",
      "Hardware Sensor Abstraction: Background geolocation streams optimized for battery preservation during courier transit.",
      "Optimistic UI & Cache Synchronization: Instant user feedback with automatic background reconciliation upon network re-establishment.",
      "Custom Render Performance: Minimized widget rebuild costs using targeted keys and immutable value equality."
    ],
    keyFeatures: [
      "Flutter & Dart production architecture",
      "Resilient background geolocation streaming",
      "Local storage encryption and token lifecycle handling",
      "Responsive layout adaptation across compact phones and tablet surfaces"
    ],
    technologies: ["Flutter", "Dart", "BLoC / Provider", "SQLite", "REST APIs", "Native Channels"],
    githubUrl: "https://github.com/JRalex07",
    isFeatured: false
  }
];
