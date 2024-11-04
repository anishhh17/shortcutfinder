import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    const thisProvider = {
        resolveWebviewView: function (thisWebview: any, thisWebviewContext: any, thisToken: any) {
            thisWebview.webview.options = { enableScripts: true };
            thisWebview.webview.html = getWebviewContent(context.extensionUri);
        }
    };
    context.subscriptions.push(vscode.window.registerWebviewViewProvider("shortcutfinder.shortcutFinderView", thisProvider));
}

function getWebviewContent(extensionUri: vscode.Uri) {
    const htmlPath = path.join(extensionUri.fsPath, 'searchBar.html');
    const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    return htmlContent;
}