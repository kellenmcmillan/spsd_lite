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
	  .when('/#welcome', {
		templateUrl: 'frontend/home_page/partials/index.html',
		controller: 'homeController'
	  })
	  .when('/portfolio/:id', {
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
		redirectTo: '/not-found'
	  //fallback when no routes are matched
	  });

	// use the HTML5 History API
	$locationProvider.html5Mode({
	  enabled: true,
	  requireBase: true
	});

})
.run(["$rootScope", "$location", "$http", "frontend", "$sce", function ($rootScope, $location, $http, frontend, $sce) {

	// pulls relevant page data from appData Stream
    frontend.query()
    .$promise.then(function(data) {
        var view_data = data[0];
        $rootScope.app_data = data[0];
        $rootScope.miniAppName = view_data.app_configs.name;
        $rootScope.google_address_link = view_data.app_configs.address.google_address_link;
        $rootScope.trusted_google_address_widget_map = $sce.trustAsResourceUrl(view_data.app_configs.address.google_map_widget);
        $rootScope.company_address_one = view_data.app_configs.address.info.street + ", " + view_data.app_configs.address.info.city +", " + view_data.app_configs.address.info.state + " " + view_data.app_configs.address.info.zipcode;
    });
    // pulls relevant page data from appData Stream

}]);








