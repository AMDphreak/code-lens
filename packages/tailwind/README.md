# @code-lens/tailwind

**Planned.** Tailwind utility-class skin for the same DOM structure `@code-lens/vanilla` renders.

## Model

| Layer | Package |
|-------|---------|
| Behavior | `@code-lens/vanilla` + `@code-lens/core` (required) |
| CSS skin | `@code-lens/css` (shipped) |
| Tailwind skin | `@code-lens/tailwind` (this package) |

Tailwind is **not** a separate component implementation — it replaces the CSS import, not the web component.

## Until this ships

```js
import "@code-lens/css";
import { registerCodeLens } from "@code-lens/vanilla";
```

Works in Tailwind projects (including Solid + solid-ui demos). The lens block uses its own scoped `.el-*` classes; page chrome can stay Tailwind.

See [docs/ecosystem.md](../../docs/ecosystem.md).
