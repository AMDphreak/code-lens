# Changelog

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
