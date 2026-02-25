/*---------------------------------------------------------------------------------------------
 *  Copyright (c) RCAutomSolutions. All rights reserved.
 *  License MIT. See LICENSE in the package root for license information.
 *--------------------------------------------------------------------------------------------*/

import { EquipmentBuilder } from '@automationview/api';
import type { EquipmentInfo } from '@automationview/api';
import { FESTO_MANUFACTURER_ID } from '../manufacturer';

/** VTUG-14 — 14-position valve terminal with IO-Link interface. */
export const vtug14: EquipmentInfo = EquipmentBuilder
    .create('festo-vtug-14', FESTO_MANUFACTURER_ID, 'VTUG-14', 'io-link-device', 'io-link')
    .description('14-position valve terminal with IO-Link')
    .partNumbers(['8031548'])
    .addVersion('V1.0', v => v
        .partNumber('8031548')
        .addChannel('V0', 'Valve Output 0', 'output', 'BOOL', 0, 1)
        .addChannel('V1', 'Valve Output 1', 'output', 'BOOL', 0, 1, { bitOffset: 1 })
        .addChannel('V2', 'Valve Output 2', 'output', 'BOOL', 0, 1, { bitOffset: 2 })
        .addChannel('V3', 'Valve Output 3', 'output', 'BOOL', 0, 1, { bitOffset: 3 })
        .addChannel('V4', 'Valve Output 4', 'output', 'BOOL', 0, 1, { bitOffset: 4 })
        .addChannel('V5', 'Valve Output 5', 'output', 'BOOL', 0, 1, { bitOffset: 5 })
        .addChannel('V6', 'Valve Output 6', 'output', 'BOOL', 0, 1, { bitOffset: 6 })
        .addChannel('V7', 'Valve Output 7', 'output', 'BOOL', 0, 1, { bitOffset: 7 })
        .addChannel('V8', 'Valve Output 8', 'output', 'BOOL', 1, 1)
        .addChannel('V9', 'Valve Output 9', 'output', 'BOOL', 1, 1, { bitOffset: 1 })
        .addChannel('V10', 'Valve Output 10', 'output', 'BOOL', 1, 1, { bitOffset: 2 })
        .addChannel('V11', 'Valve Output 11', 'output', 'BOOL', 1, 1, { bitOffset: 3 })
        .addChannel('V12', 'Valve Output 12', 'output', 'BOOL', 1, 1, { bitOffset: 4 })
        .addChannel('V13', 'Valve Output 13', 'output', 'BOOL', 1, 1, { bitOffset: 5 })
        .addChannel('DIAG', 'Diagnostic Input', 'input', 'WORD', 4, 16)
    )
    .build();
