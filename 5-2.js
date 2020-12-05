const fs = require('fs')
var arrayOfLines = fs.readFileSync("./5-input.txt").toString().split("\n")
var ticketsPresent = []

//Assemble a sorted array of all the seats
for(var seat of arrayOfLines) {
    ticketsPresent.push(findSeatId(seat))
}
ticketsPresent.sort(function(a,b){return a-b}) //Without the comparator, sorts alphabetically

//Find the missing seat
for(var i = 1; i < ticketsPresent.length; i++) {
    if(ticketsPresent[i] - ticketsPresent[i-1] > 1) {
        console.log("ticketsPresent[i-1] = " + ticketsPresent[i-1] + ", ticketsPresent[i] = " + ticketsPresent[i])
    }
}

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