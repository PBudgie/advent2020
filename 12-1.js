const fs = require('fs')
const input = fs.readFileSync('./12-input.txt').toString().split('\n')

var facing = "E"
var horizontal = 0
var vertical = 0

for(var instruction of input) {
    var instructionDirection = instruction.charAt(0)
    var instructionNumber = parseInt(instruction.substring(1))

    if(instructionDirection === "N" || (instructionDirection === "F" && facing === "N")) {
        vertical += instructionNumber
    } else if(instructionDirection === "S" || (instructionDirection === "F" && facing === "S")) {
        vertical -= instructionNumber
    } else if(instructionDirection === "E" || (instructionDirection === "F" && facing === "E")) {
        horizontal += instructionNumber
    } else if(instructionDirection === "W" || (instructionDirection === "F" && facing === "W")) {
        horizontal -= instructionNumber
    } else if(instructionDirection === "L" || instructionDirection === "R") {
        changeFacingDirection(instructionDirection, instructionNumber)
    }
}

console.log(Math.abs(horizontal) + Math.abs(vertical))

function changeFacingDirection(direction, angle) {
    const compass = ["N", "E", "S", "W"] //going right around the compass
    var currentDirection = compass.indexOf(facing)
    var numTicks = angle / 90
    if(direction == "L") {
        if(currentDirection - numTicks < 0) { //Modulo will keep negative numbers
            facing = compass[(currentDirection - numTicks) + compass.length]
        } else {
            facing = compass[(currentDirection - numTicks) % compass.length]
        }
    } else {
        facing = compass[(currentDirection + numTicks) % compass.length]
    }
    //console.log("Was facing " + compass[currentDirection] + " now facing " + facing)
}