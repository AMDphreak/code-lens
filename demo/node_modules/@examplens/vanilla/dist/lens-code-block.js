import { applyThemeCssVars, collectVariableSlots, lensIndexById, parseLensBlock, parseThemes, parseUi, } from "@examplens/core";
const TAG = "lens-code-block";
export class LensCodeBlockElement extends HTMLElement {
    static observedAttributes = ["theme"];
    #config = null;
    #committed = 0;
    #preview = null;
    #variableSlots = new Set();
    #morph = new Map();
    #glassEl = null;
    #toolbarEl = null;
    #bodyEl = null;
    #codeEl = null;
    #tabButtons = [];
    #touchStartX = 0;
    #touchDragging = false;
    connectedCallback() {
        if (!this.#config)
            return;
        this.#render();
    }
    configure(config) {
        this.#config = config;
        this.#variableSlots = collectVariableSlots(config.document.lenses);
        this.#committed = 0;
        this.#preview = null;
        if (this.isConnected)
            this.#render();
    }
    attributeChangedCallback(name, _old, value) {
        if (name === "theme" && value && this.#config) {
            this.#applyTheme(value, this.#displayLens().id);
            this.#renderCode();
        }
    }
    #displayIndex() {
        return this.#preview ?? this.#committed;
    }
    #displayLens() {
        return this.#config.document.lenses[this.#displayIndex()];
    }
    #themeId() {
        return this.getAttribute("theme") ?? this.#config.themeId ?? this.#config.themes.defaultTheme;
    }
    #applyTheme(themeId, lensId) {
        applyThemeCssVars(this, this.#config.themes, themeId, lensId);
        const ui = this.#config.ui;
        this.style.setProperty("--el-width-ms", `${ui.animation.widthMs}ms`);
        this.style.setProperty("--el-width-easing", ui.animation.widthEasing);
        this.style.setProperty("--el-fade-ms", `${ui.animation.fadeMs}ms`);
        this.style.setProperty("--el-glass-ms", `${ui.animation.glassSlideMs}ms`);
        this.style.setProperty("--el-code-font", ui.layout.codeFontFamily);
        this.style.setProperty("--el-swipe-opacity", String(this.#config.ui.interaction.touch.swipeRevealOpacity));
    }
    #render() {
        const cfg = this.#config;
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
            this.#updateGlass();
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
            btn.addEventListener("mouseenter", () => {
                this.#preview = i;
                this.#applyTheme(this.#themeId(), l.id);
                this.#renderMeta();
                this.#renderCode();
                this.#updateGlass(btn);
            });
            btn.addEventListener("focus", () => {
                this.#preview = i;
                this.#applyTheme(this.#themeId(), l.id);
                this.#renderMeta();
                this.#renderCode();
                this.#updateGlass(btn);
            });
            btn.addEventListener("click", () => {
                this.#committed = i;
                this.#preview = null;
                this.#applyTheme(this.#themeId(), l.id);
                this.#renderMeta();
                this.#renderCode();
                this.#updateGlass(btn);
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
        this.#bodyEl = body;
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
        pre.dataset.code = "1";
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
            "Hover tabs to preview (desktop) · swipe code (touch) · click/tap to lock · amber = varying tokens";
        body.appendChild(foot);
        root.appendChild(body);
        this.appendChild(root);
        this.#codeEl = pre;
        this.#renderMeta();
        this.#renderCode();
        requestAnimationFrame(() => this.#updateGlass(this.#tabButtons[this.#displayIndex()]));
    }
    #renderMeta() {
        const lens = this.#displayLens();
        const sub = this.querySelector('[data-meta="sub"]');
        const desc = this.querySelector('[data-meta="desc"]');
        if (sub)
            sub.textContent = lens.subtitle ?? "";
        if (desc)
            desc.textContent = lens.description ?? "";
        this.#tabButtons.forEach((btn, i) => {
            btn.setAttribute("aria-selected", String(i === this.#displayIndex()));
        });
    }
    #slotKey(lineIdx, tokenIdx) {
        return `${lineIdx}:${tokenIdx}`;
    }
    #renderCode() {
        if (!this.#codeEl || !this.#config)
            return;
        const cfg = this.#config;
        const lensIdx = this.#displayIndex();
        const base = cfg.document.lenses[0].lines;
        this.#codeEl.innerHTML = "";
        base.forEach((line, lineIdx) => {
            const row = document.createElement("div");
            row.className = "el-line";
            line.forEach((baseToken, tokenIdx) => {
                const token = cfg.document.lenses[lensIdx].lines[lineIdx][tokenIdx];
                const highlight = !!token.slot && this.#variableSlots.has(token.slot);
                if (highlight) {
                    row.appendChild(this.#renderMorphToken(lineIdx, tokenIdx, token));
                }
                else {
                    const span = document.createElement("span");
                    span.className = `el-token-kind-${token.kind}`;
                    span.textContent = token.text;
                    row.appendChild(span);
                }
            });
            this.#codeEl.appendChild(row);
        });
    }
    #renderMorphToken(lineIdx, tokenIdx, token) {
        const key = this.#slotKey(lineIdx, tokenIdx);
        let state = this.#morph.get(key);
        if (!state) {
            state = { outgoing: null, incoming: token.text, outOpacity: 0, inOpacity: 1, widthPx: null };
            this.#morph.set(key, state);
        }
        else if (state.incoming !== token.text) {
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
        const pad = this.#config.ui.animation.diffTokenPaddingPx;
        const fromW = state.widthPx ?? (shell.offsetWidth || measure.offsetWidth + pad);
        const toW = measure.offsetWidth + pad;
        shell.style.width = `${fromW}px`;
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                shell.style.width = `${toW}px`;
                if (state.outgoing !== null) {
                    state.outOpacity = 0;
                    state.inOpacity = 1;
                    grid.querySelectorAll(":scope > span").forEach((el, i) => {
                        el.style.opacity = i === 0 && state.outgoing ? "0" : "1";
                    });
                    setTimeout(() => {
                        state.outgoing = null;
                        state.widthPx = toW;
                    }, this.#config.ui.animation.widthMs + this.#config.ui.animation.fadeMs);
                }
                else {
                    state.widthPx = toW;
                }
            });
        });
        return shell;
    }
    #updateGlass(btn) {
        if (!this.#glassEl || !this.#toolbarEl)
            return;
        const target = btn ?? this.#tabButtons[this.#displayIndex()];
        if (!target)
            return;
        const bar = this.#toolbarEl.getBoundingClientRect();
        const rect = target.getBoundingClientRect();
        this.#glassEl.style.left = `${rect.left - bar.left}px`;
        this.#glassEl.style.width = `${rect.width}px`;
        this.#glassEl.style.height = `${rect.height}px`;
        this.#glassEl.style.opacity = "1";
    }
    #bindSwipe(wrap, ghost) {
        const threshold = this.#config.ui.interaction.touch.swipeThresholdPx;
        const lenses = this.#config.document.lenses;
        wrap.addEventListener("touchstart", (e) => {
            this.#touchStartX = e.touches[0].clientX;
            this.#touchDragging = true;
        }, { passive: true });
        wrap.addEventListener("touchmove", (e) => {
            if (!this.#touchDragging)
                return;
            const dx = e.touches[0].clientX - this.#touchStartX;
            if (Math.abs(dx) > 12)
                ghost.classList.add("visible");
            const next = dx < -threshold
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
                this.#updateGlass(this.#tabButtons[next]);
            }
        }, { passive: true });
        wrap.addEventListener("touchend", () => {
            this.#touchDragging = false;
            ghost.classList.remove("visible");
            this.#committed = this.#displayIndex();
            this.#preview = null;
        }, { passive: true });
    }
}
export function registerLensCodeBlock() {
    if (!customElements.get(TAG)) {
        customElements.define(TAG, LensCodeBlockElement);
    }
}
export function createLensCodeBlock(config, themeId) {
    registerLensCodeBlock();
    const el = document.createElement(TAG);
    if (themeId)
        el.setAttribute("theme", themeId);
    el.configure(config);
    return el;
}
/** Load spec files (JSON5 strings) into a configured element. */
export function mountFromSpec(host, blockSource, themesSource, uiSource) {
    const el = createLensCodeBlock({
        document: parseLensBlock(blockSource),
        themes: parseThemes(themesSource),
        ui: parseUi(uiSource),
    });
    host.appendChild(el);
    return el;
}
export { lensIndexById };
