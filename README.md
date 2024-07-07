# primitive-octasphere

[![npm version](https://img.shields.io/npm/v/primitive-octasphere)](https://www.npmjs.com/package/primitive-octasphere)
[![stability-stable](https://img.shields.io/badge/stability-stable-green.svg)](https://www.npmjs.com/package/primitive-octasphere)
[![npm minzipped size](https://img.shields.io/bundlephobia/minzip/primitive-octasphere)](https://bundlephobia.com/package/primitive-octasphere)
[![dependencies](https://img.shields.io/librariesio/release/npm/primitive-octasphere)](https://github.com/dmnsgn/primitive-octasphere/blob/main/package.json)
[![types](https://img.shields.io/npm/types/primitive-octasphere)](https://github.com/microsoft/TypeScript)
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-fa6673.svg)](https://conventionalcommits.org)
[![styled with prettier](https://img.shields.io/badge/styled_with-Prettier-f8bc45.svg?logo=prettier)](https://github.com/prettier/prettier)
[![linted with eslint](https://img.shields.io/badge/linted_with-ES_Lint-4B32C3.svg?logo=eslint)](https://github.com/eslint/eslint)
[![license](https://img.shields.io/github/license/dmnsgn/primitive-octasphere)](https://github.com/dmnsgn/primitive-octasphere/blob/main/LICENSE.md)

An octasphere geometry for 3D rendering, including normals, UVs and cell indices (faces). Based on [Philip Rideout's article here](https://prideout.net/blog/octasphere/).

[![paypal](https://img.shields.io/badge/donate-paypal-informational?logo=paypal)](https://paypal.me/dmnsgn)
[![coinbase](https://img.shields.io/badge/donate-coinbase-informational?logo=coinbase)](https://commerce.coinbase.com/checkout/56cbdf28-e323-48d8-9c98-7019e72c97f3)
[![twitter](https://img.shields.io/twitter/follow/dmnsgn?style=social)](https://twitter.com/dmnsgn)

![](https://raw.githubusercontent.com/dmnsgn/primitive-octasphere/main/screenshot.gif)

## Installation

```bash
npm install primitive-octasphere
```

## Usage

```js
import createOctasphere from "primitive-octasphere";

const geometry = createOctasphere();

console.log(geometry);
// {
//   positions: [ [x, y, z], [x, y, z], ... ],
//   cells: [ [a, b, c], [a, b, c], ... ],
//   uvs: [ [u, v], [u, v], ... ],
//   normals: [ [x, y, z], [x, y, z], ... ]
// }
```

## API

<!-- api-start -->

## Functions

<dl>
<dt><a href="#createOctasphere">createOctasphere([options])</a> ⇒ <code><a href="#SimplicialComplex">SimplicialComplex</a></code></dt>
<dd><p>An octasphere geometry for 3D rendering, including normals, UVs and cell indices (faces).</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#vec2">vec2</a> : <code>Array.&lt;number&gt;</code></dt>
<dd></dd>
<dt><a href="#vec3">vec3</a> : <code>Array.&lt;number&gt;</code></dt>
<dd></dd>
<dt><a href="#OctasphereOptions">OctasphereOptions</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#SimplicialComplex">SimplicialComplex</a> : <code>object</code></dt>
<dd><p>Geometry definition.</p>
</dd>
</dl>

<a name="createOctasphere"></a>

## createOctasphere([options]) ⇒ [<code>SimplicialComplex</code>](#SimplicialComplex)

An octasphere geometry for 3D rendering, including normals, UVs and cell indices (faces).

**Kind**: global function

| Param     | Type                                                 | Default         |
| --------- | ---------------------------------------------------- | --------------- |
| [options] | [<code>OctasphereOptions</code>](#OctasphereOptions) | <code>{}</code> |

<a name="vec2"></a>

## vec2 : <code>Array.&lt;number&gt;</code>

**Kind**: global typedef
<a name="vec3"></a>

## vec3 : <code>Array.&lt;number&gt;</code>

**Kind**: global typedef
<a name="OctasphereOptions"></a>

## OctasphereOptions : <code>object</code>

**Kind**: global typedef
**Properties**

| Name           | Type                | Default          |
| -------------- | ------------------- | ---------------- |
| [radius]       | <code>number</code> | <code>0.5</code> |
| [subdivisions] | <code>number</code> | <code>2</code>   |

<a name="SimplicialComplex"></a>

## SimplicialComplex : <code>object</code>

Geometry definition.

**Kind**: global typedef
**Properties**

| Name      | Type                                     |
| --------- | ---------------------------------------- |
| positions | [<code>Array.&lt;vec3&gt;</code>](#vec3) |
| normals   | [<code>Array.&lt;vec3&gt;</code>](#vec3) |
| uvs       | [<code>Array.&lt;vec2&gt;</code>](#vec2) |
| cells     | [<code>Array.&lt;vec3&gt;</code>](#vec3) |

<!-- api-end -->

## License

MIT. See [license file](https://github.com/dmnsgn/primitive-octasphere/blob/main/LICENSE.md).
