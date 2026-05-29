/** How an implementation delivers the glass lens effect (if at all). */
export type GlassLensTier =
  | "full"
  | "webview"
  | "native"
  | "fallback"
  | "none"
  | "planned";

export type ImplementationStatus = "shipped" | "wip" | "planned";

/** How this row fits the delivery stack — see docs/ecosystem.md */
export type DeliveryLayer =
  | "spec"
  | "css"
  | "tailwind"
  | "runtime"
  | "adapter"
  | "editor"
  | "native";

export interface ImplementationEntry {
  platform: string;
  name: string;
  pkg: string;
  path: string;
  status: ImplementationStatus;
  delivery: DeliveryLayer;
  glassLens: GlassLensTier;
  notes?: string;
}

export interface ImplementationsRegistry {
  glassLensTiers: Record<GlassLensTier, string>;
  implementations: ImplementationEntry[];
}

/** True when CSS backdrop-filter blur is available (browser / webview). */
export function supportsDomGlassLens(doc?: Document): boolean {
  if (typeof CSS !== "undefined" && CSS.supports) {
    if (CSS.supports("backdrop-filter: blur(1px)")) return true;
    if (CSS.supports("-webkit-backdrop-filter: blur(1px)")) return true;
  }

  if (typeof document === "undefined" && doc === undefined) return false;
  const root = doc ?? document;
  const el = root.createElement("div");
  const style = el.style as CSSStyleDeclaration & {
    webkitBackdropFilter?: string;
  };
  style.backdropFilter = "blur(1px)";
  if (style.backdropFilter && style.backdropFilter !== "none") return true;
  style.webkitBackdropFilter = "blur(1px)";
  return !!style.webkitBackdropFilter && style.webkitBackdropFilter !== "none";
}

/** User/system prefers reduced motion — skip glass sweep animations. */
export function prefersReducedMotion(win?: Window): boolean {
  if (typeof window === "undefined" && win === undefined) return false;
  const w = win ?? window;
  if (!w.matchMedia) return false;
  return w.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Whether to render glass lens overlays for the current DOM environment. */
export function shouldUseDomGlassLens(doc?: Document, win?: Window): boolean {
  return supportsDomGlassLens(doc) && !prefersReducedMotion(win);
}
