export type {
  CodeToken,
  LensBlockDocument,
  LensColors,
  LensDefinition,
  LensRuntimeConfig,
  ThemeDefinition,
  ThemesDocument,
  TokenKind,
  UiDocument,
} from "./types.js";

export {
  collectVariableSlots,
  lensIndexById,
  parseLensBlock,
  parseThemes,
  parseUi,
  resolveToken,
} from "./parse.js";

export type {
  AppearancePreference,
  EffectiveAppearance,
} from "./appearance.js";

export {
  onSystemAppearanceChange,
  resolveEffectiveAppearance,
} from "./appearance.js";

export {
  applyThemeCssVars,
  lensColors,
  listThemeIds,
  resolveTheme,
} from "./themes.js";

export type {
  DeliveryLayer,
  GlassLensTier,
  ImplementationEntry,
  ImplementationStatus,
  ImplementationsRegistry,
} from "./capabilities.js";

export {
  prefersReducedMotion,
  shouldUseDomGlassLens,
  supportsDomGlassLens,
} from "./capabilities.js";

export { parseImplementationsRegistry } from "./implementations.js";
