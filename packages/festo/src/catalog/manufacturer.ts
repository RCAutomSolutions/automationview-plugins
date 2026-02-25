/*---------------------------------------------------------------------------------------------
 *  Copyright (c) RCAutomSolutions. All rights reserved.
 *  License MIT. See LICENSE in the package root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createManufacturer } from '@automationview/api';
import type { ManufacturerInfo } from '@automationview/api';

export const FESTO_MANUFACTURER_ID = 'festo';

/** Festo manufacturer definition. */
export const festoManufacturer: ManufacturerInfo = createManufacturer({
    id: FESTO_MANUFACTURER_ID,
    displayName: 'Festo',
    country: 'Germany',
    website: 'https://www.festo.com',
    description: 'Festo SE & Co. KG',
});
