var fs = require('fs');
var inquirer = require('inquirer');
var log = require('./log.json');

function ClozeCard(text, cloze) {
  this.type = 'cloze';
  this.text = text;
  this.cloze = cloze;
  this.clozeDelete = text.replace(cloze, "...");
}
module.exports = ClozeCard;
