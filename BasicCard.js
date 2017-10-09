var fs = require('fs');
var inquirer = require('inquirer');
// var log = require("./log.txt");

//This is a basic constructor function that accepts front and back arguments for BasicCard

var BasicCard = function(front, back){
  this.front = front;
  this.back = back;
  this.create = function(){
    var data = {
        front: this.front,
        back: this.back,
        type: "basic"
      };

    fs.appendFile("./log.txt", JSON.stringify(data) + ';', "utf8", function(err){
      if (err) {
        console.log(err);
      }
    });
  };
};
module.exports = BasicCard;
