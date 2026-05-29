# code-lens-seed

```rust
use code_lens_seed::{code_lens, CodeLensProps};

code_lens(&CodeLensProps {
    config_json: CONFIG_JSON.to_string(),
    ..Default::default()
})
```

Import `@code-lens/wasm-bridge` in your app JS entry.
