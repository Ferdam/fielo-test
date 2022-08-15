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
            [22, 21, 4, 1],
            [5, 0, 2, 3],
            [0, 6, 14, 2]
        ],
        output: 83,
        solutions: [
            [null]
        ]
    }
];

function getNextBest(grid, pos) {
    // pos.x; pos.y;
    let gridYLength = grid.length-1;
    let X_Left = pos.x+1;
    let Y_Curr = pos.y;
    let Y_Up = pos.y-1 < 0 ? 0 : pos.y-1;
    let Y_Down = pos.y+1 > gridYLength ? gridYLength : pos.y+1;
    let best = [ {y:Y_Up, x:X_Left}, {y:Y_Down, x:X_Left}, {y:Y_Curr, x:X_Left} ].reduce( (a,b) => {
        return grid[a.y][a.x] > grid[b.y][b.x] ? a : b;
    });
    return best;
}

function getStartingPos(grid) {
    let startingMax = grid[0][0];
    let pos=0;
    for (let i = 0; i < grid.length; i++) {
        if (grid[i][0] > startingMax) {
            startingMax = grid[i][0];
            pos = i;
        }
    }
    return { y:pos, x:0 };
}

function getSolution(grid) {
    let steps = [getStartingPos(grid)];
    for (let i = 0; i < grid.length-1; i++) {
        steps.push(getNextBest(grid, steps[i]));
    }
    return steps;
}

function getSolutionScore(solution) {
    solution.total = 0;
    for (let step of solution.steps) {
        solution.total += solution.grid[step.y][step.x];
    }
    return solution;
}

let solSteps = getSolution(testInputs[1].grid);
console.log(solSteps);
console.log(getSolutionScore( { steps:solSteps, grid: testInputs[1].grid }));