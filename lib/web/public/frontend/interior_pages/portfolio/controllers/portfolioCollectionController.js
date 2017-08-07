'use strict';

angular.module('portfolio', ['directions', 'ngResource', 'ngAnimate', 'ngSanitize'])

.controller('portfolioCollectionController', ['$rootScope', '$scope', '$compile', '$location', '$timeout', '$window', '$anchorScroll', '$routeParams', function ($rootScope, $scope, $compile, $location, $timeout, $window, $anchorScroll, $routeParams){
    
    for(let i = 0, l = $rootScope.app_data.home_page_configs.length; i < l; i++) {
        var pages = $rootScope.app_data.home_page_configs;
        if(pages[i].name == "SPSD Home"){
            var page = pages[i];
        }
    }

    var folder_id = $routeParams.id;
    var items = page.primary_gallery.component_data.galleries;
    var item;
    for(let o = 0, l = items.length; o < l; o++) {
        if(items[o]._id == folder_id){
            item = items[o];
        }
    }

    $scope.portfolio_scroller = function(hash){
        var go_here = angular.element(document.getElementById(hash));
        angular.element('.mdl-layout__content').scrollToElementAnimated(go_here);
    }

    // pulls relevant page data from appData Stream
    $rootScope.is_stretched = false;
    $rootScope.pageTitle = item.title;
    $scope.currentPorfolioImage = 0;
    $scope.portfolio_item = item;
    $scope.page = page;

    var slideshow_length = $scope.portfolio_item.images.length;
    var visible_slide = -1;
    var slideshowStarting = true;       
    var slideshow_timeout;    

    var slideshowEngineRev = function() {
        slideshow_timeout = $timeout(function(){
            slideshowEngineRev()
        }, 6000);

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

    $scope.scrollToTop = function(destination) {
        var old = $location.hash();
        $location.hash(destination);
        $anchorScroll();
        //reset to old to keep any additional routing logic from kicking in
        $location.hash(old);
        $timeout.cancel(slideshow_timeout);
        slideshowEngineRev();
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
    
}]);


