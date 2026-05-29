# code-lens-adapter (Rust)

Shared mount helpers for **Leptos**, **Yew**, and **Dioxus**. Behavior lives in `@code-lens/vanilla`; this crate calls into JS.

## Setup

1. Add npm deps to your app: `@code-lens/wasm-bridge`, `@code-lens/css`
2. In your JS entry (before WASM starts):

```js
import "@code-lens/wasm-bridge";
import "@code-lens/css";
```

3. In Rust, when a host div is mounted:

```rust
code_lens_adapter::mount_from_json(&host_element, &config_json)?;
```

See `leptos/`, `yew/`, and `dioxus/` crates for framework-specific components.
