'use strict';

var thirdParallaxDataService = angular.module('thirdParallaxDataService', []);

thirdParallaxDataService.factory('third_parallax_data', ['$http', function($http){
    return {
        get: function () {
            return $http.get('/api/router/thirdParallaxData');
        }
    }
}]);