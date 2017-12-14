'use strict';

var staffDataService = angular.module('staffDataService', []);

staffDataService.factory('staff', ['$http', function($http){
    return {
        get: function () {
            return $http.get('/api/router/staffData');
        }
    }
}]);

