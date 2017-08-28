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
	$rootScope.$on('duScrollspy:becameActive', function($event, $element, $target){
      //Automaticly update location 
      var hash = $target.prop('id');
      if (hash) {
        $rootScope.$broadcast('hash-change', {
            data:{
                hash: hash,
            }
        });
      }
    });
});




