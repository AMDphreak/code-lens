# Editor integrations — feasibility

Can VS Code and Zed do **code-lens** (pedagogical lens switching on real source code)? **Partially yes**, with different ceilings.

## The core problem in editors

Static examples in [code-lens](https://github.com/AMDphreak/code-lens) ship pre-aligned token data. **Real code** has no `slot` keys — you must infer which identifiers play which role, then generate four naming variants (didactic, schematic, contextual, role-labeled).

That second step is where **AI or LSP + heuristics** enter. The portable spec still applies once you have aligned variants.

## VS Code — feasible (phased)

| Capability | API | Feasibility |
|------------|-----|-------------|
| Lens tab bar + preview | `WebviewPanel` + `@code-lens/vanilla` | **High** — reuse web component in sidebar or panel |
| Highlight “variable” tokens | `TextEditorDecorationType` | **High** — background/border on ranges |
| Width morph / glass sweep | DOM in webview only | **In panel: high.** Inline in Monaco: **low** — Monaco has no per-token width morph; use decorations + optional ghost text |
| Swap identifier text in buffer | `WorkspaceEdit` / transient virtual doc | **Medium** — apply edits to a **preview document** or ghost buffer, not silently mutating saved file |
| Infer roles from semantics | LSP `DocumentSymbol`, Tree-sitter, or **AI** | **Medium–high** — AI best for role-labeled/didactic naming |
| Hover lens switch | `HoverProvider` + commands | **High** |
| Keybinding cycle lenses | Commands | **High** |

### Recommended VS Code architecture

```
Selection / document
    → Role extractor (Tree-sitter + LSP symbols, optional AI)
    → Lens generator (AI or template) → JSON5-shaped lens document
    → @code-lens/core validate
    → Present via:
        (A) Webview panel — full glass lens + morph (best fidelity)
        (B) Editor decorations — diff-token highlights on real buffer
        (C) Optional VirtualDocument — show alternate lens text read-only
```

**AI generation prompt shape:** Given snippet + language + optional surrounding context, return four aligned variants with `slot` on tokens that change (same schema as `spec/examples/*.json5`).

Monaco **cannot** replicate the exact DOM glass-lens sweep on inline tokens without heavy custom rendering (e.g. `ViewZone` + HTML, fragile). **Use the webview for the full experience**; use **decorations** in the editor for “which tokens matter.”

See [extensions/vscode/README.md](../extensions/vscode/README.md).

## Zed — limited today, path via LSP

| Capability | Zed support | Feasibility |
|------------|-------------|-------------|
| Extension manifest | `extension.toml` | **High** |
| Custom web UI in editor | No first-class webview like VS Code | **Low** |
| Buffer decorations / inlays | Evolving; inlay hints, some extension APIs | **Medium** — check current Zed version |
| Lens preview UI | Embedded browser / panel extensions immature | **Low for inline morph** |
| LSP server | **Full** — Zed is LSP-native | **High** |

### Recommended Zed architecture

Ship a **code-lens LSP** (or extend an existing one) that:

1. Accepts `textDocument/didOpen` / range requests.
2. Runs role extraction + AI lens generation server-side.
3. Returns **inlay hints** (role labels), **diagnostic-style tags**, or **code actions** to open an external preview (browser / VS Code panel).

A native Zed UI matching the web glass-lens animation likely requires **upstream editor features** (custom element overlays on text). Until then, Zed users get **semantic role hints + external preview**, not pixel-identical morph.

See [extensions/zed/README.md](../extensions/zed/README.md).

## Shared: AI lens generation

Proposed module (editor-agnostic):

```
Input:  { language, source, selectionRange?, projectContext? }
Output: LensBlockDocument (JSON5) — four lenses, slotted tokens
```

- **Without AI:** user manually tags slots (CodeLens / command on selection).
- **With AI:** call configured provider (OpenAI, Anthropic, local Ollama); validate with `@code-lens/core`.
- Cache by content hash in workspace storage.

Privacy: default to **local / user-approved** AI; never send full repo without consent.

## DevCentr roadmap

IDE integrations are tracked on DevCentr as part of **developer UX / literate tooling**:

- [DevCentr Todo & Roadmap — code-lens IDE](https://docs.devcentr.org/DevCentr/latest/todo-roadmap.html)
- Upstream spec: [github.com/AMDphreak/code-lens](https://github.com/AMDphreak/code-lens)

## Summary

| Editor | Full web-parity lens UI | Role inference on real code | Practical v1 |
|--------|-------------------------|----------------------------|--------------|
| **VS Code** | Yes (webview panel) | Yes (AI + LSP) | Panel + decorations + AI generate |
| **Zed** | No (today) | Yes (via LSP) | LSP inlays + open preview in browser |

Both editors can participate in the **ecosystem**; neither needs to duplicate the spec — load `spec/` and `@code-lens/core`.
