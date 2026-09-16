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
    quarter: "Q2",
    title: "Agentic AI & MCP Execution Standardization",
    subtitle: "Formalized Model Context Protocol (MCP) and agent SDLC integration",
    category: "Architecture",
    description: "Architected standardized tool invocation patterns and verified agent execution harnesses. Validated through Microsoft Learn learning achievements in Tooling, MCP, and Agent Execution Environments.",
    tags: ["MCP", "Agent SDLC", "Tool Invocation", "AI Architecture"]
  },
  {
    year: "2026",
    quarter: "Q1",
    title: "CloudPower Multi-App Ecosystem Architecture",
    subtitle: "Synchronized 6-application commercial and fulfillment infrastructure",
    category: "System Milestone",
    description: "Designed unified data contracts and lifecycle state machines connecting Consumer, Merchant, Admin, Support, Rider, and Salesman applications with real-time event streaming and offline resilience.",
    tags: ["CloudPower", "Multi-App Architecture", "Flutter", "React", "WebSocket"]
  },
  {
    year: "2026",
    quarter: "Q2 - Q3",
    title: "Cross-Platform Mobile & Core Systems Mastery",
    subtitle: "Production Flutter engineering and multi-language backend foundations",
    category: "Credential",
    description: "Completed comprehensive certifications and verified achievements across Flutter (Tutedude ID: TD-RAMA-FL-1356), Python (TD-RAMA-PY-1100), Java (TD-RAMA-JA-2241), and C# console exception architecture.",
    tags: ["Flutter", "Python", "Java", "C#", "System Defensiveness"]
  },
  {
    year: "2026",
    quarter: "Q1 - Q2",
    title: "Data Modeling & Analytical Intelligence",
    subtitle: "Operational analytics and business intelligence pipelines",
    category: "Credential",
    description: "Mastered dimensional modeling and business intelligence in Power BI (Tutedude ID: TD-RAMA-PB-0043) and explored machine learning fundamentals via Microsoft Learn.",
    tags: ["Power BI", "DAX", "Data Modeling", "Machine Learning"]
  }
];
