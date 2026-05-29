# Delivery model

Two views of the same thing — start with the one that matches how you build apps.

## What you install (app developer)

You always get a **component** (or a custom element for plain HTML). You never hand-wire lens logic yourself.

| Your stack | Install | Use |
|------------|---------|-----|
| **Solid** | `@code-lens/solid` | `<CodeLens … />` |
| **React** | `@code-lens/react` | `<CodeLens … />` |
| **Next.js** | `@code-lens/next` | `import { CodeLens } from "@code-lens/next"` (client) |
| **Preact** | `@code-lens/preact` | `<CodeLens … />` |
| **Vue 3** | `@code-lens/vue` | `<CodeLens … />` |
| **Svelte** | `@code-lens/svelte` | `<div use:codeLens={config} />` |
| **Angular** | `@code-lens/angular` | `<code-lens-host … />` |
| **Lit** | `@code-lens/lit` | `<code-lens-lit …>` |
| **Leptos / Yew / Dioxus / Sycamore / Dominator / Seed** | `code-lens-*` crate + `@code-lens/wasm-bridge` | `<CodeLens config_json=… />` or framework view |
| **Jane Street Bonsai_web** | `implementations/bonsai` | `Code_lens_mount.mount ~host ~config_json` |
| **D libwasm (browser)** | `code-lens-d` (`code_lens.libwasm`) | `attachScript(configJson)` via JS interop |
| **dlangui (desktop)** | `code-lens-d` (`code_lens.dlangui`) | Companion **webview** panel — native widgets cannot host DOM |
| **No framework** | `@code-lens/vanilla` | `<code-lens>` |
| **Any** | `@code-lens/css` | Styles (once per app) |

```tsx
// Solid — shipped today
import { CodeLens } from "@code-lens/solid";
import "@code-lens/css";

<CodeLens document={doc} themes={themes} ui={ui} themeId="earth" appearance="auto" />
```

```tsx
// React / Next.js — same API (package planned; pattern identical)
"use client";
import { CodeLens } from "@code-lens/react";
import "@code-lens/css";

export function Example() {
  return <CodeLens document={doc} themes={themes} ui={ui} themeId="earth" />;
}
```

That **is** the product in a React or Solid app — not a raw web component you manage yourself. The framework package is the delivery mechanism.

---

## What we maintain (one engine)

We do **not** rewrite lens switching six times. Framework packages are **official components** whose implementation mounts one shared runtime:

```
┌─────────────────────────────────────────────────┐
│  @code-lens/react   @code-lens/solid   …        │  ← what you import
│       CodeLens / CodeLens / …                   │
└────────────────────┬────────────────────────────┘
                     │ props → configure()
┌────────────────────▼────────────────────────────┐
│  @code-lens/vanilla  (<code-lens>)              │  ← one behavior engine
│  @code-lens/core     (spec, themes, probe)      │
└────────────────────┬────────────────────────────┘
                     │ renders DOM + applies
┌────────────────────▼────────────────────────────┐
│  @code-lens/css  or  @code-lens/tailwind        │  ← presentation skin
└─────────────────────────────────────────────────┘
```

**User-facing:** “React component” / “Solid component”  
**Internal:** custom element + CSS — same pattern as many design systems that wrap a lower layer.

This is **not** like Uiverse’s “React export” (a one-off syntax rewrite of a static snippet). It’s a real component with props, types, and lifecycle — the engine just lives in one place.

---

## CSS vs Tailwind vs JS (orthogonal)

These are **not** “Solid vs React editions.” They stack:

| Piece | Package | You need it when… |
|-------|---------|-------------------|
| **Spec** | `spec/*.json5` | Always (data) |
| **CSS skin** | `@code-lens/css` | Default styling (modern CSS) |
| **Tailwind skin** | `@code-lens/tailwind` | You want utilities instead of `.el-*` CSS (planned) |
| **Behavior** | `@code-lens/vanilla` + `@code-lens/core` | Always for interactivity — usually pulled in **by** your framework package |

CSS/Tailwind alone cannot switch lenses. JS is required for behavior; the framework package bundles that path for you.

---

## Plain HTML / embed anywhere

When there is no framework:

```html
<script type="module">
  import { registerCodeLens, createCodeLens } from "@code-lens/vanilla";
  import "@code-lens/css";
  registerCodeLens();
  document.body.appendChild(createCodeLens({ … }));
</script>
```

Or `<code-lens theme="earth">` after `registerCodeLens()`.

Editors (VS Code webview), Electron, and Tauri use this same runtime unchanged.

---

## Next.js specifically

- Put `<CodeLens />` in a **`"use client"`** module (custom elements and DOM measurement don’t run on the server).
- Import `@code-lens/css` once (global CSS or in the client component).
- Props and types come from `@code-lens/react` — same as Solid.

No App Router–specific edition; it’s the React component package.

---

## Comparison to shadcn / solid-ui

| | shadcn / solid-ui | code-lens |
|--|-------------------|-----------|
| Unit | Button, Card, … in **your** repo | `<CodeLens />` from **npm** |
| Styling | Tailwind utilities | `@code-lens/css` or Tailwind skin |
| Framework | Per-framework copy | Per-framework **package** wrapping one engine |
| Logic | In the component source | In `@code-lens/vanilla` (shared) |

Your demo page uses **solid-ui for site chrome** (header, cards, table) and **`@code-lens/solid` for the lens block**. Different products.

---

## Quick chooser

| You want… | Do this |
|-----------|---------|
| Solid app | `pnpm add @code-lens/solid @code-lens/css` → `<CodeLens />` |
| React / Next app | `@code-lens/react` + `@code-lens/css` → `<CodeLens />` (client) |
| Vue / Svelte app | `@code-lens/vue` / `@code-lens/svelte` when published |
| Static HTML / CMS | `@code-lens/vanilla` + `@code-lens/css` |
| Tailwind-only styling | Keep framework component; swap CSS import when `@code-lens/tailwind` ships |

See [implementations/REGISTRY.md](../implementations/REGISTRY.md) for ship status per package.
