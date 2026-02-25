import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
        languageOptions: {
            parserOptions: {
                projectService: {
                    allowDefaultProject: ['packages/*/tests/*.ts'],
                },
                tsconfigRootDir: import.meta.dirname,
            },
        },
        rules: {
            // Enforce import type for type-only imports (aligns with verbatimModuleSyntax)
            '@typescript-eslint/consistent-type-imports': ['error', {
                prefer: 'type-imports',
                fixStyle: 'separate-type-imports',
            }],

            // No default exports
            'no-restricted-syntax': ['error', {
                selector: 'ExportDefaultDeclaration',
                message: 'Default exports are not allowed. Use named exports.',
            }],

            // Allow unused vars prefixed with _
            '@typescript-eslint/no-unused-vars': ['error', {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
            }],

            // No explicit any without justification
            '@typescript-eslint/no-explicit-any': 'error',
        },
    },
    {
        ignores: ['**/dist/**', '**/node_modules/**', '**/*.mjs', '**/*.js'],
    },
);
