'use strict';

var indexServiceDataService = angular.module('indexServiceDataService', []);

indexServiceDataService.factory('index_service', ['$http', function($http){
    return {
        get: function () {
            return $http.get('/api/router/getFeaturedServicesData');
        }
    }
}]);

