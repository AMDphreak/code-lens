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
│ │ slotted tokens = plain spans + morph sheen   │ │
│ └─────────────────────────────────────────────┘ │
│ footnote hint                                   │
└─────────────────────────────────────────────────┘
```

## Theme rules

- When lens `L` is active, set panel background to `themes[themeId].lenses[L].panel`.
- Each of the four lenses MUST use a **different** panel color within a theme.
- Slotted tokens are plain inline spans at rest; on lens change they cross-fade with an optional per-token gradient sheen. Block glass sweeps the full panel.
- Expose six themes: tropical, earth, earthenware, patina, fruits, desert.

## Interaction

### Desktop (pointer fine)

- `mouseenter` / `focus` on tab → preview lens (update code + panel color + meta).
- `mouseleave` toolbar → revert preview to committed lens.
- `click` tab → commit lens.
- Animate a **glassmorphism pill** behind tabs: `backdrop-filter: blur(12px)`, semi-transparent white/tint, slides with `cubic-bezier(0.16, 1, 0.3, 1)` over ~320ms.

### Mobile (pointer coarse)

- **Tap lens tabs** to switch lenses (`touch.preview: "tabs"`). Do not bind swipe to the code panel — keep code selectable for copy/paste.
- Larger tab hit targets (`tabMinHeightPx` from spec).
- Hint text: "Tap lens tabs to switch — code is selectable".

Optional legacy mode: `touch.preview: "swipe"` enables horizontal swipe on the code area (not recommended when copy matters).

## Diff token animation (required)

For each slotted token when text changes:

1. At rest: plain inline span (`.el-slot`) with syntax class — no box, no fixed width.
2. On lens change: cross-fade outgoing/incoming text in an `inline-grid` stack (same cell).
3. Per-token gradient sheen (`::after` on `.el-slot-stack`) during the transition.
4. No width animation — natural inline metrics only.

### Block glass overlay (when blur compositing is available)

On any platform that supports blur (CSS `backdrop-filter`, native Material/blur APIs, `BackdropFilter`, etc.), simultaneously render a **single block-wide glass layer** over the code panel (not per-token). **Probe at runtime** — use cross-fade only when blur is unavailable. See [glass-lens-capabilities.md](./glass-lens-capabilities.md).

- One overlay (`.el-code-glass`) covers the full code panel during lens switches.
- Three diagonal gradient sheens sweep in opposing directions to simulate light on rotating glass; a brief `backdrop-filter` blur pass runs in parallel.
- Duration: `glassBlockPassMs` (520ms default). **No line stagger** — the entire panel animates as one layer.
- `mix-blend-mode: soft-light` and `pointer-events: none` keep syntax colors readable and text selectable underneath.
- Runs in parallel with text cross-fade and per-token sheen.
- Honor `prefers-reduced-motion`: hide block glass and per-token sheen.

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
- [ ] Tap lens tabs on touch (code panel stays selectable)
- [ ] `appearance="auto|light|dark"` tints chrome + syntax (`themes.json5` v2 light/dark modes)
- [ ] Glass pill tracks active/hovered tab
- [ ] Diff tokens animate width + cross-fade; **block glass sweep** over code panel on lens change
- [ ] Loads JSON5 spec without hardcoding example text
