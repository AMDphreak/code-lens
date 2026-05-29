import { html, LitElement, type PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { AppearancePreference, LensBlockDocument, ThemesDocument, UiDocument } from "@code-lens/core";
import {
  attachCodeLens,
  detachCodeLens,
  syncCodeLensElement,
  type CodeLensElement,
} from "@code-lens/vanilla";

/** Official Lit host — light DOM so `@code-lens/css` applies. Import CSS once. */
@customElement("code-lens-lit")
export class CodeLensLit extends LitElement {
  @property({ attribute: false }) document!: LensBlockDocument;
  @property({ attribute: false }) themes!: ThemesDocument;
  @property({ attribute: false }) ui!: UiDocument;
  @property({ type: String }) themeId?: string;
  @property({ type: String }) appearance?: AppearancePreference;

  #host: HTMLDivElement | null = null;
  #el: CodeLensElement | undefined;

  /** Keep styles global — `<code-lens>` lives in light DOM. */
  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }

  render() {
    return html`<div part="host" class="code-lens-host"></div>`;
  }

  firstUpdated(): void {
    this.#host = this.querySelector("div.code-lens-host");
    if (!this.#host) return;
    this.#el = attachCodeLens(this.#host, this.config());
  }

  updated(changed: PropertyValues<this>): void {
    if (!this.#el || !changed.size) return;
    this.#el.configure(this.config());
    syncCodeLensElement(this.#el, this.config());
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.#host) detachCodeLens(this.#host);
    this.#el = undefined;
  }

  private config() {
    return {
      document: this.document,
      themes: this.themes,
      ui: this.ui,
      themeId: this.themeId,
      appearance: this.appearance,
    };
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "code-lens-lit": CodeLensLit;
  }
}

export { registerCodeLens, createCodeLens } from "@code-lens/vanilla";
export type { CodeLensElement, CodeLensConfig } from "@code-lens/vanilla";
export {
  collectVariableSlots,
  parseLensBlock,
  parseThemes,
  parseUi,
} from "@code-lens/core";
export type {
  AppearancePreference,
  LensDefinition,
  ThemesDocument,
  UiDocument,
} from "@code-lens/core";
