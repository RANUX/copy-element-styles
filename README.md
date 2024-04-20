# Copy Element Styles Extension for Visual Studio Code

This extension, "Copy Element Styles", enables users to quickly extract CSS styles directly associated with HTML class attributes from a linked stylesheet within Visual Studio Code. It is especially useful for developers working with HTML and CSS, providing a seamless way to copy styles to the clipboard for reuse or examination.

## Features 
- **Extract Class Styles** : Allows you to select an HTML element text, extract its classes, and find the corresponding CSS from a specified stylesheet. 
- **Copy to Clipboard** : Automatically copies the extracted CSS properties to the clipboard, making it easy to paste wherever needed.

## Requirements

Ensure that your project workspace in VS Code is properly set up with accessible HTML and CSS files. The paths must be correct and files must be readable by the extension.

## Download extension

Download the extension from the Release page: https://github.com/RANUX/copy-element-styles/releases/tag/v1.0.0 and install it

## Extension Commands

This extension contributes the following command: 
- `copy-element-styles.copyElementStyles`: Activates the extension and performs the operation of extracting and copying the CSS styles.

## Usage 
1. **Select HTML Text** : Highlight the HTML text in your editor from which you wish to extract class styles. 
2. **Activate the Command** : Use the Command Palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) and type "Copy Element Styles" to execute the command. 
3. **Specify CSS File** : When prompted, enter the path to the CSS file relative to the currently opened file in the editor. 
4. **Copy Results** : The styles associated with the classes found in the selected HTML will be copied to your clipboard and a confirmation message will be shown.

## Installation

To install the extension, download the `.vsix` file and install it via the command line with:

```bash
code --install-extension path/to/copy-element-styles.vsix
```

Alternatively, you can install it directly within VS Code through the Extensions view by clicking on the "..." at the top-right, and selecting "Install from VSIX...".

## Known Issues

Currently, the extension requires that the CSS file path be entered manually and only supports `.css` files. Future updates may include automated CSS file detection and support for other stylesheets formats like `.scss`.
## Release Notes
### 0.0.1

Initial release of Copy Element Styles:
- Copy CSS properties associated with HTML classes to the clipboard.
- User-friendly prompts and error handling for better usability.---
### Contributing

Contributions to improve the extension are welcome. Please feel free to fork the repository, make changes, and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.
## License

This project is licensed under the MIT License - see the LICENSE file for details.---