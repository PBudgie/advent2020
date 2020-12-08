// We can represent the rules as a directed graph.
// The nodes are the colors of the bag, and the edges are the number.
// (Part 1 doesn't use the numbers but part 2 likely will!)

const fs = require('fs')

// Usually, directed graphs only include the children nodes. I add a parent for faster traversal in this problem.
// Update: By the time I reached the end of the problem, I realized I could have just had the children point to the parent without the extra back-pointing parent edge.
//      Luckily, I am able to reuse this code and just delete the parent edge for part 2!
class Node {
    constructor(color) {
        this.color = color
        this.parent = [] // array of Nodes
        this.children = [] // array of [num, Node] elements
    }

    getColor() {
        return this.color
    }

    getParents() {
        return this.parent
    }

    addChild(number, childNode) {
        this.children.push([number, childNode])
    }

    addParent(parentNode) {
        if(this.parent.filter(node => node == parentNode).length == 0) {
            this.parent.push(parentNode)
        }
    }
}

const rules = fs.readFileSync('./7-input.txt').toString().split('\n')
var graph = [] //an array of all Nodes for our graph
var parentAndChildrenRegex = /([a-z| ]+) bags contain (([1-9a-z]| |,|\.)+)$/

for(var rule of rules) {
    // Parse string for parent/children information
    var regexMatch = rule.match(parentAndChildrenRegex)
    var color = regexMatch[1]
    var children = regexMatch[2].split(/ bag, | bags, | bag.$| bags.$/).filter((el) => el.length > 0)

    // Add the first parent node to the graph if it doesn't exist
    var parentNode = graph.filter((node) => node.color == color)
    if (parentNode.length == 0) {
        parentNode = new Node(color)
        graph.push(parentNode)
    } else {
        parentNode = parentNode[0]
    }

    // Move on to the children nodes
    for(var child of children) {
        var numOfChild = parseInt(child.charAt(0))
        var childColor = child.substring(2)

        // Add child node to the graph if it doesn't exist
        var childNode = graph.filter((node) => node.color == childColor)
        if(childNode.length == 0) {
            childNode = new Node(childColor)
            graph.push(childNode)
        } else {
            childNode = childNode[0]
        }

        // Update the parent node's children
        parentNode.addChild(numOfChild, childNode)

        // Update the child node's parent
        childNode.addParent(parentNode)
    }

}

// Assemble all the possible parents for the shiny gold bag.
var shinyGoldNode = graph.filter(node => node.color == "shiny gold")[0]
var toTraverse = shinyGoldNode.getParents()
var parentsForShinyGold = shinyGoldNode.getParents()

while (toTraverse.length > 0) {
    var thisNode = toTraverse[0]
    toTraverse.push(...thisNode.getParents())
    if(parentsForShinyGold.find((n) => n.color === thisNode.color) == undefined) {
        parentsForShinyGold.push(thisNode)
    }
    toTraverse = toTraverse.filter((n) => {
        return n.color !== thisNode.color || parentsForShinyGold.find(n2 => n2.color === thisNode.color).length == 0
    })
    //console.log(toTraverse.length)
}

console.log(parentsForShinyGold.length)