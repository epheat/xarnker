// CS316 Program 2: Xarnker
// Authors: Evan Heaton & Robert Cala
// created on 10/8/17

function xarnkerGame() {


  this.renderRound = function() {
    roundElement.innerHTML = round + " / " + numRounds;
  }
  this.renderHand = function() {
    handElement.innerHTML = hand + " / " + numHands;
  }
}
