# SwiftUI implementation

**Status:** planned · **Glass lens:** native

Use `.ultraThinMaterial` / `.regularMaterial` overlays animated across diff-token bounds during lens switches. Stagger by line index using `spec/ui.json5` (`glassLensLineStaggerMs`, `glassLensPassMs`).

Fallback: width morph + cross-fade when Reduce Motion is enabled.

See [docs/glass-lens-capabilities.md](../../docs/glass-lens-capabilities.md).
