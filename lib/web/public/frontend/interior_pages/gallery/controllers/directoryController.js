'use strict';

angular.module('folders', ['ngResource', 'ngAnimate', 'ngSanitize'])

.controller('directoryController', ['$rootScope', '$scope', '$compile', '$location', '$timeout', '$window', '$anchorScroll', '$routeParams', function ($rootScope, $scope, $compile, $location, $timeout, $window, $anchorScroll, $routeParams){
    
    $rootScope.pageTitle = "Galleries";
    $scope.page = page;
    var galleries = [];
    

    for(let i = 0, l = $rootScope.app_data.home_page_configs.length; i < l; i++) {
        var pages = $rootScope.app_data.home_page_configs;
        if(pages[i].name == "SPSD Home"){
            var page = pages[i];
        }
    }

    $scope.primary_gallery = page.primary_gallery;

    // sort galleries & cover images
    for(let i = 0, l = $scope.primary_gallery.component_data.galleries.length; i < l; i++) {
        var gallery = $scope.primary_gallery.component_data.galleries[i];
        for(let c = 0, length = gallery.images.length; c < length; c++) {
            var image = gallery.images[c];
            if(image.is_cover_image == true){
                var gallery_package = {};
                gallery_package.url_param = gallery.url_param;
                gallery_package.title = gallery.title;
                gallery_package.description = gallery.description;
                gallery_package.hi_res = image.hi_res;
                gallery_package.landscape = image.landscape;
                gallery_package.thumbnail = image.thumbnail;
                galleries.push(gallery_package);
            }
        }
    }
    // sort galleries & cover images

    $scope.galleries = galleries;


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


