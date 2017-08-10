'use strict';

angular.module('lightweightAppRouting', [
  'ngRoute',
  'ngTouch',
  'ngResource', 
  'ngAnimate', 
  'loading', 
  'colorPalette', 
  'dynamicSizing',
  'main', 
  'home', 
  'portfolio',
  'notFound',
  'unauthorized',
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
	  .when('/portfolio/:url_param', {
		templateUrl: 'frontend/interior_pages/portfolio/partials/folder.html',
		controller: 'portfolioCollectionController'
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
})
.run(function ($http, $rootScope, $location, $route) {

});







