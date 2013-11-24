function TodoCtrl($scope, phonegapReady) {
  $scope.todos = [
    { text: 'beer', done: false, category: 'Beverages' },
    { text: 'coke', done: false, category: 'Beverages' },
    { text: 'beans', done: false, category: 'Canned food' },
    { text: 'spam', done: false, category: 'Canned food' },
    { text: 'milk', done: false, category: 'Dairy products' },
    { text: 'butter', done: false, category: 'Dairy products' },
    { text: 'cream', done: false, category: 'Dairy products' },
  ];

  $scope.$on('handleBroadcast', function(event, args) {
    console.log('TodoCtrl::addTodo - received!');
    $scope.todos.push({text:args.item, done:false, category: args.category});
    $scope.todos.sort(function(a,b) { return (a.category > b.category) ? 1 : ((b.category > a.category) ? -1 : 0); });
  });

  $scope.remaining = function() {
    var count = 0;
    angular.forEach($scope.todos, function(todo) {
      count += todo.done ? 0 : 1;
    });
    return count;
  };

  $scope.archive = function() {
    var oldTodos = $scope.todos;
    $scope.todos = [];
    angular.forEach(oldTodos, function(todo) {
      if (!todo.done) $scope.todos.push(todo);
    });
  };

  $scope.dewhitespace = function(whitespaced) {
    return whitespaced.replace(' ', '-');
  }

  $scope.takePhoto = function() {

    console.log('taking photo...');
    navigator.camera.getPicture(function(imgUri) {
        console.log('got photo!');

        var image = document.getElementById("photo");
        image.src = imgUri;
    }, function() {
        console.log('problem');
        navigator.notification.alert("Photo fail :(", null, "Oh noes!", "I can cope with it");
    }, {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI
    });
    }
}

function TodoAddCtrl($scope, $timeout, $http) {

  var fetch = function (newValue) {
    $timeout.cancel($scope.fetchTimeout);
    $scope.fetchTimeout = $timeout(function () {

      $http.jsonp('https://en.wikipedia.org/w/api.php?' + 
        'format=json&prop=revisions&rvprop=content& ' + 
        'action=query&titles=' + newValue + "&callback=JSON_CALLBACK").success(function(data) {

        var string = JSON.stringify(data);

        if(new RegExp('Baked goods').test(string)) { $scope.category = 'Baked goods'; return; }
        if(new RegExp('Baking products').test(string)) { $scope.category = 'Baking products'; return; }
        if(new RegExp('Beverages').test(string)) { $scope.category = 'Beverages'; return; }
        if(new RegExp('Canned food').test(string)) { $scope.category = 'Canned food'; return; }
        if(new RegExp('Coffee and tea').test(string)) { $scope.category = 'Coffee and tea'; return; }
        if(new RegExp('Dairy products').test(string)) { $scope.category = 'Dairy products'; return; }
        if(new RegExp('Fresh meat').test(string)) { $scope.category = 'Fresh meat'; return; }
        if(new RegExp('Fruits and vegetables').test(string)) { $scope.category = 'Fruits and vegetables'; return; }
        if(new RegExp('Packed meat').test(string)) { $scope.category = 'Packed meat'; return; }
        if(new RegExp('Pharmacy products').test(string)) { $scope.category = 'Pharmacy products'; return; }

      });

    }, 500);
  };

  $scope.addTodo = function() {
    if($scope.category) {
      $scope.$emit('handleEmit', {item: $scope.item, category: $scope.category});
      $scope.item = '';
      $scope.category = '';
      AppRouter.instance.back();
    }

  };

  $scope.$watch('item', function(newValue) {
    console.log('changed: ' + newValue);
    fetch(newValue);
  });

}
