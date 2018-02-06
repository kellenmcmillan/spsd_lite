'use strict';

angular.module('folder', [
'ngResource', 
'ngAnimate', 
'ngSanitize', 
'imageGalleryService'
])
.controller('folderController', [
'$rootScope', 
'$scope', 
'$compile', 
'$location', 
'$timeout', 
'$window', 
'$anchorScroll', 
'$routeParams', 
'image_galleries', 
function (
$rootScope, 
$scope, 
$compile, 
$location,
$timeout, 
$window, 
$anchorScroll, 
$routeParams, 
image_galleries)
{
    
    var url_param = $routeParams.url_param;
    var item;
    var internal_slideshow_length = 0;
    var continue_looping = true;
    var imageGalleries = {};
    // listeners to broadcast on scope
    $rootScope.$on('$locationChangeStart', function(event, args) {
        var location_path = $location.path();
        var location = JSON.stringify(location_path);
        console.log(location);
        if(location_path.indexOf("/gallery/") > 0){
            for(let i = 0, l = $rootScope.all_galleries.length; i < l && continue_looping == true; i++) {
                console.log("looking for gallery");
                var raw_url = $rootScope.all_galleries[i].url;
                var url = JSON.stringify(raw_url);
                console.log("raw url " + raw_url);
                console.log("url stringified " + url);
                if(url.indexOf(url_param) > 0){
                    console.log("found the gallery to display!");
                    continue_looping = false;
                    item = $rootScope.all_galleries[i];
                    $rootScope.pageTitle = item.name;
                    $scope.folder = item;
                    internal_slideshow_length = item.images.length;
                    $scope.slideshow_length = internal_slideshow_length;
                }
            }
        }
    });

    $scope.lightbox_active = true;
    $scope.isOpen = true;
    var slideshowStarting = true;       
    var internal_slideshow_timeout;
    var slide_count = -1;
    var starting_position = 0;
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
            var curtain_height = $window.innerHeight - angular.element('.portfolio-nav--row').height();
            var curtain_width = $window.innerWidth;
            var lightbox_image_height = element.height();
            var lightbox_image_width = element.width();
            var marginTopVariable = (curtain_height/2) - (lightbox_image_height/2);
            var marginLeftVariable = (curtain_width/2) - (lightbox_image_width/2);
            element.css('top', marginTopVariable + 'px');
            element.css('margin-left', marginLeftVariable + 'px');
        });
        angular.element($window).bind('resize', function(){
            var curtain_height = $window.innerHeight - angular.element('.portfolio-nav--row').height();
            var curtain_width = $window.innerWidth;
            var lightbox_image_height = element.height();
            var lightbox_image_width = element.width();
            var marginTopVariable = (curtain_height/2) - (lightbox_image_height/2);
            var marginLeftVariable = (curtain_width/2) - (lightbox_image_width/2);
            element.css('top', marginTopVariable + 'px');
            element.css('margin-left', marginLeftVariable + 'px');
        });
    }
    
}]);


