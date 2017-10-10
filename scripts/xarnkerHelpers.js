// CS316 Program 2: Xarnker
// Authors: Evan Heaton & Robert Cala
// created on 10/8/17

function allowPlayerDiscard() {
  // cant use loops here because of some weirdness with "closures" or whatever.
  playerHand.imgElements[0].onclick = function() { playerDiscard(0); }
  playerHand.imgElements[1].onclick = function() { playerDiscard(1); }
  playerHand.imgElements[2].onclick = function() { playerDiscard(2); }
  playerHand.imgElements[3].onclick = function() { playerDiscard(3); }
}
function disallowPlayerDiscard() {
  for (var i=0; i<playerHand.imgElements.length; i++) {
    playerHand.imgElements[i].onclick = nothingBurger;
  }
}
function allowDraw() {
  deck.imgElement.onclick = function() { drawDeck(); }
  discardPile.imgElement.onclick = function() { drawDiscard(); }
}
function disallowDraw() {
  deck.imgElement.onclick = nothingBurger;
  discardPile.imgElement.onclick = nothingBurger;
}
function drawDiscard() {
  playerHand.addCard(discardPile.draw());
  discardPile.render();
  disallowDraw();
  allowPlayerDiscard();
}
function drawDeck() {
  playerHand.addCard(deck.draw());
  discardPile.render();
  disallowDraw();
  allowPlayerDiscard();
}
function playerDiscard(index) {
  console.log(index);
  discardPile.place(playerHand.discard(index));
  disallowPlayerDiscard();

  // TODO: computer takes its turn

  allowDraw();
}
function playerDiscardDelegate(index) {
  return function() {
    playerDiscard(index);
  }
}
function nothingBurger() {
  console.log("do nothing");
}
