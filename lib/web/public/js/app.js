'use strict';

var LightweightWebApp = angular.module('LightweightWebApp', ['lightweightAppRouting', 'duScroll'])

.run(function ($rootScope, $timeout) {
	$rootScope.$on('$viewContentLoaded', function() {
		$timeout(function() {
			componentHandler.upgradeAllRegistered();
		})
		angular.element(window).on("resize", function() {
			$rootScope.$apply();
		});
	});
});




