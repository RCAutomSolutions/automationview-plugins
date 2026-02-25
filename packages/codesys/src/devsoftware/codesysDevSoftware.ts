/*---------------------------------------------------------------------------------------------
 *  Copyright (c) RCAutomSolutions. All rights reserved.
 *  License MIT. See LICENSE in the package root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createDevSoftware } from '@automationview/api';
import type { DevSoftwareInfo } from '@automationview/api';
import { CODESYS_DEV_SOFTWARE_ID, CODESYS_NAMING_CONVENTION } from '../provider/constants';

/** CODESYS V3.5 development software definition. */
export const codesysDevSoftware: DevSoftwareInfo = createDevSoftware({
    id: CODESYS_DEV_SOFTWARE_ID,
    displayName: 'CODESYS V3.5',
    vendor: 'CODESYS Group',
    plcopenXmlSupport: 'full',
    website: 'https://www.codesys.com',
    namingConvention: CODESYS_NAMING_CONVENTION,
});
