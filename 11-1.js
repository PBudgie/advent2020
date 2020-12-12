const fs = require('fs')
var seatMap = fs.readFileSync('./11-input.txt').toString().split('\n').map(el => el.split(""))

var seatsChanged = 1
while(seatsChanged > 0) {
    var newSeatMap = seatMap.map((el) => {return el.map(el2 => el2)})
    seatsChanged = 0

    //Occupy cycle
    for(var i = 0; i < seatMap.length; i++) {
        for(var j = 0; j < seatMap[i].length; j++) {
            if(seatMap[i][j] == "L" && countOccupiedSeatsAround(i,j) == 0) {
                newSeatMap[i][j] = "#"
                seatsChanged += 1
            }
        }
    }

    //Unoccupy cycle
    for(var i = 0; i < seatMap.length; i++) {
        for(var j = 0; j < seatMap[i].length; j++) {
            if(seatMap[i][j] == "#" && countOccupiedSeatsAround(i,j) >= 4) {
                newSeatMap[i][j] = "L"
                seatsChanged += 1
            }
        }
    }

    seatMap = newSeatMap
}

// Count number of occupied seats
var numSeats = 0
for(var i = 0; i < seatMap.length; i++) {
    for(var j = 0; j < seatMap[i].length; j++) {
        if(seatMap[i][j] == "#") {
            numSeats += 1
        }
    }
}
console.log(numSeats)

function countOccupiedSeatsAround(i,j) {
    var numOccupied = 0

    if(i-1>=0 && j-1>=0 && seatMap[i-1][j-1]=="#") { //NW seat
        numOccupied += 1
    }

    if(j-1>=0 && seatMap[i][j-1]=="#") { //W seat
        numOccupied += 1
    }

    if(i+1<seatMap.length && j-1>=0 && seatMap[i+1][j-1]=="#") { //SW seat
        numOccupied += 1
    }

    if(i-1>=0 && seatMap[i-1][j]=="#") { //N seat
        numOccupied += 1
    }

    if(i+1<seatMap.length && seatMap[i+1][j]=="#") { //S seat
        numOccupied += 1
    }

    if(i-1>=0 && j+1<seatMap[0].length && seatMap[i-1][j+1]=="#") { //NE seat
        numOccupied += 1
    }

    if(j+1<seatMap[0].length && seatMap[i][j+1]=="#") { //E seat
        numOccupied += 1
    }

    if(i+1<seatMap.length && j+1<seatMap[0].length && seatMap[i+1][j+1]=="#") { //SE seat
        numOccupied += 1
    }

    return numOccupied
}

function printSeatMap() {
    console.log(seatMap.map(el => el.join("")).join("\n"))
}