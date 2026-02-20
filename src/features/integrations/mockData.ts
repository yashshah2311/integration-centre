import type { Connection, Provider } from "./types";

export const TILES: Array<{
  provider: Provider;
  title: string;
  description: string;
}> = [
  { provider: "quicksight", title: "Amazon QuickSight", description: "Connect BI dashboards to your data." },
  { provider: "kafka", title: "Kafka", description: "Stream events into the platform." },
  { provider: "powerbi", title: "Power BI", description: "Connect Microsoft Power BI." },
  { provider: "zapier", title: "Zapier", description: "Automate workflows with triggers/actions." },
  { provider: "tableau", title: "Tableau", description: "Connect Tableau reports." },
  { provider: "measurable", title: "Measurable", description: "Measure and analyze integrations." },
];

export const MOCK_CONNECTIONS: Connection[] = [
  {
    id: "c1",
    provider: "quicksight",
    integrationLabel: "Amazon QuickSight",
    name: "Energy",
    source: "Carbon",
    entityGroup: "ABC Group LTD - Energy",
    interval: "Monthly",
    connectorUrlLabel: "Copy to Clipboard",
    instructionsLabel: "View",
  },
  {
    id: "c2",
    provider: "kafka",
    integrationLabel: "Kafka",
    name: "ABC Group Ltd",
    source: "Carbon",
    entityGroup: "ABC Group LTD",
    interval: "Yearly",
    connectorUrlLabel: "Copy to Clipboard",
    instructionsLabel: "View",
  },
];
