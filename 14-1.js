const fs = require('fs')
const input = fs.readFileSync("./14-input.txt").toString().split("mask = ")
var mem = {}

//Build mem
for(var maskGroup of input) {
    var info = maskGroup.split('\n')
    var mask = info[0]

    for(var i = 1; i < info.length; i++) {
        var memAddress = info[i].substring(info[i].indexOf("[") + 1, info[i].indexOf("]"))
        var numToWrite = applyBitMask(mask, parseInt(info[i].substring(info[i].indexOf("=") + 2)))
        mem[memAddress] = numToWrite
    }
}

//Count sum of entries in memory
var sum = 0
for(var key of Object.keys(mem)) {
    if(key != "") {
        sum += mem[key]
    }
}
console.log(sum)

function applyBitMask(bitMask, decimalNum) {
    var decimalAsBin = decimalNum.toString(2)

    //Pad zeroes
    var zeroesToPad = ""
    for(var i = 0; i < (bitMask.length - decimalAsBin.length); i++) {
        zeroesToPad = "0" + zeroesToPad
    }
    decimalAsBin = zeroesToPad + decimalAsBin

    //Apply bit mask
    for(var i = 0; i < bitMask.length; i++) {
        if(bitMask.charAt(i) === "1" || bitMask.charAt(i) === "0") {
            decimalAsBin = decimalAsBin.substring(0, i) + bitMask.charAt(i) + decimalAsBin.substring(i+1)
        }
    }

    //Return as the decimal number to write after bitmasking
    return parseInt(decimalAsBin, 2)
}