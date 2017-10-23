'use strict';

angular.module('folder', ['ngResource', 'ngAnimate', 'ngSanitize', 'imageGalleryService'])

.controller('folderController', ['$rootScope', '$scope', '$compile', '$location', '$timeout', '$window', '$anchorScroll', '$routeParams', 'image_galleries', function ($rootScope, $scope, $compile, $location, $timeout, $window, $anchorScroll, $routeParams, image_galleries){
    
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
                var details = gallery_details[c];
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
    }) 
    .error(function(err) { 
        console.log(err);
        return err; 
    });
    //Image Galleries

    var url_param = $routeParams.url_param;
    var items = galleries;
    var item;

    for(let o = 0, l = items.length; o < l; o++) {
        if(items[o].url_param == url_param){
            item = items[o];
        }
    }

    // pulls relevant page data from appData Stream
    $rootScope.pageTitle = item.title;
    $scope.folder = item;
    $scope.lightbox_active = true;

    var slideshowStarting = true;       
    var internal_slideshow_timeout;
    var slide_count = -1;
    var starting_position = 0;
    var internal_slideshow_length = item.images.length;
    $scope.slideshow_length = internal_slideshow_length;
    var internal_slide_control_touched = false;
    var control_freshness;

    var internalSlideshowEngineRev = function() {

        slide_count++;

        if (slideshowStarting && slide_count !== -1){
            slideshowStarting = false;
            $scope.slide_count = 0;
        } else if (slide_count < internal_slideshow_length && slide_count > 0){
            $scope.slide_count = slide_count; 
        } else if (slide_count < 0){
            slide_count = internal_slideshow_length - 1;
            $scope.slide_count = slide_count;
        } else {
            slide_count = 0;
            $scope.slide_count = 0;
        }

        control_freshness = $timeout(function(){
            internal_slide_control_touched = false;
        }, 500);

        internal_slideshow_timeout = $timeout(function(){
            internalSlideshowEngineRev();
        }, 6000);

    }

    internalSlideshowEngineRev();

    $scope.left_slideshow_control = function(){
        if (internal_slide_control_touched == false){
            internal_slide_control_touched = true;
            $timeout.cancel(internal_slideshow_timeout);
            slide_count = slide_count - 2;
            internalSlideshowEngineRev();
        }
    }
    $scope.right_slideshow_control = function(){
        if (internal_slide_control_touched == false){
            internal_slide_control_touched = true;
            $timeout.cancel(internal_slideshow_timeout);
            internalSlideshowEngineRev();
        }
    }

    

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
}])
.directive('lightboxImage', ['$window', '$location', '$timeout', function($window, $location, $timeout){

    return {
        link: link,
        restrict: 'A'
    };

    function link(scope, element, attrs){
        element.on("load", function(){
            var curtain = $window.innerHeight - angular.element('.portfolio-nav--row').height();
            var lightbox_image = element.height();
            var marginTopVariable = (curtain/2) - (lightbox_image/2);
            element.css('top', marginTopVariable + 'px');
        });
        angular.element($window).bind('resize', function(){
            var curtain = $window.innerHeight - angular.element('.portfolio-nav--row').height();
            var lightbox_image = element.height();
            var marginTopVariable = (curtain/2) - (lightbox_image/2);
            element.css('top', marginTopVariable + 'px');
        });
    }
    
}]);


