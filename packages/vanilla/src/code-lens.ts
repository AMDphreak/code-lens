import {
  applyThemeCssVars,
  collectVariableSlots,
  lensIndexById,
  onSystemAppearanceChange,
  parseLensBlock,
  parseThemes,
  parseUi,
  shouldUseDomGlassLens,
  type AppearancePreference,
  type LensBlockDocument,
  type LensDefinition,
  type ThemesDocument,
  type UiDocument,
} from "@code-lens/core";

const TAG = "code-lens";

type MorphState = {
  outgoing: string | null;
  incoming: string;
  outOpacity: number;
  inOpacity: number;
};

export type CodeLensConfig = {
  document: LensBlockDocument;
  themes: ThemesDocument;
  ui: UiDocument;
  themeId?: string;
  appearance?: AppearancePreference;
};

/** @deprecated Use CodeLensConfig */
export type LensCodeBlockConfig = CodeLensConfig;

export class CodeLensElement extends HTMLElement {
  static observedAttributes = ["theme", "appearance"];

  #config: CodeLensConfig | null = null;
  #committed = 0;
  #preview: number | null = null;
  #variableSlots = new Set<string>();
  #morph = new Map<string, MorphState>();
  #glassEl: HTMLDivElement | null = null;
  #toolbarEl: HTMLDivElement | null = null;
  #codeEl: HTMLPreElement | null = null;
  #codeGlassEl: HTMLDivElement | null = null;
  #textProbe: HTMLSpanElement | null = null;
  #tabButtons: HTMLButtonElement[] = [];
  #glassEnabled = true;
  #appearanceCleanup: (() => void) | null = null;
  #lastRenderedLensIndex: number | null = null;
  #morphGeneration = 0;
  #morphTimers = new Map<string, number>();

  #touchPreviewIsSwipe(): boolean {
    return this.#config?.ui.interaction.touch.preview === "swipe";
  }

  connectedCallback(): void {
    this.#appearanceCleanup?.();
    this.#appearanceCleanup = onSystemAppearanceChange(
      () => this.#appearancePreference(),
      () => this.#onAppearanceChange(),
    );
    if (this.#config) this.#render();
  }

  disconnectedCallback(): void {
    this.#appearanceCleanup?.();
    this.#appearanceCleanup = null;
  }

  configure(config: CodeLensConfig): void {
    this.#config = config;
    if (config.appearance) this.setAttribute("appearance", config.appearance);
    if (config.themeId) this.setAttribute("theme", config.themeId);
    this.#variableSlots = collectVariableSlots(config.document.lenses);
    this.#committed = 0;
    this.#preview = null;
    if (this.isConnected) this.#render();
  }

  /** Re-apply theme + syntax for current appearance (after attribute or config change). */
  refreshAppearance(): void {
    this.#onAppearanceChange();
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
    if (!this.#config) return;
    if (name === "theme" && value) {
      this.#applyTheme(value, this.#displayLens().id);
      this.#renderCode();
    }
    if (name === "appearance") {
      this.#onAppearanceChange();
    }
  }

  #onAppearanceChange(): void {
    if (!this.#config) return;
    this.#applyTheme(this.#themeId(), this.#displayLens().id);
    this.#renderCode();
  }

  #appearancePreference(): AppearancePreference {
    const attr = this.getAttribute("appearance");
    if (attr === "light" || attr === "dark" || attr === "auto") return attr;
    return this.#config?.appearance ?? "auto";
  }

  #displayIndex(): number {
    return this.#preview ?? this.#committed;
  }

  #displayLens(): LensDefinition {
    return this.#config!.document.lenses[this.#displayIndex()];
  }

  #themeId(): string {
    return this.getAttribute("theme") ?? this.#config!.themeId ?? this.#config!.themes.defaultTheme;
  }

  #applyTheme(themeId: string, lensId: string): void {
    applyThemeCssVars(this, this.#config!.themes, themeId, lensId, this.#appearancePreference());
    const ui = this.#config!.ui;
    this.style.setProperty("--el-width-ms", `${ui.animation.widthMs}ms`);
    this.style.setProperty("--el-width-easing", ui.animation.widthEasing);
    this.style.setProperty("--el-fade-ms", `${ui.animation.fadeMs}ms`);
    this.style.setProperty("--el-glass-ms", `${ui.animation.glassSlideMs}ms`);
    this.style.setProperty(
      "--el-glass-block-ms",
      `${ui.animation.glassBlockPassMs}ms`,
    );
    this.style.setProperty("--el-code-font", ui.layout.codeFontFamily);
    this.style.setProperty("--el-tab-min-height", `${ui.layout.tabMinHeightPx}px`);
    this.style.setProperty(
      "--el-swipe-opacity",
      String(this.#config!.ui.interaction.touch.swipeRevealOpacity),
    );
  }

  #render(): void {
    const cfg = this.#config!;
    const lens = this.#displayLens();
    this.#lastRenderedLensIndex = null;
    this.#applyTheme(this.#themeId(), lens.id);
    this.#glassEnabled = shouldUseDomGlassLens();
    this.classList.toggle("el-glass-disabled", !this.#glassEnabled);

    this.innerHTML = "";
    const root = document.createElement("div");
    root.className = "el-root";

    const toolbar = document.createElement("div");
    toolbar.className = "el-toolbar";
    toolbar.setAttribute("role", "tablist");
    toolbar.addEventListener("mouseleave", () => {
      this.#preview = null;
      this.#renderMeta();
      this.#renderCode();
      this.#updateTabGlass();
    });

    const glass = document.createElement("div");
    glass.className = "el-glass";
    toolbar.appendChild(glass);
    this.#glassEl = glass;

    const label = document.createElement("span");
    label.style.cssText =
      "position:relative;z-index:1;padding:0 8px;font-family:ui-monospace,monospace;font-size:9px;text-transform:uppercase;letter-spacing:0.12em;opacity:0.55";
    label.textContent = "Lens";
    toolbar.appendChild(label);

    this.#tabButtons = cfg.document.lenses.map((l, i) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "el-tab";
      btn.setAttribute("role", "tab");
      btn.textContent = l.label;
      const select = () => {
        this.#preview = i;
        this.#applyTheme(this.#themeId(), l.id);
        this.#renderMeta();
        this.#renderCode();
        this.#updateTabGlass(btn);
      };
      btn.addEventListener("mouseenter", select);
      btn.addEventListener("focus", select);
      btn.addEventListener("click", () => {
        this.#committed = i;
        this.#preview = null;
        this.#applyTheme(this.#themeId(), l.id);
        this.#renderMeta();
        this.#renderCode();
        this.#updateTabGlass(btn);
      });
      toolbar.appendChild(btn);
      return btn;
    });

    const lang = document.createElement("span");
    lang.style.cssText =
      "margin-left:auto;position:relative;z-index:1;padding:0 8px;font-family:ui-monospace,monospace;font-size:9px;text-transform:uppercase;opacity:0.55";
    lang.textContent = cfg.document.language;
    toolbar.appendChild(lang);

    this.#toolbarEl = toolbar;
    root.appendChild(toolbar);

    const body = document.createElement("div");
    body.className = "el-body";

    const sub = document.createElement("p");
    sub.className = "el-meta-sub";
    sub.dataset.meta = "sub";

    const desc = document.createElement("p");
    desc.className = "el-meta-desc";
    desc.dataset.meta = "desc";

    const wrap = document.createElement("div");
    wrap.className = "el-code-wrap";

    const hint = document.createElement("p");
    hint.className = "el-touch-hint";
    hint.textContent = this.#touchPreviewIsSwipe()
      ? "Swipe code to preview lenses"
      : "Tap lens tabs to switch — code is selectable";

    const pre = document.createElement("pre");
    pre.className = "el-code";

    const codeGlass = document.createElement("div");
    codeGlass.className = "el-code-glass";
    codeGlass.setAttribute("aria-hidden", "true");
    codeGlass.innerHTML = [
      '<div class="el-code-glass-blur"></div>',
      '<div class="el-code-glass-sheen el-code-glass-sheen--primary"></div>',
      '<div class="el-code-glass-sheen el-code-glass-sheen--secondary"></div>',
      '<div class="el-code-glass-sheen el-code-glass-sheen--tertiary"></div>',
    ].join("");
    this.#codeGlassEl = codeGlass;

    wrap.appendChild(hint);
    wrap.appendChild(pre);
    pre.appendChild(codeGlass);

    if (this.#touchPreviewIsSwipe()) {
      const ghost = document.createElement("div");
      ghost.className = "el-swipe-ghost";
      wrap.insertBefore(ghost, pre);
      this.#bindSwipe(wrap, ghost);
    }

    body.appendChild(sub);
    body.appendChild(desc);
    body.appendChild(wrap);

    const foot = document.createElement("p");
    foot.className = "el-foot";
    foot.textContent = this.#touchPreviewIsSwipe()
      ? "Hover tabs to preview · swipe code on touch · glass sweeps on lens change"
      : "Hover tabs to preview on desktop · tap tabs on touch · glass sweeps on lens change";
    body.appendChild(foot);

    root.appendChild(body);
    this.appendChild(root);
    this.#codeEl = pre;

    this.#renderMeta();
    this.#renderCode();
    requestAnimationFrame(() => this.#updateTabGlass(this.#tabButtons[this.#displayIndex()]));
  }

  #renderMeta(): void {
    const lens = this.#displayLens();
    const sub = this.querySelector('[data-meta="sub"]');
    const desc = this.querySelector('[data-meta="desc"]');
    if (sub) sub.textContent = lens.subtitle ?? "";
    if (desc) desc.textContent = lens.description ?? "";
    this.#tabButtons.forEach((btn, i) => {
      btn.setAttribute("aria-selected", String(i === this.#displayIndex()));
    });
  }

  #slotKey(lineIdx: number, tokenIdx: number): string {
    return `${lineIdx}:${tokenIdx}`;
  }

  #clearMorphTimers(): void {
    for (const id of this.#morphTimers.values()) window.clearTimeout(id);
    this.#morphTimers.clear();
  }

  /** Measure token width in the code panel font (incoming text sets morph width). */
  #measureTokenWidth(text: string, kind: string): number {
    if (!this.#codeEl || !text) return 0;
    if (!this.#textProbe) {
      this.#textProbe = document.createElement("span");
      this.#textProbe.setAttribute("aria-hidden", "true");
      this.#textProbe.style.cssText =
        "position:absolute;visibility:hidden;white-space:pre;pointer-events:none;top:0;left:0";
      this.#codeEl.appendChild(this.#textProbe);
    }
    this.#textProbe.replaceChildren();
    const span = document.createElement("span");
    span.className = `el-slot el-token-kind-${kind}`;
    span.textContent = text;
    this.#textProbe.appendChild(span);
    this.#textProbe.style.font = getComputedStyle(this.#codeEl).font;
    return Math.ceil(span.getBoundingClientRect().width);
  }

  #renderCode(): void {
    if (!this.#codeEl || !this.#config) return;
    this.#morphGeneration++;
    this.#clearMorphTimers();
    const cfg = this.#config;
    const lensIdx = this.#displayIndex();
    const base = cfg.document.lenses[0].lines;
    const lensChanged =
      this.#lastRenderedLensIndex !== null && this.#lastRenderedLensIndex !== lensIdx;

    const glass = this.#codeGlassEl;
    const probe = this.#textProbe;
    this.#codeEl.innerHTML = "";
    if (probe) this.#codeEl.appendChild(probe);
    if (glass) this.#codeEl.appendChild(glass);

    base.forEach((line, lineIdx) => {
      const row = document.createElement("div");
      row.className = "el-line";
      line.forEach((_baseToken, tokenIdx) => {
        const token = cfg.document.lenses[lensIdx].lines[lineIdx][tokenIdx];
        const highlight = !!token.slot && this.#variableSlots.has(token.slot);
        if (highlight) {
          row.appendChild(this.#renderMorphToken(lineIdx, tokenIdx, token));
        } else {
          const span = document.createElement("span");
          span.className = `el-token-kind-${token.kind}`;
          span.textContent = token.text;
          row.appendChild(span);
        }
      });
      this.#codeEl!.appendChild(row);
    });

    if (lensChanged) {
      this.#playBlockGlass();
    }
    this.#lastRenderedLensIndex = lensIdx;
  }

  #playBlockGlass(): void {
    const glass = this.#codeGlassEl;
    if (!glass || !this.#glassEnabled) return;
    const passMs = this.#config!.ui.animation.glassBlockPassMs;
    glass.classList.remove("is-active");
    void glass.offsetWidth;
    glass.classList.add("is-active");
    window.setTimeout(() => glass.classList.remove("is-active"), passMs + 80);
  }

  #renderMorphToken(
    lineIdx: number,
    tokenIdx: number,
    token: { text: string; kind: string },
  ): HTMLElement {
    const key = this.#slotKey(lineIdx, tokenIdx);
    let state = this.#morph.get(key);
    const isMorph = state !== undefined && state.incoming !== token.text;

    if (!state) {
      state = { outgoing: null, incoming: token.text, outOpacity: 0, inOpacity: 1 };
      this.#morph.set(key, state);
    } else if (isMorph) {
      state.outgoing = state.incoming;
      state.incoming = token.text;
      state.outOpacity = 1;
      state.inOpacity = 0;
    }

    const ui = this.#config!.ui.animation;
    const gen = this.#morphGeneration;

    if (state.outgoing === null) {
      const span = document.createElement("span");
      span.className = `el-slot el-token-kind-${token.kind}`;
      span.textContent = state.incoming;
      return span;
    }

    const shell = document.createElement("span");
    shell.className = "el-slot is-morphing";
    shell.style.width = `${this.#measureTokenWidth(state.incoming, token.kind)}px`;

    const outSpan = document.createElement("span");
    outSpan.className = `el-slot-out el-token-kind-${token.kind}`;
    outSpan.textContent = state.outgoing;
    outSpan.style.opacity = String(state.outOpacity);
    outSpan.style.transition = `opacity var(--el-fade-ms) ease-out`;

    const inSpan = document.createElement("span");
    inSpan.className = `el-slot-in el-token-kind-${token.kind}`;
    inSpan.textContent = state.incoming;
    inSpan.style.opacity = String(state.inOpacity);
    inSpan.style.transition = `opacity var(--el-fade-ms) ease-in ${ui.fadeDelayMs}ms`;

    shell.append(inSpan, outSpan);

    requestAnimationFrame(() => {
      outSpan.style.opacity = "0";
      inSpan.style.opacity = "1";
    });

    const settle = () => {
      if (gen !== this.#morphGeneration) return;
      this.#morphTimers.delete(key);
      state!.outgoing = null;
      shell.className = `el-slot el-token-kind-${token.kind}`;
      shell.style.width = "";
      shell.textContent = state!.incoming;
    };

    this.#morphTimers.set(
      key,
      window.setTimeout(settle, ui.fadeMs + ui.fadeDelayMs + 80),
    );

    return shell;
  }

  #updateTabGlass(btn?: HTMLButtonElement): void {
    if (!this.#glassEl || !this.#toolbarEl) return;
    const target = btn ?? this.#tabButtons[this.#displayIndex()];
    if (!target) return;
    const bar = this.#toolbarEl.getBoundingClientRect();
    const rect = target.getBoundingClientRect();
    this.#glassEl.style.left = `${rect.left - bar.left}px`;
    this.#glassEl.style.width = `${rect.width}px`;
    this.#glassEl.style.height = `${rect.height}px`;
    this.#glassEl.style.opacity = "1";
  }

  #bindSwipe(wrap: HTMLElement, ghost: HTMLElement): void {
    const threshold = this.#config!.ui.interaction.touch.swipeThresholdPx;
    const lenses = this.#config!.document.lenses;
    let touchStartX = 0;
    let touchDragging = false;

    wrap.addEventListener(
      "touchstart",
      (e) => {
        touchStartX = e.touches[0].clientX;
        touchDragging = true;
      },
      { passive: true },
    );

    wrap.addEventListener(
      "touchmove",
      (e) => {
        if (!touchDragging) return;
        const dx = e.touches[0].clientX - touchStartX;
        if (Math.abs(dx) > 12) ghost.classList.add("visible");
        const next =
          dx < -threshold
            ? Math.min(this.#displayIndex() + 1, lenses.length - 1)
            : dx > threshold
              ? Math.max(this.#displayIndex() - 1, 0)
              : null;
        if (next !== null && next !== this.#displayIndex()) {
          touchStartX = e.touches[0].clientX;
          this.#preview = next;
          const lens = lenses[next];
          this.#applyTheme(this.#themeId(), lens.id);
          this.#renderMeta();
          this.#renderCode();
          this.#updateTabGlass(this.#tabButtons[next]);
        }
      },
      { passive: true },
    );

    wrap.addEventListener(
      "touchend",
      () => {
        touchDragging = false;
        ghost.classList.remove("visible");
        this.#committed = this.#displayIndex();
        this.#preview = null;
      },
      { passive: true },
    );
  }
}

export function registerCodeLens(): void {
  if (!customElements.get(TAG)) {
    customElements.define(TAG, CodeLensElement);
  }
}

export function createCodeLens(config: CodeLensConfig, themeId?: string): CodeLensElement {
  registerCodeLens();
  const el = document.createElement(TAG) as CodeLensElement;
  if (themeId) el.setAttribute("theme", themeId);
  if (config.appearance) el.setAttribute("appearance", config.appearance);
  el.configure(config);
  return el;
}

export function mountFromSpec(
  host: HTMLElement,
  blockSource: string,
  themesSource: string,
  uiSource: string,
): CodeLensElement {
  const el = createCodeLens({
    document: parseLensBlock(blockSource),
    themes: parseThemes(themesSource),
    ui: parseUi(uiSource),
  });
  host.appendChild(el);
  return el;
}

/** @deprecated Use registerCodeLens */
export const registerLensCodeBlock = registerCodeLens;
/** @deprecated Use createCodeLens */
export const createLensCodeBlock = createCodeLens;
/** @deprecated Use CodeLensElement */
export type LensCodeBlockElement = CodeLensElement;

export { lensIndexById };
