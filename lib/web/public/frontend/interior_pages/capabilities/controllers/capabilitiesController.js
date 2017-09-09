'use strict';

var capabilities = angular.module('capabilities', ['ngResource', 'ngAnimate', 'ngSanitize', 'directions'])

.controller('capabilitiesController', ['$rootScope', '$scope', '$compile', '$window', '$routeParams', function ($rootScope, $scope, $compile, $window, $routeParams){

    // pulls relevant page data from appData Stream
    for(let i = 0, l = $rootScope.app_data.interior_page_configs.length; i < l; i++) {
        var pages = $rootScope.app_data.interior_page_configs;
        if(pages[i].name == "Capabilities"){
            var page = pages[i];
        }
    }
    // pulls relevant page data from appData Stream

    // Selects Current View From Parameter
    var starting_panel;

    for(let i = 0, l = page.component_page_data.content.length; i < l; i++) {
        var views = page.component_page_data.content;
        var url_param = $routeParams.url_param;
        if(views[i].param == url_param){
            starting_panel = views[i].name;
            $scope.current_panel = i;
        }
    }
    // Selects Current View From Parameter

    $rootScope.pageTitle = page.name;
    $scope.page = page;
    $scope.content_data = page.component_page_data.content;
    $scope.panel_visible = starting_panel;
    $scope.page_navigation_icon = page.component_page_data.page_navigation_icon;
    $scope.page_navigation_title = page.component_page_data.page_navigation_title;
    $scope.shrinking_title_image = page.component_page_data.shrinking_title_image;
    // $scope.test_data = "<p ng-bind-html=\"test_data_value\"></p>";

    //////////////////////////////////////////////////////////
    //use this code whenever I want MDL to load via controller
    angular.element(document).ready( 
        function() {
            componentHandler.upgradeAllRegistered();
        }
    );
    //////////////////////////////////////////////////////////
    //use this code whenever I want MDL to load via controller

}]).directive('compile', ['$compile', function ($compile) {
    return function(scope, element, attrs) {
        scope.$watch(
            function(scope) {
                // watch the 'compile' expression for changes
                return scope.$eval(attrs.compile);
            },
            function(value) {
                // when the 'compile' expression changes
                // assign it into the current DOM
                element.html(value);

                // compile the new DOM and link it to the current
                // scope.
                // NOTE: we only compile .childNodes so that
                // we don't get into infinite loop compiling ourselves
                $compile(element.contents())(scope);
            }
        );
    };
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


