# code-lens

One snippet, multiple pedagogical naming conventions — the real lens for code examples (not a metaphor).

**Live demo:** [ryanjohnson.dev/code-lens](https://ryanjohnson.dev/code-lens/)

## Delivery model

**In Solid/React/Next you install a component** — e.g. `import { CodeLens } from "@code-lens/solid"`. Under the hood one shared engine powers every framework package; you don’t touch that unless you’re on plain HTML.

| Layer | Package |
|-------|---------|
| Component (your import) | `@code-lens/solid`, `@code-lens/react`, … |
| Skin | `@code-lens/css` or `@code-lens/tailwind` (planned) |
| Engine | `@code-lens/vanilla` + `@code-lens/core` (pulled in automatically) |

→ [docs/ecosystem.md](docs/ecosystem.md)

## Quick start

```bash
pnpm install
pnpm dev          # SolidJS + solid-ui demo (port 5174) — mounts vanilla <code-lens>
```

```js
import "@code-lens/css";
import { createCodeLens, registerCodeLens } from "@code-lens/vanilla";
import { parseLensBlock, parseThemes, parseUi } from "@code-lens/core";

registerCodeLens();
const el = createCodeLens({
  document: parseLensBlock(blockJson5),
  themes: parseThemes(themesJson5),
  ui: parseUi(uiJson5),
}, "earth");
document.body.appendChild(el);
```

```html
<code-lens theme="earth" appearance="auto"></code-lens>
```

`appearance`: `auto` | `light` | `dark` — independent of pedagogical color theme.

## Portable spec

| File | Role |
|------|------|
| [`spec/examples/*.json5`](spec/examples/) | Aligned token data per lens |
| [`spec/themes.json5`](spec/themes.json5) | Color schemes (light/dark per theme) |
| [`spec/ui.json5`](spec/ui.json5) | Interaction + animation |

- [Ecosystem / delivery model](docs/ecosystem.md)
- [Full specification](docs/specification.md)
- [AI / LLM reproduction spec](docs/ai-reproduction-spec.md) — normative porting detail
- [Glass lens capabilities](docs/glass-lens-capabilities.md)
- [Implementation registry](implementations/REGISTRY.md)

## License

MIT
