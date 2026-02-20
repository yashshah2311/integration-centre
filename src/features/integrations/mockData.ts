import type { Connection } from "./types";

export const TILES = [
  {
    provider: "quicksight",
    title: "Amazon QuickSight",
    description:
      "Amazon BI service to create dashboards and interactive visualisations.",
    logo: "/logos/quicksight.png",
  },
  {
    provider: "kafka",
    title: "Kafka",
    description:
      "Real-time data streaming, event-driven architectures and messaging systems.",
    logo: "/logos/kafka.png",
  },
  {
    provider: "powerbi",
    title: "Power BI",
    description:
      "Microsoft BI service to create dashboards and data visualisations.",
    logo: "/logos/powerbi.png",
  },
  {
    provider: "zapier",
    title: "Zapier",
    description:
      "Automation tool that connects various apps and services to automate workflows.",
    logo: "/logos/zapier.png",
  },
  {
    provider: "tableau",
    title: "Tableau",
    description:
      "BI service that helps seeing and transforming data into actionable insights.",
    logo: "/logos/tableau.png",
  },
  {
    provider: "measurabl",
    title: "Measurabl",
    description:
      "Enable the push and pull of data to and from Measurabl via an API.",
    logo: "/logos/measurabl.png",
  },
] as const;

const base: Omit<Connection, "id" | "name" | "entityGroup" | "interval">[] = [
  {
    provider: "quicksight",
    integrationLabel: "Amazon QuickSight",
    source: "Carbon",
    connectorUrlLabel: "Copy to Clipboard",
    instructionsLabel: "View",
  },
  {
    provider: "kafka",
    integrationLabel: "Kafka",
    source: "Carbon",
    connectorUrlLabel: "Copy to Clipboard",
    instructionsLabel: "View",
  },
  {
    provider: "zapier",
    integrationLabel: "Zapier",
    source: "Utility",
    connectorUrlLabel: "Copy to Clipboard",
    instructionsLabel: "View",
  },
];

const names = [
  "Energy",
  "Logistics",
  "Operations",
  "Electricity ToU",
  "Water",
  "ABC Group LTD",
  "135 Albert St - Gas",
  "135 Albert St - Water",
  "135 Albert St - Electricity",
  "ABC Group LTD - Finance",
  "ABC Group LTD - Retail",
  "ABC Group LTD - HQ",
];

const intervals: Connection["interval"][] = ["Monthly", "Yearly", "ToU", "-"];

export const MOCK_CONNECTIONS: Connection[] = Array.from({ length: 32 }).map(
  (_, i) => {
    const b = base[i % base.length];
    const name = names[i % names.length];

    return {
      id: `c${i + 1}`,
      provider: b.provider,
      integrationLabel: b.integrationLabel,
      name,
      source: b.source,
      entityGroup:
        i % 3 === 0
          ? `ABC Group LTD - ${name}`
          : i % 3 === 1
          ? "ABC Group LTD"
          : `135 Albert St - ${name.includes("Water") ? "Water" : "Electricity"}`,
      interval: intervals[i % intervals.length],
      connectorUrlLabel: b.connectorUrlLabel,
      instructionsLabel: b.instructionsLabel,
    };
  }
);