const fs = require('fs')
var groups = fs.readFileSync("./6-input.txt").toString().split("\n\n")
var sum = 0

for(var group of groups) {
    sum += getNumAnswers(group)
}
console.log(sum)

function getNumAnswers(group) {
    var setOfLetters = new Set()
    for(var i = 0; i < group.length; i++) {
        if(group.charAt(i) != "\n") {
            setOfLetters.add(group.charAt(i))
        }
    }
    return setOfLetters.size
}