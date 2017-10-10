var fs = require('fs');
var inquirer = require('inquirer');
var log = require('./log.json');

//This is a basic constructor function that accepts front and back arguments for BasicCard

var BasicCard = function(front, back){
  this.type = 'basic';
  this.front = front;
  this.back = back;
};
module.exports = BasicCard;
