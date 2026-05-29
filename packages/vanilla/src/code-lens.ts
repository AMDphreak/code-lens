import {
  applyThemeCssVars,
  collectVariableSlots,
  lensIndexById,
  parseLensBlock,
  parseThemes,
  parseUi,
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
  widthPx: number | null;
};

export type CodeLensConfig = {
  document: LensBlockDocument;
  themes: ThemesDocument;
  ui: UiDocument;
  themeId?: string;
};

/** @deprecated Use CodeLensConfig */
export type LensCodeBlockConfig = CodeLensConfig;

export class CodeLensElement extends HTMLElement {
  static observedAttributes = ["theme"];

  #config: CodeLensConfig | null = null;
  #committed = 0;
  #preview: number | null = null;
  #variableSlots = new Set<string>();
  #morph = new Map<string, MorphState>();
  #glassEl: HTMLDivElement | null = null;
  #toolbarEl: HTMLDivElement | null = null;
  #codeEl: HTMLPreElement | null = null;
  #tabButtons: HTMLButtonElement[] = [];
  #touchStartX = 0;
  #touchDragging = false;

  connectedCallback(): void {
    if (!this.#config) return;
    this.#render();
  }

  configure(config: CodeLensConfig): void {
    this.#config = config;
    this.#variableSlots = collectVariableSlots(config.document.lenses);
    this.#committed = 0;
    this.#preview = null;
    if (this.isConnected) this.#render();
  }

  attributeChangedCallback(name: string, _old: string | null, value: string | null): void {
    if (name === "theme" && value && this.#config) {
      this.#applyTheme(value, this.#displayLens().id);
      this.#renderCode();
    }
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
    applyThemeCssVars(this, this.#config!.themes, themeId, lensId);
    const ui = this.#config!.ui;
    this.style.setProperty("--el-width-ms", `${ui.animation.widthMs}ms`);
    this.style.setProperty("--el-width-easing", ui.animation.widthEasing);
    this.style.setProperty("--el-fade-ms", `${ui.animation.fadeMs}ms`);
    this.style.setProperty("--el-glass-ms", `${ui.animation.glassSlideMs}ms`);
    this.style.setProperty("--el-glass-lens-ms", `${ui.animation.glassLensPassMs}ms`);
    this.style.setProperty(
      "--el-glass-lens-stagger",
      `${ui.animation.glassLensLineStaggerMs}ms`,
    );
    this.style.setProperty("--el-code-font", ui.layout.codeFontFamily);
    this.style.setProperty(
      "--el-swipe-opacity",
      String(this.#config!.ui.interaction.touch.swipeRevealOpacity),
    );
  }

  #render(): void {
    const cfg = this.#config!;
    const lens = this.#displayLens();
    this.#applyTheme(this.#themeId(), lens.id);

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
    hint.className = "el-swipe-hint";
    hint.textContent = "Swipe code to preview lenses";

    const ghost = document.createElement("div");
    ghost.className = "el-swipe-ghost";

    const pre = document.createElement("pre");
    pre.className = "el-code";

    wrap.appendChild(hint);
    wrap.appendChild(ghost);
    wrap.appendChild(pre);
    this.#bindSwipe(wrap, ghost);

    body.appendChild(sub);
    body.appendChild(desc);
    body.appendChild(wrap);

    const foot = document.createElement("p");
    foot.className = "el-foot";
    foot.textContent =
      "Hover tabs to preview · glass lens sweeps diff tokens line-by-line · click/tap to lock";
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

  #renderCode(): void {
    if (!this.#codeEl || !this.#config) return;
    const cfg = this.#config;
    const lensIdx = this.#displayIndex();
    const base = cfg.document.lenses[0].lines;

    this.#codeEl.innerHTML = "";
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
      state = { outgoing: null, incoming: token.text, outOpacity: 0, inOpacity: 1, widthPx: null };
      this.#morph.set(key, state);
    } else if (isMorph) {
      state.outgoing = state.incoming;
      state.incoming = token.text;
      state.outOpacity = 1;
      state.inOpacity = 0;
    }

    const shell = document.createElement("span");
    shell.className = "el-diff";

    const measure = document.createElement("span");
    measure.style.cssText =
      "position:absolute;visibility:hidden;white-space:pre;font:inherit;pointer-events:none";
    measure.textContent = token.text;
    shell.appendChild(measure);

    const inner = document.createElement("span");
    inner.className = "el-diff-inner";

    const grid = document.createElement("span");
    grid.className = "el-diff-text";

    if (state.outgoing !== null) {
      const out = document.createElement("span");
      out.style.opacity = String(state.outOpacity);
      out.style.transition = `opacity var(--el-fade-ms) ease-out`;
      const outSpan = document.createElement("span");
      outSpan.className = `el-token-kind-${token.kind}`;
      outSpan.textContent = state.outgoing;
      out.appendChild(outSpan);
      grid.appendChild(out);
    }

    const inn = document.createElement("span");
    inn.style.opacity = String(state.inOpacity);
    inn.style.transition = `opacity var(--el-fade-ms) ease-in 60ms`;
    const inSpan = document.createElement("span");
    inSpan.className = `el-token-kind-${token.kind}`;
    inSpan.textContent = state.incoming;
    inn.appendChild(inSpan);
    grid.appendChild(inn);

    inner.appendChild(grid);
    shell.appendChild(inner);

    const ui = this.#config!.ui.animation;
    const pad = ui.diffTokenPaddingPx;
    const staggerMs = ui.glassLensLineStaggerMs;
    const passMs = ui.glassLensPassMs;
    const lineDelay = lineIdx * staggerMs;

    if (state.outgoing !== null) {
      shell.classList.add("is-morphing");
      const glassLens = document.createElement("span");
      glassLens.className = "el-diff-glass-lens";
      glassLens.setAttribute("aria-hidden", "true");
      glassLens.style.setProperty("--el-glass-lens-delay", `${lineDelay}ms`);
      shell.appendChild(glassLens);
      window.setTimeout(
        () => shell.classList.remove("is-morphing"),
        lineDelay + passMs + 80,
      );
    }

    const fromW = state.widthPx ?? measure.offsetWidth + pad;
    const toW = measure.offsetWidth + pad;

    shell.style.width = `${fromW}px`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        shell.style.width = `${toW}px`;
        if (state!.outgoing !== null) {
          state!.outOpacity = 0;
          state!.inOpacity = 1;
          grid.querySelectorAll(":scope > span").forEach((el, i) => {
            (el as HTMLElement).style.opacity = i === 0 && state!.outgoing ? "0" : "1";
          });
          window.setTimeout(() => {
            state!.outgoing = null;
            state!.widthPx = toW;
          }, ui.widthMs + ui.fadeMs);
        } else {
          state!.widthPx = toW;
        }
      });
    });

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

    wrap.addEventListener(
      "touchstart",
      (e) => {
        this.#touchStartX = e.touches[0].clientX;
        this.#touchDragging = true;
      },
      { passive: true },
    );

    wrap.addEventListener(
      "touchmove",
      (e) => {
        if (!this.#touchDragging) return;
        const dx = e.touches[0].clientX - this.#touchStartX;
        if (Math.abs(dx) > 12) ghost.classList.add("visible");
        const next =
          dx < -threshold
            ? Math.min(this.#displayIndex() + 1, lenses.length - 1)
            : dx > threshold
              ? Math.max(this.#displayIndex() - 1, 0)
              : null;
        if (next !== null && next !== this.#displayIndex()) {
          this.#touchStartX = e.touches[0].clientX;
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
        this.#touchDragging = false;
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
