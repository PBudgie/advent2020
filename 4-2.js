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
        var value = kvPairs[i].substring(kvPairs[i].indexOf(":") + 1)

        //Check validity of the values
        if(key == "byr") {
            var byrMatch = value.match(/^[0-9]{4}$/)
            if(byrMatch == null || parseInt(byrMatch) < 1920 || parseInt(byrMatch) > 2002) {
                return false
            }
        } else if(key == "iyr") {
            var iyrMatch = value.match(/^[0-9]{4}$/)
            if(iyrMatch == null || parseInt(iyrMatch) < 2010 || parseInt(iyrMatch) > 2020) {
                return false
            }
        } else if(key == "eyr") {
            var eyrMatch = value.match(/^[0-9]{4}$/)
            if(eyrMatch == null || parseInt(eyrMatch) < 2020 || parseInt(eyrMatch) > 2030) {
                return false
            }
        } else if(key == "hgt") {
            var hgtMatch = value.match(/(^[0-9]{3})(cm)$|^([0-9]{2})(in)$/)
            if(hgtMatch == null || 
                (hgtMatch[2] == "cm" && (parseInt(hgtMatch[1]) < 150 || parseInt(hgtMatch[1]) > 193)) || 
                (hgtMatch[2] == "in" && (parseInt(hgtMatch[1]) < 59 || parseInt(hgtMatch[1]) > 76))) {
                    return false
            }
        } else if(key == "hcl") {
            var hclMatch = value.match(/^#[0-9a-f]{6}$/)
            if(hclMatch == null) {
                return false
            }
        } else if(key == "ecl") {
            if (!["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(value)) {
                return false
            }
        } else if(key == "pid") {
            var pidMatch = value.match(/^[0-9]{9}$/)
            if(pidMatch == null) {
                return false
            }
        }

        //Add to the set of keys at the end
        if(key != "cid") {
            setOfFields.add(key)
        }
    }

    //All values are valid, check that all keys are present
    return setOfFields.size == requiredFields.size
}