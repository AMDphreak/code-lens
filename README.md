# code-lens

One snippet, multiple pedagogical naming conventions — the real lens for code examples (not a metaphor).

**Live demo:** [ryanjohnson.dev/code-lens](https://ryanjohnson.dev/code-lens/)

## Why

Technical authors pick one naming convention per example. Readers encounter four referential strategies without vocabulary to name them. **code-lens** keeps syntax fixed while identifiers rotate — with diff highlighting, per-lens panel colors, hover preview, touch swipe, and a literal glass lens sweep over morphing tokens.

## Quick start (vanilla)

```bash
pnpm install
pnpm dev
```

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
- [AI / LLM reproduction spec](docs/ai-reproduction-spec.md)
- [Implementation registry](implementations/REGISTRY.md)

## Packages

| Package | Status |
|---------|--------|
| `@code-lens/core` | Spec loader, themes, slot detection |
| `@code-lens/vanilla` | `<code-lens>` web component |
| `@code-lens/solid` | WIP |

## License

MIT
