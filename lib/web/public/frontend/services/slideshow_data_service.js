'use strict';

var slideshowDataService = angular.module('slideshowDataService', []);

slideshowDataService.factory('slideshow', ['$http', function($http){
    return {
        get: function () {
            return $http.get('/api/router/appData');
        }
    }
}]);

