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
            if(seatMap[i][j] == "#" && countOccupiedSeatsAround(i,j) >= 5) {
                newSeatMap[i][j] = "L"
                seatsChanged += 1
            }
        }
    }

    seatMap = newSeatMap
    //console.log("----")
    //printSeatMap()
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

    var count = 1
    while(i-count>=0 && j-count>=0) { //NW direction
        if(seatMap[i-count][j-count]=="#") {
            numOccupied += 1
            break
        } else if(seatMap[i-count][j-count]=="L") {
            break
        }
        count += 1
    }

    count = 1
    while(j-count>=0) { //W direction
        if(seatMap[i][j-count]=="#") {
            numOccupied += 1
            break
        } else if (seatMap[i][j-count]=="L") {
            break
        }
        count += 1
    }

    count = 1
    while(i+count<seatMap.length && j-count>=0) { //SW direction
        if(seatMap[i+count][j-count]=="#") {
            numOccupied += 1
            break
        } else if(seatMap[i+count][j-count]=="L") {
            break
        }
        count += 1
    }

    count = 1
    while(i-count>=0) { //N direction
        if(seatMap[i-count][j]=="#") {
            numOccupied += 1
            break
        } else if(seatMap[i-count][j]=="L") {
            break
        }
        count += 1
    }

    count = 1
    while(i+count<seatMap.length) { //S direction
        if(seatMap[i+count][j]=="#") {
            numOccupied += 1
            break
        } else if(seatMap[i+count][j]=="L") {
            break
        }
        count += 1
    }

    count = 1
    while(i-count>=0 && j+count<seatMap[0].length) { //NE direction
        if(seatMap[i-count][j+count]=="#") {
            numOccupied += 1
            break
        } else if(seatMap[i-count][j+count]=="L") {
            break
        }
        count += 1
    }

    count = 1
    while(j+count<seatMap[0].length) { //E direction
        if(seatMap[i][j+count]=="#") {
            numOccupied += 1
            break
        } else if(seatMap[i][j+count]=="L") {
            break
        }
        count += 1
    }

    count = 1
    while(i+count<seatMap.length && j+count<seatMap[0].length) { //SE direction
        if(seatMap[i+count][j+count]=="#") {
            numOccupied += 1
            break
        } else if(seatMap[i+count][j+count]=="L") {
            break
        }
        count += 1
    }

    //console.log("" + i + "," + j + " has " + numOccupied + " occupied seats")
    return numOccupied
}

function printSeatMap() {
    console.log(seatMap.map(el => el.join("")).join("\n"))
}