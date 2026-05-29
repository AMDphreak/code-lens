# @code-lens/css

Stylesheet for the code-lens component DOM (`.el-*` classes). **Does not include behavior.**

Pair with [`@code-lens/vanilla`](../vanilla) for lens switching, diff morph, and glass animation:

```js
import "@code-lens/css";
import { registerCodeLens, createCodeLens } from "@code-lens/vanilla";
```

Same file as `@code-lens/vanilla/code-lens.css` — this package exists so apps can depend on **CSS only** when bundling or documenting the presentation layer separately.

See [docs/ecosystem.md](../../docs/ecosystem.md).
