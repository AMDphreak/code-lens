# code-lens Specification

Version 0.2 — portable across web, desktop, and mobile implementations.

## Overview

**code-lens** displays one code example through multiple **pedagogical lenses**. Syntax and structure are identical across lenses; only referential tokens change. Variable tokens are highlighted, width-morphed, cross-faded, and swept by a literal glass lens overlay when switching lenses.

## Spec files

| File | Purpose |
|------|---------|
| `spec/lens-block.schema.json5` | Schema for example documents |
| `spec/examples/*.json5` | Example content (aligned tokens per lens) |
| `spec/themes.json5` | Color schemes — each theme includes **light** and **dark** appearance modes |
| `spec/ui.json5` | Interaction model and animation constants |
| `spec/implementations.json5` | Implementation registry + glass lens tiers |

## Lens IDs (normative)

| ID | Label | Role |
|----|-------|------|
| `didactic` | Didactic | Concept-labeled names |
| `schematic` | Schematic | Abstract placeholders |
| `contextual` | Contextual | Production-shaped names |
| `role` | Role-labeled | Structural role names |

## Animation (`spec/ui.json5`)

### Diff token morph

- Inline background highlight via `::before` overlay (no border box — keeps baselines aligned with plain tokens)
- Width transition (morph only): `widthMs` + `widthEasing`
- Text cross-fade: `fadeMs` / `fadeDelayMs`
- Clip during morph: `overflow: hidden` on `inline-block` shell

### Block glass overlay (when supported)

- Single overlay over the code panel when blur compositing works (not per diff token)
- Pass duration: `glassBlockPassMs` (520ms)
- Diagonal gradient sheens + brief backdrop blur; no line stagger
- Runs **simultaneously** with width morph and cross-fade
- **Fallback:** morph + cross-fade only — see [glass-lens-capabilities.md](./glass-lens-capabilities.md)

## Packages

```
spec/               — JSON5 (portable data)
@code-lens/css      — stylesheet (presentation)
@code-lens/tailwind — utility skin (planned)
@code-lens/core     — parse spec, themes, blur probe
@code-lens/vanilla  — <code-lens> web component (runtime)
@code-lens/solid    — Solid host (adapter — mounts vanilla CE)
```

Framework adapters **embed** the web component; they do not re-implement behavior. See [ecosystem.md](./ecosystem.md).
