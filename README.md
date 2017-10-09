# Flashcard-Generator
Advanced JavaScript Assignment: Cloze Constructors
Overview

In this week's assignment, you will create the backend for a basic flashcard application.

The backend will essentially constitute an API that allows users to create two types of flashcards. Basic flashcards, which have a front ("Who was the first president of the United States?"), and a back ("George Washington").

Cloze-Deleted flashcards, which present partial text ("... was the first president of the United States."), and the full text when the user requests it ("George Washington was the first president of the United States.")

Cloze Deletions

A cloze deletion is simply a sentence that has had some of its text removed. For example, given the sentence:

"George Washington was the first president of the United States."

...We can create a "cloze deletion" by removing the words "George Washington":

"... was the first president of the United States."

This is useful for building flash card applications that forces users to remember the important part of a sentence, and is a common device in educational applications.

A flash card built this way has three parts:

The full text. This is the entire sentence users need to remember:  "George Washington was the first president of the United States."
The cloze deletion. This is the text we've chosen to remove: "George Washington".
The partial text. This is what we get if we remove the cloze deletion from the full text: "... was the first president of the United States.


Instructions

open your command line program (Bash, Terminal, etc...) and navigate to the folder you cloned or forked onto your system.

Type node flashcard.js to run the application

It will start with a basic menu of options

Create will allow the user to create a basic (front & back) or Cloze (text & cloze) flashcard and add it to the deck.

Use All will run the user through all the flashcards in their current order, giving questions and asking for the answers, giving correct or incorrect responses.

Random will randomly pick one card from the existing deck to use.

Shuffle will randomly mix up the order of all cards in the deck.

Show All will print all cards currently in the deck, in their current order, to the screen for the user to review.

Exit will take the user out of the application and back to their command prompt.
