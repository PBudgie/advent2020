const fs = require("fs")
const input = fs.readFileSync("./9-input.txt").toString().split("\n").map(el => parseInt(el))

for(var i = 25; i < input.length; i++) {
    if(!canBeSumOf(input[i], input.slice(i - 25, i))) {
        console.log(input[i])
    }
}

function canBeSumOf(num, prevArr) {
    for(var i = 0; i < prevArr.length; i++) {
        for(var j = i; j < prevArr.length; j++) {
            if(i !== j && num === prevArr[i] + prevArr[j]) {
                return true
            }
        }
    }
    return false
}