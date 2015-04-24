// http://tulov-alex.ru/2.1/cluster/create
// https://github.com/Tuch/angular-dnd

// http://vulpi-shu.github.io/ymap-test/#/state1

angular.module('lgx', ['ui.router', 'yaMap', 'dnd', 'perfect_scrollbar'])
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
    if(['role', 'city'].indexOf(elem.type) >= 0) {
      $scope.$emit('view_collection_card', elem)
    } else {
      $scope.$emit('view_element_card', elem)
    }
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
        templateUrl: "partials/state1.html",
        controller: function($scope) {

          var geoObjects = [];
          var point;
          var points = data.orgs;
          for (var i = 0, ii = points.length; i < ii; i++) {
            point = points[i];
            geoObjects.push({
              geometry:{
                type:'Point',
                coordinates: point.coords
              },
              properties:{
                balloonContentBody: point.name,
                clusterCaption: 'метка <strong>' + i + '</strong>',
                organization: point
              }
            });
          }
          $scope.geoObjects = geoObjects;

          $scope.element_cards = []

          $scope.show_element_card = function(el) {
            if($scope.element_cards.indexOf(el) == -1) {
              $scope.element_cards.push(el)
            }
          }
          $scope.$on('view_element_card', function(ev, el) {
            $scope.show_element_card(el)
          })

          $scope.remove_element_card = function(el) {
            $scope.element_cards.splice(
              $scope.element_cards.indexOf(el), 1
            )
          }

          $scope.collection_cards = []
          $scope.$on('view_collection_card', function(ev, el) {
            if($scope.collection_cards.indexOf(el) == -1) {
              $scope.collection_cards.push(el)
            }
          })

          $scope.remove_collection_card = function(el) {
            $scope.collection_cards.splice(
              $scope.collection_cards.indexOf(el), 1
            )
          }

          $scope.cluster_click = function ($event) {
            target  = $event.get('target')

            if(!target.getGeoObjects) {
              return
            }
            objects = target.getGeoObjects()

            orgs = []
            for(key in objects) {
              orgs.push( objects[key].properties.get('organization') )
            }

            $scope.collection_cards.push({
              entities: orgs
            })
          }

          $scope.pin_click = function ($event) {
            target  = $event.get('target')
            $scope.show_element_card(target.properties.get('organization'))
          }

        }
      })
      .state('view_card', {
        url: "/state2",
        templateUrl: "partials/state2.html"
      })

})



// вваы ваф вы
//
//
//
//
//
//



//<ya-cluster
//ya-options="{clusterIcons: [{href: 'img/cat.png',size: [40, 40],offset: [-20, -20]}], clusterIconContentLayout: 'clusterLayer'}">
//  <ya-geo-object ya-options="{preset: 'islands#violetIcon'}" ng-repeat="o in geoObjects" ya-source="o"></ya-geo-object>
//  </ya-cluster>
//
//<ya-template-layout ya-key="clusterLayer">
//  <div class="cluster_layout_container"><div class="square_layout">$[properties.geoObjects.length]</div></div>
//  </ya-template-layout>