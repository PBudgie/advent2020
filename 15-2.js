var starting = [2,0,1,9,5,19]
var lastNumberSaid = starting[starting.length - 1]

//hashmap to keep track of the index of the last occurrence
var lastIndexMap = {}
for(var i = 0; i < starting.length-1; i++) {
    lastIndexMap[starting[i]] = i
}

for(var i = starting.length; i < 30000000; i++) {
    if(lastNumberSaid in lastIndexMap) {
        newNumber = (i-1) - lastIndexMap[lastNumberSaid]
    } else {
        newNumber = 0
    }
    lastIndexMap[lastNumberSaid] = i-1
    lastNumberSaid = newNumber
}

console.log(lastNumberSaid)