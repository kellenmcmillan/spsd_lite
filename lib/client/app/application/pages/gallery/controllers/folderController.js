'use strict';

angular.module('folder', [
'ngResource', 
'ngAnimate', 
'ngSanitize'
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
function (
$rootScope, 
$scope, 
$compile, 
$location,
$timeout, 
$window, 
$anchorScroll, 
$routeParams)
{
    
    var url_param = $routeParams.url_param;
    var param = JSON.stringify(url_param);
    var item;
    var internal_slideshow_length = 0;
    var continue_looping = true;
    var imageGalleries = {};
    var init = function(){
        if ($rootScope.all_galleries){
            if ($rootScope.all_galleries.length > 0){
                load_gallery();
            }
        }
    }
    var load_gallery = function(){
        var location_path = $location.path();
        var location = JSON.stringify(location_path);
        if(location.indexOf("/gallery/") > 0){
            for(let i = 0, l = $rootScope.all_galleries.length; i < l && continue_looping == true; i++) {
                var raw_url = $rootScope.all_galleries[i].url;
                var url = JSON.stringify(raw_url);
                if(url.indexOf(url_param) > 0){
                    continue_looping = false;
                    item = $rootScope.all_galleries[i];
                    $rootScope.pageTitle = item.name;
                    $scope.folder = item;
                    internal_slideshow_length = item.images.length;
                    $scope.slideshow_length = internal_slideshow_length;
                }
            }
        }
    }
    init();
    $rootScope.$on('galleries_loaded', function(event, args) {
        load_gallery();
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

}]);

