export type Provider =
  | "quicksight"
  | "kafka"
  | "powerbi"
  | "zapier"
  | "tableau"
  | "measurable";

export type Connection = {
    id: string;
    provider: Provider;
    integrationLabel: string;
    name: string;
    source: string;
    entityGroup: string;
    interval: string;
    connectorUrlLabel: string;
    instructionsLabel: string;
};
