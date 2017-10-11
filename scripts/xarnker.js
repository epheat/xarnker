// CS316 Program 2: Xarnker
// Authors: Evan Heaton & Robert Cala
// created on 10/8/17

// global variables
var deck, discardPile, playerHand, computerHand;
var deckDiscardTipElement = document.getElementById("deckDiscardTip");
var playerHandTipElement = document.getElementById("playerHandTip");
var roundElement = document.getElementById("round");
var handElement = document.getElementById("hand");

// this is kind of ugly... better way to do this?
var playerHandImgElements = [document.getElementById("playerCard0"), document.getElementById("playerCard1"), document.getElementById("playerCard2"), document.getElementById("playerCard3")];
var computerHandImgElements = [document.getElementById("computerCard0"), document.getElementById("computerCard1"), document.getElementById("computerCard2"), document.getElementById("computerCard3")];

var game = new xarnkerGame();

var playerHandsWon = 0;
var computerHandsWon = 0;
var numRounds = 3;
var round = 1;
var numHands = 5;
var hand = 1;

function beginSet() {

  game.renderRound();
  game.renderHand();

  hand = 0;
  playerHandsWon = 0;
  computerHandsWon = 0;
  dealNewHand();

  console.log("round: " + round);
}

function dealNewHand() {

  hand++;
  round = 1;

  deck = new Deck(document.getElementById("deck"));
  deck.shuffle();

  playerHand = new Hand([deck.draw(), deck.draw(), deck.draw()], playerHandImgElements, false);
  computerHand = new Hand([deck.draw(), deck.draw(), deck.draw()], computerHandImgElements, true);

  discardPile = new DiscardPile(deck.draw(), document.getElementById("discard"));

  playerHand.render();
  computerHand.render();
  discardPile.render();

  enablePlayerDraw();
}

function playerDiscard(index) {

  // discard the card at playerHand[index]
  discardPile.place(playerHand.discard(index));
  disablePlayerDiscard();

  // computer takes its turn
  computerTurn();

  // computer turn takes 1 second to complete
  setTimeout(function() {
    // if that was the final round, evaluate and compare hands.
    // otherwise, allow the user to discard again
    if (round == numRounds) {
      evaluateHands();
      setTimeout(function() {
        computerHand.hideCards = false;
        computerHand.render();
      }, 500)
    } else {
      round++;
      enablePlayerDraw();
      // render the rounds counter
      game.renderRound();
    }
  }, 1000);
}

// for now, always draws from the deck and discards index 0
function computerTurn() {
  // after 0.5s, decide to draw from the deck or discard
  setTimeout(function() {
    computerHand.addCard(deck.draw());
    // after another 0.5s, decide which card to discard
    setTimeout(function() {
      discardPile.place(computerHand.discard(randomInt(4)));
    }, 500);
  }, 500);
}

// TODO: evaluate and compare hands
function evaluateHands() {
  console.log("Evaluating hands... (not really)");
}
