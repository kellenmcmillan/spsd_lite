'use strict';

angular.module('folders', ['ngResource', 'ngAnimate', 'ngSanitize', 'imageGalleryService'])

.controller('directoryController', ['$rootScope', '$scope', '$compile', '$location', '$timeout', '$window', '$anchorScroll', '$routeParams', 'image_galleries', function ($rootScope, $scope, $compile, $location, $timeout, $window, $anchorScroll, $routeParams, image_galleries){
    
    $rootScope.pageTitle = "Galleries";
    var galleries = [];
    //Image Galleries
    var imageGalleries = {};
    image_galleries.get()
    .success(function(data) { 
        imageGalleries = data.data[0];
        $scope.primary_gallery = imageGalleries;
        // sort galleries & cover images
        for(let i = 0, l = $scope.primary_gallery.content.lists.length; i < l; i++) {
            var gallery = $scope.primary_gallery.content.lists[i].content;
            var gallery_details = $scope.primary_gallery.content.lists[i].details;
            for(let c = 0, length = gallery.length; c < length; c++) {
                var image = gallery[c];
                var details = gallery_details;
                if(image.is_cover == true){
                    var gallery_package = {};
                    gallery_package.url_param = details.param;
                    gallery_package.title = details.name;
                    gallery_package.description = details.description;
                    gallery_package.hi_res = image.hi_res;
                    gallery_package.landscape = image.landscape;
                    gallery_package.thumbnail = image.thumbnail;
                    galleries.push(gallery_package);
                }
            }
        }
        // sort galleries & cover images
        $scope.galleries = galleries;
    }) 
    .error(function(err) { 
        console.log(err);
        return err; 
    });
    //Image Galleries


    //////////////////////////////////////////////////////////
    //use this code whenever I want MDL to load via controller
    angular.element(document).ready( 
        function() {
            componentHandler.upgradeAllRegistered();
        }
    );
    //////////////////////////////////////////////////////////
    //use this code whenever I want MDL to load via controller

}])
.directive('portfolioCloserLookOverlayContent', ['$window', '$timeout', function($window, $timeout){

  return {
    link: link,
    restrict: 'A'
  };

  function link(scope, element, attrs){
    $timeout(
    function(){
    var thumb_number = attrs.thumb;
    var thumb_class = '.thumb' + thumb_number;
    var thumbnail_size = angular.element('.thumb-' + thumb_number).height();
    var overlay_content = angular.element('.lightweight-portfolio--closer-look-overlay-container').height();
    var marginTopVariable = (thumbnail_size/2) - (overlay_content/2);
    element.css('margin-top', marginTopVariable + 'px');
    }, 300);
    angular.element($window).bind('resize', function(){
        var thumb_number = attrs.thumb;
        var thumb_class = '.thumb' + thumb_number;
        var thumbnail_size = angular.element('.thumb-' + thumb_number).height();
        var overlay_content = angular.element('.lightweight-portfolio--closer-look-overlay-container').height();
        var marginTopVariable = (thumbnail_size/2) - (overlay_content/2);
        element.css('margin-top', marginTopVariable + 'px');
        scope.$digest();
    });
  }
}]);


