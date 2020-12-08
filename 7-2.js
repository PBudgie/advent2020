// We can represent the rules as a directed graph.
// The nodes are the colors of the bag, and the edges are the number.

const fs = require('fs')

class Node {
    constructor(color) {
        this.color = color
        this.children = [] // array of [num, Node] elements
    }

    getColor() {
        return this.color
    }

    getChildren() {
        return this.children
    }

    addChild(number, childNode) {
        this.children.push([number, childNode])
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
        if(child !== "no other") {
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
        }
    }
}

// Find how many bags must be inside a shiny gold bag
var shinyGoldNode = graph.filter(node => node.color == "shiny gold")[0]
console.log(numBagsIn(shinyGoldNode))

function numBagsIn(node) {
    if (node.getChildren().length == 0) {
        return 0
    } else {
        var total = 0
        for(var child of node.getChildren()) {
            total += child[0] + child[0] * numBagsIn(child[1])
        }
        return total
    }
}