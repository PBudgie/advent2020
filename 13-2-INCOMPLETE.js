const fs = require('fs')

//Format the input correctly
const input = fs.readFileSync('./13-input.txt').toString().split('\n')[1].split(',').map((el) => {
    if(el !== 'x') {
        return parseInt(el)
    } else {
        return el
    }
})

//Find the index of the max number bus route. We'll use this one since it has the highest jump
var maxNumberIndex = input.indexOf(Math.max(...input.filter(el => {
    if(el !== "x") {
        return true
    } else {
        return false
    }
})))

//Find the indices of numerical elements
var numericIndices = input.map((el,ind) => {
    if(el !== "x") {
        return ind
    } else {
        return el
    }
}).filter((el) => {
    if(el === "x") {
        return false
    } else {
        return true
    }
})

//Deep copy the input array
//We'll increment this array and check whether it satisfies the timetable constraints
var incrementer = input.map((el, ind) => {
    if(ind === maxNumberIndex) {
        return Math.floor(100000000000000 / input[ind]) * input[ind]
    } else {
        return el
    }
})

while(checkCondition() == false) {
    incrementer[maxNumberIndex] += input[maxNumberIndex]

    //For each numeric element before and including the max index bus route, increment to the multiple right before it
    var i = 0
    while(numericIndices[i] <= maxNumberIndex) {
        incrementer[numericIndices[i]] = Math.floor(incrementer[maxNumberIndex] / input[numericIndices[i]]) * input[numericIndices[i]]
        i += 1
    }

    //For each numeric element after the max index bus route, increment to the multiple right after it
    while(i < numericIndices.length) {
        incrementer[numericIndices[i]] = Math.floor(incrementer[maxNumberIndex] / input[numericIndices[i]]) * input[numericIndices[i]] + input[numericIndices[i]]
        i += 1
    }
}
console.log(incrementer[0])

function checkCondition() {
    for(var ind of numericIndices) {
        if(incrementer[ind] - incrementer[0] !== ind) {
            return false
        }
    }
    return true
}