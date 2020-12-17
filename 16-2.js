const fs = require("fs")
const rawInput = fs.readFileSync("./16-input.txt").toString()
const validityHeader = rawInput.substring(0, rawInput.indexOf("your ticket")).trim().split("\n")
const myTicket = rawInput.substring(rawInput.indexOf("your ticket:") + 13, rawInput.indexOf("nearby tickets") - 2).split(",").map(el => parseInt(el))
const nearbyTickets = rawInput.substring(rawInput.indexOf("nearby tickets:") + 16).split("\n")

//Part 1: Preprocessing for ticket validity
//Assemble a set of valid numbers. Also assemble a hashmap of numbers to possible headers
var validNumbers = new Set()
var numToHeaderMap = {}
for(var validityRule of validityHeader) {
    var header = validityRule.substring(0, validityRule.indexOf(":"))

    var range1 = validityRule.substring(validityRule.indexOf(":") + 2, validityRule.indexOf(" or ")).split("-").map(el => parseInt(el))
    for(var i = range1[0]; i <= range1[1]; i++) {
        validNumbers.add(i)
        if(!(i in numToHeaderMap)) {
            numToHeaderMap[i] = [header]
        } else {
            numToHeaderMap[i] = [...numToHeaderMap[i], header]
        }
    }
    
    var range2 = validityRule.substring(validityRule.indexOf(" or ") + 4).split("-").map(el => parseInt(el))
    for(var i = range2[0]; i <= range2[1]; i++) {
        validNumbers.add(i)
        if(!(i in numToHeaderMap)) {
            numToHeaderMap[i] = [header]
        } else {
            numToHeaderMap[i] = [...numToHeaderMap[i], header]
        }
    }
}

//Part 2: Filter out invalid tickets
var validTickets = []
for(var ticket of nearbyTickets) {
    ticket = ticket.split(',').map(el => parseInt(el))
    var ticketIsValid = true
    for(var num of ticket) {
        if(!validNumbers.has(num)) {
            ticketIsValid = false
        }
    }
    if(ticketIsValid === true) {
        validTickets.push(ticket)
    }
}

//Part 3: Figure out the possible headers
//There are multiple header possibilities for each column
var possibleHeadersForCol = []
for(var col = 0; col < validTickets[0].length; col++) {
    var possibleHeaders = numToHeaderMap[validTickets[0][col]]
    for(var row = 1; row < validTickets.length; row++) {
        possibleHeaders = possibleHeaders.filter(el => {
            return numToHeaderMap[validTickets[row][col]].includes(el)
        })
    }
    possibleHeadersForCol.push(possibleHeaders)
}

//Part 4: Find which column has which header via elimination
var headerForCol = new Array(possibleHeadersForCol.length)
for(var counter = 0; counter < possibleHeadersForCol.length; counter++) {
    //Find column with only one possibility
    var colWithOneHeader = possibleHeadersForCol.findIndex(el => {return el.length == 1})
    var theHeader = possibleHeadersForCol[colWithOneHeader][0]

    //Remove that header from all the other columns
    for(var i = 0; i < possibleHeadersForCol.length; i++) {
        possibleHeadersForCol[i] = possibleHeadersForCol[i].filter(el => {return el !== theHeader})
    }

    //Write down the header for the column
    headerForCol[colWithOneHeader] = theHeader
}

//Part 5: Finally, multiply the answers together for my ticket
var finalAnswer = 1
for(var i = 0; i < headerForCol.length; i++) {
    if(headerForCol[i].includes("departure")) {
        finalAnswer *= myTicket[i]
    }
}
console.log(finalAnswer)