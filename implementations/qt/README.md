# Qt 6 / QML implementation

**Status:** planned

| Host | Glass lens tier |
|------|-----------------|
| **Qt WebEngine** | webview — embed `@code-lens/vanilla` |
| **QML native** | native — `FastBlur` / shader overlay for diff-token sweep |

Load `spec/*.json5` via C++ or QML `JSON` parse. Map `spec/ui.json5` animation timings to QML `Behavior` / `NumberAnimation`.

Implement the glass sweep on **whichever Qt surface supports blur** — do not limit to WebEngine only.

See [docs/glass-lens-capabilities.md](../../docs/glass-lens-capabilities.md).
