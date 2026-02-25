/*---------------------------------------------------------------------------------------------
 *  Copyright (c) RCAutomSolutions. All rights reserved.
 *  License MIT. See LICENSE in the package root for license information.
 *--------------------------------------------------------------------------------------------*/

import { describe, test, expect } from 'vitest';
import { festoManufacturer, FESTO_MANUFACTURER_ID } from '../src/catalog/manufacturer';

describe('Festo Manufacturer', () => {
    test('has correct id', () => {
        expect(festoManufacturer.id).toBe('festo');
        expect(festoManufacturer.id).toBe(FESTO_MANUFACTURER_ID);
    });

    test('has correct display name', () => {
        expect(festoManufacturer.displayName).toBe('Festo');
    });

    test('has correct country', () => {
        expect(festoManufacturer.country).toBe('Germany');
    });

    test('has website', () => {
        expect(festoManufacturer.website).toBe('https://www.festo.com');
    });

    test('has description', () => {
        expect(festoManufacturer.description).toBe('Festo SE & Co. KG');
    });
});
