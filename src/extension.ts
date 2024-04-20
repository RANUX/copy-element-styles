// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as Path from 'path';

const getCurrentEditorPath = function () {
	return vscode.window.activeTextEditor?.document.uri.fsPath;
};

function findClassProperties(cssText: string, className: string) {
    // Create a regex pattern dynamically using the class name
    const regex = new RegExp(`\\.${className}\\s*{([^}]*)}`, 'g');

    // Match and extract the properties of the class
    const match = cssText.match(regex);

    // Check if any match is found
    if (match) {
        return match.join('\n'); // Return all matches joined (in case of multiple instances)
    }
    return ''; // Return message if class is not found
}


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "copy-element-styles" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('copy-element-styles.copyElementStyles', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		const editor = vscode.window.activeTextEditor;

        if (!editor) {
            vscode.window.showInformationMessage('No editor is active');
            return;
        }

        const selection = editor.selection;
        const text = editor.document.getText(selection);

		// extract only class names from copied element 
		const regex = /class="([^"]+)"/g;
		// extract classes
		const classNames = [...text.matchAll(regex)].map(match => match[1]).map(className => className.split(/\s+/g)).flat();
		// display catched class names
		vscode.window.showInformationMessage(`Found following class names: ${classNames}`);
		// ask user to specify css file
		const cssFilePath = await vscode.window.showInputBox({
			placeHolder: 'Enter css file path',
			value: 'css/style.css'
		});
		if (cssFilePath) {
			if (cssFilePath.endsWith('.css')) {
				
				// get current editor path
				const currentEditorPath = getCurrentEditorPath();

				if (!currentEditorPath) {
					vscode.window.showErrorMessage('No editor is active');
					return;
				}

				// get only directory path from currentEditorPath
				const directoryPath = Path.dirname(currentEditorPath);

				// get absolute cssFilePath
				const absoluteCssFilePath = vscode.Uri.file(Path.resolve(directoryPath, cssFilePath));
				
				// check if file exists
				const cssFileMeta = await vscode.workspace.fs.stat(absoluteCssFilePath);
				
				if (!cssFileMeta) {
					vscode.window.showErrorMessage('CSS file does not exist');
					return;
				}
				
				// read css file
				const cssFileData = await vscode.workspace.fs.readFile(absoluteCssFilePath);
				
				// search for class names with styles in css file
				const cssFileText = cssFileData.toString();
				const classProperties: string[] = [];
				classNames.forEach(className => {
					const classNameProperties = findClassProperties(cssFileText, className);
					classProperties.push(classNameProperties);
				});

				if (classProperties.length === 0) {
					vscode.window.showErrorMessage('No class properties found');
					return;
				}
				const clipboardText = classProperties.join('\n');
				// copy class properties to clipboard
				vscode.env.clipboard.writeText(clipboardText);

				vscode.window.showInformationMessage('Class properties copied to clipboard');
			}
		}
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
