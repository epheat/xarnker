// CS316 Program 2: Xarnker
// Authors: Evan Heaton & Robert Cala
// created on 10/8/17

var updateHands = function() {
  document.getElementById("playerCard0").setAttribute("src", "assets/deck/" + playerHand.cards[0].img);
  document.getElementById("playerCard1").setAttribute("src", "assets/deck/" + playerHand.cards[1].img);
  document.getElementById("playerCard2").setAttribute("src", "assets/deck/" + playerHand.cards[2].img);

  document.getElementById("computerCard0").setAttribute("src", "assets/deck/" + computerHand.cards[0].img);
  document.getElementById("computerCard1").setAttribute("src", "assets/deck/" + computerHand.cards[1].img);
  document.getElementById("computerCard2").setAttribute("src", "assets/deck/" + computerHand.cards[2].img);
}
