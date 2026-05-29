# Changelog

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
