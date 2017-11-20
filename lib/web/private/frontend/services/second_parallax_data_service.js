'use strict';

var secondParallaxDataService = angular.module('secondParallaxDataService', []);

secondParallaxDataService.factory('second_parallax_data', ['$http', function($http){
    return {
        get: function () {
            return $http.get('/api/router/secondParallaxData');
        }
    }
}]);