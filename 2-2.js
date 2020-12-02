// Reuse code from part 1 to extract the info on each line using a regular expression.
// For each password, I use an XOR to check for only one occurrence of the letter.

const fs = require('fs')
var arrayOfLines = fs.readFileSync("./2-input.txt").toString().split("\n")
var numValid = 0

for(var i = 0; i < arrayOfLines.length; i++) {
    //Build a regex representing the line, extract the 4 pieces of info
    var lineExtractor = /(\d+)-(\d+) ([a-z]): ([a-z]+)/
    var lineMatch = arrayOfLines[i].match(lineExtractor)
    var pos1 = parseInt(lineMatch[1])
    var pos2 = parseInt(lineMatch[2])
    var ruleLetter = lineMatch[3]
    var password = lineMatch[4]

    //Check for 1 occurrence of the rule letter
    if(password.charAt(pos1 - 1) == ruleLetter ^ password.charAt(pos2 - 1) == ruleLetter) {
        numValid++
    }
}

console.log("Total valid: " + numValid)