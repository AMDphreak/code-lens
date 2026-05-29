import type { CodeLensConfig } from "@code-lens/vanilla";
import {
  attachCodeLens,
  detachCodeLens,
  ensureCodeLensRegistered,
  syncCodeLensElement,
} from "@code-lens/vanilla/adapter";

import "@code-lens/css";

ensureCodeLensRegistered();

export { attachCodeLens, detachCodeLens, syncCodeLensElement, ensureCodeLensRegistered };
export type { CodeLensConfig };

/** JSON config from Rust/wasm — same shape as CodeLensConfig. */
export function attachCodeLensFromJson(host: HTMLElement, configJson: string): HTMLElement {
  const config = JSON.parse(configJson) as CodeLensConfig;
  return attachCodeLens(host, config);
}

const bridge = {
  attachCodeLens,
  detachCodeLens,
  syncCodeLensElement,
  ensureCodeLensRegistered,
  attachCodeLensFromJson,
};

declare global {
  interface Window {
    __codeLensBridge?: typeof bridge;
  }
}

if (typeof window !== "undefined") {
  window.__codeLensBridge = bridge;
}

export default bridge;
