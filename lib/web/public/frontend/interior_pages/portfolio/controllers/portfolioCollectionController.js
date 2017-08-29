'use strict';

angular.module('portfolio', ['directions', 'ngResource', 'ngAnimate', 'ngSanitize'])

.controller('portfolioCollectionController', ['$rootScope', '$scope', '$compile', '$location', '$timeout', '$window', '$anchorScroll', '$routeParams', function ($rootScope, $scope, $compile, $location, $timeout, $window, $anchorScroll, $routeParams){
    
    for(let i = 0, l = $rootScope.app_data.home_page_configs.length; i < l; i++) {
        var pages = $rootScope.app_data.home_page_configs;
        if(pages[i].name == "SPSD Home"){
            var page = pages[i];
        }
    }

    var url_param = $routeParams.url_param;
    var items = page.primary_gallery.component_data.galleries;
    var item;
    var slideshowStarting = false;       
    var slideshow_timeout;

    for(let o = 0, l = items.length; o < l; o++) {
        if(items[o].url_param == url_param){
            item = items[o];
        }
    }

    $scope.portfolio_scroller = function(hash){
        var go_here = angular.element(document.getElementById(hash));
        angular.element('.mdl-layout__content').scrollToElementAnimated(go_here);
    }

    $scope.lightbox_active = false;
    $scope.current_lightbox_image = null;
    var startValue = -1;
    function openLightbox(position){
        $scope.lightbox_active = true;
        slideshowStarting = true;
        slideshowEngineRev(position);
    }

    function closeLightbox(){
        $scope.lightbox_active = false;
        slideshowStarting = false;
        $timeout.cancel(slideshow_timeout);
    }

    $scope.fillLightboxImage = openLightbox;
    $scope.clearLightboxImage = closeLightbox;


    // pulls relevant page data from appData Stream
    $rootScope.is_stretched = false;
    $rootScope.pageTitle = item.title;
    $scope.currentPorfolioImage = 0;
    $scope.portfolio_item = item;
    $scope.page = page;

    var slideshow_length = items.length;
    

    $scope.left_slideshow_control = function(){
        $timeout.cancel(slideshow_timeout);
        startValue = startValue - 2;
        slideshowEngineRev();
    }
    $scope.right_slideshow_control = function(){
        $timeout.cancel(slideshow_timeout);
        slideshowEngineRev();
    }       

    var slideshowEngineRev = function(start) {
        slideshow_timeout = $timeout(function(){
            slideshowEngineRev()
        }, 6000);
        var start = start;
        startValue++;
        if (slideshowStarting && startValue !== -1){
            startValue = start;
            slideshowStarting = false;
            $scope.startValue = startValue;
        } else if (startValue < slideshow_length && !slideshowStarting && startValue > 0){
            $scope.startValue = startValue;
        } else if (startValue < 0){
            startValue = slideshow_length - 1;
            $scope.startValue = startValue;
        } else {
            startValue = 0;
            $scope.startValue = 0;
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
.directive('lightboxImage', ['$window', '$location', '$timeout', function($window, $location, $timeout){

    return {
        link: link,
        restrict: 'A'
    };

    function link(scope, element, attrs){
        element.on("load", function(){
            var curtain = $window.innerHeight;
            var lightbox_image = angular.element('.lightbox-image').height();
            var marginTopVariable = (curtain/2) - (lightbox_image/2);
            element.css('margin-top', marginTopVariable + 'px');
            element.css('opacity', 1);
        });
        angular.element($window).bind('resize', function(){
            var curtain = $window.innerHeight;
            var lightbox_image = angular.element('.lightbox-image').height();
            var marginTopVariable = (curtain/2) - (lightbox_image/2);
            element.css('margin-top', marginTopVariable + 'px');
            scope.$digest();
        });
    }
    
}]);


