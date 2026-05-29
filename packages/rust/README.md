# Rust web UI adapters

All crates mount **`@code-lens/vanilla`** via `@code-lens/wasm-bridge` (import in your JS entry).

| Crate | Framework |
|-------|-----------|
| `code-lens-adapter` | Shared `mount_from_json` / `detach` |
| `code-lens-leptos` | [Leptos](https://leptos.dev/) |
| `code-lens-yew` | [Yew](https://yew.rs/) |
| `code-lens-dioxus` | [Dioxus](https://dioxuslabs.com/) |
| `code-lens-sycamore` | [Sycamore](https://sycamore-rs.netlify.app/) |
| `code-lens-dominator` | [Dominator](https://github.com/Pauan/rust-dominator) |
| `code-lens-seed` | [Seed](https://seed-rs.org/) |

```toml
# Cargo.toml
code-lens-leptos = { path = "../packages/rust/leptos" }
```

```js
// main.js / Trunk index.html
import "@code-lens/wasm-bridge";
import "@code-lens/css";
```

Pass `CodeLensConfig` as JSON from your spec loader.
