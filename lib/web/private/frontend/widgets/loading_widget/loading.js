'use strict';

var loading = angular.module('loading', [])

.directive('loadingScreen', ['$window', function($window) {
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'frontend/widgets/loading_widget/loading.html',
    controller: ['$scope', '$window', '$sce', '$rootScope', '$location', '$timeout', function lightweightKitController($scope, $window, $sce, $rootScope, $location, $timeout) {
          // App Loading Screen
          $scope.$on('$routeChangeStart', function(event, args) {
              
              $scope.page_is_loading = true;

              $timeout(function(){
                  $scope.page_is_loading = false;
              }, 2500);

          });
    }]
  }
}]);