/*---------------------------------------------------------------------------------------------
 *  Copyright (c) RCAutomSolutions. All rights reserved.
 *  License MIT. See LICENSE in the package root for license information.
 *--------------------------------------------------------------------------------------------*/

import { EquipmentBuilder } from '@automationview/api';
import type { EquipmentInfo } from '@automationview/api';
import { FESTO_MANUFACTURER_ID } from '../manufacturer';

/** CPX-E-CEC-C1 — EtherCAT controller with integrated digital I/O. */
export const cpxECecC1: EquipmentInfo = EquipmentBuilder
    .create('festo-cpx-e-cec-c1', FESTO_MANUFACTURER_ID, 'CPX-E-CEC-C1', 'controller', 'ethercat')
    .description('Compact controller with EtherCAT master and integrated I/O')
    .partNumbers(['8072894'])
    .addVersion('V1.0', v => v
        .partNumber('8072894')
        .addChannel('DI0', 'Digital Input 0', 'input', 'BOOL', 0, 1)
        .addChannel('DI1', 'Digital Input 1', 'input', 'BOOL', 0, 1, { bitOffset: 1 })
        .addChannel('DI2', 'Digital Input 2', 'input', 'BOOL', 0, 1, { bitOffset: 2 })
        .addChannel('DI3', 'Digital Input 3', 'input', 'BOOL', 0, 1, { bitOffset: 3 })
        .addChannel('DO0', 'Digital Output 0', 'output', 'BOOL', 1, 1)
        .addChannel('DO1', 'Digital Output 1', 'output', 'BOOL', 1, 1, { bitOffset: 1 })
        .addChannel('DO2', 'Digital Output 2', 'output', 'BOOL', 1, 1, { bitOffset: 2 })
        .addChannel('DO3', 'Digital Output 3', 'output', 'BOOL', 1, 1, { bitOffset: 3 })
    )
    .build();

/** CPX-E-8DI — 8-channel digital input module. */
export const cpxE8di: EquipmentInfo = EquipmentBuilder
    .create('festo-cpx-e-8di', FESTO_MANUFACTURER_ID, 'CPX-E-8DI', 'io-digital', 'ethercat')
    .description('8-channel digital input module')
    .partNumbers(['8022808'])
    .addVersion('V1.0', v => v
        .partNumber('8022808')
        .addChannel('DI0', 'Digital Input 0', 'input', 'BOOL', 0, 1)
        .addChannel('DI1', 'Digital Input 1', 'input', 'BOOL', 0, 1, { bitOffset: 1 })
        .addChannel('DI2', 'Digital Input 2', 'input', 'BOOL', 0, 1, { bitOffset: 2 })
        .addChannel('DI3', 'Digital Input 3', 'input', 'BOOL', 0, 1, { bitOffset: 3 })
        .addChannel('DI4', 'Digital Input 4', 'input', 'BOOL', 0, 1, { bitOffset: 4 })
        .addChannel('DI5', 'Digital Input 5', 'input', 'BOOL', 0, 1, { bitOffset: 5 })
        .addChannel('DI6', 'Digital Input 6', 'input', 'BOOL', 0, 1, { bitOffset: 6 })
        .addChannel('DI7', 'Digital Input 7', 'input', 'BOOL', 0, 1, { bitOffset: 7 })
        .addParameter('filter-time', 'FILTER_TIME', 'Filter Time', 'INT', 50, { unit: 'ms', min: 1, max: 1000 })
    )
    .build();

/** CPX-E-8DO — 8-channel digital output module. */
export const cpxE8do: EquipmentInfo = EquipmentBuilder
    .create('festo-cpx-e-8do', FESTO_MANUFACTURER_ID, 'CPX-E-8DO', 'io-digital', 'ethercat')
    .description('8-channel digital output module')
    .partNumbers(['8022812'])
    .addVersion('V1.0', v => v
        .partNumber('8022812')
        .addChannel('DO0', 'Digital Output 0', 'output', 'BOOL', 0, 1)
        .addChannel('DO1', 'Digital Output 1', 'output', 'BOOL', 0, 1, { bitOffset: 1 })
        .addChannel('DO2', 'Digital Output 2', 'output', 'BOOL', 0, 1, { bitOffset: 2 })
        .addChannel('DO3', 'Digital Output 3', 'output', 'BOOL', 0, 1, { bitOffset: 3 })
        .addChannel('DO4', 'Digital Output 4', 'output', 'BOOL', 0, 1, { bitOffset: 4 })
        .addChannel('DO5', 'Digital Output 5', 'output', 'BOOL', 0, 1, { bitOffset: 5 })
        .addChannel('DO6', 'Digital Output 6', 'output', 'BOOL', 0, 1, { bitOffset: 6 })
        .addChannel('DO7', 'Digital Output 7', 'output', 'BOOL', 0, 1, { bitOffset: 7 })
    )
    .build();
