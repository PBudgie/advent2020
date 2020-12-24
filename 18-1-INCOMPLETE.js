//46173932 too low

const fs = require('fs')
const util = require('util')
const rawInput = fs.readFileSync('./18-input.txt').toString().split('\n')

//A binary tree Node
class Node {
    constructor() {
        this.token = null
        this.left = null
        this.right = null
        this.parent = null
    }

    createLeftNode() {
        var newNode = new Node()
        newNode.parent = this
        this.left = newNode
    }

    createRightNode() {
        var newNode = new Node()
        newNode.parent = this
        this.right = newNode
    }

    createParentNode() {
        var newNode = new Node()
        newNode.left = this
        this.parent = newNode
    }
}

//Main logic
parseToTree("8 * (6 * 8 + 3)")
/*var sum = 0
for(var exp of rawInput) {
    var expAns = evaluateTree(parseToTree(exp))
    console.log(exp + " = " + expAns)
    sum += expAns
}
console.log(sum)*/

//Build the parse tree
function parseToTree(expression) {
    //Initialize tree with a node and its left child. Point to the left child
    var firstNode = new Node()
    firstNode.createLeftNode()
    var nodePointer = firstNode.left

    //Parse the expression
    for(var ind = 0; ind < expression.length; ind++) {
        if(/[1-9]{1}/.test(expression.charAt(ind))) {
            nodePointer.token = expression.charAt(ind)
            if(nodePointer.parent.token == null) { //We just filled in a left node, point to the parent node since it's next
                nodePointer = nodePointer.parent
            } //Otherwise, we continue pointing to the right node because it could be the last number encountered
        } else if(["+", "*"].includes(expression.charAt(ind))) {
            if(nodePointer.token == null) { //We are pointing to the unfilled parent node
                nodePointer.token = expression.charAt(ind)
                nodePointer.createRightNode()
                nodePointer = nodePointer.right
            } else { //We are pointing to a filled right node
                nodePointer.parent.createParentNode()
                nodePointer.parent.parent.token = expression.charAt(ind)
                nodePointer.parent.parent.createRightNode()
                nodePointer = nodePointer.parent.parent.right
            }
        } else if(expression.charAt(ind) == "(") {
            nodePointer.createLeftNode()
            nodePointer = nodePointer.left
        } else if(expression.charAt(ind) == ")") {
            //Crawl up the tree until we find an unoccupied right node
            while(nodePointer.parent != null && nodePointer.parent.right != null) {
                nodePointer = nodePointer.parent
            }
            //We found the root of the tree and its right node is occupied. Make a new parent node.
            if(nodePointer.right.token != null) {
                nodePointer.createParentNode()
                nodePointer = nodePointer.parent
            }
        }
    }

    console.log(nodePointer)

    //Traverse down the tree to the first non-null node
    while(nodePointer.token == null) {
        console.log("null")
        nodePointer = nodePointer.left
    }
    //Traverse to the root node of the tree and return it
    while(nodePointer.parent != null && nodePointer.parent.token != null) {
        nodePointer = nodePointer.parent
    }
    return nodePointer
}

function evaluateTree(node) {
    if(node.token != "*" && node.token != "+") {
        console.log("Returning " + parseInt(node.token))
        return parseInt(node.token)
    } else if(node.token == "*") {
        return evaluateTree(node.left) * evaluateTree(node.right)
    } else if(node.token == "+") {
        return evaluateTree(node.left) + evaluateTree(node.right)
    }
}