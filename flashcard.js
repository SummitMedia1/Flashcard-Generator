var fs = require("fs");
var inquirer = require("inquirer");
var BasicCard = require("./BasicCard.js");
var ClozeCard = require("./ClozeCard.js");
var log = require("./log.json");

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
      name:"Random Pick"
    },{
      name: "Show All"
    },{
      name: "Exit"
    }]
  }])
  .then(function(response){
    if(response.choose === "Create A New Flashcard"){
      createCard();
    } else if
      (response.choose === "Random Pick"){
        randomPick();
      } else if
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
      message: "Enter a factual question."
    }, {
      name: "back",
      message: "Please provide the answer to your question here.",
    }])
    .then(function(answer){
      var newBasicCard = new BasicCard(answer.front, answer.back);
      // newBasicCard.create();
      log.push(newBasicCard);
      fs.writeFile('./log.json',JSON.stringify(log,null,2),function(err){
        if (err){
          return console.log(err);
        }
      });
      next();
    });
  } else if (answer.cardType === "A Cloze Flashcard"){
    inquirer.prompt([{
      type: 'input',
      name: 'text',
      message: 'Please enter the full text statement.'
    },{
        type: 'input',
        name: "cloze",
        message: "Please provide the words in your sentence you would like omitted."
    }])
    .then(function(answer){
      var newCloze = new ClozeCard(answer.text, answer.cloze);
      console.log(newCloze);
      log.push(newCloze);
      fs.writeFile('./log.json',JSON.stringify(log,null,2),function(err){
        if (err){
          return console.log(err);
        }
      });
        next();
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
  for(var i = 0; i < log.length; i++){
        var count = 0;
        var questions = log[i];
    if (log[i].type === 'basic') {
        var qText = log[i].front;
        var cAnswer = log[i].back;
    } else if (log[i].type === 'cloze') {
        var qText = log[i].clozeDelete;
        var cAnswer = log[i].cloze;
    }
  }
    inquirer.prompt([{
        name: 'response',
        message: qText
    }])
    .then(function(answer) {
        if (answer.response === cAnswer) {
            console.log('Good Answer!');
            count++;
            showYourCards();
        } else {
            console.log('Bad! Very, very Bad!! Now try again!!!');
            count++;
            showYourCards();
        }
});
};
