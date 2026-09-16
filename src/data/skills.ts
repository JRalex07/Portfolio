export interface SkillCategory {
  title: string;
  subtitle: string;
  skills: {
    name: string;
    level: "Architectural Proficiency" | "Core Competency" | "Production Applied";
    description: string;
  }[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Mobile Architecture & Client Systems",
    subtitle: "Engineered cross-platform mobile experiences with predictable state lifecycles",
    skills: [
      {
        name: "Flutter",
        level: "Architectural Proficiency",
        description: "Declarative UI trees, responsive layouts, multi-tier navigation, custom painters, and cross-platform compilation."
      },
      {
        name: "Dart",
        level: "Architectural Proficiency",
        description: "Strong typing, asynchronous streams, isolates, mixins, and sound null-safety patterns."
      },
      {
        name: "Reactive State Architecture",
        level: "Production Applied",
        description: "Unidirectional data flow, BLoC/Provider state segregation, and immutable model updates."
      },
      {
        name: "Native Hardware Bridges",
        level: "Production Applied",
        description: "Method channels, background geolocation streaming, offline SQLite caches, and camera/sensor access."
      }
    ]
  },
  {
    title: "Backend & Systems Programming",
    subtitle: "Defensive runtime foundations, exception architecture, and multi-service APIs",
    skills: [
      {
        name: "Python",
        level: "Core Competency",
        description: "Async I/O routines, object-oriented systems, data manipulation, and lightweight microservice APIs."
      },
      {
        name: "Java",
        level: "Core Competency",
        description: "OOP domain modeling, multi-threaded concurrency, JVM memory discipline, and enterprise service design."
      },
      {
        name: "C# / .NET",
        level: "Core Competency",
        description: "Defensive exception hierarchies, memory management, LINQ queries, and CLI runtime architectures."
      },
      {
        name: "TypeScript / JavaScript",
        level: "Architectural Proficiency",
        description: "Strict static typing, asynchronous event loops, modular component architecture, and modern browser standards."
      }
    ]
  },
  {
    title: "Agentic AI & Execution Environments",
    subtitle: "Standardized tool invocation, autonomous architectures, and deterministic evaluation",
    skills: [
      {
        name: "Model Context Protocol (MCP)",
        level: "Architectural Proficiency",
        description: "Authoring MCP servers and clients, tool schema declaration, dynamic capability negotiation, and sandbox sandboxing."
      },
      {
        name: "Agent SDLC Integration",
        level: "Architectural Proficiency",
        description: "Formalizing agent verification loops, prompt versioning, structured reflection, and automated unit evaluation."
      },
      {
        name: "Agent Runtimes & Execution",
        level: "Production Applied",
        description: "Context window budgeting, tool routing, defensive error handling, and safe external API invocation."
      },
      {
        name: "GitHub Agentic Tooling",
        level: "Core Competency",
        description: "Automated workflow orchestration, code synthesis evaluation, and repository-level developer tooling."
      }
    ]
  },
  {
    title: "Data Intelligence & Modeling",
    subtitle: "Analytical pipelines, dimensional modeling, and operational dashboards",
    skills: [
      {
        name: "Power BI",
        level: "Architectural Proficiency",
        description: "Dimensional star schema modeling, interactive visual reports, and live analytical dashboards."
      },
      {
        name: "DAX (Data Analysis Expressions)",
        level: "Core Competency",
        description: "Complex calculated measures, filter context manipulation, time intelligence, and aggregation pipelines."
      },
      {
        name: "Power Query / M & ETL",
        level: "Core Competency",
        description: "Data ingestion, transformation, deduplication, schema normalization, and automated refresh workflows."
      },
      {
        name: "Machine Learning Foundations",
        level: "Core Competency",
        description: "Supervised/unsupervised evaluation, model loss metrics, regression, and data pre-processing validation."
      }
    ]
  }
];
