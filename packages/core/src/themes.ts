import type { LensColors, ThemeDefinition, ThemesDocument } from "./types.js";

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
): LensColors {
  const colors = theme.lenses[lensId];
  if (!colors) throw new Error(`Theme missing lens colors for: ${lensId}`);
  return colors;
}

export function applyThemeCssVars(
  root: HTMLElement,
  themes: ThemesDocument,
  themeId: string,
  activeLensId: string,
): void {
  const { theme } = resolveTheme(themes, themeId);
  const active = lensColors(theme, activeLensId);

  root.style.setProperty("--el-panel-bg", active.panel);
  root.style.setProperty("--el-diff-bg", active.diff);
  root.style.setProperty("--el-diff-border", active.diffBorder);
  root.style.setProperty("--el-glass-tint", active.glass);
  root.style.setProperty("--el-code-surface", theme.chrome.codeSurface);
  root.style.setProperty("--el-toolbar", theme.chrome.toolbar);
  root.style.setProperty("--el-border", theme.chrome.border);
  root.style.setProperty("--el-text", theme.chrome.text);

  for (const [kind, color] of Object.entries(themes.syntax)) {
    root.style.setProperty(`--el-syntax-${kind}`, color);
  }
}

export function listThemeIds(themes: ThemesDocument): string[] {
  return Object.keys(themes.themes);
}
