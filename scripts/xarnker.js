// CS316 Program 2: Xarnker
// Authors: Evan Heaton & Robert Cala
// created on 10/8/17

var deck = new Deck();
deck.shuffle();

var discardPile = new DiscardPile(deck.draw(), document.getElementById("discard"));

// this is kind of ugly... better way to do this?
var playerHandImgElements = [document.getElementById("playerCard0"), document.getElementById("playerCard1"), document.getElementById("playerCard2"), document.getElementById("playerCard3")];
var computerHandImgElements = [document.getElementById("computerCard0"), document.getElementById("computerCard1"), document.getElementById("computerCard2"), document.getElementById("computerCard3")];

var playerHand = new Hand([deck.draw(), deck.draw(), deck.draw()], playerHandImgElements);
var computerHand = new Hand([deck.draw(), deck.draw(), deck.draw()], computerHandImgElements);

playerHand.render();
computerHand.render();
discardPile.render();

// game loop would go about here

// just for testing purposes
function drawDiscard() {
  playerHand.addCard(discardPile.draw());
  discardPile.render();
}
function drawDeck() {
  playerHand.addCard(deck.draw());
  discardPile.render();
}
function playerDiscard(index) {
  discardPile.place(playerHand.discard(index));
}
