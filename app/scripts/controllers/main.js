function MainCtrl($scope, phonegapReady) {

  // get ititial items and categories from storage if available
  $scope.newItems = localStorage.getItem('yasl-items') ? 
              angular.fromJson(localStorage.getItem('yasl-items')) : [];
  $scope.categories = localStorage.getItem('yasl-categories') ? 
              angular.fromJson(localStorage.getItem('yasl-categories')) : [];

  // save categories to storage if they change 
  $scope.$watch('categories', function() {
    console.log('saving categories to storage: ' + 
      angular.toJson($scope.categories));

    localStorage.setItem('yasl-categories', angular.toJson($scope.categories));

    // notify item addition that categories have changes
    $scope.$broadcast('categoriesChanged');

    // sync items
    $scope.reorderItems();
  }, true);

  // save items to storage if they change 
  $scope.$watch('newItems', function() {
    console.log('saving items to storage: ' + angular.toJson($scope.newItems));
    localStorage.setItem('yasl-items', angular.toJson($scope.newItems));
  }, true);

  $scope.reorderItems = function() {
    var temp = [];
    $scope.categories.forEach(function(element, index, array) {
      var t = _.where($scope.newItems, { category: element });
      if(t.length > 0) {
        temp.push(t[0]);
      }
      else {
        temp.push({category: element});
      }
    });
    $scope.newItems = temp;
  }

}
