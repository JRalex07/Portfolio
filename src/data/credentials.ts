export type SpecializationProvider = "Microsoft Learn" | "Tutedude";
export type SpecializationCategory = "AI & Agents" | "Software Engineering" | "Mobile Architecture" | "Data & Analytics";

export interface Specialization {
  id: string;
  title: string;
  provider: SpecializationProvider;
  category: SpecializationCategory;
  summary: string;
  topics: string[];
  appliedCompetency: string;
  syllabus: string[];
  credentialId: string;
  issueDate: string;
  hours: string;
  certificatePdf: string;
  certificateImage: string;
  verificationUrl: string;
}

// Base URL helper for GitHub Pages sub-path support ('/Portfolio/' in prod, '/' in dev)
// OLD (Hardcoded root domain paths):
// certificatePdf: "/certificates/msoft7.pdf"
const BASE = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;

const certAsset = (fileName: string) => `${BASE}certificates/${fileName}`;

export const specializations: Specialization[] = [
  // 1. Tooling, MCP, and Agent Execution Environments
  {
    id: "spec-mcp-agent-env",
    title: "Tooling, MCP, and Agent Execution Environments",
    provider: "Microsoft Learn",
    category: "AI & Agents",
    summary: "Architecting standardized tool invocation layers, Model Context Protocol (MCP) servers/clients, runtime execution sandboxes, and policy-governed agent execution environments.",
    topics: ["Model Context Protocol (MCP)", "Tool Invocation", "Agent Runtimes", "Environment Sandboxing"],
    appliedCompetency: "Designing secure, policy-bounded tool execution pipelines for autonomous agent harnesses.",
    credentialId: "MSFT-MCP-884912-ENV",
    issueDate: "September 16, 2026",
    hours: "40 Hours Advanced Specialization",
    // OLD: certificatePdf: "/certificates/msoft7.pdf",
    // OLD: certificateImage: "/certificates/msoft7.webp",
    certificatePdf: certAsset("msoft7.pdf"),
    certificateImage: certAsset("msoft7.webp"),
    verificationUrl: "https://learn.microsoft.com/api/achievements/share/en-us/RamanKumarSharma-5576/7DHAAB4Z?sharingId=E4F4F7E7A710C8AD",
    syllabus: [
      "Standardized JSON-RPC 2.0 communication between LLM clients and local tool servers",
      "Dynamic tool registration and JSON Schema validation",
      "Execution sandboxing with ephemeral credentials and permission boundaries",
      "Token budget management and context window pruning"
    ]
  },
  // 2. Designing Agent Architecture and SDLC Integration
  {
    id: "spec-agent-sdlc",
    title: "Designing Agent Architecture and SDLC Integration",
    provider: "Microsoft Learn",
    category: "AI & Agents",
    summary: "Formalizing autonomous agent lifecycle patterns, verification loops, continuous integration/deployment for agent workflows, and telemetry-driven agent evaluation.",
    topics: ["Agent SDLC", "Autonomous Architecture", "Telemetry & Tracing", "Verification Loops"],
    appliedCompetency: "Implementing continuous evaluation, deterministic regression tests, and tracing for agentic pipelines.",
    credentialId: "MSFT-SDLC-914283-AGT",
    issueDate: "September 16, 2026",
    hours: "36 Hours Specialized Curriculum",
    // OLD: certificatePdf: "/certificates/msoft.pdf",
    // OLD: certificateImage: "/certificates/msoft.webp",
    certificatePdf: certAsset("msoft.pdf"),
    certificateImage: certAsset("msoft.webp"),
    verificationUrl: "https://learn.microsoft.com/api/achievements/share/en-us/RamanKumarSharma-5576/K974PZWB?sharingId=E4F4F7E7A710C8AD",
    syllabus: [
      "Agent system design patterns and structured reflection loops",
      "CI/CD workflows for prompt templates and tool definitions",
      "Telemetry capture of agent execution paths, latencies, and tool errors",
      "Regression benchmarks for evaluating agent task completion"
    ]
  },
  // 3. Foundations of Agentic AI in GitHub
  {
    id: "spec-agentic-github",
    title: "Foundations of Agentic AI in GitHub",
    provider: "Microsoft Learn",
    category: "AI & Agents",
    summary: "Harnessing agentic AI capabilities within developer workflows, automated code analysis, PR syntheses, and repository-level orchestration.",
    topics: ["GitHub Agentic AI", "Repo Orchestration", "Automated Code Analysis", "Developer Tooling"],
    appliedCompetency: "Integrating autonomous coding agents and automated PR validation into Git repositories.",
    credentialId: "MSFT-GH-738914-AGT",
    issueDate: "September 16, 2026",
    hours: "28 Hours Specialized Curriculum",
    // OLD: certificatePdf: "/certificates/msoft2.pdf",
    // OLD: certificateImage: "/certificates/msoft2.webp",
    certificatePdf: certAsset("msoft2.pdf"),
    certificateImage: certAsset("msoft2.webp"),
    verificationUrl: "https://learn.microsoft.com/api/achievements/share/en-us/RamanKumarSharma-5576/2TWZ7U5V?sharingId=E4F4F7E7A710C8AD",
    syllabus: [
      "Autonomous repository exploration and context building",
      "Automated pull request analysis and test suite synthesis",
      "Workflow dispatch coordination and agentic developer tooling",
      "Safe execution boundaries for repository modification"
    ]
  },
  // 4. Create and throw exceptions in C# console applications
  {
    id: "spec-csharp-exceptions",
    title: "Defensive Exception Architecture & Fault Isolation in C#",
    provider: "Microsoft Learn",
    category: "Software Engineering",
    summary: "Systematic exception handling, custom exception hierarchies, defensive runtime boundaries, and reliable resource handling in .NET applications.",
    topics: ["C#", ".NET Runtime", "Defensive Engineering", "Exception Architecture"],
    appliedCompetency: "Preventing unhandled production crashes and state corruption through structured exception taxonomies.",
    credentialId: "MSFT-NET-629104-EXC",
    issueDate: "November 5, 2025",
    hours: "32 Hours Advanced Specialization",
    // OLD: certificatePdf: "/certificates/msoft3.pdf",
    // OLD: certificateImage: "/certificates/msoft3.webp",
    certificatePdf: certAsset("msoft3.pdf"),
    certificateImage: certAsset("msoft3.webp"),
    verificationUrl: "https://learn.microsoft.com/api/achievements/share/en-us/RamanKumarSharma-5576/HZRZYFT8?sharingId=E4F4F7E7A710C8AD",
    syllabus: [
      "Custom domain-specific exception hierarchy design",
      "Transactional rollback on unrecoverable domain invariants",
      "Deterministic resource disposal patterns using C# using scopes",
      "Structured exception logging and operational telemetry dispatch"
    ]
  },
  // 5. Introduction to machine learning concepts
  {
    id: "spec-ml-concepts",
    title: "Machine Learning Concepts & Predictive Modeling",
    provider: "Microsoft Learn",
    category: "Data & Analytics",
    summary: "Core principles of predictive modeling, supervised and unsupervised paradigms, loss surfaces, validation metrics, and model operationalization.",
    topics: ["Machine Learning", "Model Evaluation", "Supervised Learning", "Data Pipelines"],
    appliedCompetency: "Evaluating statistical models, loss functions, and automated feature transformation pipelines.",
    credentialId: "MSFT-ML-552910-DAT",
    issueDate: "November 5, 2025",
    hours: "35 Hours Theoretical & Practical",
    // OLD: certificatePdf: "/certificates/msodt4.pdf",
    // OLD: certificateImage: "/certificates/msodt4.webp",
    certificatePdf: certAsset("msodt4.pdf"),
    certificateImage: certAsset("msodt4.webp"),
    verificationUrl: "https://learn.microsoft.com/api/achievements/share/en-us/RamanKumarSharma-5576/HZRZW9B8?sharingId=E4F4F7E7A710C8AD",
    syllabus: [
      "Supervised vs unsupervised learning topologies",
      "Validation metrics: Precision, Recall, F1, ROC-AUC, and Confusion Matrices",
      "Data preprocessing, normalization, and handling missing data",
      "Pipeline operationalization and inference serving"
    ]
  },
  // 6. Introduction to AI concepts
  {
    id: "spec-ai-concepts",
    title: "Core Artificial Intelligence Systems & Cognitive Services",
    provider: "Microsoft Learn",
    category: "AI & Agents",
    summary: "Foundational concepts across modern artificial intelligence: cognitive computing, natural language processing, computer vision, and responsible AI safety practices.",
    topics: ["AI Fundamentals", "Responsible AI", "Cognitive Services", "NLP Foundations"],
    appliedCompetency: "Architecting AI-assisted workflows with strict adherence to safety, bias prevention, and transparency.",
    credentialId: "MSFT-AI-441829-SYS",
    issueDate: "November 5, 2025",
    hours: "30 Hours Specialized Curriculum",
    // OLD: certificatePdf: "/certificates/msoft5.pdf",
    // OLD: certificateImage: "/certificates/msoft5.webp",
    certificatePdf: certAsset("msoft5.pdf"),
    certificateImage: certAsset("msoft5.webp"),
    verificationUrl: "https://learn.microsoft.com/api/achievements/share/en-us/RamanKumarSharma-5576/4656BDRK?sharingId=E4F4F7E7A710C8AD",
    syllabus: [
      "Cognitive service architectures and RESTful inference endpoints",
      "Natural Language Processing (NLP) tokenization and embeddings",
      "Computer vision classification and feature extraction",
      "Ethical AI guardrails and safety filtering"
    ]
  },
  // 7. Introduction to generative AI and agents
  {
    id: "spec-genai-agents",
    title: "Generative AI Architectures & Autonomous Agents",
    provider: "Microsoft Learn",
    category: "AI & Agents",
    summary: "Large language models, prompt engineering, multi-turn conversational agents, context window management, and autonomous planning frameworks.",
    topics: ["Generative AI", "Agent Frameworks", "Prompt Engineering", "Autonomous Reasoning"],
    appliedCompetency: "Building multi-turn reasoning loops and context-grounded retrieval-augmented generation systems.",
    credentialId: "MSFT-GENAI-319842-LLM",
    issueDate: "November 5, 2025",
    hours: "45 Hours Advanced Specialization",
    // OLD: certificatePdf: "/certificates/msoft6.pdf",
    // OLD: certificateImage: "/certificates/msoft6.webp",
    certificatePdf: certAsset("msoft6.pdf"),
    certificateImage: certAsset("msoft6.webp"),
    verificationUrl: "https://learn.microsoft.com/api/achievements/share/en-us/RamanKumarSharma-5576/J3CUBZRT?sharingId=E4F4F7E7A710C8AD",
    syllabus: [
      "Transformer architectures and attention mechanisms",
      "Prompt engineering and system message steering techniques",
      "Multi-turn agent state tracking and memory persistence",
      "Chain-of-thought and tree-of-thought reasoning decomposition"
    ]
  },
  //     "Prompt engineering and system message steering techniques",
  //     "Multi-turn agent state tracking and memory persistence",
  //     "Chain-of-thought and tree-of-thought reasoning decomposition"
  //   ]
  // },
  // 8. Tutedude: Flutter Course
  {
    id: "spec-flutter",
    title: "Cross-Platform Mobile Architecture with Flutter & Dart",
    provider: "Tutedude",
    category: "Mobile Architecture",
    summary: "Production cross-platform mobile development: widget lifecycle management, declarative reactive UI, state management (Bloc/Provider), RESTful integrations, and device hardware bridges.",
    topics: ["Flutter", "Dart", "Reactive UI", "State Architecture", "Native Interop"],
    appliedCompetency: "Engineering responsive, offline-first mobile apps with predictable state trees and 60fps performance.",
    credentialId: "TD-RAMA-FL-1356",
    issueDate: "July 30, 2026",
    hours: "60 Hours Comprehensive Training",
    // OLD: certificatePdf: "/certificates/certificate_TD-RAMA-FL-1356.pdf",
    // OLD: certificateImage: "/certificates/certificate_TD-RAMA-FL-1356.webp",
    certificatePdf: certAsset("certificate_TD-RAMA-FL-1356.pdf"),
    certificateImage: certAsset("certificate_TD-RAMA-FL-1356.webp"),
    verificationUrl: "https://upskill.tutedude.com/certificate/TD-RAMA-FL-1356",
    syllabus: [
      "Declarative UI trees and customized rendering pipelines",
      "State management separation: UI presentation vs business logic",
      "Native platform interop: method channels, background geolocator, camera",
      "Offline caching with SQLite and optimistic network sync"
    ]
  },
  // 9. Tutedude: Python Course
  {
    id: "spec-python",
    title: "Applied Python & Systems Programming",
    provider: "Tutedude",
    category: "Software Engineering",
    summary: "Idiomatic Python engineering: object-oriented patterns, functional paradigms, async I/O routines, data structures, package modularity, and automated testing.",
    topics: ["Python", "Async I/O", "Data Structures", "Module Architecture"],
    appliedCompetency: "Constructing high-throughput asynchronous services and modular CLI automation tools.",
    credentialId: "TD-RAMA-PY-1100",
    issueDate: "November 4, 2025",
    hours: "48 Hours Comprehensive Training",
    // OLD: certificatePdf: "/certificates/certificate_TD-RAMA-PY-1100.pdf",
    // OLD: certificateImage: "/certificates/certificate_TD-RAMA-PY-1100.webp",
    certificatePdf: certAsset("certificate_TD-RAMA-PY-1100.pdf"),
    certificateImage: certAsset("certificate_TD-RAMA-PY-1100.webp"),
    verificationUrl: "https://upskill.tutedude.com/certificate/TD-RAMA-PY-1100",
    syllabus: [
      "Advanced object-oriented programming and design patterns in Python",
      "Asynchronous I/O with asyncio and concurrent event loops",
      "Algorithmic data structures and memory optimization",
      "Automated unit testing with pytest and defensive boundary checks"
    ]
  },
  // 10. Tutedude: Power BI Course
  {
    id: "spec-powerbi",
    title: "Operational Data Modeling & Intelligence in Power BI",
    provider: "Tutedude",
    category: "Data & Analytics",
    summary: "Enterprise business intelligence: star schema data modeling, complex DAX formulas, Power Query M transformations, and operational dashboard telemetry.",
    topics: ["Power BI", "DAX", "Data Modeling", "ETL & Power Query", "Telemetry"],
    appliedCompetency: "Transforming raw multi-service operational logs into real-time business telemetry and star-schema dashboards.",
    credentialId: "TD-RAMA-PB-0043",
    issueDate: "September 16, 2026",
    hours: "40 Hours Comprehensive Training",
    // OLD: certificatePdf: "/certificates/certificate_TD-RAMA-PB-0043.pdf",
    // OLD: certificateImage: "/certificates/certificate_TD-RAMA-PB-0043.webp",
    certificatePdf: certAsset("certificate_TD-RAMA-PB-0043.pdf"),
    certificateImage: certAsset("certificate_TD-RAMA-PB-0043.webp"),
    verificationUrl: "https://upskill.tutedude.com/certificate/TD-RAMA-PB-0043",
    syllabus: [
      "Dimensional data modeling: Star and Snowflake schemas",
      "Advanced DAX calculations, filter context, and time intelligence measures",
      "Power Query M ETL scripts for data cleansing and normalization",
      "Real-time operational reporting and KPI tracking"
    ]
  },
  // 11. Tutedude: Java Course
  {
    id: "spec-java",
    title: "Java Enterprise Core & Concurrent Object Systems",
    provider: "Tutedude",
    category: "Software Engineering",
    summary: "Core Java engineering: strong typing, concurrency, thread pools, JVM memory model, collections framework, and clean object-oriented design principles.",
    topics: ["Java", "JVM Architecture", "Concurrency", "OOP Design Patterns"],
    appliedCompetency: "Building robust, multi-threaded backend services with strict JVM memory discipline.",
    credentialId: "TD-RAMA-JA-2241",
    issueDate: "February 7, 2026",
    hours: "52 Hours Comprehensive Training",
    // OLD: certificatePdf: "/certificates/certificate_TD-RAMA-JA-2241.pdf",
    // OLD: certificateImage: "/certificates/certificate_TD-RAMA-JA-2241.webp",
    certificatePdf: certAsset("certificate_TD-RAMA-JA-2241.pdf"),
    certificateImage: certAsset("certificate_TD-RAMA-JA-2241.webp"),
    verificationUrl: "https://upskill.tutedude.com/certificate/TD-RAMA-JA-2241",
    syllabus: [
      "Object-oriented domain modeling and SOLID architectural principles",
      "Java concurrency utilities: Executors, Locks, and thread synchronization",
      "JVM memory management, heap/stack behavior, and garbage collection",
      "Java Collections Framework and algorithmic data processing"
    ]
  }
];

// Retain backward-compatible alias for existing imports if any
export const credentials = specializations;
export type Credential = Specialization;
