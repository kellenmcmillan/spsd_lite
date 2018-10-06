'use strict';

var loading = angular.module('loading', [])

.directive('loadingScreen', ['$window', function($window) {
	return {
		restrict: 'E',
		scope: {},
		templateUrl: 'loading.html',
		controller: ['$scope', '$window', '$sce', '$rootScope', '$location', '$timeout', function loadingController($scope, $window, $sce, $rootScope, $location, $timeout) {
			// App Loading Screen
			$scope.$on('$routeChangeStart', function(event, args) {

				

			});
		}]
	}
}])
.directive('contentAvailable', ['$location', '$timeout', function($location, $timeout){

    return {
        link: link,
        restrict: 'A'
      };
    
    function link(scope, element, attrs){
        
        element.on("load", function(){

            $timeout(function(){
                $('#load_page').fadeOut('slow');
            }, 2500);

        });

    }
}]);