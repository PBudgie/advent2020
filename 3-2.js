const fs = require('fs')
var arrayOfLines = fs.readFileSync("./3-input.txt").toString().split("\n")

var slope11 = numTreesInSlope(1,1)
var slope31 = numTreesInSlope(3,1)
var slope51 = numTreesInSlope(5,1)
var slope71 = numTreesInSlope(7,1)
var slope12 = numTreesInSlope(1,2)
console.log(slope11 * slope31 * slope51 * slope71 * slope12)

function numTreesInSlope(xStep, yStep) {
    var i = 0
    var j = 0
    var treesEncountered = 0
    
    while(j < arrayOfLines.length) {
        i += xStep
        j += yStep
        if(arrayOfLines[j] != undefined && arrayOfLines[j].charAt(i % arrayOfLines[j].length) == "#") {
            treesEncountered += 1
        }
    
    }
    
    return treesEncountered
}