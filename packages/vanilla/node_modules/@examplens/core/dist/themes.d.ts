import type { LensColors, ThemeDefinition, ThemesDocument } from "./types.js";
export declare function resolveTheme(themes: ThemesDocument, themeId?: string): {
    id: string;
    theme: ThemeDefinition;
};
export declare function lensColors(theme: ThemeDefinition, lensId: string): LensColors;
export declare function applyThemeCssVars(root: HTMLElement, themes: ThemesDocument, themeId: string, activeLensId: string): void;
export declare function listThemeIds(themes: ThemesDocument): string[];
//# sourceMappingURL=themes.d.ts.map