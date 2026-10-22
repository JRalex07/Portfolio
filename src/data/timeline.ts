export interface TimelineMilestone {
  year: string;
  quarter?: string;
  title: string;
  subtitle: string;
  category: "Architecture" | "Credential" | "System Milestone";
  description: string;
  tags: string[];
}

export const timelineMilestones: TimelineMilestone[] = [
  {
    year: "2026",
    quarter: "Q3",
    title: "Agentic AI & MCP Execution Standardization",
    subtitle: "Formalized Model Context Protocol (MCP) and agent SDLC integration",
    category: "Architecture",
    description: "Architected standardized tool invocation patterns and verified agent execution harnesses. Validated through Microsoft Learn learning achievements in Tooling, MCP, and Agent Execution Environments.",
    tags: ["MCP", "Agent SDLC", "Tool Invocation", "AI Architecture"]
  },
  {
    year: "2026",
    quarter: "Q1 - Q2",
    title: "CloudPower Multi-App Ecosystem Architecture",
    subtitle: "Synchronized 6-application commercial and fulfillment infrastructure",
    category: "System Milestone",
    description: "Designed unified data contracts and lifecycle state machines connecting Consumer, Merchant, Admin, Support, Rider, and Salesman applications with real-time event streaming and offline resilience.",
    tags: ["CloudPower", "Multi-App Architecture", "Flutter", "React", "WebSocket"]
  },
  {
    year: "2026",
    quarter: "Q2 - Q3",
    title: "Cross-Platform Mobile Engineering",
    subtitle: "Production Flutter architecture & Java systems mastery",
    category: "Credential",
    description: "Completed comprehensive certifications across Flutter (Tutedude ID: TD-RAMA-FL-1356, July 2026) and Java (TD-RAMA-JA-2241, Feb 2026), implementing offline-first caching and BLoC state management.",
    tags: ["Flutter", "Dart", "Java", "BLoC Pattern", "Mobile Architecture"]
  },
  {
    year: "2025",
    quarter: "Q4",
    title: "Data Intelligence & Foundation Systems",
    subtitle: "Enterprise analytics, machine learning concepts, and defensive programming",
    category: "Credential",
    description: "Achieved verified credentials across Power BI (Tutedude ID: TD-RAMA-PB-0043, Dec 2025), Python (TD-RAMA-PY-1100, Nov 2025), and Microsoft Learn achievements in Generative AI, ML Concepts, and C# Exception Architecture.",
    tags: ["Power BI", "DAX", "Python", "C#", "Machine Learning"]
  }
];
