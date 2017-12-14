'use strict';

var imageGalleryService = angular.module('imageGalleryService', []);

imageGalleryService.factory('image_galleries', ['$http', function($http){
    return {
        get: function () {
            return $http.get('/api/router/imageGalleries');
        }
    }
}]);

