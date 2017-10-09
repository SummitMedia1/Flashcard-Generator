var fs = require("fs");
var inquirer = require("inquirer");
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var log = require("./log.txt");

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

    message: ("Choose the flashcard option you would like to learn from:"),

    choices: [{
      name: "create-flashcard"

    },{

      name: "show-all"

    }]

  }])
  .then(function(data){
    if(data.choose === "create-flashcard"){
      createCard();
    } else if
    (data.choose === "show-all"){
      showAllCards();
    } else {
      process.exit();
    }

});

var createCard = function(){
inquirer.prompt([{
  name: 'cardType',
  message: 'What type of flashcard would you like to create?',
  type: "list",
  choices: [{
    name: 'basic-flashcard'
  },{
    name: 'cloze-flashcard'
  }]

}])
.then(function(answer){
  if(answer.cardType === 'basic-flashcard') {
    inquirer.prompt([{
      name: "front",
      message: "What is the question you would like to enter?",
      validate: function(input) {
        if(input === ''){
          console.log("Please type a question here.");
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
      upNext();
    });
  } else if (answer.cardType === "cloze-flashcard"){
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
        ClozeCard();
        upNext();
      } else {
        console.log('The cloze portion that you provided does not exist. Please try typing your cloze again.');
      }
    });
  }
});
};

var upNext = function(){
  inquirer.prompt([{
    name: 'next',
    message: 'What would you like to do next?',
    type: 'list',
    choices: [{
      name: 'create-a-new-card'
    },{
      name: 'show-all-of-the-cards'
    }, {
      name: 'exit'
    }]
  }])
  .then(function(answer){
    if(answer.next === 'create-a-new-card'){
      createCard();
    } else {
      if(answer.next === 'show-all-of-the-cards'){
        showYourCards();
      } else
      if(answer.next === "exit"){
        return;
      }
    }
  });

  var showYourCards = function(){
    fs.readFileSync(log, 'utf8', function(err,data){
      if (err) {
        console.log(err);
      }
      var allQuestions = data.split(';');
      var validatedQuestions = function(value){
        return value;
      };
      allQuestions = allQuestions.filter(validatedQuestions);
      var count = 0;
      showAllQuestions(allQuestions, count);
    });
  };
  var showAllQuestions = function(array, index) {
      question = array[index];
      var parsedQuestion = JSON.parse(question);
      var questionText;
      var correctReponse;
      if (parsedQuestion.type === 'basic') {
          questionText = parsedQuestion.front;
          correctReponse = parsedQuestion.back;
      } else if (parsedQuestion.type === 'cloze') {
          questionText = parsedQuestion.clozeDelete;
          correctReponse = parsedQuestion.cloze;
      }
      inquirer.prompt([{
          name: 'response',
          message: questionText
      }]).then(function(answer) {
          if (answer.response === correctReponse) {
              console.log('Correct!');
              if (index < array.length - 1) {
                showAllQuestions(array, index + 1);
              }
          } else {
              console.log('Wrong!');
              if (index < array.length - 1) {
                showAllQuestions(array, index + 1);
              }
          }
      });
  };
};