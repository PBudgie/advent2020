const fs = require('fs')
const instructions = fs.readFileSync('./8-input.txt').toString().split('\n')
const accRegex = /^acc (\+|-)/
const jmpRegex = /^jmp (\+|-)/

var lineIndicesRan = new Set() //keeps track of the indices of the lines we have already run
var acc = 0
var currentLine = 0

do {
    var accMatch = instructions[currentLine].match(accRegex)
    var jmpMatch = instructions[currentLine].match(jmpRegex)

    lineIndicesRan.add(currentLine)

    if(accMatch !== null) {
        if(accMatch[1] == '+') {
            acc += parseInt(instructions[currentLine].substring(5))
        } else {
            acc -= parseInt(instructions[currentLine].substring(5))
        }
        currentLine += 1
    }

    else if(jmpMatch !== null) {
        if(jmpMatch[1] == '+') {
            currentLine += parseInt(instructions[currentLine].substring(5))
        } else {
            currentLine -= parseInt(instructions[currentLine].substring(5))
        }
    }

    else {
        currentLine += 1
    }
} while(!lineIndicesRan.has(currentLine))

console.log(acc)