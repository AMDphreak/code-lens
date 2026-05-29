import {
  createCodeLens,
  registerCodeLens,
  type CodeLensConfig,
  type CodeLensElement,
} from "./code-lens.js";

export type CodeLensComponentProps = CodeLensConfig & {
  class?: string;
  className?: string;
};

let registered = false;

export function ensureCodeLensRegistered(): void {
  if (!registered) {
    registerCodeLens();
    registered = true;
  }
}

export function syncCodeLensElement(
  el: CodeLensElement,
  props: Pick<CodeLensConfig, "themeId" | "appearance" | "slotHighlight">,
): void {
  if (props.themeId) el.setAttribute("theme", props.themeId);
  else el.removeAttribute("theme");
  el.setAttribute("appearance", props.appearance ?? "auto");
  if (props.slotHighlight === "box") el.setAttribute("slot-highlight", "box");
  else el.removeAttribute("slot-highlight");
}

/** Sync theme/appearance attributes and re-apply CSS variables (no full re-render). */
export function patchCodeLensTheme(
  el: CodeLensElement,
  props: Pick<CodeLensConfig, "themeId" | "appearance" | "slotHighlight">,
): void {
  syncCodeLensElement(el, props);
  el.refreshAppearance();
}

/** Mount or update `<code-lens>` inside a host element. */
export function attachCodeLens(host: HTMLElement, config: CodeLensConfig): CodeLensElement {
  ensureCodeLensRegistered();
  const existing = host.querySelector("code-lens") as CodeLensElement | null;
  if (existing) {
    syncCodeLensElement(existing, config);
    existing.configure(config);
    return existing;
  }
  const el = createCodeLens(config, config.themeId);
  host.replaceChildren(el);
  return el;
}

export function detachCodeLens(host: HTMLElement): void {
  host.replaceChildren();
}
