'use strict';

var servicePageDataService = angular.module('servicePageDataService', []);

servicePageDataService.factory('service_page_data', ['$http', function($http){
    return {
        get: function () {
            return $http.get('/api/router/servicePageData');
        }
    }
}]);