# Jane Street Bonsai_web adapter

[Bonsai_web](https://github.com/janestreet/bonsai_web) (OCaml → JavaScript via `js_of_ocaml`) mounts the same **`@code-lens/vanilla`** runtime as React or Leptos.

## Setup

1. npm deps in the JS bundle loaded **before** `main.bc.js`:

```html
<script type="module">
  import "@code-lens/wasm-bridge";
  import "@code-lens/css";
</script>
<script defer src="main.bc.js"></script>
```

2. Vendor or copy [`code_lens_mount.ml`](./code_lens_mount.ml) into your app.

3. When your Bonsai graph owns a live DOM node (host `div`):

```ocaml
Code_lens_mount.mount ~host:div_element ~config_json:(Spec.config_to_json config)
```

On teardown:

```ocaml
Code_lens_mount.unmount ~host:div_element
```

`config_json` must match `CodeLensConfig` from the TypeScript types (same shape as `spec/*.json5` parsed together).

## Why embed instead of port?

Lens morph, measurement, glass timing, and theme resolution are maintained once in `@code-lens/vanilla`. Bonsai apps at Jane Street already ship JS interop for widgets — this follows the same pattern as the Rust and React adapters.

## Module API

| Value | Role |
|-------|------|
| `mount ~host ~config_json` | Attach `<code-lens>` inside `host` |
| `unmount ~host` | Clear host children |
| `host_attrs` | Suggested `Vdom.Attr.t` list for the host div |
