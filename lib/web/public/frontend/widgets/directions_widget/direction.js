'use strict';

angular.module('directions', [])

.directive('lwDirections', function() {

	return {
		restrict: 'E',
		scope: {},
		link: link,
		controller: ['$rootScope', '$scope', '$window', function lightweightDirectionsController($rootScope, $scope, $window) {

			$scope.iframe_src = $rootScope.trusted_google_address_widget_map;
			$scope.address_link = $rootScope.google_address_link;
	        
		}],

		templateUrl: 'frontend/widgets/directions_widget/direction-map.html'

	};

	function link(scope, element, attrs){

	}

});


