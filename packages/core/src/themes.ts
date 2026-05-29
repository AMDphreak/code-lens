import type { AppearancePreference } from "./appearance.js";
import { resolveEffectiveAppearance } from "./appearance.js";
import type { LensColors, ThemeDefinition, ThemesDocument, TokenKind } from "./types.js";

export function resolveTheme(
  themes: ThemesDocument,
  themeId?: string,
): { id: string; theme: ThemeDefinition } {
  const id = themeId ?? themes.defaultTheme;
  const theme = themes.themes[id];
  if (!theme) throw new Error(`Unknown theme: ${id}`);
  return { id, theme };
}

export function lensColors(
  theme: ThemeDefinition,
  lensId: string,
  appearance: "light" | "dark",
): LensColors {
  const colors = theme[appearance].lenses[lensId];
  if (!colors) throw new Error(`Theme missing lens colors for: ${lensId}`);
  return colors;
}

export function applyThemeCssVars(
  root: HTMLElement,
  themes: ThemesDocument,
  themeId: string,
  activeLensId: string,
  appearance: AppearancePreference = "auto",
): "light" | "dark" {
  const effective = resolveEffectiveAppearance(appearance);
  const { theme } = resolveTheme(themes, themeId);
  const mode = theme[effective];
  const active = lensColors(theme, activeLensId, effective);

  root.style.setProperty("--el-panel-bg", active.panel);
  root.style.setProperty("--el-diff-bg", active.diff);
  root.style.setProperty("--el-diff-border", active.diffBorder);
  root.style.setProperty("--el-glass-tint", active.glass);
  root.style.setProperty("--el-code-surface", mode.chrome.codeSurface);
  root.style.setProperty("--el-toolbar", mode.chrome.toolbar);
  root.style.setProperty("--el-border", mode.chrome.border);
  root.style.setProperty("--el-text", mode.chrome.text);

  const syntax = effective === "dark" ? themes.syntaxDark : themes.syntax;
  for (const [kind, color] of Object.entries(syntax) as [TokenKind, string][]) {
    root.style.setProperty(`--el-syntax-${kind}`, color);
  }

  root.classList.toggle("el-appearance-dark", effective === "dark");
  root.style.colorScheme = effective;
  root.dataset.appearance = appearance;
  root.dataset.appearanceEffective = effective;

  return effective;
}

export function listThemeIds(themes: ThemesDocument): string[] {
  return Object.keys(themes.themes);
}
