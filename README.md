# code-lens

One snippet, multiple pedagogical naming conventions — the real lens for code examples (not a metaphor).

**Live demo:** [ryanjohnson.dev/code-lens](https://ryanjohnson.dev/code-lens/)

## Why

Technical authors pick one naming convention per example. Readers encounter four referential strategies without vocabulary to name them. **code-lens** keeps syntax fixed while identifiers rotate — with diff highlighting, per-lens panel colors, hover preview, touch swipe, and a literal glass lens sweep over morphing tokens.

## Quick start (vanilla)

```bash
pnpm install
pnpm dev          # SolidJS + solid-ui GitHub Pages demo (port 5174)
```

See [`demo/README.md`](demo/README.md) for the Pages site stack and build steps.

```html
<script type="module">
  import { createCodeLens, registerCodeLens } from "@code-lens/vanilla";
  import { parseLensBlock, parseThemes, parseUi } from "@code-lens/core";

  registerCodeLens();
  const el = createCodeLens({
    document: parseLensBlock(blockJson5),
    themes: parseThemes(themesJson5),
    ui: parseUi(uiJson5),
  }, "earth");
  document.body.appendChild(el);
</script>
```

Or use the custom element after `registerCodeLens()`:

```html
<code-lens></code-lens>
```

## Portable spec

| File | Role |
|------|------|
| [`spec/examples/*.json5`](spec/examples/) | Aligned token data per lens |
| [`spec/themes.json5`](spec/themes.json5) | Six color schemes, distinct panel per lens |
| [`spec/ui.json5`](spec/ui.json5) | Interaction + animation (including glass lens stagger) |

- [Full specification](docs/specification.md)
- [Glass lens capabilities](docs/glass-lens-capabilities.md)
- [Editor integrations — VS Code & Zed](docs/editor-integrations.md)
- [AI / LLM reproduction spec](docs/ai-reproduction-spec.md)
- [Implementation registry](implementations/REGISTRY.md) · [`spec/implementations.json5`](spec/implementations.json5)

## Packages

| Package | Status |
|---------|--------|
| `@code-lens/core` | Spec loader, themes, slot detection, blur probe |
| `@code-lens/vanilla` | `<code-lens>` web component (shipped) |
| `@code-lens/solid` | Solid wrapper (wip) — **used by GitHub Pages demo** |
| `@code-lens/react`, `vue`, `svelte`, `angular`, `preact`, `lit` | Planned |
| `@code-lens/react-native`, `@code-lens/flutter` | Planned (native glass lens) |

## License

MIT
