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
	if(!window.history || !history.replaceState) {
		return;
	}
	$rootScope.$on('duScrollspy:becameActive', function($event, $element, $target){
		//Automaticly update location
		var hash = $element.prop('hash');
		if (hash) {
			history.replaceState(null, null, hash);
		}
	});
});




