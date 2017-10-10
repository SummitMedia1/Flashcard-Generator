
var fs = require('fs');
var inquirer = require('inquirer');

//This is a basic constructor function that accepts front and back arguments for BasicCard

var BasicCard = function(front, back){
  this.front = front;
  this.back = back;
  this.create = function(){
    var data = {
        type: "basic",
        front: this.front,
        back: this.back,
      };
    fs.appendFile("./log.JSON", JSON.stringify(data, null, 2) + ';' + '\r\n', function(err){
      if (err) {
        console.log(err);
      }
    });
  };
};
module.exports = BasicCard;
