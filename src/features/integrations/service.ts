import type { Connection } from "./types";
import { MOCK_CONNECTIONS } from "./mockData";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

let store: Connection[] = [...MOCK_CONNECTIONS];

export async function getConnections(): Promise<Connection[]> {
  await sleep(200);
  return [...store];
}

export async function deleteConnection(id: string): Promise<void> {
  await sleep(150);
  store = store.filter((c) => c.id !== id);
}

export async function updateConnection(
  id: string,
  patch: Partial<Connection>
): Promise<Connection> {
  await sleep(200);
  const idx = store.findIndex((c) => c.id === id);
  if (idx === -1) throw new Error("Connection not found");
  store[idx] = { ...store[idx], ...patch };
  return store[idx];
}