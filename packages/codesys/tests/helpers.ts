/*---------------------------------------------------------------------------------------------
 *  Copyright (c) RCAutomSolutions. All rights reserved.
 *  License MIT. See LICENSE in the package root for license information.
 *--------------------------------------------------------------------------------------------*/

import type {
    MachineData,
    GrafcetData,
    VariableData,
    POUExportData,
    ProjectExportData,
    ExportOptions,
} from '@automationview/api';

export function makeMachineData(overrides: Partial<MachineData> = {}): MachineData {
    return {
        name: 'TestMachine',
        version: '1.0.0',
        description: 'Test machine for unit tests',
        author: 'Test Author',
        clients: [],
        metadata: {},
        ...overrides,
    };
}

export function makeGrafcetData(overrides: Partial<GrafcetData> = {}): GrafcetData {
    return {
        id: 'grafcet-1',
        name: 'TestGrafcet',
        steps: [],
        transitions: [],
        sourceLine: 1,
        sourceFile: 'test.py',
        ...overrides,
    };
}

export function makeVariableData(overrides: Partial<VariableData> = {}): VariableData {
    return {
        name: 'testVar',
        dataType: 'BOOL',
        ...overrides,
    };
}

export function makePOU(overrides: Partial<POUExportData> = {}): POUExportData {
    return {
        name: 'Main',
        pouType: 'program',
        grafcet: makeGrafcetData(),
        variables: [],
        ...overrides,
    };
}

export function makeExportData(overrides: Partial<ProjectExportData> = {}): ProjectExportData {
    return {
        machine: makeMachineData(),
        grafcets: [],
        variables: [],
        pous: [],
        ...overrides,
    };
}

export function makeExportOptions(overrides: Partial<ExportOptions> = {}): ExportOptions {
    return {
        equipmentId: 'test-equipment',
        format: 'plcopen-xml',
        outputPath: '/tmp/test-output.xml',
        ...overrides,
    };
}
