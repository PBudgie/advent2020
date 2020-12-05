const fs = require('fs')
var arrayOfLines = fs.readFileSync("./5-input.txt").toString().split("\n")
var maxSeatId = 0

for(var seat of arrayOfLines) {
    var thisSeatId = findSeatId(seat)
    if(thisSeatId > maxSeatId) {
        maxSeatId = thisSeatId
    }
}

console.log(maxSeatId)

function findSeatId(seatCode) {
    var rowBounds = [0, 127]
    for(var i = 0; i < 7; i++) {
        if(seatCode.charAt(i) == "F") {
            rowBounds[1] -= (rowBounds[1] - rowBounds[0] + 1) / 2
        } else {
            rowBounds[0] += (rowBounds[1] - rowBounds[0] + 1) / 2
        }
    }

    var colBounds = [0, 7]
    for (var i = 7; i < 10; i++) {
        if(seatCode.charAt(i) == "R") {
            colBounds[0] += (colBounds[1] - colBounds[0] + 1) / 2
        } else {
            colBounds[1] -= (colBounds[1] - colBounds[0] + 1) / 2
        }
    }

    return rowBounds[0] * 8 + colBounds[0]
}