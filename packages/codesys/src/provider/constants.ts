/*---------------------------------------------------------------------------------------------
 *  Copyright (c) RCAutomSolutions. All rights reserved.
 *  License MIT. See LICENSE in the package root for license information.
 *--------------------------------------------------------------------------------------------*/

import type { ExportFormatDescriptor, NamingConvention } from '@automationview/api';

export const CODESYS_PROVIDER_ID = 'automationview-codesys.export';
export const CODESYS_DEV_SOFTWARE_ID = 'codesys-v3';

/** CODESYS V3 identifier naming rules (shared between validator and dev software registration). */
export const CODESYS_NAMING_CONVENTION: NamingConvention = {
    maxIdentifierLength: 128,
    allowedCharsPattern: '^[A-Za-z_][A-Za-z0-9_]*$',
    caseSensitive: false,
};

/** PLCopen XML export format descriptor. */
export const PLCOPEN_XML_FORMAT: ExportFormatDescriptor = {
    format: 'plcopen-xml',
    displayName: 'CODESYS PLCopen XML',
    fileExtension: '.xml',
    description: 'PLCopen XML format for CODESYS V3 import',
};

/** IEC 61131-3 Structured Text export format descriptor. */
export const IEC_ST_FORMAT: ExportFormatDescriptor = {
    format: 'iec-st',
    displayName: 'CODESYS Structured Text',
    fileExtension: '.st',
    description: 'IEC 61131-3 Structured Text for CODESYS V3',
};
