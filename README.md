# topsis2

topsis2 is a well-tested, simple, and lightweight [TOPSIS](https://en.wikipedia.org/wiki/TOPSIS) implementation with zero dependencies built with TypeScript.

[TOPSIS](https://en.wikipedia.org/wiki/TOPSIS), known as Technique for Order of Preference by Similarity to Ideal Solution, is a multi-criteria decision analysis method. It compares a set of alternatives based on a pre-specified criterion.

Why topsis2? because [topsis](https://www.npmjs.com/package/topsis) already taken with no more updates, no TypeScript included, no and has unnecessary dependency. Therefore, topsis2 is expected to be a successor with easier, better use.

## Install

```bash
# using npm
npm install topsis2
# using yarn
yarn add topsis2
```

## Usage

#### Import

```js
// in ESM
import topsis2 from 'topsis2';
// in CommonJS
const topsis2 = require('topsis2');
```

#### Example

```js
const criteria = [
  { weight: 4, type: 'cost' },
  { weight: 5, type: 'benefit' },
  { weight: 4, type: 'benefit' },
  { weight: 3, type: 'benefit' },
  { weight: 3, type: 'benefit' },
  { weight: 2, type: 'benefit' },
];
const matrix = [
  [3500, 70, 10, 80, 3000, 36],
  [4500, 90, 10, 60, 2500, 48],
  [4000, 80, 9, 90, 2000, 48],
  [4000, 70, 8, 50, 1500, 60],
];
const ranked = topsis2.rank(criteria, matrix);
console.log(ranked);
```

## API

#### `topsis2.rank(criteria: CriteriaAttribute[], matrix: number[][], verbose?: boolean): number[]`

This method will rank the alternatives with TOPSIS calculations and return the order of the best alternatives as an array. The parameters of this method are:

- ##### `criteria`

Criteria are usually in the form of measures or rules or standards used as benchmarks in decision-making. The property of `CriteriaAttribute` are:

| Name   | Type                  | Description                                                                                                                                                                                                                                |
| ------ | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| weight | `number`              | A number to estimate the relative importance of criterion. Can be any positive number, including `float` **(required)**                                                                                                                    |
| type   | `'benefit' \| 'cost'` | The `benefit` criterion is desired to be maximized, i.e. the higher the alternative scores in terms of this criterion, the better the alternative; in contrast, for the `cost` criterion, a lower value is preferred. Default: `'benefit'` |

Example use case:

```js
// Criteria / attributes for selection of smartphones
const criteria = [
  { weight: 15, type: 'cost' }, // C1 = Price (lower score better)
  { weight: 25, type: 'benefit' }, // C2 = RAM (higher score better)
  { weight: 25, type: 'benefit' }, // C3 = Storage (higher score better)
  { weight: 15, type: 'benefit' }, // C4 = Battery (higher score better)
  { weight: 20, type: 'benefit' }, // C5 = AnTuTu (higher score better)
];
```

- ##### `matrix`

Decision matrix that contains score data from all alternatives. The columns of the matrix must match the number of criteria and the rows of the matrix are the number of alternatives.

![Decision Matrix](https://user-images.githubusercontent.com/44522286/131339802-c16bb37c-6479-40e5-b28f-b79471b9bb26.png)

Example use case:

```js
// Alternative scores for smartphone
const matrix = [
  [201, 6, 128, 5000, 318444], // A1 = Xiaomi Poco M4 Pro
  [283, 6, 128, 4410, 502773], // A2 = Google Pixel 6a
  [200, 6, 128, 4500, 380672], // A3 = OnePlus Nord N20 5G
  [374, 6, 128, 5000, 506678], // A4 = Samsung Galaxy A54
  [269, 6, 128, 5000, 394918], // A5 = Samsung Galaxy A33 5G
];
```

The code above will map the score value as in the following table:

|        | C1 (Price) | C2 (RAM) | C3 (Storage) | C4 (Battery) | C5 (AnTuTu) |
| ------ | ---------- | -------- | ------------ | ------------ | ----------- |
| **A1** | $201       | 6 GB     | 128 GB       | 5000 mAh     | 318444      |
| **A2** | $283       | 6 GB     | 128 GB       | 4410 mAh     | 502773      |
| **A3** | $200       | 6 GB     | 128 GB       | 4500 mAh     | 380672      |
| **A4** | $374       | 6 GB     | 128 GB       | 5000 mAh     | 506678      |
| **A5** | $269       | 6 GB     | 128 GB       | 5000 mAh     | 394918      |

- ##### `verbose`

Used to generate detailed logging of TOPSIS calculations. Default: `false`, see the example below.

Example:

```js
const ranked = topsis2.rank(criteria, matrix, true); // using verbose mode
console.log('ranked =', ranked);
```

Output:

```bash
decision matrix (M)
┌─────────┬─────┬────┬─────┬──────┬────────┐
│ (index) │ C1  │ C2 │ C3  │  C4  │   C5   │
├─────────┼─────┼────┼─────┼──────┼────────┤
│   A1    │ 201 │ 6  │ 128 │ 5000 │ 318444 │
│   A2    │ 283 │ 6  │ 128 │ 4410 │ 502773 │
│   A3    │ 200 │ 6  │ 128 │ 4500 │ 380672 │
│   A4    │ 374 │ 6  │ 128 │ 5000 │ 506678 │
│   A5    │ 269 │ 6  │ 128 │ 5000 │ 394918 │
└─────────┴─────┴────┴─────┴──────┴────────┘
normalized decision matrix (R)
┌─────────┬──────┬──────┬──────┬──────┬──────┐
│ (index) │  C1  │  C2  │  C3  │  C4  │  C5  │
├─────────┼──────┼──────┼──────┼──────┼──────┤
│   A1    │ 0.33 │ 0.45 │ 0.45 │ 0.47 │ 0.33 │
│   A2    │ 0.46 │ 0.45 │ 0.45 │ 0.41 │ 0.53 │
│   A3    │ 0.33 │ 0.45 │ 0.45 │ 0.42 │ 0.4  │
│   A4    │ 0.61 │ 0.45 │ 0.45 │ 0.47 │ 0.53 │
│   A5    │ 0.44 │ 0.45 │ 0.45 │ 0.47 │ 0.41 │
└─────────┴──────┴──────┴──────┴──────┴──────┘
weighted normalized decision matrix (WR)
┌─────────┬──────┬───────┬───────┬──────┬───────┐
│ (index) │  C1  │  C2   │  C3   │  C4  │  C5   │
├─────────┼──────┼───────┼───────┼──────┼───────┤
│   A1    │ 4.94 │ 11.18 │ 11.18 │  7   │ 6.67  │
│   A2    │ 6.95 │ 11.18 │ 11.18 │ 6.18 │ 10.53 │
│   A3    │ 4.91 │ 11.18 │ 11.18 │ 6.3  │ 7.97  │
│   A4    │ 9.19 │ 11.18 │ 11.18 │  7   │ 10.61 │
│   A5    │ 6.61 │ 11.18 │ 11.18 │  7   │ 8.27  │
└─────────┴──────┴───────┴───────┴──────┴───────┘
positive ideal solution matrix (A+)
┌─────────┬──────┬───────┬───────┬────┬───────┐
│ (index) │  C1  │  C2   │  C3   │ C4 │  C5   │
├─────────┼──────┼───────┼───────┼────┼───────┤
│    0    │ 4.91 │ 11.18 │ 11.18 │ 7  │ 10.61 │
└─────────┴──────┴───────┴───────┴────┴───────┘
positive negative solution matrix (A-)
┌─────────┬──────┬───────┬───────┬──────┬──────┐
│ (index) │  C1  │  C2   │  C3   │  C4  │  C5  │
├─────────┼──────┼───────┼───────┼──────┼──────┤
│    0    │ 9.19 │ 11.18 │ 11.18 │ 6.18 │ 6.67 │
└─────────┴──────┴───────┴───────┴──────┴──────┘
alternative distance to positive ideal solution matrix (D+)
┌─────────┬────────┐
│ (index) │ Values │
├─────────┼────────┤
│   A1    │  3.94  │
│   A2    │  2.2   │
│   A3    │  2.73  │
│   A4    │  4.28  │
│   A5    │  2.89  │
└─────────┴────────┘
alternative distance to negative ideal solution matrix (D-)
┌─────────┬────────┐
│ (index) │ Values │
├─────────┼────────┤
│   A1    │  4.33  │
│   A2    │  4.46  │
│   A3    │  4.47  │
│   A4    │  4.03  │
│   A5    │  3.15  │
└─────────┴────────┘
preference values (V)
┌─────────┬────────┐
│ (index) │ Values │
├─────────┼────────┤
│   A1    │  0.52  │
│   A2    │  0.67  │
│   A3    │  0.62  │
│   A4    │  0.49  │
│   A5    │  0.52  │
└─────────┴────────┘
sorted preference values (V)
┌─────────┬────────┐
│ (index) │ Values │
├─────────┼────────┤
│   A2    │  0.67  │
│   A3    │  0.62  │
│   A1    │  0.52  │
│   A5    │  0.52  │
│   A4    │  0.49  │
└─────────┴────────┘

ranked = [ 1, 2, 0, 4, 3 ]
```

The results above indicate an alternative with index 1 or A2 (Google Pixel 6a) is the best smartphone from the TOPSIS calculation followed by A3, A1, A5 and A4.

#### `topsis2.best(criteria: CriteriaAttribute[], matrix: number[][], verbose?: boolean): number[]`

Same as the `topsis2.rank` method but immediately returns the index of the best ranking alternative.

Example:

```js
const best = topsis2.best(criteria, matrix, false);
console.log('best =', best);
```

Output:

```bash
best = 1
```

## Testing

This library is well tested. You can test the code as follows:

```bash
# use npm
npm test
# use yarn
yarn test
```

## Contribute

If you have anything to contribute, or functionality that you lack - you are more than welcome to participate in this!

Additions to unit testing are very welcome

## License

Feel free to use this library under the conditions of the MIT license.
