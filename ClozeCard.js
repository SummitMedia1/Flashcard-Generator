
var fs = require('fs');
var inquirer = require('inquirer');
var clozeArray = [];

function ClozeCard(text, cloze) {
  this.text = text;
  this.cloze = cloze;
  this.clozeDelete = this.text.replace(this.cloze, "...");
  this.create = function(){
    var data = {
        type: "cloze",
        text: this.text,
        cloze: this.cloze,
        clozeDelete: this.clozeDelete
    };
  fs.appendFile("./log.JSON", JSON.stringify(data, null, 2) + ';' + '\r\n', function(err){
      if (err) {
        console.log(err);
      }
    });
  };
}
module.exports = ClozeCard;
