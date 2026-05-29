/**
 * Shared bridge helpers for D web targets (libwasm / browser).
 * Requires @code-lens/wasm-bridge loaded in the page (sets window.__codeLensBridge).
 */
module code_lens.bridge;

/// JavaScript to run after wasm-bridge is loaded and host div exists.
string attachScript(string configJson) @safe pure
{
    import std.format : format;
    return format!(
        "window.__codeLensBridge&&window.__codeLensBridge.attachCodeLensFromJson(" ~
        "document.querySelector('[data-code-lens-host=\"true\"]'),%s);",
        configJson);
}

string detachScript() @safe pure
{
    return "window.__codeLensBridge&&window.__codeLensBridge.detachCodeLens(" ~
           "document.querySelector('[data-code-lens-host=\"true\"]'));";
}

/// Minimal HTML shell for webview / static hosting.
string htmlShell(string bridgeScript, string cssHref = "/node_modules/@code-lens/css/dist/code-lens.css") @safe pure
{
    import std.format : format;
    return format!(`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <link rel="stylesheet" href="%s" />
  <script type="module">import "@code-lens/wasm-bridge";</script>
</head>
<body>
  <div class="code-lens-host" data-code-lens-host="true"></div>
  <script type="module">%s</script>
</body>
</html>`, cssHref, bridgeScript);
}
