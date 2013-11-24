function ItemsCtrl($scope, phonegapReady, $timeout, $http) {
  $scope.category = $scope.categories[0];

  $scope.remaining = function(category) {
    var count = 0;
    var i = 0;
    for(; i < $scope.newItems.length; i++) {
      var element = $scope.newItems[i];

      if(category && category === element.category && 
        element.hasOwnProperty('items')) {

        return _.where(element.items, { done: false }).length;
      }
      else {
        if(element.hasOwnProperty('items')) {
          count += _.where(element.items, { done: false }).length;
        }
      }
    }
    return count;
  }

  $scope.existing = function(category) {
    var count = 0;
    var i = 0;
    for(; i < $scope.newItems.length; i++) {
      var element = $scope.newItems[i];

      if(category && category === element.category && 
        element.hasOwnProperty('items')) {
        
        return element.items.length;
      }
      else {
        if(element.hasOwnProperty('items')) {
          count += element.items.length;
        }
      }
    }
    return count;
  }

  $scope.archive = function() {
    $scope.newItems.forEach(function(element) {
      if(element.hasOwnProperty('items')) {
        element.items = _.filter(element.items, { done: false });
      }
    }); 
  }

  $scope.addItem = function() {
    // attempt only if data is there
    if($scope.category && $scope.item) {
      console.log('adding: ' + $scope.item + ' (' + $scope.category + ')');

      // check if category exists
      var categoryElement = _.where($scope.newItems, 
        { category: $scope.category });

      if(categoryElement.length === 0) {
        // no matching category in the list, create one and push new item in
        var newElement = { 
          category: $scope.category, 
          items: [{ text: $scope.item, done: false }]
        };
        // push to items
        $scope.newItems.push(newElement);
      }
      else {
        // category exists
        if(!categoryElement[0].hasOwnProperty('items')) {
          // seems like this is the first item for the category - create contnr
          categoryElement[0].items = [];
        }
        // push into category
        categoryElement[0].items.push({ text: $scope.item, done: false });

        // replace the original category object
        $scope.newItems.forEach(function(element, index) {
          if(element.category === categoryElement[0].category) {
            $scope.newItems[index] = categoryElement[0];
          }
        });
      }

      $scope.reorderItems();
      $scope.item = '';
    }
  }

  $scope.$watch('item', function(newValue) {
    fetchInfo(newValue);
  });

  // query wikipedia for clues about category
  var fetchInfo = function (newValue) {
    if(newValue) {
      $timeout.cancel($scope.fetchTimeout);
      $scope.fetchTimeout = $timeout(function () {
        $http.jsonp('https://en.wikipedia.org/w/api.php?' + 
          'format=json&prop=revisions&rvprop=content& ' + 
          'action=query&titles=' + newValue + 
          "&callback=JSON_CALLBACK").success(function(data) {

          console.log('queried wikipedia for ' + newValue);

          // stringify for regex test
          var string = angular.toJson(data);

          var found = false;
          $scope.categories.forEach(function(element) {
            if(!found && new RegExp(element).test(string)) {
              $scope.category = element;
              found = true;
            }
          });
        });
      }, 500);
    }

  }

  // reset category selector
  $scope.$on('categoriesChanged', function() {
    $scope.category = $scope.categories[0];
  });

}
