'use strict';

var firstParallaxDataService = angular.module('firstParallaxDataService', []);

firstParallaxDataService.factory('first_parallax_data', ['$http', function($http){
    return {
        get: function () {
            return $http.get('/api/router/thirdParallaxData');
        }
    }
}]);