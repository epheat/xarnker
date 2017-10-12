// CS316 Program 2: Xarnker
// Authors: Evan Heaton & Robert Cala
// created on 10/8/17


// click enablers and disablers:

function enablePlayerDiscard() {
  // cant use loops here because of some weirdness with "closures" or whatever.
  playerHand.imgElements[0].onclick = function() { playerDiscard(0); }
  playerHand.imgElements[1].onclick = function() { playerDiscard(1); }
  playerHand.imgElements[2].onclick = function() { playerDiscard(2); }
  playerHand.imgElements[3].onclick = function() { playerDiscard(3); }

  playerHandTipElement.classList.add("shown");
}
function disablePlayerDiscard() {
  for (var i=0; i<playerHand.imgElements.length; i++) {
    playerHand.imgElements[i].onclick = nothingBurger;
  }
  playerHandTipElement.classList.remove("shown");
}
function enablePlayerDraw() {
  deck.imgElement.onclick = function() { drawDeck(); }
  discardPile.imgElement.onclick = function() { drawDiscard(); }

  deckDiscardTipElement.classList.add("shown");
}
function disablePlayerDraw() {
  deck.imgElement.onclick = nothingBurger;
  discardPile.imgElement.onclick = nothingBurger;

  deckDiscardTipElement.classList.remove("shown");
}
function enableClickAnywhereToContinue() {
  xarnkerTableElement.onclick = dealNewHand;
}
function disableClickAnywhereToContinue() {
  xarnkerTableElement.onclick = nothingBurger;
  computerWinElement.classList.remove("shown");
  playerWinElement.classList.remove("shown");
  playerScoreElement.classList.remove("shown");
  computerScoreElement.classList.remove("shown");
}

// some render functions for score, hand count, discard count, etc.
renderRound = function() {
  roundElement.innerHTML = round + " / " + numRounds;
}
renderHand = function() {
  handElement.innerHTML = hand + " / " + numHands;
}
renderPlayerName = function() {
  playerNameElement.innerHTML = playerName;
}
renderPlayerHandScore = function() {
  playerScoreElement.innerHTML = "Score: " + playerHandScore;
}
renderComputerHandScore = function() {
  computerScoreElement.innerHTML = "Score: " + computerHandScore;
}
evaluateHands = function() {
  playerHandScore = playerHand.eval();
  computerHandScore = computerHand.eval();
  return (playerHandScore >= computerHandScore);
}
renderPlayerHandIndicators = function() {
  for (var i=0; i<playerHandsWon; i++) {
    if (i < playerHandIndicatorElements.length) {
      playerHandIndicatorElements[i].classList.add("filled");
    }
  }
}
renderComputerHandIndicators = function() {
  for (var i=0; i<computerHandsWon; i++) {
    if (i < computerHandIndicatorElements.length) {
      computerHandIndicatorElements[i].classList.add("filled");
    }
  }
}



function drawDiscard() {
  playerHand.addCard(discardPile.draw());
  discardPile.render();
  disablePlayerDraw();
  enablePlayerDiscard();
}
function drawDeck() {
  playerHand.addCard(deck.draw());
  discardPile.render();
  disablePlayerDraw();
  enablePlayerDiscard();
}
function nothingBurger() {
  console.log("do nothing");
}

function randomInt(zeroToThis) {
  return Math.floor(Math.random() * zeroToThis);
}

function shallowCopy(cards){
  var copy = []
  for (var i=0; i<this.cards.length-1; i++){
    copy.push(this.cards[i]);
  }
  return copy;
}
