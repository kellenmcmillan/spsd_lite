'use strict';

var usersListService = angular.module('usersListService', ['ngResource', 'ngRoute']);

usersListService.factory('Users', ['$resource',
function($resource){
	return $resource('/api/router/users', {}, {
		query: {method:'GET', isArray:true}
	});
}]);