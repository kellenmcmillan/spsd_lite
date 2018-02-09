'use strict';

angular.module('lightweightAppRouting', [
  'ngRoute',
  'ngResource', 
  'ngAnimate', 
  'loading',
  'colorPalette', 
  'dynamicSizing',
  'main', 
  'home', 
  'folder',
  'folders',
  'team',
  'uxTest',
  'capabilities',
  'login',
  'userVault'
])

.config(function ($routeProvider, $locationProvider) {

	$routeProvider
	// frontend routes
	.when('/', {
		templateUrl: 'spa/home/partials/index.html',
		controller: 'homeController'
	})
	.when('/gallery/:url_param', {
		templateUrl: 'spa/pages/gallery/partials/folder.html',
		controller: 'folderController'
	})
	.when('/gallery', {
		templateUrl: 'spa/pages/gallery/partials/folders.html',
		controller: 'directoryController'
	})
	.when('/capabilities/:url_param', {
		templateUrl: 'spa/pages/capabilities/partials/capabilities.html',
		controller: 'capabilitiesController'
	})
	.when('/meet-our-team', {
		templateUrl: 'spa/pages/team/partials/team.html',
		controller: 'teamController'
	})
	.when('/login', {
		templateUrl: 'spa/pages/authentication/partials/login.html',
		controller: 'loginController',
		resolve: {
            is_logged_in: function(firebase, $route, $location, $q) {
            	var deferred = $q.defer();
            	var is_logged_in = false;
            	var check = function(){
            		var user = firebase.auth().currentUser;
            		console.log(JSON.stringify(user));
            		if (user != null) {
            			console.log("is logged in");
            			is_logged_in = true;
            			location.path("/myvault");
            			$rootScope.$on('$locationChangeSuccess', function (next, current) {
                    		deferred.resolve();
                		});
            		} else {
            			deferred.resolve();
            		};
            	}
                return check();
            },
        }
	})
	.when('/reset-password', {
		templateUrl: 'resetPassword.html',
		controller: 'usersController'
	})
	.when('/ux', {
		templateUrl: 'spa/pages/ux-test/partials/ux.html',
		controller: 'uxController'
	})

	//fallback when no routes are matched
	.otherwise({
		redirectTo: '/'
	});
	//fallback when no routes are matched

	$locationProvider.hashPrefix('');

	// use the HTML5 History API
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: true
	});
});







