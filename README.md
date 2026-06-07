<img src=".github/assets/latice-flags-monorepo.png" alt="latice flags" width="100%" />

<br />

Country flag components for React and Vue. Lightweight, tree-shakable, SSR-ready.

## Packages

|                                                                                                    | Package               | Version                                                                                                                                      | Downloads                                                                                                                                           | Source                             |
| -------------------------------------------------------------------------------------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| <img src="https://raw.githubusercontent.com/the-latice/flags/main/.github/assets/react-icon.png"/> | `@latice/flags-react` | [![npm](https://img.shields.io/npm/v/@latice/flags-react?style=flat-square&color=dd4343)](https://www.npmjs.com/package/@latice/flags-react) | [![downloads](https://img.shields.io/npm/dw/@latice/flags-react?style=flat-square&color=456ace)](https://www.npmjs.com/package/@latice/flags-react) | [packages/react](./packages/react) |
| <img src="https://raw.githubusercontent.com/the-latice/flags/main/.github/assets/vue-icon.png"/>   | `@latice/flags-vue`   | [![npm](https://img.shields.io/npm/v/@latice/flags-vue?style=flat-square&color=dd4343)](https://www.npmjs.com/package/@latice/flags-vue)     | [![downloads](https://img.shields.io/npm/dw/@latice/flags-vue?style=flat-square&color=456ace)](https://www.npmjs.com/package/@latice/flags-vue)     | [packages/vue](./packages/vue)     |

> A React Native package is in development.

## Monorepo structure

```
packages/
├── core/      # shared types, constants, SVG sources (private)
├── react/     # @latice/flags-react
└── vue/       # @latice/flags-vue
```

## Development

```bash
pnpm install
pnpm build     # build all packages
pnpm gen       # regenerate flag components from SVGs
pnpm format    # format code with Prettier
pnpm typecheck
```

## License

[ISC](./LICENSE)
