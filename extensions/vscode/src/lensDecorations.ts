import * as vscode from "vscode";

/** Minimal lens document shape for decorations (matches @code-lens/core). */
export type LensSlot = { line: number; start: number; end: number; slot: string };

export type GeneratedLensDoc = {
  language: string;
  lenses: Array<{ id: string; label: string }>;
  slots: LensSlot[];
};

export class LensDecorationManager {
  private readonly style: vscode.TextEditorDecorationType;
  private disposables: vscode.Disposable[] = [];

  constructor() {
    this.style = vscode.window.createTextEditorDecorationType({
      backgroundColor: new vscode.ThemeColor("editor.wordHighlightBackground"),
      border: "1px solid",
      borderColor: new vscode.ThemeColor("editor.wordHighlightStrongBorder"),
      borderRadius: "3px",
    });
    this.disposables.push(this.style);
  }

  apply(editor: vscode.TextEditor, doc: GeneratedLensDoc, lensId: string): void {
    const ranges = doc.slots.map((s) => {
      const line = editor.document.lineAt(s.line);
      return new vscode.Range(s.line, s.start, s.line, s.end);
    });
    editor.setDecorations(this.style, ranges);
  }

  clear(editor?: vscode.TextEditor): void {
    const target = editor ?? vscode.window.activeTextEditor;
    if (target) target.setDecorations(this.style, []);
  }

  dispose(): void {
    this.disposables.forEach((d) => d.dispose());
  }
}
