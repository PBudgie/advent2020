const fs = require('fs')
const input = fs.readFileSync('./13-input.txt').toString().split('\n')

const arrTime = parseInt(input[0])
const buses = input[1].split(",").filter(el => el !== "x").map(el => parseInt(el))

var earliestDeparture = -1
var earliestBus = 0
for(var bus of buses) {
    var firstDeparture = Math.floor(arrTime / bus) * bus + bus
    console.log("Bus " + bus + " departs at " + firstDeparture)
    if(firstDeparture < earliestDeparture || earliestDeparture < 0) {
        earliestDeparture = firstDeparture
        earliestBus = bus
    }
}

console.log("---")
console.log("Earliest bus is " + earliestBus)
console.log("Its earliest departure time is " + earliestDeparture)
console.log("The answer is " + (earliestBus * (earliestDeparture - arrTime)))