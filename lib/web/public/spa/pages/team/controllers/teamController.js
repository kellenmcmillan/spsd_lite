'use strict';

var team = angular.module('team', [
'ngResource', 
'ngAnimate', 
'ngSanitize', 
'staffDataService'
])
.controller('teamController', [
'$rootScope', 
'$scope', 
'$compile', 
'$window', 
'staff', 
'$mdDialog', 
'$mdMenu', 
'$location', 
function (
$rootScope, 
$scope, 
$compile, 
$window, 
staff, 
$mdDialog, 
$mdMenu, 
$location)
{

    // var url_param = $routeParams.url_param;
    // var param = JSON.stringify(url_param);
    // var item;
    // var internal_slideshow_length = 0;
    // var continue_looping = true;
    // var imageGalleries = {};
    // var init = function(){
    //     if ($rootScope.all_galleries){
    //         if ($rootScope.all_galleries.length > 0){
    //             load_gallery();
    //         }
    //     }
    // }
    // var load_gallery = function(){
    //     var location_path = $location.path();
    //     var location = JSON.stringify(location_path);
    //     console.log(location);
    //     if(location.indexOf("/gallery/") > 0){
    //         for(let i = 0, l = $rootScope.all_galleries.length; i < l && continue_looping == true; i++) {
    //             var raw_url = $rootScope.all_galleries[i].url;
    //             var url = JSON.stringify(raw_url);
    //             if(url.indexOf(url_param) > 0){
    //                 console.log("found the gallery to display!");
    //                 $('#default-page-loading').fadeOut('slow');
    //                 continue_looping = false;
    //                 item = $rootScope.all_galleries[i];
    //                 $rootScope.pageTitle = item.name;
    //                 $scope.folder = item;
    //             }
    //         }
    //     }
    // }
    // init();
    // $rootScope.$on('galleries_loaded', function(event, args) {
    //     load_gallery();
    // });

    $scope.show_dialog = false;
    $scope.member;
    $scope.select_member = function(member){
	    if(member.call_to_action){
	    	return null;
	    } else {
	      	$scope.member = member;
	      	$scope.show_dialog = true;
	    }
	}

}]).directive('compile', ['$compile', function ($compile) {

    return function(scope, element, attrs) {
        scope.$watch(
            function(scope) {
                return scope.$eval(attrs.compile);
            },
            function(value) {
                element.html(value);
                $compile(element.contents())(scope);
            }
        );
    };

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