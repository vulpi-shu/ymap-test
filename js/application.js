// http://tulov-alex.ru/2.1/cluster/create


// http://vulpi-shu.github.io/ymap-test/#/state1


angular.module('lgx', ['ui.router', 'yaMap', 'dnd'])
.controller('treeCtl', function($scope, data) {
  $scope.tree = angular.extend({}, data.tree)

  expand_all = function (item) {
    item.expanded = true
    angular.forEach(item.children, expand_all)
  }
  expand_all($scope.tree[0])

  $scope.expand = function(element) {
    element.expanded = !element.expanded
  }

  $scope.view_card = function(elem) {
    console.log(elem)
  }

})
.config(function($stateProvider, $urlRouterProvider, data) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/state1");
    //
    // Now set up the states
    $stateProvider
      .state('state1', {
        url: "/state1",
        templateUrl: "partials/state1.html"
      })
      .state('view_card', {
        url: "/state2",
        templateUrl: "partials/state2.html"
      })

})
