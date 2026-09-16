export interface EcosystemApp {
  id: string;
  name: string;
  role: string;
  targetUser: string;
  technologies: string[];
  responsibilities: string[];
  keyEndpoints: string[];
  color: string;
}

export interface ArchitectureFlowStep {
  stepNumber: number;
  stage: string;
  sourceApp: string;
  targetApp: string;
  event: string;
  payloadSample: Record<string, string | number | boolean>;
  description: string;
}

export const ecosystemApps: EcosystemApp[] = [
  {
    id: "consumer",
    name: "CloudPower Consumer App",
    role: "Front-facing commerce client",
    targetUser: "End Customers",
    technologies: ["Flutter", "Dart", "REST API", "WebSocket"],
    responsibilities: [
      "Product discovery, localized search, and multi-tier category browsing",
      "Cart state management with optimistic client-side updates",
      "Real-time order tracking with live status updates",
      "Secure checkout tokenization and payment webhook coordination"
    ],
    keyEndpoints: ["POST /orders/intent", "WS /tracking/live", "GET /catalog/products"],
    color: "#38bdf8"
  },
  {
    id: "merchant",
    name: "CloudPower Merchant Portal",
    role: "Inventory & fulfillment console",
    targetUser: "Store Owners & Inventory Managers",
    technologies: ["React", "TypeScript", "WebSocket", "Tailored CSS"],
    responsibilities: [
      "Live order incoming queue with instant audible and visual alerts",
      "Real-time catalog stock level synchronization and backorder controls",
      "Preparation time calculation and handover staging for courier dispatch",
      "Daily settlement reconciliation and batch export pipelines"
    ],
    keyEndpoints: ["PUT /orders/:id/accept", "PATCH /inventory/stock", "GET /metrics/settlements"],
    color: "#10b981"
  },
  {
    id: "admin",
    name: "CloudPower Admin Console",
    role: "Central governance & platform orchestration",
    targetUser: "Operations & Platform Administrators",
    technologies: ["TypeScript", "Python Service", "Power BI Data Layer"],
    responsibilities: [
      "Global platform policy enforcement, merchant onboarding, and KYC verification",
      "System-wide health monitoring, order failure intervention, and circuit breaker controls",
      "Cross-region commission calculation, tax tables, and payout releases",
      "Audit trail logging for dispute compliance and regulatory reporting"
    ],
    keyEndpoints: ["GET /admin/health", "POST /admin/merchants/verify", "POST /admin/override"],
    color: "#f59e0b"
  },
  {
    id: "support",
    name: "CloudPower Support Desk",
    role: "Customer care & dispute arbitration",
    targetUser: "Support Agents & Operations Leads",
    technologies: ["React", "WebSocket", "Agentic MCP Tooling", "PostgreSQL"],
    responsibilities: [
      "Unified timeline view across consumer orders, merchant notes, and courier GPS trails",
      "Automated issue escalation via intelligent routing and context-aware tool lookup",
      "Direct order intervention: address correction, cancellation, or refund authorization",
      "Structured customer satisfaction metrics and resolution audit trail"
    ],
    keyEndpoints: ["GET /support/tickets/:id", "POST /support/refund", "WS /support/live-chat"],
    color: "#a855f7"
  },
  {
    id: "rider",
    name: "CloudPower Rider App",
    role: "Last-mile courier execution unit",
    targetUser: "Delivery Couriers",
    technologies: ["Flutter Mobile", "GPS Location Stream", "Background Services"],
    responsibilities: [
      "Dynamic routing and proximity-based delivery request dispatching",
      "Turn-by-turn navigation integration and merchant pickup verification",
      "Secure proof-of-delivery capture (OTP verification, digital signature)",
      "Earnings breakdown, daily tips ledger, and incentive tracking"
    ],
    keyEndpoints: ["POST /rider/location", "PUT /delivery/:id/pickup", "POST /delivery/:id/complete"],
    color: "#ec4899"
  },
  {
    id: "salesman",
    name: "CloudPower Salesman Field Unit",
    role: "B2B territory expansion & merchant onboarding",
    targetUser: "Field Sales Representatives",
    technologies: ["Flutter Mobile", "Offline SQLite Cache", "REST Sync"],
    responsibilities: [
      "On-site merchant registration with offline document capture and delayed synchronization",
      "Territory heatmapping, route planning, and merchant visit scheduling",
      "B2B catalogue pricing tier negotiations and hardware POS provisioning",
      "Commission performance dashboard with target attainment tracking"
    ],
    keyEndpoints: ["POST /sales/merchant/draft", "POST /sales/checkin", "GET /sales/kpis"],
    color: "#6366f1"
  }
];

export const architectureFlow: ArchitectureFlowStep[] = [
  {
    stepNumber: 1,
    stage: "Order Inception",
    sourceApp: "Consumer App",
    targetApp: "Central Order Broker",
    event: "ORDER_CREATED",
    payloadSample: {
      orderId: "CP-98214",
      merchantId: "MERCH-042",
      totalAmount: 1450.00,
      currency: "INR",
      serviceTier: "EXPRESS_SAME_DAY",
      channel: "Flutter_Client_v2"
    },
    description: "Customer finalizes basket and issues idempotent order intent to event broker."
  },
  {
    stepNumber: 2,
    stage: "Merchant Dispatch",
    sourceApp: "Central Order Broker",
    targetApp: "Merchant Portal",
    event: "MERCHANT_NOTIFICATION_DISPATCHED",
    payloadSample: {
      orderId: "CP-98214",
      itemCount: 4,
      prepDeadlineMinutes: 18,
      urgency: "HIGH",
      autoAcceptRemainingSeconds: 90
    },
    description: "Broker validates merchant status and pushes high-priority WebSocket frame to merchant dashboard."
  },
  {
    stepNumber: 3,
    stage: "Preparation & Logistics Routing",
    sourceApp: "Merchant Portal",
    targetApp: "Admin & Support Core",
    event: "ORDER_PREPPED_FOR_COURIER",
    payloadSample: {
      orderId: "CP-98214",
      prepDurationSeconds: 742,
      pickupZone: "STATION_BAY_3",
      assignedDispatchBatch: "BATCH_NORTH_4"
    },
    description: "Merchant kitchen/warehouse marks package ready. Dispatch engine initiates courier proximity matching."
  },
  {
    stepNumber: 4,
    stage: "Field Fulfillment Dispatch",
    sourceApp: "Admin Core",
    targetApp: "Rider App",
    event: "RIDER_DISPATCH_OFFERED",
    payloadSample: {
      orderId: "CP-98214",
      estimatedDistanceKm: 3.2,
      courierPayout: 185.00,
      pickupCoords: "28.6139, 77.2090",
      dropoffCoords: "28.6315, 77.2167"
    },
    description: "Nearest active rider receives notification with route preview and 30-second acceptance lock."
  },
  {
    stepNumber: 5,
    stage: "Audit, Support & Closed Loop",
    sourceApp: "Rider App",
    targetApp: "Support Desk & Admin Ledger",
    event: "ORDER_DELIVERED_CONFIRMED",
    payloadSample: {
      orderId: "CP-98214",
      deliveryConfirmation: "RECIPIENT_ACKNOWLEDGED",
      transitTimeMinutes: 14.8,
      status: "SETTLED"
    },
    description: "Recipient confirms parcel receipt. All applications update state; ledger updates settlement."
  }
];
