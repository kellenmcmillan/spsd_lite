'use strict';

angular.module('folder', ['ngResource', 'ngAnimate', 'ngSanitize'])

.controller('folderController', ['$rootScope', '$scope', '$compile', '$location', '$timeout', '$window', '$anchorScroll', '$routeParams', function ($rootScope, $scope, $compile, $location, $timeout, $window, $anchorScroll, $routeParams){
    
    for(let i = 0, l = $rootScope.app_data.home_page_configs.length; i < l; i++) {
        var pages = $rootScope.app_data.home_page_configs;
        if(pages[i].name == "SPSD Home"){
            var page = pages[i];
        }
    }

    var url_param = $routeParams.url_param;
    var items = page.primary_gallery.component_data.galleries;
    var item;

    for(let o = 0, l = items.length; o < l; o++) {
        if(items[o].url_param == url_param){
            item = items[o];
        }
    }

    // pulls relevant page data from appData Stream
    $rootScope.pageTitle = item.title;
    $scope.folder = item;
    $scope.page = page;
    $scope.lightbox_active = true;

    var slideshowStarting = true;       
    var internal_slideshow_timeout;
    var slide_count = -1;
    var starting_position = 0;
    var internal_slideshow_length = item.images.length;
    var internal_slide_control_touched = false;

    var internalSlideshowEngineRev = function() {

        slide_count++;
        internal_slide_control_touched = false;

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

        console.log('engine ran once. slide count = ' + slide_count);

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
            console.log('left control actived. slide count = ' + slide_count);
            internalSlideshowEngineRev();
        }
    }
    $scope.right_slideshow_control = function(){
        if (internal_slide_control_touched == false){
            internal_slide_control_touched = true;
            $timeout.cancel(internal_slideshow_timeout);
            console.log('right control actived. slide count = ' + slide_count);
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
            var curtain = $window.innerHeight;
            var lightbox_image = element.height();
            var marginTopVariable = (curtain/2) - (lightbox_image/2);
            element.css('top', marginTopVariable + 'px');
        });
    }
    
}]);


