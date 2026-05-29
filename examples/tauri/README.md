# Tauri example

**Status:** planned · **Glass lens:** webview (full via `@code-lens/vanilla`)

Embed the demo or a minimal Tauri window loading the built web component. Backdrop blur works in Tauri 2 webviews on supported platforms — probe with `shouldUseDomGlassLens()` and fall back when needed.

## Steps (future)

1. `pnpm --filter @code-lens/vanilla build`
2. Tauri app with `dist/` or Vite dev server URL
3. Register custom element in webview bootstrap

See [docs/glass-lens-capabilities.md](../docs/glass-lens-capabilities.md).
