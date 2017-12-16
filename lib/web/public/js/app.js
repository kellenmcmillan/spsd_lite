'use strict';

// Use Auth0 Recommended Run Block Dependency Injection Pattern

var LightweightWebApp = angular.module('LightweightWebApp', ['ngMaterial', 'lightweightAppRouting', 'duScroll', 'auth'])

.run(function ($rootScope, $timeout, $route, auth) {
	// Put the authService on $rootScope so its methods
    // can be accessed from the app
    $rootScope.auth = auth;
    // Process the auth token if it exists and fetch the profile
    authService.handleParseHash();
	$rootScope.$on('$viewContentLoaded', function() {
		$timeout(function() {
			componentHandler.upgradeAllRegistered();
		})
		angular.element(window).on("resize", function() {
			$rootScope.$apply();
		});
	});
});




