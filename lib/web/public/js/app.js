'use strict';

var LightweightWebApp = angular.module('LightweightWebApp', ['lightweightAppRouting', 'duScroll'])

.run(function ($rootScope, $timeout, $emit) {
	$rootScope.$on('$viewContentLoaded', function() {
		$timeout(function() {
			componentHandler.upgradeAllRegistered();
		})
		angular.element(window).on("resize", function() {
			$rootScope.$apply();
		});
	});
	$rootScope.$on('duScrollspy:becameActive', function($event, $element, $target){
      //Automaticly update location 
      var hash = $element.prop('hash');
      if (hash) {
        $rootScope.$broadcast('hash-change', {
            data:{
                hash: hash,
            }
        });
      }
    });
});




