/*---------------------------------------------------------------------------------------------
 *  Copyright (c) RCAutomSolutions. All rights reserved.
 *  License MIT. See LICENSE in the package root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import { getAutomationViewAPI } from '@automationview/api';
import { CodesysExportProvider } from './provider/index';
import { codesysDevSoftware } from './devsoftware/index';

export function activate(context: vscode.ExtensionContext): void {
    const outputChannel = vscode.window.createOutputChannel('AutomationView CODESYS');
    context.subscriptions.push(outputChannel);

    void activateAsync(context, outputChannel);
}

async function activateAsync(
    context: vscode.ExtensionContext,
    outputChannel: vscode.OutputChannel,
): Promise<void> {
    const api = await getAutomationViewAPI();
    if (!api) {
        outputChannel.appendLine('AutomationView API not available. Extension will not activate.');
        return;
    }

    context.subscriptions.push(api.registerDevSoftware(codesysDevSoftware));

    const provider = new CodesysExportProvider();
    context.subscriptions.push(api.registerExportProvider(provider));

    outputChannel.appendLine('CODESYS V3 export provider activated.');
}

export function deactivate(): void {
    // Disposables are cleaned up via context.subscriptions
}
