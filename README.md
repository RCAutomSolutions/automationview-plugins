# automationview-plugins

Monorepo for [AutomationView](https://marketplace.visualstudio.com/items?itemName=RCAutomSolutions.automationview) extension plugins.

## Packages

| Package | Description |
|---------|-------------|
| [`automationview-codesys`](./packages/codesys) | CODESYS V3 export provider for PLCopen XML and Structured Text |
| [`automationview-festo`](./packages/festo) | Festo equipment catalog (manufacturer, equipment, dev software) |

## Getting Started

```bash
pnpm install
pnpm build
pnpm test
```

## Commands

| Command | Description |
|---------|-------------|
| `pnpm build` | Build all packages |
| `pnpm test` | Run all tests |
| `pnpm typecheck` | Type-check all packages |
| `pnpm clean` | Clean build artifacts |
| `pnpm package` | Package all extensions as `.vsix` |
| `pnpm package:codesys` | Package CODESYS extension only |
| `pnpm package:festo` | Package Festo extension only |

## Development

Each package is a standalone VS Code extension that depends on `@automationview/api`. Use the **Run and Debug** panel in VS Code to launch extensions in an Extension Host.

The host extension (`rcautomsolutions.automationview`) must be installed for plugins to activate.

## License

MIT - Copyright (c) RCAutomSolutions. See [LICENSE](./LICENSE) for details.
