var answers = [2,0,1,9,5,19]

for(var i = answers.length; i < 2020; i++) {
    for(var lookBackwards = i - 2; lookBackwards >= 0 && answers.length == i; lookBackwards--) {
        if(answers[lookBackwards] == answers[i-1]) {
            answers.push((i-1) - lookBackwards)
        }
    }

    if(answers.length == i) {
        answers.push(0)
    }
}

console.log(answers[answers.length - 1])