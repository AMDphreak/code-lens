# AI / LLM Reproduction Spec — code-lens

Use this document to implement **code-lens** in any UI framework or toolkit. Follow normative MUST/SHOULD language.

**Reference commit behavior:** slotted morph layout as shipped in `@code-lens/vanilla` ≥ 0.3.9 (restored in 0.3.11) — flex baseline lines, `inline-block` slots at rest and morph, width pin to measured incoming text only, opacity cross-fade, block glass sweep.

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
- `spec/themes.json5` (version **2** — light/dark per theme + `syntaxDark`)
- `spec/ui.json5`

Parse with JSON5. Validate: equal line counts, equal token counts per line, `version: 1`.

Compute variable slots: any `slot` whose `text` differs across lenses.

## Visual structure

```
┌─ toolbar ─────────────────────────────────────┐
│ [glass pill]  Lens  [Didactic][Schematic]…  zig │
├─ body (background = theme.lenses[active].panel) ─┤
│ subtitle + description (updates instantly)      │
│ ┌─ code surface (chrome.codeSurface) ─────────┐ │
│ │ one flex row per line (baseline-aligned)     │ │
│ │ slotted tokens = plain spans + morph sheen   │ │
│ └─────────────────────────────────────────────┘ │
│ footnote hint                                   │
└─────────────────────────────────────────────────┘
```

## Theme rules

- When lens `L` is active, set panel background to `themes[themeId][appearance].lenses[L].panel` where `appearance` is resolved `light` or `dark`.
- Each of the four lenses MUST use a **different** panel color within a theme mode.
- Slotted tokens are syntax-colored plain spans at rest — **no highlight box, no fixed width**.
- On lens change: opacity cross-fade inside a clipped morph shell, optional per-token gradient sheen, block glass sweeps the full panel.
- Expose six themes: tropical, earth, earthenware, patina, fruits, desert.
- Host attribute `appearance="auto|light|dark"` selects light/dark chrome + syntax independently of pedagogical theme id.

## Interaction

### Desktop (pointer fine)

- `mouseenter` / `focus` on tab → preview lens (update code + panel color + meta).
- `mouseleave` toolbar → revert preview to committed lens.
- `click` tab → commit lens.
- Animate a **glassmorphism pill** behind tabs: `backdrop-filter: blur(12px)`, semi-transparent white/tint, slides with `cubic-bezier(0.16, 1, 0.3, 1)` over ~320ms (`glassSlideMs`).

### Mobile (pointer coarse)

- **Tap lens tabs** to switch lenses (`touch.preview: "tabs"`). Do not bind swipe to the code panel — keep code selectable for copy/paste.
- Larger tab hit targets (`tabMinHeightPx` from spec).
- Hint text: "Tap lens tabs to switch — code is selectable".

Optional legacy mode: `touch.preview: "swipe"` enables horizontal swipe on the code area (not recommended when copy matters).

## Code line layout (normative)

Each source line is a **flex row** (`.el-line`):

- `display: flex; flex-direction: row; flex-wrap: nowrap; align-items: baseline`
- `white-space: pre; line-height: inherit` (match monospace `line-height`, typically ~1.6)
- Direct children (`span` tokens) MUST NOT shrink: `flex-shrink: 0`

Plain (non-slotted) tokens: single `<span class="el-token-kind-{kind}">` with text.

## Slotted token morph (required)

Applies to tokens with a `slot` key whose text **varies** across lenses.

### At rest

- Element: `<span class="el-slot el-token-kind-{kind}">`
- CSS: `display: inline-block; width: auto; vertical-align: baseline; line-height: inherit`
- **MUST NOT** use diff highlight boxes, borders, or fixed pixel width by default.
- Optional **box** mode: `slot-highlight="box"` or `slotHighlight="box"` adds rounded pill via `::before` (`--el-diff-bg`, `--el-diff-border`, padding/radius from `ui.json5`).

### On lens change (when incoming text ≠ previous)

1. **Morph shell:** `<span class="el-slot is-morphing">` with **same** `display: inline-block` (no display flip at rest vs morph).
2. **Width pin:** set `style.width` to measured **incoming** text width in px. Measure using a hidden probe attached to the code panel with the live monospace font — **never** measure inside the clipped morph shell (that yields ~0–4px and breaks layout).
3. **Do not pin height.** Line height comes from flex baseline alignment + in-flow incoming layer.
4. **Cross-fade layers:**
   - `.el-slot-in` — incoming text, **in document flow** (`white-space: pre`)
   - `.el-slot-out` — outgoing text, `position: absolute; left: 0; top: 0`, same line-height
   - Animate opacity: out `fadeMs` ease-out; in `fadeMs` ease-in after `fadeDelayMs`
5. **No CSS width transition** — width jumps to final incoming size immediately (no animated width morph).
6. **Per-token sheen:** `::after` on `.el-slot.is-morphing` — soft-light gradient sweep for `glassBlockPassMs`, easing `widthEasing`.
7. **Settle:** after `fadeMs + fadeDelayMs + buffer`, remove morph shell, clear width, replace with plain `.el-slot` text node.

### Anti-patterns (do NOT implement)

| Wrong | Why |
|-------|-----|
| `display: inline` at rest → `inline-block` only while morphing | Causes line-height jumps |
| `inline-grid` stack for in/out text | Broke width/height metrics in reference |
| Pinning measured **height** on morph shell | Regressed vertical spacing (reverted in 0.3.11) |
| Measuring width inside `overflow: hidden` shell | Clips probe → invisible text |
| Bordered `.el-diff` boxes around slots | Removed — use plain syntax-colored spans |
| Animated meta/description height on lens switch | Not shipped — subtitle/description update instantly |

Non-slotted tokens: swap text instantly, syntax color by `kind`.

### Block glass overlay (when blur compositing is available)

On any platform that supports blur (CSS `backdrop-filter`, native Material/blur APIs, `BackdropFilter`, etc.), simultaneously render a **single block-wide glass layer** over the code panel (not per-token). **Probe at runtime** — use cross-fade only when blur is unavailable. See [glass-lens-capabilities.md](./glass-lens-capabilities.md).

- One overlay (`.el-code-glass`) covers the full code panel during lens switches.
- Three diagonal gradient sheens sweep in opposing directions; a brief `backdrop-filter` blur pass runs in parallel.
- Duration: `glassBlockPassMs` (520ms default). **No line stagger** — the entire panel animates as one layer.
- `mix-blend-mode: soft-light` and `pointer-events: none` keep syntax colors readable and text selectable underneath.
- Runs in parallel with slotted cross-fade and per-token sheen.
- Honor `prefers-reduced-motion`: hide block glass and per-token sheen.

## Syntax colors

Map token `kind` to theme `syntax.{kind}` (light) or `syntaxDark.{kind}` (dark) hex values.

Kinds: keyword, type, identifier, string, comment, punctuation, number, builtin, macro, operator.

## API surface (web reference)

```js
import "@code-lens/css";
import { createCodeLens, registerCodeLens } from "@code-lens/vanilla";
registerCodeLens();
const el = createCodeLens({ document, themes, ui, appearance: "auto" }, "earth");
host.appendChild(el);
```

```html
<code-lens theme="earth" appearance="auto"></code-lens>
```

Other frameworks: wrap the same state machine — `committedLensIndex`, `previewLensIndex`, `themeId`, `appearance`, morph map keyed by `line:token`.

## State machine

```
displayIndex = previewIndex ?? committedIndex
onTabHover(i): previewIndex = i; update meta + code
onToolbarLeave(): previewIndex = null
onTabClick(i): committedIndex = i; previewIndex = null
onSwipe(delta): if |delta| > threshold, previewIndex ± 1  // legacy touch.preview: swipe only
onTouchEnd(): committedIndex = displayIndex; previewIndex = null
```

On lens index change: rebuild code DOM, preserve morph state per slot key, trigger block glass once per lens change (not first paint).

## Accessibility

- `role="tablist"` / `role="tab"` / `aria-selected`
- Support keyboard tab focus on lens buttons
- Respect `prefers-reduced-motion`: skip cross-fade transitions, block glass, and per-token sheen

## Reference implementation

- `@code-lens/core` — parsing, themes, glass capability probe
- `@code-lens/vanilla` — `<code-lens>` custom element (`packages/vanilla/src/code-lens.ts`, `code-lens.css`)
- `@code-lens/solid` — Solid adapter (demo)
- Live demo: GitHub Pages `/demo` (port 5174 locally)

## Acceptance checklist

- [ ] Four lenses switch with aligned tokens
- [ ] Variable slots highlighted (plain spans, syntax-colored)
- [ ] Panel background changes per lens
- [ ] Six themes selectable
- [ ] Hover preview + click commit on desktop
- [ ] Tap lens tabs on touch (code panel stays selectable)
- [ ] `appearance="auto|light|dark"` tints chrome + syntax (`themes.json5` v2)
- [ ] Glass pill tracks active/hovered tab
- [ ] Code lines use flex baseline alignment; slotted morph does not increase line height
- [ ] Slotted tokens cross-fade with width pinned to incoming text; block glass sweep on lens change
- [ ] Loads JSON5 spec without hardcoding example text
