let testInputs = [
    {
        grid: [
            [1, 3, 3],
            [2, 1, 4],
            [0, 6, 4]
        ],
        output: 12,
        solutions: [
            [[1, 0], [2, 1], [2, 2]]
        ]
    },
    {
        grid: [
            [1, 3, 1, 5],
            [2, 2, 4, 1],
            [5, 0, 2, 3],
            [0, 6, 1, 2]
        ],
        output: 16,
        solutions: [
            [[2, 0], [1, 1], [1, 2], [0, 3]],
            [[2, 0], [3, 1], [2, 2], [2, 3]]
        ]
    },
    {
        grid: [
            [10, 33, 13, 15],
            [22, 21, 4,  1 ],
            [5,  0,  2,  3 ],
            [0,  6,  14, 2 ]
        ],
        output: 83,
        solutions: [
            [null]
        ]
    }
];

let gridPoints = {};
let leafList = [];

function getFromGivenPos(grid, prevY, prevX, paths, parents, total) {
    let nextPaths = paths;
    let nextYSteps = [];
    let nextX = prevX+1;

    if (nextX > grid[0].length-1) {
        nextPaths[prevY+','+prevX] = { y:prevY,x:prevX,v:grid[prevY][prevX],parents:parents,total:total,nextPaths:null };
        leafList.push(nextPaths[prevY+','+prevX]);
        return nextPaths; 
    }
    
    nextYSteps.push(prevY);
    if (prevY-1 >= 0) nextYSteps.push(prevY-1);
    if (prevY+1 <= grid.length-1) nextYSteps.push(prevY+1);

    for (let nextY of nextYSteps) {
        let newTotal = grid[nextY][nextX]+total;
        let newParentChain = (parents==null?'':parents+';')+prevY+','+prevX;
        if (nextPaths[prevY+','+prevX]) {
            let tempNextPaths = nextPaths[prevY+','+prevX];
            tempNextPaths.nextPaths = getFromGivenPos(grid, nextY, nextX, tempNextPaths.nextPaths, newParentChain, newTotal);
            tempNextPaths.total = newTotal;
        }
        else {
            nextPaths[prevY+','+prevX] = { 
                y:prevY,
                x:prevX,
                v:grid[prevY][prevX],
                parents:parents,
                total:newTotal,
                nextPaths:getFromGivenPos(grid, nextY, nextX, {}, newParentChain, newTotal) 
            };
        }
    }
    return nextPaths;
}

function showGridSolutions(grid) {
    
    for (let i = 0; i < grid.length; i++) {
        Object.assign(gridPoints, getFromGivenPos(grid, i, 0, {}, null, grid[i][0]));
    }
    
    let bestPaths = [];
    let highest = 0;
    for (let leaf of leafList) {
        if (leaf.total == highest) {
            bestPaths.push(leaf.parents+';'+leaf.y+','+leaf.x);
        }
        if (leaf.total > highest) {
            bestPaths = [];
            bestPaths.push(leaf.parents+';'+leaf.y+','+leaf.x);
            highest = leaf.total;
        }
    }
    bestPaths = bestPaths.map(x => x.replaceAll(';', ' -> ').replaceAll(/(\d,\d)/g, '($1)'));
    
    console.log('Total: ' + highest);
    console.log('Solutions: ');
    console.log(bestPaths);
}

showGridSolutions(testInputs[1].grid);