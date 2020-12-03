const fs = require('fs')
var arrayOfLines = fs.readFileSync("./3-input.txt").toString().split("\n")

var i = 0
var j = 0
var treesEncountered = 0

while(j < arrayOfLines.length) {
    i += 3
    j += 1
    if(arrayOfLines[j] != undefined && arrayOfLines[j].charAt(i % arrayOfLines[j].length) == "#") {
        treesEncountered += 1
    }

}

console.log(treesEncountered)