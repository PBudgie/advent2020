// To extract the info on each line, I use a regular expression.
// For each password, we simply count the occurrences of the rule letter and check it against the min and max to determine validity.

const fs = require('fs')
var arrayOfLines = fs.readFileSync("./2-input.txt").toString().split("\n")
var numValid = 0

for(var i = 0; i < arrayOfLines.length; i++) {
    //Build a regex representing the line, extract the 4 pieces of info
    var lineExtractor = /(\d+)-(\d+) ([a-z]): ([a-z]+)/
    var lineMatch = arrayOfLines[i].match(lineExtractor)

    //console.log(lineMatch)
    //  lineMatch[1] = min
    //  lineMatch[2] = max
    //  lineMatch[3] = rule letter
    //  lineMatch[4] = password

    //Count occurrences of the rule letter
    var numOccurrences = 0
    for(var j = 0; j < lineMatch[4].length; j++) {
        if(lineMatch[4].charAt(j) == lineMatch[3]) {
            numOccurrences++
        }
    }

    //If numOccurrences is between the min and max (inclusive), this password is valid
    if(parseInt(lineMatch[1]) <= numOccurrences && numOccurrences <= parseInt(lineMatch[2])) {
        numValid++
    }
}

console.log("Total valid: " + numValid)