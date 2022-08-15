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

## draftVersion.js
Selects highest value from each column while also respecting movement restrictions.

Notes:
- Due to its simplicity, this version won't always select best path
- Also isn't capable of outputting more than one path, case more paths share same total (bananas)

<img src=".\3x3drafts.png" width="300" />