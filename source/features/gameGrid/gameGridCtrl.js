memoryApp.controller('gameGridCtrl', function ($scope, configService, gameService) {
  var defaultIconClass = 'text-primary';
  var matchIconClass = 'text-success';
  var mismatchIconClass = 'text-danger';
  var waitTimeForFlipBack = 2000;
  $scope.widthCount = 6;
  $scope.iconClass = defaultIconClass;

  $scope.newGame = function() {
//    console.log("new game");
    $scope.gameWon = false;
    $scope.cardsShown = [];
    $scope.cardsCleared = [];
    $scope.cards = gameService.setBoard($scope.widthCount, 4);
    $scope.cardCount = $scope.cards.length;
    $scope.rowCount = new Array(Math.ceil($scope.cardCount / $scope.widthCount));
//    $scope.$apply();
//    console.log($scope.cards);
  }();

  $scope.columnCount = new Array($scope.widthCount);

  $scope.calculateIndex = function(parentIndex, childIndex) {
    return (parentIndex * $scope. widthCount) + childIndex;
  };

  $scope.flipCard = function(cardIndex) {
    if ($scope.cardsShown.length >= 2) {
      // do nothing. users shouldn't be able to flip over more than one card
      return false;
    }

    var shownIndex = $scope.cardsShown.indexOf(cardIndex);
    var clearedIndex = $scope.cardsCleared.indexOf(cardIndex);
    if (shownIndex <= -1 && clearedIndex <= -1) {
      $scope.cardsShown.push(cardIndex);
    }

    if ($scope.cardsShown.length === 2) {
      var cardIcon1 = $scope.cards[$scope.cardsShown[0]];
      var cardIcon2 = $scope.cards[$scope.cardsShown[1]];

      if (cardIcon1 === cardIcon2) {
        $scope.iconClass = matchIconClass;
        setTimeout(matchedCardsFlipped, waitTimeForFlipBack);
      } else {
        $scope.iconClass = mismatchIconClass;
        setTimeout(mismatchedCardsFlipped, waitTimeForFlipBack);
      }
    }
  };

  var matchedCardsFlipped = function() {
    $scope.cardsCleared = $scope.cardsCleared.concat($scope.cardsShown);
    $scope.cardsShown = [];
    $scope.iconClass = defaultIconClass;
    if ($scope.cards.length === $scope.cardsCleared.length) {
      console.log("you won!");
      $scope.gameWon = true;
      setTimeout($scope.newGame, waitTimeForFlipBack);
    }
    $scope.$apply();
  };

  var mismatchedCardsFlipped = function() {
    $scope.cardsShown = [];
    $scope.iconClass = defaultIconClass;
    $scope.$apply();
  };


  $scope.cardState = function(cardIndex) {
    var state = 'hide';

    if ($scope.cardsCleared.indexOf(cardIndex) > -1) {
      state = 'clear';
    } else if ($scope.cardsShown.indexOf(cardIndex) > -1) {
      state = 'show';
    }

    return state;
  };
});