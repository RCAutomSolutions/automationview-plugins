/*---------------------------------------------------------------------------------------------
 *  Copyright (c) RCAutomSolutions. All rights reserved.
 *  License MIT. See LICENSE in the package root for license information.
 *--------------------------------------------------------------------------------------------*/

import { describe, test, expect } from 'vitest';
import { validateForCodesys } from '../src/provider/CodesysValidator';
import type { ProjectExportData } from '@automationview/api';
import { makeExportData, makePOU, makeVariableData } from './helpers';

describe('CodesysValidator', () => {
    test('returns error when no POUs exist', () => {
        const result = validateForCodesys(makeExportData({ pous: [] }));

        expect(result.valid).toBe(false);
        expect(result.diagnostics).toHaveLength(1);
        expect(result.diagnostics[0].code).toBe('NO_POUS');
        expect(result.diagnostics[0].severity).toBe('error');
    });

    test('returns valid when POUs have supported types', () => {
        const result = validateForCodesys(makeExportData({
            pous: [makePOU({
                name: 'MainProgram',
                variables: [
                    makeVariableData({ name: 'sensor1', dataType: 'BOOL' }),
                    makeVariableData({ name: 'counter', dataType: 'INT' }),
                ],
            })],
        }));

        expect(result.valid).toBe(true);
        const errors = result.diagnostics.filter(d => d.severity === 'error');
        expect(errors).toHaveLength(0);
    });

    test('warns on unsupported variable types', () => {
        const result = validateForCodesys(makeExportData({
            pous: [makePOU({
                name: 'MainProgram',
                variables: [
                    { name: 'custom', dataType: 'MY_CUSTOM_TYPE' } as unknown as ProjectExportData['variables'][0],
                ],
            })],
        }));

        expect(result.valid).toBe(true);
        const warnings = result.diagnostics.filter(d => d.code === 'UNSUPPORTED_TYPE');
        expect(warnings.length).toBeGreaterThanOrEqual(1);
        expect(warnings[0].severity).toBe('warning');
    });

    test('warns on invalid POU names', () => {
        const result = validateForCodesys(makeExportData({
            pous: [makePOU({ name: '123Invalid' })],
        }));

        expect(result.valid).toBe(true);
        const warnings = result.diagnostics.filter(d => d.code === 'INVALID_POU_NAME');
        expect(warnings).toHaveLength(1);
        expect(warnings[0].severity).toBe('warning');
    });

    test('warns on invalid variable names', () => {
        const result = validateForCodesys(makeExportData({
            pous: [makePOU({
                name: 'MainProgram',
                variables: [
                    makeVariableData({ name: '1badName' }),
                ],
            })],
        }));

        expect(result.valid).toBe(true);
        const warnings = result.diagnostics.filter(d => d.code === 'INVALID_VAR_NAME');
        expect(warnings).toHaveLength(1);
    });
});
