import * as vscode from "vscode";
import type { GeneratedLensDoc } from "../lensDecorations";

const SYSTEM_PROMPT = `You generate code-lens documents. Given source code, produce JSON with four pedagogical lenses:
- didactic (concept-labeled names)
- schematic (abstract placeholders)
- contextual (production-shaped names)
- role (structural role names)

Rules:
- Same line count and token count per line across all lenses
- Mark varying tokens with a "slot" string key
- Return ONLY valid JSON matching the code-lens schema
- Include language field`;

/**
 * Generate aligned lens variants from real editor source.
 * Requires configured AI provider (code-lens.aiProvider).
 */
export async function generateLensDocument(
  source: string,
  language: string,
  context: vscode.ExtensionContext,
): Promise<GeneratedLensDoc> {
  const config = vscode.workspace.getConfiguration("code-lens");
  const provider = config.get<string>("aiProvider", "none");

  if (provider === "none") {
    throw new Error(
      "Configure code-lens.aiProvider (openai | anthropic | ollama) to generate lenses from real code, or use the web demo with pre-built examples.",
    );
  }

  // TODO: wire provider SDKs; validate with @code-lens/core parseLensBlock
  const model = config.get<string>("aiModel", "");
  void context.globalState.update("code-lens.lastSourceHash", hash(source));

  throw new Error(
    `AI provider "${provider}"${model ? ` (${model})` : ""} is stubbed. ` +
      `Implement call in extensions/vscode/src/ai/generateLenses.ts. ` +
      `Prompt begins: ${SYSTEM_PROMPT.slice(0, 80)}…`,
  );
}

function hash(text: string): string {
  let h = 0;
  for (let i = 0; i < text.length; i++) h = (Math.imul(31, h) + text.charCodeAt(i)) | 0;
  return String(h);
}

/** Shape for future full document return from AI */
export type AiLensBlockJson = {
  version: 1;
  language: string;
  lenses: unknown[];
};
