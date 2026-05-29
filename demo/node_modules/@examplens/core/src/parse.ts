import JSON5 from "json5";
import type {
  LensBlockDocument,
  LensDefinition,
  ThemesDocument,
  UiDocument,
} from "./types.js";

export function parseLensBlock(source: string): LensBlockDocument {
  const doc = JSON5.parse(source) as LensBlockDocument;
  validateLensBlock(doc);
  return doc;
}

export function parseThemes(source: string): ThemesDocument {
  return JSON5.parse(source) as ThemesDocument;
}

export function parseUi(source: string): UiDocument {
  return JSON5.parse(source) as UiDocument;
}

function validateLensBlock(doc: LensBlockDocument): void {
  if (doc.version !== 1) throw new Error(`Unsupported lens block version: ${doc.version}`);
  if (!doc.lenses?.length || doc.lenses.length < 2) {
    throw new Error("Lens block requires at least two lenses");
  }
  const lineCounts = doc.lenses.map((l) => l.lines.length);
  if (!lineCounts.every((n) => n === lineCounts[0])) {
    throw new Error("All lenses must have the same number of lines");
  }
  for (let li = 0; li < doc.lenses[0].lines.length; li++) {
    const tokenCounts = doc.lenses.map((l) => l.lines[li].length);
    if (!tokenCounts.every((n) => n === tokenCounts[0])) {
      throw new Error(`Line ${li}: token count mismatch across lenses`);
    }
  }
}

export function collectVariableSlots(lenses: LensDefinition[]): Set<string> {
  const slotValues = new Map<string, Set<string>>();
  for (const lens of lenses) {
    for (const line of lens.lines) {
      for (const token of line) {
        if (!token.slot) continue;
        const values = slotValues.get(token.slot) ?? new Set<string>();
        values.add(token.text);
        slotValues.set(token.slot, values);
      }
    }
  }
  const variable = new Set<string>();
  for (const [slot, values] of slotValues) {
    if (values.size > 1) variable.add(slot);
  }
  return variable;
}

export function resolveToken(
  lenses: LensDefinition[],
  lensIndex: number,
  lineIndex: number,
  tokenIndex: number,
): { text: string; kind: string; slot?: string } {
  return lenses[lensIndex].lines[lineIndex][tokenIndex];
}

export function lensIndexById(lenses: LensDefinition[], id: string): number {
  const i = lenses.findIndex((l) => l.id === id);
  if (i < 0) throw new Error(`Unknown lens id: ${id}`);
  return i;
}
