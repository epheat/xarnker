// CS316 Program 2: Xarnker
// Authors: Evan Heaton & Robert Cala
// created on 10/8/17

// global variables
var deck, discardPile, playerHand, computerHand;

var playerGamesWon = 0;
var computerGamesWon = 0;

function dealNewGame() {
  deck = new Deck(document.getElementById("deck"));
  deck.shuffle();

  // this is kind of ugly... better way to do this?
  var playerHandImgElements = [document.getElementById("playerCard0"), document.getElementById("playerCard1"), document.getElementById("playerCard2"), document.getElementById("playerCard3")];
  var computerHandImgElements = [document.getElementById("computerCard0"), document.getElementById("computerCard1"), document.getElementById("computerCard2"), document.getElementById("computerCard3")];

  playerHand = new Hand([deck.draw(), deck.draw(), deck.draw()], playerHandImgElements);
  computerHand = new Hand([deck.draw(), deck.draw(), deck.draw()], computerHandImgElements);

  discardPile = new DiscardPile(deck.draw(), document.getElementById("discard"));

  playerHand.render();
  computerHand.render();
  discardPile.render();

  // delet this
  allowDraw();
}
