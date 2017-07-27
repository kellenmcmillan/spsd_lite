'use strict';

var home = angular.module('home', ['lightweightColor', 'scrollPosition'])

.controller('homeController', ['$rootScope', '$scope', '$compile', '$window', '$interval', '$timeout', function ($rootScope, $scope, $compile, $window, $interval, $timeout){
    
    $rootScope.editable = false;
    $rootScope.is_stretched = true;
    var w = angular.element($window);

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
    $rootScope.pageTitle = page.name;
    $scope.second_offset = ($window.innerHeight * 2)*.2 - 200;

    $(window).resize(function() {
        $scope.second_offset = ($window.innerHeight * 2)*.2 - 200;
    });

    var slideshow_length = $scope.primary_slideshow_hero.slides.length;
    var visible_slide = -1;
    var slideshowStarting = true;       
    var slideshow_timeout;
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
;



