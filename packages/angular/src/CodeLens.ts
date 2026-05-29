import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  type AfterViewInit,
  type OnChanges,
  type OnDestroy,
} from "@angular/core";
import type { AppearancePreference, LensBlockDocument, ThemesDocument, UiDocument } from "@code-lens/core";
import {
  attachCodeLens,
  detachCodeLens,
  syncCodeLensElement,
  type CodeLensElement,
} from "@code-lens/vanilla";

/** Official Angular standalone component — wraps shared `<code-lens>` runtime. */
@Component({
  selector: "code-lens-host",
  standalone: true,
  template: `<div #host [class]="className"></div>`,
})
export class CodeLensComponent implements AfterViewInit, OnChanges, OnDestroy {
  @ViewChild("host", { static: true }) hostRef!: ElementRef<HTMLDivElement>;

  @Input({ required: true }) document!: LensBlockDocument;
  @Input({ required: true }) themes!: ThemesDocument;
  @Input({ required: true }) ui!: UiDocument;
  @Input() themeId?: string;
  @Input() appearance?: AppearancePreference;
  @Input() className = "code-lens-host";

  #el: CodeLensElement | undefined;

  ngAfterViewInit(): void {
    this.#el = attachCodeLens(this.hostRef.nativeElement, this.config());
  }

  ngOnChanges(): void {
    if (!this.#el) return;
    this.#el.configure(this.config());
    syncCodeLensElement(this.#el, this.config());
  }

  ngOnDestroy(): void {
    detachCodeLens(this.hostRef.nativeElement);
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
