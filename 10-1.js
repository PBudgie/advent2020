const fs = require("fs")
var input = fs.readFileSync("./10-input.txt").toString().split("\n").map((el) => parseInt(el))
input.push(0) //Add outlet's joltage rating to the list
var sorted = input.sort((a,b) => a-b)
sorted.push(sorted[sorted.length-1] + 3) //Add device's joltage rating to the end

var oneDiff = 0
var threeDiff = 0

for(var i = 1; i < sorted.length; i++) {
    if(sorted[i] - sorted[i-1] === 1) {
        oneDiff++
    } else if(sorted[i] - sorted[i-1] === 3) {
        threeDiff++
    }
}

console.log(oneDiff * threeDiff)