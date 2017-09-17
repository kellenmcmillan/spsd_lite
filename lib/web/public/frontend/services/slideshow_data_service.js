'use strict';

var slideshowDataService = angular.module('slideshowDataService', []);

slideshowDataService.factory('slideshow', [function($http){
    return {
        get: function () {
            return $http.get('/api/router/appData');
        }
    }
}]);

