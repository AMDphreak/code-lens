# D adapters (libwasm + dlangui)

D packages for mounting **`@code-lens/vanilla`** from D web and desktop apps.

## libwasm / browser (WASM SPA)

1. Import in `index.html` / webpack entry:

```html
<script type="module">
  import "@code-lens/wasm-bridge";
  import "@code-lens/css";
</script>
```

2. Create a host div with `data-code-lens-host="true"`.

3. After DOM ready, eval:

```d
import code_lens.bridge : attachScript;
// via spasm/libwasm JS interop:
// eval(attachScript(configJson));
```

Module: `code_lens.libwasm`

## dlangui (native desktop)

[dlangui](https://github.com/buggins/dlangui) renders **native widgets**, not HTML. Embed code-lens via a **companion webview window/panel** (ggwebview, guino, or DUB `webview`):

```d
import code_lens.dlangui;

auto cfg = CodeLensWebViewConfig(
    configJson: mySpecJson,
    shellUrl: "file:///path/to/code-lens-shell.html",
);
mountInWebView(webview, cfg);
```

Use `code_lens.bridge.htmlShell` to generate a minimal shell page.

Module: `code_lens.dlangui`

## Build

```bash
dub build --root=implementations/d
```

## Dub package

Add as a path dependency:

```json
"dependencies": {
  "code-lens-d": { "path": "../code-example-lenses/implementations/d" }
}
```
