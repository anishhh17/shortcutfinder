import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext){
  var thisProvider={
      resolveWebviewView:function(thisWebview :any, thisWebviewContext :any, thisToken :any){
          thisWebview.webview.options={enableScripts:true};
          thisWebview.webview.html=getWebviewContent();
      }
  };
  context.subscriptions.push(vscode.window.registerWebviewViewProvider("shortcutfinder.shortcutFinderView", thisProvider));
}

function getWebviewContent() {
  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
</head>
<body>
  <p>This is a para tag</p>
  <p id = "temp"></p>
</body>
 
</html>`;
}
