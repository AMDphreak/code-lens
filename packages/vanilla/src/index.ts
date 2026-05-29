import { registerCodeLens } from "./code-lens.js";

export {
  attachCodeLens,
  detachCodeLens,
  ensureCodeLensRegistered,
  patchCodeLensTheme,
  syncCodeLensElement,
  type CodeLensComponentProps,
} from "./adapter.js";

export {
  CodeLensElement,
  createCodeLens,
  createLensCodeBlock,
  LensCodeBlockElement,
  mountFromSpec,
  registerCodeLens,
  registerLensCodeBlock,
  type CodeLensConfig,
  type LensCodeBlockConfig,
  type SlotHighlight,
} from "./code-lens.js";

export function injectCodeLensStyles(doc: Document = document): void {
  if (doc.getElementById("code-lens-styles")) return;
  const link = doc.createElement("link");
  link.id = "code-lens-styles";
  link.rel = "stylesheet";
  link.href = new URL("./code-lens.css", import.meta.url).href;
  doc.head.appendChild(link);
}

/** @deprecated Use injectCodeLensStyles */
export const injectLensCodeBlockStyles = injectCodeLensStyles;

export default registerCodeLens;
