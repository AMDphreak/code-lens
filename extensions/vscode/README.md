# code-lens — VS Code extension

Starting point for in-editor pedagogical lens switching on **real code**.

**Status:** scaffold (commands + decoration stub + preview panel placeholder)

**Spec:** [github.com/AMDphreak/code-lens](https://github.com/AMDphreak/code-lens)

## What works today

- Commands registered: **Open Preview**, **Generate Lenses (AI)**, **Cycle Lens**
- Settings for AI provider, theme, in-editor decorations
- Decoration manager stub (highlight slotted ranges)
- Preview webview placeholder (Phase 2: embed `<code-lens>` from `@code-lens/vanilla`)

## Why AI?

Static examples ship pre-aligned tokens. Real buffers need:

1. **Role extraction** — which identifiers matter for the lesson?
2. **Lens generation** — four naming strategies for the same AST
3. **Validation** — `@code-lens/core` ensures alignment

Configure `code-lens.aiProvider` when implementation lands.

## Build (local)

```bash
cd extensions/vscode
pnpm install   # or npm install
pnpm compile
```

Press F5 in VS Code (**Run Extension**) with this folder opened.

## Architecture

See [docs/editor-integrations.md](../../docs/editor-integrations.md).

## Roadmap

- [ ] Bundle webview with `@code-lens/vanilla` + spec themes
- [ ] Implement OpenAI / Anthropic / Ollama in `src/ai/generateLenses.ts`
- [ ] Tree-sitter or LSP symbol map → slot candidates
- [ ] Manual slot tagging command (selection → slot id)
- [ ] Publish to Open VSX / Marketplace
