import * as vscode from "vscode";
import { chiselContent } from "./formatter";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "obelisk.chisel",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showInformationMessage("No file is currently open");
        return;
      }
      const document = editor.document;

      if (document.languageId === "markdown") {
        const content = document.getText();
        const chiseledContent = chiselContent(content);

        const edit = new vscode.WorkspaceEdit();
        const fullRange = new vscode.Range(
          document.positionAt(0),
          document.positionAt(document.getText().length),
        );
        edit.replace(document.uri, fullRange, chiseledContent);
        await vscode.workspace.applyEdit(edit);
        vscode.window.showInformationMessage(
          "Current file is chiseled succesfully",
        );
      } else {
        vscode.window.showInformationMessage(
          "Current file is not a markdown file",
        );
      }
    },
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
