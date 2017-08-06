'use strict';

var main = angular.module('main', ['ngResource', 'ngAnimate', 'duScroll', 'appDataService', 'duScroll'])

.controller('mainController', ['$rootScope', '$scope', '$compile', '$timeout', '$window', 
    '$interval', '$location', '$sce', '$anchorScroll', '$route', "$q", "$http", "frontend",
    function ($rootScope, $scope, $compile, $timeout, $window, $interval, $location, $sce, $anchorScroll, $route, $q, $http, frontend){

    // pulls relevant page data from appData Stream
    frontend.query()
    .$promise.then(function(data) {
        var view_data = data[0];
        $rootScope.app_data = data[0];
        $rootScope.miniAppName = view_data.app_configs.name;
        $rootScope.google_address_link = view_data.app_configs.address.google_address_link;
        $rootScope.trusted_google_address_widget_map = $sce.trustAsResourceUrl(view_data.app_configs.address.google_map_widget);
        $scope.company_address_one = view_data.app_configs.address.info.street + ", " + view_data.app_configs.address.info.city +", " + view_data.app_configs.address.info.state + " " + view_data.app_configs.address.info.zipcode;
    });
    // pulls relevant page data from appData Stream

    
    $scope.year = new Date().getFullYear();
    $scope.site_main_scroller = function(hash){
        var go_here = angular.element(document.getElementById(hash));
        angular.element('.mdl-layout__content').scrollToElementAnimated(go_here, 100);
    }
    $rootScope.KIT_Activation = false;
    $rootScope.default_active = false;
    $rootScope.mail_active = false;

    // Window Sizing Variable
    $scope.window_height = $window.innerHeight;
    $scope.window_width = $window.innerWidth;
    $(window).resize(function() {
        $scope.window_width = $window.innerWidth;
        $scope.window_height = $window.innerHeight;
    });
    // Window Sizing Variable

    $scope.user_button = false;
    $scope.menu_button = false;
    
    // listeners on scope
    $scope.$on('$locationChangeStart', function(event, args) {
        $scope.location = $location.path();
    });

    $scope.$on('server-event', function(event, args) {
        //build a directive
        var snackbarContainer = document.querySelector('#lightweight--message');
        snackbarContainer.MaterialSnackbar.showSnackbar(args.data);
    });
    // listeners on scope

    // listener on root scope of application
    $rootScope.$on('$locationChangeStart', function(evt, absNewUrl, absOldUrl){
        $('.mdl-layout__content').animate({
            scrollTop: $('.mdl-layout__content').offset().top - 6100
        }, 0);
    });

    $rootScope.$on('$locationChangeSuccess', function(evt, absNewUrl, absOldUrl){

        componentHandler.upgradeAllRegistered();

    });
    // listener on root scope of application

}])
.directive('menuClose', function() {
    return {
        restrict: 'AC',
        link: function($scope, $element) {
            $element.bind('click', function() {
                var drawer = angular.element('.mdl-layout__drawer');
                var obfuscator = angular.element('.mdl-layout__obfuscator');
                if(drawer) {
                    drawer.toggleClass('is-visible');
                    obfuscator.toggleClass('is-visible');
                }
            });
            angular.element(document).ready( 
                function() {
                    componentHandler.upgradeAllRegistered();
                }
            );
        }
    };
})
;



