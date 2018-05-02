'use strict';

angular.module('lightweightAppRouting', [
  'ngRoute',
  'ngResource', 
  'ngAnimate', 
  'loading',
  'colorPalette', 
  'dynamicSizing',
  'main',
  'lightweight', 
  'home',
  'info',
  'announcement',
  'spotlight', 
  'folder',
  'folders',
  'team',
  'login',
  'userVault',
  'mediaVault'
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
	.when('/info/:pageId', {
		templateUrl: 'spa/pages/info/partials/info-template.html',
		controller: 'infoController'
	})
	.when('/announcement/:pageId', {
		templateUrl: 'spa/pages/announcement/partials/announcement-template.html',
		controller: 'announcementController'
	})
	.when('/highlight/:pageId', {
		templateUrl: 'spa/pages/highlight/partials/highlight-template.html',
		controller: 'highlightController'
	})
	.when('/blog/:pageId', {
		templateUrl: 'spa/pages/blog/partials/blog-template.html',
		controller: 'blogController'
	})
	.when('/blog/:pageId/:postId', {
		templateUrl: 'spa/pages/blog/partials/blog-post-template.html',
		controller: 'blogController'
	})
	.when('/steps/:pageId', {
		templateUrl: 'spa/pages/steps/partials/steps-template.html',
		controller: 'stepsController'
	})
	.when('/spotlight/:pageId', {
		templateUrl: 'spa/pages/spotlight/partials/spotlight-template.html',
		controller: 'spotlightController'
	})
	.when('/meet-our-team', {
		templateUrl: 'spa/pages/team/partials/team.html',
		controller: 'teamController'
	})
	.when('/login', {
		templateUrl: 'spa/pages/authentication/partials/login.html',
		controller: 'loginController',
		resolve: {
            is_logged_in: function(firebase, $rootScope, $route, $location, $q) {
            	var deferred = $q.defer();
            	$rootScope.auth.$onAuthStateChanged(function(user) {
            		if (user != null) {
            			$location.path("/");
            			$rootScope.$on('$locationChangeSuccess', function (next, current) {
                    		deferred.resolve();
                		});
            		} else {
            			deferred.resolve();
            		};
            	});
            },
        }
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







