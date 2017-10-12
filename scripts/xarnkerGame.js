// CS316 Program 2: Xarnker
// Authors: Evan Heaton & Robert Cala
// created on 10/8/17

function xarnkerGame() {

  this.playerHandScore = 0;
  this.computerHandScore = 0;

  this.renderRound = function() {
    roundElement.innerHTML = round + " / " + numRounds;
  }
  this.renderHand = function() {
    handElement.innerHTML = hand + " / " + numHands;
  }

  this.renderPlayerName = function() {
    playerNameElement.innerHTML = playerName;
  }

  this.renderPlayerHandScore = function() {
    playerScoreElement.innerHTML = "Score: " + this.playerHandScore;
  }
  this.renderComputerHandScore = function() {
    computerScoreElement.innerHTML = "Score: " + this.computerHandScore;
  }

  this.evaluateHands = function() {
    this.playerHandScore = playerHand.eval();
    this.computerHandScore = computerHand.eval();
    return (this.playerHandScore >= this.computerHandScore);
  }

  this.renderPlayerHandIndicators = function() {
    for (var i=0; i<playerHandsWon; i++) {
      if (i < playerHandIndicatorElements.length) {
        playerHandIndicatorElements[i].classList.add("filled");
      }
    }
  }
  this.renderComputerHandIndicators = function() {
    for (var i=0; i<computerHandsWon; i++) {
      if (i < computerHandIndicatorElements.length) {
        computerHandIndicatorElements[i].classList.add("filled");
      }
    }
  }
}
