import type { LensBlockDocument, LensDefinition, ThemesDocument, UiDocument } from "./types.js";
export declare function parseLensBlock(source: string): LensBlockDocument;
export declare function parseThemes(source: string): ThemesDocument;
export declare function parseUi(source: string): UiDocument;
export declare function collectVariableSlots(lenses: LensDefinition[]): Set<string>;
export declare function resolveToken(lenses: LensDefinition[], lensIndex: number, lineIndex: number, tokenIndex: number): {
    text: string;
    kind: string;
    slot?: string;
};
export declare function lensIndexById(lenses: LensDefinition[], id: string): number;
//# sourceMappingURL=parse.d.ts.map