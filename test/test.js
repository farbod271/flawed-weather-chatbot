
var intents = require('./test.json')
const readline = require('readline');
var nachricht = '';
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Please enter the message: ', (nachricht) => {
  nachricht = nachricht.toLowerCase()

  for (var j = 0 ;j<intents.answers.length ;j++) {
   if (nachricht.includes(intents.answers[j].intent)) {
        console.log(intents.answers[j].answer)
      }
  }
    rl.close();
});

//console.log(intents.answers[1].intent + ' ' + intents.answers[1].answer)

// var nachricht = prompt("Please enter the message");


