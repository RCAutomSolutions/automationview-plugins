/*---------------------------------------------------------------------------------------------
 *  Copyright (c) RCAutomSolutions. All rights reserved.
 *  License MIT. See LICENSE in the package root for license information.
 *--------------------------------------------------------------------------------------------*/

import type { EquipmentInfo } from '@automationview/api';
import { cpxECecC1, cpxE8di, cpxE8do } from './cpx-e';
import { vtug14 } from './vtug';

export { cpxECecC1, cpxE8di, cpxE8do } from './cpx-e';
export { vtug14 } from './vtug';

/** All Festo equipment definitions. */
export const ALL_FESTO_EQUIPMENT: readonly EquipmentInfo[] = [
    cpxECecC1,
    cpxE8di,
    cpxE8do,
    vtug14,
];
