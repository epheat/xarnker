// CS316 Program 2: Xarnker
// Authors: Evan Heaton & Robert Cala
// created on 10/8/17

// global variables
var deck, discardPile, playerHand, computerHand;
var xarnkerTableElement = document.getElementById("xarnkerTable");
var deckDiscardTipElement = document.getElementById("deckDiscardTip");
var playerHandTipElement = document.getElementById("playerHandTip");
var roundElement = document.getElementById("round");
var handElement = document.getElementById("hand");
var playerWinElement = document.getElementById("playerWin");
var computerWinElement = document.getElementById("computerWin");
var playerScoreElement = document.getElementById("playerScore");
var computerScoreElement = document.getElementById("computerScore");

var playerNameElement = document.getElementById("playerName");

// this is kind of ugly... better way to do this?
var playerHandImgElements = [document.getElementById("playerCard0"), document.getElementById("playerCard1"), document.getElementById("playerCard2"), document.getElementById("playerCard3")];
var computerHandImgElements = [document.getElementById("computerCard0"), document.getElementById("computerCard1"), document.getElementById("computerCard2"), document.getElementById("computerCard3")];

var playerHandIndicatorElements = document.getElementsByClassName("playerHandIndicator");
var computerHandIndicatorElements = document.getElementsByClassName("computerHandIndicator");

var playerHandScore = 0;
var computerHandScore = 0;

var playerHandsWon = 0;
var computerHandsWon = 0;
var numRounds = 3;
var round = 1;
var numHands = 5;
var hand = 0;

var playerName = "name";

function beginSet() {

  playerName = document.getElementById("nameInput").value;

  renderPlayerName();

  renderRound();
  renderHand();

  hand = 0;
  playerHandsWon = 0;
  computerHandsWon = 0;
  dealNewHand();

}

function dealNewHand() {

  disableClickAnywhereToContinue();

  hand++;
  round = 1;
  renderRound();
  renderHand();

  deck = new Deck(document.getElementById("deck"));
  deck.shuffle();

  playerHand = new Hand([deck.draw(), deck.draw(), deck.draw()], playerHandImgElements, false);
  computerHand = new Hand([deck.draw(), deck.draw(), deck.draw()], computerHandImgElements, true);

  discardPile = new DiscardPile(deck.draw(), document.getElementById("discard"));

  playerHand.render();
  computerHand.render();
  discardPile.render();
  deck.render();

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
      setTimeout(function() {
        computerHand.hideCards = false;
        computerHand.render();
        var playerWon = evaluateHands();
        renderPlayerHandScore();
        renderComputerHandScore();
        if (playerWon == true) {
          playerHandsWon++;
          renderPlayerHandIndicators();
          playerWinElement.classList.add("shown");
          playerScoreElement.classList.add("shown");
          computerScoreElement.classList.add("shown");
        } else {
          computerHandsWon++;
          renderComputerHandIndicators();
          computerWinElement.classList.add("shown");
          playerScoreElement.classList.add("shown");
          computerScoreElement.classList.add("shown");
        }
        if (hand == numHands) {
          endSet();
        } else {
          enableClickAnywhereToContinue();
        }
      }, 500)
    } else {
      round++;
      enablePlayerDraw();
      // render the rounds counter
      renderRound();
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
  return true;
}

// TODO: last hand completed!
function endSet() {
  console.log("That's all folks");
}
