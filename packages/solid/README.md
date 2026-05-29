# @code-lens/solid

SolidJS wrapper for the `<code-lens>` web component.

**Status:** wip · **Glass lens:** full (delegates to vanilla; runtime blur probe)

## Usage

```tsx
import { CodeLens, parseLensBlock, parseThemes, parseUi } from "@code-lens/solid";
import blockSource from "./example.json5?raw";

const document = parseLensBlock(blockSource);
const themes = parseThemes(themesSource);
const ui = parseUi(uiSource);

<CodeLens document={document} themes={themes} ui={ui} themeId="earth" />
```

## Build

```bash
pnpm --filter @code-lens/solid build
```

Requires `@code-lens/vanilla` (peer-style workspace dependency).
