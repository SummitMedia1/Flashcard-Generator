
var fs = require('fs');
var inquirer = require('inquirer');

function ClozeCard(text, cloze) {
  this.text = text;
  this.cloze = cloze;
  this.closeDelete = this.text.replace(this.cloze, "...");
  this.create = function(){
    var data = {
        text: this.text,
        cloze: this.cloze,
        clozeDelete: this.clozeDelete,
        type: "cloze"
    };
  fs.appendFile("./log.txt", JSON.stringify(data) + ';', "utf8", function(err){
      if (err) {
        console.log(err);
      }
    });
  };
}
module.exports = ClozeCard;
