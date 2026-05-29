# Implementation Registry

Status key: **shipped** · **wip** · **planned**

## Web

| Implementation | Package / path | Status | Notes |
|----------------|----------------|--------|-------|
| Vanilla JS (web component) | `@code-lens/vanilla` | shipped | `<code-lens>`, spec-driven |
| SolidJS | `@code-lens/solid` | wip | Port from portfolio prototype |
| React | `@code-lens/react` | planned | |
| Vue 3 | `@code-lens/vue` | planned | |
| Svelte | `@code-lens/svelte` | planned | |
| Angular | `@code-lens/angular` | planned | |
| Preact | `@code-lens/preact` | planned | |
| Lit | `@code-lens/lit` | planned | Thin wrapper over core + open shadow DOM |

## Desktop

| Implementation | Path | Status | Notes |
|----------------|------|--------|-------|
| Tauri + webview | `examples/tauri` | planned | Embed vanilla or Solid |
| Electron | `examples/electron` | planned | |
| Qt 6 / QML | `implementations/qt` | planned | Load spec via JSON; native morph |
| GTK 4 | `implementations/gtk` | planned | |
| .NET MAUI | `implementations/maui` | planned | |

## Mobile

| Implementation | Package / path | Status | Notes |
|----------------|----------------|--------|-------|
| React Native | `@code-lens/react-native` | planned | Swipe-primary interaction |
| SwiftUI | `implementations/swiftui` | planned | |
| Jetpack Compose | `implementations/compose` | planned | |
| Flutter | `@code-lens/flutter` | planned | |

## Shared spec

All implementations MUST consume:

- `spec/examples/*.json5`
- `spec/themes.json5`
- `spec/ui.json5`

Use `@code-lens/core` where TypeScript/JavaScript is available; port parse/validate logic otherwise from `docs/specification.md`.

## Contributing an implementation

1. Add a row to this table.
2. Create package under `packages/` or `implementations/`.
3. Load spec files — do not duplicate example token data in source.
4. Document install instructions in package README.
5. Add demo link or Storybook entry if applicable.
