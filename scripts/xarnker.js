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
  
  hand = 0;
  playerHandsWon = 0;
  computerHandsWon = 0;

  playerName = document.getElementById("nameInput").value;

  renderPlayerName();

  renderRound();
  renderHand();

  renderPlayerHandIndicators();
  renderComputerHandIndicators();


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
    computerDraw();
    // after another 0.5s, decide which card to discard
    setTimeout(function() {
      computerDiscard();
    }, 500);
  }, 500);
}

// TODO: evaluate and compare hands
function evaluateHands() {
  console.log("Evaluating hands...");

  playerHandScore = playerHand.eval();
  computerHandScore = computerHand.eval();

  return (playerHandScore >= computerHandScore);
}

// TODO: decide whether to draw from the deck or discard
function computerDraw() {
  var cardCopy = shallowCopy(computerHand.cards);
  prune(cardCopy);
  cardCopy.sort(function(a,b){
    return a.value - b.value;
  });
  // if all 3 cards are the same suit, attempt to get a better card of the same suit
  if (cardCopy[0].suit == cardCopy[1].suit && cardCopy[0].suit == cardCopy[2].suit) {
    // if the discard pile has a card with that suit and better value, draw that
    // otherwise, draw from the deck
  }
  // if 2 cards are the same suit, attempt to draw a 3rd card of that same suit.
  else if (cardCopy[0].suit == cardCopy[1].suit || cardCopy[0].suit == cardCopy[2].suit || cardCopy[1].suit == cardCopy[2].suit) {

  }
  // if 2 cards are the same suit, attempt to draw a 3rd card of that same value.
  else if (cardCopy[0].value == cardCopy[1].value || cardCopy[0].value == cardCopy[2].value || cardCopy[1].value == cardCopy[2].value) {

  }
  // if 2 cards are in the set (ace,2,3) then attempt to draw the third card of the set.
  else if (false) {

  }
  // if 2 cards are in the set (3,ace,4) then attempt to draw the third card of the set.
  else if (false) {

  }
  //
  else {
    // if the discard card is 8, 9, or 10 and matches one of our suits choose it,
    // discarding the lowest valued card of the other 2 cards.

    // otherwise draw a new card, if it matches one of our suits, discard one of
    // the other 2 cards with the lowest value. If if doesn't match, simply
    // discard the lowest value card of the 4.
  }

  computerHand.addCard(deck.draw());
}
// TODO: decide which card to discard
function computerDiscard() {
  discardPile.place(computerHand.discard(randomInt(4)));
}

// TODO: last hand completed!
function endSet() {
  console.log("That's all folks");
  if (playerHandsWon > computerHandsWon) {
    setTimeout(function() {
      computerWinElement.classList.remove("shown");
      playerWinElement.classList.remove("shown");
      renderDiscardTip('<h3>Congratulations, you won! Click "New Game" to start another game.</h3>');
    }, 800);
  } else {
    setTimeout(function() {
      computerWinElement.classList.remove("shown");
      playerWinElement.classList.remove("shown");
      renderDiscardTip('<h3>Too bad, the CPU won! Click "New Game" to try again.</h3>');
    }, 800);
  }
}

function debug() {
  console.log(playerHand.eval());
}
