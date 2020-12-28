const fs = require('fs')
const rawInput = fs.readFileSync('./18-input.txt').toString().split('\n')
const operatorPrecedence = ['*','+'] //low to high

//A binary tree Node
class Node {
    constructor(token) {
        this.token = token
        this.left = null
        this.right = null
        this.parent = null
    }

    setLeft(node) {
        node.parent = this
        this.left = node
    }

    setRight(node) {
        node.parent = this
        this.right = node
    }
}

//Main logic
var sum = 0
for(var exp of rawInput) {
    var expAns = evaluateTree(parseToTree(exp))
    //console.log(exp + " = " + expAns)
    sum += expAns
}
console.log(sum)

//Build the parse tree
function parseToTree(expression) {
    var operatorStack = []
    var nodeQueue = []

    for(var i = 0; i < expression.length; i++) {
        if(['+','*'].includes(expression.charAt(i))) {
            while(operatorStack.length > 0 && hasHigherPrecedenceThan(operatorStack[operatorStack.length-1], expression.charAt(i))) {
                var operatorNode = new Node(operatorStack.pop())
                var rightNode = nodeQueue.pop()
                var leftNode = nodeQueue.pop()
                operatorNode.setLeft(leftNode)
                operatorNode.setRight(rightNode)
                nodeQueue.push(operatorNode)
            }
            operatorStack.push(expression.charAt(i))
        } else if(/[1-9]{1}/.test(expression.charAt(i))) {
            var newNode = new Node(expression.charAt(i))
            nodeQueue.push(newNode)
        } else if(expression.charAt(i) == "(") {
            operatorStack.push("(")
        } else if(expression.charAt(i) == ")") {
            while(operatorStack[operatorStack.length-1] != "(") {
                var operatorNode = new Node(operatorStack.pop())
                var rightNode = nodeQueue.pop()
                var leftNode = nodeQueue.pop()
                operatorNode.setLeft(leftNode)
                operatorNode.setRight(rightNode)
                nodeQueue.push(operatorNode)
            }
            operatorStack.pop() //Pops the left parens off the stack
        }
    }

    while(operatorStack.length > 0) {
        var operatorNode = new Node(operatorStack.pop())
        var rightNode = nodeQueue.pop()
        var leftNode = nodeQueue.pop()
        operatorNode.setLeft(leftNode)
        operatorNode.setRight(rightNode)
        nodeQueue.push(operatorNode)
    }

    return nodeQueue.pop() //Returns the last node on the queue which is the root of the tree
}

function evaluateTree(node) {
    if(node.token != "*" && node.token != "+") {
        return parseInt(node.token)
    } else if(node.token == "*") {
        return evaluateTree(node.left) * evaluateTree(node.right)
    } else if(node.token == "+") {
        return evaluateTree(node.left) + evaluateTree(node.right)
    }
}

function hasHigherPrecedenceThan(op1, op2) {
    return operatorPrecedence.indexOf(op1) > operatorPrecedence.indexOf(op2)
}