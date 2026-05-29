# code-lens-dominator

```rust
use code_lens_dominator::{render, CodeLensProps};

let host = render(CodeLensProps {
    config_json: CONFIG_JSON.to_string(),
    ..Default::default()
});
dominator::append_to_body(&host);
```

Import `@code-lens/wasm-bridge` in your app JS entry.
