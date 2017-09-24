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
  'unauthorized',
  'capabilities',
  'authentication',
  'authorization_service',
  'userVaultList',
  'app_lab'
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
	  .when('/backend/user_vault/user-list', {
		templateUrl: 'backend/user_vault/user-list/partials/user-tables.html',
		controller: 'usersListCtrl',
		resolve: { 
            permission: function(auth, $route) {
                return auth.permissionCheck([2]);
            }
        }
	  })
	  .when('/backend/user_vault/user/:user', {
		templateUrl: 'backend/user_vault/user-detail/partials/user-detail.html',
		controller: 'userDetailCtrl'
	  })
	  .when('/backend/user_vault/add-user', {
		templateUrl: 'backend/user_vault/user-add/partials/new-user.html'
	  })
	  .when('/backend/app_lab/editor', {
		templateUrl: 'backend/app_lab/index.html',
		controller: 'appLabController'
	  })
	  .when('/not-found', {
		templateUrl: 'frontend/interior_pages/errors/partials/404.html',
		controller: 'notFoundController'
	  })
	  .when('/unauthorized', {
		templateUrl: 'frontend/interior_pages/errors/partials/503.html',
		controller: 'unauthorizedController'
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







