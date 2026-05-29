import * as vscode from "vscode";
import type { GeneratedLensDoc } from "./lensDecorations";

export class LensPreviewPanel {
  private static panel: vscode.WebviewPanel | undefined;
  private static cachedDoc: GeneratedLensDoc | undefined;

  static show(extensionUri: vscode.Uri, source: string, language: string): void {
    this.ensurePanel(extensionUri);
    this.panel!.webview.html = this.placeholderHtml(source, language);
  }

  static showWithDocument(extensionUri: vscode.Uri, doc: GeneratedLensDoc): void {
    this.cachedDoc = doc;
    this.ensurePanel(extensionUri);
    this.panel!.webview.html = this.placeholderHtml(
      "(generated lens document)",
      doc.language,
    );
    // TODO: bundle @code-lens/vanilla into webview and postMessage doc JSON
  }

  static cycleLens(index: number): void {
    if (!this.panel) return;
    void this.panel.webview.postMessage({ type: "cycleLens", index });
  }

  private static ensurePanel(extensionUri: vscode.Uri): void {
    if (this.panel) {
      this.panel.reveal(vscode.ViewColumn.Beside);
      return;
    }
    this.panel = vscode.window.createWebviewPanel(
      "codeLensPreview",
      "code-lens",
      vscode.ViewColumn.Beside,
      { enableScripts: true, retainContextWhenHidden: true },
    );
    this.panel.onDidDispose(() => {
      this.panel = undefined;
    });
  }

  private static placeholderHtml(source: string, language: string): string {
    const escaped = source.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return `<!DOCTYPE html>
<html><head><meta charset="utf-8">
<style>
  body { font-family: system-ui; margin: 16px; background: #fafaf8; color: #2c2824; }
  pre { font-family: "Space Mono", monospace; font-size: 13px; white-space: pre-wrap; }
  .note { font-size: 12px; opacity: 0.7; margin-top: 12px; }
</style></head><body>
  <h2>code-lens preview</h2>
  <p>Language: ${language}</p>
  <pre>${escaped}</pre>
  <p class="note">Phase 2: embed &lt;code-lens&gt; from @code-lens/vanilla with full glass-lens morph.
  Phase 1: AI-generated lens document → decorations in editor.</p>
</body></html>`;
  }
}
