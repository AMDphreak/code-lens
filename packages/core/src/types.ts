export type TokenKind =
  | "keyword"
  | "type"
  | "identifier"
  | "string"
  | "comment"
  | "punctuation"
  | "number"
  | "builtin"
  | "macro"
  | "operator";

export type CodeToken = {
  text: string;
  kind: TokenKind;
  slot?: string;
};

export type LensDefinition = {
  id: string;
  label: string;
  subtitle?: string;
  description?: string;
  lines: CodeToken[][];
};

export type LensBlockDocument = {
  version: number;
  id?: string;
  language: string;
  defaultTheme?: string;
  lenses: LensDefinition[];
};

export type LensColors = {
  panel: string;
  diff: string;
  diffBorder: string;
  glass: string;
};

export type ThemeChrome = {
  codeSurface: string;
  toolbar: string;
  border: string;
  text: string;
};

export type ThemeMode = {
  lenses: Record<string, LensColors>;
  chrome: ThemeChrome;
};

export type ThemeDefinition = {
  label: string;
  light: ThemeMode;
  dark: ThemeMode;
};

export type ThemesDocument = {
  version: number;
  defaultTheme: string;
  themes: Record<string, ThemeDefinition>;
  syntax: Record<TokenKind, string>;
  syntaxDark: Record<TokenKind, string>;
};

export type UiDocument = {
  version: number;
  interaction: {
    desktop: { preview: string; commit: string; keyboard?: boolean };
    touch: {
      preview: string;
      commit: string;
      swipeThresholdPx: number;
      swipeRevealOpacity: number;
    };
  };
  animation: {
    widthMs: number;
    widthEasing: string;
    fadeMs: number;
    fadeDelayMs: number;
    glassSlideMs: number;
    panelCrossfadeMs: number;
    diffTokenPaddingPx: number;
    diffTokenRadiusPx: number;
    /** Block-wide glass sweep duration when switching lenses */
    glassBlockPassMs: number;
    /** @deprecated Use glassBlockPassMs — per-token stagger removed */
    glassLensPassMs?: number;
    /** @deprecated Removed — glass is block-wide, no line stagger */
    glassLensLineStaggerMs?: number;
  };
  layout: {
    tabMinHeightPx: number;
    codeFontFamily: string;
    codeFontSizePx: number;
    glassBlurPx: number;
  };
};

export type LensRuntimeConfig = {
  document: LensBlockDocument;
  themes: ThemesDocument;
  ui: UiDocument;
  themeId?: string;
};
