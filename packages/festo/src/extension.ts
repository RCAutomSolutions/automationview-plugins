/*---------------------------------------------------------------------------------------------
 *  Copyright (c) RCAutomSolutions. All rights reserved.
 *  License MIT. See LICENSE in the package root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as vscode from 'vscode';
import { getAutomationViewAPI } from '@automationview/api';
import { festoManufacturer, ALL_FESTO_EQUIPMENT, festoAutomationSuite } from './catalog/index';

export function activate(context: vscode.ExtensionContext): void {
    const outputChannel = vscode.window.createOutputChannel('AutomationView Festo');
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

    context.subscriptions.push(api.registerManufacturer(festoManufacturer));

    for (const equipment of ALL_FESTO_EQUIPMENT) {
        context.subscriptions.push(api.registerEquipment(equipment));
    }

    context.subscriptions.push(api.registerDevSoftware(festoAutomationSuite));

    outputChannel.appendLine(
        `Festo catalog activated: ${ALL_FESTO_EQUIPMENT.length} equipment registered.`,
    );
}

export function deactivate(): void {
    // Disposables are cleaned up via context.subscriptions
}
