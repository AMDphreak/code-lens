# Changelog

## [0.3.6] - 2026-05-29

### Changed

- **Slotted tokens** — removed diff highlight boxes and width morph. Slotted text is plain inline spans at rest; on lens change they cross-fade with a per-token gradient sheen while the block glass sweep runs over the panel.

## [0.3.5] - 2026-05-29

### Fixed

- **Plain token vertical shift during morph** — morph layers sit over an in-flow hidden sizing strut; clip stays `inline-block` (no display flip on settle); each code line uses flex `align-items: baseline` so siblings stay locked.

## [0.3.4] - 2026-05-29

### Fixed

- **Line height during lens morph** — width morph runs in an inner clip locked to `1lh` with absolutely stacked cross-fade layers; outer highlight stays inline. Settles on width `transitionend` (~420ms) instead of a delayed DOM rebuild.
- **GitHub Pages CI** — build `@code-lens/css` before the demo (`dist/code-lens.css` is generated, not committed).

## [0.3.3] - 2026-05-29

### Fixed

- **Slotted token alignment** — diff highlights use a `::before` background overlay (no border box or inner padding). Fixed pixel widths apply only during width morph; at rest tokens flow inline like plain syntax.

## [0.3.2] - 2026-05-29

### Fixed

- **Component dark mode** — appearance/theme changes now sync attributes before `configure()` and call `refreshAppearance()` so lens chrome and syntax use `themes.json5` dark palettes when the header toggle is dark.
- Solid/React adapters split config updates from appearance patches (no full reset on theme toggle).

## [0.3.1] - 2026-05-29

### Added

- **Rust UI adapters:** `code-lens-sycamore`, `code-lens-dominator`, `code-lens-seed`.
- **D adapters:** `implementations/d` — `code_lens.libwasm` (browser) and `code_lens.dlangui` (webview companion for native dlangui apps).
- **Jane Street Bonsai:** moved to `implementations/bonsai/` with `mount` / `unmount` OCaml module.

### Removed

- `@code-lens/bonsai` (NCAC TypeScript framework — unmaintained).

## [0.3.0] - 2026-05-29

### Added

- **Framework component packages (shipped):** `@code-lens/react`, `@code-lens/next`, `@code-lens/preact`, `@code-lens/vue`, `@code-lens/svelte`, `@code-lens/angular`, `@code-lens/lit`.
- **`@code-lens/vanilla/adapter`** — shared `attachCodeLens`, `syncCodeLensElement`, `detachCodeLens`.
- **`@code-lens/wasm-bridge`** — JS entry for Rust web apps.
- **Rust crates:** `code-lens-adapter`, `code-lens-leptos`, `code-lens-yew`, `code-lens-dioxus`.
- **Jane Street Bonsai_web:** `implementations/bonsai-web` OCaml mount helper.

## [0.2.9] - 2026-05-29

### Added

- **[Delivery model](docs/ecosystem.md)** — CSS skin, Tailwind skin (planned), runtime (`@code-lens/vanilla`), adapters (framework hosts).
- **`@code-lens/css`** — stylesheet package (same as `vanilla/code-lens.css`).

### Changed

- Registry simplified: one runtime, two skins, adapters embed vanilla — removed six separate planned framework rows.
- `spec/implementations.json5` — `delivery` layer per row (`css` | `tailwind` | `runtime` | `adapter` | …).

## [0.2.8] - 2026-05-29

### Changed

- **Touch interaction** — mobile uses lens tabs only (`touch.preview: "tabs"`); code panel swipe removed so text stays copyable.
- **Dark appearance** — additional glass sheen, tab pill, and meta contrast rules for `el-appearance-dark`.
- **`@code-lens/solid`** — reactive `appearance`/`theme` sync; registry status **shipped** (thin wrapper over vanilla CE).

## [0.2.7] - 2026-05-29

### Changed

- **Block-wide glass overlay** — lens-switch glass is now a single layer over the code panel (diagonal gradient sheens + brief blur), not a per-token pill sweep with line stagger.
- `spec/ui.json5` — `glassBlockPassMs` replaces `glassLensPassMs` / `glassLensLineStaggerMs` (legacy fields still migrate in `@code-lens/core`).
- Text selection restored — `user-select: none` only during touch swipe (`.is-swiping`).

## [0.2.6] - 2026-05-29

### Added

- **Component appearance** — `<code-lens appearance="auto|light|dark">` with light/dark palettes per color theme in `spec/themes.json5` v2.
- `@code-lens/core` — `resolveEffectiveAppearance`, `onSystemAppearanceChange`, `syntaxDark`.
- Demo syncs page color scheme toggle with component `appearance` attribute.

### Changed

- `spec/themes.json5` v2 — each theme now has `light` and `dark` modes (breaking change from v1 flat structure).

## [0.2.5] - 2026-05-29

### Added

- **Demo color scheme** — auto / light / dark toggle with system autodetect, live `prefers-color-scheme` updates, and icon buttons in the header.
- Dark mode palette matching the warm stone site theme.

### Changed

- Link colors use neutral foreground tones instead of purple primary.

## [0.2.4] - 2026-05-29

### Fixed

- **Diff token text invisible** — width was stuck at 4px because measurement ran inside clipped shells; now uses a probe on the code panel with the live monospace font.
- **Glass lens** — improved `backdrop-filter` detection via `CSS.supports`; added `code-lens` selectors for global stylesheet loading (alongside `:host`).

## [0.2.3] - 2026-05-29

### Changed

- **GitHub Pages demo** rebuilt with **SolidJS + solid-ui** (Tailwind, Kobalte components from [solid-ui.com](https://www.solid-ui.com)).
- Demo uses `@code-lens/solid` `CodeLens` component; registry table and theme picker use solid-ui `Table`, `Select`, `Badge`, `Card`, `Button`.
- CI builds `@code-lens/solid` before demo deploy.

## [0.2.2] - 2026-05-29

### Added

- **`spec/implementations.json5`** — canonical registry for web, desktop, mobile, and editor targets.
- **`docs/glass-lens-capabilities.md`** — probe blur at runtime; implement glass sweep on any supporting platform.
- **`@code-lens/solid`** — `CodeLens` component wrapping `<code-lens>`.
- **Planned package scaffolds** — React, Vue, Svelte, Angular, Preact, Lit, React Native, Flutter.
- **Desktop/mobile scaffolds** — Tauri, Electron, Qt, GTK, MAUI, SwiftUI, Compose READMEs.

### Changed

- **`@code-lens/vanilla`** — skips glass lens DOM when `backdrop-filter` unavailable (`el-glass-disabled`).
- **`@code-lens/core`** — `supportsDomGlassLens`, `shouldUseDomGlassLens`, `parseImplementationsRegistry`.
- Demo implementations table loads registry JSON5 and shows glass lens tier column.

## [0.2.1] - 2026-05-29

### Added

- **Editor integration docs** — feasibility for VS Code vs Zed (`docs/editor-integrations.md`).
- **VS Code extension scaffold** — commands, decoration stub, AI generation hook (`extensions/vscode/`).
- **Zed extension scaffold** — manifest + LSP-oriented roadmap (`extensions/zed/`).

## [0.2.0] - 2026-05-29

### Changed

- Renamed project to **code-lens** (`@code-lens/*` packages, `<code-lens>` element).
- GitHub repository: `AMDphreak/code-lens`.

### Added

- Literal **glass lens sweep** over diff tokens during morph — combined with width resize and text cross-fade.
- Per-line stagger on glass lens animation (`glassLensLineStaggerMs` in `spec/ui.json5`).

## [0.1.0] - 2026-05-28

### Added

- Portable JSON5 spec (`spec/`) for examples, themes, and UI behavior.
- `@code-lens/core` — parse, validate, variable slot detection, theme resolution.
- `@code-lens/vanilla` — `<code-lens>` with hover preview, glass tab indicator, swipe, morphing diff tokens.
- Six color schemes with distinct panel color per lens.
- Demo site (Vite) for GitHub Pages.
- Specification, AI reproduction spec, and implementation registry.
