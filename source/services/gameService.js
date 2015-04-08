memoryApp.service('gameService', function(configService) {
  var totalCards = null;
  var pairs = null;
  var cardsUsed = [];
  var cardsUsed2 = [];
  var cardsNotUsed = configService.cards;
  var board = [];

  this.setBoard = function(x, y) {
    totalCards = x * y;
    if (((totalCards % 2) === 1)) {
      console.log("odd # of cards. bad.");
      return null;
    }

    pairs = x * y / 2;
    if (configService.cards.length < pairs) {
      console.log("too many cards. bad.");
      return null;
    }

//    console.log("we're making a board " + x + " x " + y + " with a total of " + totalCards + ", that's " + pairs + " unqiue pairs.");
    return this.getRandomIcons();
  };

  this.getRandomIcons = function() {
    cardsNotUsed = configService.cards;
    cardsUsed = [];

    while (cardsUsed.length !== pairs) {
      var iconIndex = Math.floor(Math.random() * cardsNotUsed.length);
      var newIcon = cardsNotUsed.splice(iconIndex, 1);
      cardsUsed = cardsUsed.concat(newIcon);
    }

    boardContent = cardsUsed.concat(cardsUsed);
    board = [];
    while (boardContent.length > 0) {
      var cardIndex = Math.floor(Math.random() * boardContent.length);
      var addCard = boardContent.splice(cardIndex, 1);
      board = board.concat(addCard);
    }

    return board;
  };
});