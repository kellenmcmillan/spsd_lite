'use strict';

var appDataService = angular.module('appDataService', ['ngResource', 'ngRoute']);

appDataService.factory('frontend', ['$resource',
function($resource){
    return $resource('/api/router/appData', {}, {
        query: {method:'GET', isArray: true}
    });
}]);

// function getData() {  
//     var deferred = $q.defer();
//     async(deferred.resolve, deferred.reject);
//     return deferred.promise;
// }

