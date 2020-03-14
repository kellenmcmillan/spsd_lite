'use strict';

var landing = angular.module('landing', [
'ngResource',
'ngMessages'
])
.controller('landingPageController', [
'$rootScope', 
'$scope',
'$timeout',
'$window',
function (
$rootScope, 
$scope,
$timeout,
$window
){

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


}])
.directive('heroElement', ['$window', function($window){
  return{
    link: link,
    restrict: 'A'
    };

    function link(scope, element, attrs){
        var header = 60;
        var screen = $window.innerHeight;
        var offset = screen - header;
        element.css('height', offset + 'px');
        angular.element($window).bind('resize', function(){
            header = 60;
            screen = $window.innerHeight;
            offset = screen - header;
            element.css('height', offset + 'px');
            scope.$digest();
       });
     }

}])
.directive('slideshowContainer', ['$window', '$timeout', function($window, $timeout){

  return {
    link: link,
    restrict: 'A'
  };

  function link(scope, element, attrs){
    
    var width = $window.innerWidth;
    element.css('width', width + 'px');
    angular.element($window).bind('resize', function(){
      var width = $window.innerWidth;
      element.css('width', width + 'px');
      scope.$digest();
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
}]);



