const fs = require('fs')
const input = fs.readFileSync('./12-input.txt').toString().split('\n')

var waypoint = [10, 1] //waypoint pos relative to the ship
var horizontal = 0
var vertical = 0

for(var instruction of input) {
    var instructionDirection = instruction.charAt(0)
    var instructionNumber = parseInt(instruction.substring(1))

    if(instructionDirection === "N") {
        waypoint[1] += instructionNumber
    } else if(instructionDirection === "S") {
        waypoint[1] -= instructionNumber
    } else if(instructionDirection === "E") {
        waypoint[0] += instructionNumber
    } else if(instructionDirection === "W") {
        waypoint[0] -= instructionNumber
    } else if(instructionDirection === "F") {
        horizontal += instructionNumber * waypoint[0]
        vertical += instructionNumber * waypoint[1]
    } else { //instruction is L or R
        rotateWaypoint(instructionDirection, instructionNumber)
    }
}

console.log(Math.abs(horizontal) + Math.abs(vertical))

function rotateWaypoint(direction, angle) {
    if(angle === 180) {
        waypoint = [-1 * waypoint[0], -1 * waypoint[1]]
    }

    if(direction == "L") {
        if(angle === 90) {
            waypoint = [-1 * waypoint[1], waypoint[0]]
        } else if(angle === 270) {
            waypoint = [waypoint[1], -1 * waypoint[0]]
        }
    } else { //instruction is R
        if(angle === 90) {
            waypoint = [waypoint[1], -1 * waypoint[0]]
        } else if(angle === 270) {
            waypoint = [-1 * waypoint[1], waypoint[0]]
        }
    }
}