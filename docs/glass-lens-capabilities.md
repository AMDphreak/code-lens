# Glass lens capabilities

The **glass lens** effect is two related animations:

1. **Tab pill** — glassmorphism indicator sliding behind the active lens tab.
2. **Block glass sweep** — diagonal gradient sheens and a brief blur pass over the entire code panel during lens switches.

These are **not tied to a fixed list of frameworks**. Implement them on **any runtime that supports blur compositing**; otherwise use the documented fallback.

## Capability tiers

| Tier | When to use | Effect |
|------|-------------|--------|
| **full** | `backdrop-filter` / `-webkit-backdrop-filter` works | Tab pill + block glass sweep (normative in `@code-lens/vanilla`) |
| **webview** | App embeds a DOM surface | Ship `@code-lens/vanilla` unchanged — Electron, Tauri, WebView2, Qt WebEngine, WebKitGTK |
| **native** | Platform blur API, no DOM | Reproduce block sweep with layered gradients + blur on the code viewport (SwiftUI Material, Compose `blur`, Flutter `BackdropFilter`, RN blur module) |
| **fallback** | No blur compositing | Keep width morph + text cross-fade; omit glass overlay |
| **none** | Editor / hint-only integrations | Role labels without inline morph |

Canonical registry rows and expected tiers: [`spec/implementations.json5`](../spec/implementations.json5).

## Runtime probing (DOM)

`@code-lens/core` exports helpers:

```ts
import { shouldUseDomGlassLens, supportsDomGlassLens } from "@code-lens/core";

if (shouldUseDomGlassLens()) {
  // show .el-code-glass block overlay + .el-glass tab pill
} else {
  // morph + cross-fade only
}
```

`@code-lens/vanilla` applies this automatically via the `el-glass-disabled` host class.

Also honor `prefers-reduced-motion: reduce` (CSS and `prefersReducedMotion()`).

## Native ports (guidance)

When porting outside the DOM, map spec timings from `spec/ui.json5`:

| Spec field | Use |
|------------|-----|
| `glassSlideMs` | Tab pill slide duration |
| `glassBlockPassMs` | Block glass sweep duration |
| `glassBlurPx` | Blur radius for native APIs (peak of blur pass) |

Implement the block sweep on **every platform where blur is available** — do not skip native mobile/desktop targets because the reference is web-only.

## Web framework adapters

React, Vue, Svelte, Angular, Preact, Lit, and Solid should **embed** `<code-lens>` from `@code-lens/vanilla` (adapter layer). Only ship a separate port if embedding is impossible (e.g. SSR constraints).

See [ecosystem.md](./ecosystem.md).

## Contributing

1. Add a row to `spec/implementations.json5`.
2. Mirror the row in [`implementations/REGISTRY.md`](../implementations/REGISTRY.md).
3. Set `glassLens` to the tier you **probe or implement**, not a wish list — update when the port lands.
