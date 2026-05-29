import * as vscode from "vscode";
import { LensDecorationManager } from "./lensDecorations";
import { LensPreviewPanel } from "./previewPanel";
import { generateLensDocument } from "./ai/generateLenses";

let decorationManager: LensDecorationManager | undefined;
let activeLensIndex = 0;
const LENS_IDS = ["didactic", "schematic", "contextual", "role"] as const;

export function activate(context: vscode.ExtensionContext): void {
  decorationManager = new LensDecorationManager();

  context.subscriptions.push(
    vscode.commands.registerCommand("code-lens.openPreview", () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        void vscode.window.showWarningMessage("code-lens: open a file first.");
        return;
      }
      const text = editor.document.getText(editor.selection.isEmpty ? undefined : editor.selection);
      LensPreviewPanel.show(context.extensionUri, text, editor.document.languageId);
    }),

    vscode.commands.registerCommand("code-lens.generateLenses", async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) return;

      const selection = editor.selection.isEmpty
        ? new vscode.Range(0, 0, editor.document.lineCount, 0)
        : editor.selection;

      const source = editor.document.getText(selection);
      const language = editor.document.languageId;

      await vscode.window.withProgress(
        { location: vscode.ProgressLocation.Notification, title: "code-lens: generating lenses…" },
        async () => {
          try {
            const doc = await generateLensDocument(source, language, context);
            LensPreviewPanel.showWithDocument(context.extensionUri, doc);
            if (decorationManager) {
              decorationManager.apply(editor, doc, LENS_IDS[activeLensIndex]);
            }
          } catch (err) {
            const msg = err instanceof Error ? err.message : String(err);
            void vscode.window.showErrorMessage(`code-lens: ${msg}`);
          }
        },
      );
    }),

    vscode.commands.registerCommand("code-lens.cycleLens", () => {
      activeLensIndex = (activeLensIndex + 1) % LENS_IDS.length;
      void vscode.window.showInformationMessage(
        `code-lens: active lens → ${LENS_IDS[activeLensIndex]}`,
      );
      LensPreviewPanel.cycleLens(activeLensIndex);
    }),

    vscode.window.onDidChangeActiveTextEditor((editor) => {
      decorationManager?.clear(editor);
    }),
  );
}

export function deactivate(): void {
  decorationManager?.dispose();
}
