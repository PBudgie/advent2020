const fs = require("fs")
const rawInput = fs.readFileSync("./16-input.txt").toString()
const validityHeader = rawInput.substring(0, rawInput.indexOf("your ticket")).trim().split("\n")
const nearbyTickets = rawInput.substring(rawInput.indexOf("nearby tickets:") + 16).split(/\n|,/).map(el => parseInt(el))

//Assemble a set of valid numbers
var validSet = new Set()
for(var validityRule of validityHeader) {
    var range1 = validityRule.substring(validityRule.indexOf(":") + 2, validityRule.indexOf(" or ")).split("-").map(el => parseInt(el))
    for(var i = range1[0]; i <= range1[1]; i++) {
        validSet.add(i)
    }
    
    var range2 = validityRule.substring(validityRule.indexOf(" or ") + 4).split("-").map(el => parseInt(el))
    for(var i = range2[0]; i <= range2[1]; i++) {
        validSet.add(i)
    }
}

//Go through tickets and find sum of invalid numbers
var sumInvalidNumbers = 0
for(var ticket of nearbyTickets) {
    if(!validSet.has(ticket)) {
        sumInvalidNumbers += ticket
    }
}
console.log(sumInvalidNumbers)