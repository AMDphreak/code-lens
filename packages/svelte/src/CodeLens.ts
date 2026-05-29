import type { CodeLensConfig } from "@code-lens/vanilla";
import {
  attachCodeLens,
  detachCodeLens,
  syncCodeLensElement,
  type CodeLensElement,
} from "@code-lens/vanilla";

export type CodeLensActionParams = CodeLensConfig;

/** Svelte action — `<div use:codeLens={config} />`. Import `@code-lens/css` once. */
export function codeLens(node: HTMLElement, config: CodeLensActionParams) {
  attachCodeLens(node, config);

  return {
    update(next: CodeLensActionParams) {
      const el = node.querySelector("code-lens");
      if (el && "configure" in el) {
        (el as CodeLensElement).configure(next);
        syncCodeLensElement(el as CodeLensElement, next);
      } else {
        attachCodeLens(node, next);
      }
    },
    destroy() {
      detachCodeLens(node);
    },
  };
}

export { registerCodeLens, createCodeLens } from "@code-lens/vanilla";
export type { CodeLensElement, CodeLensConfig } from "@code-lens/vanilla";
export {
  collectVariableSlots,
  parseLensBlock,
  parseThemes,
  parseUi,
} from "@code-lens/core";
export type {
  AppearancePreference,
  LensBlockDocument,
  LensDefinition,
  ThemesDocument,
  UiDocument,
} from "@code-lens/core";
