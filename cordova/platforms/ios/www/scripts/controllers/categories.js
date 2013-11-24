function CategoriesCtrl($scope) {

  $scope.addCategory = function() {
    if($scope.item && !_.contains($scope.categories, $scope.item)) {
      $scope.categories.push($scope.item);
      $scope.item = '';
    }
  }

  $scope.moveUp = function(index) {
    move(index, index - 1, $scope.categories);
  }

  $scope.moveDown = function(index) {
    move(index, index + 1, $scope.categories);
  }

  var move = function(oldIndex, newIndex, array) {
    if(newIndex >= 0 && newIndex < array.length) {
      var temp = array[oldIndex];
      array[oldIndex] = array[newIndex];
      array[newIndex] = temp;
    }
  }

  $scope.remove = function(index) {
    $scope.categories.splice(index, 1);
  }

}