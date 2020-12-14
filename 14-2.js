const fs = require('fs')
var input = fs.readFileSync("./14-input.txt").toString().split("mask = ")
input.shift() //Remove first null element
var mem = {}

//Build mem
for(var maskGroup of input) {
    var info = maskGroup.trim().split('\n')
    var mask = info[0]

    for(var i = 1; i < info.length; i++) {
        var memAddress = info[i].substring(info[i].indexOf("[") + 1, info[i].indexOf("]"))
        memAddress = padZeroes(parseInt(memAddress).toString(2), 36)
        writeToMem(memAddress, mask, parseInt(info[i].substring(info[i].indexOf("=") + 2)))
    }
}

//Count sum of entries in mem
var sum = 0
for(var key of Object.keys(mem)) {
    sum += mem[key]
}
console.log(sum)

function writeToMem(memAddress, mask, toWrite) {
    //Count num of Xs in the mask
    var numXs = 0
    for(var i = 0; i < mask.length; i++) {
        if(mask.charAt(i) == "X") {
            numXs += 1
        }
    }

    //Generate array of binary numbers for the number of Xs. (If 2 Xs, generate binary numbers 0-3)
    //This gets all the possible combinations that we can put into the floating bits of the mask
    var combos = []
    for(var i = 0; i < 2 ** numXs; i++) {
        combos.push(padZeroes(i.toString(2), numXs))
    }

    //For each X permutation in the combos array, write the toWrite parameter to the memory address
    for(var combo of combos) {
        var comboPointer = 0

        //Replace Xs with the permutation we're on
        var memAddressToWrite = ""
        for(var i = 0; i < memAddress.length; i++) {
            if(mask.charAt(i) == "1") {
                memAddressToWrite += "1"
            } else if(mask.charAt(i) == "0") {
                memAddressToWrite += memAddress.charAt(i)
            } else { //we have a floating bit
                memAddressToWrite += combo.charAt(comboPointer)
                comboPointer += 1
            }
        }

        //Write toWrite to the address
        mem[parseInt(memAddressToWrite, 2)] = toWrite
    }
}

//Pad toPad (meant to be a binary string) with leadings zeros until it is totalLength characters
function padZeroes(toPad, totalLength) {
    var zeros = ""
    for(var i = 0; i < totalLength - toPad.length; i++) {
        zeros += "0"
    }
    return zeros + toPad
}