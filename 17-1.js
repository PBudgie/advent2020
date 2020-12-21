const fs = require('fs')
const rawInput = fs.readFileSync("./17-input.txt").toString()
const inputRows = rawInput.split("\n")
const inputYLength = inputRows.length
const inputCols = rawInput.split("\n")[0]
const inputXLength = inputCols.length

//Create an array of inactive cubes with 6 extra cubes in each dimension.
var row = '.'.repeat(inputXLength + 12)
var grid2d = (row + "\n").repeat(inputYLength + 12)
var cubeSpace = new Array(13).fill(grid2d) //Causes z to be the first index.

//Fill the array with our starting input
var activeEntry = (row+"\n").repeat(6)
for(var i = 0; i < inputYLength; i++) {
    activeEntry += '.'.repeat(6) + inputRows[i] + '.'.repeat(6) + "\n"
}
activeEntry += (row+"\n").repeat(6)
cubeSpace[6] = activeEntry

//Run the 6 cycles
for (var cycleCount = 1; cycleCount <= 6; cycleCount++) {
    var newCubeSpace = new Array(13).fill(grid2d)

    for(var k = 6 - cycleCount; k <= 6 + cycleCount; k++) {
        for(var i = 0; i < inputXLength+12; i++) {
            for(var j = 6 - cycleCount; j  < 5 + inputXLength + cycleCount; j++) {
                var numActiveNeighbors = countActiveNeighbors(k,i,j)
                var indexInSlice = i*(inputYLength+13) + j
                if(cubeSpace[k].charAt(indexInSlice) == "#" && numActiveNeighbors >= 2 && numActiveNeighbors <= 3) {
                    newCubeSpace[k] = newCubeSpace[k].substring(0, indexInSlice) + "#" + newCubeSpace[k].substring(indexInSlice + 1)
                } else if (cubeSpace[k].charAt(indexInSlice) == "." && numActiveNeighbors == 3) {
                    newCubeSpace[k] = newCubeSpace[k].substring(0, indexInSlice) + "#" + newCubeSpace[k].substring(indexInSlice + 1)
                }
            }
        }
    }

    //console.log(newCubeSpace.join("----\n"))
    cubeSpace = newCubeSpace
}

//Count the number of active cubes
var finalActiveCubes = 0
for(var slice of cubeSpace) {
    for(var ind = 0; ind < slice.length; ind++) {
        if(slice.charAt(ind) == "#") {
            finalActiveCubes ++
        }
    }
}
console.log(finalActiveCubes)

//Function to count the active neighbors of a cube in cubeSpace
function countActiveNeighbors(z,x,y) {
    var activeNeighbors = 0
    for(var i = -1; i <= 1 && x+i>=0 && x+i<inputXLength+12; i++) {
        for(var j = -1; j <= 1 && y+j>=0 && y+j<inputYLength+12; j++) {
            for(var k = -1; k <= 1 && (z+k>=0) && (z+k < 13); k++) {
                if(cubeSpace[z+k].charAt((x+i)*(inputXLength+13) + (y+j)) == "#" && !(i == 0 && j == 0 && k == 0)) {
                    activeNeighbors += 1
                }
            }
        }
    }
    return activeNeighbors
}