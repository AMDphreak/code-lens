# code-lens Specification

Version 0.2 — portable across web, desktop, and mobile implementations.

## Overview

**code-lens** displays one code example through multiple **pedagogical lenses**. Syntax and structure are identical across lenses; only referential tokens change. Variable tokens are highlighted, width-morphed, cross-faded, and swept by a literal glass lens overlay when switching lenses.

## Spec files

| File | Purpose |
|------|---------|
| `spec/lens-block.schema.json5` | Schema for example documents |
| `spec/examples/*.json5` | Example content (aligned tokens per lens) |
| `spec/themes.json5` | Color schemes + per-lens panel backgrounds |
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

- Width transition: `widthMs` + `widthEasing`
- Text cross-fade: `fadeMs` / `fadeDelayMs`
- Inner clip: `overflow: hidden`

### Glass lens sweep (when supported)

- Pill overlay inside each morphing diff shell when blur compositing works
- Pass duration: `glassLensPassMs` (520ms)
- Line stagger: `glassLensLineStaggerMs` (55ms) × line index
- Runs **simultaneously** with width morph and cross-fade
- **Fallback:** morph + cross-fade only — see [glass-lens-capabilities.md](./glass-lens-capabilities.md)

## Packages

```
@code-lens/core     — parse spec, slot detection, theme resolution, blur probe
@code-lens/vanilla  — <code-lens> web component
@code-lens/solid    — SolidJS wrapper (wip)
@code-lens/react    — planned (+ vue, svelte, angular, preact, lit)
```

See [implementations/REGISTRY.md](../implementations/REGISTRY.md) and [glass-lens-capabilities.md](./glass-lens-capabilities.md) for the full matrix.
