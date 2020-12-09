const fs = require('fs')
var rawInput = fs.readFileSync('./8-input.txt').toString().split('\n')

var replaceIndex = 1
var acc = -1

// Replace nops/jmps one by one and see if it creates an infinite loop
do{
    if(rawInput[replaceIndex].includes("nop") || rawInput[replaceIndex].includes("jmp")) {
        // Create instructions with the nop/jmp replaced
        var replacedInstructions = rawInput.map((el, ind) => {
            if(ind == replaceIndex) {
                if(el.includes("nop")) {
                    return el.replace("nop", "jmp")
                } else if(el.includes("jmp")) {
                    return el.replace("jmp", "nop")
                }
            } else {
                return el
            }
        })

        // See if the new instructions creates and infinite loop using method (= part 1 code)
        acc = getAcc(replacedInstructions)
    }
    replaceIndex += 1
} while (acc == -1) // Keep looping until we find a non-infinite-loop

console.log(acc)

// Will return -1 if instructions create an infinite loop
function getAcc(instructions) {
    const accRegex = /^acc (\+|-)/
    const jmpRegex = /^jmp (\+|-)/

    var lineIndicesRan = new Set()
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

        //Exit condition: we try to run a line after the last line of the file
        if(currentLine == instructions.length) {
            return acc
        }
    } while(!lineIndicesRan.has(currentLine))

    //Making it here means we ran an instruction already run before, so the input instructions created an infinite loop
    return -1
}

