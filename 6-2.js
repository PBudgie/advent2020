const fs = require('fs')
var groups = fs.readFileSync("./6-input.txt").toString().split("\n\n")
var total = 0

for(var group of groups) {
    total += getCommonAnswers(group)
}
console.log(total)

function getCommonAnswers(group) {
    var answers = group.split("\n")

    //Find common answers by intersecting arrays of answers
    var commonAnswers = answers[0].split("") //Start with an array containing the first person's answers
    for(var i = 1; i < answers.length; i++) {
        var thisAnswer = answers[i].split("")
        commonAnswers = commonAnswers.filter((a) => {return thisAnswer.includes(a)}) //Do the intersection
    }
    return commonAnswers.length
}