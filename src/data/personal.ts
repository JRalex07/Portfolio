export interface PersonalInfo {
  name: string;
  titles: string[];
  tagline: string;
  summary: string[];
  focusAreas: string[];
  principles: { title: string; desc: string }[];
  contact: {
    email: string;
    github: string;
    linkedin: string;
    location: string;
    status: string;
  };
}

export const personalInfo: PersonalInfo = {
  name: "Raman Kumar Sharma",
  titles: [
    "Application Engineer",
    "Product Builder",
    "Systems & Agentic Architect"
  ],
  tagline: "Engineering resilient applications, multi-service ecosystems, and agent execution environments.",
  summary: [
    "I design and build software systems where multi-platform clients, backend workflows, and intelligent execution environments intersect.",
    "My focus centers on structured application architecture—from client-side mobile engineering with Flutter to backend services in Python, Java, and C#, through to cutting-edge Agentic AI integration utilizing the Model Context Protocol (MCP) and agent SDLC paradigms.",
    "Rather than treating software as isolated screens, I view applications as coordinated ecosystems where data contracts, state machines, and operational pipelines must remain dependable under real-world conditions."
  ],
  focusAreas: [
    "Distributed Application Ecosystems",
    "Agentic Execution & Model Context Protocol (MCP)",
    "Cross-Platform Mobile Architecture (Flutter)",
    "Robust Backend Systems (Java, Python, C#)",
    "Operational Data Modeling & Intelligence (Power BI)"
  ],
  principles: [
    {
      title: "Architecture Before Syntax",
      desc: "A well-structured system with clear boundary contracts survives evolving requirements; ad-hoc code rapidly accumulates fatal technical debt."
    },
    {
      title: "Deterministic Agents Over Black Boxes",
      desc: "Agentic workflows require strict runtime sandboxes, explicit tool declarations, and verifiable execution tracing."
    },
    {
      title: "Coordinated Ecosystems",
      desc: "Consumer, merchant, and operational interfaces must synchronize around a singular, authoritative event stream."
    },
    {
      title: "Zero Artificial Claims",
      desc: "Real engineering credibility is proven through demonstrable code, verifiable credentials, and architectural transparency."
    }
  ],
  contact: {
    email: "developer@cloudpower.store",
    github: "https://github.com/JRalex07",
    linkedin: "https://www.linkedin.com/in/jralex07/",
    location: "Global / Remote",
    status: "Available for high-impact engineering & architecture"
  }
};
