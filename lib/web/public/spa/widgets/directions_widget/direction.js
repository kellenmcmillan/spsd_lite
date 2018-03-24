'use strict';

angular.module('directions', [])

.directive('lwDirections', function() {

	return {
		restrict: 'E',
		scope: {},
		link: link,
		controller: ['$rootScope', '$scope', '$window', '$timeout', function lightweightDirectionsController($rootScope, $scope, $window, $timeout) {
			$timeout(function(){
                $scope.iframe_src = $rootScope.trusted_google_address_widget_map;
				$scope.address_link = $rootScope.google_address_link;
            }, 3000);
		}],

		templateUrl: 'spa/widgets/directions_widget/direction-map.html'

	};

	function link(scope, element, attrs){

	}

});


