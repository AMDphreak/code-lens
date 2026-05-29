# Implementation Registry

See [docs/ecosystem.md](../docs/ecosystem.md).

## TypeScript / JS components

`@code-lens/solid`, `@code-lens/react`, `@code-lens/next`, `@code-lens/preact`, `@code-lens/vue`, `@code-lens/svelte`, `@code-lens/angular`, `@code-lens/lit` — import `@code-lens/css` once.

## Jane Street Bonsai_web

[`implementations/bonsai`](../implementations/bonsai) — OCaml `code_lens_mount.ml`, load `@code-lens/wasm-bridge` before `main.bc.js`.

## Rust web UI

[`packages/rust`](../packages/rust) — Leptos, Yew, Dioxus, Sycamore, Dominator, Seed + `code-lens-adapter`.

## D

[`implementations/d`](../implementations/d) — `code_lens.libwasm` (browser WASM), `code_lens.dlangui` (desktop webview companion).

**dlangui note:** native widgets cannot embed HTML; use a webview sidecar with `mountInWebView`.

Canonical list: [`spec/implementations.json5`](../spec/implementations.json5)
