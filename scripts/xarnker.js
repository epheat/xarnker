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
  computerHand = new Hand([deck.draw(), deck.draw(), deck.draw()], computerHandImgElements, false);

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
  }, 500);
}

// evaluate and compare hands
function evaluateHands() {
  console.log("Evaluating hands...");

  playerHandScore = playerHand.eval();
  computerHandScore = computerHand.eval();

  return (playerHandScore >= computerHandScore);
}

// decide whether to draw from the deck or discard
function computerDraw() {
  var cardCopy = shallowCopy(computerHand.cards);
  prune(cardCopy);
  cardCopy.sort(function(a,b){
    return a.value - b.value;
  });
  var tempsuit = discardPile.peek().suit;
  var tempval = discardPile.peek().value;
  var cardflag = false;

  // if the computer already has a based hand, then just draw from the discard and immediately discard it
  if (computerHand.eval() > 30) {
    console.log("based hand");
    var cardDrawn = discardPile.draw();
    computerHand.addCard(cardDrawn);
    computerDiscard(computerHand.cards.indexOf(cardDrawn));
    return;
  }

  // if all 3 cards are the same suit, attempt to get a better card of the same suit
  if (cardCopy[0].suit == cardCopy[1].suit && cardCopy[0].suit == cardCopy[2].suit) {
    console.log("3 of same suit case");
    // if the discard pile has a card with that suit and better value, draw that
    // otherwise, draw from the deck

    if (tempsuit == cardCopy[0].suit && tempval > cardCopy[0].value){
      computerHand.addCard(discardPile.draw())
      computerDiscard(computerHand.cards.indexOf(cardCopy[0])); // discard the card with the lowest value

    }
    else{
      var cardDrawn = deck.draw();
      computerHand.addCard(cardDrawn);
      // if the card is the same suit, discard the lowest value from that suit
      if (cardDrawn.suit == cardCopy[0].suit) {
        computerDiscard(computerHand.cards.indexOf(cardCopy[0]));
        return;
      }
      // otherwise, discard that card of a different suit
      else {
        computerDiscard(computerHand.cards.indexOf(cardDrawn));
        return;
      }
    }
  }
  // if 2 cards are the same suit, attempt to draw a 3rd card of that same suit.
  else if (cardCopy[0].suit == cardCopy[1].suit || cardCopy[0].suit == cardCopy[2].suit || cardCopy[1].suit == cardCopy[2].suit) {
    console.log("2 of same suit case");
    var theDoubleSuit;
    if (cardCopy[0].suit == cardCopy[1].suit || cardCopy[0].suit == cardCopy[2].suit ) {
      theDoubleSuit = cardCopy[0].suit;
    } else if (cardCopy[1].suit == cardCopy[2].suit) {
      theDoubleSuit = cardCopy[1].suit;
    }
    // if the discard pile matches the double
    if (tempsuit == theDoubleSuit){
      // draw from discard
      computerHand.addCard(discardPile.draw());
      // discard the card that is not the same suit
      for (var i=0; i<computerHand.cards.length; i++) {
        if (computerHand.cards[i].suit != theDoubleSuit) {
          computerDiscard(i);
          return;
        }
      }
    }
    else {
      var cardDrawn = deck.draw();
      computerHand.addCard(cardDrawn);
      // if the card drawn matches the double, discard the card of a different suit
      if (cardDrawn.suit == cardCopy[0].suit && cardDrawn.suit == cardCopy[1].suit || cardDrawn.suit == cardCopy[0].suit && cardDrawn.suit == cardCopy[2].suit || cardDrawn.suit == cardCopy[1].suit && cardDrawn.suit == cardCopy[2].suit ) {
        for (var i=0; i<computerHand.cards.length; i++) {
          if (computerHand.cards[i].suit != cardDrawn.suit) {
            computerDiscard(i);
            return;
          }
        }
      }
      // otherwise, drop the card with the lowest value from non desired suits
      else {
        //TODO
        computerDiscard(computerHand.cards.indexOf(cardDrawn));
        return;
      }
    }

  }
  // if 2 cards are the same value, attempt to draw a 3rd card of that same value.
  else if (cardCopy[0].value == cardCopy[1].value || cardCopy[0].value == cardCopy[2].value || cardCopy[1].value == cardCopy[2].value) {
    console.log("2 of same value case");
    var theDoubleValue;
    if (cardCopy[0].value == cardCopy[1].value || cardCopy[0].value == cardCopy[2].value ) {
      theDoubleValue = cardCopy[0].value;
    } else if (cardCopy[1].value == cardCopy[2].value) {
      theDoubleValue = cardCopy[1].value;
    }

    // if the discard pile matches that value, draw it (obviously)
    if (tempval == theDoubleValue) {
      computerHand.addCard(discardPile.draw());
      for (var i=0; i<computerHand.cards.length; i++) {
        if (computerHand.cards[i].value != theDoubleValue) {
          computerDiscard(i);
          return;
        }
      }
      computerDiscard(0); // catch 4 of a kind
      return;
    } else {
      var cardDrawn = deck.draw();
      computerHand.addCard(cardDrawn);
      if (cardDrawn.value == theDoubleValue) {
        for (var i=0; i<computerHand.cards.length; i++) {
          if (computerHand.cards[i].value != theDoubleValue) {
            computerDiscard(i);
            return;
          }
        }
      } else {
        // TODO
        computerDiscard(computerHand.cards.indexOf(cardDrawn));
        return;
      }
    }
  }
  // if 2 cards are in the set (ace,2,3) then attempt to draw the third card of the set.
  else if (hasA(computerHand.cards, 1) && hasA(computerHand.cards, 2) ||
          hasA(computerHand.cards, 2) && hasA(computerHand.cards, 3) ||
          hasA(computerHand.cards, 1) && hasA(computerHand.cards, 3)) {

    console.log("looking for A23");

    var needs;
    if (hasA(computerHand.cards, 1) && hasA(computerHand.cards, 2)) {
      needs = 3;
    } else if (hasA(computerHand.cards, 1) && hasA(computerHand.cards, 3)) {
      needs = 2;
    } else if (hasA(computerHand.cards, 2) && hasA(computerHand.cards, 3)) {
      needs = 1;
    }

    if (tempval == needs) {
      computerHand.addCard(discardPile.draw());
      for (var i=0; i<computerHand.cards.length; i++) {
        if (computerHand.cards[i].value != 1 && computerHand.cards[i].value != 2 && computerHand.cards[i].value != 3) {
          computerDiscard(i);
          return;
        }
      }
      computerDiscard(3); // idk
    } else {
      var cardDrawn = deck.draw();
      computerHand.addCard(cardDrawn);
      if (cardDrawn.value == needs) {
        for (var i=0; i<computerHand.cards.length; i++) {
          if (computerHand.cards[i].value != 1 && computerHand.cards[i].value != 2 && computerHand.cards[i].value != 3) {
            computerDiscard(i);
            return;
          }
        }
        computerDiscard(3); // ye
        return;
      } else {
        computerDiscard(computerHand.cards.indexOf(cardDrawn));
        return;
      }

    }




  }
  // if 2 cards are in the set (3,ace,4) then attempt to draw the third card of the set.
  else if (hasA(computerHand.cards, 1) && hasA(computerHand.cards, 3) ||
          hasA(computerHand.cards, 1) && hasA(computerHand.cards, 4) ||
          hasA(computerHand.cards, 3) && hasA(computerHand.cards, 4)) {

    console.log("going for 3A4");
    var needs;
    if (hasA(computerHand.cards, 1) && hasA(computerHand.cards, 3)) {
      needs = 4;
    } else if (hasA(computerHand.cards, 1) && hasA(computerHand.cards, 4)) {
      needs = 3;
    } else if (hasA(computerHand.cards, 3) && hasA(computerHand.cards, 4)) {
      needs = 1;
    }

    if (tempval == needs) {
      computerHand.addCard(discardPile.draw());
      for (var i=0; i<computerHand.cards.length; i++) {
        if (computerHand.cards[i].value != 1 && computerHand.cards[i].value != 3 && computerHand.cards[i].value != 4) {
          computerDiscard(i);
          return;
        }
      }
      computerDiscard(3); // idk
    } else {
      var cardDrawn = deck.draw();
      computerHand.addCard(cardDrawn);
      if (cardDrawn.value == needs) {
        for (var i=0; i<computerHand.cards.length; i++) {
          if (computerHand.cards[i].value != 1 && computerHand.cards[i].value != 3 && computerHand.cards[i].value != 4) {
            computerDiscard(i);
            return;
          }
        }
        computerDiscard(3); // ye
        return;
      } else {
        computerDiscard(computerHand.cards.indexOf(cardDrawn));
        return;
      }

    }
  }
  // if the discard card is 8, 9, or 10 and matches one of our suits choose it,
  // discarding the lowest valued card of the other 2 cards
  else {
    if (tempval == 8 || tempval == 9 || tempval == 10){
      for (var i=0; i < cardCopy.length; i++){
        if (tempsuit == cardCopy[i].suit){
          computerHand.addCard(discardPile.draw());

          // TODO discard the lowest from computerHand without tempsuit
          var lowest = 11;
          var lowestIndex = 0;
          for (var i=0; i<computerHand.cards.length; i++) {
            if (computerHand.cards[i].suit != tempsuit) {
              if (computerHand.cards[i].value < lowest) {
                lowest = computerHand.cards[i].value;
                lowestIndex = i;
              }
            }
          }
          computerDiscard(lowestIndex);
          return;
        }
      }
    }
    // otherwise draw a new card, if it matches one of our suits, discard one of
    // the other 2 cards with the lowest value. If if doesn't match, simply
    // discard the lowest value card of the 4.
    else{
      var cardDrawn = deck.draw();
      computerHand.addCard(cardDrawn);
      for (var i=0; i<computerHand.cards.length; i++){
        if (cardDrawn.suit == computerHand.cards[i].suit){
          var lowest = 11;
          var lowestIndex = 0;
          // TODO discard the lowest from computerHand without cardDrawn.suit
          for (var i=0; i<computerHand.cards.length; i++) {
            if (computerHand.cards[i].suit != cardDrawn.suit) {
              if (computerHand.cards[i].value < lowest) {
                lowest = computerHand.cards[i].value;
                lowestIndex = i;
              }
            }
          }
          computerDiscard(lowestIndex);
          return;
        }
      }
      // now we can assume that we have a badugi
      if (cardDrawn.value > cardCopy[0].value){
        computerDiscard(computerHand.cards.indexOf(cardCopy[0]));
      }
      else{
        computerDiscard(computerHand.cards.indexOf(cardCopy[3]));
      }
    }


  }

  // computerHand.addCard(deck.draw());
}
// discard the card at index after 500ms
function computerDiscard(index) {
  setTimeout(function() {
    console.log("discarding card at index" + index);
    discardPile.place(computerHand.discard(index));
  }, 500)
}

// last hand completed!
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

function hasA(cards, value) {
  for (var i=0; i<cards.length; i++) {
    if (cards[i] == undefined) {
      continue;
    }
    if (cards[i].value == value) {
      return true;
    }
  }
  return false;
}
