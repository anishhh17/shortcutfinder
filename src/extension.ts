import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('shortcutfinder.openShortcutFinder', async () => {
        const view = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.document.uri : undefined;
        await vscode.commands.executeCommand('shortcutfinder.shortcutFinderView.focus',{});
    });

    context.subscriptions.push(disposable);

    const resourcesDirectory = vscode.Uri.joinPath(context.extensionUri, 'resources');
    const thisProvider = {
        resolveWebviewView: function (thisWebview: any, thisWebviewContext: any, thisToken: any) {
            thisWebview.webview.options = { 
                enableScripts: true,
                localResourceRoots: [resourcesDirectory]
            };
            thisWebview.webview.html = getWebviewContent(context.extensionUri, thisWebview);
        }
    };
    context.subscriptions.push(vscode.window.registerWebviewViewProvider("shortcutfinder.shortcutFinderView", thisProvider));
}

function getWebviewContent(extensionUri: vscode.Uri, webviewView: vscode.WebviewView) {
    const htmlPath = path.join(extensionUri.fsPath, 'resources' ,'searchBar.html');
    let htmlContent = fs.readFileSync(htmlPath, 'utf-8');
    const scriptUri = webviewView.webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'resources', 'script.js'));
    const jsonUri = webviewView.webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'resources', 'shortcuts.json'));
    const cssUri = webviewView.webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, 'resources', 'styles.css'));
    htmlContent = htmlContent.replace('<script src=""></script>', `<script src="${scriptUri}" defer></script>`);
    htmlContent = htmlContent.replace('<!-- JSON_URI_PLACEHOLDER -->', jsonUri.toString());
    htmlContent = htmlContent.replace('-- CSS_URI_PLACEHOLDER --', cssUri.toString());
    return htmlContent;
}