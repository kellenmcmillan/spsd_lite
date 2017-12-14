'use strict';

var notFound = angular.module('notFound', ['directions', 'ngResource', 'ngAnimate', 'ngSanitize'])

.controller('notFoundController', ['$rootScope', '$scope', '$compile', '$window', function ($rootScope, $scope, $compile, $window){

    // pulls relevant page data from appData Stream
    for(let i = 0, l = $rootScope.app_data.interior_page_configs.length; i < l; i++) {
        var pages = $rootScope.app_data.interior_page_configs;
        if(pages[i].name == "Not Found"){
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

    //////////////////////////////////////////////////////////
    //use this code whenever I want MDL to load via controller
    angular.element(document).ready( 
        function() {
            componentHandler.upgradeAllRegistered();
        }
    );
    //////////////////////////////////////////////////////////
    //use this code whenever I want MDL to load via controller

}]);


