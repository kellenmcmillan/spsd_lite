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
  'capabilities'
])

.config(function ($routeProvider, $locationProvider, angularAuth0Provider) {

	$routeProvider
	// frontend
	.when('/', {
		templateUrl: 'frontend/home/partials/index.html',
		controller: 'homeController'
	})
	.when('/gallery/:url_param', {
		templateUrl: 'frontend/pages/gallery/partials/folder.html',
		controller: 'folderController'
	})
	.when('/gallery', {
		templateUrl: 'frontend/pages/gallery/partials/folders.html',
		controller: 'directoryController'
	})
	.when('/capabilities/:url_param', {
		templateUrl: 'frontend/pages/capabilities/partials/capabilities.html',
		controller: 'capabilitiesController'
	})
	.when('/meet-our-team', {
		templateUrl: 'frontend/pages/team/partials/team.html',
		controller: 'teamController'
	})
	.when('/ux', {
		templateUrl: 'frontend/pages/ux-test/partials/ux.html',
		controller: 'uxController'
	})
	.when('/not-found', {
		templateUrl: 'frontend/pages/errors/partials/404.html',
		controller: 'notFoundController'
	})
	// frontend
	
	// backend
	.when ('/myvault', {
		templateUrl: 'frontend/pages/partials/myvault.html',
		controller: 'myvaultController'
	})
	// backend

	//fallback when no routes are matched
	.otherwise({
		redirectTo: '/'
	});
	//fallback when no routes are matched

	// Initialization for the angular-auth0 library
	angularAuth0Provider.init({
		clientID: 'exVuQY0xQKr6hkrSyugNSGK0k3UTsexX',
		domain: 'spsd.auth0.com',
		responseType: 'token id_token',
		audience: 'https://spsd.auth0.com/userinfo',
		redirectUri: 'https://www.spsd.com/myvault',
		scope: 'openid profile'
	});

	// use the HTML5 History API
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: true
	});
});







