# AutomationView Plugins — Claude Code Instructions

## Language

- Respond in **English**
- Understand **French** (the developer may write in French)

## Project Overview

pnpm monorepo for AutomationView VS Code extension plugins. Each package under `packages/` is an independent VS Code extension that uses `@automationview/api` to integrate with the host extension.

## Packages

- **`packages/codesys`** — CODESYS V3 export provider (PLCopen XML + Structured Text)
- **`packages/festo`** — Festo equipment catalog (manufacturer, equipment, dev software)

## Essential Commands

```bash
pnpm install              # Install all dependencies
pnpm build                # Build all packages (Turbo + esbuild)
pnpm test                 # Run all tests (Vitest)
pnpm typecheck            # TypeScript type checking
pnpm package              # Package all .vsix files
pnpm package:codesys      # Package CODESYS only
pnpm package:festo        # Package Festo only
```

## Coding Standards

- TypeScript strict mode, ES2022 target, `bundler` module resolution
- `verbatimModuleSyntax: true` — enforced by the compiler, not optional
- Copyright header on every `.ts` file (see existing files for format)
- Named exports only — no default exports
- No `any` unless justified with a comment
- One concern per file, group by feature
- Barrel exports (`index.ts`) for directories
- JSDoc only on public exports
- TODO format: `// TODO: <description>`

## Import Rules

- **No `.js` extensions** in imports — write `from './foo'`, never `from './foo.js'` (bundler resolution)
- **`import type` is mandatory** for type-only imports — `verbatimModuleSyntax` makes this a compiler error
- Use `import type { Foo }` when `Foo` is only used as a type annotation
- Use `import { type Foo, bar }` for mixed imports (type + value from the same module)
- Regular `import { Foo }` only when `Foo` is used as a value (instantiated, called, or referenced at runtime)

## Git Conventions

- **Branches**: `feature/<name>`, `fix/<name>`, `hotfix/<name>` — always branch from `dev`
- **Commits**: Conventional commits — `feat:`, `fix:`, `chore:`, `refactor:`, `test:`, `docs:`
- **Releases**: Tag as `<package>-v<version>` (e.g., `codesys-v1.0.0`)
- **Default branch**: `main` (production), `dev` (integration)

## Do NOT

- Modify `.env` files
- Push directly to `main` or `dev`
- Force push
- Skip pre-commit hooks
- Introduce `any` without justification
- Add default exports
- Add `.js` extensions to imports (bundler resolution handles this)
- Use `import` for type-only symbols (use `import type` — compiler-enforced)
- Add `esModuleInterop` (incompatible with `verbatimModuleSyntax`)
- Create shared-config packages (shared config lives in root `esbuild.base.mjs`)
