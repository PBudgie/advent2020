const fs = require('fs')

//We can do this in O(n^2) by brute forcing all the pairs.
//Or O(nlogn) by importing numbers into an array and sorting them for O(logn) lookup.

//The most efficient way I found is O(n) by importing the numbers into a hashset for O(1) lookup.
//This works because given any number x, we just need to check whether (2020 - x) exists.

var arrayOfLines = fs.readFileSync("./1-input.txt").toString().trim().split("\n")
var hashset = new Set();

for(var line of arrayOfLines) {
    hashset.add(parseInt(line))
}

console.log(hashset)

hashset.forEach((entry) => {
    if(hashset.has(2020 - entry)) {
        console.log(entry * (2020 - entry))
    }
})
