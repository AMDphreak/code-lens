import {
  listThemeIds,
  parseImplementationsRegistry,
  parseLensBlock,
  parseThemes,
  parseUi,
} from "@code-lens/core";
import blockSource from "../../spec/examples/zig-namespace.json5?raw";
import themesSource from "../../spec/themes.json5?raw";
import uiSource from "../../spec/ui.json5?raw";
import registrySource from "../../spec/implementations.json5?raw";
import aiPreview from "../../docs/ai-reproduction-spec.md?raw";

export const lensDocument = parseLensBlock(blockSource);
export const themes = parseThemes(themesSource);
export const ui = parseUi(uiSource);
export const registry = parseImplementationsRegistry(registrySource);
export const themeIds = listThemeIds(themes);
export const aiSpecPreview = `${aiPreview.slice(0, 1200)}\n\n…`;

export const LENS_ROWS = [
  {
    lens: "Didactic",
    also: "Concept-labeled",
    foregrounds: "Names that are the lesson",
    tradeoff: "Fast; unlike production code",
  },
  {
    lens: "Schematic",
    also: "Abstract placeholders",
    foregrounds: "Syntax and structure",
    tradeoff: "Clear grammar; weak domain transfer",
  },
  {
    lens: "Contextual",
    also: "Production-shaped",
    foregrounds: "Real ecosystem idioms",
    tradeoff: "Transferable; must excavate relevance",
  },
  {
    lens: "Role-labeled",
    also: "Structural roles",
    foregrounds: "Function inside the example",
    tradeoff: "Scaffold between didactic and real",
  },
] as const;

export const SPEC_FILES = [
  "spec/lens-block.schema.json5 — document schema",
  "spec/examples/*.json5 — lens-aligned token data",
  "spec/themes.json5 — color schemes (tropical, earth, earthenware, patina, fruits, desert)",
  "spec/ui.json5 — interaction + animation constants",
  "docs/ai-reproduction-spec.md — LLM porting checklist (slotted morph invariants)",
  "spec/implementations.json5 — registry + glass lens tiers",
] as const;

export const NAV = [
  { href: "https://github.com/AMDphreak/code-lens", label: "Repository", external: true },
  { href: "#demo", label: "Live demo", external: false },
  { href: "#spec", label: "Specification", external: false },
  { href: "#implementations", label: "Implementations", external: false },
  { href: "#ai-spec", label: "AI reproduction spec", external: false },
] as const;
