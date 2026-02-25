/*---------------------------------------------------------------------------------------------
 *  Copyright (c) RCAutomSolutions. All rights reserved.
 *  License MIT. See LICENSE in the package root for license information.
 *--------------------------------------------------------------------------------------------*/

import { describe, test, expect } from 'vitest';
import {
    ALL_FESTO_EQUIPMENT,
    cpxECecC1,
    cpxE8di,
    cpxE8do,
    vtug14,
} from '../src/catalog/equipment/index';
import { FESTO_MANUFACTURER_ID } from '../src/catalog/manufacturer';

describe('Festo Equipment', () => {
    test('ALL_FESTO_EQUIPMENT contains all equipment', () => {
        expect(ALL_FESTO_EQUIPMENT).toHaveLength(4);
        expect(ALL_FESTO_EQUIPMENT).toContain(cpxECecC1);
        expect(ALL_FESTO_EQUIPMENT).toContain(cpxE8di);
        expect(ALL_FESTO_EQUIPMENT).toContain(cpxE8do);
        expect(ALL_FESTO_EQUIPMENT).toContain(vtug14);
    });

    test('all equipment has unique IDs', () => {
        const ids = ALL_FESTO_EQUIPMENT.map(e => e.id);
        expect(new Set(ids).size).toBe(ids.length);
    });

    test('all equipment references festo manufacturer', () => {
        for (const equipment of ALL_FESTO_EQUIPMENT) {
            expect(equipment.manufacturerId).toBe(FESTO_MANUFACTURER_ID);
        }
    });

    test('all equipment has at least one version', () => {
        for (const equipment of ALL_FESTO_EQUIPMENT) {
            expect(equipment.versions.length).toBeGreaterThanOrEqual(1);
        }
    });
});

describe('CPX-E-CEC-C1', () => {
    test('is a controller with EtherCAT', () => {
        expect(cpxECecC1.category).toBe('controller');
        expect(cpxECecC1.protocol).toBe('ethercat');
    });

    test('has 8 channels (4 DI + 4 DO)', () => {
        const channels = cpxECecC1.versions[0].channels;
        expect(channels).toHaveLength(8);
        expect(channels.filter(c => c.direction === 'input')).toHaveLength(4);
        expect(channels.filter(c => c.direction === 'output')).toHaveLength(4);
    });
});

describe('CPX-E-8DI', () => {
    test('is digital I/O with EtherCAT', () => {
        expect(cpxE8di.category).toBe('io-digital');
        expect(cpxE8di.protocol).toBe('ethercat');
    });

    test('has 8 digital input channels', () => {
        const channels = cpxE8di.versions[0].channels;
        expect(channels).toHaveLength(8);
        expect(channels.every(c => c.direction === 'input')).toBe(true);
        expect(channels.every(c => c.dataType === 'BOOL')).toBe(true);
    });

    test('has filter time parameter', () => {
        const params = cpxE8di.versions[0].parameters;
        expect(params).toBeDefined();
        expect(params!.length).toBe(1);
        expect(params![0].id).toBe('filter-time');
    });
});

describe('CPX-E-8DO', () => {
    test('is digital I/O with EtherCAT', () => {
        expect(cpxE8do.category).toBe('io-digital');
        expect(cpxE8do.protocol).toBe('ethercat');
    });

    test('has 8 digital output channels', () => {
        const channels = cpxE8do.versions[0].channels;
        expect(channels).toHaveLength(8);
        expect(channels.every(c => c.direction === 'output')).toBe(true);
        expect(channels.every(c => c.dataType === 'BOOL')).toBe(true);
    });
});

describe('VTUG-14', () => {
    test('is IO-Link device', () => {
        expect(vtug14.category).toBe('io-link-device');
        expect(vtug14.protocol).toBe('io-link');
    });

    test('has part number', () => {
        expect(vtug14.partNumbers).toContain('8031548');
    });

    test('has 14 valve outputs and 1 diagnostic input', () => {
        const channels = vtug14.versions[0].channels;
        expect(channels).toHaveLength(15);

        const outputs = channels.filter(c => c.direction === 'output');
        expect(outputs).toHaveLength(14);

        const inputs = channels.filter(c => c.direction === 'input');
        expect(inputs).toHaveLength(1);
        expect(inputs[0].dataType).toBe('WORD');
        expect(inputs[0].bitSize).toBe(16);
    });
});
