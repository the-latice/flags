<img src="https://raw.githubusercontent.com/the-latice/flags/main/.github/assets/latice-flags-react.png" alt="latice flags-react" width="100%" />

<br />

[![License](https://img.shields.io/badge/license-ISC-456ace?style=flat-square)](https://github.com/the-latice/flags/blob/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/@latice/flags-react?style=flat-square&color=dd4343)](https://www.npmjs.com/package/@latice/flags-react)
[![npm downloads](https://img.shields.io/npm/dw/@latice/flags-react?style=flat-square&color=3b82f6)](https://www.npmjs.com/package/@latice/flags-react)
[![React](https://img.shields.io/badge/react-18%2B%20%7C%2019%2B-3b82f6?style=flat-square)](https://react.dev/)

Country flag components for React. 250+ flags, three sizes, optional border, shadow and gradient overlays. Ships two entry points: a **dynamic** component that lazy-loads flags on demand, and a **static** entry for full tree-shaking.

---

## Installation

```bash
npm install @latice/flags-react
# or
pnpm add @latice/flags-react
```

---

## Usage

### Dynamic

`Flag` lazy-loads each SVG on first render and caches the result for subsequent renders – no upfront bundle cost regardless of how many codes your app might encounter. The right choice when you want zero configuration and don't mind a small runtime registry.

```tsx
import { Flag } from '@latice/flags-react'

<Flag code="PL" size="md" />   {/* Alpha-2 */}
<Flag code="POL" size="lg" />  {/* Alpha-3 */}
<Flag code="616" size="sm" />  {/* Numeric */}
```

### Static — fully tree-shakable

Import individual flag components directly. Only the flags you import end up in your bundle — ideal when you know upfront which flags you need.

```tsx
import { FlagPL, FlagGB_SCT } from '@latice/flags-react/static'

<FlagPL size="lg" />
<FlagGB_SCT size="sm" shadow />
```

**Naming:** `Flag` + ISO 3166 Alpha-2, uppercase. Hyphens become underscores: `GB-SCT` => `FlagGB_SCT`.

---

## API

| Key        | Value     | Required | Default | Format                                                                                                 |
| :--------- | :-------- | :------- | :------ | :----------------------------------------------------------------------------------------------------- |
| `code`     | `string`  | `true`\* | —       | [See all codes](https://github.com/the-latice/flags/blob/main/packages/core/src/utils/country-list.ts) |
| `size`     | `string`  | `false`  | `'md'`  | `'sm'`, `'md'`, `'lg'`                                                                                 |
| `gradient` | `string`  | `false`  | —       | `'top-down'`, `'linear'`                                                                               |
| `shadow`   | `boolean` | `false`  | `false` | —                                                                                                      |
| `border`   | `boolean` | `false`  | `true`  | —                                                                                                      |
| `rounded`  | `boolean` | `false`  | `true`  | —                                                                                                      |

> \*`code` is required for `<Flag>` only. Individual flag components from the static entry (`<FlagPL />`, etc.) do not accept a code prop.

<img src="https://raw.githubusercontent.com/the-latice/flags/main/.github/assets/latice-flags-showcase.png" alt="latice flags showcase" width="100%" />

---

## Special codes

Beyond standard ISO 3166-1 country codes, the library includes a small collection of additional flags such as constituent countries, territories, and international organizations.

### UK constituent countries

| Code     | Territory |
| :------- | :-------- |
| `GB-ENG` | England   |
| `GB-SCT` | Scotland  |
| `GB-WLS` | Wales     |

```tsx
<Flag code="GB-SCT" />
// static: <FlagGB_SCT />
```

---

<img src="https://raw.githubusercontent.com/the-latice/flags/main/.github/assets/latice-flags-artifacts.png" alt="no white edge artifacts" width="100%" />

## License

[ISC](https://github.com/the-latice/flags/blob/main/LICENSE)
