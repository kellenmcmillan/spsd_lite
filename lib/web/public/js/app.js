'use strict';

// Use Auth0 Recommended Run Block Dependency Injection Pattern

var LightweightWebApp = angular.module('LightweightWebApp', ['ngMaterial', 'lightweightAppRouting', 'duScroll', 'firebase', 'angular-uuid', 'ui.sortable'])

.run(function ($rootScope, $timeout, $route) {
	$rootScope.$on('$viewContentLoaded', function() {
		$timeout(function() {
			componentHandler.upgradeAllRegistered();
		})
		angular.element(window).on("resize", function() {
			$rootScope.$apply();
		});
	});
})
.config(function(){
    var config = {
        apiKey: "AIzaSyAF_pWmvd7Wh9qr4tIcyWQUaZr5izq7cys",
	    authDomain: "spsd-189118.firebaseapp.com",
	    databaseURL: "https://spsd-189118.firebaseio.com",
	    projectId: "spsd-189118",
	    storageBucket: "gs://spsd-189118.appspot.com/",
	    messagingSenderId: "339197570434"
    };
    firebase.initializeApp(config);
});




