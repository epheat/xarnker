// CS316 Program 2: Xarnker
// Authors: Evan Heaton & Robert Cala
// created on 10/8/17

// Deck object constructor
function Deck() {
  this.cards = [];
  for (var i=1; i<=40; i++) {
    this.cards.push(new XarnkerCard(i));
  }
  this.draw = function() {
    // note: returns 'undefined' with an empty array
    return this.cards.pop();
  }
  // shuffle the deck in place using a fisher-yates shuffle
  // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  this.shuffle = function() {
    // iterate backwards through the cards array
    for (var divider = this.cards.length-1; divider > 0; divider--) {
      // pick an element to the left of the divider (unshuffled element)
      var picked = Math.floor(Math.random() * divider);
      // and swap it with the element at the divider.
      // this causes all elements to the right of the divider to be shuffled as we iterate.
      swap(this.cards, picked, divider);
    }
  }
}

// Hand object constructor
function Hand(cards, imgElements) {
  this.cards = [];
  for (var i=0; i<cards.length; i++) {
    this.cards.push(cards[i]);
  }
  this.imgElements = [];
  for (var i=0; i<imgElements.length; i++) {
    this.imgElements.push(imgElements[i]);
  }
  // evaluate how many points this hand is worth
  this.eval = function() {

  }
  // discard a given card from hand
  this.discard = function(i) {
    var discarded = this.cards[i];
    this.cards[i] = undefined;
    this.render();
    return discarded;
  }
  // add a card to the first missing spot in the hand
  this.addCard = function(card) {
    for (var i=0; i<this.imgElements.length; i++) {
      if (this.cards[i] == undefined) {
        this.cards[i] = card;
        this.render();
        return;
      }
    }
    return undefined;
  }
  // render the cards on-screen
  this.render = function() {
    for (var i=0; i<this.imgElements.length; i++) {
      if (this.cards[i] != undefined) {
        imgElements[i].setAttribute("src", "assets/deck/" + this.cards[i].img);
        imgElements[i].style.opacity = 1;
      } else {
        imgElements[i].style.opacity = 0;
      }
    }
  }
}

// Discard pile object constructor
function DiscardPile(topCard, imgElement) {
  this.cards = [topCard];
  this.imgElement = imgElement;
  // pop and return the top card from a pile.
  this.draw = function() {
    // note: returns 'undefined' with an empty array
    return this.cards.pop();
  }
  // place a new card on top of a pile.
  this.place = function(card) {
    this.cards.push(card);
    this.render();
  }
  // look at the top card of the discard pile
  this.peek = function() {
    if (this.cards.length > 0) {
      return this.cards[this.cards.length - 1];
    } else {
      return undefined;
    }
  }
  // update the img element based on the top card of the pile.
  this.render = function() {
    var topCard = this.peek();
    if (topCard != undefined) {
      this.imgElement.setAttribute("src", "assets/deck/" + topCard.img);
      this.imgElement.style.visibility = "visible";
    } else {
      this.imgElement.style.visibility = "hidden";
    }
  }
}

// XarnkerCard object constructor
function XarnkerCard(index) {
  this.suit = suit(Math.floor((index-1) / 10));
  this.value = ((index-1) % 10) + 1;
  this.img = index + ".png";

  // might come in handy for debugging?
  this.toString = function() {
    return this.value + " of " + this.suit;
  }
}

function suit(i) {
  if (i == 0) {
    return "clubs";
  } else if (i == 1) {
    return "spades";
  } else if (i == 2) {
    return "hearts";
  } else if (i == 3) {
    return "diamonds";
  }
}

function swap(array, i, j) {
  var temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}
