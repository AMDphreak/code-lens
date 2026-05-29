# @code-lens/solid

**Adapter** — mounts the vanilla `<code-lens>` web component in a Solid app. Does not re-implement lens logic.

```tsx
import { CodeLens } from "@code-lens/solid";
import "@code-lens/css";
import { lensDocument, themes, ui } from "./spec";

<CodeLens
  document={lensDocument}
  themes={themes}
  ui={ui}
  themeId="earth"
  appearance="auto"
/>
```

The GitHub Pages demo uses Solid + solid-ui for **page chrome** only; the lens block is still `@code-lens/vanilla` under the hood.

React / Vue / Svelte: embed `@code-lens/vanilla` the same way — see [docs/ecosystem.md](../../docs/ecosystem.md).
