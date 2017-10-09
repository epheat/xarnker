// CS316 Program 2: Xarnker
// Authors: Evan Heaton & Robert Cala
// created on 10/8/17

var deck = new Deck();

var discardPile = new DiscardPile(deck.draw());

var playerHand = new Hand(deck.draw(), deck.draw(), deck.draw());
var computerHand = new Hand(deck.draw(), deck.draw(), deck.draw());

updateHands();
updateDiscard();

// just for testing purposes
function drawDiscard() {
  discardPile.draw();
  updateDiscard();
}
