memoryApp.controller('gameGridCtrl', function ($scope, configService, gameService, $timeout) {
  var defaultIconClass = 'text-primary';
  var matchIconClass = 'text-success';
  var mismatchIconClass = 'text-danger';
  var waitTimeForFlipBack = 2000;
  $scope.widthCount = 6;
  $scope.iconClass = defaultIconClass;
  $scope.bestGame = 0;

  $scope.newGame = function() {
//    console.log("new game");
    $scope.gameWon = false;
    $scope.tries = 0;
    $scope.cardsShown = [];
    $scope.cardsCleared = [];
    $scope.cards = gameService.setBoard($scope.widthCount, 4);
    $scope.cardCount = $scope.cards.length;
    $scope.rowCount = new Array(Math.ceil($scope.cardCount / $scope.widthCount));
  };
  $scope.newGame();

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
      $scope.tries++;
      var cardIcon1 = $scope.cards[$scope.cardsShown[0]];
      var cardIcon2 = $scope.cards[$scope.cardsShown[1]];

      if (cardIcon1 === cardIcon2) {
        $scope.iconClass = matchIconClass;
        $timeout(matchedCardsFlipped, waitTimeForFlipBack);
      } else {
        $scope.iconClass = mismatchIconClass;
        $timeout(mismatchedCardsFlipped, waitTimeForFlipBack);
      }
    }
  };

  var matchedCardsFlipped = function() {
    $scope.cardsCleared = $scope.cardsCleared.concat($scope.cardsShown);
    $scope.cardsShown = [];
    $scope.iconClass = defaultIconClass;
    if ($scope.cards.length === $scope.cardsCleared.length) {
      console.log("you won!");
      if($scope.tries < $scope.bestGame || $scope.bestGame === 0) {
        $scope.bestGame = $scope.tries;
      }
      $scope.gameWon = true;
      $timeout($scope.newGame, waitTimeForFlipBack);
    }
  };

  var mismatchedCardsFlipped = function() {
    $scope.cardsShown = [];
    $scope.iconClass = defaultIconClass;
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