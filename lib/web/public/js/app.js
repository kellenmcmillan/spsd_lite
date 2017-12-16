'use strict';

// Use Auth0 Recommended Run Block Dependency Injection Pattern

var LightweightWebApp = angular.module('LightweightWebApp', ['ngMaterial', 'lightweightAppRouting', 'duScroll'])

.run(function ($rootScope, $timeout, $route) {
	$rootScope.$on('$viewContentLoaded', function() {
		$timeout(function() {
			componentHandler.upgradeAllRegistered();
		})
		angular.element(window).on("resize", function() {
			$rootScope.$apply();
		});
	});
});




