// CS316 Program 2: Xarnker
// Authors: Evan Heaton & Robert Cala
// created on 10/8/17

var deck = new Deck();
deck.shuffle();

var playerHand = new Hand(deck);
var computerHand = new Hand(deck);

updateHands();
