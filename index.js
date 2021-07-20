const rs = require('readline-sync');
const chalk = require('chalk');

const log = console.log

var score = 0;

var highScores = [
  {
    name: "Varun",
    score: 3
  },
  {
    name: "Jatin",
    score: 2
  }
]

var questions = [
  {
    question: "Where do I live?",
    options: ["Mysore", "Bangalore"],
    answer: "Mysore"
  },
  {
    question: "What is my favourite sport?",
    options: ["Table Tennis", "Cycling", "Swimming"],
    answer: "Swimming"
  },
  {
    question: "What is my favourite color?",
    options: ["Orange", "Blue", "Green"],
    answer: "Blue"
  }
]

const questionColor = chalk.blue.inverse;
const correctColor = chalk.green.bold;
const incorrectColor = chalk.red.bold;
const scoreColor = chalk.magenta;

function welcome() {
  log(chalk.white.inverse.bold("Hello! Welcome to my Game!"));
  log(chalk.white.inverse.bold("__________________________"));

  var player = rs.question("What is your name?\n");
  log(chalk.cyan(`Hi ${player}! Welcome to Do You Really know Adith?\n`));

  return player;
}

function play(question, options, answer) {
  var response = rs.keyInSelect(options, questionColor(question));

  if (options[response].toLowerCase() === answer.toLowerCase()) {
    log(correctColor("Correct"));
    score += 1;
  } else {
    log(incorrectColor("Wrong! :("));
  }

  log(scoreColor(`Current Score: ${score}`));
  log(scoreColor("__________________________\n"));
}

function game() {
  for (let currentQuestion of questions) {
    const { question, options, answer } = currentQuestion;
    play(question, options, answer);
  }
}

function showScores(currentPlayer) {
  log(scoreColor(`You scored: ${score}`));
  for (let i=0; i<highScores.length; i++) {
    if(score >= highScores[i].score) {
      log(scoreColor.inverse(`Whoa! You're number ${i+1} on the leaderboard!`));
      log(chalk.cyan("Ping me with a screenshot and I'll update the leaderboard!"))
      return;
    }
  }

  log(scoreColor.inverse("Check Out the leaderboard!"));
  highScores.map((item) => log(scoreColor(`${item.name} : ${item.score}`)));
}

const currentPlayer = welcome();
game();
showScores(currentPlayer);