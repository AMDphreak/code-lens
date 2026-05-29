# Implementation Registry

Status key: **shipped** · **wip** · **planned**

**Canonical machine-readable list:** [`spec/implementations.json5`](../spec/implementations.json5)

**Glass lens policy:** implement the full sweep on any runtime that supports blur compositing — see [docs/glass-lens-capabilities.md](../docs/glass-lens-capabilities.md). Do not treat this table as an allow-list of “special” platforms.

Glass lens tier key: **full** · **webview** · **native** · **fallback** · **none** · **planned**

## Editors

| Implementation | Path | Status | Glass | Notes |
|----------------|------|--------|-------|-------|
| VS Code | `extensions/vscode` | wip | webview | Webview panel + buffer decorations |
| Zed | `extensions/zed` | planned | none | LSP inlay hints; external preview |
| code-lens LSP | `extensions/lsp` | planned | fallback | Shared LSP server |

See [docs/editor-integrations.md](../docs/editor-integrations.md).

## Web

| Implementation | Package / path | Status | Glass | Notes |
|----------------|----------------|--------|-------|-------|
| Vanilla JS (web component) | `@code-lens/vanilla` | shipped | full | `<code-lens>`, runtime blur probe |
| SolidJS | `@code-lens/solid` | wip | full | Wraps `<code-lens>` |
| React | `@code-lens/react` | planned | full | Embed web component or port |
| Vue 3 | `@code-lens/vue` | planned | full | |
| Svelte | `@code-lens/svelte` | planned | full | |
| Angular | `@code-lens/angular` | planned | full | |
| Preact | `@code-lens/preact` | planned | full | |
| Lit | `@code-lens/lit` | planned | full | Extend / re-export vanilla CE |

## Desktop

| Implementation | Path | Status | Glass | Notes |
|----------------|------|--------|-------|-------|
| Tauri + webview | `examples/tauri` | planned | webview | Embed `@code-lens/vanilla` |
| Electron | `examples/electron` | planned | webview | |
| Qt 6 / QML | `implementations/qt` | planned | native | WebEngine → webview; QML blur sweep |
| GTK 4 | `implementations/gtk` | planned | native | WebKitGTK → webview |
| .NET MAUI | `implementations/maui` | planned | webview | WebView2 / BlazorWebView |

## Mobile

| Implementation | Package / path | Status | Glass | Notes |
|----------------|----------------|--------|-------|-------|
| React Native | `@code-lens/react-native` | planned | native | expo-blur / native module |
| SwiftUI | `implementations/swiftui` | planned | native | Material + animated overlay |
| Jetpack Compose | `implementations/compose` | planned | native | `Modifier.blur` sweep |
| Flutter | `@code-lens/flutter` | planned | native | `BackdropFilter` |

## Shared spec

All implementations MUST consume:

- `spec/examples/*.json5`
- `spec/themes.json5`
- `spec/ui.json5`
- `spec/implementations.json5` (registry metadata)

Use `@code-lens/core` where TypeScript/JavaScript is available; port parse/validate logic otherwise from `docs/specification.md`.

## Contributing an implementation

1. Add a row to `spec/implementations.json5` (and this file).
2. Create package under `packages/`, `examples/`, or `implementations/`.
3. Load spec files — do not duplicate example token data in source.
4. Probe blur support at runtime; use **fallback** only when compositing is unavailable.
5. Document install instructions in package README.
6. Add demo link or Storybook entry if applicable.
