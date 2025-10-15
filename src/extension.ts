import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export function activate(context: vscode.ExtensionContext) {

  // sdf
  context.subscriptions.push(
    vscode.commands.registerCommand("extension.openDocs", () => {
      const panel = vscode.window.createWebviewPanel(
        "webviewExample",
        "InCodeDocs",
        vscode.ViewColumn.One,
        {
          enableScripts: true,
          localResourceRoots: [
            vscode.Uri.file(path.join(context.extensionPath, "src", "web")), // Allow webview to access the src/web directory
          ],
        }
      );

      // Resolve paths to your resources
      const styleUri = panel.webview.asWebviewUri(
        vscode.Uri.file(
          path.join(context.extensionPath, "src", "web", "style.css")
        )
      );
      const scriptUri = panel.webview.asWebviewUri(
        vscode.Uri.file(
          path.join(context.extensionPath, "src", "web", "script.js")
        )
      );

      // Path to HTML file
      const htmlPath = path.join(
        context.extensionPath,
        "src",
        "web",
        "index.html"
      );
      let htmlContent = fs.readFileSync(htmlPath, "utf8");

      // Inject resolved URIs into HTML
      htmlContent = htmlContent
        .replace(
          '<link rel="stylesheet" href="../web/style.css" />',
          `<link rel="stylesheet" href="${styleUri}" />`
        )
        .replace(
          '<script src="../web/script.js"></script>',
          `<script src="${scriptUri}"></script>`
        );

      // Set the webview HTML
      panel.webview.html = htmlContent;
    })
  );
}

export function deactivate() {}
