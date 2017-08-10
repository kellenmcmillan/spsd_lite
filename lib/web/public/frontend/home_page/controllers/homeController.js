'use strict';

var home = angular.module('home', ['lightweightColor', 'scrollPosition'])

.controller('homeController', ['$rootScope', '$scope', '$compile', '$window', '$interval', '$timeout', function ($rootScope, $scope, $compile, $window, $interval, $timeout){
    
    $rootScope.editable = false;
    var w = angular.element($window);
    var featured_galleries = [];

    // pulls relevant page data from appData Stream
    for(let i = 0, l = $rootScope.app_data.home_page_configs.length; i < l; i++) {
        var pages = $rootScope.app_data.home_page_configs;
        if(pages[i].name == "SPSD Home"){
            var page = pages[i];
        }
    }
    // pulls relevant page data from appData Stream
    $scope.primary_slideshow_hero = page.primary_slideshow_hero;
    $scope.primary_standard_container = page.primary_standard_container;
    $scope.primary_gallery = page.primary_gallery;
    $scope.secondary_standard_container = page.secondary_standard_container;
    $scope.primary_blog_feed = page.primary_blog_feed;
    $scope.tertiary_standard_container = page.tertiary_standard_container;
    $scope.quaternary_standard_container = page.quaternary_standard_container;
    $rootScope.pageTitle = page.name;
    $scope.featured_galleries = featured_galleries;
    $scope.primary_contact = page.primary_contact;
    
    var slideshow_length = $scope.primary_slideshow_hero.component_data.slides.length;
    var visible_slide = -1;
    var slideshowStarting = true;       
    var slideshow_timeout;

    $timeout(function(){
        var a = angular.element('.primary-slideshow').height();
        var b = angular.element('.quaternary-mission').height();
        var c = angular.element('.primary-parallax').height();
        var d = angular.element('.primary-gallery').height();
        var e = angular.element('.secondary-parallax').height();
        var f = angular.element('.primary-blog-feed').height();
        var g; // C == Element Distance From Top
        var h; // D == Half Scroll Distance From Top == 50% Scroll Distance Over Time
        var j; // C == Element Distance From Top
        var k; // D == Half Scroll Distance From Top == 50% Scroll Distance Over Time
        var l; // C == Element Distance From Top
        var m; // D == Half Scroll Distance From Top == 50% Scroll Distance Over Time
        var result_1;
        var result_2;
        var result_3;
        g = a + b; // Sum Of Elements' Height
        h = g/2;
        result_1 = -1 * h;
        $scope.first_offset = result_1 - 50;
        j = g + c + d; // Sum Of Elements' Height
        k = j/2;
        result_2 = -1 * k;
        $scope.second_offset = result_2 - 50;
        l = j + e + f; // Sum Of Elements' Height
        m = l/2;
        result_3 = -1 * m;
        $scope.third_offset = result_3 - 50;
    }, 1000);

    $(window).resize(function() {
        $timeout(function(){
            var a = angular.element('.primary-slideshow').height();
            var b = angular.element('.quaternary-mission').height();
            var c = angular.element('.primary-parallax').height();
            var d = angular.element('.primary-gallery').height();
            var e = angular.element('.secondary-parallax').height();
            var f = angular.element('.primary-blog-feed').height();
            var g; // C == Element Distance From Top
            var h; // D == Half Scroll Distance From Top == 50% Scroll Distance Over Time
            var j; // C == Element Distance From Top
            var k; // D == Half Scroll Distance From Top == 50% Scroll Distance Over Time
            var l; // C == Element Distance From Top
            var m; // D == Half Scroll Distance From Top == 50% Scroll Distance Over Time
            var result_1;
            var result_2;
            var result_3;
            g = a + b; // Sum Of Elements' Height
            h = g/2;
            result_1 = -1 * h;
            $scope.first_offset = result_1 - 50;
            j = g + c + d; // Sum Of Elements' Height
            k = j/2;
            result_2 = -1 * k;
            $scope.second_offset = result_2 - 50;
            l = j + e + f; // Sum Of Elements' Height
            m = l/2;
            result_3 = -1 * m;
            $scope.third_offset = result_3 - 50;
        }, 1000);
    });
    // sort featured galleries
    for(let i = 0, l = $scope.primary_gallery.component_data.galleries.length; i < l; i++) {
        var gallery = $scope.primary_gallery.component_data.galleries[i];
        if(gallery.is_featured == true){
            for(let c = 0, length = gallery.images.length; c < length; c++) {
                var image = gallery.images[c];
                if(image.is_cover_image == true){
                    var image_package = {};
                    image_package.url_param = gallery.url_param;
                    image_package.title = gallery.title;
                    image_package.description = gallery.description;
                    image_package.landscape = image.landscape;
                    image_package.thumbnail = image.thumbnail;
                    featured_galleries.push(image_package);
                }
            }
        }
    }
    // sort featured galleries
    $scope.end_vertical_animate = false;

    $scope.left_slideshow_control = function(){
        $timeout.cancel(slideshow_timeout);
        visible_slide = visible_slide - 2;
        slideshowEngineRev();
    }
    $scope.right_slideshow_control = function(){
        $timeout.cancel(slideshow_timeout);
        slideshowEngineRev();
    }       

    var slideshowEngineRev = function() {
        $scope.end_vertical_animate = false;
        $timeout(function(){
            $scope.end_vertical_animate = true;
        }, 4000);
        slideshow_timeout = $timeout(function(){
            slideshowEngineRev()
        }, $scope.primary_slideshow_hero.component_transition_speed);

        visible_slide++;
        if (slideshowStarting && visible_slide !== -1){
            slideshowStarting = false;
            $scope.visible_slide = 0;
        } else if (visible_slide < slideshow_length && !slideshowStarting && visible_slide > 0){
            $scope.visible_slide = visible_slide;
        } else if (visible_slide < 0){
            visible_slide = slideshow_length - 1;
            $scope.visible_slide = visible_slide;
        } else {
            visible_slide = 0;
            $scope.visible_slide = 0;
        }
    }

    slideshowEngineRev();    

    //////////////////////////////////////////////////////////
    //use this code whenever I want MDL to load via controller
    angular.element(document).ready( 
        function() {
            componentHandler.upgradeAllRegistered();
        }
    );
    //////////////////////////////////////////////////////////
    //use this code whenever I want MDL to load via controller

    $scope.featured_first = function(value){
        switch(value){
            case 0:
                return true;
                break;
            case 1:
                return true;
                break;
            case 4:
                return true;
                break;
            case 5:
                return true;
                break;
            default:
                return false;
        }
    }

    $scope.featured_second = function(value){
        switch(value){
            case 2:
                return true;
                break;
            case 3:
                return true;
                break;
            default:
                return false;
        }
    }

}])
.directive('portfolioOverlayContent', ['$window', '$timeout', function($window, $timeout){

  return {
    link: link,
    restrict: 'A'
  };

  function link(scope, element, attrs){
    $timeout(
    function(){
    var thumbnail_size = angular.element('.portfolio_item').height();
    var overlay_content = angular.element('.lightweight-portfolio--content-overlay-container').height();
    var marginTopVariable = (thumbnail_size/2) - (overlay_content/2);
    element.css('margin-top', marginTopVariable + 'px');
    }, 300);
    angular.element($window).bind('resize', function(){
      var thumbnail_size = angular.element('.portfolio_item').height();
      var overlay_content = angular.element('.lightweight-portfolio--content-overlay-container').height();
      var marginTopVariable = (thumbnail_size/2) - (overlay_content/2);
      element.css('margin-top', marginTopVariable + 'px');
      scope.$digest();
    });
  }
}])
.directive('clickGo', ['$location', function($location){

    return {
        link: link,
        restrict: 'A'
      };
    
    function link(scope, element, attrs){
        element.on("click", function(){ 
            $location.path(attrs.clickGo)
        });
    }
    
}])
.directive('contentAvailable', ['$location', function($location){

    return {
        link: link,
        restrict: 'A'
      };
    
    function link(scope, element, attrs){
        element.on("load", function(){

            $('#default-page-loading').fadeOut('slow');

        });
    }
}])
;



