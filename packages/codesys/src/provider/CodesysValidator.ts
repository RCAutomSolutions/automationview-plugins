/*---------------------------------------------------------------------------------------------
 *  Copyright (c) RCAutomSolutions. All rights reserved.
 *  License MIT. See LICENSE in the package root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IEC61131TypeMapper, NamingValidator, DiagnosticBuilder } from '@automationview/api';
import type { ProjectExportData, ExportValidationResult, ExportDiagnostic } from '@automationview/api';
import { CODESYS_NAMING_CONVENTION } from './constants';

/** Validates project data for CODESYS V3 export compatibility. */
export function validateForCodesys(data: ProjectExportData): ExportValidationResult {
    const diagnostics: ExportDiagnostic[] = [];

    if (data.pous.length === 0) {
        diagnostics.push(
            DiagnosticBuilder.error('NO_POUS', 'Project contains no POUs to export')
                .source('CodesysValidator')
                .suggestion('Create at least one program, function block, or function before exporting')
                .build(),
        );
        return { valid: false, diagnostics };
    }

    const typeMapper = new IEC61131TypeMapper();
    const namingValidator = new NamingValidator(CODESYS_NAMING_CONVENTION);

    for (const pou of data.pous) {
        const nameResult = namingValidator.validate(pou.name);
        if (!nameResult.valid) {
            diagnostics.push(
                DiagnosticBuilder.warning('INVALID_POU_NAME', `POU name "${pou.name}" does not conform to CODESYS naming rules`)
                    .source('CodesysValidator')
                    .suggestion(`Rename to: ${namingValidator.sanitize(pou.name)}`)
                    .build(),
            );
        }

        for (const variable of pou.variables) {
            if (!typeMapper.isSupported(variable.dataType)) {
                diagnostics.push(
                    DiagnosticBuilder.warning(
                        'UNSUPPORTED_TYPE',
                        `Variable "${variable.name}" in POU "${pou.name}" uses unsupported type "${variable.dataType}"`,
                    )
                        .source('CodesysValidator')
                        .suggestion(`Replace "${variable.dataType}" with a supported IEC 61131-3 type`)
                        .build(),
                );
            }

            const varNameResult = namingValidator.validate(variable.name);
            if (!varNameResult.valid) {
                diagnostics.push(
                    DiagnosticBuilder.warning(
                        'INVALID_VAR_NAME',
                        `Variable "${variable.name}" in POU "${pou.name}" does not conform to CODESYS naming rules`,
                    )
                        .source('CodesysValidator')
                        .suggestion(`Rename to: ${namingValidator.sanitize(variable.name)}`)
                        .build(),
                );
            }
        }
    }

    const hasErrors = diagnostics.some(d => d.severity === 'error');
    return { valid: !hasErrors, diagnostics };
}
