'use strict';

angular.module('routeController', [
  'ngRoute',
  'ngResource',
  'rootCtrl',
  'lightweight',
  'colorPalette',
  'landing',
  'info',
  'bloglist',
  'blog',
  'announcement',
  'spotlight',
  'projects',
  'project',
  'folders',
  'folder',
  'team',
  'resource',
  'explore',
  'login',
  'loading'
])

.config(function ($routeProvider, $locationProvider) {

	$routeProvider
	.when('/', {
		templateUrl: 'application/landing/partials/landing.html',
		controller: 'landingPageController'
	})
	.when('/gallery/:url_param', {
		templateUrl: 'application/pages/gallery/partials/folder_2.html',
		controller: 'folderController'
	})
	.when('/gallery', {
		templateUrl: 'application/pages/gallery/partials/folders.html',
		controller: 'directoryController'
	})
	.when('/meet-our-team', {
		templateUrl: 'application/pages/team/partials/team-template.html',
		controller: 'teamController'
	})
	.when('/info/:pageId', {
		templateUrl: 'application/pages/info/partials/info-template.html',
		controller: 'infoController'
	})
	.when('/blog', {
		templateUrl: 'application/pages/posts/partials/blog-list-template.html',
		controller: 'bloglistController'
	})
	.when('/blog/:pageId', {
		templateUrl: 'application/pages/posts/partials/blog-template.html',
		controller: 'blogController'
	})
	.when('/projects', {
		templateUrl: 'application/pages/projects/partials/project-list-template.html',
		controller: 'projectsController'
	})
	.when('/projects/:pageId', {
		templateUrl: 'application/pages/projects/partials/project-template.html',
		controller: 'projectController'
	})
	// .when('/announcement/:pageId', {
	// 	templateUrl: 'application/pages/announcement/partials/announcement-template.html',
	// 	controller: 'announcementController'
	// })
	.when('/spotlight/:pageId', {
		templateUrl: 'application/pages/spotlight/partials/spotlight-template.html',
		controller: 'spotlightController'
	})
	.when('/resource/:pageId', {
		templateUrl: 'application/pages/resource/partials/resource-template.html',
		controller: 'resourceController'
	})
	.when('/explore/:pageId', {
		templateUrl: 'application/pages/explore/partials/explore-template.html',
		controller: 'exploreController'
	})
	.when('/login', {
		templateUrl: 'application/pages/authentication/partials/login.html',
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
	.when('/signup', {
		templateUrl: 'application/pages/authentication/partials/signup.html',
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
	.when('/recover', {
		templateUrl: 'application/pages/authentication/partials/recover.html',
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
	.when('/reset', {
		templateUrl: 'application/pages/authentication/partials/reset.html',
		controller: 'loginController'
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







