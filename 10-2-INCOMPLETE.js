const fs = require("fs")
var input = fs.readFileSync("./10-input.txt").toString().split("\n").map((el) => parseInt(el))

input = [28, 33, 18, 42, 31, 14, 46, 20, 48, 47, 24, 23, 49, 45, 19, 38, 39, 11, 1, 32, 25, 35, 8, 17, 7, 9, 4, 2, 34, 10, 3]
input.push(0) //Add outlet's joltage rating to the list
var sorted = input.sort((a,b) => a-b)
sorted.push(sorted[sorted.length-1] + 3) //Add device's joltage rating to the end


var totalCombinations = 1
var currInd = 0

while(currInd < sorted.length) {
    // Find furthest previous adapter that can directly connect to the current one
    var furthestInd = currInd
    while(sorted[currInd] - sorted[furthestInd - 1] <= 3) {
        furthestInd -= 1
    }

    // Determine how many possible connections between this one and the furthest one
    if(currInd - furthestInd + 1 === 4) {
        totalCombinations *= 4
    } else if(currInd - furthestInd + 1 === 3) {
        totalCombinations *= 2
    }
    //console.log("total: " + totalCombinations)

    currInd += 1
}

console.log("total: " + totalCombinations)