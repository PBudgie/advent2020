const fs = require('fs')

//Similar to part 1, I will use a hashset for quick lookup.
var arrayOfLines = fs.readFileSync("./1-input.txt").toString().trim().split("\n")
var hashset = new Set();

for(var line of arrayOfLines) {
    hashset.add(parseInt(line))
}

/**
 * Prints the 2 numbers in hashset that add to sum
 * @param {*} sum The 2 numbers returned must sum to this value.
 * @param {*} hashset The hashset of numbers
 */
function printNumsThatAddTo(sum, hashset, entry1) {
    hashset.forEach((entry) => {
        if(hashset.has(sum - entry)) {
            console.log(""+ entry1 + " " + entry + " " + (sum - entry))
            console.log(entry1 * entry * (sum - entry))
        }
    })
}

//Loop through hashset. Use function below to find whether there are two other entries where all three numbers add to 2020.
hashset.forEach((entry) => {
    printNumsThatAddTo(2020 - entry, hashset, entry)
})
