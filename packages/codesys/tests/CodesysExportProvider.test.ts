/*---------------------------------------------------------------------------------------------
 *  Copyright (c) RCAutomSolutions. All rights reserved.
 *  License MIT. See LICENSE in the package root for license information.
 *--------------------------------------------------------------------------------------------*/

import { describe, test, expect } from 'vitest';
import { CodesysExportProvider } from '../src/provider/CodesysExportProvider';
import {
    CODESYS_PROVIDER_ID,
    CODESYS_DEV_SOFTWARE_ID,
    PLCOPEN_XML_FORMAT,
    IEC_ST_FORMAT,
} from '../src/provider/constants';
import type { ExportOptions, ExportProgress } from '@automationview/api';
import { makeExportData, makeExportOptions, makePOU, makeVariableData } from './helpers';

describe('CodesysExportProvider', () => {
    const provider = new CodesysExportProvider();

    test('has correct provider ID', () => {
        expect(provider.id).toBe(CODESYS_PROVIDER_ID);
    });

    test('targets CODESYS V3 dev software', () => {
        expect(provider.devSoftwareId).toBe(CODESYS_DEV_SOFTWARE_ID);
    });

    test('supports PLCopen XML and Structured Text formats', () => {
        expect(provider.supportedFormats).toHaveLength(2);
        expect(provider.supportedFormats).toContainEqual(PLCOPEN_XML_FORMAT);
        expect(provider.supportedFormats).toContainEqual(IEC_ST_FORMAT);
    });

    test('supports all equipment by default', () => {
        expect(provider.supportedEquipmentIds).toEqual([]);
    });
});

describe('CodesysExportProvider.validate', () => {
    const provider = new CodesysExportProvider();

    test('delegates to CodesysValidator', async () => {
        const result = await provider.validate(makeExportData({ pous: [] }));
        expect(result.valid).toBe(false);
        expect(result.diagnostics[0].code).toBe('NO_POUS');
    });

    test('returns valid for well-formed data', async () => {
        const result = await provider.validate(makeExportData({
            pous: [makePOU({
                variables: [makeVariableData({ name: 'x' })],
            })],
        }));
        expect(result.valid).toBe(true);
    });
});

describe('CodesysExportProvider.doExport', () => {
    const provider = new CodesysExportProvider();
    const data = makeExportData({
        pous: [makePOU()],
    });

    test('returns NOT_IMPLEMENTED for plcopen-xml format', async () => {
        const result = await provider.doExport(data, makeExportOptions({ format: 'plcopen-xml' }));
        expect(result.success).toBe(false);
        expect(result.format).toBe('plcopen-xml');
        expect(result.diagnostics).toHaveLength(1);
        expect(result.diagnostics[0].code).toBe('NOT_IMPLEMENTED');
    });

    test('returns NOT_IMPLEMENTED for iec-st format', async () => {
        const result = await provider.doExport(data, makeExportOptions({ format: 'iec-st' }));
        expect(result.success).toBe(false);
        expect(result.format).toBe('iec-st');
        expect(result.diagnostics).toHaveLength(1);
        expect(result.diagnostics[0].code).toBe('NOT_IMPLEMENTED');
    });

    test('returns UNSUPPORTED_FORMAT for unknown format', async () => {
        const result = await provider.doExport(
            data,
            makeExportOptions({ format: 'unknown-format' as ExportOptions['format'] }),
        );
        expect(result.success).toBe(false);
        expect(result.diagnostics).toHaveLength(1);
        expect(result.diagnostics[0].code).toBe('UNSUPPORTED_FORMAT');
    });

    test('reports durationMs', async () => {
        const result = await provider.doExport(data, makeExportOptions({ format: 'plcopen-xml' }));
        expect(result.durationMs).toBeGreaterThanOrEqual(0);
    });

    test('reports progress when callback is provided', async () => {
        const progressCalls: ExportProgress[] = [];
        await provider.doExport(
            data,
            makeExportOptions({ format: 'plcopen-xml' }),
            (info) => { progressCalls.push(info); },
        );

        expect(progressCalls.length).toBeGreaterThanOrEqual(1);
        expect(progressCalls[0].message).toBe('Starting CODESYS export...');
        expect(progressCalls[0].percentage).toBe(0);
    });
});

describe('Export format descriptors', () => {
    test('PLCopen XML format has correct properties', () => {
        expect(PLCOPEN_XML_FORMAT.format).toBe('plcopen-xml');
        expect(PLCOPEN_XML_FORMAT.fileExtension).toBe('.xml');
        expect(PLCOPEN_XML_FORMAT.displayName).toBe('CODESYS PLCopen XML');
    });

    test('Structured Text format has correct properties', () => {
        expect(IEC_ST_FORMAT.format).toBe('iec-st');
        expect(IEC_ST_FORMAT.fileExtension).toBe('.st');
        expect(IEC_ST_FORMAT.displayName).toBe('CODESYS Structured Text');
    });
});
