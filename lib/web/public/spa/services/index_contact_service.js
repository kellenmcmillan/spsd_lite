'use strict';

var indexContactDataService = angular.module('indexContactDataService', []);

indexContactDataService.factory('index_contact', ['$http', function($http){
    return {
        get: function () {
            return $http.get('/api/router/contactData');
        }
    }
}]);

