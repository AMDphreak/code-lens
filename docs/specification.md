# LensCodeBlock Specification

Version 1.0 — portable across web, desktop, and mobile implementations.

## Overview

A **LensCodeBlock** displays one code example through multiple **pedagogical lenses**. Syntax and structure are identical across lenses; only referential tokens (identifiers, string literals, comments) change. Variable tokens are highlighted and animated when switching lenses.

## Spec files

| File | Purpose |
|------|---------|
| `spec/lens-block.schema.json5` | Schema for example documents |
| `spec/examples/*.json5` | Example content (aligned tokens per lens) |
| `spec/themes.json5` | Color schemes + per-lens panel backgrounds |
| `spec/ui.json5` | Interaction model and animation constants |

Implementations SHOULD load all three runtime files (`example`, `themes`, `ui`) and MAY cache them.

## Lens IDs (normative)

| ID | Label | Role |
|----|-------|------|
| `didactic` | Didactic | Concept-labeled names |
| `schematic` | Schematic | Abstract placeholders |
| `contextual` | Contextual | Production-shaped names |
| `role` | Role-labeled | Structural role names |

## Token alignment

- Every lens MUST have the same number of lines.
- Every line MUST have the same number of tokens in the same order.
- Tokens that vary MUST share a `slot` string across lenses.
- Tokens with identical `text` in all lenses SHOULD omit `slot`.

## Theme system

Each theme in `spec/themes.json5` defines:

- **`lenses.{id}.panel`** — background for the body/code area when that lens is active (required; distinct per lens).
- **`lenses.{id}.diff`** / **`diffBorder`** / **`glass`** — diff token and tab glass tint.
- **`chrome.*`** — toolbar, code surface, border, text.
- **`syntax.*`** — token kind colors (shared across lenses).

Built-in themes: `tropical`, `earth`, `earthenware`, `patina`, `fruits`, `desert`.

## Interaction (`spec/ui.json5`)

### Desktop

- **Preview:** pointer enter on lens tab → update display without commit.
- **Commit:** click tab → lock selection.
- **Glass indicator:** frosted pill animates to hovered/focused tab (`backdrop-filter: blur`).

### Touch / mobile

- **Preview:** horizontal swipe on code panel (before/after reveal metaphor).
- **Commit:** tap tab, or on `touchend` after swipe preview.
- **Threshold:** `swipeThresholdPx` (default 48).

### Diff token animation

- Width transition: `widthMs` + `widthEasing` (log-like ease-out).
- Text cross-fade: outgoing opacity 1→0, incoming 0→1 with delay.
- Clip: inner wrapper `overflow: hidden`; shell width animates explicitly.

## Accessibility

- Tab bar: `role="tablist"`, tabs `role="tab"`, `aria-selected`.
- Keyboard: arrow keys SHOULD cycle lenses when tablist focused (planned).
- Reduced motion: honor `prefers-reduced-motion` (implementations SHOULD shorten or disable morph).

## Package layout

```
@examplens/core     — parse spec, slot detection, theme resolution
@examplens/vanilla  — <lens-code-block> web component
@examplens/solid    — SolidJS (WIP)
…                   — see implementations/REGISTRY.md
```

## Publishing

npm packages under `@examplens/*`. Spec files ship in the repository root and are copied into published packages as needed.
