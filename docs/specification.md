# code-lens Specification

Version 0.3 — portable across web, desktop, and mobile implementations.

## Overview

**code-lens** displays one code example through multiple **pedagogical lenses**. Syntax and structure are identical across lenses; only referential tokens change. Variable tokens cross-fade when switching lenses, with optional per-token sheen and a block-wide glass sweep over the code panel.

## Spec files

| File | Purpose |
|------|---------|
| `spec/lens-block.schema.json5` | Schema for example documents |
| `spec/examples/*.json5` | Example content (aligned tokens per lens) |
| `spec/themes.json5` | Color schemes — each theme includes **light** and **dark** appearance modes (v2) |
| `spec/ui.json5` | Interaction model and animation constants |
| `spec/implementations.json5` | Implementation registry + glass lens tiers |

## Lens IDs (normative)

| ID | Label | Role |
|----|-------|------|
| `didactic` | Didactic | Concept-labeled names |
| `schematic` | Schematic | Abstract placeholders |
| `contextual` | Contextual | Production-shaped names |
| `role` | Role-labeled | Structural role names |

## Appearance

- Pedagogical **theme** (`earth`, `tropical`, …) sets lens panel tints and syntax palette.
- **Appearance** (`auto` \| `light` \| `dark`) selects light or dark mode within that theme (`themes.json5` v2).
- Web: `<code-lens appearance="auto" theme="earth">` or `CodeLensConfig.appearance`.

## Meta copy

Subtitle and description update **instantly** on lens preview/commit. There is no animated reflow of the concept paragraph in the reference web implementation.

## Animation (`spec/ui.json5`)

### Code line layout

- Each line: flex row, `align-items: baseline`, `white-space: pre`
- Token spans: `flex-shrink: 0`

### Slotted token morph

Variable slots (`slot` key with differing text across lenses):

| Phase | Behavior |
|-------|----------|
| At rest | `.el-slot` — `inline-block`, syntax-colored, no box, `width: auto` |
| Morph | `.el-slot.is-morphing` — same `inline-block`, `overflow: hidden`, width set to measured **incoming** text (px), no height pin |
| Layers | `.el-slot-in` (in flow) + `.el-slot-out` (absolute) opacity cross-fade (`fadeMs`, `fadeDelayMs`) |
| Sheen | `::after` gradient on morph shell, timed with `glassBlockPassMs` |
| Settle | Plain `.el-slot` text node, width cleared |

**Normative invariants** (see [ai-reproduction-spec.md](./ai-reproduction-spec.md)):

- No `display` flip between rest and morph
- No `inline-grid` text stack
- Measure token width via hidden probe on code panel, not inside clipped shell
- No CSS width transition on morph shell (instant pin to final width)

`widthMs` / `widthEasing` in `ui.json5` feed CSS variables; primary consumer is sheen easing (`--el-width-easing`). Diff padding/radius vars exist for tab fallback styling when glass is disabled.

### Block glass overlay (when supported)

- Single overlay over the code panel when blur compositing works (not per token)
- Pass duration: `glassBlockPassMs` (520ms)
- Diagonal gradient sheens + brief backdrop blur; no line stagger
- Runs **simultaneously** with slotted cross-fade
- **Fallback:** cross-fade + sheen only — see [glass-lens-capabilities.md](./glass-lens-capabilities.md)

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

## Further reading

- [AI / LLM reproduction spec](./ai-reproduction-spec.md) — normative implementation detail for ports
- [Glass lens capabilities](./glass-lens-capabilities.md)
- [Editor integrations](./editor-integrations.md)
