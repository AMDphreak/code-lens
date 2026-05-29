# Code Example Lenses

Multi-lens code block — one snippet, multiple pedagogical naming conventions (didactic, schematic, contextual, role-labeled).

**Live demo:** [ryanjohnson.dev/code-example-lenses](https://ryanjohnson.dev/code-example-lenses/)

## Why

Technical authors pick one naming convention per example. Readers encounter four referential strategies without vocabulary to name them. LensCodeBlock keeps syntax fixed while identifiers rotate — with diff highlighting, themeable panel colors per lens, hover preview, and touch swipe.

## Quick start (vanilla)

```bash
pnpm install
pnpm dev   # demo site at localhost:5174
```

```js
import { createLensCodeBlock, registerLensCodeBlock } from "@examplens/vanilla";
import { parseLensBlock, parseThemes, parseUi } from "@examplens/core";

registerLensCodeBlock();
const el = createLensCodeBlock({
  document: parseLensBlock(blockJson5),
  themes: parseThemes(themesJson5),
  ui: parseUi(uiJson5),
}, "earth");
document.body.appendChild(el);
```

## Portable spec

| File | Role |
|------|------|
| [`spec/examples/*.json5`](spec/examples/) | Aligned token data per lens |
| [`spec/themes.json5`](spec/themes.json5) | Six color schemes, distinct panel per lens |
| [`spec/ui.json5`](spec/ui.json5) | Interaction + animation constants |

- [Full specification](docs/specification.md)
- [AI / LLM reproduction spec](docs/ai-reproduction-spec.md)
- [Implementation registry](implementations/REGISTRY.md)

## Packages

| Package | Status |
|---------|--------|
| `@examplens/core` | Spec loader, themes, slot detection |
| `@examplens/vanilla` | `<lens-code-block>` web component |
| `@examplens/solid` | WIP |

## Changelog

See [CHANGELOG.md](CHANGELOG.md).

## License

MIT
