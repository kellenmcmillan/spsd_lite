'use strict';

var home = angular.module('home', [
'lightweightColor', 
'scrollPosition', 
'duScroll'
])
.controller('homeController', [
'$rootScope', 
'$scope', 
'$compile', 
'$window', 
'$route',
'$interval', 
'$timeout', 
"$location",
function (
$rootScope, 
$scope, 
$compile, 
$window, 
$route, 
$interval, 
$timeout, 
$location)
{
    

    var w = angular.element($window);
    
    // operational timeouts 
    var slideshow_timeout;
    var parallax_timeout;
    var navigation_range_timeout;
    var item;
    var slideshow_length = 0;
    var slideshow_speed = 0;
    // operational timeouts

    // Hero Slideshow Variables
    var visible_slide = -1;
    var slideshowStarting = true;
    var continue_looping = true;
    // Hero Slideshow Variables

    //slideshow Hero

    var slideshowInit = function(){
        if ($rootScope.all_galleries){
            if ($rootScope.all_galleries.length > 0){
                load_slideshow();
            }
        }
    }
    var load_slideshow = function(){
        
        for(let i = 0, l = $rootScope.all_galleries.length; i < l && continue_looping == true; i++) {
            var raw_name = $rootScope.all_galleries[i].name;
            var name = JSON.stringify(raw_name);
            if(name.indexOf("Slideshow") > 0){
                continue_looping = false;
                item = $rootScope.all_galleries[i];
                $scope.primary_slideshow_hero = item;
                slideshow_length = item.images.length;
            }
        }

        slideshow_speed = $scope.primary_slideshow_hero.transition * 1000;
        // Slideshow Timer
        var slideshowEngineRev=function(){$scope.end_vertical_animate=!1,$timeout(function(){$scope.end_vertical_animate=!0},4e3),slideshow_timeout=$timeout(function(){slideshowEngineRev()},slideshow_speed),visible_slide++,slideshowStarting&&-1!==visible_slide?(slideshowStarting=!1,$scope.visible_slide=0):visible_slide<slideshow_length&&!slideshowStarting&&visible_slide>0?$scope.visible_slide=visible_slide:visible_slide<0?(visible_slide=slideshow_length-1,$scope.visible_slide=visible_slide):(visible_slide=0,$scope.visible_slide=0)};
        // Slideshow Timer
        slideshowEngineRev();

    }
    slideshowInit();
    $rootScope.$on('galleries_loaded', function(event, args) {
        load_slideshow();
    });

    // pulls relevant page data from appData Stream
    $rootScope.pageTitle = "SPSD Home";
    // pulls relevant page data from appData Stream
    
    // Navigation Active Handler
    $scope.clearActiveLinks = function(){
        var sections = angular.element(".lightweight-navigation-link");
        sections.removeClass('active');
    }
    // Navigation Active Handler

    //Navigation scroll Spy
    navigation_range_timeout = $timeout(function(){
        $scope.slideshow_top = 0;
        $scope.slideshow_bottom = angular.element('.slideshow').height() - 100;
        $scope.mission_top = $scope.slideshow_bottom + 1;
        $scope.mission_bottom = $scope.mission_top + angular.element('.mission').height();
        $scope.parallaxOneTop = $scope.mission_bottom + 1;
        $scope.parallaxOneBottom = $scope.parallaxOneTop + angular.element('.parallax-one').height() - 5;
        $scope.products_top = $scope.parallaxOneBottom + 1;
        $scope.products_bottom = $scope.products_top + angular.element('.featured-products').height();
        $scope.parallaxTwoTop = $scope.products_bottom + 1;
        $scope.parallaxTwoBottom = $scope.parallaxTwoTop + angular.element('.parallax-two').height();
        $scope.featured_gallery_top = $scope.parallaxTwoBottom + 1;
        $scope.featured_gallery_bottom = $scope.featured_gallery_top + angular.element('.primary-gallery').height() - 96;
        $scope.parallaxThreeTop = $scope.featured_gallery_bottom + 1;
        $scope.parallaxThreeBottom = $scope.parallaxThreeTop + angular.element('.parallax-three').height();
        $scope.map_container_top = $scope.parallaxThreeBottom + 1;
        $scope.map_container_bottom = $scope.map_container_top + angular.element('.map').height();
        $scope.contact_container_top = $scope.map_container_bottom + 1;
        $scope.contact_container_bottom = $scope.contact_container_top + angular.element('.primary-contact').height();
        $scope.end_of_page_beginning = $scope.contact_container_bottom - 300;
        }, 3500);

    $(window).resize(function() {
        navigation_range_timeout = $timeout(function(){
        $scope.slideshow_top = 0;
        $scope.slideshow_bottom = angular.element('.slideshow').height() - 100;
        $scope.mission_top = $scope.slideshow_bottom + 1;
        $scope.mission_bottom = $scope.mission_top + angular.element('.mission').height();
        $scope.parallaxOneTop = $scope.mission_bottom + 1;
        $scope.parallaxOneBottom = $scope.parallaxOneTop + angular.element('.parallax-one').height() - 5;
        $scope.products_top = $scope.parallaxOneBottom + 1;
        $scope.products_bottom = $scope.products_top + angular.element('.featured-products').height();
        $scope.parallaxTwoTop = $scope.products_bottom + 1;
        $scope.parallaxTwoBottom = $scope.parallaxTwoTop + angular.element('.parallax-two').height();
        $scope.featured_gallery_top = $scope.parallaxTwoBottom + 1;
        $scope.featured_gallery_bottom = $scope.featured_gallery_top + angular.element('.primary-gallery').height() - 96;
        $scope.parallaxThreeTop = $scope.featured_gallery_bottom + 1;
        $scope.parallaxThreeBottom = $scope.parallaxThreeTop + angular.element('.parallax-three').height();
        $scope.map_container_top = $scope.parallaxThreeBottom + 1;
        $scope.map_container_bottom = $scope.map_container_top + angular.element('.map').height();
        $scope.contact_container_top = $scope.map_container_bottom + 1;
        $scope.contact_container_bottom = $scope.contact_container_top + angular.element('.primary-contact').height();
        $scope.end_of_page_beginning = $scope.contact_container_bottom - 300;
        }, 1000);
    });
    //Navigation scroll Spy
    
    $scope.end_vertical_animate = false;

    //slideshow Controls
    $scope.left_slideshow_control = function(){
        $timeout.cancel(slideshow_timeout);
        visible_slide = visible_slide - 2;
        slideshowEngineRev();
    }
    $scope.right_slideshow_control = function(){
        $timeout.cancel(slideshow_timeout);
        slideshowEngineRev();
    }
    //slideshow Controls      

    

    //////////////////////////////////////////////////////////
    //use this code whenever I want MDL to load via controller
    angular.element(document).ready( 
        function() {
            componentHandler.upgradeAllRegistered();
        }
    );
    //////////////////////////////////////////////////////////
    //use this code whenever I want MDL to load via controller


    // Sort Featured Galleries
    $scope.featured_first = function(e){switch(e){case 0:case 1:case 4:case 5:return!0;default:return!1}};
    $scope.featured_second = function(e){switch(e){case 2:case 3:return!0;default:return!1}};
    // Sort Featured Galleries

    if ($rootScope.home_page_scroll_position > 0){
        var top = $rootScope.home_page_scroll_position;
        var duration = 300; //milliseconds
        //Scroll to the exact position
        angular.element('.mdl-layout__content').duScrollTop(top, duration);
    }

    $scope.$on("$locationChangeStart", function(){
        if($location.path == '/' & $rootScope.home_page_scroll_position > 0){
            return;
        } else if ($location.path !== '/'){
            $rootScope.home_page_scroll_position = $scope.scroll;
        }
    });

    $scope.$on("$destroy", function(){
        $timeout.cancel(slideshow_timeout);
        $timeout.cancel(navigation_range_timeout);
        $timeout.cancel(parallax_timeout);
    });
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
.directive('featuredGalleryContent', ['$window', '$timeout', function($window, $timeout){

  return {
    link: link,
    restrict: 'A'
  };

  function link(scope, element, attrs){
    $timeout(
    function(){
        var container = angular.element('.description').height();
        var content = angular.element('.description-content').height();
        var marginTopVariable = (container/2) - (content/2);
        element.css('margin-top', marginTopVariable + 'px');
    }, 300);
    angular.element($window).bind('resize', function(){
        var container = angular.element('.description').height();
        var content = angular.element('.description-content').height();
        var marginTopVariable = (container/2) - (content/2);
        element.css('margin-top', marginTopVariable + 'px');
        scope.$digest();
    });
  }
}])
;



