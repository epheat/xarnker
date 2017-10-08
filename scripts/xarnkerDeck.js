// CS316 Program 2: Xarnker
// Authors: Evan Heaton & Robert Cala
// created on 10/8/17

// Deck object constructor
function Deck() {
  this.cards = [];
  for (var i=1; i<=40; i++) {
    this.cards.push(new Card(i));
  }

  // shuffle the deck in place using a fisher-yates shuffle
  // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
  this.shuffle = function() {
    // iterate backwards through the cards array
    for (var divider = this.cards.length-1; divider > 0; divider--) {
      // pick an element to the left of the divider (unshuffled element)
      var picked = Math.floor(Math.random() * divider);
      // and swap it with the element at the divider.
      // this causes all elements to the right of the divider to be shuffled.
      swap(this.cards, picked, divider);
    }
  }

  this.shuffle();

  // pop and return the top card of the deck.
  this.deal = function() {
    return this.cards.pop();
  }
}

// Hand object constructor
function Hand(deck) {
  this.cards = [];
  for (var i=0; i<3; i++) {
    this.cards.push(deck.deal());
  }

  this.eval = function() {
    // evaluate how many points this hand is worth
  }
}

// Card object constructor
function Card(index) {
  this.suit = suit(Math.floor((index-1) / 10));
  this.value = ((index-1) % 10) + 1;
  this.img = index + ".png";

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
