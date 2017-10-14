// CS316 Program 2: Xarnker
// Authors: Evan Heaton & Robert Cala
// created on 10/8/17

// Deck object constructor
function Deck(imgElement) {
  this.cards = [];
  for (var i=1; i<=40; i++) {
    this.cards.push(new XarnkerCard(i));
  }
  this.imgElement = imgElement;
  this.draw = function() {
    // note: returns 'undefined' with an empty array
    return this.cards.pop();
  }
  this.swap = function(i, j) {
    var temp = this.cards[i];
    this.cards[i] = this.cards[j];
    this.cards[j] = temp;
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
      this.swap(picked, divider);
    }
  }
  this.render = function() {
    this.imgElement.style.opacity = 1;
  }
}

// Hand object constructor
function Hand(cards, imgElements, hideCards) {
  this.cards = [];
  for (var i=0; i<cards.length; i++) {
    this.cards.push(cards[i]);
  }
  this.imgElements = [];
  for (var i=0; i<imgElements.length; i++) {
    this.imgElements.push(imgElements[i]);
  }
  this.hideCards = hideCards;
  // evaluate how many points this hand is worth
  this.eval = function() {
    // get a pruned, sorted copy of the player's current hand to evaluate
    var cardCopy = shallowCopy(this.cards);
    prune(cardCopy);
    cardCopy.sort(function(a,b){
      return a.value - b.value;
    });
    var score = 0;
    // 3 of a kind
    if (cardCopy[0].value == cardCopy[1].value && cardCopy[0].value == cardCopy[2].value) {
        return 50;
    }
    // flush... shouldn't this go at the end? We would want A, 2, 3 of the same suit to return 40
    /*
    else if (cardCopy[0].suit == cardCopy[1].suit && cardCopy[0].suit == cardCopy[2].suit){
      for (var i=0; i<cardCopy.length-1; i++){
        score += cardCopy[i].value
      }
      return score
    }*/
    // Ace, two, three
    else if (cardCopy[0].value == 1 && cardCopy[1].value == 2 && cardCopy[2].value == 3){
      return 40;
    }
    // 3.14 (but it will be sorted to 1, 3, 4)
    else if (cardCopy[0].value == 1 && cardCopy[1].value == 3 && cardCopy[2].value == 4 ){
      return 31;
    }
    // highest score from suit summations
    else{

      var scores = { clubs: 0, spades: 0, hearts: 0, diamonds: 0 };
      for (var c=0; c<cardCopy.length; c++) { // loop through cards and add values to that suit
        scores[cardCopy[c].suit] += cardCopy[c].value;
      }
      return Math.max(scores.clubs, scores.spades, scores.hearts, scores.diamonds);


      /*
      var highcard = 0

      for (var i=0; i<cardCopy.length-1; i++){
        for (var j=1; j<cardCopy.length-1; j++){
          if (cardCopy[i].value >= cardCopy[j].value){
            highcard = cardCopy[i].value
          }
          else {
            highcard = cardCopy[j].value
          }
        }
      }
      return highcard
      */
    }
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
        if (this.hideCards == true) {
          // TODO: make this animation fade. Overlay img tags?
          this.imgElements[i].setAttribute("src", "assets/cards/cardBack_blue5.png");
        } else {
          this.imgElements[i].setAttribute("src", "assets/cards/" + this.cards[i].img);
        }
        this.imgElements[i].style.opacity = 1;
      } else {
        this.imgElements[i].style.opacity = 0;
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
      this.imgElement.setAttribute("src", "assets/cards/" + topCard.img);
      this.imgElement.style.opacity = 1;
    } else {
      this.imgElement.style.opacity = 0;
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

}
