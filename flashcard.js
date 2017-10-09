var fs = require("fs");
var inquirer = require("inquirer");
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
// var log = require("./log.txt");

function LetsBegin(){
  console.log("***************************************************************");
  console.log("----------------------FLASH CARD MANIA ------------------------");
  console.log("***************************************************************");
}

LetsBegin();

inquirer
.prompt
([{
    name: "choose",
    type: "list",
    message: ("Choose the flashcard option you would like to execute:"),
    choices: [{

      name: "Create A New Flashcard"
    },{

    //   name: "Use All"
    // },{

    //   name:"Random Pick"
    // },{

    //   name:"Shuffle The Deck"
    // },{

      name: "Show All"
    },{

      name: "Exit"
    }]

  }])
  .then(function(response){
    if(response.choose === "Create A New Flashcard"){
      createCard();
    } else if
    // (response.choose === "Use All"){
    //   useAll();
    // } else if
    //   (response.choose === "Random Pick"){
    //     randomPick();
    //   } else if
    //     (response.choose === "Shuffle The Deck"){
    //       shuffleDeck();
    //     } else if
          (response.choose === "Show All"){
            showYourCards();
          } else if
            (response.choose === "Exit"){
              process.exit();
            }
          });

var createCard = function(){
inquirer.prompt([{
  name: 'cardType',
  message: 'What type of flashcard would you like to create?',
  type: "list",
  choices: [{
    name: 'A Basic Flashcard'
  },{
    name: 'A Cloze Flashcard'
  }]
}])
.then(function(answer){
  if(answer.cardType === 'A Basic Flashcard') {
    inquirer.prompt([{
      name: "front",
      message: "Enter a factual question.",
      validate: function(input) {
        if(input === ''){
          console.log("Please type your question now.");
          return false;
        } else {
          return true;
        }
      }
    }, {
      name: "back",
      message: "Please provide the answer to your question here.",
      validate: function(input){
        if(input === ''){
          console.log('Please provide the answer to your question here');
          return false;
        } else {
          return true;
        }
      }
    }])
    .then(function(answer){
      var newBasicCard = new BasicCard(answer.front, answer.back);
      newBasicCard.create();
      next();
    });
  } else if (answer.cardType === "A Cloze Flashcard"){
    inquirer.prompt([{
      name: 'text',
      message: 'Please provide the full text of your question',
      validate: function(input){
        if(input === ""){
          console.log("You must provide a question written in its entirety.");
          return false;
        } else {
          return true;
        }
      }
    },{
        name: "cloze",
        message: "Please provide the cloze words to be removed from your question.",
        validate: function(input){
          if(input === ''){
            console.log("You must provide the cloze words from your question before advancing.");
            return false;
          } else {
            return true;
          }
        }
    }])
    .then(function(answer){
      var text = answer.text;
      var cloze = answer.cloze;
      if(text.includes(cloze)){
        var newClozeCard = new ClozeCard(text, cloze);
        newClozeCard.create();
        next();
      } else {
        console.log('The cloze portion that you provided does not exist. Please try typing your cloze again.');
        createCard();
      }
    });
  }
});
};

var next = function(){
  inquirer.prompt([{
    name: 'next',
    message: 'What would you like to do next?',
    type: 'list',
    choices: [{
      name: 'Create A New Card'
    },{
      name: 'Show All Cards'
    }, {
      name: 'Exit'
    }]
  }])
  .then(function(answer){
    if(answer.next === 'Create A New Card'){
      createCard();
    } else {
      if(answer.next === 'Show All Cards'){
        showYourCards();
      } else
      if(answer.next === "Exit"){
        return;
      }
    }
  });
};

var showYourCards = function(){
    fs.readFile('./log.txt', 'utf8', function(err, data) {
        if (err){
            console.log(err);
        }
        var questions = data.split(';');
        var count = 0;
        showQuestion(questions, count);
    });
};

var showQuestion = function(array, index) {
    var question = array[index];
    var parsedQuestion = JSON.parse(question);
    var questionText;
    var correctAnswer;
    if (parsedQuestion.type === 'basic') {
        questionText = parsedQuestion.front;
        correctAnswer = parsedQuestion.back;
    } else if (parsedQuestion.type === 'cloze') {
        questionText = parsedQuestion.clozeDelete;
        correctAnswer = parsedQuestion.cloze;
    }
    inquirer.prompt([{
        name: 'response',
        message: questionText
    }])
    .then(function(answer) {
        if (answer.response === correctAnswer) {
            console.log('Good Answer!');
            if (index < array.length - 1) {
              showQuestion(array, index + 1);
            }
        } else {
            console.log('Bad! Very, very Bad!! Now try again!!!');
            if (index < array.length - 1) {
              showQuestion(array, index + 1);
            }
        }
    });
};

var randomPick = function(){
  randomSelection = [Math.floor(Math.random * showQuestion.length)];
};
randomPick();
