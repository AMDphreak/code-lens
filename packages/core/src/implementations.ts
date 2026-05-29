import JSON5 from "json5";
import type { GlassLensTier, ImplementationEntry, ImplementationsRegistry } from "./capabilities.js";

const GLASS_TIER_IDS: GlassLensTier[] = [
  "full",
  "webview",
  "native",
  "fallback",
  "none",
  "planned",
];

export function parseImplementationsRegistry(source: string): ImplementationsRegistry {
  const raw = JSON5.parse(source) as {
    glassLensTiers?: Record<string, string>;
    implementations?: ImplementationEntry[];
  };

  if (!raw.implementations?.length) {
    throw new Error("implementations registry requires at least one entry");
  }

  for (const row of raw.implementations) {
    if (!GLASS_TIER_IDS.includes(row.glassLens)) {
      throw new Error(`Unknown glassLens tier "${row.glassLens}" for ${row.pkg}`);
    }
  }

  return {
    glassLensTiers: raw.glassLensTiers as Record<GlassLensTier, string>,
    implementations: raw.implementations,
  };
}

export type { GlassLensTier, ImplementationEntry, ImplementationsRegistry };
