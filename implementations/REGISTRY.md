# Implementation Registry

Status key: **shipped** · **wip** · **planned**

## Web

| Implementation | Package / path | Status | Notes |
|----------------|----------------|--------|-------|
| Vanilla JS (web component) | `@examplens/vanilla` | shipped | `<lens-code-block>`, spec-driven |
| SolidJS | `@examplens/solid` | wip | Port from portfolio prototype |
| React | `@examplens/react` | planned | |
| Vue 3 | `@examplens/vue` | planned | |
| Svelte | `@examplens/svelte` | planned | |
| Angular | `@examplens/angular` | planned | |
| Preact | `@examplens/preact` | planned | |
| Lit | `@examplens/lit` | planned | Thin wrapper over core + open shadow DOM |

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
| React Native | `@examplens/react-native` | planned | Swipe-primary interaction |
| SwiftUI | `implementations/swiftui` | planned | |
| Jetpack Compose | `implementations/compose` | planned | |
| Flutter | `@examplens/flutter` | planned | |

## Shared spec

All implementations MUST consume:

- `spec/examples/*.json5`
- `spec/themes.json5`
- `spec/ui.json5`

Use `@examplens/core` where TypeScript/JavaScript is available; port parse/validate logic otherwise from `docs/specification.md`.

## Contributing an implementation

1. Add a row to this table.
2. Create package under `packages/` or `implementations/`.
3. Load spec files — do not duplicate example token data in source.
4. Document install instructions in package README.
5. Add demo link or Storybook entry if applicable.
