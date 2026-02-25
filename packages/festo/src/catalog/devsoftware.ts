/*---------------------------------------------------------------------------------------------
 *  Copyright (c) RCAutomSolutions. All rights reserved.
 *  License MIT. See LICENSE in the package root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createDevSoftware } from '@automationview/api';
import type { DevSoftwareInfo } from '@automationview/api';
import { ALL_FESTO_EQUIPMENT } from './equipment/index';

/** Festo Automation Suite development software definition. */
export const festoAutomationSuite: DevSoftwareInfo = createDevSoftware({
    id: 'festo-automation-suite',
    displayName: 'Festo Automation Suite',
    vendor: 'Festo',
    plcopenXmlSupport: 'partial',
    website: 'https://www.festo.com/automation-suite',
    supportedEquipmentIds: ALL_FESTO_EQUIPMENT.map(e => e.id),
});
