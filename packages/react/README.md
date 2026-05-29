# @code-lens/react

**Status:** planned

React adapter for [code-lens](https://github.com/AMDphreak/code-lens).

## Glass lens

Use `@code-lens/vanilla` inside a `useRef` host — full tab pill + diff-token sweep when `shouldUseDomGlassLens()` is true. See [docs/glass-lens-capabilities.md](../../docs/glass-lens-capabilities.md).

## Planned API

```tsx
import { CodeLens } from "@code-lens/react";
import block from "../../spec/examples/zig-namespace.json5";

<CodeLens document={block} themes={themes} ui={ui} themeId="earth" />
```

## Registry

[`spec/implementations.json5`](../../spec/implementations.json5)
