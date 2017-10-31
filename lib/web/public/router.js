'use strict';

angular.module('lightweightAppRouting', [
  'ngRoute',
  // 'ngTouch',
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
  'notFound',
  'capabilities'
  ])

.config(function ($routeProvider, $locationProvider) {

	$routeProvider
	  .when('/', {
		templateUrl: 'frontend/home_page/partials/index.html',
		controller: 'homeController'
	  })
	  .when('/gallery/:url_param', {
		templateUrl: 'frontend/interior_pages/gallery/partials/folder.html',
		controller: 'folderController'
	  })
	  .when('/gallery', {
		templateUrl: 'frontend/interior_pages/gallery/partials/folders.html',
		controller: 'directoryController'
	  })
	  .when('/capabilities/:url_param', {
		templateUrl: 'frontend/interior_pages/capabilities/partials/capabilities.html',
		controller: 'capabilitiesController'
	  })
	  .when('/meet-our-team', {
		templateUrl: 'frontend/interior_pages/team/partials/team.html',
		controller: 'teamController'
	  })
	  .when('/ux', {
		templateUrl: 'frontend/interior_pages/ux-test/partials/ux.html',
		controller: 'uxController'
	  })
	  .when('/not-found', {
		templateUrl: 'frontend/interior_pages/errors/partials/404.html',
		controller: 'notFoundController'
	  })
	  .otherwise({
		redirectTo: '/'
	  //fallback when no routes are matched
	  });

	// use the HTML5 History API
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: true
	});
});







