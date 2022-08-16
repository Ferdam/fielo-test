# Fielo Challenge
Two .js files available:
- draftVersion.js: contains old attempts to solve proposed issue
- finalVersion.js: contains final solution I'm delivering

## finalVersion.js
Builds all possible node paths respecting movement restrictions while also rolling up cell values to parents during each step
Lastly, selects all path solutions having best sum (output/bananas)

Notes:
- During build phase, each path node will have ref to its parent. A leaf has track of parents (path).
- Lacks improvements to avoid paths that certainly won't give best outcome, resulting in time/processing waste
- Relies on recursiveness, so memory might be impacted when running against bigger grids
- Heavy use of javascript object maps to increase performance instead of linear searches

### Big-O Notation
Running finalVersion through Big-O-Calculator (https://www.npmjs.com/package/big-o-calculator) gives an estimation of **O(n^m)**

```javascript
{
  bigO: 'O(n^m)',
  testResults: [
    { result: 78, n: 3 },
    { result: 54, n: 4 },
    { result: 58, n: 8 },
    { result: 2681, n: 16 },
    { result: 20019, n: 32 }
  ]
}
```
result = execution time in milliseconds;
n = Sample Size;
> Sample Size of 8 means a grid 8x8 with random values ranging from 0 to 30;

> Note
> Samples larger than 32x32 reached timeout

## draftVersion.js
Selects highest value from each column while also respecting movement restrictions.

Notes:
- Due to its simplicity, this version won't always select best path
- Also isn't capable of outputting more than one path, case more paths share same total (bananas)

### Draft of a 3x3 Grid
A draft of a 3x3 grid with all path possibilities to help on visualization:

<img src=".\3x3drafts.png" width="300" />