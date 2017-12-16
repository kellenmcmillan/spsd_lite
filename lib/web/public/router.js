'use strict';

angular.module('lightweightAppRouting', [
  'ngRoute',
  'ngResource', 
  'ngAnimate',
  'auth0.auth0', 
  'loading',
  'colorPalette', 
  'dynamicSizing',
  'main', 
  'home', 
  'folder',
  'folders',
  'team',
  'uxTest',
  'notFound',
  'capabilities', 
  'callback',
  'myvault'
])

.config(function ($routeProvider, $locationProvider, angularAuth0Provider, jwtOptionsProvider) {

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
	.when('/ux', {
		templateUrl: 'spa/pages/ux-test/partials/ux.html',
		controller: 'uxController'
	})
	.when('/not-found', {
		templateUrl: 'spa/pages/errors/partials/404.html',
		controller: 'notFoundController'
	})
	.when('/callback', {
		templateUrl: 'spa/pages/callback/partials/callback.html',
		controller: 'callbackController'
	})
	// frontend routes
	
	// backend
	.when ('/myvault', {
		templateUrl: 'spa/pages/partials/myvault.html',
		controller: 'myvaultController'
	})
	// backend

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







