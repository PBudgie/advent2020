const fs = require('fs')
var passports = fs.readFileSync("./4-input.txt").toString().split("\n\n")
var numValid = 0

var requiredFields = new Set()
requiredFields.add("byr")
requiredFields.add("iyr")
requiredFields.add("eyr")
requiredFields.add("hgt")
requiredFields.add("hcl")
requiredFields.add("ecl")
requiredFields.add("pid")

for(var i = 0; i < passports.length; i++) {
    if(isValid(passports[i])) {
        numValid += 1
    }
}

console.log(numValid)

function isValid(passport) {
    var kvPairs = passport.split(/\n| /)
    var setOfFields = new Set()
    for(var i = 0; i < kvPairs.length; i++) {
        var key = kvPairs[i].substring(0, kvPairs[i].indexOf(":"))
        if(key != "cid") {
            setOfFields.add(key)
        }
    }
    //console.log("" + setOfFields.size + " == " + requiredFields.size + " " + (setOfFields.size == requiredFields.size))
    return setOfFields.size == requiredFields.size
}