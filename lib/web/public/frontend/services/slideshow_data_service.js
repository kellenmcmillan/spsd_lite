'use strict';

var slideshowDataService = angular.module('slideshowDataService', []);

slideshowDataService.factory('slideshow', function(){
    return {
        get: function ($http) {
            return $http.get('/api/router/appData');
        }
    }
});

