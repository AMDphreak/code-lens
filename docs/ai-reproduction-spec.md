# AI / LLM Reproduction Spec — code-lens

Use this document to implement **code-lens** in any UI framework or toolkit. Follow normative MUST/SHOULD language.

## Product definition

Build a component that renders **one aligned multi-line code example** in **four pedagogical lenses**:

1. **didactic** — names are the lesson (`bad_field`)
2. **schematic** — abstract placeholders (`T`, `value`)
3. **contextual** — production-shaped names (`WriterHelpers`)
4. **role** — structural roles (`namespace_member`)

Syntax tokens are identical across lenses. Only slotted tokens (identifiers, strings, comments with a shared `slot` key) differ.

## Data loading

Load three JSON5 files from the repository `spec/` directory:

- Example document (e.g. `spec/examples/zig-namespace.json5`)
- `spec/themes.json5`
- `spec/ui.json5`

Parse with JSON5. Validate: equal line counts, equal token counts per line, `version: 1`.

Compute variable slots: any `slot` whose `text` differs across lenses.

## Visual structure

```
┌─ toolbar ─────────────────────────────────────┐
│ [glass pill]  Lens  [Didactic][Schematic]…  zig │
├─ body (background = theme.lenses[active].panel) ─┤
│ subtitle + description                          │
│ ┌─ code surface (chrome.codeSurface) ─────────┐ │
│ │ syntax-highlighted lines                    │ │
│ │ slotted tokens in rounded diff boxes        │ │
│ └─────────────────────────────────────────────┘ │
│ footnote hint                                   │
└─────────────────────────────────────────────────┘
```

## Theme rules

- When lens `L` is active, set panel background to `themes[themeId].lenses[L].panel`.
- Each of the four lenses MUST use a **different** panel color within a theme.
- Diff boxes use `diff` background + `diffBorder` border for the active lens.
- Expose six themes: tropical, earth, earthenware, patina, fruits, desert.

## Interaction

### Desktop (pointer fine)

- `mouseenter` / `focus` on tab → preview lens (update code + panel color + meta).
- `mouseleave` toolbar → revert preview to committed lens.
- `click` tab → commit lens.
- Animate a **glassmorphism pill** behind tabs: `backdrop-filter: blur(12px)`, semi-transparent white/tint, slides with `cubic-bezier(0.16, 1, 0.3, 1)` over ~320ms.

### Mobile (pointer coarse)

- Horizontal swipe on code area cycles lenses with before/after reveal feel.
- Show ghost overlay at ~35% opacity during drag.
- On `touchend`, commit current preview lens.
- Show hint text: "Swipe code to preview lenses".

## Diff token animation (required)

For each slotted token when text changes:

1. Measure old and new glyph width in monospace at 13px.
2. Outer shell: `display: inline-block; overflow: hidden; border-radius: 3px; border; background`.
3. Animate shell **width** from old→new over 420ms with ease-out curve `cubic-bezier(0.16, 1, 0.3, 1)`.
4. Inner clip: `overflow: hidden; padding: 0 2px`.
5. Cross-fade text: outgoing span opacity 1→0 (220ms), incoming 0→1 (220ms, 60ms delay).
6. Stack outgoing/incoming in CSS grid same cell so width animation doesn't spill glyphs.

### Literal glass lens over diff tokens (required for web)

Simultaneously with steps 3–5, render a **glassmorphism lens** element inside each morphing diff shell:

- Pill-shaped overlay (~62% width of token), `border-radius: 999px`.
- `backdrop-filter: blur(11px) saturate(1.35)`, semi-transparent white gradient, subtle border.
- Animate **translateX** from `-115%` → `+115%` over `glassLensPassMs` (520ms default).
- **Stagger by line**: `animation-delay = lineIndex × glassLensLineStaggerMs` (55ms default). Line 0 starts immediately; each subsequent code line's diff tokens start later.
- Runs in parallel with width morph and text cross-fade — all three must be visible together.
- Honor `prefers-reduced-motion`: hide glass lens, shorten width transition.

Non-slotted tokens: swap text instantly, syntax color by `kind`.

## Syntax colors

Map token `kind` to theme `syntax.{kind}` hex values.

Kinds: keyword, type, identifier, string, comment, punctuation, number, builtin, macro, operator.

## API surface (web reference)

```js
import { createCodeLens, registerCodeLens } from "@code-lens/vanilla";
registerCodeLens();
const el = createCodeLens({ document, themes, ui }, "earth");
host.appendChild(el);
```

Other frameworks: wrap the same state machine — `committedLensIndex`, `previewLensIndex`, `themeId`, morph map keyed by `line:token`.

## State machine

```
displayIndex = previewIndex ?? committedIndex
onTabHover(i): previewIndex = i
onToolbarLeave(): previewIndex = null
onTabClick(i): committedIndex = i; previewIndex = null
onSwipe(delta): if |delta| > threshold, previewIndex ± 1
onTouchEnd(): committedIndex = displayIndex; previewIndex = null
```

## Accessibility

- `role="tablist"` / `role="tab"` / `aria-selected`
- Support keyboard tab focus on lens buttons
- Respect `prefers-reduced-motion`: set width transition to 0ms and skip cross-fade

## Reference implementation

- `@code-lens/core` — parsing and themes
- `@code-lens/vanilla` — `<code-lens>` custom element
- Live demo: GitHub Pages site in `/demo`

## Acceptance checklist

- [ ] Four lenses switch with aligned tokens
- [ ] Variable slots highlighted
- [ ] Panel background changes per lens
- [ ] Six themes selectable
- [ ] Hover preview + click commit on desktop
- [ ] Swipe on touch
- [ ] Glass pill tracks active/hovered tab
- [ ] Diff tokens animate width + cross-fade + **glass lens sweep** with per-line stagger
- [ ] Loads JSON5 spec without hardcoding example text
