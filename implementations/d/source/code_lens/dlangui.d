/**
 * dlangui desktop integration.
 *
 * dlangui is a **native** widget toolkit (OpenGL/SDL) — it cannot embed a DOM
 * `<code-lens>` inside a Widget. Use a **companion webview** (ggwebview, guino,
 * or `webview` on DUB) for the lens panel while the rest of the app stays dlangui.
 */
module code_lens.dlangui;

public import code_lens.bridge;

struct CodeLensWebViewConfig
{
    string configJson;
    /// file:// or https:// page that loads wasm-bridge + a host div (see bridge.htmlShell)
    string shellUrl;
}

/// After webview navigates to shellUrl, inject mount script.
void mountInWebView(T)(auto ref T wv, CodeLensWebViewConfig cfg)
    if (is(typeof(wv.evalScript) == string delegate(string)))
{
    import code_lens.bridge : attachScript;
    wv.evalScript(attachScript(cfg.configJson));
}

/// Suggested layout: dlangui main window + menu action "Preview lenses" opening webview panel.
struct CodeLensPanelAction
{
    string label = "Code lenses";
    CodeLensWebViewConfig config;
}
