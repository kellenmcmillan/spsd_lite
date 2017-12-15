'use strict';

// Use Auth0 Recommended Run Block Dependency Injection Pattern

// var LightweightWebApp = angular.module('LightweightWebApp', ['ngMaterial', 'lightweightAppRouting', 'duScroll', 'auth'])

// .run(function ($rootScope, $timeout, $route, auth) {
//     auth.handleAuthentication();
// 	$rootScope.$on('$viewContentLoaded', function() {
// 		$timeout(function() {
// 			componentHandler.upgradeAllRegistered();
// 		})
// 		angular.element(window).on("resize", function() {
// 			$rootScope.$apply();
// 		});
// 	});
// });

(function () {

  'use strict';

  angular
    .module('LightweightWebApp', ['ngMaterial', 'lightweightAppRouting', 'duScroll', 'auth'])
    .run(run);

  run.$inject = ['$rootScope, $timeout, $route, auth'];
    
  function run($rootScope, $timeout, $route, auth) {
    // Handle the authentication
    // result in the hash
    auth.handleAuthentication();
  }

})();




