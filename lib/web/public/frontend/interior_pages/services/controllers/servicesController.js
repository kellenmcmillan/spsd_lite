'use strict';

var services = angular.module('services', ['directions', 'ngResource', 'ngAnimate', 'ngSanitize'])

.controller('servicesController', ['$rootScope', '$scope', '$compile', '$window', function ($rootScope, $scope, $compile, $window){

    // pulls relevant page data from appData Stream
    for(let i = 0, l = $rootScope.app_data.interior_page_configs.length; i < l; i++) {
        var pages = $rootScope.app_data.interior_page_configs;
        if(pages[i].name == "SPSD Services"){
            var page = pages[i];
        }
    }
    // pulls relevant page data from appData Stream
    $rootScope.is_stretched = false;
    $rootScope.pageTitle = page.name;
    $scope.page = page;
    $scope.content_data = page.component_page_data.content;
    $scope.current_panel = 0;
    $scope.panel_visible = page.component_page_data.starting_panel;
    $scope.page_navigation_icon = page.component_page_data.page_navigation_icon;
    $scope.page_navigation_title = page.component_page_data.page_navigation_title;
    $scope.shrinking_title_image = page.component_page_data.shrinking_title_image;
    $scope.test_data_value = page.component_page_data.page_navigation_title;
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
}]);


