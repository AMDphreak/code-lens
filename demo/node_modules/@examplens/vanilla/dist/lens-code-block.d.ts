import { lensIndexById, type LensBlockDocument, type ThemesDocument, type UiDocument } from "@examplens/core";
export type LensCodeBlockConfig = {
    document: LensBlockDocument;
    themes: ThemesDocument;
    ui: UiDocument;
    themeId?: string;
};
export declare class LensCodeBlockElement extends HTMLElement {
    #private;
    static observedAttributes: string[];
    connectedCallback(): void;
    configure(config: LensCodeBlockConfig): void;
    attributeChangedCallback(name: string, _old: string | null, value: string | null): void;
}
export declare function registerLensCodeBlock(): void;
export declare function createLensCodeBlock(config: LensCodeBlockConfig, themeId?: string): LensCodeBlockElement;
/** Load spec files (JSON5 strings) into a configured element. */
export declare function mountFromSpec(host: HTMLElement, blockSource: string, themesSource: string, uiSource: string): LensCodeBlockElement;
export { lensIndexById };
