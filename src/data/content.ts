// Single source of truth for all copy + content.
// Voice: direct, technical, confident. Volt is the only accent.

export type DeviceKind = "phone" | "laptop" | "desktop";
export type SceneKind = "mobile" | "web" | "dash";

export const hero = {
  badge: "Software studio in Erbil",
  h1a: "Nex builds software",
  h1b: "people keep using.",
  sub: "Apps, websites and systems — built by one team in Erbil.",
  code: "Apps. Web. Systems. Reliability.",
  codeTail: "Built by Nex",
};

export interface MorphStage {
  device: DeviceKind;
  scene: SceneKind;
  no: string;
  kicker: string;
  headline: string;
  sub: string;
}

// Showcase: phone (iOS + Android) -> laptop -> desktop.
export const morphStages: MorphStage[] = [
  {
    device: "phone",
    scene: "mobile",
    no: "01",
    kicker: "On the phone",
    headline: "On the home screen.",
    sub: "iPhone and Android apps people open every day.",
  },
  {
    device: "laptop",
    scene: "web",
    no: "02",
    kicker: "On the web",
    headline: "Fast sites that convert.",
    sub: "Marketing sites and web apps that bring customers in.",
  },
  {
    device: "desktop",
    scene: "dash",
    no: "03",
    kicker: "Behind the counter",
    headline: "Your whole shop, one screen.",
    sub: "Sales, stock and staff, connected.",
  },
];

export interface Service {
  id: string;
  no: string;
  title: string;
  tagline: string;
  scene: SceneKind;
  tags: string[];
  description: string[];
  capabilities: string[];
  outcome: string;
}

export const services: Service[] = [
  {
    id: "apps",
    no: "01",
    title: "Apps",
    tagline: "iOS & Android, built to keep.",
    scene: "mobile",
    tags: ["iOS", "Android", "Flutter"],
    description: [
      "Mobile apps that feel like they belong on the device. Fast, fluid, and obvious. One team from first sketch to the App Store.",
    ],
    capabilities: [
      "Native iOS & Android",
      "Cross-platform with Flutter",
      "Payments, maps, push",
      "Offline-first",
      "Store submission handled",
    ],
    outcome: "An app people open every day.",
  },
  {
    id: "web",
    no: "02",
    title: "Web",
    tagline: "Sites that load fast and convert.",
    scene: "web",
    tags: ["Sites", "Dashboards", "CMS"],
    description: [
      "Marketing sites that load in under a second, plus full web apps, dashboards and portals your team lives in all day.",
    ],
    capabilities: [
      "Marketing sites that convert",
      "Web apps & dashboards",
      "Editable CMS",
      "SEO & performance",
      "Hosting handled",
    ],
    outcome: "A site that brings customers in.",
  },
  {
    id: "systems",
    no: "03",
    title: "Systems",
    tagline: "Your whole business, one screen.",
    scene: "dash",
    tags: ["POS", "Inventory", "Staff"],
    description: [
      "Run the operation from one place. POS, stock, orders and staff stay connected, so every sale updates inventory and the numbers add up.",
    ],
    capabilities: [
      "Point of sale & retail",
      "Inventory & stock",
      "Orders & invoicing",
      "Staff & permissions",
      "Live reporting",
    ],
    outcome: "Less paperwork, more business.",
  },
  {
    id: "reliability",
    no: "04",
    title: "Reliability",
    tagline: "Backed up. Monitored. Online.",
    scene: "dash",
    tags: ["Backups", "Monitoring", "24/7"],
    description: [
      "Software that's down isn't software. We keep what we build backed up and monitored around the clock. If it breaks, we know before you do.",
    ],
    capabilities: [
      "Automated daily backups",
      "24/7 uptime monitoring",
      "Security updates",
      "Encrypted data",
      "A real person to call",
    ],
    outcome: "Safe data, systems that stay up.",
  },
];

// "What we do" — six capability cards, each with the real stack we use.
// `slug` matches simpleicons.org for the brand logo.
const t = (name: string, slug: string) => ({ name, slug });
export const whatWeDo = [
  { title: "Apps", line: "iOS & Android", tools: [t("Swift", "swift"), t("Kotlin", "kotlin"), t("Flutter", "flutter")] },
  { title: "Web", line: "Sites & web apps", tools: [t("React", "react"), t("Next.js", "nextdotjs"), t("TypeScript", "typescript")] },
  {
    title: "Systems",
    line: "Backends & data",
    tools: [t("Node.js", "nodedotjs"), t("Go", "go"), t("PostgreSQL", "postgresql"), t("MongoDB", "mongodb")],
  },
  { title: "Design", line: "UI, UX & brand", tools: [t("Figma", "figma")] },
  { title: "Infra", line: "Deploy & scale", tools: [t("Docker", "docker"), t("Kubernetes", "kubernetes"), t("Cloudflare", "cloudflare")] },
  { title: "Security", line: "Backed up & watched", tools: [t("Sentry", "sentry"), t("Cloudflare", "cloudflare")] },
];

export interface Project {
  id: string;
  serviceId: string;
  title: string;
  sub: string;
  tags: string[];
  scene: SceneKind;
}

// Work showcase — opens the matching service detail.
// DEMO content (placeholder projects). Replace with real Nex jobs when ready.
export const projects: Project[] = [
  {
    id: "p-cay",
    serviceId: "apps",
    title: "Çay & Co.",
    sub: "Coffee ordering app.",
    tags: ["iOS", "Android", "Loyalty"],
    scene: "mobile",
  },
  {
    id: "p-hawler",
    serviceId: "web",
    title: "Hawler Eats",
    sub: "Ordering website.",
    tags: ["Web", "Ordering", "SEO"],
    scene: "web",
  },
  {
    id: "p-bazaar",
    serviceId: "systems",
    title: "Bazaar POS",
    sub: "Retail point of sale.",
    tags: ["POS", "Inventory", "Reporting"],
    scene: "dash",
  },
  {
    id: "p-runaki",
    serviceId: "reliability",
    title: "Rûnaki Clinic",
    sub: "Bookings, always on.",
    tags: ["Backups", "Monitoring", "24/7"],
    scene: "dash",
  },
];

export const why = {
  lines: ["A small team", "that ships.", "No shortcuts."],
  sub: "No outsourcing. No templates. Built by people you can reach.",
};

export const contact = {
  heading: "Tell us what you're building.",
  sub: "An app, a site, a system — or just an idea. We reply within a day.",
  success: "Got it. We'll be in touch within a day.",
};
