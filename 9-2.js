const fs = require("fs")
const input = fs.readFileSync("./9-input.txt").toString().split("\n").map(el => parseInt(el))
const goal = 3199139634 //The answer for part 1 is 3199139634

// Algo: Pick an index for the start of the window. Keep adding subsequent elements.
// If the total becomes greater than our goal, we picked the wrong start of the window.
// If our total equals our goal, we picked the right start of the window. Return the end of the window.

var startIndex = 0
var endIndex = -1

while(endIndex == -1) {
    var total = 0
    for(var i = startIndex; i < input.length; i++) {
        total += input[i]
        if(total > goal) {
            break
        } else if(total == goal) {
            endIndex = i
            break
        }
    }
    startIndex++
}

console.log("start: " + startIndex + " end: " + endIndex)
const window = input.slice(startIndex, endIndex + 1)
const windowMin = Math.min(...window)
const windowMax = Math.max(...window)
console.log(windowMin + windowMax)